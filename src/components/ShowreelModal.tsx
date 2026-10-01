"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Film, Sparkles, Volume2, VolumeX, Maximize2, Check, Award, Layers } from "lucide-react";
import Image from "next/image";

export interface ShowreelItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  resolution: string;
  fps: string;
  software: string[];
  description: string;
  videoUrl: string;
  thumbnail: string;
  accent?: string;
}

export const SHOWREELS: ShowreelItem[] = [
  {
    id: "portfolio-showreel",
    title: "Portfolio Showreel",
    subtitle: "Master Video Editing & Motion Graphics • 4K UHD",
    category: "Master Reel",
    duration: "01:10",
    resolution: "4K UHD (3840×2160)",
    fps: "24 FPS",
    software: ["Adobe Premiere Pro", "After Effects", "Color Grading", "Sound Design"],
    description: "The official master showreel compiling dynamic pacing edits, multi-track audio synchronization, visual transitions, 3D space tracking, keyframe animations, and cinema-grade color grading.",
    videoUrl: "/videos/portfolio_showreel.mp4",
    thumbnail: "/images/portfolio_showreel_thumbnail.png",
    accent: "#D4A017",
  },
  {
    id: "travel-showreel",
    title: "Travel Showreel",
    subtitle: "Cinematic Travel Film • 4K UHD",
    category: "Travel Film",
    duration: "00:30",
    resolution: "4K UHD (3840×2160)",
    fps: "24 FPS",
    software: ["Adobe Premiere Pro", "DaVinci Resolve", "Drone Stabilization", "Atmospheric LUTs"],
    description: "High-impact cinematic travel showreel featuring atmospheric color grading, speed ramping, rhythmic match cuts, drone footage stabilization, and spatial acoustic design.",
    videoUrl: "/videos/travel_showreel.mp4",
    thumbnail: "/images/travel_showreel_thumbnail.png",
    accent: "#00F0FF",
  },
];

interface ShowreelModalProps {
  isOpen: boolean;
  initialReelId?: string;
  onClose: () => void;
}

export default function ShowreelModal({
  isOpen,
  initialReelId = "portfolio-showreel",
  onClose,
}: ShowreelModalProps) {
  const [selectedId, setSelectedId] = useState<string>(initialReelId);
  const [mounted, setMounted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync initialReelId when modal opens
  useEffect(() => {
    if (isOpen && initialReelId) {
      setSelectedId(initialReelId);
    }
  }, [isOpen, initialReelId]);

  const currentReel = SHOWREELS.find((r) => r.id === selectedId) || SHOWREELS[0];

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Pause video on close
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  const handleSelectReel = (id: string) => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSelectedId(id);
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Ambient radial glow matching active reel accent */}
        <div
          className="fixed inset-0 pointer-events-none opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at center, ${currentReel.accent || "#D4A017"} 0%, transparent 70%)`,
          }}
        />

        {/* Modal Window Container */}
        <motion.div
          id="showreel-modal"
          role="dialog"
          aria-modal="true"
          aria-label={currentReel.title}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl my-auto rounded-2xl bg-[#090909]/95 border border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex flex-col max-h-[96vh]"
        >
          {/* Top Bar / Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#121212]/90 backdrop-blur-md">
            <div className="flex items-center space-x-3 overflow-hidden">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
                style={{ backgroundColor: currentReel.accent || "#D4A017" }}
              />
              <div className="truncate">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20 shrink-0 font-bold">
                    {currentReel.category}
                  </span>
                  <span className="text-xs font-mono text-gray-400 hidden sm:inline-block">
                    {currentReel.resolution} • {currentReel.duration}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white truncate mt-0.5">
                  {currentReel.title}
                </h3>
              </div>
            </div>

            {/* Reel Quick-Switcher & Close Button */}
            <div className="flex items-center space-x-2 shrink-0 ml-2">
              {/* Showreel Switcher Pills (Header) */}
              <div className="hidden md:flex items-center p-1 rounded-lg bg-black/60 border border-white/10 space-x-1">
                {SHOWREELS.map((reel) => {
                  const isActive = reel.id === currentReel.id;
                  return (
                    <button
                      key={reel.id}
                      data-reel-id={reel.id}
                      onClick={() => handleSelectReel(reel.id)}
                      className={`px-3 py-1 rounded text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                        isActive
                          ? "bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,160,23,0.4)]"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Film className="w-3 h-3" />
                      <span>{reel.title.replace(" Showreel", "")}</span>
                      <span className="text-[9px] opacity-75">({reel.duration})</span>
                    </button>
                  );
                })}
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close Showreel Overlay"
                className="p-2 rounded-xl text-gray-400 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors duration-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Video Player Container (Flexible 16:9 aspect ratio) */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
            <video
              id="showreel-video"
              key={currentReel.videoUrl}
              ref={videoRef}
              src={currentReel.videoUrl}
              poster={currentReel.thumbnail}
              controls
              autoPlay
              playsInline
              preload="auto"
              className="w-full h-full object-contain"
            >
              Your browser does not support high definition HTML5 video.
            </video>
          </div>

          {/* Bottom Controls & Info Bar */}
          <div className="p-4 sm:p-6 bg-[#0e0e0e] border-t border-white/10 overflow-y-auto space-y-4">
            {/* Mobile Reel Selector (visible on small screens) */}
            <div className="flex md:hidden items-center justify-center p-1 rounded-xl bg-black border border-white/10 gap-1 w-full">
              {SHOWREELS.map((reel) => {
                const isActive = reel.id === currentReel.id;
                return (
                  <button
                    key={reel.id}
                    data-reel-id={reel.id}
                    onClick={() => handleSelectReel(reel.id)}
                    className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1.5 ${
                      isActive
                        ? "bg-[#D4AF37] text-black font-black shadow-md"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Film className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{reel.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Description & Metadata Grid */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-extrabold text-white tracking-wide">
                    {currentReel.subtitle}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {currentReel.description}
                </p>
              </div>

              {/* Tech Tags & Badges */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-[#00F0FF]">
                  {currentReel.resolution}
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-gray-300">
                  {currentReel.fps}
                </span>
                {currentReel.software.map((sw) => (
                  <span
                    key={sw}
                    className="px-2.5 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[10px] sm:text-xs font-semibold text-[#F5BA42]"
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            {/* Switch to Other Reel Callout */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
              <span className="hidden sm:inline">
                💡 Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">ESC</kbd> or click outside to close anytime.
              </span>
              <div className="flex items-center space-x-2 ml-auto">
                <span className="text-[11px] text-gray-400">Up Next:</span>
                {SHOWREELS.filter((r) => r.id !== currentReel.id).map((otherReel) => (
                  <button
                    key={otherReel.id}
                    onClick={() => handleSelectReel(otherReel.id)}
                    className="text-xs font-bold text-[#D4AF37] hover:text-white underline underline-offset-4 cursor-pointer flex items-center space-x-1"
                  >
                    <span>Play {otherReel.title}</span>
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
