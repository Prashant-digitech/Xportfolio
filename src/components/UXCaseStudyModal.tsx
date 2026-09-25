"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, 
  Layers, Compass, Search, Palette, Award, BarChart3, Maximize2, Minimize2,
  Share2, Eye, EyeOff, Target, ShieldCheck, Activity, Zap, Info, Play, Pause,
  Volume2, VolumeX, RotateCcw, GitBranch, Lightbulb, Video, ArrowRight,
  ZoomIn, ZoomOut
} from "lucide-react";
import { UXProject } from "@/data/uxProjects";

interface UXCaseStudyModalProps {
  project: UXProject | null;
  onClose: () => void;
  initialTab?: "overview" | "deck" | "walkthrough" | "research" | "architecture" | "flows" | "system" | "gallery" | "decisions" | "impact";
}

export default function UXCaseStudyModal({ project, onClose, initialTab = "overview" }: UXCaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [isFullscreenImage, setIsFullscreenImage] = useState<boolean>(false);
  const [expandedEvidenceImg, setExpandedEvidenceImg] = useState<{ url: string; title: string; badge: string; idx?: number } | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  
  // UX Lens state
  const [uxLensActive, setUxLensActive] = useState<boolean>(false);
  const [uxLensFilter, setUxLensFilter] = useState<"all" | "targets" | "fitts" | "contrast" | "heuristics">("all");
  const [selectedInspection, setSelectedInspection] = useState<string | null>(null);

  // 30-Second Walkthrough Video Player state
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);
  const [activeTimestampIdx, setActiveTimestampIdx] = useState<number>(0);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Reset indices when project changes
  useEffect(() => {
    if (project) {
      setActiveImageIdx(0);
      setActiveSlideIdx(0);
      setActiveTab(initialTab);
      setIsFullscreenImage(false);
      setExpandedEvidenceImg(null);
      setLightboxZoom(1);
      setIsVideoPlaying(false);
      setVideoCurrentTime(0);
      setActiveTimestampIdx(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project, initialTab]);

  // Handle ESC key to close modal or exit fullscreen & Arrow keys for slides/gallery/lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (expandedEvidenceImg) {
          setExpandedEvidenceImg(null);
          setLightboxZoom(1);
        } else if (isFullscreenImage) {
          setIsFullscreenImage(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        if (expandedEvidenceImg && project?.caseStudy.evidenceArtifacts) {
          const total = project.caseStudy.evidenceArtifacts.length;
          const currentIdx = expandedEvidenceImg.idx ?? activeSlideIdx;
          const prevIdx = (currentIdx - 1 + total) % total;
          const prevSlide = project.caseStudy.evidenceArtifacts[prevIdx];
          setExpandedEvidenceImg({ url: prevSlide.image, title: prevSlide.title, badge: prevSlide.badge, idx: prevIdx });
          setActiveSlideIdx(prevIdx);
        } else if (activeTab === "deck" && project?.caseStudy.evidenceArtifacts) {
          const total = project.caseStudy.evidenceArtifacts.length;
          setActiveSlideIdx((prev) => (prev - 1 + total) % total);
        } else if (activeTab === "gallery" && project?.gallery) {
          setActiveImageIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
        }
      } else if (e.key === "ArrowRight") {
        if (expandedEvidenceImg && project?.caseStudy.evidenceArtifacts) {
          const total = project.caseStudy.evidenceArtifacts.length;
          const currentIdx = expandedEvidenceImg.idx ?? activeSlideIdx;
          const nextIdx = (currentIdx + 1) % total;
          const nextSlide = project.caseStudy.evidenceArtifacts[nextIdx];
          setExpandedEvidenceImg({ url: nextSlide.image, title: nextSlide.title, badge: nextSlide.badge, idx: nextIdx });
          setActiveSlideIdx(nextIdx);
        } else if (activeTab === "deck" && project?.caseStudy.evidenceArtifacts) {
          const total = project.caseStudy.evidenceArtifacts.length;
          setActiveSlideIdx((prev) => (prev + 1) % total);
        } else if (activeTab === "gallery" && project?.gallery) {
          setActiveImageIdx((prev) => (prev + 1) % project.gallery.length);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedEvidenceImg, isFullscreenImage, onClose, activeTab, project, activeSlideIdx]);

  // Video playback controls
  const handleTogglePlay = useCallback(() => {
    if (!videoPlayerRef.current) return;
    if (isVideoPlaying) {
      videoPlayerRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoPlayerRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  }, [isVideoPlaying]);

  const handleToggleMute = useCallback(() => {
    if (!videoPlayerRef.current) return;
    videoPlayerRef.current.muted = !isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  }, [isVideoMuted]);

  const handleRestartVideo = useCallback(() => {
    if (!videoPlayerRef.current) return;
    videoPlayerRef.current.currentTime = 0;
    videoPlayerRef.current.play().catch(() => {});
    setIsVideoPlaying(true);
    setVideoCurrentTime(0);
    setActiveTimestampIdx(0);
  }, []);

  const handleSeekTimestamp = useCallback((startSeconds: number, idx: number) => {
    if (!videoPlayerRef.current) return;
    videoPlayerRef.current.currentTime = startSeconds;
    setVideoCurrentTime(startSeconds);
    setActiveTimestampIdx(idx);
    videoPlayerRef.current.play().catch(() => {});
    setIsVideoPlaying(true);
  }, []);

  const handleVideoTimeUpdate = () => {
    if (videoPlayerRef.current) {
      const cur = videoPlayerRef.current.currentTime;
      setVideoCurrentTime(cur);
      if (cur < 5) setActiveTimestampIdx(0);
      else if (cur < 8) setActiveTimestampIdx(1);
      else if (cur < 14) setActiveTimestampIdx(2);
      else if (cur < 20) setActiveTimestampIdx(3);
      else if (cur < 26) setActiveTimestampIdx(4);
      else setActiveTimestampIdx(5);
    }
  };

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

  const hasDeck = Boolean(caseStudy.evidenceArtifacts && caseStudy.evidenceArtifacts.length > 0);
  const hasWalkthrough = Boolean(caseStudy.walkthroughVideo);
  const hasFlows = Boolean(caseStudy.userFlows && caseStudy.userFlows.length > 0);
  const hasDecisions = Boolean(caseStudy.designDecisions && caseStudy.designDecisions.length > 0);

  const tabs = [
    { id: "overview", label: "Overview & Scope", icon: <Compass className="w-4 h-4" /> },
    ...(hasDeck ? [{ id: "deck", label: "10-Slide Deck", icon: <Layers className="w-4 h-4" />, badge: `${caseStudy.evidenceArtifacts!.length}` }] : []),
    ...(hasWalkthrough ? [{ id: "walkthrough", label: "30s Walkthrough", icon: <Video className="w-4 h-4" />, badge: "TOUR" }] : []),
    { id: "research", label: "Research & Discovery", icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: "architecture", label: "UX Strategy & IA", icon: <Layers className="w-4 h-4" /> },
    ...(hasFlows ? [{ id: "flows", label: "User Flows", icon: <GitBranch className="w-4 h-4" /> }] : []),
    { id: "system", label: "Design System", icon: <Palette className="w-4 h-4" /> },
    { id: "gallery", label: "Final Screens", icon: <Layers className="w-4 h-4" />, badge: `${gallery.length}` },
    ...(hasDecisions ? [{ id: "decisions", label: "Design Decisions", icon: <Lightbulb className="w-4 h-4" /> }] : []),
    { id: "impact", label: "Impact & Reflection", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl transition-all ux-case-study-modal dark text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`UX Case Study: ${project.title}`}
    >
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
        ref={modalContainerRef}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl h-full sm:h-[94vh] max-h-[94vh] flex flex-col rounded-none sm:rounded-2xl bg-[#06080F] border-0 sm:border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden z-10 text-white"
      >
        {/* Sticky Header */}
        <div className="flex-shrink-0 px-4 sm:px-8 py-4 border-b border-white/10 bg-[#080C18]/90 backdrop-blur-md flex items-center justify-between z-20">
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
            {hasWalkthrough && (
              <button
                onClick={() => setActiveTab("walkthrough")}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/15 hover:bg-gold hover:text-black text-gold text-xs font-black uppercase tracking-wider transition-all border border-gold/40 shadow-[0_0_12px_rgba(212,160,23,0.2)] cursor-pointer"
                aria-label="View 30-second walkthrough"
              >
                <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                <span>30s Tour</span>
              </button>
            )}

            <button
              onClick={() => {
                const nextState = !uxLensActive;
                setUxLensActive(nextState);
                if (nextState && activeTab !== "gallery") {
                  setActiveTab("gallery");
                }
              }}
              title="Toggle UX Lens (Touch Targets, Fitts' Law & WCAG AA Contrast)"
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                uxLensActive
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/40"
                  : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border-white/10"
              }`}
              aria-pressed={uxLensActive}
            >
              <Eye className={`w-3.5 h-3.5 ${uxLensActive ? "text-emerald-400" : "text-gray-400"}`} />
              <span className="text-xs font-extrabold">UX Lens</span>
            </button>

            <button
              onClick={handleCopyLink}
              title="Share Case Study"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
              aria-label="Share case study link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? "Copied!" : "Share"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-white/15 transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigator Bar - Scannable & Mobile Responsive */}
        <nav 
          aria-label="Case Study Section Navigation"
          className="flex-shrink-0 px-4 sm:px-8 py-2.5 bg-[#0A0E1C] border-b border-white/5 overflow-x-auto no-scrollbar flex items-center space-x-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                activeTab === tab.id
                  ? "bg-gold text-black shadow-[0_0_15px_rgba(212,160,23,0.3)] font-black"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === tab.id ? "bg-black/20 text-black font-black" : "bg-white/10 text-gray-300"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-10 focus:outline-none">
          
          {/* TAB 1: OVERVIEW & SCOPE */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Hero Banner Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold">
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
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Client / Scope</span>
                      <p className="text-xs font-bold text-white">{caseStudy.clientType}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Core Stack</span>
                      <p className="text-xs font-bold text-gold">{caseStudy.tools.slice(0, 3).join(", ")}</p>
                    </div>
                  </div>

                  {/* Fast Action CTA strip */}
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {hasWalkthrough && (
                      <button
                        onClick={() => setActiveTab("walkthrough")}
                        className="px-4 py-2 rounded-lg bg-gold text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-gold-light transition-all shadow-[0_4px_12px_rgba(212,160,23,0.3)] cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Launch 30s Product Walkthrough</span>
                      </button>
                    )}
                    <button
                      onClick={() => setActiveTab("research")}
                      className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-neon-blue" />
                      <span>Inspect Discovery Evidence</span>
                    </button>
                  </div>
                </div>

                {/* Cover Image Preview */}
                <div 
                  onClick={() => setActiveTab("gallery")}
                  className="lg:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-black group cursor-pointer shadow-2xl"
                  title="Click to explore interactive visual gallery"
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

              {/* 19. Recruiter Project Summary */}
              {project.recruiterSummary && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-gold/10 via-[#0A1024] to-[#080C18] border border-gold/40 shadow-xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold" /> Recruiter Project Summary
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 font-bold uppercase tracking-wider w-fit">
                      VERIFIED PROJECT ARTIFACT
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Project</span>
                      <span className="text-xs font-black text-white">{project.recruiterSummary.project}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Type</span>
                      <span className="text-xs font-black text-gold">{project.recruiterSummary.type}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Contribution</span>
                      <span className="text-xs font-semibold text-white">{project.recruiterSummary.contribution}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Process</span>
                      <span className="text-xs font-mono text-gray-300">{project.recruiterSummary.process}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Evidence</span>
                      <span className="text-xs font-semibold text-emerald-400">{project.recruiterSummary.evidence}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 20. 30-Second Recruiter Summary: Why This Project Matters */}
              {project.whyItMatters && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                    <Target className="w-4 h-4" /> Why This Project Matters (30-Second Recruiter Summary)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-[#090D1C] border border-white/10 space-y-1.5 hover:border-gold/30 transition-all">
                      <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider block">01 // Product Thinking</span>
                      <p className="text-xs text-gray-200 leading-relaxed">{project.whyItMatters.productThinking}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#090D1C] border border-white/10 space-y-1.5 hover:border-gold/30 transition-all">
                      <span className="text-[10px] font-mono font-bold text-neon-blue uppercase tracking-wider block">02 // UX Thinking</span>
                      <p className="text-xs text-gray-200 leading-relaxed">{project.whyItMatters.uxThinking}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#090D1C] border border-white/10 space-y-1.5 hover:border-gold/30 transition-all">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">03 // Design Craft</span>
                      <p className="text-xs text-gray-200 leading-relaxed">{project.whyItMatters.designCraft}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Verified Project Scope & Metrics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                    <Award className="w-4 h-4" /> Documented Design &amp; Research Scope
                  </h3>
                  <span className="text-[10px] font-mono text-gray-400">Verified Evidence</span>
                </div>
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

              {/* Shipped Deliverables */}
              <div className="p-6 rounded-xl bg-[#0B1020] border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Key Artifacts &amp; Deliverables Shipped
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

              {/* Evidence Boards Strip (if available) */}
              {caseStudy.evidenceArtifacts && caseStudy.evidenceArtifacts.length > 0 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-gold flex items-center gap-2">
                      <Layers className="w-4 h-4" /> Primary Case Study Presentation Boards
                    </h4>
                    {caseStudy.evidenceArtifacts.length > 3 && (
                      <button
                        onClick={() => setActiveTab("deck")}
                        className="text-xs text-gold hover:underline flex items-center gap-1 font-bold cursor-pointer"
                      >
                        <span>View All {caseStudy.evidenceArtifacts.length} Slide Boards in Deck Viewer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {caseStudy.evidenceArtifacts.slice(0, 3).map((art, i) => (
                      <div
                        key={i}
                        onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge })}
                        className="group p-4 rounded-xl bg-[#080C18] border border-white/10 hover:border-gold/40 transition-all cursor-pointer space-y-3"
                      >
                        <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-black border border-white/10">
                          <Image src={art.image} alt={art.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-black/30 group-hover:opacity-0 transition-opacity" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-gold/40 text-[9px] font-mono text-gold font-bold uppercase">
                            {art.badge}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-xs font-black text-white group-hover:text-gold transition-colors">{art.title}</h5>
                          <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">{art.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB: 10-SLIDE PRESENTATION DECK */}
          {activeTab === "deck" && caseStudy.evidenceArtifacts && caseStudy.evidenceArtifacts.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {(() => {
                const totalSlides = caseStudy.evidenceArtifacts.length;
                const currentSlide = caseStudy.evidenceArtifacts[activeSlideIdx] || caseStudy.evidenceArtifacts[0];
                return (
                  <>
                    {/* Deck Top Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-gold/15 via-[#0A1024] to-transparent border border-gold/40">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded bg-gold text-black font-mono text-[10px] font-black uppercase tracking-wider">
                            Slide {activeSlideIdx + 1} of {totalSlides}
                          </span>
                          <span className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider">
                            {currentSlide.badge}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-xl font-black text-white">{currentSlide.title}</h3>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setActiveSlideIdx((prev) => (prev - 1 + totalSlides) % totalSlides)}
                          className="p-2 rounded-xl bg-white/10 hover:bg-gold hover:text-black text-white transition-all cursor-pointer"
                          aria-label="Previous slide"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-mono text-gray-300 px-1">
                          {activeSlideIdx + 1} / {totalSlides}
                        </span>
                        <button
                          onClick={() => setActiveSlideIdx((prev) => (prev + 1) % totalSlides)}
                          className="p-2 rounded-xl bg-white/10 hover:bg-gold hover:text-black text-white transition-all cursor-pointer"
                          aria-label="Next slide"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setExpandedEvidenceImg({ url: currentSlide.image, title: currentSlide.title, badge: currentSlide.badge })}
                          className="px-3 py-2 rounded-xl bg-gold/20 hover:bg-gold hover:text-black text-gold text-xs font-bold flex items-center gap-1.5 transition-all border border-gold/40 cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Inspect Full-Res</span>
                        </button>
                      </div>
                    </div>

                    {/* Main Presentation Board Display */}
                    <div 
                      onClick={() => setExpandedEvidenceImg({ url: currentSlide.image, title: currentSlide.title, badge: currentSlide.badge })}
                      className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[580px] w-full rounded-2xl overflow-hidden border border-white/20 bg-black cursor-pointer group shadow-2xl"
                    >
                      <Image
                        src={currentSlide.image}
                        alt={currentSlide.title}
                        fill
                        className="object-contain p-2 group-hover:scale-101 transition-transform duration-500"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity" />
                      <div className="absolute bottom-3 right-3 text-xs px-3 py-1.5 rounded-lg bg-black/80 text-white font-bold flex items-center gap-1.5 border border-white/20 backdrop-blur-md">
                        <Maximize2 className="w-3.5 h-3.5 text-gold" /> Click to Zoom Full Resolution
                      </div>
                    </div>

                    {/* Slide Rationale Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 rounded-xl bg-[#090D1C] border border-white/10 space-y-2">
                        <span className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider block">
                          Scope &amp; Documentation
                        </span>
                        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">{currentSlide.explanation}</p>
                      </div>

                      <div className="p-5 rounded-xl bg-[#090D1C] border border-white/10 space-y-2">
                        {currentSlide.keyInsight && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-neon-blue font-bold uppercase tracking-wider block">
                              Key UX Insight
                            </span>
                            <p className="text-xs text-gray-300 leading-relaxed">{currentSlide.keyInsight}</p>
                          </div>
                        )}
                        {currentSlide.designDecision && (
                          <div className="space-y-1 pt-2 border-t border-white/5">
                            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                              Strategic Design Decision
                            </span>
                            <p className="text-xs text-gray-300 leading-relaxed">{currentSlide.designDecision}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* All Slides Interactive Thumbnails */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase text-gray-400">
                          Complete Presentation Deck Navigator ({totalSlides} Boards)
                        </span>
                        <span className="text-[10px] text-gold font-mono">Click any thumbnail or use arrow keys</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                        {caseStudy.evidenceArtifacts.map((art, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveSlideIdx(idx)}
                            className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all text-left group cursor-pointer ${
                              activeSlideIdx === idx
                                ? "border-gold ring-2 ring-gold/40 shadow-lg scale-102"
                                : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/30"
                            }`}
                          >
                            <Image
                              src={art.image}
                              alt={art.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                            <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-mono text-gold font-bold">
                              0{idx + 1}
                            </div>
                            <div className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-bold text-white truncate drop-shadow">
                              {art.title.split(":")[0]}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}

          {/* TAB 2: 30-SECOND PRODUCT WALKTHROUGH */}
          {activeTab === "walkthrough" && caseStudy.walkthroughVideo && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Walkthrough Header (Prompt Sections 16, 17) */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-gold/10 via-[#0A1024] to-transparent border border-gold/30 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold block">
                  PRODUCT WALKTHROUGH
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                  30 SECOND INTERACTIVE PRODUCT TOUR
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
                  {caseStudy.walkthroughVideo.description}
                </p>
              </div>

              {/* Video Player Container */}
              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border border-gold/40 shadow-2xl group/vid">
                  <video
                    ref={videoPlayerRef}
                    src={caseStudy.walkthroughVideo.videoUrl}
                    poster={caseStudy.walkthroughVideo.posterUrl}
                    playsInline
                    loop
                    muted={isVideoMuted}
                    onTimeUpdate={handleVideoTimeUpdate}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    className="w-full h-full object-cover"
                    aria-label={`${project.title} 30-Second Product Walkthrough`}
                  />
                  {/* WebP Fallback display when paused or decoding */}
                  <Image
                    src={caseStudy.walkthroughVideo.videoUrl}
                    alt={caseStudy.walkthroughVideo.title}
                    fill
                    unoptimized
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
                      isVideoPlaying ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />

                  {/* Center Play Overlay Trigger when paused */}
                  {!isVideoPlaying && (
                    <div 
                      onClick={handleTogglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] cursor-pointer group-hover/vid:bg-black/40 transition-colors"
                      aria-label="Click to start video"
                    >
                      <div className="p-5 rounded-full bg-gold text-black shadow-[0_0_25px_rgba(212,160,23,0.5)] transform group-hover/vid:scale-110 transition-transform">
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Custom Controls Bar */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between gap-4 z-10">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleTogglePlay}
                        className="p-2 rounded-lg bg-white/10 hover:bg-gold hover:text-black text-white transition-colors cursor-pointer"
                        aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                      >
                        {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <button
                        onClick={handleRestartVideo}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        aria-label="Restart video from beginning"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleToggleMute}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        aria-label={isVideoMuted ? "Unmute audio" : "Mute audio"}
                      >
                        {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <span className="text-xs font-mono text-gray-300">
                        00:{videoCurrentTime < 10 ? '0' : ''}{Math.floor(videoCurrentTime)} / 00:30
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold/15 text-gold font-bold">
                        30s MASTER TOUR
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scrubber Progress Bar */}
                <div 
                  className="w-full h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = (e.clientX - rect.left) / rect.width;
                    handleSeekTimestamp(ratio * 30, Math.floor(ratio * 6));
                  }}
                >
                  <div 
                    className="h-full bg-gold transition-all duration-150"
                    style={{ width: `${(videoCurrentTime / 30) * 100}%` }}
                  />
                </div>
              </div>

              {/* 6-Phase Interactive Choreography Timeline (Prompt Section 15) */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-gold flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Interactive Walkthrough Choreography &amp; Key Scenes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {caseStudy.walkthroughVideo.timestamps.map((ts, idx) => {
                    const startTime = idx === 0 ? 0 : idx === 1 ? 5 : idx === 2 ? 8 : idx === 3 ? 14 : idx === 4 ? 20 : 26;
                    const isActive = activeTimestampIdx === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSeekTimestamp(startTime, idx)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isActive
                            ? "bg-gold/10 border-gold shadow-[0_0_15px_rgba(212,160,23,0.2)]"
                            : "bg-[#080C18] border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[11px] font-mono font-bold ${isActive ? "text-gold" : "text-gray-400"}`}>
                            {ts.time}
                          </span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                            isActive ? "bg-gold text-black" : "bg-white/10 text-gray-400"
                          }`}>
                            Phase 0{idx + 1}
                          </span>
                        </div>
                        <h5 className="text-xs font-black text-white">{ts.label}</h5>
                        <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">{ts.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: USER RESEARCH & DISCOVERY */}
          {activeTab === "research" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Evidence Board Highlight if available */}
              {caseStudy.evidenceArtifacts?.find(a => a.badge.includes("RESEARCH")) && (
                (() => {
                  const art = caseStudy.evidenceArtifacts.find(a => a.badge.includes("RESEARCH"))!;
                  return (
                    <div className="p-6 rounded-2xl bg-[#080C18] border border-gold/40 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded bg-gold/15 border border-gold/30 text-[10px] font-mono text-gold font-bold uppercase tracking-wider w-fit">
                          EVIDENCE ARTIFACT // {art.badge}
                        </span>
                        <button
                          onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge })}
                          className="text-xs text-gold hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Expand Full Resolution Board</span>
                        </button>
                      </div>
                      <h4 className="text-lg font-black text-white">{art.title}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">{art.explanation}</p>
                      <div 
                        onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge })}
                        className="relative aspect-[16/9] max-h-[460px] w-full rounded-xl overflow-hidden border border-white/10 bg-black cursor-pointer group shadow-2xl"
                      >
                        <Image src={art.image} alt={art.title} fill className="object-contain p-2 group-hover:scale-102 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity" />
                        <span className="absolute bottom-3 right-3 text-[11px] px-3 py-1 rounded bg-black/80 text-white font-bold flex items-center gap-1.5 border border-white/20">
                          <Maximize2 className="w-3 h-3" /> Click to Zoom
                        </span>
                      </div>
                      {art.keyInsight && (
                        <div className="p-3.5 rounded-xl bg-neon-blue/5 border border-neon-blue/20 text-xs text-gray-300">
                          <strong className="text-neon-blue font-bold uppercase tracking-wider block mb-1">Key Research Insight:</strong>
                          {art.keyInsight}
                        </div>
                      )}
                    </div>
                  );
                })()
              )}

              {/* Research Scope Metrics */}
              {caseStudy.research.scopeMetrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {caseStudy.research.scopeMetrics.map((sm, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#090D1C] border border-white/10 text-center">
                      <div className="text-2xl sm:text-3xl font-black text-gold">{sm.value}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{sm.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Summary Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Discovery &amp; User Need Synthesis</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{caseStudy.research.summary}</p>
              </div>

              {/* User Personas Grid */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-gold">Validated Target User Personas</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {caseStudy.research.personas.map((persona, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#090D1C] border border-white/10 space-y-3 hover:border-gold/30 transition-colors flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-gold font-bold px-2 py-0.5 rounded bg-gold/10">
                            Persona 0{idx + 1}
                          </span>
                          {persona.age && <span className="text-[10px] text-gray-400 font-mono">Age: {persona.age}</span>}
                        </div>
                        <h5 className="text-base font-black text-white">{persona.name}</h5>
                        <p className="text-xs text-gray-400 font-semibold">{persona.role}</p>
                        {persona.quote && (
                          <blockquote className="text-xs italic text-gray-300 bg-white/5 p-2.5 rounded-lg border-l-2 border-gold">
                            &ldquo;{persona.quote}&rdquo;
                          </blockquote>
                        )}
                      </div>

                      <div className="space-y-2 text-xs pt-2 border-t border-white/5">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-neon-blue uppercase">Goal</span>
                          <p className="text-gray-200 text-[11px] leading-tight">{persona.goal}</p>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-red-400 uppercase">Friction / Pain Point</span>
                          <p className="text-gray-300 text-[11px] leading-tight">{persona.painPoint}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Goals & Pain Points Grid */}
              {caseStudy.research.userGoals && caseStudy.research.painPoints && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Goals */}
                  <div className="p-6 rounded-2xl bg-[#080C18] border border-white/10 space-y-4">
                    <h5 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <Target className="w-4 h-4" /> Core User Goals
                    </h5>
                    <div className="space-y-3">
                      {caseStudy.research.userGoals.map((g, i) => (
                        <div key={i} className="text-xs space-y-0.5">
                          <span className="font-bold text-white block">{g.goal}</span>
                          <p className="text-gray-400 text-[11px]">{g.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pain Points */}
                  <div className="p-6 rounded-2xl bg-[#080C18] border border-white/10 space-y-4">
                    <h5 className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center gap-2">
                      <Search className="w-4 h-4" /> Documented Pain Points
                    </h5>
                    <div className="space-y-3">
                      {caseStudy.research.painPoints.map((p, i) => (
                        <div key={i} className="text-xs space-y-0.5">
                          <span className="font-bold text-white block">{p.point}</span>
                          <p className="text-gray-400 text-[11px]">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Competitive Insights Matrix */}
              {caseStudy.research.competitiveAnalysis && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gold">Competitive Benchmark Matrix</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {caseStudy.research.competitiveAnalysis.map((comp, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[#090D1C] border border-white/10 space-y-2">
                        <span className="text-[10px] font-mono text-gold font-bold block">{comp.category}</span>
                        <p className="text-xs text-gray-300">{comp.description}</p>
                        {comp.pros && <p className="text-[10px] text-emerald-400"><strong>Pros:</strong> {comp.pros}</p>}
                        {comp.cons && <p className="text-[10px] text-red-400"><strong>Cons:</strong> {comp.cons}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: INFORMATION ARCHITECTURE & UX STRATEGY */}
          {activeTab === "architecture" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Evidence Board Highlight if available */}
              {caseStudy.evidenceArtifacts?.find(a => a.badge.includes("ARCHITECTURE")) && (
                (() => {
                  const art = caseStudy.evidenceArtifacts.find(a => a.badge.includes("ARCHITECTURE"))!;
                  return (
                    <div className="p-6 rounded-2xl bg-[#080C18] border border-gold/40 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded bg-gold/15 border border-gold/30 text-[10px] font-mono text-gold font-bold uppercase tracking-wider w-fit">
                          EVIDENCE ARTIFACT // {art.badge}
                        </span>
                        <button
                          onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge })}
                          className="text-xs text-gold hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Expand Full Resolution Board</span>
                        </button>
                      </div>
                      <h4 className="text-lg font-black text-white">{art.title}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">{art.explanation}</p>
                      <div 
                        onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge })}
                        className="relative aspect-[16/9] max-h-[460px] w-full rounded-xl overflow-hidden border border-white/10 bg-black cursor-pointer group shadow-2xl"
                      >
                        <Image src={art.image} alt={art.title} fill className="object-contain p-2 group-hover:scale-102 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity" />
                        <span className="absolute bottom-3 right-3 text-[11px] px-3 py-1 rounded bg-black/80 text-white font-bold flex items-center gap-1.5 border border-white/20">
                          <Maximize2 className="w-3 h-3" /> Click to Zoom
                        </span>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* Core Information Architecture Modules */}
              {caseStudy.informationArchitecture.coreModules && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gold">11 Connected Operating Modules</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {caseStudy.informationArchitecture.coreModules.map((mod, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#090D1C] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-black text-white">{mod.name}</h5>
                          <span className="text-[9px] font-mono text-gold">0{idx + 1}</span>
                        </div>
                        <p className="text-[11px] text-gray-300 leading-relaxed">{mod.desc}</p>
                        {mod.tools && (
                          <div className="flex flex-wrap gap-1 pt-1 border-t border-white/5">
                            {mod.tools.slice(0, 4).map((t, i) => (
                              <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Holistic User Journey Map */}
              {caseStudy.informationArchitecture.journeyStages && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gold">5-Stage Holistic User Journey Map</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {caseStudy.informationArchitecture.journeyStages.map((st, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[#080C18] border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono text-neon-blue font-bold">Step 0{i + 1}</span>
                        <h6 className="text-xs font-black text-white">{st.stage}</h6>
                        <p className="text-[11px] text-gray-400">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 5: USER JOURNEYS & CORE FLOWS */}
          {activeTab === "flows" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Evidence Board Highlight */}
              {caseStudy.evidenceArtifacts?.find(a => a.badge.includes("FLOWS")) && (
                (() => {
                  const art = caseStudy.evidenceArtifacts.find(a => a.badge.includes("FLOWS"))!;
                  return (
                    <div className="p-6 rounded-2xl bg-[#080C18] border border-gold/40 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded bg-gold/15 border border-gold/30 text-[10px] font-mono text-gold font-bold uppercase tracking-wider w-fit">
                          EVIDENCE ARTIFACT // {art.badge}
                        </span>
                        <button
                          onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge })}
                          className="text-xs text-gold hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Expand Full Resolution Board</span>
                        </button>
                      </div>
                      <h4 className="text-lg font-black text-white">{art.title}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">{art.explanation}</p>
                      <div 
                        onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge })}
                        className="relative aspect-[16/9] max-h-[460px] w-full rounded-xl overflow-hidden border border-white/10 bg-black cursor-pointer group shadow-2xl"
                      >
                        <Image src={art.image} alt={art.title} fill className="object-contain p-2 group-hover:scale-102 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity" />
                        <span className="absolute bottom-3 right-3 text-[11px] px-3 py-1 rounded bg-black/80 text-white font-bold flex items-center gap-1.5 border border-white/20">
                          <Maximize2 className="w-3 h-3" /> Click to Zoom
                        </span>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* Documented Flow Sequences */}
              {caseStudy.userFlows && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gold">Primary &amp; Secondary User Flows</h4>
                  <div className="space-y-4">
                    {caseStudy.userFlows.map((flow, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-[#090D1C] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-black text-white flex items-center gap-2">
                            <GitBranch className="w-4 h-4 text-gold" />
                            {flow.title}
                          </h5>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase">
                            {flow.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          {flow.steps.map((st, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-200">
                                {st}
                              </span>
                              {i < flow.steps.length - 1 && (
                                <ArrowRight className="w-3 h-3 text-gold/60 shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 6: DESIGN SYSTEM */}
          {activeTab === "system" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gold">Visual Language</span>
                <h3 className="text-xl font-black text-white">{caseStudy.designSystem.theme}</h3>
                <p className="text-xs text-gray-400 font-mono">Typography: {caseStudy.designSystem.typography}</p>
              </div>

              {/* Color Swatches */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Semantic Color Tokens</h4>
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

              {/* Verified Design System Artifact Board (Slide 08) */}
              {caseStudy.evidenceArtifacts?.find(a => a.badge.includes("SYSTEM") || a.badge.includes("08/10")) && (
                (() => {
                  const art = caseStudy.evidenceArtifacts.find(a => a.badge.includes("SYSTEM") || a.badge.includes("08/10"))!;
                  const slideIdx = caseStudy.evidenceArtifacts.indexOf(art);
                  return (
                    <div className="p-6 rounded-2xl bg-[#080C18] border border-gold/40 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-[10px] font-mono text-gold font-bold uppercase tracking-wider w-fit">
                          VERIFIED PROJECT ARTIFACT // {art.badge}
                        </span>
                        <button
                          onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge, idx: slideIdx })}
                          className="text-xs text-gold hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Expand Full Resolution Board</span>
                        </button>
                      </div>
                      <h4 className="text-lg font-black text-white">{art.title}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">{art.explanation}</p>
                      <div 
                        onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge, idx: slideIdx })}
                        className="relative aspect-[16/9] max-h-[460px] w-full rounded-xl overflow-hidden border border-white/10 bg-black cursor-pointer group shadow-2xl"
                      >
                        <Image src={art.image} alt={art.title} fill className="object-contain p-2 group-hover:scale-102 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity" />
                        <span className="absolute bottom-3 right-3 text-[11px] px-3 py-1 rounded bg-black/80 text-white font-bold flex items-center gap-1.5 border border-white/20">
                          <Maximize2 className="w-3 h-3 text-gold" /> Click to Zoom Full Resolution
                        </span>
                      </div>
                    </div>
                  );
                })()
              )}

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

          {/* TAB 7: FINAL SCREENS & UX LENS INSPECTOR */}
          {activeTab === "gallery" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* UX LENS FILTER BAR — only visible when active */}
              {uxLensActive && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl bg-[#0A1A12] border border-emerald-500/40"
                >
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest flex-shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                    <span>UX Lens Active</span>
                    <span className="animate-ping w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "all" as const, icon: <Layers className="w-3 h-3" />, label: "All Layers" },
                      { id: "targets" as const, icon: <Target className="w-3 h-3" />, label: "Touch Targets" },
                      { id: "fitts" as const, icon: <Activity className="w-3 h-3" />, label: "Fitts' Law" },
                      { id: "contrast" as const, icon: <ShieldCheck className="w-3 h-3" />, label: "WCAG AA" },
                      { id: "heuristics" as const, icon: <Info className="w-3 h-3" />, label: "Heuristics" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setUxLensFilter(f.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                          uxLensFilter === f.id
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/60"
                            : "bg-white/5 text-gray-400 hover:text-white border-white/10"
                        }`}
                      >
                        {f.icon}
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setUxLensActive(false)}
                    className="ml-auto p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 transition-all cursor-pointer"
                    aria-label="Dismiss UX Lens"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}

              {/* Main Active Viewer */}
              <div 
                className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[560px] bg-black rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex items-center justify-center"
                style={{ borderColor: uxLensActive ? "rgba(16,185,129,0.4)" : undefined }}
              >
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
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all z-20 cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all z-20 cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Floating Caption Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10">
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white">
                      {currentImage.title}
                    </h3>
                    <p className="text-xs text-gray-300 mt-0.5">
                      {currentImage.caption}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    {uxLensActive && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        UX Lens ON
                      </span>
                    )}
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
                    className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all text-left group cursor-pointer ${
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

          {/* TAB 8: DESIGN DECISIONS (Prompt Section 24) */}
          {activeTab === "decisions" && caseStudy.designDecisions && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#080C18] border border-gold/30 space-y-2">
                <span className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider block">
                  PRODUCT DESIGN REASONING
                </span>
                <h3 className="text-xl font-black text-white uppercase tracking-wider">
                  Critical Architectural Design Decisions
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
                  Examining the trade-offs, evidence signals, and progressive disclosures that transformed complex system mechanics into intuitive human experiences.
                </p>
              </div>

              {/* Slide 07 & Slide 09 Evidence Boards Strip */}
              {caseStudy.evidenceArtifacts && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {caseStudy.evidenceArtifacts.filter(a => a.badge.includes("07/10") || a.badge.includes("09/10")).map((art, idx) => {
                    const slideIdx = caseStudy.evidenceArtifacts!.indexOf(art);
                    return (
                      <div key={idx} className="p-5 rounded-2xl bg-[#080C18] border border-white/15 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 font-bold uppercase">
                            VERIFIED PROJECT ARTIFACT // {art.badge}
                          </span>
                          <button
                            onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge, idx: slideIdx })}
                            className="text-xs text-gold hover:underline flex items-center gap-1 font-bold cursor-pointer"
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>Inspect</span>
                          </button>
                        </div>
                        <h5 className="text-xs font-black text-white">{art.title}</h5>
                        <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-2">{art.explanation}</p>
                        <div 
                          onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge, idx: slideIdx })}
                          className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-black cursor-pointer group shadow-lg"
                        >
                          <Image src={art.image} alt={art.title} fill className="object-contain p-2 group-hover:scale-102 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity" />
                          <span className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded bg-black/80 text-white font-bold flex items-center gap-1 border border-white/20">
                            <Maximize2 className="w-3 h-3 text-gold" /> Zoom
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="space-y-6">
                {caseStudy.designDecisions.map((dec, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#090D1C] border border-white/10 space-y-4">
                    <span className="text-[10px] font-mono text-gold font-bold px-2 py-0.5 rounded bg-gold/10 uppercase">
                      Decision Block 0{idx + 1}
                    </span>

                    {/* Problem */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider block">
                        Problem (What was difficult?)
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">{dec.problem}</p>
                    </div>

                    {/* Insight */}
                    <div className="space-y-1 pl-3 border-l-2 border-neon-blue">
                      <span className="text-[10px] font-mono font-bold text-neon-blue uppercase tracking-wider block">
                        Insight (What did evidence suggest?)
                      </span>
                      <p className="text-xs text-gray-300 leading-relaxed">{dec.insight}</p>
                    </div>

                    {/* Decision & Design */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider block">
                          Decision (What did I change?)
                        </span>
                        <p className="text-xs text-gray-300 leading-relaxed">{dec.decision}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                          Design Outcome (How was it implemented?)
                        </span>
                        <p className="text-xs text-gray-300 leading-relaxed">{dec.design}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 text-xs text-gray-200">
                      <strong className="text-white font-bold">Result: </strong>
                      {dec.outcome}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 9: IMPACT & REFLECTION */}
          {activeTab === "impact" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-gold/10 via-neon-blue/5 to-transparent border border-gold/20 space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-gold flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Measurable Outcome &amp; Reflection
                </span>
                <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
                  {caseStudy.impact.summary}
                </p>
              </div>

              {/* Slide 10 Impact Board Highlight */}
              {caseStudy.evidenceArtifacts?.find(a => a.badge.includes("IMPACT") || a.badge.includes("10/10")) && (
                (() => {
                  const art = caseStudy.evidenceArtifacts.find(a => a.badge.includes("IMPACT") || a.badge.includes("10/10"))!;
                  const slideIdx = caseStudy.evidenceArtifacts.indexOf(art);
                  return (
                    <div className="p-6 rounded-2xl bg-[#080C18] border border-gold/40 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-[10px] font-mono text-gold font-bold uppercase tracking-wider w-fit">
                          VERIFIED PROJECT ARTIFACT // {art.badge}
                        </span>
                        <button
                          onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge, idx: slideIdx })}
                          className="text-xs text-gold hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Expand Full Resolution Board</span>
                        </button>
                      </div>
                      <h4 className="text-lg font-black text-white">{art.title}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">{art.explanation}</p>
                      <div 
                        onClick={() => setExpandedEvidenceImg({ url: art.image, title: art.title, badge: art.badge, idx: slideIdx })}
                        className="relative aspect-[16/9] max-h-[460px] w-full rounded-xl overflow-hidden border border-white/10 bg-black cursor-pointer group shadow-2xl"
                      >
                        <Image src={art.image} alt={art.title} fill className="object-contain p-2 group-hover:scale-102 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity" />
                        <span className="absolute bottom-3 right-3 text-[11px] px-3 py-1 rounded bg-black/80 text-white font-bold flex items-center gap-1.5 border border-white/20">
                          <Maximize2 className="w-3 h-3 text-gold" /> Click to Zoom Full Resolution
                        </span>
                      </div>
                    </div>
                  );
                })()
              )}

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
            <span className="font-bold text-white">Lead Product Designer:</span>
            <span>Prashant Sisodhiya</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {hasWalkthrough && activeTab !== "walkthrough" && (
              <button
                onClick={() => setActiveTab("walkthrough")}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gold/15 hover:bg-gold hover:text-black text-gold text-xs font-bold tracking-wider transition-colors border border-gold/30 text-center cursor-pointer"
              >
                Watch 30s Walkthrough
              </button>
            )}
            <button
              onClick={() => setActiveTab("gallery")}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold tracking-wider transition-colors border border-white/10 text-center cursor-pointer"
            >
              Screens ({gallery.length})
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

      {/* Lightbox Modal for Expanded Evidence Boards */}
      <AnimatePresence>
        {expandedEvidenceImg && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={expandedEvidenceImg.title}
            onClick={() => {
              setExpandedEvidenceImg(null);
              setLightboxZoom(1);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-6xl w-full max-h-[94vh] flex flex-col items-center bg-[#070B18] border border-gold/40 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header with Navigation, Zoom, and Resolution Telemetry */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full pb-3 border-b border-white/10 mb-3 gap-2">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold/15 text-gold border border-gold/30 font-bold uppercase shrink-0">
                    VERIFIED PROJECT ARTIFACT
                  </span>
                  <span className="text-xs font-mono text-gold font-bold uppercase truncate">{expandedEvidenceImg.badge}</span>
                  <span className="hidden md:inline text-xs text-gray-400">•</span>
                  <h4 className="text-xs sm:text-sm font-black text-white truncate max-w-xs sm:max-w-md">{expandedEvidenceImg.title}</h4>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                  {/* Resolution & Dimensions Telemetry */}
                  <span className="hidden lg:inline text-[10px] font-mono text-gray-400 px-2 py-1 rounded bg-white/5 border border-white/10">
                    3840 × 2160 UHD • Authentic Vector Board
                  </span>

                  {/* Slide Counter if part of evidenceArtifacts */}
                  {caseStudy.evidenceArtifacts && (
                    <span className="text-xs font-mono text-gold px-2 py-1 rounded bg-gold/10 border border-gold/20 font-bold">
                      {((expandedEvidenceImg.idx ?? activeSlideIdx) + 1).toString().padStart(2, '0')} / {caseStudy.evidenceArtifacts.length.toString().padStart(2, '0')}
                    </span>
                  )}

                  {/* Zoom Controls */}
                  <div className="flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
                    <button
                      onClick={() => setLightboxZoom((prev) => Math.max(0.75, prev - 0.25))}
                      className="p-1 rounded text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="Zoom Out"
                      aria-label="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setLightboxZoom(1)}
                      className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-gray-300 hover:text-white"
                      title="Reset Zoom"
                      aria-label="Reset Zoom"
                    >
                      {Math.round(lightboxZoom * 100)}%
                    </button>
                    <button
                      onClick={() => setLightboxZoom((prev) => Math.min(2.5, prev + 0.25))}
                      className="p-1 rounded text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="Zoom In"
                      aria-label="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Previous / Next Arrow Controls */}
                  {caseStudy.evidenceArtifacts && caseStudy.evidenceArtifacts.length > 1 && (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => {
                          const total = caseStudy.evidenceArtifacts!.length;
                          const currentIdx = expandedEvidenceImg.idx ?? activeSlideIdx;
                          const prevIdx = (currentIdx - 1 + total) % total;
                          const prevSlide = caseStudy.evidenceArtifacts![prevIdx];
                          setExpandedEvidenceImg({ url: prevSlide.image, title: prevSlide.title, badge: prevSlide.badge, idx: prevIdx });
                          setActiveSlideIdx(prevIdx);
                        }}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-gold hover:text-black text-white transition-all cursor-pointer"
                        title="Previous Slide (Left Arrow)"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const total = caseStudy.evidenceArtifacts!.length;
                          const currentIdx = expandedEvidenceImg.idx ?? activeSlideIdx;
                          const nextIdx = (currentIdx + 1) % total;
                          const nextSlide = caseStudy.evidenceArtifacts![nextIdx];
                          setExpandedEvidenceImg({ url: nextSlide.image, title: nextSlide.title, badge: nextSlide.badge, idx: nextIdx });
                          setActiveSlideIdx(nextIdx);
                        }}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-gold hover:text-black text-white transition-all cursor-pointer"
                        title="Next Slide (Right Arrow)"
                        aria-label="Next Slide"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Close Lightbox */}
                  <button
                    onClick={() => {
                      setExpandedEvidenceImg(null);
                      setLightboxZoom(1);
                    }}
                    className="p-1.5 rounded-lg bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                    aria-label="Close enlarged evidence board"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Lightbox Zoomable Image Stage */}
              <div className="relative w-full flex-1 min-h-[460px] sm:min-h-[540px] max-h-[76vh] bg-black rounded-xl overflow-auto border border-white/10 flex items-center justify-center p-2">
                <div 
                  className="relative w-full h-full min-h-[440px] flex items-center justify-center transition-transform duration-200"
                  style={{ transform: `scale(${lightboxZoom})` }}
                >
                  <Image
                    src={expandedEvidenceImg.url}
                    alt={expandedEvidenceImg.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
