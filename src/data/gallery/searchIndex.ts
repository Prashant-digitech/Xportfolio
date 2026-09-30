import { CREATIVE_CATEGORIES } from "./categories";
import { uxProjectsList } from "../uxProjects";

export interface SearchEntry {
  id: string;
  title: string;
  category: "product" | "creative_category" | "artwork" | "motion" | "lab" | "action";
  categoryBadge: string;
  description: string;
  keywords: string[];
  actionType: "open_case_study" | "open_category_gallery" | "scroll_to_section" | "open_link" | "external_action";
  target: string;
  icon?: string;
  extraMeta?: string;
}

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  // 1. Product Design Case Studies
  uxProjectsList.forEach((p) => {
    const tools = p.caseStudy?.tools || [];
    entries.push({
      id: `prod-${p.id}`,
      title: p.title,
      category: "product",
      categoryBadge: "Product Case Study",
      description: p.summary || p.subtitle || "Comprehensive UX/UI Case Study",
      keywords: [
        p.title.toLowerCase(),
        p.id.toLowerCase(),
        "product",
        "ux",
        "ui",
        "case study",
        ...tools.map((t: string) => t.toLowerCase()),
        ...(p.tags || []).map((t: string) => t.toLowerCase()),
      ],
      actionType: "open_case_study",
      target: p.id,
      extraMeta: p.statsBadge || p.caseStudy?.duration || "Case Study",
    });
  });

  // 2. Creative Categories
  CREATIVE_CATEGORIES.forEach((cat) => {
    entries.push({
      id: `cat-${cat.id}`,
      title: `${cat.title} Collection`,
      category: "creative_category",
      categoryBadge: `${cat.items.length} Artworks`,
      description: cat.subtitle,
      keywords: [
        cat.title.toLowerCase(),
        cat.id.toLowerCase(),
        cat.discipline.toLowerCase(),
        ...cat.tags.map((t) => t.toLowerCase()),
        "gallery",
        "creative work",
        "graphics",
      ],
      actionType: "open_category_gallery",
      target: cat.id,
      extraMeta: cat.discipline,
    });
  });

  // 3. Individual Artworks
  CREATIVE_CATEGORIES.forEach((cat) => {
    cat.items.forEach((item) => {
      entries.push({
        id: `art-${item.id}`,
        title: item.title,
        category: "artwork",
        categoryBadge: item.categoryLabel,
        description: item.description,
        keywords: [
          item.title.toLowerCase(),
          item.id.toLowerCase(),
          cat.title.toLowerCase(),
          ...(item.tools || []).map((t) => t.toLowerCase()),
          ...(item.tags || []).map((t) => t.toLowerCase()),
          "artwork",
          "photoshop",
          "high res",
        ],
        actionType: "open_category_gallery",
        target: `${cat.id}:${item.id}`,
        extraMeta: item.year,
      });
    });
  });

  // 4. Motion / Video Projects
  const motionItems = [
    { id: "showreel-4k", title: "Cinematic Video Showreel 4K", desc: "Flagship showreel with speed ramping and Rec.709 grading", tools: "Premiere, After Effects, DaVinci" },
    { id: "veronixx-app-walkthrough", title: "Veronixx Storefront & POS // Full System Walkthrough", desc: "Complete live app and offline POS engine walkthrough", tools: "Next.js, Tailwind, ESC/POS" },
    { id: "travel-cinematic", title: "Alpine Horizons // Travel Cinematic Film", desc: "Atmospheric travel portfolio captured across mountain ranges", tools: "Premiere, FilmConvert" },
    { id: "fitness-promo", title: "Apex Athletic Performance Commercial", desc: "High-octane gym promo video with speed-ramped whip transitions", tools: "After Effects, Audition" },
    { id: "product-ad-video", title: "Aura Luminescence // Product Video", desc: "Luxury product lighting commercial with cinematic motion", tools: "Premiere Pro" },
    { id: "wedding-film", title: "Eternal Vows // Cinematic Wedding Film", desc: "Golden hour emotional wedding film with acoustic audio mastering", tools: "DaVinci Resolve" },
  ];
  motionItems.forEach((m) => {
    entries.push({
      id: `motion-${m.id}`,
      title: m.title,
      category: "motion",
      categoryBadge: "Motion & Film",
      description: m.desc,
      keywords: [m.title.toLowerCase(), "video", "motion", "film", "premiere", "after effects", "showreel", m.tools.toLowerCase()],
      actionType: "scroll_to_section",
      target: "motion-lab",
      extraMeta: "Motion Project",
    });
  });

  // 5. Labs & Key Sections
  const labSections = [
    { id: "sec-deepastro", title: "DeepAstro AI Life Intelligence", target: "deepastro", desc: "Astrological intelligence platform case study" },
    { id: "sec-figma-lab", title: "Figma Lab & Design Systems", target: "figma-lab", desc: "Interactive wireframes, token hierarchy and prototypes" },
    { id: "sec-evolution", title: "Design Evolution (2020 → 2026)", target: "evolution", desc: "Chronological journey from visual craft to systemic product design" },
    { id: "sec-canva-deck", title: "Canva Executive Deck (26 Slides)", target: "presentation-deck", desc: "Full slide presentation viewer" },
    { id: "sec-client-websites", title: "Client Web Flagships (Veronixx)", target: "websites", desc: "Real-world production clients & retail systems" },
    { id: "sec-certifications", title: "Certification Vault", target: "certifications", desc: "Verified credentials from Google, IBM, interaction design" },
    { id: "sec-about", title: "About & Career Evolution", target: "about", desc: "Multidisciplinary career path, philosophy, and background" },
    { id: "sec-contact", title: "Contact & Collaboration", target: "contact", desc: "Direct messaging, email, and project inquiries" },
  ];
  labSections.forEach((s) => {
    entries.push({
      id: s.id,
      title: s.title,
      category: "lab",
      categoryBadge: "Portfolio Section",
      description: s.desc,
      keywords: [s.title.toLowerCase(), s.target, "section", "overview"],
      actionType: "scroll_to_section",
      target: s.target,
    });
  });

  // 6. Quick Actions
  entries.push({
    id: "action-resume",
    title: "Download Official Resume (PDF)",
    category: "action",
    categoryBadge: "Quick Action",
    description: "Open and download the latest verified curriculum vitae",
    keywords: ["resume", "cv", "download", "pdf", "bio", "experience"],
    actionType: "open_link",
    target: "/resume.pdf",
  });

  entries.push({
    id: "action-contact-email",
    title: "Email Prashant Directly (psisodhiya01@gmail.com)",
    category: "action",
    categoryBadge: "Quick Action",
    description: "Launch your default email client to initiate project discussion",
    keywords: ["email", "mail", "contact", "hire", "message", "write"],
    actionType: "open_link",
    target: "mailto:psisodhiya01@gmail.com",
  });

  return entries;
}
