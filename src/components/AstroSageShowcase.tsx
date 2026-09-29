"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, BookOpen, Layers, X, ChevronLeft, ChevronRight,
  ArrowRight, ZoomIn, ExternalLink, Compass, ShieldCheck
} from "lucide-react";
import InAppCaseStudyViewer from "@/components/InAppCaseStudyViewer";

export default function AstroSageShowcase() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [inAppViewerOpen, setInAppViewerOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // 14 Verified Authentic Assets from DeepAstro / AstroSage
  const astroAssets = [
    {
      url: "/images/ux/deepastro/1.png",
      title: "Slide 01 // Executive Presentation & Cover",
      caption: "AI-Powered Vedic Astrology & Life Intelligence Ecosystem — Product Design Case Study by Prashant Sisodhiya.",
      badge: "EXECUTIVE COVER",
    },
    {
      url: "/images/ux/deepastro/2.png",
      title: "Slide 02 // Problem Statement & Market Opportunity",
      caption: "Cognitive barriers in traditional astrology, fragmented user tools, and fatalism vs. conscious agency.",
      badge: "MARKET PROBLEM",
    },
    {
      url: "/images/ux/deepastro/3.png",
      title: "Slide 03 // User Research & Discovery Insights",
      caption: "15 in-depth user interviews, 236 survey responses, and 18 synthesized core product insights.",
      badge: "RESEARCH",
    },
    {
      url: "/images/ux/deepastro/4.png",
      title: "Slide 04 // UX Strategy & Information Architecture",
      caption: "11-module ecosystem hierarchy, 6 core user flows, and 5-stage holistic journey map.",
      badge: "ARCHITECTURE",
    },
    {
      url: "/images/ux/deepastro/5.png",
      title: "Slide 05 // User Journey & Step-by-Step Birth Chart Flow",
      caption: "Primary 7-step user journey, step-by-step birth chart flow with live UI screens, and 9 secondary feature flows.",
      badge: "FLOWS",
    },
    {
      url: "/images/ux/deepastro/6.png",
      title: "Slide 06 // DeepAstro Vedic Intelligence Core",
      caption: "Deterministic Vedic calculation core (Lahiri Ayanamsha), domain knowledge base, and AI/RAG layer.",
      badge: "AI CORE",
    },
    {
      url: "/images/ux/deepastro/7.png",
      title: "Slide 07 // 12 Core Interfaces & Design Decisions",
      caption: "Interactive Kundli, Future Intel, Astrocartography, Tarot, Palmistry, AI Chatbot, Reports, and Marketplace.",
      badge: "UI SCREENS",
    },
    {
      url: "/images/ux/deepastro/8.png",
      title: "Slide 08 // Cosmic Design System & Component Library",
      caption: "Design tokens, color system, typography ramp (Satoshi, Geist, Inter), and atomic UI components.",
      badge: "DESIGN SYSTEM",
    },
    {
      url: "/images/ux/deepastro/9.png",
      title: "Slide 09 // Usability Testing Benchmarks & SUS Scores",
      caption: "Multi-round user evaluation, task completion benchmarks, SUS usability scores, and iterative timeline UI enhancements.",
      badge: "USABILITY",
    },
    {
      url: "/images/ux/deepastro/10.png",
      title: "Slide 10 // Strategic Business Impact & Outcomes",
      caption: "Measurable metrics across retention, user empowerment, business growth, and lead product designer takeaways.",
      badge: "BUSINESS IMPACT",
    },
    {
      url: "/images/ux/deepastro-hero.jpg",
      title: "Cosmic Ecosystem // Multi-Device Responsive UI",
      caption: "Cross-platform responsive design featuring desktop command dashboard and companion iOS mobile experience.",
      badge: "HERO SHOWCASE",
    },
    {
      url: "/images/ux/deepastro-future-intelligence.jpg",
      title: "Future Intelligence 8.0 Roadmap",
      caption: "Multi-year trajectory mapping, 5-year timeline projection, life domain scores, and customized remedial actions.",
      badge: "TIMELINE ROADMAP",
    },
    {
      url: "/images/ux/deepastro-soultrace-karmic.jpg",
      title: "SoulTrace Karmic Matrix Interface",
      caption: "Detailed karmic pattern breakdown, planetary house influences (4th, 8th, 10th, 12th houses), and Rahu-Ketu nodal axis.",
      badge: "KARMIC MATRIX",
    },
    {
      url: "/images/ux/deepastro-soultrace-card.jpg",
      title: "Deep Soul Journey Card Experience",
      caption: "Tactile modal journey with atmospheric astral portal aesthetics, soul lesson checkpoints, and authentic chart calculation.",
      badge: "SOUL JOURNEY",
    },
  ];

  const handlePrev = useCallback(() => {
    setActiveSlideIdx((prev) => (prev <= 0 ? astroAssets.length - 1 : prev - 1));
  }, [astroAssets.length]);

  const handleNext = useCallback(() => {
    setActiveSlideIdx((prev) => (prev >= astroAssets.length - 1 ? 0 : prev + 1));
  }, [astroAssets.length]);

  useEffect(() => {
    if (!galleryOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGalleryOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [galleryOpen, handlePrev, handleNext]);

  return (
    <section id="astrosage" className="py-24 sm:py-32 relative bg-[#FAFAF7] dark:bg-[#06070A] border-t border-gray-200 dark:border-[#2A3441]/70 transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#003882]/20 dark:border-[#00E5FF]/30 bg-[#003882]/10 dark:bg-[#00E5FF]/10 text-xs font-mono font-bold tracking-widest text-[#003882] dark:text-[#00E5FF] uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>AUTHENTIC PRODUCT PREVIEW • 14 VERIFIED ASSETS</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0A0F1D] dark:text-[#F8FAFC]">
            ASTROSAGE // <span className="text-[#003882] dark:text-[#00E5FF]">DEEPASTRO</span>
          </h2>
          
          <p className="text-sm sm:text-base text-[#1E293B] dark:text-[#CBD5E1] leading-relaxed">
            AI-powered Vedic astrology and life intelligence operating system that transforms complex Sanskrit astrological charts into modern, accessible personal roadmap decisions.
          </p>
        </div>

        {/* Showcase Spotlight Card */}
        <div className="rounded-3xl border border-gray-200 dark:border-[#2A3441] bg-white dark:bg-[#111827] shadow-xl overflow-hidden p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Project Details & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#003882]/10 dark:bg-[#00E5FF]/15 border border-[#003882]/20 dark:border-[#00E5FF]/30 text-[10px] font-mono font-bold text-[#003882] dark:text-[#00E5FF] uppercase">
                  Flagship Product Design
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 uppercase">
                  Vedic Calculation Engine
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0A0F1D] dark:text-[#F8FAFC] tracking-tight mb-2">
                  Vedic Astrology &amp; Life Intelligence Ecosystem
                </h3>
                <p className="text-xs font-mono font-bold text-[#003882] dark:text-[#00E5FF] uppercase tracking-wider mb-4">
                  Lead Product Designer · UX Architecture · Design System
                </p>
                <p className="text-xs sm:text-sm text-[#1E293B] dark:text-[#CBD5E1] leading-relaxed">
                  DeepAstro bridges ancient Vedic astronomical mathematics (Lahiri Ayanamsha) with empathetic generative intelligence. It solves cognitive overload by structuring planetary alignments into four intuitive layers: Executive Summary, Temporal Roadmap, Planetary Analysis, and Actionable Remedial Guidance.
                </p>
              </div>

              {/* Verified Metrics / Pillars */}
              <div className="grid grid-cols-3 gap-3 border-y border-gray-200 dark:border-[#2A3441] py-4 text-center">
                <div>
                  <span className="block text-xl font-extrabold text-[#0A0F1D] dark:text-[#F8FAFC]">10</span>
                  <span className="text-[10px] font-mono uppercase text-[#334155] dark:text-[#94A3B8]">Verified Boards</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-[#003882] dark:text-[#00E5FF]">11</span>
                  <span className="text-[10px] font-mono uppercase text-[#334155] dark:text-[#94A3B8]">Core Modules</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-amber-600 dark:text-[#F5C84B]">91.4</span>
                  <span className="text-[10px] font-mono uppercase text-[#334155] dark:text-[#94A3B8]">SUS Usability</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setInAppViewerOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-[#003882] hover:bg-[#002D6E] text-white dark:bg-[#00E5FF] dark:hover:bg-[#00c8e0] dark:text-[#06070A] font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md cursor-pointer transition-all hover:scale-105"
                >
                  <BookOpen className="w-4 h-4 stroke-[2.5]" />
                  <span>View Case Study →</span>
                </button>

                <button
                  onClick={() => {
                    setActiveSlideIdx(0);
                    setGalleryOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-white dark:bg-[#1A1F2B] border-2 border-gray-300 dark:border-[#2A3441] hover:border-[#003882] dark:hover:border-[#00E5FF] text-[#0A0F1D] dark:text-[#F8FAFC] font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-sm cursor-pointer transition-all"
                >
                  <Layers className="w-4 h-4" />
                  <span>View AstroSage Gallery (14 Assets) →</span>
                </button>
              </div>
            </div>

            {/* Right: Large Showcase Visual */}
            <div className="lg:col-span-6">
              <div
                onClick={() => {
                  setActiveSlideIdx(0);
                  setGalleryOpen(true);
                }}
                className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-[#2A3441] bg-[#090D16] group cursor-pointer shadow-2xl"
              >
                <Image
                  src="/images/ux/deepastro-hero.jpg"
                  alt="AstroSage / DeepAstro Ecosystem Master Visual"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-[#00E5FF] drop-shadow-md">
                    Full Responsive Ecosystem Showcase
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-mono border border-[#00E5FF]/40 text-[#00E5FF] flex items-center space-x-1">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Inspect Gallery</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3-Card Curated Preview Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              src: "/images/ux/deepastro/1.png",
              title: "Board 01: Executive Pitch Deck",
              desc: "Vedic calculation core and modern life intelligence positioning.",
              idx: 0,
            },
            {
              src: "/images/ux/deepastro/7.png",
              title: "Board 07: 12 Core Interfaces",
              desc: "High-density Kundli, Future Intel, and Astrocartography screens.",
              idx: 6,
            },
            {
              src: "/images/ux/deepastro-future-intelligence.jpg",
              title: "Future Intelligence 8.0",
              desc: "Longitudinal milestone timelines and tailored remedial guidance.",
              idx: 11,
            },
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setActiveSlideIdx(item.idx);
                setGalleryOpen(true);
              }}
              className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#2A3441] hover:border-[#003882] dark:hover:border-[#00E5FF] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 bg-[#0A0E17] border border-gray-200 dark:border-[#2A3441]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h4 className="font-bold text-sm text-[#0A0F1D] dark:text-[#F8FAFC] group-hover:text-[#003882] dark:group-hover:text-[#00E5FF] transition-colors mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#1E293B] dark:text-[#CBD5E1] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-[#2A3441] flex items-center justify-between text-xs text-[#003882] dark:text-[#00E5FF] font-bold">
                <span>Inspect Board</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* AstroSage Lightbox / Gallery Modal */}
      <AnimatePresence>
        {galleryOpen && (
          <div
            className="fixed inset-0 z-[160] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/92 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="AstroSage Archive Visual Gallery"
            onClick={(e) => {
              if (e.target === e.currentTarget) setGalleryOpen(false);
            }}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[94vh] overflow-y-auto rounded-3xl bg-[#090D16] border border-[#00E5FF]/40 shadow-[0_0_80px_rgba(0,0,0,0.9)] p-5 sm:p-8 text-white z-10 font-sans"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[10px] font-mono font-bold text-[#00E5FF] uppercase">
                    {String(activeSlideIdx + 1).padStart(2, "0")} / {String(astroAssets.length).padStart(2, "0")}
                  </span>
                  <span className="hidden sm:inline-block text-xs font-mono text-gray-400">
                    Use ← → Arrow Keys to Browse
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-xl bg-white/5 hover:bg-[#00E5FF] hover:text-black border border-white/10 transition-colors cursor-pointer"
                    title="Previous Slide"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-xl bg-white/5 hover:bg-[#00E5FF] hover:text-black border border-white/10 transition-colors cursor-pointer"
                    title="Next Slide"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGalleryOpen(false)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-400 border border-white/10 transition-colors cursor-pointer ml-2"
                    title="Close (Esc)"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 flex flex-col items-center">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#06080F] shadow-inner">
                    <Image
                      src={astroAssets[activeSlideIdx].url}
                      alt={astroAssets[activeSlideIdx].title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 65vw"
                    />
                  </div>
                </div>

                {/* Right Metadata */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#00E5FF] font-semibold uppercase block w-fit mb-2">
                      {astroAssets[activeSlideIdx].badge}
                    </span>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                      {astroAssets[activeSlideIdx].title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {astroAssets[activeSlideIdx].caption}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
                    <button
                      onClick={() => {
                        setGalleryOpen(false);
                        setInAppViewerOpen(true);
                      }}
                      className="w-full py-3 rounded-xl bg-[#00E5FF] hover:bg-[#00c8e0] text-[#06070A] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Open Complete Case Study Deck</span>
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* In-App Interactive Case Study Viewer */}
      <InAppCaseStudyViewer
        isOpen={inAppViewerOpen}
        onClose={() => setInAppViewerOpen(false)}
        caseStudyUrl="/case-studies/deepastro/index.html"
        projectTitle="DeepAstro // Vedic Astrology & Life Intelligence"
        subtitle="10-Board Full Interactive Case Study Deck"
      />
    </section>
  );
}
