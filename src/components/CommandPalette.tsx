"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  Briefcase,
  Palette,
  Film,
  Compass,
  FileText,
  Mail,
  ExternalLink,
  Sparkles,
  Command,
  CornerDownLeft,
} from "lucide-react";
import { buildSearchIndex, SearchEntry } from "@/data/gallery/searchIndex";
import { CREATIVE_CATEGORIES } from "@/data/gallery/categories";
import { GalleryCategory } from "@/data/gallery/types";
import CinematicCategoryGalleryModal from "@/components/CinematicCategoryGalleryModal";
import FlyerScrollOverlay from "@/components/FlyerScrollOverlay";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUXCaseStudy?: (projectId: string) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenUXCaseStudy,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | null>(null);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [flyerOverlayOpen, setFlyerOverlayOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const searchEntries = useMemo(() => buildSearchIndex(), []);

  // Filter entries based on query and active filter tab
  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return searchEntries.filter((item) => {
      // Category filter tab
      if (selectedFilter !== "all") {
        if (selectedFilter === "product" && item.category !== "product") return false;
        if (selectedFilter === "creative" && item.category !== "creative_category" && item.category !== "artwork") return false;
        if (selectedFilter === "motion" && item.category !== "motion") return false;
        if (selectedFilter === "actions" && item.category !== "action") return false;
      }

      if (!q) return true;

      // Match title, description, or keywords
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryBadge.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
      );
    });
  }, [searchEntries, query, selectedFilter]);

  // Reset selected index when query or filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedFilter]);

  // Autofocus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.children[selectedIndex] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedIndex]);

  const handleSelectEntry = (entry: SearchEntry) => {
    onClose();

    if (entry.actionType === "open_case_study") {
      if (onOpenUXCaseStudy) {
        onOpenUXCaseStudy(entry.target);
      } else {
        const el = document.getElementById("work");
        el?.scrollIntoView({ behavior: "smooth" });
      }
    } else if (entry.actionType === "open_category_gallery") {
      const parts = entry.target.split(":");
      const catId = parts[0];
      const targetCat = CREATIVE_CATEGORIES.find((c) => c.id === catId);
      if (targetCat) {
        if (catId === "flyers") {
          setFlyerOverlayOpen(true);
        } else {
          setSelectedCategory(targetCat);
          setGalleryModalOpen(true);
        }
      }
    } else if (entry.actionType === "scroll_to_section") {
      const el = document.getElementById(entry.target);
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (entry.actionType === "open_link") {
      window.open(entry.target, "_blank", "noopener,noreferrer");
    }
  };

  // Keyboard navigation inside Command Palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredEntries.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredEntries.length) % Math.max(1, filteredEntries.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredEntries[selectedIndex];
      if (current) handleSelectEntry(current);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) {
    return (
      <>
        {/* Render child modals if triggered from previous command */}
        <CinematicCategoryGalleryModal
          category={selectedCategory}
          isOpen={galleryModalOpen}
          onClose={() => setGalleryModalOpen(false)}
        />
        <FlyerScrollOverlay
          isOpen={flyerOverlayOpen}
          onClose={() => setFlyerOverlayOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Interactive Command Palette"
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-xl animate-fade-in select-none"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="w-full max-w-2xl rounded-3xl bg-[#090C14] border border-[#2A3441] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(0,229,255,0.15)] overflow-hidden flex flex-col font-sans">
          
          {/* ── Search Input Field ── */}
          <div className="relative flex items-center px-5 py-4 border-b border-[#2A3441]/80">
            <Search className="w-5 h-5 text-[#00E5FF] shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search product studies, graphics, movie posters, tools, actions..."
              className="w-full bg-transparent text-[#F8FAFC] placeholder-gray-500 text-sm sm:text-base font-semibold focus:outline-none"
            />
            {query ? (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-md text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            )}
          </div>

          {/* ── Filter Pills ── */}
          <div className="px-5 py-2.5 bg-[#06070A] border-b border-[#2A3441]/50 flex items-center space-x-2 overflow-x-auto scrollbar-none">
            {[
              { id: "all", label: "All Items" },
              { id: "product", label: "Product UX" },
              { id: "creative", label: "Creative Galleries" },
              { id: "motion", label: "Motion & Film" },
              { id: "actions", label: "Actions & Links" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                  selectedFilter === f.id
                    ? "bg-[#00E5FF] text-[#06070A]"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* ── Search Results List ── */}
          <div
            ref={listRef}
            className="max-h-[50vh] overflow-y-auto p-3 space-y-1.5 scrollbar-thin scrollbar-thumb-gray-700"
          >
            {filteredEntries.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <p className="text-sm font-semibold">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-gray-500 mt-1 font-mono">
                  Try searching &ldquo;Photoshop&rdquo;, &ldquo;DeepAstro&rdquo;, &ldquo;Flyer&rdquo;, or &ldquo;Resume&rdquo;.
                </p>
              </div>
            ) : (
              filteredEntries.map((entry, idx) => {
                const isSelected = idx === selectedIndex;
                const icon = entry.category === "product"
                  ? <Briefcase className="w-4 h-4 text-[#00E5FF]" />
                  : entry.category === "creative_category"
                  ? <Palette className="w-4 h-4 text-[#D4AF37]" />
                  : entry.category === "motion"
                  ? <Film className="w-4 h-4 text-[#E11D48]" />
                  : entry.category === "action"
                  ? <ExternalLink className="w-4 h-4 text-[#10B981]" />
                  : <Compass className="w-4 h-4 text-purple-400" />;

                return (
                  <div
                    key={entry.id}
                    onClick={() => handleSelectEntry(entry)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? "bg-[#111827] border border-[#00E5FF]/50 shadow-md translate-x-1"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        {icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs sm:text-sm font-bold text-white truncate">
                            {entry.title}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/10 text-gray-300 shrink-0">
                            {entry.categoryBadge}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">
                          {entry.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {entry.extraMeta && (
                        <span className="text-[10px] font-mono text-gray-500 hidden sm:inline">
                          {entry.extraMeta}
                        </span>
                      )}
                      {isSelected && (
                        <CornerDownLeft className="w-4 h-4 text-[#00E5FF]" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ── Footer Keyboard Navigation Hints ── */}
          <div className="p-3 bg-[#06070A] border-t border-[#2A3441]/80 flex items-center justify-between text-[11px] font-mono text-gray-500">
            <div className="flex items-center space-x-3">
              <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">↓</kbd> Navigate</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">↵</kbd> Select</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">ESC</kbd> Close</span>
            </div>
            <span className="text-[#00E5FF] font-semibold">PRASHANT DESIGN OS // ⌘K</span>
          </div>

        </div>
      </div>

      {/* Render child modals when triggered from search */}
      <CinematicCategoryGalleryModal
        category={selectedCategory}
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
      />
      <FlyerScrollOverlay
        isOpen={flyerOverlayOpen}
        onClose={() => setFlyerOverlayOpen(false)}
      />
    </>
  );
}
