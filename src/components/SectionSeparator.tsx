"use client";

import React from "react";

export default function SectionSeparator() {
  return (
    <div className="w-full relative z-20 flex items-center justify-center py-6 sm:py-8 overflow-hidden pointer-events-none select-none bg-transparent">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-center">
        {/* Editorial Technical Divider with Subtle Telemetry Accents */}
        <div className="w-full relative flex items-center justify-center">
          {/* Hairline rule */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-[#2A3441]/70 to-transparent" />
          
          {/* Center telemetry crosshair marker */}
          <div className="absolute flex items-center space-x-2 px-3 bg-[#FAFAF7] dark:bg-[#06070A] text-[#1E293B] dark:text-[#94A3B8] text-[9px] font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 border border-gray-400 dark:border-[#2A3441] bg-white dark:bg-[#111827] rotate-45" />
            <span className="hidden sm:inline-block opacity-70">SYS // SECTOR</span>
            <span className="w-1.5 h-1.5 border border-gray-400 dark:border-[#2A3441] bg-white dark:bg-[#111827] rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}
