"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Phone, Mail, MapPin, Layers, Film, PenTool, Award, Users, CheckCircle, Briefcase } from "lucide-react";
import { ProfileData } from "@/app/page";
import { useMagnetic, useTilt, useCountUp } from "@/hooks/useAnimations";
import { motion } from "framer-motion";

interface HeroProps {
  profile: ProfileData;
}

export default function Hero({ profile }: HeroProps) {
  const hireBtn = useMagnetic();
  const aboutBtn = useMagnetic();
  const portraitTilt = useTilt();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const softwareIcons = [
    { name: "Ps", color: "bg-[#001d3d] border-[#00f0ff] text-[#00f0ff]", style: "top-[15%] right-[5%]", delay: "0s" },
    { name: "Ai", color: "bg-[#2c1a04] border-[#ff9f1c] text-[#ff9f1c]", style: "top-[45%] right-[-10px]", delay: "1.5s" },
    { name: "Ae", color: "bg-[#1d003d] border-[#9d4edd] text-[#9d4edd]", style: "bottom-[20%] right-[5%]", delay: "0.8s" },
    { name: "Pr", color: "bg-[#210029] border-[#ea00d9] text-[#ea00d9]", style: "bottom-[5%] left-[20%]", delay: "2.1s" },
  ];

  const stats = [
    { value: "10+", label: "Product Studies", icon: <Briefcase className="w-5 h-5 text-gold" /> },
    { value: "10+", label: "Certifications", icon: <CheckCircle className="w-5 h-5 text-gold" /> },
    { value: "3+", label: "Years Craft", icon: <Award className="w-5 h-5 text-gold" /> },
    { value: "100%", label: "System-Driven", icon: <Layers className="w-5 h-5 text-gold" /> },
  ];

  const nameParts = profile.name.split(" ");
  const firstName = nameParts[0] || "PRASHANT";
  const lastName = nameParts.slice(1).join(" ") || "SISODHIYA";

  const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-16 overflow-hidden bg-[#FAFAF7] dark:bg-[#090A0E] text-[#111318] dark:text-white min-h-screen flex flex-col justify-between transition-colors duration-250">
      {/* Decorative Golden Blur Background */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-gold/5 blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#00F0FF]/5 blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex-grow flex flex-col justify-center">
        {/* Main Grid: Hero content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Panel */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-7 flex flex-col items-start space-y-6 z-10"
          >
            {/* Small badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0F1118] border border-[#B8941F]/40 dark:border-[#D4AF37]/30 text-[#111318] dark:text-gray-300 text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>UI/UX & AI Product Designer</span>
            </motion.div>

            {/* Main Header Name */}
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl font-black tracking-tight leading-tight select-none">
              <span className="block text-[#111318] dark:text-white">{firstName}</span>
              <span className="block text-gradient-gold drop-shadow-[0_4px_12px_rgba(212,175,55,0.25)]">{lastName}</span>
            </motion.h1>

            {/* Subtitle capsule */}
            <motion.div variants={fadeInUp} className="px-4 py-2 border border-[#B8941F]/40 dark:border-[#D4AF37]/40 rounded-full bg-white dark:bg-[#0F1118] shadow-sm">
              <p className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#B8941F] dark:text-gold-light">
                PRODUCT THINKER • AI INTERFACES • DESIGN SYSTEMS
              </p>
            </motion.div>

            {/* Narrative description */}
            <motion.p variants={fadeInUp} className="text-[#4B5563] dark:text-[#A1A8B5] text-base sm:text-lg max-w-xl leading-relaxed">
              <span className="text-[#111318] dark:text-white font-bold block mb-1">Human-Centered Digital Products & Intelligent Interfaces</span>
              Designing complex fintech platforms, AI agent telemetry, and scalable design systems that transform dense workflows into intuitive, high-conversion experiences.
            </motion.p>

            {/* CTAs (Sections 24, 25, 26) */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
              <button
                ref={hireBtn.ref}
                onMouseMove={hireBtn.handleMouseMove}
                onMouseLeave={hireBtn.handleMouseLeave}
                style={hireBtn.style}
                onClick={() => scrollToSection("work")}
                className="btn-primary"
              >
                <span>View Selected Work</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <span>Resume (PDF)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                ref={aboutBtn.ref}
                onMouseMove={aboutBtn.handleMouseMove}
                onMouseLeave={aboutBtn.handleMouseLeave}
                style={aboutBtn.style}
                onClick={() => scrollToSection("about")}
                className="h-[46px] px-5 rounded-xl text-[#4B5563] dark:text-[#D1D5DB] hover:text-[#B8941F] dark:hover:text-[#D4AF37] font-semibold text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center space-x-1.5"
              >
                <span>About Journey</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Panel: Portrait with halo, icons, UI screens */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end items-center"
          >
            {/* Custom Pulsing Hero Halo Effect */}
            <div className="hero-halo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
            
            <div 
              ref={portraitTilt.ref}
              onMouseMove={portraitTilt.handleMouseMove}
              onMouseLeave={portraitTilt.handleMouseLeave}
              style={portraitTilt.style}
              className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center cursor-pointer transition-transform duration-300 ease-out z-10"
            >
              {/* Rotating glowing golden circle / halo */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/40 animate-spin-slow opacity-60 pointer-events-none" />
              <div className="absolute inset-2 rounded-full border border-gold/25 shadow-[0_0_40px_rgba(212,160,23,0.2)] pointer-events-none" />

              {/* Portrait Container */}
              <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full overflow-hidden border-2 border-gold shadow-[0_0_35px_rgba(212,160,23,0.3)] bg-gradient-to-b from-[#0d0d0d] to-[#050505]">
                <Image
                  src="/images/profile/pic.png"
                  alt="Prashant Sisodhiya"
                  fill
                  priority
                  className="object-cover object-top brightness-[1.05] contrast-[1.05]"
                />
              </div>

              {/* Floating Software Icons */}
              {softwareIcons.map((ico, idx) => (
                <div
                  key={idx}
                  className={`absolute w-10 h-10 rounded-md border flex items-center justify-center font-bold text-sm shadow-lg ${ico.color} ${ico.style} animate-float`}
                  style={{ animationDelay: ico.delay }}
                >
                  {ico.name}
                </div>
              ))}

              {/* Floating Figma Icon */}
              <div className="absolute top-[5%] left-[5%] w-10 h-10 rounded-md border border-white/10 bg-[#0d0d0d] shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: "2.5s" }}>
                <svg className="w-5 h-5" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0C10.7157 0 4 6.71573 4 15C4 20.4069 6.86438 25.1423 11.2 27.8C6.86438 30.4577 4 35.1931 4 40.6C4 48.8843 10.7157 55.6 19 55.6C27.2843 55.6 34 48.8843 34 40.6C34 35.1931 31.1356 30.4577 26.8 27.8C31.1356 25.1423 34 20.4069 34 15C34 6.71573 27.2843 0 19 0Z" fill="url(#figma_grad)" />
                  <defs>
                    <linearGradient id="figma_grad" x1="4" y1="0" x2="34" y2="55.6" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F24E1E" />
                      <stop offset="0.25" stopColor="#FF7262" />
                      <stop offset="0.5" stopColor="#A259FF" />
                      <stop offset="0.75" stopColor="#1ABC9C" />
                      <stop offset="1" stopColor="#19BC9C" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating Live Product Showcase Widget */}
              <div 
                onClick={() => scrollToSection("work")}
                className="absolute top-[70%] sm:top-[74%] right-[-15px] sm:right-[-25px] w-48 sm:w-56 p-2.5 rounded-xl border border-[#D4AF37]/50 bg-[#0A0E17]/95 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,245,160,0.2)] hover:border-[#00F5A0] hover:scale-105 transition-all duration-300 animate-float z-20 group/hud cursor-pointer" 
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0] animate-ping" />
                    <span className="text-[9px] font-mono font-bold text-white tracking-wider">TradeX Pro // 0.12s</span>
                  </div>
                  <span className="text-[8px] font-mono text-[#00F5A0] font-bold px-1 rounded bg-[#00F5A0]/10 border border-[#00F5A0]/30">LIVE UI</span>
                </div>
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-white/10 mb-1.5">
                  <Image
                    src="/images/ux/projects/TradeX.png"
                    alt="TradeX Pro Live Interface Preview"
                    fill
                    className="object-cover group-hover/hud:scale-105 transition-transform duration-500"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-1 left-1.5 text-[8px] font-mono text-[#00F5A0] font-semibold">Institutional Terminal</span>
                </div>
                <div className="flex items-center justify-between text-[8px] font-mono text-slate-300 pt-0.5">
                  <span className="text-[#F5BA42]">7 UX Case Studies</span>
                  <span className="text-[#00F0FF] group-hover/hud:translate-x-0.5 transition-transform">Explore →</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* What I Do Capsules & Achievements Panel */}
        <div className="mt-16 border-t border-black/5 dark:border-white/10 pt-12 flex flex-col space-y-8">
          
          {/* Row 1: Core Disciplines */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1A8B5] mb-6">Core Disciplines</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Product Design */}
              <div 
                onClick={() => scrollToSection("work")}
                className="group p-6 rounded-lg glass-card border border-white/5 hover:border-neon-blue hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-10 h-10 rounded-md bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center text-neon-blue group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold tracking-wider text-black dark:text-white group-hover:text-neon-blue transition-colors duration-300">Product & UI/UX Design</h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-[#A1A8B5] leading-relaxed">
                  Architecting multi-platform SaaS products, responsive responsive layouts, and design systems grounded in user psychology.
                </p>
              </div>

              {/* Card 2: AI Interfaces */}
              <div 
                onClick={() => scrollToSection("lab")}
                className="group p-6 rounded-lg glass-card border border-white/5 hover:border-neon-violet hover:shadow-[0_0_20px_rgba(157,78,221,0.15)] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-10 h-10 rounded-md bg-[#9d4edd]/10 border border-[#9d4edd]/20 flex items-center justify-center text-neon-violet group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(157,78,221,0.2)]">
                    <Film className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold tracking-wider text-black dark:text-white group-hover:text-neon-violet transition-colors duration-300">AI Interfaces & Telemetry</h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-[#A1A8B5] leading-relaxed">
                  Designing conversational agent states, multimodal telemetry, real-time prompt surfaces, and autonomous copilot experiences.
                </p>
              </div>

              {/* Card 3: Visual Identity */}
              <div 
                onClick={() => scrollToSection("work")}
                className="group p-6 rounded-lg glass-card border border-white/5 hover:border-gold hover:shadow-[0_0_20px_rgba(212,160,23,0.15)] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-10 h-10 rounded-md bg-[#D4A017]/10 border border-[#D4A017]/20 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(212,160,23,0.2)]">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold tracking-wider text-black dark:text-white group-hover:text-gold transition-colors duration-300">Visual Identity & Motion</h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-[#A1A8B5] leading-relaxed">
                  Delivering high-fidelity brand systems, micro-interactions, editorial typography, and cinematic motion graphics.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: Achievements Stats Panel */}
          <div className="p-8 rounded-lg glass-card border border-white/5 bg-gradient-to-r from-white/[0.01] to-transparent">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
              {stats.map((stat, idx) => (
                <StatCounter key={idx} value={stat.value} label={stat.label} icon={stat.icon} />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Bar: Phone, Email, Location */}
      <div className="border-t border-black/10 dark:border-white/10 mt-12 bg-[#F4F1E8]/90 dark:bg-[#090A0E]/80 py-4 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-[#4B5563] dark:text-[#D1D5DB] font-semibold">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#B8941F] dark:text-gold" />
              <a href={`tel:${profile.phone}`} className="hover:text-[#B8941F] dark:hover:text-gold transition-colors duration-200">{profile.phone}</a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#B8941F] dark:text-gold" />
              <a href={`mailto:${profile.email}`} className="hover:text-[#B8941F] dark:hover:text-gold transition-colors duration-200">{profile.email}</a>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#B8941F] dark:text-gold" />
              <span>{profile.location}</span>
            </div>
          </div>
          
          <button 
            onClick={() => scrollToSection("contact")}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl border border-[#B8941F] dark:border-gold/40 hover:bg-[#D4AF37] hover:text-black transition-all duration-200 text-[#111318] dark:text-gold-light cursor-pointer shadow-sm font-bold uppercase tracking-wider text-[11px]"
          >
            <span>Let's Work Together</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Sub-component for viewport-triggered count up animations
function StatCounter({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  const targetNumber = parseInt(value) || 0;
  const suffix = value.replace(/[0-9]/g, ""); // get symbol like '+'
  const { count, elementRef } = useCountUp(targetNumber, 1500);

  return (
    <div ref={elementRef} className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 space-y-2 md:space-y-0">
      <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
        {icon}
      </div>
      <div>
        <span className="block text-3xl font-extrabold text-black dark:text-white tracking-tight">
          {count}{suffix}
        </span>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );
}
