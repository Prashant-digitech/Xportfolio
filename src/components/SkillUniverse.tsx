"use client";
 
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Network } from "lucide-react";
import { ProfileData } from "@/app/page";
import { useTheme } from "next-themes";

interface SkillNode {
  name: string;
  x: number;
  y: number;
  r: number;
  category: "design" | "video" | "dev" | "sys";
  proficiency: string;
  projects: string[];
}

interface Connection {
  from: number;
  to: number;
}

interface SkillUniverseProps {
  profile: ProfileData;
}

export default function SkillUniverse({ profile }: SkillUniverseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activePanelIdx, setActivePanelIdx] = useState<number | null>(null);
  const { resolvedTheme } = useTheme();

  const nodes: SkillNode[] = [
    { name: "Figma", x: 120, y: 100, r: 25, category: "design", proficiency: "98%", projects: ["E-Commerce App UI", "SaaS Dashboard Redesign"] },
    { name: "Photoshop", x: 60, y: 160, r: 22, category: "design", proficiency: "92%", projects: ["Cinematic Movie Posters", "Branding Assets Pack"] },
    { name: "Illustrator", x: 130, y: 220, r: 20, category: "design", proficiency: "90%", projects: ["Vector Icon Set", "Brand Identity Logo Guideline"] },
    { name: "Canva", x: 50, y: 80, r: 18, category: "design", proficiency: "95%", projects: ["Social Media Campaigns"] },
    
    { name: "Premiere Pro", x: 230, y: 80, r: 24, category: "video", proficiency: "96%", projects: ["YouTube Cinematic Vlog Vids", "Corporate Presentation Video"] },
    { name: "After Effects", x: 280, y: 150, r: 22, category: "video", proficiency: "94%", projects: ["Showreel Motion Graphics Intro", "Animated UI Walkthroughs"] },
    
    { name: "React / Next.js", x: 200, y: 280, r: 26, category: "dev", proficiency: "85%", projects: ["Personal Modern Portfolio App", "AI Chatbot Assistant Plugin"] },
    { name: "HTML / CSS", x: 120, y: 320, r: 20, category: "dev", proficiency: "95%", projects: ["SaaS Landing Page Templates", "Responsive Flexbox Layouts"] },
    { name: "JavaScript", x: 260, y: 330, r: 22, category: "dev", proficiency: "88%", projects: ["Three.js WebGL Wave Canvas", "Liquid Hover Particle Script"] },
    { name: "PHP / WordPress", x: 60, y: 280, r: 18, category: "dev", proficiency: "80%", projects: ["Custom Client Dynamic Portals"] },
    { name: "Bootstrap / Tailwind", x: 290, y: 260, r: 18, category: "dev", proficiency: "92%", projects: ["Glassmorphism Component Library"] },
    
    { name: "Azure Services", x: 330, y: 90, r: 16, category: "sys", proficiency: "75%", projects: ["Cloud Hosting VM Setup"] }
  ];

  // Connections connecting related skills
  const connections: Connection[] = [
    { from: 0, to: 1 }, // Figma -> Photoshop
    { from: 0, to: 2 }, // Figma -> Illustrator
    { from: 1, to: 2 }, // Photoshop -> Illustrator
    { from: 1, to: 3 }, // Photoshop -> Canva
    
    { from: 4, to: 5 }, // Premiere -> After Effects
    { from: 1, to: 5 }, // Photoshop -> After Effects
    { from: 2, to: 5 }, // Illustrator -> After Effects
    
    { from: 6, to: 7 }, // React -> HTML/CSS
    { from: 6, to: 8 }, // React -> JS
    { from: 7, to: 9 }, // HTML/CSS -> PHP/WordPress
    { from: 8, to: 10 }, // JS -> Bootstrap/Tailwind
    { from: 6, to: 10 }, // React -> Bootstrap/Tailwind
    
    { from: 5, to: 6 }, // After Effects -> React (bridge design/dev)
    { from: 5, to: 11 }, // After Effects -> Azure
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let pulseAngle = 0;

    // Track mouse
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // Check collision
      let foundIdx: number | null = null;
      nodes.forEach((n, idx) => {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        if (Math.sqrt(dx * dx + dy * dy) < n.r) {
          foundIdx = idx;
        }
      });
      setHoveredIdx(foundIdx);
    };

    const handleMouseClick = () => {
      if (hoveredIdx !== null) {
        setActivePanelIdx(hoveredIdx);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleMouseClick);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = 400 * dpr;
      canvas.height = 400 * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, 400, 400);

      pulseAngle += 0.04;
      const pulseFactor = 0.5 + 0.5 * Math.sin(pulseAngle);

      // Draw connection lines
      connections.forEach((c) => {
        const fromNode = nodes[c.from];
        const toNode = nodes[c.to];

        const isRelated = hoveredIdx === c.from || hoveredIdx === c.to;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        
        if (isRelated) {
          // Dynamic accent RGB
          let accentRgb = "212, 160, 23"; // gold
          if (profile.accent === "blue") accentRgb = "0, 240, 255";
          if (profile.accent === "violet") accentRgb = "157, 78, 221";

          ctx.strokeStyle = `rgba(${accentRgb}, ${0.45 + pulseFactor * 0.35})`;
          ctx.lineWidth = 1.75;
        } else {
          ctx.strokeStyle = resolvedTheme === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = 0.75;
        }
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((n, idx) => {
        const isHovered = hoveredIdx === idx;
        const isActive = activePanelIdx === idx;

        let nodeColor = "rgba(0, 240, 255, "; // dev - blue
        if (n.category === "design") {
          if (profile.accent === "blue") nodeColor = "rgba(0, 240, 255, ";
          else if (profile.accent === "violet") nodeColor = "rgba(157, 78, 221, ";
          else nodeColor = "rgba(212, 160, 23, ";
        }
        if (n.category === "video") nodeColor = "rgba(157, 78, 221, "; // video - violet
        if (n.category === "sys") nodeColor = "rgba(233, 30, 99, "; // sys - pink

        // Glowing circle ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + (isHovered ? 4 : 2), 0, Math.PI * 2);
        ctx.fillStyle = `${nodeColor}${isHovered ? 0.22 : 0.06})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.strokeStyle = `${nodeColor}${isHovered || isActive ? 0.95 : 0.35})`;
        ctx.lineWidth = isHovered || isActive ? 1.5 : 1.0;
        ctx.stroke();

        // Node text label inside
        ctx.fillStyle = isHovered || isActive 
          ? (resolvedTheme === "light" ? "#111111" : "#ffffff") 
          : (resolvedTheme === "light" ? "#666666" : "#a3a3a3");
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.name, n.x, n.y);
      });

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleMouseClick);
      cancelAnimationFrame(animFrameId);
    };
  }, [hoveredIdx, activePanelIdx, resolvedTheme, profile.accent]);

  return (
    <section className="relative py-24 bg-[#f8f8f8] dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-[#00F0FF]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION 03: SKILL UNIVERSE */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold-light">Interactive Skills Constellation</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-white">
            SKILL <span className="text-gradient-gold">UNIVERSE</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mt-4 shadow-[0_0_8px_#D4A017]" />
          <p className="text-gray-400 mt-4 max-w-xl text-sm leading-relaxed">
            Constellation nodes mapping interrelated skill vectors. Hover to inspect, click node to lock project files.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel: 3D Constellation Canvas (7 cols) */}
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[420px]">
            <div className="border border-white/5 bg-[#090909]/40 rounded-xl p-4 shadow-2xl relative">
              <canvas 
                ref={canvasRef}
                className="w-[380px] h-[380px] cursor-pointer"
                style={{ width: "380px", height: "380px" }}
              />
              <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-[#a3a3a3] font-mono text-[9px]">
                <Network className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span>CLICK NODES FOR DETAILS</span>
              </div>
            </div>
          </div>

          {/* Right panel: Details Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center min-h-[350px]">
            <AnimatePresence mode="wait">
              {activePanelIdx !== null ? (
                <motion.div
                  key={activePanelIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-lg glass-card border border-gold/30 bg-black/40 relative shadow-[0_0_25px_rgba(212,160,23,0.15)]"
                >
                  <button
                    onClick={() => setActivePanelIdx(null)}
                    className="absolute top-4 right-4 text-xs font-mono text-gray-500 hover:text-gold uppercase cursor-pointer"
                  >
                    RESET
                  </button>

                  <div className="flex items-center space-x-2 text-gold mb-3">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">CONSTELLATION_LOCK</span>
                  </div>

                  <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
                    {nodes[activePanelIdx].name}
                  </h3>
                  
                  <div className="flex items-baseline space-x-2 mb-4 border-b border-white/5 pb-4">
                    <span className="text-3xl font-black text-gold">{nodes[activePanelIdx].proficiency}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">expertise value</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-3 font-bold">Associated Case Projects</span>
                    <div className="space-y-3">
                      {nodes[activePanelIdx].projects.map((proj, idx) => (
                        <div 
                          key={idx} 
                          className="p-3 border border-white/5 rounded bg-white/[0.02] text-xs font-semibold text-gray-200"
                        >
                          {proj}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="p-8 rounded-lg glass-card border border-white/5 bg-black/10 flex flex-col items-center justify-center text-center text-gray-500 py-16">
                  <Network className="w-8 h-8 text-gray-600 mb-4 animate-pulse" />
                  <p className="text-xs max-w-xs leading-relaxed uppercase tracking-wider font-mono">
                    Click any node inside the constellation graph to load associated project files.
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
