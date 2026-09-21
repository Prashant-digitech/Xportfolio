"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Type, Palette, Sparkles, Sliders, LayoutGrid, CheckCircle
} from "lucide-react";

export default function DesignSystemShowcase() {
  const [activeTab, setActiveTab] = useState<"colors" | "typo" | "buttons" | "cards" | "spacing">("colors");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors = [
    { name: "Luxury Gold", hex: "#D4A017", variable: "--primary", desc: "Main brand highlights & accents" },
    { name: "Cyberpunk Blue", hex: "#00F0FF", variable: "--accent-blue", desc: "Special features & terminal text" },
    { name: "Neon Violet", hex: "#9D4EDD", variable: "--accent-violet", desc: "Creative workflows & interactive states" },
    { name: "Deep Charcoal", hex: "#0D0D0D", variable: "--card", desc: "Glassmorphic card backgrounds" },
    { name: "Pitch Black", hex: "#050505", variable: "--bg", desc: "Global system background" },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <section className="relative py-24 bg-[#f5f5f5] dark:bg-[#080808] text-black dark:text-white transition-colors duration-300">
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION 07: DESIGN SYSTEM SHOWCASE */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold-light">How I Build Products</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#111318] dark:text-white">
            DESIGN <span className="text-gradient-gold">SYSTEM</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mt-4 shadow-[0_0_8px_#D4A017]" />
          <p className="text-[#4B5563] dark:text-gray-400 mt-4 max-w-xl text-sm leading-relaxed">
            Explore the atomic tokens, components, and variables that form the visual foundation of Prashant's products.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 border-b border-black/5 dark:border-white/5 pb-8">
          <button
            onClick={() => setActiveTab("colors")}
            className={`flex items-center space-x-2 px-5 py-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === "colors" ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-md font-extrabold" : "bg-white dark:bg-black/10 border border-[#D6B95A] dark:border-white/5 text-[#374151] dark:text-gray-400 hover:border-[#D4AF37] hover:text-[#111318] dark:hover:text-white"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Colors & Tokens</span>
          </button>
          <button
            onClick={() => setActiveTab("typo")}
            className={`flex items-center space-x-2 px-5 py-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === "typo" ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-md font-extrabold" : "bg-white dark:bg-black/10 border border-[#D6B95A] dark:border-white/5 text-[#374151] dark:text-gray-400 hover:border-[#D4AF37] hover:text-[#111318] dark:hover:text-white"
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Typography</span>
          </button>
          <button
            onClick={() => setActiveTab("buttons")}
            className={`flex items-center space-x-2 px-5 py-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === "buttons" ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-md font-extrabold" : "bg-white dark:bg-black/10 border border-[#D6B95A] dark:border-white/5 text-[#374151] dark:text-gray-400 hover:border-[#D4AF37] hover:text-[#111318] dark:hover:text-white"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Buttons & States</span>
          </button>
          <button
            onClick={() => setActiveTab("cards")}
            className={`flex items-center space-x-2 px-5 py-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === "cards" ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-md font-extrabold" : "bg-white dark:bg-black/10 border border-[#D6B95A] dark:border-white/5 text-[#374151] dark:text-gray-400 hover:border-[#D4AF37] hover:text-[#111318] dark:hover:text-white"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Card Architecture</span>
          </button>
        </div>

        {/* Tab display panels */}
        <div className="border border-[#D6D9DE] dark:border-white/10 rounded-xl bg-white dark:bg-[#0a0a0a] p-8 min-h-[350px] shadow-xl relative text-[#111318] dark:text-white">
          
          {/* Colors Tab */}
          {activeTab === "colors" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b border-black/5 dark:border-white/5 pb-4">
                <h3 className="text-lg font-black text-[#111318] dark:text-white uppercase tracking-wider">Accent Systems & Variable Tokens</h3>
                <p className="text-xs text-[#4B5563] dark:text-gray-400 mt-1">Click any swatch to copy the hexadecimal token to your clipboard.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {colors.map((c, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCopy(c.hex)}
                    className="group p-4 border border-[#D6D9DE] dark:border-white/5 rounded-lg bg-black/[0.02] dark:bg-white/[0.01] hover:border-gold/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div 
                      className="w-full aspect-square rounded-md mb-4 shadow-inner border border-black/10 dark:border-white/10 relative overflow-hidden"
                      style={{ backgroundColor: c.hex }}
                    >
                      {copiedColor === c.hex && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs font-bold text-gold">
                          COPIED
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-[#111318] dark:text-white uppercase tracking-wider group-hover:text-gold transition-colors">{c.name}</h4>
                      <span className="text-[10px] text-[#667085] dark:text-gray-500 font-mono block mt-1">{c.variable} ({c.hex})</span>
                      <p className="text-[10px] text-[#4B5563] dark:text-gray-400 mt-2 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Typography Tab */}
          {activeTab === "typo" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b border-black/5 dark:border-white/5 pb-4">
                <h3 className="text-lg font-black text-[#111318] dark:text-white uppercase tracking-wider">Typography Hierarchy</h3>
                <p className="text-xs text-[#4B5563] dark:text-gray-400 mt-1">Atomic fonts and size scales optimized for high-readability layout ratios.</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-black/5 dark:border-white/5 pb-4 items-baseline">
                  <div className="md:col-span-3 text-[10px] text-[#667085] dark:text-gray-500 font-mono font-bold uppercase tracking-wider">H1 // Display</div>
                  <div className="md:col-span-9">
                    <h1 className="text-4xl md:text-5xl font-black text-[#111318] dark:text-white tracking-tight uppercase leading-none">PRASHANT SISODHIYA</h1>
                    <span className="text-[9px] text-[#667085] dark:text-gray-500 font-mono block mt-2">font-black tracking-tight leading-none text-4xl/5xl</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-black/5 dark:border-white/5 pb-4 items-baseline">
                  <div className="md:col-span-3 text-[10px] text-[#667085] dark:text-gray-500 font-mono font-bold uppercase tracking-wider">H2 // Section Title</div>
                  <div className="md:col-span-9">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111318] dark:text-white uppercase tracking-wider">DESIGN PROCESS STAGES</h2>
                    <span className="text-[9px] text-[#667085] dark:text-gray-500 font-mono block mt-2">font-extrabold tracking-wider text-2xl/3xl</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                  <div className="md:col-span-3 text-[10px] text-[#667085] dark:text-gray-500 font-mono font-bold uppercase tracking-wider">Body // Paragraph</div>
                  <div className="md:col-span-9">
                    <p className="text-xs sm:text-sm text-[#4B5563] dark:text-gray-400 leading-relaxed max-w-xl">
                      Crafting luxury glassmorphic visual layouts prioritizes the user journey, reinforce high-end branding directives, and achieves pixel-perfect alignment.
                    </p>
                    <span className="text-[9px] text-[#667085] dark:text-gray-500 font-mono block mt-2">font-normal leading-relaxed text-xs/sm</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Buttons Tab */}
          {activeTab === "buttons" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b border-black/5 dark:border-white/5 pb-4">
                <h3 className="text-lg font-black text-[#111318] dark:text-white uppercase tracking-wider">Component Buttons & Action Trigger States</h3>
                <p className="text-xs text-[#4B5563] dark:text-gray-400 mt-1">Vibrant visual states mapping key click and action cues.</p>
              </div>

              <div className="flex flex-wrap gap-8 items-center py-6">
                {/* Primary Button */}
                <div className="space-y-2.5">
                  <span className="text-[9px] text-[#667085] dark:text-gray-500 uppercase font-mono block">Primary Action Button</span>
                  <button className="px-6 py-2.5 rounded bg-gradient-to-r from-gold-dark to-gold text-black font-extrabold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(212,160,23,0.35)] hover:shadow-[0_0_25px_rgba(212,160,23,0.7)] transition-all duration-300 cursor-pointer">
                    HIRE ME NOW
                  </button>
                </div>

                {/* Secondary Outline */}
                <div className="space-y-2.5">
                  <span className="text-[9px] text-[#667085] dark:text-gray-500 uppercase font-mono block">Secondary Outline Action</span>
                  <button className="px-6 py-2.5 rounded border border-[#D6B95A] dark:border-white/10 hover:border-gold hover:text-gold text-[#111318] dark:text-white font-extrabold text-xs uppercase tracking-widest bg-transparent transition-colors duration-300 cursor-pointer">
                    CASE STUDY FILES
                  </button>
                </div>

                {/* Cyberpunk Accent */}
                <div className="space-y-2.5">
                  <span className="text-[9px] text-[#667085] dark:text-gray-500 uppercase font-mono block">System Console Toggle</span>
                  <button className="px-5 py-2.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] font-extrabold text-xs uppercase tracking-widest shadow-[0_0_12px_rgba(0,240,255,0.15)] hover:bg-[#00F0FF]/20 transition-all duration-300 cursor-pointer">
                    RUN COMMAND
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Cards Tab */}
          {activeTab === "cards" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="border-b border-black/5 dark:border-white/5 pb-4">
                <h3 className="text-lg font-black text-[#111318] dark:text-white uppercase tracking-wider">Glassmorphic Card Architecture</h3>
                <p className="text-xs text-[#4B5563] dark:text-gray-400 mt-1">Multi-layered glass reflection styling designed for maximum dark-mode elegance.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                {/* Standard Glass Card */}
                <div className="p-6 rounded-lg glass-card border border-[#D6D9DE] dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/50 via-gold/10 to-transparent" />
                  <div className="flex items-center space-x-2 text-gold mb-3">
                    <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-wider font-mono">GOLDEN_REFLECTION_FRAME</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-[#111318] dark:text-white mb-2 uppercase tracking-wide">Figma Design System Card</h4>
                  <p className="text-xs text-[#4B5563] dark:text-gray-400 leading-relaxed">
                    Uses a 1.5px semi-transparent golden border, deep background blur backdrop filter (20px), and subtle box shadow aura glows.
                  </p>
                </div>

                {/* Neon Cyan Glass Card */}
                <div className="p-6 rounded-lg glass-card border border-[#00F0FF]/30 dark:border-[#00F0FF]/20 bg-white dark:bg-white/[0.02] shadow-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00F0FF]/60 via-[#00F0FF]/15 to-transparent" />
                  <div className="flex items-center space-x-2 text-[#00F0FF] mb-3">
                    <CheckCircle className="w-4.5 h-4.5 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-wider font-mono">CYBERPUNK_CYAN_FRAME</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-[#111318] dark:text-white mb-2 uppercase tracking-wide">AI Prompt Interface Card</h4>
                  <p className="text-xs text-[#4B5563] dark:text-gray-400 leading-relaxed">
                    Employs cyan accent glow, high-contrast border sizing, and subtle drop shadow overlays designed to support system data grids.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
