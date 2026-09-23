"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, ExternalLink, Sliders, Layers } from "lucide-react";

interface DNAMetric {
  id: string;
  name: string;
  score: number;
  category: "ux" | "visual" | "tech";
  description: string;
  focus: string[];
  tools: string[];
  projectLink: {
    title: string;
    href: string;
  };
}

export default function DesignDNA() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [activePreset, setActivePreset] = useState<"all" | "ux" | "visual" | "tech">("all");

  const metrics: DNAMetric[] = [
    { 
      id: "research",
      name: "UX Research", 
      score: 90, 
      category: "ux",
      description: "Heuristic evaluation, user interviews, affinity mapping, and data-driven personas.", 
      focus: ["Quantitative Surveys", "Usability Lab Testing", "Persona Development"],
      tools: ["Miro", "Hotjar", "Google Forms", "Notion"],
      projectLink: { title: "DeepAstro AI Research", href: "#work" }
    },
    { 
      id: "strategy",
      name: "UX Strategy", 
      score: 88, 
      category: "ux",
      description: "Business alignment, friction elimination, journey maps, and feature roadmapping.", 
      focus: ["Value Proposition", "Competitor Audit", "Roadmapping"],
      tools: ["FigJam", "Figma", "Whimsical"],
      projectLink: { title: "TradeX Terminal Strategy", href: "#work" }
    },
    { 
      id: "flows",
      name: "User Flows", 
      score: 95, 
      category: "ux",
      description: "High-level visual mapping of user steps, multi-path conditions, and edge cases.", 
      focus: ["Navigation Paths", "Condition Mapping", "Edge-Case Handling"],
      tools: ["Figma", "FigJam", "Balsamiq"],
      projectLink: { title: "FutureMind Milestone Architecture", href: "#work" }
    },
    { 
      id: "wireframes",
      name: "Wireframing", 
      score: 95, 
      category: "ux",
      description: "Low-fidelity layouts focusing on spatial structure, 12-column grids, and visual hierarchy.", 
      focus: ["12-Column Grids", "Figma LO-FI", "Information Hierarchy"],
      tools: ["Figma", "Sketch", "Pen & Paper"],
      projectLink: { title: "SecureX SOC Wireframes", href: "#work" }
    },
    { 
      id: "prototyping",
      name: "Prototyping", 
      score: 92, 
      category: "visual",
      description: "High-fidelity interactive states, clickables, micro-interactions, and motion easing.", 
      focus: ["Figma Smart Animate", "Interactive States", "Clickable Demos"],
      tools: ["Figma", "Framer", "After Effects"],
      projectLink: { title: "DeepAstro Cosmic Prototypes", href: "#work" }
    },
    { 
      id: "visual",
      name: "Visual Design", 
      score: 98, 
      category: "visual",
      description: "Luxury dark-mode palettes, glassmorphic card depth, and bespoke typography systems.", 
      focus: ["Typography Hierarchy", "Palette Curation", "UI Depth/Aesthetics"],
      tools: ["Figma", "Photoshop", "Illustrator"],
      projectLink: { title: "Cosmic Glassmorphism Suite", href: "#work" }
    },
    { 
      id: "branding",
      name: "Branding", 
      score: 88, 
      category: "visual",
      description: "Brand identities, vector logomarks, styleguide guidelines, and CMYK packaging.", 
      focus: ["Logo Design", "Styleguide Generation", "Corporate Identity"],
      tools: ["Illustrator", "Photoshop", "InDesign"],
      projectLink: { title: "Corporate Brand Collaterals", href: "/photoshop" }
    },
    { 
      id: "motion",
      name: "Motion Graphics", 
      score: 92, 
      category: "visual",
      description: "Kinetic typography, showreels, UI transitions, multi-track audio, and speed ramping.", 
      focus: ["After Effects Keyframes", "Lottie Animations", "Dynamic Intro Hooks"],
      tools: ["After Effects", "Premiere Pro", "Audition"],
      projectLink: { title: "4K Cinematic Video Showreel", href: "#work" }
    },
    { 
      id: "frontend",
      name: "Frontend Tech", 
      score: 82, 
      category: "tech",
      description: "Clean semantic markup, layout components in Next.js/React, Tailwind CSS, and zero-drift handshakes.", 
      focus: ["React Hooks", "Responsive Flexbox/Grid", "Tailwind CSS"],
      tools: ["React", "Next.js", "TypeScript", "Tailwind"],
      projectLink: { title: "Xportfolio Architecture", href: "https://github.com" }
    },
    { 
      id: "ai",
      name: "AI Integration", 
      score: 94, 
      category: "tech",
      description: "Generative AI pipelines, UI prompt architectures, and conversational assistant interfaces.", 
      focus: ["Prompt Engineering", "Chatbot UI/UX", "Workflow Automation"],
      tools: ["OpenAI API", "Google Gemini", "Claude", "Cursor"],
      projectLink: { title: "AI Assistant Floating Lab", href: "#" }
    },
  ];

  const currentIdx = hoveredIdx !== null ? hoveredIdx : selectedIdx;
  const currentMetric = metrics[currentIdx];

  // Radar chart constants
  const cx = 175;
  const cy = 175;
  const rMax = 110;
  const totalPoints = metrics.length;
  const angleStep = (2 * Math.PI) / totalPoints;

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (index: number, valueFactor: number) => {
    const angle = angleStep * index - Math.PI / 2; // Orient upward
    const r = rMax * valueFactor;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // Generate data polygon points path
  const dataPoints = metrics.map((m, idx) => {
    const coords = getCoordinates(idx, m.score / 100);
    return `${coords.x},${coords.y}`;
  }).join(" ");

  return (
    <section id="dna" className="relative py-24 bg-[#f8fafc] dark:bg-[#080808] text-[#0a1128] dark:text-white transition-colors duration-300">
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-[#9D4EDD]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION 02: DESIGN DNA */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#B8941F] dark:text-[#D4AF37]">Visual DNA Blueprint</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#0a1128] dark:text-white">
            DESIGN <span className="text-gradient-gold">DNA</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mt-4 shadow-[0_0_8px_#D4A017]" />
          <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
            Multi-axis competency radar measuring strategic research, visual aesthetics, motion, and production code. Click any spoke to lock inspection.
          </p>
        </div>

        {/* Preset Domain Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: "all", label: "Complete Spectrum (10 Axes)" },
            { id: "ux", label: "Core UX & Strategy" },
            { id: "visual", label: "Visual Aesthetics & Motion" },
            { id: "tech", label: "Engineering & AI" },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setActivePreset(preset.id as any);
                if (preset.id === "ux") setSelectedIdx(0);
                if (preset.id === "visual") setSelectedIdx(5);
                if (preset.id === "tech") setSelectedIdx(8);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activePreset === preset.id
                  ? "bg-[#D4AF37] text-black shadow-md font-extrabold"
                  : "bg-white dark:bg-[#0F1118] border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#D4AF37]"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Panel: SVG Radar Chart (7 cols) */}
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[380px] p-4 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-white/10 shadow-xl">
            <svg 
              viewBox="0 0 350 350" 
              className="w-full max-w-[430px] h-auto overflow-visible"
            >
              <defs>
                {/* Glow Filter for radar polygon */}
                <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Draw nested polygon grid rings */}
              {gridLevels.map((lvl, ringIdx) => {
                const ringPoints = Array.from({ length: totalPoints }).map((_, ptIdx) => {
                  const coords = getCoordinates(ptIdx, lvl);
                  return `${coords.x},${coords.y}`;
                }).join(" ");

                return (
                  <polygon
                    key={ringIdx}
                    points={ringPoints}
                    className="fill-none stroke-black/10 dark:stroke-white/10"
                    strokeWidth="0.75"
                  />
                );
              })}

              {/* Spoke lines */}
              {Array.from({ length: totalPoints }).map((_, idx) => {
                const endCoords = getCoordinates(idx, 1.0);
                const isCurrent = currentIdx === idx;
                return (
                  <line
                    key={idx}
                    x1={cx}
                    y1={cy}
                    x2={endCoords.x}
                    y2={endCoords.y}
                    className={isCurrent ? "stroke-[#D4AF37]" : "stroke-black/10 dark:stroke-white/10"}
                    strokeWidth={isCurrent ? "1.5" : "0.75"}
                  />
                );
              })}

              {/* Data Polygon Glow Background */}
              <polygon
                points={dataPoints}
                className="fill-[#D4AF37]/15 stroke-none"
                filter="url(#radarGlow)"
              />

              {/* Data Polygon Main border */}
              <polygon
                points={dataPoints}
                className="fill-transparent stroke-[#D4AF37]"
                strokeWidth="2.0"
              />

              {/* Interactive nodes */}
              {metrics.map((m, idx) => {
                const coords = getCoordinates(idx, m.score / 100);
                const isCurrent = currentIdx === idx;
                return (
                  <g 
                    key={idx}
                    tabIndex={0}
                    role="button"
                    aria-label={`${m.name}: ${m.score}% proficiency`}
                    className="cursor-pointer focus:outline-none"
                    onClick={() => setSelectedIdx(idx)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isCurrent ? 7 : 4.5}
                      className={`transition-all duration-300 ${
                        isCurrent 
                          ? "fill-[#D4AF37] stroke-white dark:stroke-black shadow-lg" 
                          : "fill-white dark:fill-[#080808] stroke-[#D4AF37]"
                      }`}
                      strokeWidth="2.0"
                    />
                  </g>
                );
              })}

              {/* Text labels outside radar circles */}
              {metrics.map((m, idx) => {
                const labelCoords = getCoordinates(idx, 1.18);
                const isCurrent = currentIdx === idx;
                
                let textAnchor: "start" | "middle" | "end" = "middle";
                if (labelCoords.x < cx - 10) textAnchor = "end";
                if (labelCoords.x > cx + 10) textAnchor = "start";

                return (
                  <text
                    key={idx}
                    tabIndex={0}
                    role="button"
                    aria-label={`${m.name}: ${m.score}%`}
                    x={labelCoords.x}
                    y={labelCoords.y + 4}
                    textAnchor={textAnchor}
                    onClick={() => setSelectedIdx(idx)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`font-mono text-[9px] uppercase tracking-wider cursor-pointer transition-all duration-300 focus:outline-none ${
                      isCurrent 
                        ? "fill-[#B8941F] dark:fill-[#F5BA42] font-black scale-110" 
                        : "fill-slate-500 dark:fill-slate-400"
                    }`}
                  >
                    {m.name}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Right Panel: Detail Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-[#D4AF37]/40 shadow-2xl relative text-[#0a1128] dark:text-white"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#FF6B00] to-transparent" />
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-[#B8941F] dark:text-[#F5BA42]">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">DNA_AXIS_{currentIdx + 1}</span>
                  </div>
                  <span className="text-2xl font-black text-[#0a1128] dark:text-white font-mono">
                    {currentMetric.score}%
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#0a1128] dark:text-white uppercase tracking-wider mb-2">
                  {currentMetric.name}
                </h3>

                {/* Score Progress Bar */}
                <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentMetric.score}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FF6B00] rounded-full"
                  />
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {currentMetric.description}
                </p>

                {/* Focus Objectives */}
                <div className="space-y-2 mb-5">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-widest block">
                    Focus Objectives:
                  </span>
                  <div className="space-y-1.5">
                    {currentMetric.focus.map((item, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8941F] dark:text-[#F5BA42] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools row */}
                <div className="mb-5 pt-3 border-t border-black/5 dark:border-white/5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2 font-bold">
                    Primary Software Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentMetric.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Portfolio Project Link */}
                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">Live Implementation:</span>
                  <a
                    href={currentMetric.projectLink.href}
                    className="text-xs font-bold text-[#B8941F] dark:text-[#F5BA42] flex items-center space-x-1 hover:underline"
                  >
                    <span>{currentMetric.projectLink.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
