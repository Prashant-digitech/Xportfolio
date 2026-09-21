"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layers, Settings, Play, CheckCircle, Code, Eye, MousePointer
} from "lucide-react";

type FigmaStage = "sketch" | "wireframe" | "midfi" | "hifi" | "proto" | "code";

export default function FigmaLab() {
  const [activeStage, setActiveStage] = useState<FigmaStage>("sketch");

  const stages = [
    { id: "sketch", label: "Sketch" },
    { id: "wireframe", label: "Wireframe" },
    { id: "midfi", label: "Mid Fidelity" },
    { id: "hifi", label: "High Fidelity" },
    { id: "proto", label: "Prototype" },
    { id: "code", label: "Dev Ready" },
  ];

  return (
    <section className="relative py-24 bg-[#f8f8f8] dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION 08: FIGMA LAB */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold-light">Product Playground</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#111318] dark:text-white">
            FIGMA <span className="text-gradient-gold">LAB</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mt-4 shadow-[0_0_8px_#D4A017]" />
          <p className="text-[#4B5563] dark:text-gray-400 mt-4 max-w-xl text-sm leading-relaxed">
            Interactive Figma workspace emulation. Toggle the stages below to witness the canvas design scale from rough sketch to clean code.
          </p>
        </div>

        {/* Stage Selector Toggles */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {stages.map((stg) => (
            <button
              key={stg.id}
              onClick={() => setActiveStage(stg.id as FigmaStage)}
              className={`px-5 py-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeStage === stg.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-md scale-105 font-extrabold"
                  : "bg-white dark:bg-black/15 border border-[#D6B95A] dark:border-white/5 text-[#374151] dark:text-gray-400 hover:border-[#D4AF37] hover:text-[#111318] dark:hover:text-white"
              }`}
            >
              {stg.label}
            </button>
          ))}
        </div>

        {/* Realistic Figma workspace wrapper */}
        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#171717] shadow-2xl relative">
          
          {/* Topbar Tab and Controls */}
          <div className="bg-[#2c2c2c] px-4 py-3 border-b border-black/15 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-gold/10 flex items-center justify-center text-gold text-[10px] font-bold">F</div>
              <span className="font-bold font-mono tracking-wider">figma_lab_canvas.fig</span>
            </div>
            <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">STAGE: {activeStage.toUpperCase()}_STAGE</div>
            <div className="flex items-center space-x-4">
              <span className="text-gold flex items-center space-x-1"><Eye className="w-3.5 h-3.5" /> <span>100%</span></span>
              <span className="h-4 w-[1px] bg-white/10" />
              <button className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold rounded text-[10px] font-bold uppercase cursor-pointer">
                Share
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px] bg-[#1e1e1e]">
            
            {/* Left Sidebar: Layers Panel (3 cols) */}
            <div className="md:col-span-3 border-r border-black/15 bg-[#2c2c2c] p-4 flex flex-col space-y-4 font-mono text-[10px] text-gray-400">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-bold flex items-center space-x-1.5"><Layers className="w-3.5 h-3.5 text-gold" /> <span>Layers</span></span>
                <span className="text-[8px] text-gray-500 font-bold uppercase">PAGE 1</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 pl-2">
                  <span className="text-gray-600">↳</span>
                  <span className="text-gray-300 font-bold"># Frame 1 // Hero</span>
                </div>
                <div className="flex items-center space-x-2 pl-4">
                  <span className="text-gray-600">↳</span>
                  <span>[T] TitleText</span>
                </div>
                <div className="flex items-center space-x-2 pl-4">
                  <span className="text-gray-600">↳</span>
                  <span>[R] PortraitImg</span>
                </div>
                <div className="flex items-center space-x-2 pl-4">
                  <span className="text-gray-600">↳</span>
                  <span>[G] GlowHalo</span>
                </div>
                <div className="flex items-center space-x-2 pl-2 border-t border-white/5 pt-2">
                  <span className="text-gray-600">↳</span>
                  <span># Frame 2 // Stats</span>
                </div>
              </div>
            </div>

            {/* Center Area: Emulated Canvas (6 cols) */}
            <div className="md:col-span-6 p-8 bg-[#1e1e1e] flex items-center justify-center overflow-hidden relative">
              
              {/* Canvas grid background lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:20px_20px]" />

              <div className="relative w-full max-w-[320px] aspect-[4/5] rounded border border-white/10 shadow-lg relative bg-[#0d0d0d] overflow-hidden z-10">
                <AnimatePresence mode="wait">
                  
                  {/* Sketch Stage */}
                  {activeStage === "sketch" && (
                    <motion.div
                      key="sketch"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between text-gray-500 font-mono text-[9px]"
                    >
                      <div className="border border-dashed border-gray-600 rounded p-2 text-center">[rough header idea]</div>
                      <div className="my-auto flex flex-col items-center space-y-4">
                        <div className="w-24 h-24 rounded-full border border-dashed border-gray-600 flex items-center justify-center">[portrait circle]</div>
                        <div className="h-6 border border-dashed border-gray-600 w-full flex items-center justify-center">[some title text here]</div>
                      </div>
                      <div className="border border-dashed border-gray-600 rounded p-2 text-center">[floating details...]</div>
                    </motion.div>
                  )}

                  {/* Wireframe Stage */}
                  {activeStage === "wireframe" && (
                    <motion.div
                      key="wireframe"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between bg-[#0e0e0e] text-gray-500 font-mono text-[9px]"
                    >
                      <div className="border border-white/10 rounded p-2 text-center bg-white/[0.01]">HEADER_WRAP</div>
                      <div className="my-auto flex flex-col items-center space-y-4">
                        <div className="w-24 h-24 rounded-full border border-white/10 bg-white/[0.01] flex items-center justify-center relative">
                          <span className="text-[8px] text-gray-600">[PORTRAIT]</span>
                        </div>
                        <div className="h-6 border border-white/10 bg-white/[0.01] w-full flex items-center justify-center">[TITLE_CONTAINER]</div>
                      </div>
                      <div className="border border-white/10 rounded p-2 text-center bg-white/[0.01]">NAV_DIVIDER</div>
                    </motion.div>
                  )}

                  {/* Mid Fidelity Stage */}
                  {activeStage === "midfi" && (
                    <motion.div
                      key="midfi"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between bg-[#0f0f0f] text-gray-400 font-sans text-xs"
                    >
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="font-bold text-[9px]">Prashant Sisodhiya</span>
                        <span className="text-[8px] border border-white/10 px-1 rounded">V1.2</span>
                      </div>
                      <div className="my-auto flex flex-col items-center space-y-3">
                        <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[10px] text-gray-500">[User Image]</div>
                        <div className="h-4 bg-white/[0.03] border border-white/10 rounded w-2/3" />
                        <div className="h-6 bg-white/[0.03] border border-white/10 rounded w-full" />
                      </div>
                      <div className="h-8 bg-white/[0.02] border border-white/10 rounded" />
                    </motion.div>
                  )}

                  {/* High Fidelity Stage */}
                  {activeStage === "hifi" && (
                    <motion.div
                      key="hifi"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-b from-[#050505] to-[#0d0d0d] text-white"
                    >
                      <div className="flex justify-between items-center border-b border-gold/20 pb-2">
                        <span className="font-extrabold text-[10px] text-gradient-gold">PRASHANT S.</span>
                        <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                      </div>
                      <div className="my-auto flex flex-col items-center space-y-4">
                        <div className="relative w-20 h-20 rounded-full border border-gold bg-[#0d0d0d] shadow-[0_0_15px_rgba(212,160,23,0.3)] overflow-hidden flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border border-dashed border-gold/40 animate-spin-slow" />
                        </div>
                        <div className="text-center">
                          <h4 className="font-black text-sm uppercase">UI/UX DESIGNER</h4>
                          <span className="text-[9px] text-gold-light font-bold mt-1 block">AVAILABLE FOR PROJECTS</span>
                        </div>
                      </div>
                      <div className="p-2 border border-gold/20 bg-gold/5 rounded text-center text-[9px] font-bold text-gold">
                        LAUNCH PORTFOLIO
                      </div>
                    </motion.div>
                  )}

                  {/* Prototype Stage */}
                  {activeStage === "proto" && (
                    <motion.div
                      key="proto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-b from-[#050505] to-[#0d0d0d] text-white font-mono text-[9px]"
                    >
                      <div className="flex justify-between items-center border-b border-gold/20 pb-2">
                        <span className="text-gold font-bold">PROTO_LOCK</span>
                        <span className="text-gray-500">V4.0</span>
                      </div>
                      
                      <div className="my-auto space-y-4">
                        {/* Simulated links drawing connection */}
                        <div className="p-2 border border-[#00F0FF]/30 bg-[#00F0FF]/5 rounded relative">
                          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
                          <span>Button Target A</span>
                        </div>
                        <div className="h-6 w-[2px] bg-[#00F0FF]/40 ml-auto mr-1 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />
                        </div>
                        <div className="p-2 border border-[#00F0FF]/30 bg-[#00F0FF]/5 rounded relative">
                          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#00F0FF]" />
                          <span>Interactive State B</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 text-[#00F0FF]">
                        <MousePointer className="w-3.5 h-3.5 animate-bounce" />
                        <span className="text-[8px]">ACTIVE PROTOTYPE</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Code / Dev Ready Stage */}
                  {activeStage === "code" && (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-5 flex flex-col justify-between bg-[#0b0b0b] text-[#00F0FF] font-mono text-[8.5px] leading-relaxed"
                    >
                      <div className="flex justify-between items-center border-b border-white/5 pb-2 text-gray-500">
                        <span>export_components.tsx</span>
                        <span className="text-[#00F0FF] font-bold">TYPESCRIPT</span>
                      </div>
                      
                      <div className="my-auto overflow-hidden bg-black/40 p-3 rounded border border-white/5">
                        <span className="text-gray-500 block mb-1">{"// Next.js React Component"}</span>
                        <span>{"export default function Hero() {"}</span>
                        <span className="block">{"  const state = useAccent();"}</span>
                        <span className="block">{"  return ("}</span>
                        <span className="block text-gold">{"    <div className='hero-halo'>"}</span>
                        <span className="block text-gold">{"      <h1>Prashant S.</h1>"}</span>
                        <span className="block text-gold">{"    </div>"}</span>
                        <span className="block">{"  );"}</span>
                        <span>{"}"}</span>
                      </div>

                      <div className="flex items-center space-x-1 text-gray-500 font-bold uppercase">
                        <Code className="w-3.5 h-3.5" />
                        <span>Production Ready Code</span>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>

            {/* Right Sidebar: Properties Panel (3 cols) */}
            <div className="md:col-span-3 border-l border-black/15 bg-[#2c2c2c] p-4 flex flex-col space-y-6 font-mono text-[10px] text-gray-400">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-bold flex items-center space-x-1.5"><Settings className="w-3.5 h-3.5 text-gold" /> <span>Properties</span></span>
                <span className="text-[8px] text-gray-500 font-bold uppercase">DESIGN</span>
              </div>
              
              <div className="space-y-4">
                {/* Dimensions */}
                <div>
                  <span className="text-gray-500 block mb-1.5 uppercase tracking-wider text-[8px]">Dimensions</span>
                  <div className="grid grid-cols-2 gap-2 text-white font-bold">
                    <div className="p-1.5 border border-white/5 bg-white/[0.02] rounded">W: 320px</div>
                    <div className="p-1.5 border border-white/5 bg-white/[0.02] rounded">H: 400px</div>
                  </div>
                </div>

                {/* Grid layout settings */}
                <div>
                  <span className="text-gray-500 block mb-1.5 uppercase tracking-wider text-[8px]">Layout Grid</span>
                  <div className="p-1.5 border border-white/5 bg-[#050505]/30 rounded text-xs text-white font-bold flex items-center justify-between">
                    <span>12-column grid</span>
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                  </div>
                </div>

                {/* Auto layout properties */}
                <div>
                  <span className="text-gray-500 block mb-1.5 uppercase tracking-wider text-[8px]">Auto Layout</span>
                  <div className="space-y-1 text-gray-400">
                    <div>Spacing: 16px</div>
                    <div>Padding: 24px</div>
                    <div>Alignment: Center</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
