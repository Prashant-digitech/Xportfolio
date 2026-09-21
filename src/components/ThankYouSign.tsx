"use client";

import { ProfileData } from "@/app/page";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface ThankYouSignProps {
  profile: ProfileData;
}

export default function ThankYouSign({ profile }: ThankYouSignProps) {
  return (
    <section className="relative py-28 bg-[#f5f5f5] dark:bg-[#080808] text-black dark:text-white transition-colors duration-300 overflow-hidden border-t border-black/5 dark:border-white/5">
      {/* Ambient background glows */}
      <div className="absolute top-[30%] left-1/3 w-[300px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none animate-pulse-slow" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Glowing badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-gold animate-pulse" />
          <span>Final Greeting</span>
        </div>

        {/* Big visual header */}
        <h2 className="text-5xl sm:text-7xl font-black tracking-tight leading-none text-gradient-gold select-none drop-shadow-[0_4px_12px_rgba(212,160,23,0.3)]">
          THANK YOU
        </h2>

        {/* Letter content */}
        <div className="max-w-2xl mx-auto space-y-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          <p className="font-semibold text-black dark:text-white">
            Thank you for visiting my portfolio.
          </p>
          <p>
            I appreciate your time and interest in exploring my work, processes, and tools ecosystem.
          </p>
          <p>
            Whether you are a recruiter looking for a creative designer, a founder planning a new product development run, or a collaborator seeking dynamic partnerships, I would love to connect.
          </p>
          <p className="font-bold text-[#D4A017] dark:text-[#FFCC4D] text-base">
            Let's create something extraordinary together.
          </p>
        </div>

        {/* Signature */}
        <div className="pt-6">
          <span className="font-signature text-4xl sm:text-5xl text-gold-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none">
            — {profile.name}
          </span>
          <span className="block text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-2">
            UI/UX DESIGNER • CREATIVE TECHNOLOGIST
          </span>
        </div>

      </div>
    </section>
  );
}
