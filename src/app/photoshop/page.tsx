"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronLeft, ChevronRight, X, ArrowLeft, Sparkles, Download, ImageIcon, Eye 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "@/components/BackgroundParticles";

// Static Photoshop artwork listing mapping files exactly in public/photoshop/
const photoshopDesigns = [
  { id: 1, title: "Creative Composition v1", path: "/photoshop/page1.png" },
  { id: 2, title: "Concept Art Manipulation", path: "/photoshop/page2.png" },
  { id: 3, title: "Digital Composite Design", path: "/photoshop/page3.png" },
  { id: 4, title: "Sleek Creative Graphics", path: "/photoshop/page4.png" },
  { id: 5, title: "Visual manipulation Art", path: "/photoshop/page5.png" },
  { id: 6, title: "Surreal Digital Landscape", path: "/photoshop/page6.png" },
  { id: 7, title: "Atmospheric Visual Composition", path: "/photoshop/page7.png" },
  { id: 8, title: "Dynamic Poster Artwork", path: "/photoshop/page8.png" },
  { id: 9, title: "Futuristic Composite Art", path: "/photoshop/page9.png" },
  { id: 10, title: "Premium Visual Manipulation", path: "/photoshop/page10.png" },
  { id: 11, title: "Abstract Compositing Design", path: "/photoshop/page11.png" },
  { id: 12, title: "High-Contrast Creative Poster", path: "/photoshop/page12.png" },
  { id: 13, title: "Creative Product Manipulation", path: "/photoshop/page13.png" },
  { id: 14, title: "Cinematic Scene Matte Paint", path: "/photoshop/page14.png" },
  { id: 15, title: "Atmospheric Glow Composite", path: "/photoshop/page15.png" },
  { id: 16, title: "Cyber-Style Visual Concept", path: "/photoshop/page16.png" },
  { id: 17, title: "Creative Branding Art", path: "/photoshop/page17.png" },
  { id: 18, title: "Surreal Composite Manipulation", path: "/photoshop/page18.png" },
  { id: 19, title: "Abstract Digital Composition", path: "/photoshop/page19.png" },
  { id: 20, title: "Premium Lighting Manipulation", path: "/photoshop/page20.png" },
  { id: 21, title: "Creative Matte Composition", path: "/photoshop/page21.png" }
];

export default function PhotoshopGallery() {
  const [accent, setAccent] = useState<"gold" | "blue" | "violet">("gold");
  const [mounted, setMounted] = useState<boolean>(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // 1. Sync User Accent and Settings from Local Storage
  useEffect(() => {
    setMounted(true);
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.accent) {
          setAccent(parsed.accent);
        }
      } catch (e) {
        console.error("Failed to parse profile accent", e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-accent", accent);
    }
  }, [accent, mounted]);

  // 2. Lightbox Navigation and Key Bindings
  const handlePrev = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : photoshopDesigns.length - 1));
  };

  const handleNext = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((prev) => (prev !== null && prev < photoshopDesigns.length - 1 ? prev + 1 : 0));
  };

  const handleClose = () => {
    setLightboxIdx(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIdx]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden pb-24 font-sans">
      
      {/* 3D WebGL Ambient Particles Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <BackgroundParticles accent={accent} />
      </div>

      {/* Decorative glows */}
      <div className="absolute top-[5%] left-[-10%] w-[450px] h-[450px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-8">
        
        {/* Navigation / Header Area */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-16 border-b border-white/5 pb-8">
          
          {/* Back Home trigger */}
          <Link 
            href="/"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-white/10 bg-black/40 hover:border-gold hover:text-gold hover:shadow-[0_0_15px_rgba(212,160,23,0.2)] transition-all duration-300 group cursor-pointer text-xs font-bold uppercase tracking-wider text-gray-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Heading badge */}
          <div className="flex items-center space-x-2 text-gold">
            <Sparkles className="w-4 h-4 animate-pulse-slow" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-extrabold select-none">
              Visual Matte Composites
            </span>
            <Sparkles className="w-4 h-4 animate-pulse-slow" />
          </div>
        </header>

        {/* Main Title Banner */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
            PHOTOSHOP <span className="text-gradient-gold">CREATIVE WORK</span>
          </h1>
          <div className="w-20 h-[2px] bg-gold mx-auto shadow-[0_0_10px_#D4A017]" />
          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Explore Prashant's extensive portfolio of creative manipulations, artwork composition, matte painting, and visual composites. Hover to inspect titles and click to load in high-definition viewport.
          </p>
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photoshopDesigns.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.5) }}
              onClick={() => setLightboxIdx(idx)}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-lg cursor-pointer hover:border-gold/30 hover:shadow-[0_0_15px_rgba(212,160,23,0.15)] transition-all duration-300"
            >
              {/* Thumbnail image scan */}
              <Image
                src={art.path}
                alt={art.title}
                fill
                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_8px_rgba(212,160,23,0.2)]">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gold-light uppercase tracking-wider">
                    Artwork #{art.id}
                  </span>
                  <h4 className="font-extrabold text-sm text-white leading-tight uppercase">
                    {art.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Footer Banner */}
        <div className="mt-24 p-6 rounded-lg glass-card border border-white/5 bg-white/[0.01] text-center flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
            <ImageIcon className="w-4 h-4 text-gold" />
            <span>Photoshop Portfolio Workspace</span>
          </div>
          <p className="text-xs text-gray-500 max-w-md">
            All images are property of Prashant Sisodhiya and have been dynamically exported in high fidelity for immediate assessment.
          </p>
          <Link
            href="/"
            className="px-6 py-2.5 bg-gold text-black font-extrabold text-xs uppercase tracking-wider rounded hover:bg-gold-light transition-all duration-300 shadow-[0_4px_12px_rgba(212,160,23,0.15)] cursor-pointer"
          >
            Back to Home Base
          </Link>
        </div>

      </div>

      {/* 4. High-Resolution Lightbox Viewport */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md select-none">
            
            {/* Clickable Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 cursor-pointer"
            />

            {/* Lightbox content box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full h-[80vh] flex flex-col justify-between z-10"
            >
              {/* Upper Header Control Bar */}
              <div className="flex justify-between items-center bg-black/50 backdrop-blur-sm border border-white/10 rounded-t-lg px-4 py-3 text-white">
                <div>
                  <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">
                    Viewing {lightboxIdx + 1} of {photoshopDesigns.length}
                  </span>
                  <h3 className="text-sm font-extrabold uppercase">
                    {photoshopDesigns[lightboxIdx].title}
                  </h3>
                </div>

                <div className="flex items-center space-x-3">
                  {/* File Download Anchor */}
                  <a
                    href={photoshopDesigns[lightboxIdx].path}
                    download={`Prashant-Photoshop-Artwork-${photoshopDesigns[lightboxIdx].id}.png`}
                    className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors duration-300 cursor-pointer flex items-center justify-center"
                    title="Download Design"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors duration-300 cursor-pointer flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Center Image Container */}
              <div className="relative flex-1 bg-[#090909] border-x border-white/10 flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={photoshopDesigns[lightboxIdx].path}
                    alt={photoshopDesigns[lightboxIdx].title}
                    fill
                    priority
                    unoptimized
                    className="object-contain"
                  />
                </div>

                {/* Left navigation arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 p-3 rounded-full bg-black/60 border border-white/10 hover:border-gold hover:text-gold text-gray-300 transition-all duration-300 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right navigation arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-3 rounded-full bg-black/60 border border-white/10 hover:border-gold hover:text-gold text-gray-300 transition-all duration-300 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lower Info Bar */}
              <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-b-lg px-4 py-3 flex justify-between items-center text-xs text-gray-400">
                <span>Created by: Prashant Sisodhiya</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-gold-light border border-gold/30 px-1.5 py-0.5 rounded bg-gold/5">
                  PHOTOSHOP DESIGN
                </span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
