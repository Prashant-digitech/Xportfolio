/**
 * Intelligent Asset Classifier Engine
 * Analyzes any uploaded file (video, PDF, image, document) and automatically
 * determines the optimal portfolio section, target directory, metadata, tags, and display parameters.
 */

export interface ClassifiedAsset {
  id: string;
  originalName: string;
  safeName: string;
  sizeBytes: number;
  mimeType: string;
  category: "video" | "ppt" | "ux" | "graphics" | "cert" | "doc";
  targetSection: "motion" | "deck" | "figma" | "graphics" | "certificates" | "resume";
  targetDirectory: string;
  publicUrl: string;
  title: string;
  role: string;
  description: string;
  statsBadge: string;
  tools: string[];
  tags: string[];
  duration?: string;
  confidenceScore: number;
  reasoning: string;
  uploadedAt: string;
}

export function classifyAsset(
  fileName: string,
  sizeBytes: number,
  mimeType?: string
): ClassifiedAsset {
  const ext = (fileName.split(".").pop() || "").toLowerCase();
  const lowerName = fileName.toLowerCase().replace(/[_-]/g, " ");
  const baseName = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");

  // Formatting nice title
  const formattedTitle = baseName
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const id = `asset-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const safeName = `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  // 1. VIDEOS (.mp4, .webm, .mov, .mkv)
  if (["mp4", "webm", "mov", "mkv"].includes(ext) || (mimeType && mimeType.startsWith("video/"))) {
    let subType = "Cinematic Film";
    let badge = "4K Master • Speed Ramping";
    let tools = ["Premiere Pro", "After Effects", "DaVinci Resolve", "Audition"];

    if (lowerName.includes("showreel") || lowerName.includes("reel")) {
      subType = "Cinematic Showreel";
      badge = "Master Showreel • 4K 60FPS";
    } else if (lowerName.includes("walkthrough") || lowerName.includes("product") || lowerName.includes("demo")) {
      subType = "Product Walkthrough";
      badge = "UX Product Motion • AI System";
      tools = ["Figma", "After Effects", "Next.js", "Screen Studio"];
    } else if (lowerName.includes("commercial") || lowerName.includes("ad") || lowerName.includes("promo")) {
      subType = "Commercial Ad";
      badge = "High Energy • Sound Design";
    } else if (lowerName.includes("travel") || lowerName.includes("cinematic")) {
      subType = "Cinematic Travel Film";
      badge = "Rec.709 Color Grade • Drone 4K";
    }

    return {
      id,
      originalName: fileName,
      safeName,
      sizeBytes,
      mimeType: mimeType || `video/${ext}`,
      category: "video",
      targetSection: "motion",
      targetDirectory: "public/videos",
      publicUrl: `/videos/${safeName}`,
      title: formattedTitle || `${subType} Project`,
      role: "Lead Video Editor & Motion Designer",
      description: `High-fidelity ${subType.toLowerCase()} asset featuring precision pacing, dynamic color grading, and tailored audio design.`,
      statsBadge: badge,
      tools,
      tags: ["Video Editing", "Motion Graphics", "Color Grading", "Sound Design", subType],
      confidenceScore: 0.98,
      reasoning: `Matched video container (${ext.toUpperCase()}) and motion storytelling cues. Routed to Motion / Film Lab.`,
      uploadedAt: new Date().toISOString(),
    };
  }

  // 2. RESUMES & CVs (.pdf, .docx with resume keywords)
  if (
    (ext === "pdf" || ext === "docx") &&
    (lowerName.includes("resume") || lowerName.includes("cv") || lowerName.includes("bio") || lowerName.includes("profile"))
  ) {
    return {
      id,
      originalName: fileName,
      safeName,
      sizeBytes,
      mimeType: mimeType || (ext === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
      category: "doc",
      targetSection: "resume",
      targetDirectory: "public/resume",
      publicUrl: `/resume/${safeName}`,
      title: formattedTitle || "Prashant Sisodhiya Resume",
      role: "Lead Product Designer & Design Architect",
      description: "Executive product design resume highlighting enterprise UX systems, motion mastery, and full-stack technical leadership.",
      statsBadge: "Executive Resume • ATS Verified",
      tools: ["Product Design", "UX Architecture", "Leadership"],
      tags: ["Resume", "Curriculum Vitae", "Executive Profile", "ATS Compliant"],
      confidenceScore: 0.99,
      reasoning: `Identified resume/CV keyword tokens in ${ext.toUpperCase()} document. Routed to Resume & Credentials repository.`,
      uploadedAt: new Date().toISOString(),
    };
  }

  // 3. CERTIFICATES (.jpg, .png, .pdf with cert keywords)
  if (
    lowerName.includes("cert") ||
    lowerName.includes("certificate") ||
    lowerName.includes("diploma") ||
    lowerName.includes("arena") ||
    lowerName.includes("parul") ||
    lowerName.includes("ducat") ||
    lowerName.includes("award")
  ) {
    return {
      id,
      originalName: fileName,
      safeName,
      sizeBytes,
      mimeType: mimeType || (ext === "pdf" ? "application/pdf" : `image/${ext}`),
      category: "cert",
      targetSection: "certificates",
      targetDirectory: "public/certificates",
      publicUrl: `/certificates/${safeName}`,
      title: formattedTitle || "Accredited Certification",
      role: "Certified Professional",
      description: "Official credential certifying advanced expertise in digital design, video editing, and modern UX architecture.",
      statsBadge: "Verified Credential • Accredited",
      tools: ["Industry Standard", "Certified Assessment"],
      tags: ["Certification", "Accreditation", "Verified Skill", "Diploma"],
      confidenceScore: 0.97,
      reasoning: "Matched accreditation credentials keywords. Routed to Verified Certifications showcase.",
      uploadedAt: new Date().toISOString(),
    };
  }

  // 4. PRESENTATION DECKS & CANVA SLIDES (.pdf, .pptx, .key)
  if (
    ["pdf", "pptx", "key"].includes(ext) ||
    lowerName.includes("deck") ||
    lowerName.includes("canva") ||
    lowerName.includes("presentation") ||
    lowerName.includes("pitch") ||
    lowerName.includes("slide")
  ) {
    return {
      id,
      originalName: fileName,
      safeName,
      sizeBytes,
      mimeType: mimeType || (ext === "pdf" ? "application/pdf" : "application/vnd.ms-powerpoint"),
      category: "ppt",
      targetSection: "deck",
      targetDirectory: "public/canva-deck",
      publicUrl: `/canva-deck/${safeName}`,
      title: formattedTitle || "Executive Presentation Deck",
      role: "Strategic Product Designer & Storyteller",
      description: "High-impact presentation deck engineered in 16:9 widescreen format, delivering crisp narrative alignment and visual clarity.",
      statsBadge: "16:9 Widescreen • Executive Deck",
      tools: ["Canva Pro", "Figma", "Keynote", "High-Res Vector Export"],
      tags: ["Presentation Deck", "Canva", "Executive Pitch", "Case Study Deck"],
      confidenceScore: 0.95,
      reasoning: `Detected presentation deck document (${ext.toUpperCase()}). Routed to Executive Presentation Deck module.`,
      uploadedAt: new Date().toISOString(),
    };
  }

  // 5. UX CASE STUDIES & FIGMA ARTIFACTS
  if (
    lowerName.includes("deepastro") ||
    lowerName.includes("tradex") ||
    lowerName.includes("futuremind") ||
    lowerName.includes("cosmosx") ||
    lowerName.includes("securex") ||
    lowerName.includes("cureiq") ||
    lowerName.includes("pathwise") ||
    lowerName.includes("figma") ||
    lowerName.includes("wireframe") ||
    lowerName.includes("prototype") ||
    lowerName.includes("ux") ||
    lowerName.includes("ui") ||
    lowerName.includes("case study") ||
    lowerName.includes("journey") ||
    lowerName.includes("flow") ||
    lowerName.includes("ia") ||
    lowerName.includes("design system")
  ) {
    const isFigmaLab = lowerName.includes("phase") || lowerName.includes("wireframe") || lowerName.includes("prototype") || lowerName.includes("figma");
    const targetDir = isFigmaLab ? "public/images/figma-lab" : "public/images/ux";
    const publicUrl = isFigmaLab ? `/images/figma-lab/${safeName}` : `/images/ux/${safeName}`;

    return {
      id,
      originalName: fileName,
      safeName,
      sizeBytes,
      mimeType: mimeType || `image/${ext}`,
      category: "ux",
      targetSection: "figma",
      targetDirectory: targetDir,
      publicUrl,
      title: formattedTitle || "UX Design Artifact",
      role: "Lead UI/UX Designer & Product Architect",
      description: "Evidence-first UX design artifact demonstrating user flows, system information architecture, and validated component interactions.",
      statsBadge: "Evidence-First • Figma Design Tokens",
      tools: ["Figma", "Design Tokens", "Wireframing", "Component Library"],
      tags: ["UX Research", "Figma Lab", "Interaction Design", "Case Study"],
      confidenceScore: 0.96,
      reasoning: `Identified user experience / Figma keywords in visual asset. Routed to ${isFigmaLab ? "Figma Lab" : "UX Case Studies"}.`,
      uploadedAt: new Date().toISOString(),
    };
  }

  // 6. VISUAL SYSTEMS / GRAPHICS & PHOTOSHOP STUDIO (Default for images & PSD/PSB)
  const isPhotoshop = ["psd", "psb"].includes(ext) || lowerName.includes("photoshop") || lowerName.includes("manipulation") || lowerName.includes("poster");
  const targetDir = isPhotoshop ? "public/photoshop" : "public/images/graphics";
  const publicUrl = isPhotoshop ? `/photoshop/${safeName}` : `/images/graphics/${safeName}`;

  return {
    id,
    originalName: fileName,
    safeName,
    sizeBytes,
    mimeType: mimeType || `image/${ext}`,
    category: "graphics",
    targetSection: "graphics",
    targetDirectory: targetDir,
    publicUrl,
    title: formattedTitle || "Creative Visual Production",
    role: "Visual Systems Lead & Creative Director",
    description: "Multi-layered visual artwork combining balanced color theory, high-resolution compositing, and commercial typography.",
    statsBadge: isPhotoshop ? "Master PSD/PSB • Layered Composite" : "Visual Identity • Brand System",
    tools: ["Photoshop", "Illustrator", "Digital Compositing", "Typography"],
    tags: ["Visual Systems", "Graphic Design", "Branding", "Creative Retouching"],
    confidenceScore: 0.91,
    reasoning: `Identified creative visual artwork (${ext.toUpperCase()}). Routed to Visual Systems & Photoshop Studio.`,
    uploadedAt: new Date().toISOString(),
  };
}
