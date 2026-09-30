"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Layers,
  Calendar,
  Wrench,
  UserCheck,
  Tag,
  Download,
  Scroll,
} from "lucide-react";
import { GalleryCategory, GalleryItem } from "@/data/gallery/types";

interface CinematicCategoryGalleryModalProps {
  category: GalleryCategory | null;
  isOpen: boolean;
  onClose: () => void;
  initialItemIndex?: number;
  onOpenScrollableFlyer?: () => void;
}

export default function CinematicCategoryGalleryModal({
  category,
  isOpen,
  onClose,
  initialItemIndex = 0,
  onOpenScrollableFlyer,
}: CinematicCategoryGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialItemIndex);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);

  // Sync index when initialItemIndex changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(Math.max(0, Math.min(initialItemIndex, (category?.items.length || 1) - 1)));
      setZoomLevel(1);
      setIsFullscreen(false);
    }
  }, [isOpen, initialItemIndex, category]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  const items = category?.items || [];
  const currentItem: GalleryItem | undefined = items[currentIndex];

  const handleNext = useCallback(() => {
    if (!items.length) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setZoomLevel(1);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    if (!items.length) return;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setZoomLevel(1);
  }, [items.length]);

  // Keyboard navigation & accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key.toLowerCase() === "f") {
        setIsFullscreen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFullscreen, onClose, handleNext, handlePrev]);

  // Auto-scroll active thumbnail into view in filmstrip
  useEffect(() => {
    if (!filmstripRef.current) return;
    const activeThumb = filmstripRef.current.children[currentIndex] as HTMLElement | undefined;
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [currentIndex]);

  // Mobile Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  if (!isOpen || !category || !currentItem) return null;

  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${category.title} Gallery — ${currentItem.title}`}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#06070A]/95 backdrop-blur-2xl text-[#F8FAFC] font-sans overflow-hidden"
      >
        {/* Fullscreen High-Resolution Inspection Mode */}
        {isFullscreen ? (
          <div className="absolute inset-0 z-60 bg-black flex flex-col justify-between p-4 sm:p-6 animate-fade-in">
            {/* Fullscreen Top Chrome */}
            <div className="flex items-center justify-between z-20 bg-black/60 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-[#00E5FF] font-bold uppercase tracking-widest">
                  FULLSCREEN INSPECTION // {currentIndex + 1} OF {items.length}
                </span>
                <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                <span className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-md">
                  {currentItem.title}
                </span>
              </div>

              {/* Zoom & Close Controls */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-white/10 rounded-xl px-2 py-1">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.25))}
                    aria-label="Zoom out"
                    className="p-1 hover:text-[#00E5FF] transition-colors"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono font-bold px-1.5">{Math.round(zoomLevel * 100)}%</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                    aria-label="Zoom in"
                    className="p-1 hover:text-[#00E5FF] transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    aria-label="Reset zoom"
                    className="p-1 hover:text-[#00E5FF] transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => setIsFullscreen(false)}
                  aria-label="Exit fullscreen"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close gallery"
                  className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Centered High-Res Contain Viewport */}
            <div
              className="flex-grow flex items-center justify-center overflow-auto relative p-2 select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.15s ease-out" }}
                className="relative max-w-full max-h-[85vh] w-auto h-auto flex items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="max-h-[82vh] max-w-[92vw] w-auto h-auto object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Prev / Next Arrows */}
              <button
                onClick={handlePrev}
                aria-label="Previous artwork"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-[#00E5FF] hover:text-black border border-white/20 flex items-center justify-center transition-all shadow-xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next artwork"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-[#00E5FF] hover:text-black border border-white/20 flex items-center justify-center transition-all shadow-xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Keyboard Hint */}
            <div className="text-center text-[11px] font-mono text-gray-500 z-20">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">ESC</kbd> to exit fullscreen • <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">→</kbd> to navigate
            </div>
          </div>
        ) : (
          /* Standard Cinematic Category Studio Viewport */
          <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col justify-between p-3 sm:p-6 lg:p-8">
            
            {/* ── Top Header Chrome ── */}
            <div className="flex items-center justify-between border-b border-[#2A3441] pb-4 mb-4 gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: category.accent }}
                  />
                  <span
                    className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest"
                    style={{ color: category.accent }}
                  >
                    {category.discipline}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs font-mono text-gray-400">
                    {category.items.length} WORKS IN COLLECTION
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mt-1">
                  {category.title}
                </h2>
              </div>

              {/* Action Buttons: Scrollable Flyer (if flyers), Fullscreen, Close */}
              <div className="flex items-center space-x-2 shrink-0">
                {category.id === "flyers" && onOpenScrollableFlyer && (
                  <button
                    onClick={onOpenScrollableFlyer}
                    title="Switch to continuous vertical scrollable flyer format"
                    className="px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F5BA42] text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md cursor-pointer transition-transform hover:scale-105"
                  >
                    <Scroll className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Vertical Scroll View</span>
                  </button>
                )}

                <button
                  onClick={() => setIsFullscreen(true)}
                  aria-label="View Fullscreen"
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-[#2A3441] hover:border-[#00E5FF] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span className="hidden md:inline">Inspect Fullscreen</span>
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close category gallery"
                  className="h-9 w-9 rounded-xl bg-white/5 hover:bg-white/10 border border-[#2A3441] hover:border-red-400 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Main Stage: Artwork + Side Metadata Panel ── */}
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-0 overflow-y-auto lg:overflow-visible my-auto">
              
              {/* Left / Center Artwork Display (8 cols) */}
              <div
                className="lg:col-span-8 relative flex items-center justify-center h-[52vh] sm:h-[58vh] lg:h-[62vh] rounded-3xl bg-[#111827]/80 border border-[#2A3441] p-3 sm:p-5 overflow-hidden group shadow-2xl"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Background Ambient Glow */}
                <div
                  className="absolute inset-0 opacity-15 blur-3xl pointer-events-none transition-all duration-700"
                  style={{
                    background: `radial-gradient(circle at center, ${category.accent} 0%, transparent 70%)`,
                  }}
                />

                {/* Animated Image Presentation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentItem.image}
                      alt={currentItem.title}
                      className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Left / Right Nav Arrows on Artwork */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous artwork in collection"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#06070A]/80 hover:bg-[#00E5FF] hover:text-black border border-white/10 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next artwork in collection"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#06070A]/80 hover:bg-[#00E5FF] hover:text-black border border-white/10 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Quick Fullscreen Overlay Trigger */}
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-[#06070A]/85 hover:bg-[#00E5FF] hover:text-black border border-white/15 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md opacity-90 group-hover:opacity-100"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect High-Res</span>
                </button>

                {/* Counter Pill in corner */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#06070A]/80 border border-white/15 text-[11px] font-mono font-bold text-gray-300">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </div>
              </div>

              {/* Right Side Metadata Inspector (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4 bg-[#1A1F2B]/90 border border-[#2A3441] rounded-3xl p-5 sm:p-6 shadow-xl h-full max-h-[62vh] overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between border-b border-[#2A3441] pb-3 mb-3">
                    <span className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase tracking-widest">
                      CURATED SPECIFICATION
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                      {currentItem.year}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-2">
                    {currentItem.title}
                  </h3>

                  <p className="text-xs text-[#CBD5E1] leading-relaxed mb-4">
                    {currentItem.description}
                  </p>

                  {/* Metadata Specs Grid */}
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#111827] border border-[#2A3441]/80 flex items-start space-x-2.5">
                      <UserCheck className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">ROLE</span>
                        <span className="text-gray-200 font-semibold">{currentItem.role}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#111827] border border-[#2A3441]/80 flex items-start space-x-2.5">
                      <Wrench className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">TOOLS USED</span>
                        <span className="text-gray-200 font-semibold">{currentItem.tools.join(" • ")}</span>
                      </div>
                    </div>

                    {currentItem.dimensions && (
                      <div className="p-2.5 rounded-xl bg-[#111827] border border-[#2A3441]/80 flex items-start space-x-2.5">
                        <Layers className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">FORMAT &amp; DIMENSIONS</span>
                          <span className="text-gray-200 font-semibold">{currentItem.dimensions}</span>
                        </div>
                      </div>
                    )}

                    {currentItem.specs && (
                      <div className="p-2.5 rounded-xl bg-[#111827] border border-[#2A3441]/80">
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">PRODUCTION SPEC</span>
                        <span className="text-gray-300 font-mono text-[11px]">{currentItem.specs}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {currentItem.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions: Fullscreen + Download */}
                <div className="pt-2 border-t border-[#2A3441] flex items-center space-x-2">
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="flex-grow py-2.5 rounded-xl bg-[#00E5FF] hover:bg-[#00c8e0] text-[#06070A] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform hover:scale-[1.02] cursor-pointer shadow-md"
                  >
                    <Maximize2 className="w-4 h-4 stroke-[2.5]" />
                    <span>View Fullscreen</span>
                  </button>

                  <a
                    href={currentItem.image}
                    download={`${currentItem.id}.png`}
                    className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#2A3441] text-gray-300 hover:text-white transition-colors"
                    title="Download Authentic High-Res Image"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* ── Bottom Filmstrip Thumbnail Bar ── */}
            <div className="mt-4 pt-3 border-t border-[#2A3441] flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Progress & Quick Label */}
              <div className="text-[11px] font-mono text-gray-400 hidden sm:block shrink-0">
                <span className="text-white font-bold">{currentIndex + 1}</span> of {items.length} • {currentItem.title}
              </div>

              {/* Scrollable Filmstrip */}
              <div
                ref={filmstripRef}
                className="flex items-center space-x-2 overflow-x-auto max-w-full pb-1 scrollbar-thin scrollbar-thumb-gray-700"
              >
                {items.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setZoomLevel(1);
                    }}
                    aria-label={`Jump to artwork ${idx + 1}: ${item.title}`}
                    className={`relative w-14 h-12 sm:w-16 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 shrink-0 cursor-pointer ${
                      currentIndex === idx
                        ? "border-[#00E5FF] scale-105 shadow-[0_0_12px_rgba(0,229,255,0.5)]"
                        : "border-[#2A3441] opacity-50 hover:opacity-100 hover:border-gray-400"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0.5 right-0.5 px-1 rounded text-[8px] font-mono bg-black/80 text-white font-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </button>
                ))}
              </div>

              {/* Desktop Keyboard Hints */}
              <div className="hidden lg:flex items-center space-x-1.5 text-[10px] font-mono text-gray-500 shrink-0">
                <span>Navigate:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">←</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">→</kbd>
                <span className="ml-1">Exit:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">ESC</kbd>
              </div>
            </div>

          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
