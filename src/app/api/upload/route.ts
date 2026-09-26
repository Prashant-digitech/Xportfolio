import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { classifyAsset, ClassifiedAsset } from "@/lib/assetClassifier";

export const dynamic = "force-dynamic";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "dynamicPortfolioData.json");

interface DynamicDataStore {
  videos: ClassifiedAsset[];
  decks: ClassifiedAsset[];
  ux: ClassifiedAsset[];
  graphics: ClassifiedAsset[];
  certificates: ClassifiedAsset[];
  resumes: ClassifiedAsset[];
}

function readDataStore(): DynamicDataStore {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return { videos: [], decks: [], ux: [], graphics: [], certificates: [], resumes: [] };
    }
    const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading dynamicPortfolioData.json:", err);
    return { videos: [], decks: [], ux: [], graphics: [], certificates: [], resumes: [] };
  }
}

function writeDataStore(data: DynamicDataStore): void {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing dynamicPortfolioData.json:", err);
  }
}

// GET: Retrieve all uploaded dynamic assets
export async function GET() {
  const store = readDataStore();
  const allAssets = [
    ...store.videos,
    ...store.decks,
    ...store.ux,
    ...store.graphics,
    ...store.certificates,
    ...store.resumes,
  ].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  return NextResponse.json({
    success: true,
    total: allAssets.length,
    assets: allAssets,
    categories: store,
  });
}

// POST: Intelligent Upload or Classification
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // Case 1: JSON body for instant classification preview without upload
    if (contentType.includes("application/json")) {
      const body = await req.json();
      const { fileName, sizeBytes = 0, mimeType = "" } = body;
      if (!fileName) {
        return NextResponse.json({ success: false, error: "fileName is required" }, { status: 400 });
      }
      const classified = classifyAsset(fileName, sizeBytes, mimeType);
      return NextResponse.json({ success: true, preview: classified });
    }

    // Case 2: Multi-part form data for actual file upload
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const fileName = file.name;
    const fileBytes = await file.arrayBuffer();
    const buffer = Buffer.from(fileBytes);
    const sizeBytes = buffer.length;
    const mimeType = file.type || "";

    // Classify file intelligently
    let asset = classifyAsset(fileName, sizeBytes, mimeType);

    // Allow user overrides if provided
    const customTitle = formData.get("title") as string | null;
    const customCategory = formData.get("category") as string | null;
    const customDescription = formData.get("description") as string | null;
    const customTags = formData.get("tags") as string | null;

    if (customTitle && customTitle.trim()) {
      asset.title = customTitle.trim();
    }
    if (customDescription && customDescription.trim()) {
      asset.description = customDescription.trim();
    }
    if (customTags && customTags.trim()) {
      asset.tags = customTags.split(",").map((t) => t.trim()).filter(Boolean);
    }
    if (customCategory && ["video", "ppt", "ux", "graphics", "cert", "doc"].includes(customCategory)) {
      asset.category = customCategory as ClassifiedAsset["category"];
    }

    // Ensure target directory exists on disk
    const targetFolder = path.join(process.cwd(), asset.targetDirectory);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    // Write file to target destination
    const filePath = path.join(targetFolder, asset.safeName);
    fs.writeFileSync(filePath, buffer);

    // Save to dynamic manifest
    const store = readDataStore();
    switch (asset.targetSection) {
      case "motion":
        store.videos.unshift(asset);
        break;
      case "deck":
        store.decks.unshift(asset);
        break;
      case "figma":
        store.ux.unshift(asset);
        break;
      case "graphics":
        store.graphics.unshift(asset);
        break;
      case "certificates":
        store.certificates.unshift(asset);
        break;
      case "resume":
        store.resumes.unshift(asset);
        break;
      default:
        store.graphics.unshift(asset);
    }

    writeDataStore(store);

    return NextResponse.json({
      success: true,
      message: `Asset successfully classified and placed in ${asset.targetSection.toUpperCase()}`,
      asset,
    });
  } catch (err: unknown) {
    console.error("Upload error:", err);
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message || "Internal server error during upload",
      },
      { status: 500 }
    );
  }
}
