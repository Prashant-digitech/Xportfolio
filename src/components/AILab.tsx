"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, Terminal, Command, Code, Sparkles, ChevronRight, Play, Database, RefreshCw
} from "lucide-react";

export default function AILab() {
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [isRunningAgent, setIsRunningAgent] = useState<boolean>(false);
  const [consoleOutput, setConsoleOutput] = useState<string>("SYSTEM: Idle. Ready to initiate Agent runs.");

  const promptExperiments = [
    {
      title: "Context-Aware UI Synthesis",
      prompt: "SYSTEM: You are a creative UI synthesizer. Generate a glassmorphism card component with CSS variables, matching --primary gold and --bg #050505.",
      variables: "Temp: 0.2 | TopP: 0.9 | MaxTokens: 512",
      output: "✓ Code synthesized. Card border-gold/40, blur: 20px, shadow: gold/15. Component rendering at 60 FPS."
    },
    {
      title: "Recruiter Assistant Orchestrator",
      prompt: "AGENT: Parse applicant CV for keywords: 'MTech', 'UI/UX', 'After Effects'. Compare with verified VTU credentials.",
      variables: "Temp: 0.0 | TopP: 1.0 | RAG: active",
      output: "✓ Match found: Prashant Sisodhiya (MTech production management, 2012 Silver Medal, 3+ years experience, CCNA certified)."
    },
    {
      title: "Video Edit Asset Generator",
      prompt: "PROMPT: Generate motion graphics assets matching cinematic showreel tracks. Output SVG double-helix coordinates.",
      variables: "Temp: 0.7 | TopP: 0.8 | Model: Midjourney v6",
      output: "✓ Vector path generated. 12 coordinates mapped. SVG double-helix golden rope separator generated."
    }
  ];

  const handleRunAgent = async () => {
    setIsRunningAgent(true);
    const targetPrompt = promptExperiments[activePromptIndex].prompt;
    setConsoleOutput(`AGENT: Querying OpenRouter model priority stack... [Primary: qwen/qwen3-coder:free]`);
    
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: targetPrompt, temperature: 0.2 }),
      });
      const data = await res.json();
      if (data.success && data.content) {
        setConsoleOutput(`[Model: ${data.modelUsed || "qwen3-coder:free"}] ${data.content}`);
      } else {
        setConsoleOutput(promptExperiments[activePromptIndex].output);
      }
    } catch {
      setConsoleOutput(promptExperiments[activePromptIndex].output);
    } finally {
      setIsRunningAgent(false);
    }
  };

  return (
    <section id="lab" className="relative py-24 bg-[#f8f8f8] dark:bg-[#090A0E] text-black dark:text-white transition-colors duration-300">
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION 19: AI FUTURE VISION */}
        <div className="mb-24">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold-light">Designing The Future</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-white">
              AI FUTURE <span className="text-gradient-gold">VISION</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mt-4 shadow-[0_0_8px_#D4A017]" />
            <p className="text-gray-400 mt-4 max-w-xl text-sm leading-relaxed">
              Prashant's focus vectors mapping human-centered AI interfaces, generative systems, and creative technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI UX Layouts", desc: "Crafting interfaces that explain model reasoning, handle latent uncertainty, and streamline human prompt structures." },
              { title: "Human Centered AI", desc: "Placing the human user in control loop. Visualizing model confidence weights and data source compliance." },
              { title: "AI Agent Interfaces", desc: "Multi-agent dashboards tracking status, logs, subagent delegation tasks, and manual confirmation hooks." },
              { title: "Generative Systems", desc: "Orchestrating design tokens, layouts, and motion templates dynamically using generative text prompts." },
              { title: "Prompt Engineering", desc: "Constructing system instructions, few-shot templates, and retrieval context bounds for assistant systems." },
              { title: "Creative Technology", desc: "Combining Three.js, Canvas graphics, engineering math, and code variables to build premium interfaces." }
            ].map((v, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-lg glass-card border border-white/5 bg-black/15 hover:border-gold/30 hover:shadow-[0_0_15px_rgba(212,160,23,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2 text-gold mb-3.5">
                    <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-wider font-mono">VISION_NODE_{idx + 1}</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-white uppercase tracking-wider mb-2">{v.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
                <div className="border-t border-white/5 pt-3.5 mt-4 text-[9px] font-mono text-gray-600 font-bold uppercase tracking-widest flex items-center justify-between">
                  <span>ACTIVE R&D</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 20: PROMPT ENGINEERING LAB & SECTION 22: AI PROJECTS LAB */}
        <div>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold-light">Orchestration & Workflow Console</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-white">
              PROMPT & AI <span className="text-gradient-gold">LAB</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mt-4 shadow-[0_0_8px_#D4A017]" />
            <p className="text-gray-400 mt-4 max-w-xl text-sm leading-relaxed">
              Futuristic prompt engineering simulator. Toggle the tabs below to verify systems prompts and run mock RAG agents.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0d0d0d] shadow-2xl relative">
            {/* Topbar Tab Controls */}
            <div className="bg-[#171717] px-4 py-3 border-b border-white/5 flex flex-wrap gap-2 items-center">
              <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest mr-4">PROMPT_ENGINEER_SIM</span>
              <div className="flex gap-2">
                {promptExperiments.map((exp, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActivePromptIndex(idx); setConsoleOutput("SYSTEM: Prompt loaded. Ready to run agent."); }}
                    className={`px-3 py-1.5 rounded border text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      activePromptIndex === idx ? "bg-gold text-black border-gold font-extrabold" : "bg-black/20 border-white/5 text-gray-400 hover:border-gold hover:text-white"
                    }`}
                  >
                    {exp.title.split(" ")[0]} Lab
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[350px]">
              
              {/* Input Terminal (6 cols) */}
              <div className="md:col-span-6 p-6 bg-[#080808] border-r border-white/5 flex flex-col justify-between">
                <div className="space-y-4 font-mono text-[10px] text-gray-400">
                  <div>
                    <span className="text-gray-500 block mb-1 uppercase tracking-widest text-[8px] font-bold">System Configuration</span>
                    <span className="text-white bg-white/[0.02] border border-white/5 p-2 rounded block">
                      {promptExperiments[activePromptIndex].variables}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1 uppercase tracking-widest text-[8px] font-bold">Input Prompt System</span>
                    <p className="text-gray-300 leading-relaxed bg-black/40 border border-white/5 p-4 rounded min-h-[120px]">
                      {promptExperiments[activePromptIndex].prompt}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={handleRunAgent}
                    disabled={isRunningAgent}
                    className="px-5 py-2 rounded bg-gold text-black font-extrabold text-[10px] uppercase tracking-wider cursor-pointer disabled:opacity-50 flex items-center space-x-2 shadow-[0_0_12px_rgba(212,160,23,0.2)]"
                  >
                    {isRunningAgent ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>Run RAG Agent</span>
                  </button>
                </div>
              </div>

              {/* Output Console Monitor (6 cols) */}
              <div className="md:col-span-6 p-6 bg-[#0b0b0b] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-gray-500 font-mono text-[9px] border-b border-white/5 pb-2 mb-4">
                    <span className="flex items-center space-x-1.5"><Terminal className="w-3.5 h-3.5 text-[#00F0FF]" /> <span>CONSOLE_OUTPUT</span></span>
                    <span className="text-[8px]">LOGS_SYS: OK</span>
                  </div>
                  <div className="bg-black/30 border border-white/5 p-4 rounded min-h-[180px] font-mono text-[10px] text-[#00F0FF] leading-relaxed whitespace-normal break-all">
                    {consoleOutput}
                  </div>
                </div>

                {/* Section 22: AI Project Schema */}
                <div className="border-t border-white/5 pt-4 text-xs font-mono text-gray-500 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <Database className="w-4 h-4 text-gold" />
                    <span className="text-[9px] uppercase tracking-widest font-bold">RAG_PIPELINE: ACTIVE</span>
                  </div>
                  <span className="text-[9px] text-[#00F0FF]">VECTOR_DIM: 1536</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
