"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Palette,
  Sparkles,
  ArrowUpRight,
  Maximize2,
  FolderOpen,
  Layers,
  Scroll,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { CREATIVE_CATEGORIES } from "@/data/gallery/categories";
import { GalleryCategory } from "@/data/gallery/types";
import CinematicCategoryGalleryModal from "@/components/CinematicCategoryGalleryModal";
import FlyerScrollOverlay from "@/components/FlyerScrollOverlay";

interface CreativeWorkGalleryProps {
  onScrollToMasterArchive?: () => void;
}

export default function CreativeWorkGallery({ onScrollToMasterArchive }: CreativeWorkGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | null>(null);
  const [galleryModalOpen, setGalleryModalOpen] = useState<boolean>(false);
  const [initialItemIndex, setInitialItemIndex] = useState<number>(0);
  const [flyerOverlayOpen, setFlyerOverlayOpen] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const handleOpenCategory = (cat: GalleryCategory, itemIdx = 0) => {
    setSelectedCategory(cat);
    setInitialItemIndex(itemIdx);
    setGalleryModalOpen(true);
  };

  const categories = CREATIVE_CATEGORIES;

  // Filter categories if user selects a discipline filter pill
  const filteredCategories = activeFilter === "all"
    ? categories
    : categories.filter((c) => {
        if (activeFilter === "print") return ["magazine", "flyers", "collateral"].includes(c.id);
        if (activeFilter === "brand") return ["branding", "logos", "decks"].includes(c.id);
        if (activeFilter === "visual") return ["posters", "manipulation", "digital-art", "retouching"].includes(c.id);
        if (activeFilter === "commercial") return ["advertising", "social"].includes(c.id);
        return true;
      });

  return (
    <section
      id="creative-gallery"
      ref={sectionRef}
      className="py-24 sm:py-32 relative bg-[#FAFAF7] dark:bg-[#06070A] text-[#111318] dark:text-white transition-colors duration-300 font-sans border-t border-gray-200 dark:border-[#2A3441]"
    >
      {/* Background Ambient Aura */}
      <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-[#3B82F6]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.55 }}
          className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#003882]/20 dark:border-[#00E5FF]/30 bg-[#003882]/10 dark:bg-[#00E5FF]/10 text-xs font-mono font-bold tracking-widest text-[#003882] dark:text-[#00E5FF] uppercase">
            <Palette className="w-3.5 h-3.5" aria-hidden="true" />
            <span>CREATIVE WORK SHOWCASE • 12 CURATED GALLERIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0A0F1D] dark:text-[#F8FAFC]">
            Creative Work &amp;{" "}
            <span className="text-[#003882] dark:text-[#00E5FF]">Art Direction</span>
          </h2>

          <p className="text-sm sm:text-base text-[#1E293B] dark:text-[#CBD5E1] leading-relaxed">
            Every discipline isolated in dedicated exhibition rooms. Click any exhibition card to launch its isolated cinematic gallery, inspect high-resolution RAW artwork, or explore the complete collection without leaving the page.
          </p>

          {/* Quick Discipline Filter Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All 12 Disciplines" },
              { id: "commercial", label: "Commercial & Social" },
              { id: "visual", label: "Matte, Posters & Art" },
              { id: "print", label: "Editorial & Print Flyers" },
              { id: "brand", label: "Brand, Logos & Decks" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeFilter === f.id
                    ? "bg-[#003882] text-white dark:bg-[#00E5FF] dark:text-[#06070A] shadow-md scale-105"
                    : "bg-white dark:bg-[#1A1F2B] border border-gray-200 dark:border-[#2A3441] text-[#1E293B] dark:text-[#CBD5E1] hover:border-[#003882] dark:hover:border-[#00E5FF]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── 12 Exhibition Room Showcase Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCategories.map((cat, idx) => (
            <motion.article
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              onClick={() => handleOpenCategory(cat)}
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#1A1F2B] border border-gray-200 dark:border-[#2A3441] hover:border-[#003882] dark:hover:border-[#00E5FF]/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer select-none"
            >
              {/* Top Image Stage (Cinematic Aspect Ratio) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0E17]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.coverImage}
                  alt={`${cat.title} Cover`}
                  className="w-full h-full object-cover object-center brightness-[0.95] contrast-[1.05] group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Ambient Top Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Top Corner Discipline Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-white flex items-center space-x-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: cat.accent }}
                  />
                  <span>{cat.discipline.split(" / ")[0]}</span>
                </div>

                {/* Top Right Project Count Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#00E5FF]/90 text-[#06070A] text-[10px] font-mono font-extrabold uppercase tracking-wider shadow-md">
                  {cat.items.length} {cat.id === "decks" ? "SLIDES" : "WORKS"}
                </div>

                {/* Hover Reveal Quick Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-[#00E5FF] text-[#00E5FF] font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open {cat.title}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
                    <span>{cat.discipline}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#0A0F1D] dark:text-white group-hover:text-[#003882] dark:group-hover:text-[#00E5FF] transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-[#1E293B] dark:text-[#94A3B8] line-clamp-2 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Card Footer: Action Indicator & Tags */}
                <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#003882] dark:text-[#00E5FF]">
                    <span>EXPLORE COLLECTION</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  {cat.id === "flyers" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFlyerOverlayOpen(true);
                      }}
                      className="px-2 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] dark:text-[#F5C84B] text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-black transition-colors"
                      title="Open all flyers in continuous vertical scroll view"
                    >
                      Scroll View
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Bottom Link to Master 30-Artwork Archive ── */}
        <div className="mt-14 sm:mt-18 p-6 rounded-3xl bg-gradient-to-r from-gray-100 dark:from-[#111827] via-gray-50 dark:via-[#1A1F2B] to-gray-100 dark:to-[#111827] border border-gray-200 dark:border-[#2A3441] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg text-center sm:text-left">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#003882]/10 dark:bg-[#00E5FF]/10 border border-[#003882]/30 dark:border-[#00E5FF]/30 flex items-center justify-center text-[#003882] dark:text-[#00E5FF] shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black uppercase text-[#0A0F1D] dark:text-white">
                Verified Masterworks Master Archive
              </h4>
              <p className="text-xs text-[#1E293B] dark:text-[#94A3B8]">
                Looking for the full uncurated grid? Inspect the complete 30-artwork database with interactive deconstructed case studies and filter matrix.
              </p>
            </div>
          </div>

          <a
            href="#visual-systems"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("visual-systems")?.scrollIntoView({ behavior: "smooth" });
              onScrollToMasterArchive?.();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#003882] hover:bg-[#002D6E] text-white dark:bg-[#00E5FF] dark:hover:bg-[#00c8e0] dark:text-[#06070A] font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 transition-transform hover:scale-105 shrink-0 shadow-md cursor-pointer"
          >
            <span>Inspect 30-Work Master Archive</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

      </div>

      {/* ── Cinematic Category Gallery Overlay Modal ── */}
      <CinematicCategoryGalleryModal
        category={selectedCategory}
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        initialItemIndex={initialItemIndex}
        onOpenScrollableFlyer={() => {
          setGalleryModalOpen(false);
          setFlyerOverlayOpen(true);
        }}
      />

      {/* ── Continuous Vertical Scrollable Flyer Overlay ── */}
      <FlyerScrollOverlay
        isOpen={flyerOverlayOpen}
        onClose={() => setFlyerOverlayOpen(false)}
        initialFlyerIndex={0}
      />
    </section>
  );
}
