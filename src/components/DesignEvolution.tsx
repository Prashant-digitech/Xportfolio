"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ExternalLink, 
  Maximize2, 
  X, 
  FileText, 
  Layers, 
  TrendingUp, 
  Calendar, 
  Eye, 
  Play, 
  Pause, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Palette,
  Layout,
  Cpu
} from "lucide-react";

interface EvolutionEpoch {
  year: string;
  period: string;
  badge: string;
  title: string;
  subtitle: string;
  philosophy: string;
  thinkingShift: string;
  craftFocus: string[];
  tools: string[];
  impactMetric: { value: string; label: string };
  pdfUrl: string;
  pdfTitle: string;
  pdfSize: string;
  accentColor: string;
  previewImage: string;
}

const EPOCHS: EvolutionEpoch[] = [
  {
    year: "2020",
    period: "2019 – 2021",
    badge: "FOUNDATIONAL CRAFT",
    title: "Visual Artistry & Photorealistic Compositing",
    subtitle: "Mastering light, focal depth, color balance, and emotive narrative imagery.",
    philosophy: "Every pixel is an intentional brushstroke. Focus on mood, atmospheric lighting, and high-impact visual storytelling.",
    thinkingShift: "Transitioned from basic graphic execution to high-fidelity matte painting, multi-source shadow matching, and cinematic poster aesthetics.",
    craftFocus: [
      "Photorealistic Compositing",
      "Cinematic Color Grading",
      "Dynamic Focal Depth & Lighting",
      "Editorial Title Typography",
      "Creative Matte Painting"
    ],
    tools: ["Adobe Photoshop", "Illustrator", "Lightroom", "Wacom Intuos", "Camera Raw"],
    impactMetric: { value: "100+ Works", label: "Crafted Commercial Artworks" },
    pdfUrl: "/evolution/prashant-portfolio-2020.pdf",
    pdfTitle: "Prashant Portfolio (2020 Edition) · Graphic & Visual Arts",
    pdfSize: "43.4 MB",
    accentColor: "#FF6B00",
    previewImage: "/photoshop/page2.png"
  },
  {
    year: "2024",
    period: "2022 – 2024",
    badge: "SYSTEMIC IDENTITY",
    title: "Brand Systems & Multi-Disciplinary Collateral",
    subtitle: "Elevating standalone imagery into cohesive corporate visual systems and marketing suites.",
    philosophy: "Design must scale across touchpoints. Consistency, typography tokens, vector purity, and business communication drive brand recall.",
    thinkingShift: "Shifted from isolated creative pieces to reusable brand architectural guidelines, commercial collateral suites, corporate pitch decks, and cross-channel marketing campaigns.",
    craftFocus: [
      "Corporate Visual Identity",
      "Multi-Channel Campaign Architecture",
      "Executive Pitch Deck Design",
      "Commercial Flex & Print Systems",
      "Vector Iconography & Tokens"
    ],
    tools: ["Figma", "Adobe Illustrator", "Photoshop", "Premiere Pro", "Canva Enterprise"],
    impactMetric: { value: "35+ Brands", label: "Commercial Identity Deliverables" },
    pdfUrl: "/evolution/prashant-portfolio-2024.pdf",
    pdfTitle: "Prashant Portfolio (2024 Edition) · Brand Systems & Corporate Decks",
    pdfSize: "43.2 MB",
    accentColor: "#00E5FF",
    previewImage: "/photoshop/page11.png"
  },
  {
    year: "2026",
    period: "2025 – Present",
    badge: "PRODUCT & AI ECOSYSTEMS",
    title: "Senior Product Design, Design Tokens & AI Architectures",
    subtitle: "Unifying human-centered heuristics, WCAG AA compliance, design tokens, and production engineering.",
    philosophy: "Great software bridges deep user empathy, rigorous systemic ergonomics, and zero-defect production implementation.",
    thinkingShift: "Complete convergence of human-centered UX heuristics, automated design tokens, offline-first SQLite POS checkout engines (<450ms), and conversational AI concierges.",
    craftFocus: [
      "Scalable Design Token Systems",
      "WCAG 2.1 AA (10:1 Contrast)",
      "High-Speed POS Ergonomics",
      "Offline-First SQLite Architecture",
      "AI Concierge & Telemetry HUDs"
    ],
    tools: ["Figma Tokens", "Next.js", "Tailwind CSS", "TypeScript", "ESC/POS", "ElectricSQL"],
    impactMetric: { value: "26 Pages", label: "Master Product Design Specification" },
    pdfUrl: "/evolution/prashant-portfolio-2026.pdf",
    pdfTitle: "Senior Product Designer & Systems Lead (2026 Master Deck · 26 Pages)",
    pdfSize: "57.5 MB",
    accentColor: "#D4AF37",
    previewImage: "/photoshop/page1.png"
  }
];

// The 21 master artwork pages from the portfolio
const ARTWORK_SLIDES = [
  { id: 1, title: "Executive Cover & Identity", path: "/photoshop/page1.png", year: "2026", era: "Product Lead", note: "Master typography and golden ratio grid structure" },
  { id: 2, title: "Surreal Atmospheric Composite", path: "/photoshop/page2.png", year: "2020", era: "Visual Craft", note: "Multi-source lighting balance and depth atmospheric perspective" },
  { id: 3, title: "Cinematic Matte Painting", path: "/photoshop/page3.png", year: "2020", era: "Visual Craft", note: "Environmental world-building and celestial color palette" },
  { id: 4, title: "Geometric Brand Composition", path: "/photoshop/page4.png", year: "2021", era: "Graphic Precision", note: "High-contrast minimalist layout and negative space" },
  { id: 5, title: "Character Lighting Integration", path: "/photoshop/page5.png", year: "2021", era: "Graphic Precision", note: "Subsurface scattering and rim lighting compositing" },
  { id: 6, title: "Cosmic Landscape Study", path: "/photoshop/page6.png", year: "2022", era: "Graphic Precision", note: "Expansive horizon, nebula gradients, and scale proportion" },
  { id: 7, title: "Atmospheric Visual Glow", path: "/photoshop/page7.png", year: "2022", era: "Graphic Precision", note: "Volumetric fog, specular flares, and photographic grain" },
  { id: 8, title: "Dynamic Action Poster", path: "/photoshop/page8.png", year: "2023", era: "Brand Systems", note: "Kinetic visual flow and commercial movie title layout" },
  { id: 9, title: "Futuristic Cybernetic Art", path: "/photoshop/page9.png", year: "2023", era: "Brand Systems", note: "Neon lighting vectors and digital telemetry accents" },
  { id: 10, title: "Commercial Editorial Retouch", path: "/photoshop/page10.png", year: "2023", era: "Brand Systems", note: "High-end product packaging and studio illumination" },
  { id: 11, title: "Abstract Corporate Branding", path: "/photoshop/page11.png", year: "2024", era: "Brand Systems", note: "Modular geometric system and brand guidelines" },
  { id: 12, title: "High-Contrast Event Poster", path: "/photoshop/page12.png", year: "2024", era: "Brand Systems", note: "Bold typography hierarchy and architectural grid" },
  { id: 13, title: "Creative Merchandise Showcase", path: "/photoshop/page13.png", year: "2024", era: "Brand Systems", note: "Tactile material finish and retail presentation" },
  { id: 14, title: "Environmental Experience Canvas", path: "/photoshop/page14.png", year: "2025", era: "Product & UX", note: "Digital product hero storytelling and responsive layout" },
  { id: 15, title: "Telemetry Glow & HUD System", path: "/photoshop/page15.png", year: "2025", era: "Product & UX", note: "Real-time sensor telemetry and dark mode luminosity" },
  { id: 16, title: "Cyber HUD Interface Concept", path: "/photoshop/page16.png", year: "2025", era: "Product & UX", note: "Dense operational status cards and accessible contrast" },
  { id: 17, title: "Cross-Platform Token Suite", path: "/photoshop/page17.png", year: "2025", era: "Product & UX", note: "Scalable color tokens, elevation layers, and icon sets" },
  { id: 18, title: "AI-Augmented Creative Concept", path: "/photoshop/page18.png", year: "2026", era: "Product & UX", note: "Generative workflow synthesis and human curation" },
  { id: 19, title: "Spatial Navigation Architecture", path: "/photoshop/page19.png", year: "2026", era: "Product & UX", note: "Context-aware progressive disclosure for complex apps" },
  { id: 20, title: "Glassmorphic Lighting Model", path: "/photoshop/page20.png", year: "2026", era: "Product & UX", note: "Backdrop blur calibration and 1px specular micro-borders" },
  { id: 21, title: "Unified Design Manifesto", path: "/photoshop/page21.png", year: "2026", era: "Product & UX", note: "Synthesis of visual craft, ergonomic UX, and engineering rigor" }
];

export default function DesignEvolution() {
  const [selectedEpoch, setSelectedEpoch] = useState<string>("2026");
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const [isPlayingCarousel, setIsPlayingCarousel] = useState<boolean>(true);
  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false);
  const [activePdf, setActivePdf] = useState<{ url: string; title: string; year: string; size: string } | null>(null);
  const [isFullscreenPdf, setIsFullscreenPdf] = useState<boolean>(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlayingCarousel || pdfModalOpen) return;
    const interval = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % ARTWORK_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlayingCarousel, pdfModalOpen]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailStripRef.current) {
      const activeThumb = thumbnailStripRef.current.children[currentSlideIdx] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [currentSlideIdx]);

  // Handle keyboard events for modal & carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreenPdf) {
          setIsFullscreenPdf(false);
        } else if (pdfModalOpen) {
          setPdfModalOpen(false);
          setActivePdf(null);
        }
      } else if (!pdfModalOpen) {
        if (e.key === "ArrowLeft") {
          setCurrentSlideIdx((prev) => (prev === 0 ? ARTWORK_SLIDES.length - 1 : prev - 1));
        } else if (e.key === "ArrowRight") {
          setCurrentSlideIdx((prev) => (prev + 1) % ARTWORK_SLIDES.length);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pdfModalOpen, isFullscreenPdf]);

  const openPdfViewer = (epoch: EvolutionEpoch) => {
    setActivePdf({
      url: epoch.pdfUrl,
      title: epoch.pdfTitle,
      year: epoch.year,
      size: epoch.pdfSize
    });
    setPdfModalOpen(true);
    setIsPlayingCarousel(false);
  };

  const activeEpochData = EPOCHS.find((e) => e.year === selectedEpoch) || EPOCHS[2];
  const currentSlide = ARTWORK_SLIDES[currentSlideIdx];

  return (
    <section 
      id="evolution" 
      aria-label="Design Evolution and Multi-Year Trajectory"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAF7] dark:bg-[#07090F] transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient telemetry glows */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#E2E5EA] dark:border-[rgba(212,175,55,0.2)]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>EVOLUTIONARY TRAJECTORY // 2020 → 2024 → 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B0F19] dark:text-white">
              From Visual Craft to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11]">
                Systemic Product Engineering
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#555C68] dark:text-[#9BA1B0] leading-relaxed">
              Explore 6+ years of deliberate evolution — progressing from photorealistic matte painting and cinematic
              composites to enterprise design token architectures, offline-first commerce POS engines, and conversational AI.
            </p>
          </div>

          {/* Quick PDF Access Buttons in Header */}
          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-2.5">
            {EPOCHS.map((epoch) => (
              <button
                key={epoch.year}
                type="button"
                onClick={() => openPdfViewer(epoch)}
                className="group relative px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer bg-white/70 dark:bg-[#101422] border border-black/10 dark:border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] text-[#111318] dark:text-white"
              >
                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{epoch.year} PDF Deck</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        {/* 1. THREE EPOCHS TIMELINE INTERACTIVE TABS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {EPOCHS.map((epoch) => {
            const isSelected = selectedEpoch === epoch.year;
            return (
              <div
                key={epoch.year}
                role="button"
                tabIndex={0}
                data-epoch-card={epoch.year}
                onClick={() => setSelectedEpoch(epoch.year)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedEpoch(epoch.year);
                  }
                }}
                className={`relative p-6 rounded-2xl transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? "bg-gradient-to-b from-white/90 to-white/70 dark:from-[#111628] dark:to-[#0A0D18] border-[#D4AF37] shadow-[0_8px_30px_rgba(212,175,55,0.22)] ring-1 ring-[#D4AF37]/50"
                    : "bg-white/50 dark:bg-[#0A0D16]/60 border-black/10 dark:border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/80 dark:hover:bg-[#0E1322]"
                }`}
              >
                {/* Year and Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-2xl font-black text-[#0B0F19] dark:text-white tracking-tight">
                      {epoch.year}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                      ({epoch.period})
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isSelected
                      ? "bg-[#D4AF37] text-black shadow-sm"
                      : "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                  }`}>
                    {epoch.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0B0F19] dark:text-white mb-2 leading-snug">
                  {epoch.title}
                </h3>
                <p className="text-xs text-[#555C68] dark:text-[#9BA1B0] line-clamp-2 leading-relaxed mb-4">
                  {epoch.subtitle}
                </p>

                {/* Inspect Button with Glowing Trigger */}
                <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#D4AF37]">
                    {epoch.impactMetric.value} • {epoch.impactMetric.label}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPdfViewer(epoch);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#B8941F] hover:text-black dark:text-[#F5BA42] dark:hover:text-black transition-all cursor-pointer shadow-[0_0_10px_rgba(212,175,55,0.15)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  >
                    <span>View PDF</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. ACTIVE EPOCH DEEP-DIVE SPOTLIGHT */}
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 mb-20 bg-white/80 dark:bg-[#0D1222]/90 backdrop-blur-xl border border-[#E2E5EA] dark:border-[rgba(212,175,55,0.3)] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  EPOCH DEEP-DIVE // {activeEpochData.year} ARCHITECTURAL SHIFT
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19] dark:text-white mb-4">
                {activeEpochData.title}
              </h3>

              {/* Design Thinking Shift Quote Card */}
              <div className="p-4 rounded-xl mb-6 bg-[#F6F8FB] dark:bg-[#080B14] border-l-4 border-[#D4AF37] border-y border-r border-[#E2E6EE] dark:border-white/5">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>The Evolution of Design Thinking</span>
                </div>
                <p className="text-xs sm:text-sm text-[#374151] dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{activeEpochData.thinkingShift}&rdquo;
                </p>
              </div>

              <p className="text-sm text-[#4B5260] dark:text-[#A0A6B8] leading-relaxed mb-6">
                <strong className="text-[#0B0F19] dark:text-white">Core Philosophy:</strong> {activeEpochData.philosophy}
              </p>

              {/* Craft Focus Pills */}
              <div className="mb-6">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
                  Specialized Craft Focus:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeEpochData.craftFocus.map((focus) => (
                    <span
                      key={focus}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#F1F4F9] dark:bg-[#13192B] text-[#1E293B] dark:text-[#E2E8F0] border border-[#DCE2EC] dark:border-[rgba(212,175,55,0.2)]"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools Stack */}
              <div className="mb-8">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
                  Tooling & Implementation Stack:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeEpochData.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-black/10 dark:border-white/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openPdfViewer(activeEpochData)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide text-black bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Inspect {activeEpochData.year} PDF Deck</span>
                </button>

                <a
                  href={activeEpochData.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm tracking-wide text-[#0A0F1D] dark:text-[#E2E8F0] border border-black/15 dark:border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] bg-black/5 dark:bg-white/5 transition-all"
                >
                  <span>Open Full PDF in New Tab</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Preview Card */}
            <div className="lg:col-span-5">
              <div 
                onClick={() => openPdfViewer(activeEpochData)}
                className="group relative rounded-2xl overflow-hidden bg-black/40 border border-[#D4AF37]/40 shadow-[0_15px_35px_rgba(0,0,0,0.3)] cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={activeEpochData.previewImage}
                    alt={activeEpochData.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div>
                    <span className="font-mono text-[10px] text-[#D4AF37] block">VERIFIED ARTIFACT</span>
                    <span className="font-bold">{activeEpochData.pdfTitle}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#D4AF37] text-black font-bold text-xs shadow-md">
                    {activeEpochData.pdfSize}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE 21-ARTWORK EVOLUTION CAROUSEL */}
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-white/70 dark:bg-[#0A0E1A]/80 backdrop-blur-xl border border-[#E2E5EA] dark:border-[rgba(212,175,55,0.25)] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          {/* Carousel Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-black/10 dark:border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The 21 Works of the Master Deck</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B0F19] dark:text-white">
                Chronological Artwork &amp; Design System Showcase
              </h3>
            </div>

            {/* Carousel navigation & Play/Pause */}
            <div className="flex items-center gap-3 self-end sm:self-center">
              <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400">
                <strong className="text-[#D4AF37]">{String(currentSlideIdx + 1).padStart(2, "0")}</strong> / {String(ARTWORK_SLIDES.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={() => setIsPlayingCarousel(!isPlayingCarousel)}
                className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:border-[#D4AF37] text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
                title={isPlayingCarousel ? "Pause Carousel" : "Auto-Play Carousel"}
                aria-label={isPlayingCarousel ? "Pause Carousel" : "Play Carousel"}
              >
                {isPlayingCarousel ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setCurrentSlideIdx((prev) => (prev === 0 ? ARTWORK_SLIDES.length - 1 : prev - 1))}
                className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:border-[#D4AF37] text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
                title="Previous Slide"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentSlideIdx((prev) => (prev + 1) % ARTWORK_SLIDES.length)}
                className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:border-[#D4AF37] text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
                title="Next Slide"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Carousel Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            {/* Left: Artwork Canvas */}
            <div className="lg:col-span-8">
              <div 
                ref={carouselContainerRef}
                className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/60 border border-black/10 dark:border-white/10 shadow-2xl flex items-center justify-center group"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentSlide.path}
                      alt={currentSlide.title}
                      fill
                      className="object-contain p-2"
                      priority={currentSlideIdx < 3}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Era Badge on Top Right */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/70 text-[#F5BA42] border border-[#D4AF37]/40 backdrop-blur-md">
                  {currentSlide.era} • {currentSlide.year}
                </div>
              </div>
            </div>

            {/* Right: Artwork Metadata & Thinking Breakdown */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-mono font-bold flex items-center justify-center">
                    {String(currentSlide.id).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Deck Page {currentSlide.id} of 21
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-extrabold text-[#0B0F19] dark:text-white mb-3">
                  {currentSlide.title}
                </h4>

                <div className="p-4 rounded-xl bg-[#F6F8FB] dark:bg-[#111624] border border-[#E2E6ED] dark:border-white/10 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] block font-bold mb-1">
                    Design Thinking & Concept Note:
                  </span>
                  <p className="text-xs sm:text-sm text-[#4B5260] dark:text-[#CBD5E1] leading-relaxed">
                    {currentSlide.note}
                  </p>
                </div>
              </div>

              {/* Quick Action: Open Related PDF Deck */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    const epochMatch = EPOCHS.find((e) => e.year === (currentSlide.year === "2020" ? "2020" : currentSlide.year === "2024" ? "2024" : "2026")) || EPOCHS[2];
                    openPdfViewer(epochMatch);
                  }}
                  className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#F3E5AB] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_2px_12px_rgba(212,175,55,0.3)]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Inspect Verified Master PDF Deck</span>
                </button>

                <a
                  href="/Prashant_Senior_Product_Designer_Portfolio_26Pages.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#0A0F1D] dark:text-[#E2E8F0] border border-black/15 dark:border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Download Complete 26-Page PDF (57 MB)</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div 
            ref={thumbnailStripRef}
            className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#D4AF37]/30"
          >
            {ARTWORK_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlideIdx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => {
                    setCurrentSlideIdx(idx);
                    setIsPlayingCarousel(false);
                  }}
                  className={`flex-shrink-0 relative w-16 h-12 rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-105"
                      : "border-black/10 dark:border-white/10 opacity-60 hover:opacity-100 hover:border-gray-400"
                  }`}
                  title={`${slide.id}. ${slide.title}`}
                  aria-label={`Jump to slide ${slide.id}: ${slide.title}`}
                >
                  <Image
                    src={slide.path}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 right-0 px-1 text-[8px] font-mono font-bold bg-black/80 text-white rounded-tl">
                    {slide.id}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. OVERLAY SCALE MODAL WITH GLOWING BORDER */}
      <AnimatePresence>
        {pdfModalOpen && activePdf && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => {
              setPdfModalOpen(false);
              setActivePdf(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.82, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full ${
                isFullscreenPdf ? "max-w-none h-full m-0" : "max-w-6xl h-[92vh]"
              } rounded-2xl overflow-hidden flex flex-col bg-[#070A12] border-2 border-[#D4AF37]`}
              style={{
                boxShadow: "0 0 35px rgba(212,175,55,0.5), 0 0 70px rgba(0,229,255,0.3)"
              }}
            >
              {/* Modal Top Telemetry Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#0D1220] border-b border-[#D4AF37]/30 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] font-mono font-bold text-xs">
                    {activePdf.year}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-white truncate max-w-[280px] sm:max-w-md">
                      {activePdf.title}
                    </h4>
                    <span className="text-[11px] font-mono text-gray-400">
                      Authentic PDF Archive • {activePdf.size}
                    </span>
                  </div>
                </div>

                {/* Quick Epoch Switching within Modal */}
                <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
                  {EPOCHS.map((epoch) => (
                    <button
                      key={epoch.year}
                      type="button"
                      onClick={() => openPdfViewer(epoch)}
                      className={`px-3 py-1 rounded-lg font-mono font-bold transition-colors cursor-pointer ${
                        activePdf.year === epoch.year
                          ? "bg-[#D4AF37] text-black shadow-sm"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {epoch.year}
                    </button>
                  ))}
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={activePdf.url}
                    download
                    className="p-2 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white transition-colors"
                    title="Download PDF"
                    aria-label="Download PDF File"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  <a
                    href={activePdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white transition-colors"
                    title="Open Full Screen in New Tab"
                    aria-label="Open Full Screen in New Tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsFullscreenPdf(!isFullscreenPdf)}
                    className="hidden sm:flex p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title={isFullscreenPdf ? "Exit Fullscreen" : "Toggle Fullscreen"}
                    aria-label="Toggle Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPdfModalOpen(false);
                      setActivePdf(null);
                    }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white transition-colors cursor-pointer"
                    title="Close (Escape)"
                    aria-label="Close PDF Viewer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body / PDF Viewer Frame */}
              <div className="relative flex-1 w-full h-full bg-[#05070D] overflow-hidden flex flex-col items-center justify-center">
                <iframe
                  src={`${activePdf.url}#toolbar=1&navpanes=1`}
                  className="w-full h-full border-none"
                  title={activePdf.title}
                />
              </div>

              {/* Modal Footer Bar */}
              <div className="px-5 py-2.5 bg-[#0A0D17] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span className="font-mono text-[11px] text-[#D4AF37]">
                  ✓ High-Resolution Multi-Page PDF Specification
                </span>
                <span className="text-[11px]">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">ESC</kbd> to close
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
