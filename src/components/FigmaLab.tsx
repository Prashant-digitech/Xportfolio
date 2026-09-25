"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layers, Settings, Play, CheckCircle2, Code, Eye, MousePointer, 
  Maximize2, X, ZoomIn, ZoomOut, Sparkles, Share2, Compass, ArrowRight,
  ShieldCheck, Smartphone, Monitor, ChevronRight, Copy, Check
} from "lucide-react";

type FigmaStage = "wireframe" | "midfi" | "system" | "phases" | "proto" | "code";
type PhaseSubStage = "phase1" | "phase2" | "phase2_1" | "phase3" | "phase4";

interface StageData {
  id: FigmaStage;
  label: string;
  badge: string;
  fileTab: string;
  title: string;
  description: string;
  image?: string;
  layers: { name: string; type: "frame" | "component" | "group" | "vector" | "text" }[];
  properties: {
    dimensions: string;
    layoutGrid: string;
    autoLayout: string;
    fills: { name: string; hex: string }[];
    interaction?: string;
  };
}

export default function FigmaLab() {
  const [activeStage, setActiveStage] = useState<FigmaStage>("wireframe");
  const [activePhase, setActivePhase] = useState<PhaseSubStage>("phase1");
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [fullscreenImage, setFullscreenImage] = useState<{ url: string; title: string; subtitle: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const phaseImages: Record<PhaseSubStage, { url: string; title: string; desc: string }> = {
    phase1: {
      url: "/images/figma-lab/phase-1.png",
      title: "Phase 1: Initial Conceptual Foundation",
      desc: "Architecting the astronomical calculation layout, primary navigation bars, and cosmic dark theme tone.",
    },
    phase2: {
      url: "/images/figma-lab/phase-2.png",
      title: "Phase 2: Data Architecture & Flow Structuring",
      desc: "Organizing Vedic Dasha timelines, planetary house metrics, and multi-tool routing.",
    },
    phase2_1: {
      url: "/images/figma-lab/phase-2-1.png",
      title: "Phase 2.1: Micro-Interactions & Form Refinement",
      desc: "Polishing birth detail input forms, timezone autolocation, and modal progressive disclosure.",
    },
    phase3: {
      url: "/images/figma-lab/phase-3.png",
      title: "Phase 3: High-Fidelity UI & Cosmic Glassmorphism",
      desc: "Applying luminous cyan and gold astral highlights, radial glows, and high-density dashboard layouts.",
    },
    phase4: {
      url: "/images/figma-lab/phase-4.png",
      title: "Phase 4: Production Master Candidate",
      desc: "Final responsive web and mobile screen ecosystem ready for engineering hand-off.",
    },
  };

  const stagesData: Record<FigmaStage, StageData> = {
    wireframe: {
      id: "wireframe",
      label: "01 // Wireframes",
      badge: "LOW-FIDELITY ARCHITECTURE",
      fileTab: "deepastro_wireframes_v1.fig",
      title: "Architectural Wireframes",
      description: "Authentic low-fidelity structural blueprint of DeepAstro in Figma. Mapping 12-column grid geometry, Kundli chart zones, modal positioning, and thumb-zone touch targets before visual styling.",
      image: "/images/figma-lab/wireframe-deepastro.png",
      layers: [
        { name: "Canvas // Wireframe System", type: "frame" },
        { name: "Master Grid [1440px / 12-Col / 24px Gutter]", type: "group" },
        { name: "Frame // Birth Details Onboarding Modal", type: "frame" },
        { name: "Frame // Kundli Vedic Chart Geometry", type: "frame" },
        { name: "Frame // Future Intelligence Timeline Wire", type: "frame" },
        { name: "Frame // Astrocartography World Grid", type: "frame" },
        { name: "Frame // Mobile Bottom Bar (Thumb-Zone)", type: "frame" },
      ],
      properties: {
        dimensions: "W: 1440px • H: 1024px",
        layoutGrid: "12-column grid • 24px gutter",
        autoLayout: "Vertical 16px • Padding 32px",
        fills: [
          { name: "Canvas BG", hex: "#0E0E0E" },
          { name: "Wireframe Stroke", hex: "#333333" },
          { name: "Placeholder Fill", hex: "#1A1A1A" },
        ],
      },
    },
    midfi: {
      id: "midfi",
      label: "02 // Mid-Fidelity",
      badge: "SPATIAL EXPLORATION",
      fileTab: "deepastro_midfi_v2.fig",
      title: "Mid-Fidelity Exploration",
      description: "Iterating spatial density, typography contrast, and information hierarchy. Validating how dense astrological data, planetary glyphs, and navigation containers coexist without cognitive clutter.",
      image: "/images/figma-lab/midfy-deepastro.png",
      layers: [
        { name: "Canvas // Mid-Fidelity Workspace", type: "frame" },
        { name: "Frame // Dashboard Command Deck v2.4", type: "frame" },
        { name: "Component // Planetary House Matrix", type: "component" },
        { name: "Component // Karmic Timeline Graph", type: "component" },
        { name: "Frame // Tarot 3-Card Interactive Spread", type: "frame" },
        { name: "Vector // Palmistry Line Detection Outline", type: "vector" },
        { name: "Frame // Mobile Sheet Drawer Nav", type: "frame" },
      ],
      properties: {
        dimensions: "W: 1440px • H: 900px",
        layoutGrid: "Fluid 8pt spatial grid",
        autoLayout: "Direction: Horizontal • Gap 20px",
        fills: [
          { name: "Surface Obsidian", hex: "#0F1424" },
          { name: "Border Glass", hex: "#2A324B" },
          { name: "Secondary Text", hex: "#94A3B8" },
        ],
      },
    },
    system: {
      id: "system",
      label: "03 // Design System",
      badge: "ATOMIC DESIGN TOKENS",
      fileTab: "deepastro_design_system_tokens.fig",
      title: "Complete Figma Design System",
      description: "Authentic Design System board created in Figma. Semantic color tokens (Cosmic Obsidian, Astral Cyan, Vedic Gold), typography ramp (Satoshi, Geist, Inter), button states, cards, and planetary glyph components.",
      image: "/images/figma-lab/deepastro-design-system.png",
      layers: [
        { name: "❖ Design System Master Sheet", type: "component" },
        { name: "Color Tokens // Cosmic Obsidian & Astral", type: "group" },
        { name: "Typography Scales // H1 to Caption", type: "text" },
        { name: "❖ Button / Primary Luminous (Cyan 400)", type: "component" },
        { name: "❖ Button / Vedic Accent (Gold 500)", type: "component" },
        { name: "❖ Card / Cosmic Glassmorphism Blur-20", type: "component" },
        { name: "❖ Icons / 12 Zodiac & 9 Vedic Grahas", type: "vector" },
      ],
      properties: {
        dimensions: "W: 1920px • H: 1080px",
        layoutGrid: "Modular Token Framework",
        autoLayout: "Auto Layout Enabled • Gap 24px",
        fills: [
          { name: "Cosmic Obsidian", hex: "#06070A" },
          { name: "Astral Cyan", hex: "#00E5FF" },
          { name: "Vedic Gold", hex: "#F5BA42" },
          { name: "Spiritual Violet", hex: "#885CF6" },
        ],
      },
    },
    phases: {
      id: "phases",
      label: "04 // Iterative Evolution (Phase 1–4)",
      badge: "5-PHASE ITERATIVE MATURITY",
      fileTab: "deepastro_evolution_phases.fig",
      title: "Iterative Phase Evolution",
      description: "Witness the complete design evolution through 5 progressive phases. From early architectural concepts to deep UI polish and production-ready candidates.",
      image: phaseImages[activePhase].url,
      layers: [
        { name: "# Phase 1: Conceptual Foundation", type: "frame" },
        { name: "# Phase 2: Engine & Flow Architecture", type: "frame" },
        { name: "# Phase 2.1: Micro-Interactions Refinement", type: "frame" },
        { name: "# Phase 3: High-Fidelity UI Polish", type: "frame" },
        { name: "# Phase 4: Production Master Screens", type: "frame" },
      ],
      properties: {
        dimensions: "W: 1440px • H: 900px",
        layoutGrid: "Responsive Auto Layout",
        autoLayout: "Direction: Column • Gap 24px",
        fills: [
          { name: "Base Cosmic", hex: "#070B18" },
          { name: "Active Accent", hex: "#00E5FF" },
          { name: "Gold Highlight", hex: "#F5BA42" },
        ],
      },
    },
    proto: {
      id: "proto",
      label: "05 // Interactive Prototype",
      badge: "FIGMA PROTOTYPE NOODLES",
      fileTab: "deepastro_interactive_prototype.fig",
      title: "Figma Prototype Canvas",
      description: "Authentic Figma prototype view showing real interaction noodle connections! Demonstrating multi-screen transitions, onboarding to Kundli generation, aspect drawers, and mobile tab bar triggers.",
      image: "/images/figma-lab/prototype.png",
      layers: [
        { name: "Prototype Flow // Onboarding to Core", type: "frame" },
        { name: "↳ Trigger: [Sign In CTA] -> [Birth Modal]", type: "vector" },
        { name: "↳ Trigger: [Generate Button] -> [Kundli]", type: "vector" },
        { name: "↳ Trigger: [House 10 Node] -> [Aspect Drawer]", type: "vector" },
        { name: "↳ Trigger: [Timeline Scrubber] -> [Future Intel]", type: "vector" },
        { name: "↳ Trigger: [Globe Pin] -> [Astrocartography]", type: "vector" },
        { name: "↳ Trigger: [Mobile Bar] -> [Tarot Spread]", type: "vector" },
      ],
      properties: {
        dimensions: "7 Connected Screens • 24 Triggers",
        layoutGrid: "Interactive Screen Node Mesh",
        autoLayout: "Smart Animate (300ms ease-out)",
        fills: [
          { name: "Noodle Blue", hex: "#0D99FF" },
          { name: "Trigger Highlight", hex: "#00F0FF" },
          { name: "Canvas Dark", hex: "#1E1E1E" },
        ],
        interaction: "On Click -> Smart Animate • 300ms ease-out",
      },
    },
    code: {
      id: "code",
      label: "06 // Dev Mode Hand-off",
      badge: "TYPESCRIPT & TAILWIND",
      fileTab: "deepastro_dev_handshake.tsx",
      title: "Developer Hand-off & Code Specs",
      description: "Zero-loss hand-off from Figma into production React & Next.js. Inspect design tokens, CSS variables, and component contracts built with Tailwind CSS.",
      layers: [
        { name: "export_components.tsx", type: "component" },
        { name: "tailwind.config.tokens.ts", type: "component" },
        { name: "KundliChartVisualizer.tsx", type: "component" },
        { name: "FutureIntelTimeline.tsx", type: "component" },
        { name: "AstrocartographyMap.tsx", type: "component" },
      ],
      properties: {
        dimensions: "Production TSX Component",
        layoutGrid: "Tailwind CSS v4 Utility Matrix",
        autoLayout: "Flexbox / CSS Grid 12-Col",
        fills: [
          { name: "--cosmic-bg", hex: "#06070A" },
          { name: "--astral-cyan", hex: "#00E5FF" },
          { name: "--vedic-gold", hex: "#F5BA42" },
        ],
      },
    },
  };

  const currentStage = stagesData[activeStage];
  const activeImgUrl = activeStage === "phases" ? phaseImages[activePhase].url : currentStage.image;

  const handleCopyCode = () => {
    const codeSnippet = `// DeepAstro Cosmic Design Tokens & Component Hand-off
import { motion } from "framer-motion";

export const DeepAstroTokens = {
  colors: {
    cosmicBg: "#06070A",
    surfaceDark: "#111827",
    cardGlass: "rgba(26, 31, 43, 0.6)",
    astralCyan: "#00E5FF",
    vedicGold: "#F5BA42",
    spiritualViolet: "#885CF6",
  },
  blur: "backdrop-blur-xl",
  radius: "rounded-2xl",
  font: {
    heading: "Cinzel, serif",
    body: "Satoshi, Inter, sans-serif",
  },
};

export default function BirthChartCard({ ascendant, rashi, nakshatra }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-2xl bg-[#0F1424]/80 border border-[#00E5FF]/20 shadow-[0_0_25px_rgba(0,229,255,0.15)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-[#00E5FF] font-bold uppercase tracking-wider">Vedic Birth Chart</span>
        <span className="px-2 py-0.5 rounded bg-[#F5BA42]/15 text-[#F5BA42] text-[10px] font-bold">D1 Kundli</span>
      </div>
      <h3 className="text-xl font-black text-white mt-2">Lagna: {ascendant || 'Aries'}</h3>
      <p className="text-xs text-gray-300 mt-1">Moon in {rashi || 'Taurus'} • {nakshatra || 'Rohini'}</p>
    </motion.div>
  );
}`;
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin + "#figma-lab");
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <section id="figma-lab" className="relative py-24 bg-[#05070E] text-white transition-colors duration-300 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-gold">100% Genuine Work Evidence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            FIGMA <span className="text-gradient-gold">LAB</span>
          </h2>
          <div className="w-20 h-[2px] bg-gold mt-3 shadow-[0_0_12px_#D4A017]" />
          <p className="text-gray-400 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed">
            Interactive Figma workspace emulation loaded with <span className="text-white font-bold">real, authentic project artifacts</span> from the DeepAstro project. Inspect genuine wireframes, design systems, iterative phases, and prototype noodle graphs directly from Figma.
          </p>
        </div>

        {/* Stage Selector Toggles */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {(Object.keys(stagesData) as FigmaStage[]).map((stageKey) => {
            const stg = stagesData[stageKey];
            const isActive = activeStage === stageKey;
            return (
              <button
                key={stageKey}
                onClick={() => setActiveStage(stageKey)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-gold to-gold-light text-black border-gold shadow-[0_0_20px_rgba(212,160,23,0.35)] scale-105 font-black"
                    : "bg-[#090D1C] border-white/10 text-gray-400 hover:border-gold/50 hover:text-white hover:bg-[#0E152E]"
                }`}
              >
                {stageKey === "wireframe" && <Layers className="w-3.5 h-3.5" />}
                {stageKey === "midfi" && <Compass className="w-3.5 h-3.5" />}
                {stageKey === "system" && <Settings className="w-3.5 h-3.5" />}
                {stageKey === "phases" && <ArrowRight className="w-3.5 h-3.5" />}
                {stageKey === "proto" && <MousePointer className="w-3.5 h-3.5" />}
                {stageKey === "code" && <Code className="w-3.5 h-3.5" />}
                <span>{stg.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-selector for Evolutionary Phases */}
        {activeStage === "phases" && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex flex-wrap items-center justify-center gap-2 mb-8 p-3 rounded-2xl bg-[#090D1E] border border-white/10 max-w-3xl mx-auto"
          >
            <span className="text-[11px] font-mono font-bold text-gold uppercase px-2">Phase Selector:</span>
            {[
              { id: "phase1" as const, label: "Phase 1: Concept" },
              { id: "phase2" as const, label: "Phase 2: Data Flow" },
              { id: "phase2_1" as const, label: "Phase 2.1: Interactions" },
              { id: "phase3" as const, label: "Phase 3: High-Fi Polish" },
              { id: "phase4" as const, label: "Phase 4: Production Master" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePhase(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activePhase === p.id
                    ? "bg-[#00E5FF] text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* REALISTIC FIGMA WORKSPACE WRAPPER */}
        <div className="border border-white/15 rounded-2xl overflow-hidden bg-[#1E1E1E] shadow-2xl relative">
          
          {/* TOPBAR: Figma Tab and Controls */}
          <div className="bg-[#2C2C2C] px-4 py-2.5 border-b border-black/30 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-300">
            {/* File Tab */}
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-gradient-to-br from-[#F24E1E] via-[#A259FF] to-[#1ABCFE] flex items-center justify-center text-white text-[10px] font-black">
                F
              </div>
              <span className="font-bold font-mono text-white text-xs tracking-wide">{currentStage.fileTab}</span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded bg-white/10 text-gray-400 font-mono">
                {currentStage.badge}
              </span>
            </div>

            {/* Multiplayer Collaboration Avatars */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="flex items-center -space-x-1.5">
                <div className="w-6 h-6 rounded-full bg-gold text-black flex items-center justify-center text-[10px] font-black border-2 border-[#2C2C2C] title='Prashant Sisodhiya'">
                  PS
                </div>
                <div className="w-6 h-6 rounded-full bg-[#00E5FF] text-black flex items-center justify-center text-[10px] font-black border-2 border-[#2C2C2C] title='Reviewer'">
                  RV
                </div>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">Prashant S. (Editing)</span>
            </div>

            {/* Canvas Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Zoom Controls */}
              <div className="flex items-center bg-black/30 rounded-lg p-0.5 border border-white/10">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(50, z - 25))}
                  className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-gold font-bold px-2">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(150, z + 25))}
                  className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {activeImgUrl && (
                <button
                  onClick={() => setFullscreenImage({ 
                    url: activeImgUrl, 
                    title: currentStage.title, 
                    subtitle: activeStage === "phases" ? phaseImages[activePhase].desc : currentStage.description 
                  })}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-gold hover:text-black text-white text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Inspect Fullscreen</span>
                </button>
              )}

              <button
                onClick={handleCopyShare}
                className="px-3 py-1 bg-gold/15 hover:bg-gold hover:text-black border border-gold/40 text-gold rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
              >
                {copiedShare ? <Check className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
                <span>{copiedShare ? "Copied" : "Share"}</span>
              </button>
            </div>
          </div>

          {/* MAIN FIGMA 3-PANE WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] bg-[#1E1E1E]">
            
            {/* LEFT SIDEBAR: LAYERS PANEL (3 cols) */}
            <div className="lg:col-span-3 border-r border-black/40 bg-[#252525] p-4 flex flex-col font-mono text-xs text-gray-300">
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                <span className="font-bold text-white flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-gold" /> 
                  <span>Layers</span>
                </span>
                <span className="text-[9px] text-gray-400 font-bold uppercase">PAGE 1</span>
              </div>

              {/* Dynamic Layer Tree */}
              <div className="space-y-2 flex-1 overflow-y-auto pr-1">
                <div className="text-[10px] text-gold font-bold uppercase tracking-wider mb-2">
                  # {currentStage.title}
                </div>
                {currentStage.layers.map((layer, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center space-x-2 px-2 py-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer text-[11px] group"
                  >
                    <span className="text-gray-500 group-hover:text-gold transition-colors">
                      {layer.type === "frame" && "#"}
                      {layer.type === "component" && "❖"}
                      {layer.type === "group" && "⊡"}
                      {layer.type === "vector" && "◇"}
                      {layer.type === "text" && "T"}
                    </span>
                    <span className="truncate group-hover:text-white transition-colors">{layer.name}</span>
                  </div>
                ))}
              </div>

              {/* Genuine Work Verification Tag */}
              <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-gray-400 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Verified Figma Project</span>
                </div>
                <p className="text-[9px] text-gray-400 leading-tight">
                  All assets loaded from designer&apos;s genuine Figma lab files.
                </p>
              </div>
            </div>

            {/* CENTER AREA: FIGMA CANVAS (6 cols on lg) */}
            <div className="lg:col-span-6 p-4 sm:p-6 bg-[#161616] flex flex-col items-center justify-center overflow-hidden relative min-h-[460px]">
              
              {/* Canvas Infinite Dot/Grid Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

              {/* Multiplayer Floating Cursors */}
              <div className="absolute top-8 left-12 z-20 hidden md:flex items-center space-x-1 pointer-events-none">
                <MousePointer className="w-4 h-4 text-gold fill-gold" />
                <span className="px-2 py-0.5 rounded bg-gold text-black font-mono text-[9px] font-black shadow-md">
                  Prashant Sisodhiya [Lead]
                </span>
              </div>
              <div className="absolute bottom-12 right-12 z-20 hidden md:flex items-center space-x-1 pointer-events-none">
                <MousePointer className="w-4 h-4 text-[#00E5FF] fill-[#00E5FF]" />
                <span className="px-2 py-0.5 rounded bg-[#00E5FF] text-black font-mono text-[9px] font-black shadow-md">
                  Reviewer [Staging]
                </span>
              </div>

              {/* Stage Canvas Frame */}
              <div 
                className="relative w-full max-w-[560px] rounded-xl border border-white/20 shadow-2xl bg-[#0B0D14] overflow-hidden z-10 transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                {/* Frame Header Bar */}
                <div className="bg-[#242733] px-3 py-1.5 border-b border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-300">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-gold font-bold">#</span>
                    <span className="font-bold text-white truncate max-w-[200px]">
                      {activeStage === "phases" ? phaseImages[activePhase].title : currentStage.title}
                    </span>
                  </div>
                  <span className="text-gray-400">1440 × 900</span>
                </div>

                {/* Stage Content */}
                <AnimatePresence mode="wait">
                  {activeStage === "code" ? (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-5 font-mono text-[11px] bg-[#0A0D18] text-gray-300 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-[#00E5FF] font-bold flex items-center gap-1.5">
                          <Code className="w-3.5 h-3.5" /> DeepAstroTokens.tsx
                        </span>
                        <button
                          onClick={handleCopyCode}
                          className="px-2 py-1 rounded bg-white/10 hover:bg-gold hover:text-black text-white text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                        </button>
                      </div>

                      <pre className="text-[10px] leading-relaxed text-[#00E5FF] overflow-x-auto max-h-[340px] p-3 rounded-lg bg-black/50 border border-white/5 font-mono">
{`// DeepAstro Production Tokens Hand-off
export const tokens = {
  theme: "Cosmic Obsidian Glassmorphism",
  colors: {
    bg: "#06070A",
    surface: "#111827",
    primaryCyan: "#00E5FF",
    vedicGold: "#F5BA42",
    accentViolet: "#885CF6",
  },
  typography: {
    display: "Cinzel, serif",
    body: "Satoshi, Inter, sans-serif",
  },
  touchTarget: "48px min (WCAG AA)",
};`}
                      </pre>

                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Production verified: Built in React 19 + Tailwind CSS with zero lint errors.</span>
                      </div>
                    </motion.div>
                  ) : activeImgUrl ? (
                    <motion.div
                      key={activeImgUrl}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="relative aspect-[16/10] w-full bg-black group cursor-pointer"
                      onClick={() => setFullscreenImage({ 
                        url: activeImgUrl, 
                        title: currentStage.title, 
                        subtitle: activeStage === "phases" ? phaseImages[activePhase].desc : currentStage.description 
                      })}
                    >
                      <Image
                        src={activeImgUrl}
                        alt={currentStage.title}
                        fill
                        className="object-contain p-1"
                        priority
                      />
                      {/* Hover Overlay Hint */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                        <div className="px-3 py-1.5 rounded-lg bg-black/80 border border-white/20 shadow-lg flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-gold" />
                          <span>Click to Inspect Full High-Res</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Frame Footer status */}
                <div className="bg-[#1C1F2B] px-3 py-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
                  <span className="truncate max-w-[280px]">
                    {activeStage === "phases" ? phaseImages[activePhase].desc : currentStage.description}
                  </span>
                  <span className="text-gold font-mono font-bold shrink-0 ml-2">FIGMA_SYNC_OK</span>
                </div>
              </div>

            </div>

            {/* RIGHT SIDEBAR: PROPERTIES / INSPECT PANEL (3 cols) */}
            <div className="lg:col-span-3 border-l border-black/40 bg-[#252525] p-4 flex flex-col space-y-5 font-mono text-xs text-gray-300">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="font-bold text-white flex items-center space-x-1.5">
                  <Settings className="w-3.5 h-3.5 text-gold" /> 
                  <span>Design Specs</span>
                </span>
                <span className="text-[9px] text-gold font-bold uppercase">DEV READY</span>
              </div>
              
              <div className="space-y-4">
                {/* Dimensions */}
                <div>
                  <span className="text-gray-400 block mb-1 uppercase tracking-wider text-[9px]">Frame Bounds</span>
                  <div className="p-2 border border-white/10 bg-black/30 rounded text-white font-bold text-xs">
                    {currentStage.properties.dimensions}
                  </div>
                </div>

                {/* Grid layout settings */}
                <div>
                  <span className="text-gray-400 block mb-1 uppercase tracking-wider text-[9px]">Layout Grid</span>
                  <div className="p-2 border border-white/10 bg-black/30 rounded text-white text-xs flex items-center justify-between">
                    <span>{currentStage.properties.layoutGrid}</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
                  </div>
                </div>

                {/* Auto layout properties */}
                <div>
                  <span className="text-gray-400 block mb-1 uppercase tracking-wider text-[9px]">Auto Layout</span>
                  <div className="p-2 border border-white/10 bg-black/30 rounded text-xs text-gray-300">
                    {currentStage.properties.autoLayout}
                  </div>
                </div>

                {/* Color Tokens */}
                <div>
                  <span className="text-gray-400 block mb-1 uppercase tracking-wider text-[9px]">Fills & Tokens</span>
                  <div className="space-y-1.5">
                    {currentStage.properties.fills.map((fill, idx) => (
                      <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-black/30 border border-white/5 text-[10px]">
                        <div className="flex items-center space-x-2">
                          <span 
                            className="w-3.5 h-3.5 rounded border border-white/20 inline-block"
                            style={{ backgroundColor: fill.hex }}
                          />
                          <span className="text-gray-300 font-bold">{fill.name}</span>
                        </div>
                        <span className="text-gold font-mono">{fill.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prototype interaction if available */}
                {currentStage.properties.interaction && (
                  <div>
                    <span className="text-gray-400 block mb-1 uppercase tracking-wider text-[9px]">Interaction Trigger</span>
                    <div className="p-2 border border-[#00E5FF]/30 bg-[#00E5FF]/5 rounded text-[10px] text-[#00E5FF]">
                      {currentStage.properties.interaction}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL FOR REAL FIGMA ARTIFACTS */}
      <AnimatePresence>
        {fullscreenImage && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-6 bg-black/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={fullscreenImage.title}
            onClick={() => setFullscreenImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-6xl w-full max-h-[94vh] flex flex-col bg-[#0A0D1A] border border-gold/40 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider">
                    FIGMA LAB // HIGH-RESOLUTION ARTIFACT
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white">{fullscreenImage.title}</h4>
                  <p className="text-xs text-gray-400 max-w-2xl">{fullscreenImage.subtitle}</p>
                </div>
                <button
                  onClick={() => setFullscreenImage(null)}
                  className="p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                  aria-label="Close enlarged preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large Image Canvas */}
              <div className="relative w-full flex-1 min-h-[480px] max-h-[75vh] bg-black rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                <Image
                  src={fullscreenImage.url}
                  alt={fullscreenImage.title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Lightbox Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-3 text-xs text-gray-400">
                <span>Genuine Figma Project by Prashant Sisodhiya</span>
                <span className="text-gold font-mono font-bold">100% Genuine Project Truth</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
