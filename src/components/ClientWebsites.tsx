"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Layers,
  Printer,
  Database,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  Sparkles,
  X,
  Eye,
  ArrowUpRight,
  Code2,
  ShoppingBag,
} from "lucide-react";

interface GraphicAsset {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  badge: string;
  dimensions: string;
}

const GRAPHIC_ASSETS: GraphicAsset[] = [
  {
    id: "web-banner",
    title: "Storefront Web Banner & Hero Interface",
    category: "Digital UI & E-Commerce",
    description:
      "Modern retail web banner engineered for the Veronixx digital storefront with high-contrast typography, product category highlights, and promotional hero cards.",
    image: "/images/clients/veronixx/veronixx-web-banner.png",
    badge: "Web Storefront UI",
    dimensions: "1920 × 1080",
  },
  {
    id: "brand-identity",
    title: "Brand Identity & Corporate Typography",
    category: "Brand Architecture",
    description:
      "Comprehensive corporate brand system featuring modern geometric monogram logo, high-end packaging hierarchy, and dual-tone corporate palette.",
    image: "/images/clients/veronixx/veronixx-brand-identity.png",
    badge: "Brand Design System",
    dimensions: "Vector • Hi-Res",
  },
  {
    id: "retail-pamphlet",
    title: "Retail Marketing Pamphlet & Catalog",
    category: "Print & Collateral",
    description:
      "High-conversion multi-fold marketing flyer showcasing sanitaryware, CPVC pipes, electrical fittings, and grand showroom opening promotions.",
    image: "/images/clients/veronixx/veronixx-pamphlet.png",
    badge: "Print Marketing",
    dimensions: "A4 Print Master",
  },
  {
    id: "thermal-receipt",
    title: "Automated GST Invoicing & Thermal Receipt",
    category: "Hardware & POS Engine",
    description:
      "Custom ESC/POS thermal receipt template engineered with automated 18% & 28% CGST/SGST tax breakdown, dynamic QR UPI payments, and inventory audit trails.",
    image: "/images/clients/veronixx/veronixx-receipt-color.png",
    badge: "ESC/POS Thermal Engine",
    dimensions: "80mm Thermal Slip",
  },
  {
    id: "business-card",
    title: "Executive Business Card Design",
    category: "Corporate Collateral",
    description:
      "Matte finish corporate visiting card designed with gold foil stamping accents, QR digital contact vCard, and sleek industrial aesthetics.",
    image: "/images/clients/veronixx/veronixx-business-card.jpg",
    badge: "Executive Stationery",
    dimensions: "3.5\" × 2.0\"",
  },
];

const METRICS = [
  {
    label: "Live E-Commerce Web App",
    value: "Production",
    detail: "Vercel Edge Cloud Deployment",
    icon: Globe,
  },
  {
    label: "Offline-First Engine",
    value: "100%",
    detail: "PGLite WASM + SQLite WAL",
    icon: Database,
  },
  {
    label: "POS Invoicing Latency",
    value: "< 350ms",
    detail: "Instant ESC/POS Hardware Printing",
    icon: Printer,
  },
  {
    label: "Tax Compliance",
    value: "GST Ready",
    detail: "Automated 18% & 28% Split + UTR",
    icon: ShieldCheck,
  },
];

export default function ClientWebsites() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(32);
  const [selectedGraphic, setSelectedGraphic] = useState<GraphicAsset | null>(null);
  const [activeGraphicTab, setActiveGraphicTab] = useState<string>("all");
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 32);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedGraphic(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredAssets =
    activeGraphicTab === "all"
      ? GRAPHIC_ASSETS
      : GRAPHIC_ASSETS.filter((a) =>
          activeGraphicTab === "ui"
            ? a.category.includes("UI")
            : activeGraphicTab === "brand"
            ? a.category.includes("Brand") || a.category.includes("Corporate")
            : a.category.includes("Print") || a.category.includes("POS")
        );

  return (
    <section
      id="websites"
      aria-label="Client Websites and Enterprise Engineering Showcase"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAF7] dark:bg-[#07090E] transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#E2E5EA] dark:border-[rgba(212,175,55,0.2)]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Work & Production Deployments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B0F19] dark:text-white">
              Enterprise Websites &{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11]">
                Retail Platforms
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#555C68] dark:text-[#9BA1B0] leading-relaxed">
              Full-lifecycle commercial solutions designed and engineered for real clients — combining
              modern high-performance e-commerce web applications, offline-first POS hardware engines,
              and end-to-end brand identity architecture.
            </p>
          </div>

          {/* Quick CTA to live site */}
          <div className="mt-6 md:mt-0 flex-shrink-0">
            <a
              href="https://veronixx.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide text-black bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.55)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <span>Visit Live Platform</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Featured Case Study: VS VERONIXX */}
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 mb-20 bg-white/70 dark:bg-[#0D111A]/80 backdrop-blur-xl border border-[#E2E5EA] dark:border-[rgba(212,175,55,0.25)] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          {/* Top Banner Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live in Production
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold tracking-wider text-[#666] dark:text-[#AAA] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                  Client Project // Retails & Commerce
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                  Dual Web + Desktop POS Stack
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#111] p-0.5 shadow-md">
                  <div className="w-full h-full rounded-[10px] bg-[#0A0D14] flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/clients/veronixx/veronixx-logo.png"
                      alt="Veronixx Logo"
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19] dark:text-white flex items-center gap-2">
                    VS VERONIXX
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#666] dark:text-zinc-300">
                      v2.4
                    </span>
                  </h3>
                  <a
                    href="https://veronixx.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-[#D4AF37] hover:underline inline-flex items-center gap-1"
                  >
                    https://veronixx.vercel.app
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-[#4B5260] dark:text-[#B0B6C4] leading-relaxed">
                An integrated retail operating ecosystem designed for electrical, sanitaryware, and
                hardware enterprises. Features an ultra-fast customer-facing e-commerce storefront
                coupled with an offline-first desktop POS billing engine with instant ESC/POS thermal printing
                and automated multi-tier GST ledger accounting.
              </p>

              {/* Technologies */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Next.js / Vite / React 19",
                  "TanStack Router",
                  "ElectricSQL PGLite (WASM)",
                  "TailwindCSS + Radix UI",
                  "ESC/POS Thermal Drivers",
                  "SQLite WAL Mode",
                  "Automated GST Split",
                  "Vercel Edge Cloud",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#F1F3F7] dark:bg-[#141824] text-[#333] dark:text-[#D1D5DB] border border-[#DCE0E8] dark:border-[rgba(212,175,55,0.15)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              {METRICS.map((m) => {
                const IconComponent = m.icon;
                return (
                  <div
                    key={m.label}
                    className="p-4 rounded-2xl bg-[#F6F8FB]/80 dark:bg-[#111624]/70 border border-[#E2E6ED] dark:border-[rgba(212,175,55,0.18)]"
                  >
                    <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
                      <IconComponent className="w-4 h-4" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#666] dark:text-[#999]">
                        {m.label}
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#0B0F19] dark:text-white">
                      {m.value}
                    </div>
                    <p className="text-[11px] text-[#5A6270] dark:text-[#8D93A3] mt-1 leading-tight">
                      {m.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Video Showcase Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="text-lg sm:text-xl font-bold text-[#0B0F19] dark:text-white">
                  Commercial Showcase Video (Authentic Client Cut)
                </h4>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/25">
                32s Full HD Walkthrough
              </span>
            </div>

            {/* Interactive Video Container */}
            <div className="relative rounded-2xl overflow-hidden bg-black border border-[#D6D9DE] dark:border-[rgba(212,175,55,0.35)] shadow-2xl group">
              <video
                ref={videoRef}
                src="/videos/veronixx-client-showcase.mp4"
                poster="/images/clients/veronixx/veronixx-web-banner.png"
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
                className="w-full aspect-video object-cover cursor-pointer"
              />

              {/* Big Center Play Overlay (when paused) */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-all duration-300"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.7)]"
                    aria-label="Play commercial showcase video"
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
                  </motion.button>
                </div>
              )}

              {/* Bottom Custom Control Bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2 opacity-95 group-hover:opacity-100 transition-opacity">
                {/* Seek Bar */}
                <input
                  type="range"
                  min={0}
                  max={duration || 32}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Seek video playback"
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />

                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-white" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-white" />
                      )}
                    </button>

                    <span className="font-mono text-[11px] text-zinc-300">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-[11px] text-[#D4AF37] font-semibold">
                      VERONIXX ENTERPRISE PRODUCTION CUT
                    </span>
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
                      aria-label="Toggle fullscreen video"
                    >
                      <Maximize2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Graphics & Brand Deliverables Showcase */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#D4AF37]" />
                  <h4 className="text-lg sm:text-xl font-bold text-[#0B0F19] dark:text-white">
                    Brand Collateral, Graphics & Hardware Design
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#555C68] dark:text-[#9BA1B0] mt-1">
                  Click any asset to inspect high-resolution production art, print specifications, and design rationale.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 self-start sm:self-auto">
                {[
                  { label: "All Assets", val: "all" },
                  { label: "Web UI", val: "ui" },
                  { label: "Brand Identity", val: "brand" },
                  { label: "Print & Hardware", val: "print" },
                ].map((tab) => (
                  <button
                    key={tab.val}
                    onClick={() => setActiveGraphicTab(tab.val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeGraphicTab === tab.val
                        ? "bg-[#D4AF37] text-black shadow-sm"
                        : "text-[#555] dark:text-[#AAA] hover:text-[#0B0F19] dark:hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Graphics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedGraphic(asset)}
                  className="group relative rounded-2xl overflow-hidden bg-[#F6F8FB] dark:bg-[#121622] border border-[#E2E5EA] dark:border-[rgba(212,175,55,0.18)] hover:border-[#D4AF37]/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Image container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10 dark:bg-black/40">
                    <Image
                      src={asset.image}
                      alt={asset.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37] text-black text-xs font-bold shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Asset</span>
                      </div>
                    </div>

                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-md border border-white/10">
                        {asset.badge}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 text-zinc-300 backdrop-blur-md">
                        {asset.dimensions}
                      </span>
                    </div>
                  </div>

                  {/* Asset Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                        {asset.category}
                      </div>
                      <h5 className="font-bold text-sm sm:text-base text-[#0B0F19] dark:text-white line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                        {asset.title}
                      </h5>
                      <p className="text-xs text-[#555C68] dark:text-[#9BA1B0] mt-1.5 line-clamp-2 leading-relaxed">
                        {asset.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E8ECF2] dark:border-white/5 flex items-center justify-between text-xs text-[#666] dark:text-zinc-400">
                      <span className="font-medium">Production Approved</span>
                      <span className="font-semibold text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        View Full Art <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Engineering Scope Summary */}
          <div className="mt-12 p-6 rounded-2xl bg-[#F6F8FB]/70 dark:bg-[#101420]/60 border border-[#E2E6ED] dark:border-[rgba(212,175,55,0.15)]">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Complete Engineering Scope Delivered
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-[#4B5260] dark:text-[#A0A6B5]">
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Full-Stack Storefront:</strong> Custom TanStack Router dynamic catalog, responsive cart state, and Vercel edge deployment.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Hardware Thermal Integration:</strong> ESC/POS low-level byte stream drivers for 80mm printers with sub-second receipt dispatch.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>
                  <strong>Complete Brand Architecture:</strong> Vector logos, social assets, commercial posters, visiting cards, and physical storefront banners.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Graphic Assets */}
      <AnimatePresence>
        {selectedGraphic && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedGraphic.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedGraphic(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-3xl overflow-hidden bg-[#0F131D] border border-[rgba(212,175,55,0.35)] shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div>
                  <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                    {selectedGraphic.category} • {selectedGraphic.badge}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {selectedGraphic.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedGraphic(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body / Image Viewer */}
              <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] bg-black/60 flex items-center justify-center p-4 overflow-auto">
                <div className="relative w-full h-[320px] sm:h-[480px]">
                  <Image
                    src={selectedGraphic.image}
                    alt={selectedGraphic.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-300">
                <p className="max-w-2xl text-zinc-300 leading-relaxed">
                  {selectedGraphic.description}
                </p>
                <div className="flex-shrink-0 flex items-center gap-3">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/10 text-white">
                    {selectedGraphic.dimensions}
                  </span>
                  <a
                    href={selectedGraphic.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl font-semibold bg-[#D4AF37] text-black hover:bg-[#F3E5AB] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Open Full Master</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
