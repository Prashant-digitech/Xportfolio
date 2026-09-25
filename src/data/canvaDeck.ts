export interface CanvaSlide {
  id: number;
  slideNum: string;
  category: "Executive" | "DeepAstro" | "TradeX" | "FutureMind" | "FigmaLab" | "VisualMotion" | "Process";
  categoryLabel: string;
  title: string;
  role: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  authenticAsset: string;
  badge: string;
}

export const CANVA_SLIDES: CanvaSlide[] = [
  {
    id: 1,
    slideNum: "01",
    category: "Executive",
    categoryLabel: "Executive & Identity",
    title: "PRASHANT — Senior Product & UX Designer",
    role: "Senior Product & UX Designer",
    subtitle: "Evidence-Driven Human-Centered Systems & AI-Native Product Architecture",
    description: "Specializing in complex enterprise SaaS, multi-asset financial trading interfaces, AI workflow orchestration, and scalable Figma design systems.",
    imageSrc: "/canva-deck/slide-01.png",
    authenticAsset: "deepastro/1.png",
    badge: "EXECUTIVE COVER"
  },
  {
    id: 2,
    slideNum: "02",
    category: "Executive",
    categoryLabel: "Executive & Identity",
    title: "Table of Contents & Architecture",
    role: "Portfolio Blueprint (26 Pages)",
    subtitle: "Systematic proof across Research, Execution, Design Systems, and Business Impact",
    description: "Structured to prove what I can design (interfaces), how I think (research & IA), and how I work (Figma tokens & dev handoff).",
    imageSrc: "/canva-deck/slide-02.png",
    authenticAsset: "Ux projects overview.png",
    badge: "NAVIGATION INDEX"
  },
  {
    id: 3,
    slideNum: "03",
    category: "Executive",
    categoryLabel: "Executive & Identity",
    title: "Craft, Rigour & Systems Thinking",
    role: "Design Philosophy & Skill Matrix",
    subtitle: "Good design is invisible when frictionless, but undeniable when solving high-stakes complexity.",
    description: "Bridging qualitative user research, mathematically precise visual craft, and production-grade engineering constraints.",
    imageSrc: "/canva-deck/slide-03.png",
    authenticAsset: "phase 1.png",
    badge: "DESIGN ETHOS"
  },
  {
    id: 4,
    slideNum: "04",
    category: "DeepAstro",
    categoryLabel: "DeepAstro AI (10 Slides)",
    title: "DeepAstro AI — Executive Challenge",
    role: "Lead Product Designer | End-to-End UX & Systems",
    subtitle: "Transforming high-complexity astrological calculation into an intuitive, AI-native interface",
    description: "Solving severe cognitive fragmentation in ephemeris software; achieving +41% task completion and 3.2x faster lookup speed.",
    imageSrc: "/canva-deck/slide-04.png",
    authenticAsset: "deepastro/1.png (Slide 01)",
    badge: "DEEPASTRO 01/10"
  },
  {
    id: 5,
    slideNum: "05",
    category: "DeepAstro",
    categoryLabel: "DeepAstro AI (10 Slides)",
    title: "Problem Statement & Friction Points",
    role: "Problem Space Discovery",
    subtitle: "Deciphering 360° celestial charts without cognitive overload",
    description: "Addressing visual clutter, disconnected ephemeris tables, and 24% calculation error rates caused by manual coordinate inputs.",
    imageSrc: "/canva-deck/slide-05.png",
    authenticAsset: "deepastro/2.png (Slide 02)",
    badge: "DEEPASTRO 02/10"
  },
  {
    id: 6,
    slideNum: "06",
    category: "DeepAstro",
    categoryLabel: "DeepAstro AI (10 Slides)",
    title: "Research: 18 Synthesized Domain Insights",
    role: "Qualitative & Observational Research",
    subtitle: "Grounded research across professional astrologers, learners, and researchers",
    description: "Field studies synthesizing 18 core domain insights, 3 distinct user personas, and 4 foundational architectural rules.",
    imageSrc: "/canva-deck/slide-06.png",
    authenticAsset: "deepastro/3.png (Slide 03)",
    badge: "DEEPASTRO 03/10"
  },
  {
    id: 7,
    slideNum: "07",
    category: "DeepAstro",
    categoryLabel: "DeepAstro AI (10 Slides)",
    title: "Information Architecture & System Topology",
    role: "UX Strategy & Structural Hierarchy",
    subtitle: "A 3-tier node model enabling effortless navigation across temporal dimensions",
    description: "Hierarchical 3-panel split view: Global Workspace Drawer, Primary Visual Celestial Wheel, and Contextual Intelligence Inspector.",
    imageSrc: "/canva-deck/slide-07.png",
    authenticAsset: "deepastro/4.png (Slide 04)",
    badge: "DEEPASTRO 04/10"
  },
  {
    id: 8,
    slideNum: "08",
    category: "DeepAstro",
    categoryLabel: "DeepAstro AI (10 Slides)",
    title: "User Journey & Decision Node Architecture",
    role: "Flow Optimization & Error Prevention",
    subtitle: "Streamlining end-to-end task flows from birth data entry to consultative report export",
    description: "Reverse geocoding and automated timezone offset detection reducing setup drop-offs from 18% to under 2%.",
    imageSrc: "/canva-deck/slide-08.png",
    authenticAsset: "deepastro/5.png (Slide 05)",
    badge: "DEEPASTRO 05/10"
  },
  {
    id: 9,
    slideNum: "09",
    category: "DeepAstro",
    categoryLabel: "DeepAstro AI (10 Slides)",
    title: "Wireframing & Structural Exploration",
    role: "Low-to-Mid Fidelity Iteration",
    subtitle: "Iterating through 12-column responsive layout structures and visual hierarchy tests",
    description: "Comparing 3-pane split vs floating drawer systems to protect central chart legibility on 13-inch displays.",
    imageSrc: "/canva-deck/slide-09.png",
    authenticAsset: "deepastro/6.png (Slide 06) + wireframe deepastro.png",
    badge: "DEEPASTRO 06/10"
  },
  {
    id: 10,
    slideNum: "10",
    category: "DeepAstro",
    categoryLabel: "DeepAstro AI (10 Slides)",
    title: "Visual Design: Dark Glassmorphic Precision",
    role: "High-Fidelity Interface System",
    subtitle: "Calibrated contrast, cosmic palettes, and WCAG AA accessibility compliance",
    description: "7.2:1 contrast ratio, midnight obsidian surfaces (#080B11), custom vector glyphs, and soft ambient radial glows.",
    imageSrc: "/canva-deck/slide-10.png",
    authenticAsset: "deepastro/7.png (Slide 07)",
    badge: "DEEPASTRO 07/10"
  },
  {
    id: 11,
    slideNum: "11",
    category: "DeepAstro",
    categoryLabel: "DeepAstro AI (10 Slides)",
    title: "Interactive Prototyping & Motion Engineering",
    role: "Physics-Based Micro-Interactions",
    subtitle: "Real-time state machines, fluid spring physics, and seamless hover disclosures",
    description: "60fps celestial scrubber with spring physics (stiffness: 220, damping: 24) and aspect hover focus states.",
    imageSrc: "/canva-deck/slide-11.png",
    authenticAsset: "deepastro/8.png (Slide 08) + prototype.png",
    badge: "DEEPASTRO 08/10"
  },
  {
    id: 12,
    slideNum: "12",
    category: "DeepAstro",
    categoryLabel: "DeepAstro AI (10 Slides)",
    title: "Usability Testing & Empirical Validation",
    role: "Quantitative & Qualitative Benchmarks",
    subtitle: "Validating performance with real practitioners under timed operational conditions",
    description: "System Usability Scale (SUS) benchmark of 88.5/100 (Grade A+), 96.4% unassisted task completion rate.",
    imageSrc: "/canva-deck/slide-12.png",
    authenticAsset: "deepastro/9.png (Slide 09)",
    badge: "DEEPASTRO 09/10"
  },
  {
    id: 13,
    slideNum: "13",
    category: "DeepAstro",
    categoryLabel: "DeepAstro AI (10 Slides)",
    title: "Product Impact & 5-Phase Roadmap",
    role: "Strategic Product Evolution",
    subtitle: "From MVP validation to multi-platform product ecosystem",
    description: "5-phase strategic expansion from Core Ephemeris Engine and AI Copilot to Synastry, Mobile, and Developer APIs.",
    imageSrc: "/canva-deck/slide-13.png",
    authenticAsset: "deepastro/10.png (Slide 10)",
    badge: "DEEPASTRO 10/10"
  },
  {
    id: 14,
    slideNum: "14",
    category: "TradeX",
    categoryLabel: "TradeX Terminal (3 Slides)",
    title: "TradeX Pro — Trading Terminal Overview",
    role: "Principal Product Designer | Fintech & Trading",
    subtitle: "High-frequency multi-asset execution engine designed for extreme speed and visual clarity",
    description: "Institutional desktop trading cockpit for equities, crypto, and derivatives with sub-12ms UI render latency.",
    imageSrc: "/canva-deck/slide-14.png",
    authenticAsset: "case study preview.png",
    badge: "TRADEX 01/03"
  },
  {
    id: 15,
    slideNum: "15",
    category: "TradeX",
    categoryLabel: "TradeX Terminal (3 Slides)",
    title: "TradeX Pro — High-Density UI & Order Routing",
    role: "Data-Dense Financial Ergonomics",
    subtitle: "Level-2 market depth visualization, rapid DOM ladders, and hotkey ergonomics",
    description: "Modular docking tile system, monospace tabular numbers, and desaturated slate backgrounds minimizing eye fatigue.",
    imageSrc: "/canva-deck/slide-15.png",
    authenticAsset: "TradeX.png",
    badge: "TRADEX 02/03"
  },
  {
    id: 16,
    slideNum: "16",
    category: "TradeX",
    categoryLabel: "TradeX Terminal (3 Slides)",
    title: "TradeX Pro — Performance & Trader Validation",
    role: "Stress Testing & Execution Ergonomics",
    subtitle: "Reducing order entry mistakes by 82% through visual confirmation gates",
    description: "Slide-to-confirm order execution replacing intrusive modals and reducing fat-finger errors by 82%.",
    imageSrc: "/canva-deck/slide-16.png",
    authenticAsset: "tradex-case-study-board.jpg",
    badge: "TRADEX 03/03"
  },
  {
    id: 17,
    slideNum: "17",
    category: "FutureMind",
    categoryLabel: "FutureMind AI (2 Slides)",
    title: "FutureMind — AI Cognitive Workspace",
    role: "Product Designer & AI UX Researcher",
    subtitle: "Bridging linear thought with infinite 2D spatial canvas knowledge graphs",
    description: "Augmenting knowledge work with self-organizing thought trees, achieving 5x faster synthesis and +68% retention.",
    imageSrc: "/canva-deck/slide-17.png",
    authenticAsset: "Futuremind/overview case study.png",
    badge: "FUTUREMIND 01/02"
  },
  {
    id: 18,
    slideNum: "18",
    category: "FutureMind",
    categoryLabel: "FutureMind AI (2 Slides)",
    title: "FutureMind — Knowledge Synthesis UI",
    role: "Spatial Graph & Node Architecture",
    subtitle: "Adaptive thought trees and real-time semantic clustering",
    description: "Seamless transitions between distraction-free Markdown editor and physics-based associative 2D node graphs.",
    imageSrc: "/canva-deck/slide-18.png",
    authenticAsset: "projects/futuremind.png",
    badge: "FUTUREMIND 02/02"
  },
  {
    id: 19,
    slideNum: "19",
    category: "FigmaLab",
    categoryLabel: "Figma Lab (3 Slides)",
    title: "Figma Lab: Design System Foundations",
    role: "Token Engine & Variable Hierarchy",
    subtitle: "Architecting a multi-brand, multi-theme design system from atomic primitives to semantic tokens",
    description: "3-tier token hierarchy synchronized with Tailwind CSS and CSS Custom Properties with strict 4px grid rhythm.",
    imageSrc: "/canva-deck/slide-19.png",
    authenticAsset: "deepastro design system.png + phase 2.png",
    badge: "FIGMA LAB 01/03"
  },
  {
    id: 20,
    slideNum: "20",
    category: "FigmaLab",
    categoryLabel: "Figma Lab (3 Slides)",
    title: "Figma Lab: Component Architecture & Variants",
    role: "Auto-Layout 5.0 & Modular Slots",
    subtitle: "Zero-bloat component sets with 100% responsive constraints and complete interaction matrices",
    description: "Complete state matrices (Default, Hover, Active, Focus, Disabled, Error, Loading) matching React props 1:1.",
    imageSrc: "/canva-deck/slide-20.png",
    authenticAsset: "phase2.1.png + phase3.png",
    badge: "FIGMA LAB 02/03"
  },
  {
    id: 21,
    slideNum: "21",
    category: "FigmaLab",
    categoryLabel: "Figma Lab (3 Slides)",
    title: "Figma Lab: Dev Mode Handoff & Redlines",
    role: "Engineering Alignment & Implementation",
    subtitle: "Eliminating design drift with pixel-precise redlines, token inspect, and code contracts",
    description: "Explicit Dev Mode annotations, token inspector, keyboard navigation indexes, reducing frontend QA cycles by 40%.",
    imageSrc: "/canva-deck/slide-21.png",
    authenticAsset: "phase4.png",
    badge: "FIGMA LAB 03/03"
  },
  {
    id: 22,
    slideNum: "22",
    category: "VisualMotion",
    categoryLabel: "Visual & Motion (3 Slides)",
    title: "Visual Systems: Identity & Editorial Direction",
    role: "Creative Direction & Composition",
    subtitle: "High-impact visual storytelling, editorial typography, and brand identity systems",
    description: "Expressive display pairings, textured compositions, and multi-channel brand coherence across digital and print.",
    imageSrc: "/canva-deck/slide-22.png",
    authenticAsset: "photoshop/page1.png + page5.png",
    badge: "VISUAL SYSTEMS 01/03"
  },
  {
    id: 23,
    slideNum: "23",
    category: "VisualMotion",
    categoryLabel: "Visual & Motion (3 Slides)",
    title: "Visual Systems: 3D Art & Photoshop Retouching",
    role: "Photoshop & 3D Spatial Craft",
    subtitle: "Extreme attention to pixel detail, lighting models, and advanced digital matte manipulation",
    description: "Non-destructive smart-object workflows, ambient occlusion, PBR materials, and 300DPI print production.",
    imageSrc: "/canva-deck/slide-23.png",
    authenticAsset: "photoshop/page8.png + page12.png",
    badge: "VISUAL SYSTEMS 02/03"
  },
  {
    id: 24,
    slideNum: "24",
    category: "VisualMotion",
    categoryLabel: "Visual & Motion (3 Slides)",
    title: "Motion Lab: Physics-Based Motion Specs",
    role: "Interaction & Micro-Animation",
    subtitle: "Purposeful motion design that communicates spatial orientation and state progression",
    description: "Cubic-bezier timing curves (0.16, 1, 0.3, 1), spring parameters, Lottie exports, and reduced-motion compliance.",
    imageSrc: "/canva-deck/slide-24.png",
    authenticAsset: "photoshop/page18.png + deepastro preview5.png",
    badge: "MOTION LAB 03/03"
  },
  {
    id: 25,
    slideNum: "25",
    category: "Process",
    categoryLabel: "Process & Dossier (2 Slides)",
    title: "End-to-End Design Process & Rigour",
    role: "Cross-Functional Collaboration",
    subtitle: "From ambiguous problem statements to scaled, validated, production-shipped software",
    description: "5-stage design lifecycle: Discovery -> IA & Wireframes -> Systems & Hi-Fi -> Prototyping -> Engineering QA.",
    imageSrc: "/canva-deck/slide-25.png",
    authenticAsset: "CosmosX.png + CureIQ.png",
    badge: "PROCESS FRAMEWORK"
  },
  {
    id: 26,
    slideNum: "26",
    category: "Process",
    categoryLabel: "Process & Dossier (2 Slides)",
    title: "Let's Build Extraordinary Products",
    role: "Senior Product & UX Designer Dossier",
    subtitle: "Available for Senior Product Design roles, Design Systems leadership, and strategic product advisory",
    description: "Proven track record turning extreme domain complexity into intuitive, commercially successful software products.",
    imageSrc: "/canva-deck/slide-26.png",
    authenticAsset: "secureX.png",
    badge: "CANDIDATE DOSSIER"
  }
];

export const CANVA_CATEGORIES = [
  { key: "All", label: "All Slides (26)", count: 26 },
  { key: "Executive", label: "Executive & Identity", count: 3 },
  { key: "DeepAstro", label: "DeepAstro Flagship", count: 10 },
  { key: "TradeX", label: "TradeX Terminal", count: 3 },
  { key: "FutureMind", label: "FutureMind AI", count: 2 },
  { key: "FigmaLab", label: "Figma Lab Systems", count: 3 },
  { key: "VisualMotion", label: "Visual & Motion", count: 3 },
  { key: "Process", label: "Process & Dossier", count: 2 }
];
