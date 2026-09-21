"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface DNAMetric {
  name: string;
  score: number;
  description: string;
  focus: string[];
}

export default function DesignDNA() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const metrics: DNAMetric[] = [
    { name: "UX Research", score: 90, description: "Heuristic evaluation, user interviews, affinity mapping, and personas.", focus: ["Quantitative Surveys", "Usability Lab Testing", "Persona Development"] },
    { name: "UX Strategy", score: 88, description: "Business alignment, journey maps, and feature roadmapping.", focus: ["Value Proposition", "Competitor Audit", "Roadmapping"] },
    { name: "User Flows", score: 95, description: "High-level visual mapping of user steps, edge cases, and paths.", focus: ["Navigation Paths", "Condition Mapping", "Edge-Case Handling"] },
    { name: "Wireframing", score: 95, description: "Low-fidelity layouts focusing on layout structure, sizing, hierarchy.", focus: ["Sketching Layouts", "Balsamiq/Figma LO-FI", "Visual Hierarchy"] },
    { name: "Prototyping", score: 92, description: "High-fidelity interactive states, clickables, micro-interactions.", focus: ["Figma Smart Animate", "Interactive States", "Clickable Demos"] },
    { name: "Visual Design", score: 98, description: "Branding elements, premium dark-luxury cards, glassmorphic layout.", focus: ["Typography Systems", "Color Palette Curation", "UI Depth/Aesthetics"] },
    { name: "Branding", score: 88, description: "Brand identities, brandbooks, core messaging guidelines.", focus: ["Logo Design", "Styleguide Generation", "Corporate Identity"] },
    { name: "Motion Graphics", score: 92, description: "Kinetic typography, showreels, UI transitions, keyframing.", focus: ["After Effects Keyframes", "Lottie Animations", "Dynamic Intro Hooks"] },
    { name: "Frontend Tech", score: 80, description: "Clean semantic markup, layout components in Next.js/React, Tailwind CSS.", focus: ["React Hooks", "Responsive Flexbox/Grid", "CSS Animations"] },
    { name: "AI Integration", score: 94, description: "Generative AI pipelines, UI prompt libraries, chatbot UI workflows.", focus: ["Prompt Architectures", "AI Assistant Interfaces", "Automated Workflows"] },
  ];

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
    <section className="relative py-24 bg-[#f5f5f5] dark:bg-[#080808] text-black dark:text-white transition-colors duration-300">
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-[#9D4EDD]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION 02: DESIGN DNA */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold-light">Visual DNA Blueprint</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#111318] dark:text-white">
            DESIGN <span className="text-gradient-gold">DNA</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mt-4 shadow-[0_0_8px_#D4A017]" />
          <p className="text-[#4B5563] dark:text-gray-400 mt-4 max-w-xl text-sm leading-relaxed">
            Interactive breakdown of design expertise. Hover over any spoke or outer metric label to inspect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Panel: SVG Radar Chart (7 cols) */}
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[400px]">
            <svg 
              viewBox="0 0 350 350" 
              className="w-full max-w-[450px] h-auto overflow-visible"
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
                    className="fill-none stroke-black/5 dark:stroke-white/10"
                    strokeWidth="0.75"
                  />
                );
              })}

              {/* Spoke lines */}
              {Array.from({ length: totalPoints }).map((_, idx) => {
                const endCoords = getCoordinates(idx, 1.0);
                return (
                  <line
                    key={idx}
                    x1={cx}
                    y1={cy}
                    x2={endCoords.x}
                    y2={endCoords.y}
                    className="stroke-black/5 dark:stroke-white/10"
                    strokeWidth="1.0"
                  />
                );
              })}

              {/* Data Polygon Glow Background (Dark mode only) */}
              <polygon
                points={dataPoints}
                className="fill-gold/10 dark:fill-gold/15 stroke-none"
                filter="url(#radarGlow)"
              />

              {/* Data Polygon Main border */}
              <polygon
                points={dataPoints}
                className="fill-transparent stroke-gold dark:stroke-[#FFCC4D]"
                strokeWidth="2.0"
              />

              {/* Interactive nodes */}
              {metrics.map((m, idx) => {
                const coords = getCoordinates(idx, m.score / 100);
                const isHovered = hoveredIdx === idx;
                return (
                  <g 
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isHovered ? 6 : 4.5}
                      className="fill-black dark:fill-[#080808] stroke-gold dark:stroke-[#FFCC4D] transition-all duration-300"
                      strokeWidth="2.0"
                    />
                  </g>
                );
              })}

              {/* Text labels outside radar circles */}
              {metrics.map((m, idx) => {
                const labelCoords = getCoordinates(idx, 1.18);
                const isHovered = hoveredIdx === idx;
                
                // Adjust alignment based on angle position
                let textAnchor: "start" | "middle" | "end" = "middle";
                if (labelCoords.x < cx - 10) textAnchor = "end";
                if (labelCoords.x > cx + 10) textAnchor = "start";

                return (
                  <text
                    key={idx}
                    x={labelCoords.x}
                    y={labelCoords.y + 4} // small vertical offset
                    textAnchor={textAnchor}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`font-mono text-[9px] uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                      isHovered ? "fill-gold font-bold scale-105" : "fill-[#667085] dark:fill-gray-500"
                    }`}
                  >
                    {m.name}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Right Panel: Detail Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center min-h-[350px]">
            <AnimatePresence mode="wait">
              {hoveredIdx !== null ? (
                <motion.div
                  key={hoveredIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-lg glass-card border border-[#D6D9DE] dark:border-gold/30 bg-white dark:bg-black/40 relative shadow-xl text-[#111318] dark:text-white"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-transparent" />
                  
                  <div className="flex items-center space-x-2 text-gold mb-3">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">DNA_METRIC_SYS</span>
                  </div>

                  <h3 className="text-xl font-black text-[#111318] dark:text-white uppercase tracking-wider mb-2">
                    {metrics[hoveredIdx].name}
                  </h3>
                  
                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-3xl font-black text-gold">{metrics[hoveredIdx].score}%</span>
                    <span className="text-[10px] text-[#667085] dark:text-gray-500 uppercase tracking-widest font-mono">proficiency score</span>
                  </div>

                  <p className="text-xs text-[#4B5563] dark:text-gray-300 leading-relaxed mb-6">
                    {metrics[hoveredIdx].description}
                  </p>

                  <div className="border-t border-black/5 dark:border-white/5 pt-4">
                    <span className="text-[10px] text-[#667085] dark:text-gray-400 uppercase tracking-wider block mb-2.5 font-bold">Key Focus Objectives</span>
                    <div className="space-y-2">
                      {metrics[hoveredIdx].focus.map((f, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-[#111318] dark:text-gray-200">
                          <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="p-8 rounded-lg glass-card border border-[#D6D9DE] dark:border-white/5 bg-white dark:bg-black/10 flex flex-col items-center justify-center text-center text-gray-500 py-16 shadow-lg">
                  <Sparkles className="w-8 h-8 text-gray-600 mb-4 animate-pulse" />
                  <p className="text-xs max-w-xs leading-relaxed uppercase tracking-wider font-mono">
                    Select or hover over any node in the DNA matrix chart to explore skill ratings and metrics.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
