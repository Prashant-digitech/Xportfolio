"use client";

import React from "react";

export default function SectionSeparator() {
  return (
    <div className="w-full relative z-20 flex justify-center py-6 overflow-visible pointer-events-none select-none bg-transparent">
      <svg width="100%" height="24" className="overflow-visible">
        <defs>
          <pattern id="rope-pattern" width="40" height="24" patternUnits="userSpaceOnUse">
            {/* Seamless twisted rope paths */}
            <path 
              d="M 0 12 C 10 5, 15 5, 20 12 C 25 19, 30 19, 40 12" 
              stroke="url(#rope-gold-grad)" 
              strokeWidth="3.5" 
              fill="none" 
              strokeLinecap="round"
            />
            <path 
              d="M 0 12 C 5 19, 10 19, 20 12 C 30 5, 35 5, 40 12" 
              stroke="url(#rope-gold-grad)" 
              strokeWidth="3.5" 
              fill="none" 
              strokeLinecap="round" 
              opacity="0.95"
            />
            {/* Twisted fibers internal details */}
            <line x1="6" y1="14" x2="14" y2="10" stroke="url(#rope-gold-grad)" strokeWidth="1" opacity="0.75" />
            <line x1="26" y1="10" x2="34" y2="14" stroke="url(#rope-gold-grad)" strokeWidth="1" opacity="0.75" />
          </pattern>
          
          <linearGradient id="rope-gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFCC4D" />
            <stop offset="30%" stopColor="#F5C542" />
            <stop offset="70%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#FFCC4D" />
          </linearGradient>
          
          <filter id="rope-glow" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Glow backdrop line */}
        <rect width="100%" height="24" fill="url(#rope-pattern)" filter="url(#rope-glow)" className="opacity-95" />
      </svg>
    </div>
  );
}
