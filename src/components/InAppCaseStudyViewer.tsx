"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, X, Maximize2, Minimize2, RotateCcw, 
  ExternalLink, Sparkles, Layers, ShieldCheck 
} from "lucide-react";

interface InAppCaseStudyViewerProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudyUrl: string;
  projectTitle: string;
  subtitle?: string;
}

export default function InAppCaseStudyViewer({
  isOpen,
  onClose,
  caseStudyUrl,
  projectTitle,
  subtitle,
}: InAppCaseStudyViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and set up Escape listener
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    setIsLoading(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isFullscreen, onClose]);

  // Handle reload
  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  // Toggle fullscreen mode
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[200] bg-[#05060A] text-white flex flex-col overflow-hidden font-sans"
        role="dialog"
        aria-modal="true"
        aria-label={`In-App Case Study Reader: ${projectTitle}`}
      >
        {/* Top Control Bar with Prominent Back Button */}
        <header className="flex-shrink-0 h-16 sm:h-[70px] px-3 sm:px-6 bg-[#080C18]/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between z-30 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          {/* Left: Prominent Back Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F5BA42] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              title="Return directly to portfolio workspace (Esc)"
              aria-label="Back to Portfolio"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" aria-hidden="true" />
              <span>Back to Portfolio</span>
            </button>

            <div className="hidden lg:flex items-center space-x-2 text-xs text-gray-400">
              <span className="font-mono text-gray-500">/</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#D4AF37]">
                IN-APP READER
              </span>
            </div>
          </div>

          {/* Center: Title & Identity */}
          <div className="flex-1 max-w-xl mx-3 sm:mx-6 text-center truncate">
            <div className="flex items-center justify-center gap-2 truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 hidden sm:inline-block" />
              <h1 className="text-xs sm:text-base font-black text-white truncate tracking-wide uppercase">
                {projectTitle}
              </h1>
            </div>
            {subtitle && (
              <p className="text-[10px] sm:text-xs text-gray-400 truncate hidden sm:block mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Refresh Frame */}
            <button
              onClick={handleReload}
              className="p-2 sm:p-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Reload Case Study"
              aria-label="Reload case study frame"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={handleToggleFullscreen}
              className="hidden sm:flex p-2 sm:p-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 border border-white/10 text-white transition-colors cursor-pointer"
              title="Close In-App Reader (Esc)"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </header>

        {/* Viewport Content Area */}
        <main className="flex-1 w-full h-full relative bg-[#06070A] overflow-hidden">
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#06070A] text-white">
              <div className="w-12 h-12 border-3 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-xs sm:text-sm font-mono tracking-widest text-[#D4AF37] uppercase animate-pulse">
                Mounting Interactive Case Study...
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Zero external redirection • Native In-App Experience
              </p>
            </div>
          )}

          {/* Fully Responsive Iframe */}
          <iframe
            key={iframeKey}
            src={caseStudyUrl}
            title={projectTitle}
            className="w-full h-full border-0 block bg-[#06070A]"
            onLoad={() => setIsLoading(false)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
