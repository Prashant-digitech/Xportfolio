"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ChevronLeft, ChevronRight, ExternalLink, Sparkles, CheckCircle2, 
  Layers, Compass, Search, Palette, Award, BarChart3, Maximize2, Minimize2,
  Share2, ArrowUpRight
} from "lucide-react";
import { UXProject } from "@/data/uxProjects";

interface UXCaseStudyModalProps {
  project: UXProject | null;
  onClose: () => void;
  initialTab?: "gallery" | "overview" | "problem" | "research" | "architecture" | "system" | "impact";
}

export default function UXCaseStudyModal({ project, onClose, initialTab = "overview" }: UXCaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [isFullscreenImage, setIsFullscreenImage] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Reset indices when project changes
  useEffect(() => {
    if (project) {
      setActiveImageIdx(0);
      setActiveTab(initialTab);
      setIsFullscreenImage(false);
      // Lock background scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project, initialTab]);

  // Handle ESC key to close modal or exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreenImage) {
          setIsFullscreenImage(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreenImage, onClose]);

  if (!project) return null;

  const { caseStudy, gallery } = project;
  const currentImage = gallery[activeImageIdx] || gallery[0];

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview & Metrics", icon: <Compass className="w-4 h-4" /> },
    { id: "gallery", label: "Visual Gallery", icon: <Layers className="w-4 h-4" /> },
    { id: "problem", label: "Problem & Solution", icon: <Search className="w-4 h-4" /> },
    { id: "research", label: "User Research", icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: "architecture", label: "Information Architecture", icon: <Layers className="w-4 h-4" /> },
    { id: "system", label: "Design System", icon: <Palette className="w-4 h-4" /> },
    { id: "impact", label: "Impact & Results", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl transition-all ux-case-study-modal dark text-white">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 cursor-pointer"
        aria-label="Close modal backdrop"
      />

      {/* Main Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl h-full sm:h-[92vh] max-h-[92vh] flex flex-col rounded-none sm:rounded-2xl bg-[#06080F] border-0 sm:border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden z-10 text-white"
      >
        {/* Sticky Header */}
        <div className="flex-shrink-0 px-4 sm:px-8 py-4 sm:py-5 border-b border-white/10 bg-[#080C18]/90 backdrop-blur-md flex items-center justify-between z-20">
          <div className="flex items-center space-x-3 overflow-hidden">
            <span className="flex-shrink-0 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-black uppercase tracking-wider bg-gold/10 text-gold border border-gold/30">
              UX CASE STUDY
            </span>
            <div className="truncate">
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-white truncate flex items-center gap-2">
                {project.title}
                <span className="hidden md:inline-block text-xs font-normal text-gray-400">
                  — {project.subtitle}
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={handleCopyLink}
              title="Share Case Study"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors text-xs flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? "Copied!" : "Share"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-white/15 transition-all"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar - Horizontally Scrollable on Mobile */}
        <div className="flex-shrink-0 px-4 sm:px-8 py-2.5 bg-[#0A0E1C] border-b border-white/5 overflow-x-auto no-scrollbar flex items-center space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-gold text-black shadow-[0_0_15px_rgba(212,160,23,0.3)] font-black"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-10 focus:outline-none">
          
          {/* TAB 1: OVERVIEW & METRICS */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Hero Banner Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{project.statsBadge}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {project.subtitle}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {caseStudy.overview}
                  </p>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Role</span>
                      <p className="text-xs font-bold text-white">{caseStudy.role}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Timeline</span>
                      <p className="text-xs font-bold text-white">{caseStudy.duration}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Client Type</span>
                      <p className="text-xs font-bold text-white">{caseStudy.clientType}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Core Stack</span>
                      <p className="text-xs font-bold text-gold">{caseStudy.tools.slice(0, 3).join(", ")}</p>
                    </div>
                  </div>
                </div>

                {/* Cover Image Preview */}
                <div 
                  onClick={() => setActiveTab("gallery")}
                  className="lg:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-black group cursor-pointer shadow-2xl"
                >
                  <Image
                    src={currentImage.url}
                    alt={currentImage.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-bold truncate">{currentImage.title}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-white/20 backdrop-blur-md flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" /> View Gallery
                    </span>
                  </div>
                </div>
              </div>

              {/* High-Impact Metrics Grid */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                  <Award className="w-4 h-4" /> Key Performance & UX Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {caseStudy.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-gold/30 transition-all group"
                    >
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                        {metric.label}
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-white mt-1 group-hover:text-gold transition-colors">
                        {metric.value}
                      </div>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                        {metric.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables Banner */}
              <div className="p-6 rounded-xl bg-[#0B1020] border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Key Deliverables Shipped
                </h4>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-gray-200 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-neon-blue" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: VISUAL GALLERY & LIGHTBOX */}
          {activeTab === "gallery" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Main Active Viewer */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[550px] bg-black rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex items-center justify-center">
                <Image
                  src={currentImage.url}
                  alt={currentImage.title}
                  fill
                  className="object-contain p-2 sm:p-4"
                  priority
                />

                {/* Navigation Arrows */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Floating Caption Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white">
                      {currentImage.title}
                    </h3>
                    <p className="text-xs text-gray-300 mt-0.5">
                      {currentImage.caption}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    <span className="text-xs font-mono text-gray-400">
                      {activeImageIdx + 1} / {gallery.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all text-left group ${
                      activeImageIdx === idx
                        ? "border-gold ring-2 ring-gold/40 shadow-lg"
                        : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-1 left-2 right-2 text-[10px] font-bold text-white truncate drop-shadow">
                      {img.title}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: PROBLEM & SOLUTION */}
          {activeTab === "problem" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Problem Statement Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-4">
                <div className="flex items-center gap-2 text-red-400 text-xs font-black uppercase tracking-widest">
                  <Search className="w-4 h-4" /> The Core Problem Space
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {caseStudy.problem.statement}
                </h3>
                {caseStudy.problem.userQuote && (
                  <blockquote className="p-4 rounded-xl bg-black/40 border-l-4 border-red-400 text-sm italic text-gray-300">
                    &ldquo;{caseStudy.problem.userQuote}&rdquo;
                  </blockquote>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {caseStudy.problem.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-6">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> The UX Solution & Architecture
                </div>
                <p className="text-base sm:text-lg font-medium text-gray-200">
                  {caseStudy.solution.statement}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseStudy.solution.highlights.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                      <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: USER RESEARCH & PERSONAS */}
          {activeTab === "research" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">Discovery & Insights</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {caseStudy.research.summary}
                </p>
              </div>

              {/* User Personas Grid */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-gold">Target User Personas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseStudy.research.personas.map((persona, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#090D1C] border border-white/10 space-y-4 hover:border-gold/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center font-bold text-gold text-sm">
                          {persona.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-white">{persona.name}</h4>
                          <span className="text-xs text-gray-400 font-semibold">{persona.role}</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                          <span className="text-[10px] font-bold text-neon-blue uppercase tracking-wider">Primary Goal</span>
                          <p className="text-gray-200">{persona.goal}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                          <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Pain Point</span>
                          <p className="text-gray-300">{persona.painPoint}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Insights List */}
              <div className="p-6 rounded-2xl bg-[#080C18] border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Key Research Takeaways
                </h4>
                <div className="space-y-2.5">
                  {caseStudy.research.insights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                      <span className="px-2 py-0.5 rounded bg-gold/10 text-gold font-mono text-[11px] flex-shrink-0">
                        0{idx + 1}
                      </span>
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: INFORMATION ARCHITECTURE */}
          {activeTab === "architecture" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">Progressive Disclosure Architecture</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {caseStudy.informationArchitecture.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-gold">Navigation & Content Hierarchy</h4>
                <div className="space-y-3">
                  {caseStudy.informationArchitecture.hierarchy.map((tier, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#0A0F22] border border-white/10 flex items-center space-x-4"
                    >
                      <div className="w-8 h-8 rounded-lg bg-neon-blue/10 border border-neon-blue/30 text-neon-blue flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                        L{idx + 1}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-200">
                        {tier}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: DESIGN SYSTEM & TOKENS */}
          {activeTab === "system" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gold">Visual Language</span>
                <h3 className="text-xl font-black text-white">{caseStudy.designSystem.theme}</h3>
                <p className="text-xs text-gray-400 font-mono">Typography: {caseStudy.designSystem.typography}</p>
              </div>

              {/* Color Swatches */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Semantic Color Palette</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {caseStudy.designSystem.colors.map((c, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div
                        className="w-full h-12 rounded-lg border border-white/20 shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div>
                        <span className="text-xs font-bold text-white block truncate">{c.name}</span>
                        <span className="text-[11px] font-mono text-gold block">{c.hex}</span>
                        <span className="text-[10px] text-gray-400 block truncate">{c.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Principles */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Core UX Principles</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {caseStudy.designSystem.principles.map((pr, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#0A0E1C] border border-white/10 space-y-2">
                      <span className="text-xs font-black text-neon-blue">Principle 0{idx + 1}</span>
                      <p className="text-xs font-bold text-white leading-snug">{pr}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 7: IMPACT & RESULTS */}
          {activeTab === "impact" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-gold/10 via-neon-blue/5 to-transparent border border-gold/20 space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-gold flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Measurable Outcome & Commercial Impact
                </span>
                <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
                  {caseStudy.impact.summary}
                </p>
              </div>

              {/* Large Stats Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {caseStudy.impact.stats.map((st, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#080C18] border border-white/10 text-center space-y-2">
                    <div className="text-2xl sm:text-4xl font-black text-gradient-gold">
                      {st.number}
                    </div>
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="flex-shrink-0 px-4 sm:px-8 py-4 border-t border-white/10 bg-[#080C18] flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <span className="font-bold text-white">UX Portfolio Lead:</span>
            <span>Prashant Sisodhiya</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("gallery")}
              className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold tracking-wider transition-colors border border-white/10 text-center cursor-pointer"
            >
              View Screenshots ({gallery.length})
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2 rounded-lg bg-gold hover:bg-gold-light text-black text-xs font-black tracking-wider uppercase transition-colors shadow-[0_0_15px_rgba(212,160,23,0.3)] text-center cursor-pointer"
            >
              Close Case Study
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
