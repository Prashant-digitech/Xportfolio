"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { 
  X, Download, ZoomIn, ZoomOut, RotateCcw, 
  ChevronDown, ExternalLink, Sparkles, Printer, FileText, Check 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface FlyerItem {
  id: string;
  number: string;
  title: string;
  badge: string;
  image: string;
  specs: string;
  dimensions: string;
  tools: string[];
  purpose: string;
  designStrategy: string[];
}

export const ALL_FLYERS: FlyerItem[] = [
  {
    id: "flyer-direct-response",
    number: "01",
    title: "Corporate Direct-Response Business Flyer",
    badge: "Direct-Response Marketing",
    image: "/images/graphics/my-work/flyer.png",
    specs: "A5 Double-Sided • 300 DPI • CMYK Offset Print",
    dimensions: "148 × 210 mm (3mm Bleed & Safe Margins)",
    tools: ["Adobe InDesign", "Illustrator", "Photoshop"],
    purpose: "Engineered for maximum direct-response customer conversion with a clear Z-pattern visual scan.",
    designStrategy: [
      "Rigorous typographic hierarchy directing attention from primary hook to value proposition.",
      "High-contrast accent badges highlighting core service tiers and guarantees.",
      "Clear contact section with phone, email, and embedded response QR code."
    ]
  },
  {
    id: "flyer-executive-summit",
    number: "02",
    title: "Executive Business Summit & Conference Flyer",
    badge: "Conference Collateral",
    image: "/images/graphics/my-work/flyer1.png",
    specs: "A4 Master • 300 DPI • CMYK Bleed Certified",
    dimensions: "210 × 297 mm (Full Bleed A4)",
    tools: ["Swiss Grid Architecture", "InDesign", "Illustrator"],
    purpose: "Deliver executive authority and schedule clarity for prospective corporate attendees and sponsors.",
    designStrategy: [
      "Structured Swiss grid timetable displaying keynote speakers and panel tracks.",
      "Monochromatic corporate slate palette with metallic gold accent highlights.",
      "Sponsor tier logo grid with optical kerning and mathematical baseline spacing."
    ]
  },
  {
    id: "flyer-enterprise-solutions",
    number: "03",
    title: "Modern Tech Enterprise Solutions Flyer",
    badge: "B2B Marketing Collateral",
    image: "/images/graphics/my-work/flyer2.png",
    specs: "Double-Sided A5 • 300 DPI Offset • Spot UV Ready",
    dimensions: "148 × 210 mm",
    tools: ["Illustrator", "Photoshop", "Design Tokens"],
    purpose: "Transforms complex enterprise cloud and software architecture into scannable feature pillars.",
    designStrategy: [
      "Dark mode visual aesthetics reflecting high-tech security and modern software interfaces.",
      "Scannable 3-column capability matrix paired with vector telemetry icons.",
      "Targeted ROI statistics callouts for CTO and VP-level decision makers."
    ]
  },
  {
    id: "flyer-creative-agency",
    number: "04",
    title: "Creative Agency Portfolio & Services Flyer",
    badge: "Agency Capability Showcase",
    image: "/images/graphics/my-work/flyer3.png",
    specs: "Commercial Print Master • 300 DPI CMYK",
    dimensions: "A4 Tri-Fold / Flat Format",
    tools: ["InDesign", "Photoshop", "Color Curation"],
    purpose: "Dynamic visual showcase demonstrating creative agency design excellence at first glance.",
    designStrategy: [
      "Dynamic diagonal geometric cuts creating energy and forward momentum.",
      "High-fidelity project mockup vignettes showcasing branding, digital, and print craft.",
      "Gold foil registration plate specifications for tactile premium handouts."
    ]
  },
  {
    id: "flyer-retail-seasonal",
    number: "05",
    title: "Retail Seasonal Campaign Promotional Leaflet",
    badge: "Retail Promotional Campaign",
    image: "/images/graphics/my-work/flyer4.png",
    specs: "Mass-Distribution Print Master • CMYK Offset",
    dimensions: "A5 Single-Sided High-Run Print",
    tools: ["Photoshop", "Illustrator", "Commercial Print"],
    purpose: "Drive immediate physical foot-traffic and digital e-commerce visits during holiday sales.",
    designStrategy: [
      "High-contrast discount percentage bursts with maximum optical scanability.",
      "Product hero vignettes with subtle drop shadows to create 3D shelf depth.",
      "High-contrast store location directions, operating hours, and instant QR code."
    ]
  }
];

interface FlyerScrollOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialFlyerIndex?: number;
}

export default function FlyerScrollOverlay({
  isOpen,
  onClose,
  initialFlyerIndex = 0
}: FlyerScrollOverlayProps) {
  const [zoomScale, setZoomScale] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const flyerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "+" || e.key === "=") {
        setZoomScale((z) => Math.min(z + 0.2, 2));
      }
      if (e.key === "-") {
        setZoomScale((z) => Math.max(z - 0.2, 0.8));
      }
      if (e.key === "0") {
        setZoomScale(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setZoomScale(1);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Jump to specific flyer
  const scrollToFlyer = (index: number) => {
    const el = flyerRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll to initial index on open
  useEffect(() => {
    if (isOpen && initialFlyerIndex > 0) {
      setTimeout(() => {
        scrollToFlyer(initialFlyerIndex);
      }, 250);
    }
  }, [isOpen, initialFlyerIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[250] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl select-none"
        role="dialog"
        aria-modal="true"
        aria-label="All Flyers Collection - Scrollable Format"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Main Modal Shell with Gold Specular Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          className="relative max-w-6xl w-full h-[94vh] rounded-3xl bg-[#090D16] border-2 border-[#D4AF37] shadow-[0_0_80px_rgba(212,175,55,0.35)] flex flex-col overflow-hidden text-white font-sans"
        >
          {/* ── Top Header Control Bar ─────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#06080F]/90 backdrop-blur-md border-b border-white/10 px-5 sm:px-8 py-4 z-20">
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[10px] font-mono font-extrabold text-[#F5BA42] uppercase tracking-wider">
                  Flyer Showcase • 5 Print Masters
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold hidden sm:inline">
                  Continuous Scrollable Format
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white mt-1">
                Commercial & Business <span className="text-gradient-gold">Flyer Collection</span>
              </h2>
            </div>

            {/* Quick jump navigation pills */}
            <div className="flex items-center space-x-2 shrink-0">
              {/* Zoom controls */}
              <div className="hidden md:flex items-center space-x-1 bg-white/5 border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setZoomScale((z) => Math.min(z + 0.2, 2))}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  title="Zoom In (+)"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomScale((z) => Math.max(z - 0.2, 0.8))}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  title="Zoom Out (-)"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomScale(1)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors text-[10px] font-mono"
                  title="Reset Zoom (0)"
                  aria-label="Reset zoom"
                >
                  {Math.round(zoomScale * 100)}%
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 hover:border-red-500/40 text-gray-400 transition-colors cursor-pointer"
                aria-label="Close flyers overlay"
                title="Close Overlay (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ── Quick Jump Bar (Sticky under header) ────────────────── */}
          <div className="bg-[#0D121F]/80 border-b border-white/5 px-5 sm:px-8 py-2.5 flex items-center justify-between gap-3 overflow-x-auto text-xs font-mono scrollbar-none z-10">
            <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold shrink-0">
              Jump To Flyer:
            </span>
            <div className="flex items-center space-x-2">
              {ALL_FLYERS.map((flyer, idx) => (
                <button
                  key={flyer.id}
                  onClick={() => scrollToFlyer(idx)}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/50 text-gray-300 hover:text-[#F5BA42] text-[11px] font-bold uppercase transition-all shrink-0 cursor-pointer"
                >
                  {flyer.number} · {flyer.badge.split(" ")[0]}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-gray-500 hidden lg:block shrink-0">
              Scroll down to inspect all 5 deliverables
            </div>
          </div>

          {/* ── Continuous Scrollable Body ─────────────────────────── */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 space-y-16 custom-scrollbar"
            tabIndex={0}
          >
            {ALL_FLYERS.map((flyer, index) => (
              <div
                key={flyer.id}
                ref={(el) => {
                  flyerRefs.current[index] = el;
                }}
                className="relative max-w-4xl mx-auto rounded-3xl bg-[#0F1422]/90 border border-white/10 p-6 sm:p-8 shadow-2xl hover:border-[#D4AF37]/40 transition-colors scroll-mt-6"
              >
                {/* Header for individual flyer */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#AA7C11] text-black font-black font-mono text-base flex items-center justify-center shadow-lg">
                      {flyer.number}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5BA42] font-bold block">
                        {flyer.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                        {flyer.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <a
                      href={flyer.image}
                      download={`Prashant-Flyer-${flyer.number}-${flyer.title.replace(/\s+/g, "-")}.png`}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#D4AF37] hover:text-black border border-white/10 hover:border-[#D4AF37] text-gray-300 font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow cursor-pointer"
                      title="Download High-Res Print File"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PNG</span>
                    </a>
                  </div>
                </div>

                {/* Main Flyer Image Preview (Zoomable) */}
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[70vh] rounded-2xl overflow-hidden bg-[#05070B] border border-white/10 mb-6 flex items-center justify-center p-2 group">
                  <div
                    className="relative w-full h-full transition-transform duration-200"
                    style={{ transform: `scale(${zoomScale})` }}
                  >
                    <Image
                      src={flyer.image}
                      alt={flyer.title}
                      fill
                      priority={index === 0}
                      unoptimized
                      className="object-contain"
                    />
                  </div>

                  {/* Corner Specs Badge */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-gray-300">
                    {flyer.dimensions}
                  </div>
                </div>

                {/* Technical & Strategic Details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-black/30 rounded-2xl p-5 border border-white/5">
                  <div className="md:col-span-6 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                      Target Purpose & Use Case
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {flyer.purpose}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {flyer.tools.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-gray-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-6 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5BA42] font-bold block">
                      Design & Conversion Strategy
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-400">
                      {flyer.designStrategy.map((strat, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{strat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Jump to Next Flyer button if not last */}
                {index < ALL_FLYERS.length - 1 && (
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => scrollToFlyer(index + 1)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white text-xs font-mono uppercase flex items-center space-x-2 transition-all cursor-pointer"
                    >
                      <span>Scroll to Flyer 0{index + 2}</span>
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Bottom Closure Banner */}
            <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-gold/10 via-transparent to-cyan-500/10 border border-white/10 text-center space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F5BA42]">
                End of Flyer Collection • 5/5 Delivered
              </span>
              <p className="text-xs text-gray-400">
                All flyers are print-calibrated (300 DPI CMYK) with strict bleed margins and high-conversion typographic hierarchy.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F5BA42] text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Flyer Viewport
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
