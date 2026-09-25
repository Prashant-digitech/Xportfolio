"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize2, 
  X, 
  Sparkles, 
  ExternalLink,
  Layers,
  FileCheck2,
  SlidersHorizontal,
  FolderOpen
} from "lucide-react";
import { CANVA_SLIDES, CANVA_CATEGORIES, CanvaSlide } from "@/data/canvaDeck";

export default function CanvaPortfolioDeck() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [canvaInfoOpen, setCanvaInfoOpen] = useState<boolean>(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  // Filtered slides based on active category
  const filteredSlides = activeCategory === "All" 
    ? CANVA_SLIDES 
    : CANVA_SLIDES.filter(s => s.category === activeCategory);

  // Current active slide
  const currentSlide: CanvaSlide = filteredSlides[activeSlideIndex] || filteredSlides[0] || CANVA_SLIDES[0];

  // Adjust index if category switch leaves it out of bounds
  useEffect(() => {
    setActiveSlideIndex(0);
  }, [activeCategory]);

  // Navigate next/prev with loop
  const handlePrev = useCallback(() => {
    setActiveSlideIndex(prev => (prev === 0 ? filteredSlides.length - 1 : prev - 1));
  }, [filteredSlides.length]);

  const handleNext = useCallback(() => {
    setActiveSlideIndex(prev => (prev === filteredSlides.length - 1 ? 0 : prev + 1));
  }, [filteredSlides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setLightboxOpen(false);
        setCanvaInfoOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeEl = thumbnailContainerRef.current.children[activeSlideIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeSlideIndex]);

  return (
    <section id="canva-deck" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#6366F1]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] dark:text-[#818cf8] text-xs font-mono font-semibold tracking-wider uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Executive Presentation Deck • 26 Pages</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Canva Portfolio & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#F59E0B]">Executive Master Deck</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
          A complete 26-page widescreen (16:9) presentation engineered for senior recruiters and executive stakeholders. Grounded strictly in authentic project artifacts from DeepAstro, TradeX, FutureMind, and Figma Lab.
        </p>

        {/* Action Bar: Download PDF & Canva Instructions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/Prashant_Senior_Product_Designer_Portfolio_26Pages.pdf"
            download="Prashant_Senior_Product_Designer_Portfolio_26Pages.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#6366F1]/25 hover:shadow-xl hover:shadow-[#6366F1]/35 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download 26-Page PDF Deck (57 MB)</span>
          </a>
          <button
            onClick={() => setCanvaInfoOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 font-semibold text-sm transition-all duration-200 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#F59E0B]" />
            <span>Canva Native Integration Guide</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {CANVA_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#6366F1] text-white shadow-md shadow-[#6366F1]/25"
                  : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900/80 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800"
              }`}
            >
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Primary Slide Showcase Box */}
      <div className="relative rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-2.5 py-1 rounded-md">
              SLIDE {currentSlide.slideNum} / 26
            </span>
            <span className="text-xs sm:text-sm font-semibold text-neutral-300 truncate max-w-[200px] sm:max-w-md">
              {currentSlide.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>{currentSlide.authenticAsset}</span>
            </span>

            <button
              onClick={() => setLightboxOpen(true)}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Expand Fullscreen Preview"
              aria-label="Expand Fullscreen Preview"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 16:9 Presentation Viewport */}
        <div className="relative aspect-[16/9] w-full bg-[#07090E] flex items-center justify-center group overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full h-full cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={currentSlide.imageSrc}
                alt={currentSlide.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white backdrop-blur-md border border-neutral-700/60 shadow-lg opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white backdrop-blur-md border border-neutral-700/60 shadow-lg opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Click to Zoom Overlay hint */}
          <div className="absolute bottom-4 right-4 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/70 border border-neutral-800 text-neutral-400 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Click image to view in fullscreen</span>
          </div>
        </div>

        {/* Slide Context Footer */}
        <div className="p-4 sm:p-6 bg-neutral-900/90 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#6366F1] font-semibold">
                  {currentSlide.role}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-xs font-mono text-[#F59E0B]">
                  {currentSlide.badge}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                {currentSlide.subtitle}
              </h3>
              <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
                {currentSlide.description}
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
              <span className="text-xs font-mono text-neutral-400">
                {activeSlideIndex + 1} of {filteredSlides.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title="Previous"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title="Next"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Filmstrip */}
        <div className="p-3 sm:p-4 bg-neutral-950 border-t border-neutral-900">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#6366F1]" />
              <span>Slide Filmstrip (26 Slides)</span>
            </span>
            <span className="text-xs font-mono text-neutral-500">
              Use ← → arrow keys to navigate
            </span>
          </div>

          <div 
            ref={thumbnailContainerRef}
            className="flex items-center gap-3 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent"
          >
            {filteredSlides.map((slide, idx) => {
              const isSelected = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`relative shrink-0 w-32 sm:w-40 aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-[#6366F1] shadow-lg shadow-[#6366F1]/30 scale-105"
                      : "border-neutral-800 hover:border-neutral-600 opacity-60 hover:opacity-100"
                  }`}
                  title={`Slide ${slide.slideNum}: ${slide.title}`}
                >
                  <Image
                    src={slide.imageSrc}
                    alt={slide.title}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 left-1 bg-black/75 px-1.5 py-0.5 rounded text-[10px] font-mono text-white font-bold">
                    #{slide.slideNum}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between text-white" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/20 px-3 py-1 rounded-md">
                  PAGE {currentSlide.slideNum} / 26
                </span>
                <span className="font-bold text-sm sm:text-base text-neutral-200">
                  {currentSlide.title}
                </span>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
                aria-label="Close fullscreen modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Lightbox Image Viewport */}
            <div 
              className="relative w-full h-[75vh] flex items-center justify-center my-auto"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={currentSlide.imageSrc}
                alt={currentSlide.title}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Modal Footer Controls */}
            <div 
              className="flex items-center justify-between text-neutral-300 text-xs sm:text-sm pt-4 border-t border-neutral-800"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Source Asset:</span>
                <span className="font-mono text-neutral-400">{currentSlide.authenticAsset}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canva Integration Info Modal */}
      <AnimatePresence>
        {canvaInfoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setCanvaInfoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-neutral-200"
            >
              <button
                onClick={() => setCanvaInfoOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5 text-[#F59E0B] font-mono text-xs font-semibold uppercase tracking-wider mb-2">
                <FolderOpen className="w-4 h-4" />
                <span>Canva Native Integration Specs</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                How to use this 26-Page Deck in Canva
              </h3>

              <div className="space-y-4 text-sm text-neutral-300">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <h4 className="font-semibold text-white mb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-xs">1</span>
                    <span>1-Click Native PDF Import (Recommended)</span>
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    Open your installed Canva application. Drag and drop <code className="text-[#F59E0B] bg-neutral-900 px-1.5 py-0.5 rounded">Prashant_Senior_Product_Designer_Portfolio_26Pages.pdf</code> onto Canva Home. Canva’s vector import engine will parse all 26 slides into editable Canva elements, text boxes, and image frames.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <h4 className="font-semibold text-white mb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-black flex items-center justify-center text-xs">2</span>
                    <span>Pre-Organized Asset Folders</span>
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    All original artifacts from DeepAstro, TradeX, FutureMind, and Figma Lab are organized in:
                    <br />
                    <code className="text-emerald-400 text-[11px] block mt-1">C:\Users\sisod\Downloads\Canva_Portfolio_Deck_Assets\</code>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <h4 className="font-semibold text-white mb-1.5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center text-xs">3</span>
                    <span>Recommended Canva Templates</span>
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    Search Canva Presentations for: <strong className="text-white">&quot;Dark Minimalist Tech Portfolio&quot;</strong>, <strong className="text-white">&quot;UX/UI Designer Case Study Deck&quot;</strong>, or <strong className="text-white">&quot;SaaS Executive Pitch&quot;</strong>.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setCanvaInfoOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold text-sm cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
