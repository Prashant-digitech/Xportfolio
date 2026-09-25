"use client";

import { useState, useRef, useEffect } from "react";
import { MoveHorizontal, Eye, Compass } from "lucide-react";

export default function BeforeAfter() {
  const [position, setPosition] = useState(50); // percentage (0-100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      if (e.touches[0]) handleMove(e.touches[0].clientX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <section className="relative py-24 bg-[#f8f8f8] dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION 06: BEFORE AFTER SHOWCASE */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold-light">Interface Transformation</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#111318] dark:text-white">
            BEFORE <span className="text-gradient-gold">AFTER</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mt-4 shadow-[0_0_8px_#D4A017]" />
          <p className="text-[#4B5563] dark:text-gray-400 mt-4 max-w-xl text-sm leading-relaxed">
            Drag the handle in the center to reveal the transition from initial wireframe sketch to final high-fidelity product.
          </p>
        </div>

        <div className="flex justify-center items-center">
          
          {/* Slider Container */}
          <div 
            ref={containerRef}
            className="relative w-full max-w-[750px] aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#080808] select-none cursor-ew-resize"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* UNDER LAYER: BEFORE (Wireframe) */}
            <div className="absolute inset-0 w-full h-full p-8 flex flex-col justify-between bg-[#0e0e0e] text-gray-600 font-mono">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex items-center space-x-1.5 text-gray-500">
                  <Compass className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-wider font-bold">LO_FI_WIREFRAME_SKETCH</span>
                </div>
                <div className="px-2 py-0.5 border border-white/5 rounded text-[8px]">V1.0</div>
              </div>
              
              <div className="flex-grow flex flex-col justify-center space-y-4 my-6">
                <div className="h-6 bg-white/5 rounded w-1/3" />
                <div className="h-12 border border-dashed border-white/10 rounded flex items-center justify-center text-[10px] text-gray-500 font-mono">
                  [HERO VIEWPORT REGION]
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-16 border border-dashed border-white/10 rounded flex items-center justify-center text-[9px] text-gray-500 font-mono">[MODULE_01]</div>
                  <div className="h-16 border border-dashed border-white/10 rounded flex items-center justify-center text-[9px] text-gray-500 font-mono">[MODULE_02]</div>
                  <div className="h-16 border border-dashed border-white/10 rounded flex items-center justify-center text-[9px] text-gray-500 font-mono">[MODULE_03]</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[9px] text-gray-500 border-t border-white/5 pt-4">
                <span>© 2026 PROCESS DESIGN</span>
                <span>GRID SYSTEM: 12_COLS</span>
              </div>
            </div>

            {/* OVER LAYER: AFTER (High-Fidelity) */}
            <div 
              className="absolute inset-0 h-full overflow-hidden p-8 flex flex-col justify-between bg-gradient-to-b from-[#050505] to-[#0d0d0d] text-white"
              style={{ width: `${position}%` }}
            >
              {/* Inner wrapper matching parent width to prevent compression scaling */}
              <div className="absolute inset-0 w-[750px] p-8 flex flex-col justify-between bg-gradient-to-b from-[#050505] to-[#0d0d0d] pointer-events-none">
                <div className="flex justify-between items-center border-b border-gold/20 pb-3">
                  <div className="flex items-center space-x-1.5 text-gold">
                    <Eye className="w-4 h-4 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gradient-gold">HI_FI_PRODUCTION_READY</span>
                  </div>
                  <div className="px-2 py-0.5 bg-gold/10 border border-gold/30 text-gold rounded text-[8px] font-bold">V4.0 LIVE</div>
                </div>
                
                <div className="flex-grow flex flex-col justify-center space-y-4 my-6">
                  {/* Glowing text title */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gold-light uppercase tracking-widest block">Futuristic UI Systems</span>
                    <h3 className="text-3xl font-black text-white leading-none">PRASHANT PORTFOLIO</h3>
                  </div>
                  
                  {/* Glowing glassmorphic widget */}
                  <div className="p-4 rounded border border-gold/30 bg-gold/5 shadow-[0_0_15px_rgba(212,160,23,0.15)] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-gray-400 block font-bold">User Engagement Metric</span>
                      <span className="text-lg font-black text-white">+28.4% INCREASE</span>
                    </div>
                    <div className="px-3 py-1.5 bg-gold text-black rounded text-[9px] font-bold uppercase tracking-wider">
                      Launch Panel
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded flex flex-col justify-between">
                      <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Active nodes</span>
                      <span className="text-sm font-black text-[#00F0FF]">102.4k</span>
                    </div>
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded flex flex-col justify-between">
                      <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">FPS Rate</span>
                      <span className="text-sm font-black text-gold">60.0 FPS</span>
                    </div>
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded flex flex-col justify-between">
                      <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Latency</span>
                      <span className="text-sm font-black text-green-400">12ms</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[9px] text-gray-500 border-t border-white/5 pt-4">
                  <span>© 2026 PRASHANT SISODHIYA</span>
                  <span className="text-gold">BUILT WITH NEXT.JS 16</span>
                </div>
              </div>
            </div>

            {/* DRAG HANDLE BAR */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-gold dark:bg-[#FFCC4D] shadow-[0_0_10px_#D4A017] cursor-ew-resize flex items-center justify-center z-20"
              style={{ left: `${position}%` }}
            >
              <div 
                role="slider"
                tabIndex={0}
                aria-valuenow={Math.round(position)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Before and after interface transformation comparison slider"
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                    e.preventDefault();
                    setPosition((prev) => Math.max(0, prev - 5));
                  } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                    e.preventDefault();
                    setPosition((prev) => Math.min(100, prev + 5));
                  } else if (e.key === "Home") {
                    e.preventDefault();
                    setPosition(0);
                  } else if (e.key === "End") {
                    e.preventDefault();
                    setPosition(100);
                  }
                }}
                className="w-8 h-8 rounded-full bg-gold text-black border-2 border-white dark:border-[#050505] flex items-center justify-center shadow-lg transform -translate-x-1/2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                <MoveHorizontal className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
