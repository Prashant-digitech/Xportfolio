"use client";

import { useState } from "react";
import { ProfileData } from "@/app/page";
import { motion } from "framer-motion";
import { 
  Terminal, Shield, Cpu, RefreshCw, Layers, Database, Film, PenTool, Sparkles, Code
} from "lucide-react";
import { useCountUp } from "@/hooks/useAnimations";

interface CommandCenterProps {
  profile: ProfileData;
}

export default function CommandCenter({ profile }: CommandCenterProps) {
  const [activeTab, setActiveTab] = useState<"design" | "video" | "dev" | "ai">("design");

  // Countup targets parsed from profile
  const expTarget = parseInt(profile.experience) || 3;
  const projTarget = parseInt(profile.projects) || 50;
  const certTarget = parseInt(profile.certifications) || 10;

  // Countup refs
  const expCount = useCountUp(expTarget, 1000);
  const projCount = useCountUp(projTarget, 1200);
  const clientCount = useCountUp(30, 1200);
  const certCount = useCountUp(certTarget, 1000);

  const tools = {
    design: [
      { name: "Figma", level: "Expert", desc: "Design systems, UI components, prototyping." },
      { name: "Adobe Photoshop", level: "Advanced", desc: "Creative composites, photo editing, assets." },
      { name: "Adobe Illustrator", level: "Advanced", desc: "Vector artwork, brand logos, typography." },
      { name: "Canva Pro", level: "Intermediate", desc: "Rapid social collateral & design layout templates." },
    ],
    video: [
      { name: "Adobe Premiere Pro", level: "Expert", desc: "Non-linear video editor, grading, pacing." },
      { name: "Adobe After Effects", level: "Advanced", desc: "Kinetic motion design, visual effects, tracking." },
      { name: "Adobe Audition", level: "Advanced", desc: "Sound design, noise cleanups, dialog balancing." },
    ],
    dev: [
      { name: "React / Next.js", level: "Advanced", desc: "Interactive frontend design systems & routers." },
      { name: "HTML5 / CSS3 / Tailwind", level: "Expert", desc: "Responsive high-DPI modern markup layouts." },
      { name: "JavaScript / TypeScript", level: "Advanced", desc: "Interactive functional logic & animation hooks." },
      { name: "PHP / WordPress / Bootstrap", level: "Intermediate", desc: "Template structures & client CMS dashboards." },
    ],
    ai: [
      { name: "ChatGPT / Claude / Gemini", level: "Expert", desc: "Prompt architectures & custom assistant logic." },
      { name: "Midjourney / Stable Diffusion", level: "Expert", desc: "Generative design models and creative prompt runs." },
      { name: "Cursor / Copilot", level: "Advanced", desc: "AI-assisted coding workflows and automated scripts." },
    ]
  };

  return (
    <section className="relative py-24 bg-[#f8f8f8] dark:bg-[#050505] text-black dark:text-white overflow-hidden transition-colors duration-300">
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-[#00F0FF]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* SECTION 01: AI COMMAND CENTER */}
        <div className="mb-24">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold-light">System Dashboard</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#111318] dark:text-white">
              AI COMMAND <span className="text-gradient-gold">CENTER</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mt-4 shadow-[0_0_8px_#D4A017]" />
            <p className="text-[#4B5563] dark:text-gray-400 mt-4 max-w-xl text-sm leading-relaxed">
              Futuristic mission control terminal monitoring Prashant's real-time workload, focuses, and credentials.
            </p>
          </div>

          {/* Grid Layout Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Terminal Live Card (5 cols) */}
            <div className="md:col-span-5 p-6 rounded-lg glass-card border border-white/10 flex flex-col justify-between relative overflow-hidden bg-black/40">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
              
              <div>
                <div className="flex items-center justify-between mb-4 text-[#00F0FF] font-mono text-[10px] tracking-wider">
                  <div className="flex items-center space-x-1.5">
                    <Terminal className="w-4 h-4 animate-pulse" />
                    <span>SYS_CORE_MONITOR</span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                </div>
                
                <div className="space-y-4 font-mono text-xs text-gray-300">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">CURRENT STATUS:</span>
                    <span className="text-green-400 font-bold uppercase tracking-wider">{profile.status}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">SYS_ROLE:</span>
                    <span className="text-white font-bold">{profile.title.split("•")[0]}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">PHYSICAL_LOC:</span>
                    <span className="text-white">{profile.location}</span>
                  </div>
                  <div className="flex flex-col border-b border-white/5 pb-2">
                    <span className="text-gray-500 mb-1">SPECIALIZATION:</span>
                    <span className="text-[#00F0FF] flex flex-wrap gap-1 mt-1">
                      {["UX Strategy", "Visual Design", "Video Editing", "Graphics"].map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 border border-[#00F0FF]/25 bg-[#00F0FF]/5 rounded text-[10px] font-bold">{s}</span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Learning stats mini panel */}
              <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs">
                <span className="text-gray-500 uppercase tracking-widest text-[10px] block mb-2">Current Systems Training</span>
                <div className="space-y-2 text-[#9d4edd]">
                  {["AI Engineering", "Generative AI", "AI Product Design"].map((l, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-neon-violet" />
                      <span>{l}</span>
                      <span className="text-[9px] text-gray-500 ml-auto">94% COMPLETED</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Widget (7 cols) */}
            <div className="md:col-span-7 grid grid-cols-2 gap-6">
              
              {/* Exp counter widget */}
              <div ref={expCount.elementRef} className="p-6 rounded-lg glass-card border border-white/5 flex flex-col justify-between bg-black/10 group hover:border-gold/30 transition-all duration-300">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Global Experience</span>
                <div className="my-4">
                  <h3 className="text-4xl sm:text-5xl font-black text-gradient-gold select-none">
                    {expCount.count}+
                  </h3>
                  <span className="text-[10px] text-gray-400">Years of Active Service</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full w-3/4 animate-pulse" />
                </div>
              </div>

              {/* Projects Completed widget */}
              <div ref={projCount.elementRef} className="p-6 rounded-lg glass-card border border-white/5 flex flex-col justify-between bg-black/10 group hover:border-gold/30 transition-all duration-300">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Delivered Systems</span>
                <div className="my-4">
                  <h3 className="text-4xl sm:text-5xl font-black text-gradient-gold select-none">
                    {projCount.count}+
                  </h3>
                  <span className="text-[10px] text-gray-400">Completed Projects</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full w-full animate-pulse" />
                </div>
              </div>

              {/* Client trust metrics */}
              <div ref={clientCount.elementRef} className="p-6 rounded-lg glass-card border border-white/5 flex flex-col justify-between bg-black/10 group hover:border-gold/30 transition-all duration-300">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Client Ecosystem</span>
                <div className="my-4">
                  <h3 className="text-4xl sm:text-5xl font-black text-gradient-gold select-none">
                    {clientCount.count}+
                  </h3>
                  <span className="text-[10px] text-gray-400">Happy Global Clients</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full w-4/5 animate-pulse" />
                </div>
              </div>

              {/* Certifications metrics */}
              <div ref={certCount.elementRef} className="p-6 rounded-lg glass-card border border-white/5 flex flex-col justify-between bg-black/10 group hover:border-gold/30 transition-all duration-300">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Academic Vault</span>
                <div className="my-4">
                  <h3 className="text-4xl sm:text-5xl font-black text-gradient-gold select-none">
                    {certCount.count}+
                  </h3>
                  <span className="text-[10px] text-gray-400">Verified Certifications</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full w-11/12 animate-pulse" />
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* SECTION 09: CREATIVE TOOL STACK (Futuristic OS Interface) */}
        <div>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold-light">Creative Ecosystem</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#111318] dark:text-white">
              CREATIVE TOOL <span className="text-gradient-gold">STACK</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mt-4 shadow-[0_0_8px_#D4A017]" />
            <p className="text-[#4B5563] dark:text-gray-400 mt-4 max-w-xl text-sm leading-relaxed">
              Prashant's primary design, development, and AI tools styled as a futuristic operating system canvas.
            </p>
          </div>

          <div className="border border-white/10 rounded-lg overflow-hidden bg-[#0d0d0d] shadow-2xl relative">
            {/* Window Topbar Chrome */}
            <div className="bg-[#171717] px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">TOOLSTACK_OS_V4.0</div>
              <div className="w-12 h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[350px]">
              {/* Sidebar Tabs (3 cols) */}
              <div className="md:col-span-3 border-r border-white/5 bg-[#080808] p-4 flex flex-col space-y-2">
                <button
                  onClick={() => setActiveTab("design")}
                  className={`w-full py-2.5 px-4 rounded text-left font-bold text-xs uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
                    activeTab === "design" ? "bg-gold text-black" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Design Tools</span>
                </button>
                <button
                  onClick={() => setActiveTab("video")}
                  className={`w-full py-2.5 px-4 rounded text-left font-bold text-xs uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
                    activeTab === "video" ? "bg-gold text-black" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Film className="w-4 h-4" />
                  <span>Video Production</span>
                </button>
                <button
                  onClick={() => setActiveTab("dev")}
                  className={`w-full py-2.5 px-4 rounded text-left font-bold text-xs uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
                    activeTab === "dev" ? "bg-gold text-black" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span>Development</span>
                </button>
                <button
                  onClick={() => setActiveTab("ai")}
                  className={`w-full py-2.5 px-4 rounded text-left font-bold text-xs uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
                    activeTab === "ai" ? "bg-gold text-black" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>AI Assistants</span>
                </button>
              </div>

              {/* Main Content Area (9 cols) */}
              <div className="md:col-span-9 p-8 bg-[#0b0b0b] flex flex-col justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {tools[activeTab].map((tool, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="p-5 border border-white/5 rounded-lg bg-white/[0.02] hover:border-gold/20 hover:bg-white/[0.04] transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-extrabold text-sm text-white">{tool.name}</h4>
                        <span className="text-[9px] uppercase font-bold text-gold px-2 py-0.5 rounded bg-gold/10 border border-gold/25 shadow-sm">
                          {tool.level}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{tool.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
