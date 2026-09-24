"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Palette, X, ZoomIn,
  ArrowRight, ExternalLink
} from "lucide-react";

interface GraphicItem {
  id: string;
  title: string;
  category: "brand" | "graphic" | "compositing" | "editorial";
  badge: string;
  description: string;
  image: string;
  tools: string[];
  specs: string;
  concept?: string;
  sketch?: string;
  construction?: string;
  application?: string;
}

/* ─── Animation Variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

/* ─── Focus Trap Hook ─────────────────────────────────────── */
function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active || !containerRef.current) return;
    const el = containerRef.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [active, containerRef]);
}

export default function VisualSystems() {
  const [activeTab, setActiveTab] = useState<"all" | "brand" | "graphic" | "compositing">("all");
  const [selectedItem, setSelectedItem] = useState<GraphicItem | null>(null);
  const [activeLogoStep, setActiveLogoStep] = useState<"concept" | "sketch" | "construction" | "final" | "application">("final");

  /* ─── Scroll-trigger refs ─────────────────────────────── */
  const sectionRef = useRef<HTMLElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const matrixInView = useInView(matrixRef, { once: true, margin: "-60px" });
  const brandInView = useInView(brandRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  /* ─── Accessibility: lock scroll & key handlers ───────── */
  const closeModal = useCallback(() => setSelectedItem(null), []);

  useEffect(() => {
    if (!selectedItem) { document.body.style.overflow = ""; return; }
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKeyDown); };
  }, [selectedItem, closeModal]);

  useFocusTrap(!!selectedItem, modalRef);

  /* ─── Data ────────────────────────────────────────────── */
  const graphicWorks: GraphicItem[] = [
    {
      id: "photo-manipulation",
      title: "Surreal Atmospheric Compositing",
      category: "compositing",
      badge: "Matte Painting • Photoshop",
      description: "Complex digital matte compositing combining multiple photographic exposures, customized volumetric lighting, atmospheric fog, and edge-blended micro-textures.",
      image: "/images/graphics/photo manipulation.png",
      tools: ["Photoshop CC", "Wacom Intuos", "Camera Raw"],
      specs: "6000×4000px • 300 DPI • 48 Layers",
      concept: "Synthesize solitary human contemplation against an infinite cosmic mountain landscape.",
      sketch: "Rough spatial silhouette blocking establishing rule-of-thirds horizon line.",
      construction: "Multi-point light keying, frequency separation skin retouching, and shadow feathering.",
      application: "Exhibition print, high-resolution hero keyart, album packaging.",
    },
    {
      id: "imagination-reality",
      title: "Imagination to Reality",
      category: "compositing",
      badge: "Creative Visual Art",
      description: "High-concept surrealistic artwork exploring dreamscape dimensions, spatial depth transitions, and cinematic golden hour illumination.",
      image: "/images/graphics/imagination to reality.png",
      tools: ["Photoshop", "Lightroom", "Color Lookup Tables"],
      specs: "Ultra-HD Print Master • 16-Bit ProPhoto",
      concept: "Visualizing the subconscious threshold where creative ideas crystallize into physical reality.",
      sketch: "Thumbnail sketches testing atmospheric perspective and leading eye lines.",
      construction: "Precision mask clipping, luminance gradient mapping, and particle smoke overlays.",
      application: "Digital art showcase and agency promotional hero visual.",
    },
    {
      id: "movie-poster",
      title: "Theatrical Movie Poster Keyart",
      category: "editorial",
      badge: "Theatrical Print • High Res",
      description: "Major studio theatrical poster layout with custom title typography, dramatic chiaroscuro character lighting, floating ember particles, and billing block hierarchy.",
      image: "/images/graphics/movie poster.png",
      tools: ["Photoshop", "Illustrator", "InDesign"],
      specs: "27×40 in One-Sheet • CMYK Offset Print",
      concept: "High-stakes heroic confrontation with high emotional contrast and visceral tension.",
      sketch: "Traditional triangle keyart composition focusing focal energy on character eyes.",
      construction: "Custom typography kerning, distress texturing, and calibrated color grading.",
      application: "Cinema lobby lightboxes, outdoor billboards, and streaming thumbnail keyart.",
    },
    {
      id: "brand-identity",
      title: "Corporate Brand Identity & Token Architecture",
      category: "brand",
      badge: "Full Brand System",
      description: "End-to-end corporate identity guidelines including logomark geometry, primary and secondary color tokens, typography scales, business stationery, and brand voice guidelines.",
      image: "/images/graphics/branding.png",
      tools: ["Illustrator", "InDesign", "Figma"],
      specs: "Comprehensive Brand Guidelines PDF • Vector Master",
      concept: "Geometric precision meets trustworthy corporate authority with timeless elegance.",
      sketch: "50+ logomark ideation thumbnails exploring abstract letterforms and golden ratio arcs.",
      construction: "Strict optical alignment, grid construction curves, and mathematical spacing tokens.",
      application: "Corporate stationery, signage, mobile app icons, and investor pitch decks.",
    },
    {
      id: "brand-collaterals",
      title: "Modern Brand Identity Collaterals",
      category: "brand",
      badge: "Vector & Packaging",
      description: "Secondary brand collateral ecosystem featuring premium packaging mockups, embossed stationery, logo variation matrix, and high-impact vector iconography.",
      image: "/images/graphics/branding2.png",
      tools: ["Illustrator", "Photoshop 3D Mockup"],
      specs: "Vector SVG Master + 300 DPI CMYK Print",
      concept: "Tactile premium presentation conveying artisan craft and modern minimalism.",
      sketch: "Die-cut box packaging prototypes and finish treatment callouts.",
      construction: "Spot UV varnish specifications and foil-stamping vector separation layers.",
      application: "Retail product packaging, corporate gift boxes, and brand touchpoints.",
    },
    {
      id: "magazine-cover",
      title: "Editorial Magazine Cover Typography",
      category: "editorial",
      badge: "Editorial Typography",
      description: "Contemporary publication cover design featuring bold editorial serif typography, structured column alignment, high-fashion color palette, and subtle depth-of-field.",
      image: "/images/graphics/magazine book cover.png",
      tools: ["Photoshop", "InDesign", "Typography Pairing"],
      specs: "A4 Trim Size • Newsstand UV Coated",
      concept: "Sophisticated editorial gravitas blending fashion, architecture, and technology.",
      sketch: "Editorial layout wireframes balancing barcode, masthead, and feature teasers.",
      construction: "Negative space balance allowing portrait hair to overlap the publication masthead.",
      application: "Print newsstand edition and tablet interactive e-magazine.",
    },
    {
      id: "social-creatives",
      title: "Performance Social Media Campaign",
      category: "graphic",
      badge: "High-Converting Ad Creatives",
      description: "Cohesive multi-platform social advertising suite designed for Instagram stories, feed carousels, and LinkedIn campaigns with calibrated thumb-stopping contrast.",
      image: "/images/graphics/social creatives.png",
      tools: ["Photoshop", "Illustrator", "Figma"],
      specs: "1080×1080 & 1080×1920 • Retina Verified",
      concept: "Thumb-stopping social ads maximizing CTR while preserving strict brand aesthetic guidelines.",
      sketch: "Layout wireframes testing headline eye-tracking zones and CTA placements.",
      construction: "Bold typography hierarchy with high-contrast accent gold badges.",
      application: "Paid social campaigns across Meta, LinkedIn, and Google Display Network.",
    },
    {
      id: "commercial-flyer",
      title: "Commercial Marketing Collateral",
      category: "graphic",
      badge: "Print Ready • CMYK",
      description: "Dynamic marketing flyer with clean geometric zoning, vibrant gradient accents, scannable offer bullet points, and high-contrast call-to-action flow.",
      image: "/images/graphics/flyerdesign.png",
      tools: ["Illustrator", "Photoshop", "Acrobat Preflight"],
      specs: "A5 Double-Sided • 3mm Bleed CMYK",
      concept: "Direct-response promotional piece balancing informational density with visual breathing room.",
      sketch: "Z-pattern reading hierarchy layout sketched with pencil.",
      construction: "Bleed and safe margin compliance with embedded vector fonts.",
      application: "Direct-mail campaigns, conference handouts, and in-store displays.",
    },
    {
      id: "luxury-invitation",
      title: "Luxury Event Invitation Stationery",
      category: "brand",
      badge: "Gold Foil Finish",
      description: "Bespoke formal event invitation featuring custom luxury typography, delicate gold foil filigree accents, minimalist framing, and tactile cardstock texture.",
      image: "/images/graphics/invitation card.png",
      tools: ["Illustrator", "Photoshop Texturing"],
      specs: "5×7 in Custom Die-Cut • Metallic Foil Plate",
      concept: "Understated opulence for high-profile executive gala and exclusive brand launch.",
      sketch: "Hand-lettered serif monogram sketches and border proportions.",
      construction: "Foil plate vector separation layers and blind deboss registration marks.",
      application: "VIP event invitations and collector keepsake cards.",
    },
    {
      id: "pitch-deck-poster",
      title: "Corporate Pitch & Visual Deck Systems",
      category: "editorial",
      badge: "Executive Presentation",
      description: "Editorial slide deck collage synthesizing complex business narratives, data charts, and brand photography into clean executive presentation spreads.",
      image: "/images/project_graphics_promo_poster.jpg",
      tools: ["PowerPoint", "Photoshop", "Illustrator"],
      specs: "16:9 Widescreen • 4K Master Deck",
      concept: "Elevate corporate investor pitch from dry spreadsheets to cinematic executive storytelling.",
      sketch: "Storyline storyboard mapping problem statement to market ROI proof points.",
      construction: "Tokenized color hierarchy with dark charcoal backgrounds and gold emphasis points.",
      application: "Series A venture pitch decks and enterprise client proposals.",
    },
  ];

  const filteredWorks =
    activeTab === "all" ? graphicWorks : graphicWorks.filter((w) => w.category === activeTab);

  const capabilities = [
    { label: "BRAND", desc: "Identity & Guidelines", num: "01" },
    { label: "GRAPHIC", desc: "Editorial & Print Keyart", num: "02" },
    { label: "COMPOSITING", desc: "Matte Art & Photoshop", num: "03" },
    { label: "UI SYSTEMS", desc: "Component Tokens", num: "04" },
    { label: "AI VISUALS", desc: "Prompt & Diffusion Art", num: "05" },
  ];

  const logoSteps = ["concept", "sketch", "construction", "final", "application"] as const;
  const stepContent: Record<typeof logoSteps[number], { title: string; body: string; bullets: string[] }> = {
    concept: {
      title: "Conceptual Ideation & Semiotics",
      body: "Analyzing corporate market positioning, competitive whitespace, and core brand values. The objective was formulating a timeless mark combining institutional strength with forward-looking technological agility.",
      bullets: ["Semiotics: Upward trajectory, golden ratio balance, structural integrity.", "Audience: High-net-worth investors, enterprise partners, modern consumers."],
    },
    sketch: {
      title: "Pencil Thumbnails & Optical Iterations",
      body: "Executing over 60 rapid pencil ideation thumbnails. Stress-testing silhouette clarity at 16×16px favicon scale up to 40-foot outdoor billboard distances to guarantee instantaneous recognition.",
      bullets: ["Tested 12 distinct ligature and geometric monograms.", "Optical testing against dense monochrome backgrounds."],
    },
    construction: {
      title: "Vector Grid & Golden Ratio Geometry",
      body: "Constructing mathematical vector curves in Adobe Illustrator. Every arc, tangent, and negative space aperture conforms to Fibonacci proportions (1:1.618) to ensure visual stability.",
      bullets: ["Zero unanchored bezier artifacts or uneven stroke weights.", "Exact mathematical clearance boundaries for responsive lockups."],
    },
    final: {
      title: "Master Identity Mark & Color Tokens",
      body: "The finalized brand emblem rendered in metallic gold and deep carbon black. Engineered to project prestige, clarity, and authority across light and dark backgrounds with zero optical distortion.",
      bullets: ["Gold Accent: #D4AF37 (Warm Luxury Pantone 871 C)", "Charcoal Base: #090A0E (Ultra-dense digital black)"],
    },
    application: {
      title: "Multi-Touchpoint Collateral Deployment",
      body: "Deploying the identity system across real-world collateral: foil-stamped business cards, embossed packaging boxes, digital mobile app icons, corporate signage, and executive stationery.",
      bullets: ["100% vector consistency across print (CMYK) and digital (RGB).", "Exported to SVG, PDF, EPS, and resolution-independent assets."],
    },
  };

  return (
    <section
      id="visual"
      ref={sectionRef}
      aria-label="Visual Systems and Art Direction"
      className="relative py-24 bg-[#FAFAF7] dark:bg-[#090A0E] text-[#111318] dark:text-white transition-colors duration-250 overflow-hidden"
    >
      {/* Background Ambience */}
      <div aria-hidden="true" className="absolute top-[15%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#B8941F]/5 dark:bg-[#D4AF37]/5 blur-[120px] pointer-events-none will-change-transform" />
      <div aria-hidden="true" className="absolute bottom-[20%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[#FF6B00]/5 blur-[120px] pointer-events-none will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={sectionInView ? "show" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0F1118] border border-[#B8941F]/40 dark:border-[#D4AF37]/30 text-[#111318] dark:text-gray-300 text-xs font-bold tracking-wider uppercase shadow-sm mb-3">
            <Palette className="w-3.5 h-3.5 text-[#B8941F] dark:text-[#D4AF37]" aria-hidden="true" />
            <span>VISUAL SYSTEMS &amp; ART DIRECTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111318] dark:text-white">
            VISUAL <span className="text-gradient-gold">CRAFT</span>
          </h2>

          <div aria-hidden="true" className="w-16 h-[2px] bg-[#D4AF37] mt-4 shadow-[0_0_8px_#D4A017]" />

          <p className="text-[#374151] dark:text-[#D1D5DB] mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
            I don&apos;t only design interfaces — I understand visual communication. Across brand architecture, print typography, digital compositing, and art direction, each piece embodies rigor and narrative depth.
          </p>
        </motion.div>

        {/* ── Visual Craft Capability Matrix ──────────────── */}
        <div ref={matrixRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-16">
          {capabilities.map((pill, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate={matrixInView ? "show" : "hidden"}
              variants={fadeUp}
              custom={idx}
              className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0F1118] text-center hover:border-[#D4AF37] hover:shadow-md transition-all duration-200 shadow-sm will-change-transform"
            >
              <span aria-hidden="true" className="font-mono text-[10px] text-[#B8941F] dark:text-[#D4AF37] font-bold block mb-1">
                // {pill.num}
              </span>
              <h4 className="font-black text-xs sm:text-sm tracking-wider text-[#111318] dark:text-white uppercase">
                {pill.label}
              </h4>
              <p className="text-[10px] text-[#667085] dark:text-gray-400 mt-1 font-medium">
                {pill.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Brand Construction Matrix ────────────────────── */}
        <motion.div
          ref={brandRef}
          initial="hidden"
          animate={brandInView ? "show" : "hidden"}
          variants={scaleIn}
          className="mb-20 p-6 sm:p-8 rounded-2xl border-[1.5px] border-[#D4AF37]/50 bg-white dark:bg-[#0F1118] shadow-xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/10 dark:border-white/10 pb-6 mb-8 gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B8941F] dark:text-[#D4AF37] block mb-1">
                CURATED LOGO &amp; IDENTITY SYSTEM
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#111318] dark:text-white uppercase tracking-wide">
                Geometric Brand Construction Matrix
              </h3>
              <p className="text-xs text-[#4B5563] dark:text-gray-400 mt-1">
                Demonstrating rigorous craft progression: from initial creative concept through vector grid geometry and real-world collateral deployment.
              </p>
            </div>

            {/* Stepper Tabs */}
            <div
              role="tablist"
              aria-label="Logo design process steps"
              className="flex flex-wrap items-center gap-1.5 bg-black/5 dark:bg-black/30 p-1.5 rounded-xl border border-black/5 dark:border-white/5 self-start md:self-auto"
            >
              {logoSteps.map((step) => (
                <button
                  key={step}
                  role="tab"
                  aria-selected={activeLogoStep === step}
                  onClick={() => setActiveLogoStep(step)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                    activeLogoStep === step
                      ? "bg-[#D4AF37] text-black shadow-sm font-extrabold"
                      : "text-[#4B5563] dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Narrative */}
            <div className="lg:col-span-5 space-y-4">
              <span className="px-2.5 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[10px] font-mono font-bold text-[#B8941F] dark:text-[#D4AF37] uppercase">
                Phase: {activeLogoStep.toUpperCase()}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLogoStep}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <h4 className="text-lg font-black text-[#111318] dark:text-white">{stepContent[activeLogoStep].title}</h4>
                  <p className="text-xs text-[#374151] dark:text-gray-300 leading-relaxed">{stepContent[activeLogoStep].body}</p>
                  <ul className="text-xs space-y-1.5 text-[#4B5563] dark:text-gray-400 list-disc list-inside">
                    {stepContent[activeLogoStep].bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg group bg-[#0A0E17] will-change-transform">
                <Image
                  src={activeLogoStep === "application" ? "/images/graphics/branding2.png" : "/images/graphics/branding.png"}
                  alt={`Brand design — ${activeLogoStep} phase`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50" />
                <div aria-hidden="true" className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-mono text-[10px] text-[#F5BA42] font-bold">
                    SYSTEM SPEC: LOGO_{activeLogoStep.toUpperCase()}_v2.4
                  </span>
                  <span className="text-[10px] font-mono text-gray-300">Vector Master Spec</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Filter Tabs ──────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-black/10 dark:border-white/10 pb-6 mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8941F] dark:text-[#D4AF37]">
              EDITORIAL &amp; PRINT GRID
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#111318] dark:text-white uppercase tracking-wider">
              Selected Graphic Works
            </h3>
          </div>

          <div role="group" aria-label="Filter graphic works by category" className="flex flex-wrap gap-2">
            {([
              { id: "all", label: "All Works" },
              { id: "compositing", label: "Compositing" },
              { id: "editorial", label: "Editorial & Posters" },
              { id: "brand", label: "Brand Systems" },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                aria-pressed={activeTab === tab.id}
                className={`px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                  activeTab === tab.id
                    ? "bg-[#D4AF37] text-black font-extrabold shadow-md scale-105"
                    : "bg-white dark:bg-[#0F1118] border border-[#D6B95A] dark:border-white/10 text-[#374151] dark:text-gray-300 hover:border-[#D4AF37]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Editorial Grid ───────────────────────────────── */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((item, idx) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: gridInView ? idx * 0.05 : 0 }}
                className="group p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0F1118] hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between will-change-transform"
              >
                <div>
                  {/* Visual */}
                  <div
                    onClick={() => setSelectedItem(item)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect ${item.title} in detail`}
                    onKeyDown={(e) => e.key === "Enter" && setSelectedItem(item)}
                    className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-[#0A0E17] border border-black/10 dark:border-white/10 mb-4 cursor-pointer group/img focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/img:scale-105 will-change-transform"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity" />
                    <div aria-hidden="true" className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 text-[9px] font-mono text-[#F5BA42] font-bold">
                      {item.badge}
                    </div>
                    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-black/70 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-lg backdrop-blur-sm">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-[#B8941F] dark:text-[#F5BA42] uppercase tracking-wider block mb-1 font-bold">
                    {item.category.toUpperCase()} • {item.specs}
                  </span>
                  <h4 className="font-extrabold text-base text-[#111318] dark:text-white uppercase tracking-wider mb-2 group-hover:text-[#B8941F] dark:group-hover:text-[#F5BA42] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#4B5563] dark:text-gray-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tools.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[9px] font-mono text-[#667085] dark:text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedItem(item)}
                    aria-label={`Inspect ${item.title}`}
                    className="text-[#B8941F] dark:text-[#D4AF37] hover:underline font-bold text-xs uppercase flex items-center space-x-1 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] rounded"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Extended Gallery CTA ─────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={gridInView ? "show" : "hidden"}
          variants={fadeUp}
          custom={3}
          className="mt-16 p-8 rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-r from-black/5 via-gold/5 to-black/5 dark:from-[#0F1118] dark:via-[#1A1810] dark:to-[#0F1118] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md"
        >
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold text-[#B8941F] dark:text-[#D4AF37] uppercase tracking-widest block">
              EXTENDED DIGITAL VAULT
            </span>
            <h4 className="text-xl font-black text-[#111318] dark:text-white uppercase">
              Photoshop 21-Artwork Dedicated Gallery
            </h4>
            <p className="text-xs text-[#4B5563] dark:text-gray-300 max-w-xl leading-relaxed">
              Explore all 21 full-resolution matte paintings, surreal compositions, and digital photo retouching studies.
            </p>
          </div>
          <a
            href="/photoshop"
            className="btn-primary shrink-0 flex items-center space-x-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
          >
            <span>Launch 21 Artworks Gallery</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>

      </div>

      {/* ── Lightbox Modal ────────────────────────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`Artwork detail: ${selectedItem.title}`}
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22 }}
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0F1118] border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 text-[#111318] dark:text-white"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                aria-label="Close detail view"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#0A0E17]">
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <span className="px-2.5 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[10px] font-mono font-bold text-[#B8941F] dark:text-[#D4AF37] uppercase">
                    {selectedItem.badge}
                  </span>
                  <h3 className="text-2xl font-black text-[#111318] dark:text-white uppercase">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] dark:text-gray-300 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-2 text-xs">
                    <div>
                      <span className="font-mono text-[10px] text-[#667085] dark:text-gray-400 uppercase block font-bold">Concept &amp; Intent:</span>
                      <p className="text-slate-800 dark:text-slate-200 mt-0.5">{selectedItem.concept}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#667085] dark:text-gray-400 uppercase block font-bold">Craft &amp; Construction:</span>
                      <p className="text-slate-800 dark:text-slate-200 mt-0.5">{selectedItem.construction}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#667085] dark:text-gray-400 uppercase block font-bold">Technical Specs:</span>
                      <p className="text-[#B8941F] dark:text-[#D4AF37] font-mono mt-0.5">{selectedItem.specs}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-2">
                    {selectedItem.tools.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] font-mono font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
