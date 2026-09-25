"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Phone, Mail, MapPin, Calendar, Download, Layers, Film, PenTool,
  Award, BookOpen, Cpu, Lightbulb, Target, Users, RefreshCw, Handshake,
  CheckCircle, ArrowUpRight, Sparkles, FileText, ExternalLink, Code2, Palette
} from "lucide-react";

import { ProfileData } from "@/app/page";
import { useMagnetic, useTilt, useCountUp } from "@/hooks/useAnimations";
import { motion, AnimatePresence } from "framer-motion";

interface AboutProps {
  profile: ProfileData;
}

type BioLens = "director" | "product" | "technologist";

export default function About({ profile }: AboutProps) {
  const resumeBtn = useMagnetic<HTMLAnchorElement>();
  const portraitTilt = useTilt();
  const [activeLens, setActiveLens] = useState<BioLens>("director");
  const [activeToolCategory, setActiveToolCategory] = useState<"all" | "design" | "video" | "code">("all");

  const quickMetrics = [
    { title: "Projects Shipped", count: 50, suffix: "+", detail: "UX, Mobile, Brand & Video", icon: <Layers className="w-4 h-4 text-neon-blue" /> },
    { title: "Certifications", count: 10, suffix: "+", detail: "Arena, Cisco, C/C++, CAD", icon: <Award className="w-4 h-4 text-[#D4AF37]" /> },
    { title: "Experience", count: 3, suffix: "+ Yrs", detail: "Design systems & leadership", icon: <Sparkles className="w-4 h-4 text-[#FF6B00]" /> },
    { title: "Mentees Coached", count: 500, suffix: "+", detail: "Ducat Vikaspuri cohorts", icon: <Users className="w-4 h-4 text-emerald-400" /> },
    { title: "Execution SLA", count: 100, suffix: "%", detail: "On-time delivery standard", icon: <CheckCircle className="w-4 h-4 text-[#00F0FF]" /> },
  ];

  const lensData = {
    director: {
      badge: "Creative Direction & Aesthetics",
      title: "Visual Storyteller & Brand Architect",
      narrative: [
        `${profile.name} unites artistic intuition with rigorous commercial impact. He crafts cinema-grade visual identities, typography hierarchies, and luxury dark-mode aesthetics that command immediate authority and emotional engagement.`,
        "From theatrical film posters and multi-track motion showreels to corporate branding systems, his work translates raw creative vision into unforgettable brand experiences that elevate perceived value and conversion."
      ],
      highlights: [
        "Artistic Direction & Color Grading (Rec.709 & Film Emulation)",
        "Theatrical Typography & CMYK Print Identity Systems",
        "Kinetic Motion Design & Multi-Track Audio Synchronization"
      ],
      tagColor: "border-[#FF6B00]/40 text-[#FF6B00] bg-[#FF6B00]/10"
    },
    product: {
      badge: "Product Design & Design Systems",
      title: "Systems Thinker & Friction Eliminator",
      narrative: [
        "Designing complex, multi-device applications across FinTech, Cybersecurity, and AI. Prashant transforms chaotic operational flows into intuitive, scalable interfaces grounded in Nielsen Norman UX heuristics.",
        "He builds tokenized design systems in Figma with auto-layout strictness, WCAG 2.1 AA color contrast compliance, and sub-100ms micro-interactions that drastically lower cognitive overload and boost user retention."
      ],
      highlights: [
        "WCAG 2.1 AA Accessible Color Palettes & Contrast Strictness",
        "Scalable Tokenized Figma Systems (Typography, Spacing, Elevation)",
        "Quantitative User Journey Mapping & Heuristic Usability Audits"
      ],
      tagColor: "border-[#00F0FF]/40 text-[#00F0FF] bg-[#00F0FF]/10"
    },
    technologist: {
      badge: "Engineering Mindset & Implementation",
      title: "Mechanical Foundation & Creative Technologist",
      narrative: [
        "With a Master of Technology (MTech) in Production Management and a Bachelor of Engineering in Mechanical Engineering, Prashant approaches UX design with structural mathematical discipline.",
        "He bridges the gap between design and production code, architecting clean React/Next.js component trees, responsive CSS layouts, and algorithmic AI workflows that eliminate designer-to-developer friction."
      ],
      highlights: [
        "C/C++, HTML/CSS, React & Next.js Implementation Fluency",
        "Algorithmic Problem Solving & Production System Discipline",
        "Zero-Drift Asset Handshakes with Modern Engineering Teams"
      ],
      tagColor: "border-[#D4AF37]/40 text-[#F5BA42] bg-[#D4AF37]/10"
    }
  };

  const tools = [
    { name: "Figma", acronym: "Fi", category: "design", level: "Mastery", color: "text-[#1ABC9C] border-[#1ABC9C]/40 bg-[#052c24]/50" },
    { name: "Photoshop", acronym: "Ps", category: "design", level: "Mastery", color: "text-[#00f0ff] border-[#00f0ff]/40 bg-[#001d3d]/50" },
    { name: "Illustrator", acronym: "Ai", category: "design", level: "Mastery", color: "text-[#ff9f1c] border-[#ff9f1c]/40 bg-[#2c1a04]/50" },
    { name: "Canva", acronym: "Ca", category: "design", level: "Expert", color: "text-[#00c4cc] border-[#00c4cc]/40 bg-[#002729]/50" },
    { name: "Premiere Pro", acronym: "Pr", category: "video", level: "Mastery", color: "text-[#ea00d9] border-[#ea00d9]/40 bg-[#210029]/50" },
    { name: "After Effects", acronym: "Ae", category: "video", level: "Expert", color: "text-[#9d4edd] border-[#9d4edd]/40 bg-[#1d003d]/50" },
    { name: "React JS", acronym: "Re", category: "code", level: "Advanced", color: "text-[#61dafb] border-[#61dafb]/40 bg-[#0b2434]/50" },
    { name: "Next.js", acronym: "Nx", category: "code", level: "Advanced", color: "text-slate-200 border-white/40 bg-white/10" },
    { name: "Tailwind CSS", acronym: "Tw", category: "code", level: "Mastery", color: "text-[#38bdf8] border-[#38bdf8]/40 bg-[#0e2a3b]/50" },
    { name: "Bootstrap", acronym: "Bs", category: "code", level: "Expert", color: "text-[#7952b3] border-[#7952b3]/40 bg-[#191026]/50" },
    { name: "WordPress", acronym: "Wp", category: "code", level: "Expert", color: "text-[#21759b] border-[#21759b]/40 bg-[#071921]/50" },
    { name: "C/C++", acronym: "C++", category: "code", level: "Advanced", color: "text-[#f34b7d] border-[#f34b7d]/40 bg-[#280c14]/50" },
  ];

  const filteredTools = activeToolCategory === "all" 
    ? tools 
    : tools.filter(t => t.category === activeToolCategory);

  const education = [
    {
      title: "Professional Certification in Web Design & Dev",
      institution: "Arena Animation Institute",
      period: "2021–2022",
    },
    {
      title: "CCNA Routing & Switching Certification",
      institution: "Cisco Networking Academy",
      period: "2018–2019",
    },
    {
      title: "C/C++ Programming Certification",
      institution: "Professional Course",
      period: "2014",
    },
    {
      title: "MTech in Production Management",
      institution: "VTU",
      period: "2010–2012",
    },
    {
      title: "Advanced Diploma in CADD PRO-E",
      institution: "CAD Center",
      period: "2009–2010",
    },
    {
      title: "BE in Mechanical Engineering",
      institution: "VTU",
      period: "2003–2007",
    },
  ];

  const skills = ["HTML5", "CSS3 / SCSS", "JavaScript", "PHP", "React JS", "Next.js", "Bootstrap", "Tailwind CSS", "C/C++", "WordPress CMS", "Design Systems", "WCAG AA"];

  const achievements = [
    { rank: "Silver Medal", detail: "VTU MTech Academic Achievement" },
    { rank: "2nd Rank", detail: "Gogte Institute of Technology" },
    { rank: "500+ Rank", detail: "PGCET Academic Entrance Exam" },
    { rank: "780+ Rank", detail: "GCET Gujarat State Level Entrance" },
  ];

  const drives = [
    { title: "CREATIVITY", desc: "I turn raw ideas into creative, high-converting digital solutions.", icon: <Lightbulb className="w-5 h-5 text-[#D4AF37]" /> },
    { title: "FOCUS", desc: "Obsessive attention to micro-interactions, layout rhythm, and clarity.", icon: <Target className="w-5 h-5 text-[#D4AF37]" /> },
    { title: "USER FIRST", desc: "Intuitive workflows designed to eliminate user friction and hesitation.", icon: <Users className="w-5 h-5 text-[#D4AF37]" /> },
    { title: "STAY UPDATED", desc: "Continuous refinement across modern design systems, AI tools, and frontend engineering stacks.", icon: <RefreshCw className="w-5 h-5 text-[#D4AF37]" /> },
    { title: "COLLABORATION", desc: "Crystal-clear cross-functional communication and transparent execution.", icon: <Handshake className="w-5 h-5 text-[#D4AF37]" /> },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#f8fafc] dark:bg-[#050814] border-t border-black/5 dark:border-white/5 text-[#0a1128] dark:text-white transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute top-[30%] right-[5%] w-[350px] h-[350px] rounded-full bg-[#FF6B00]/5 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-[#00F0FF]/5 blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#B8941F] dark:text-[#D4AF37]">Profile & Philosophy</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#0a1128] dark:text-white">
            ABOUT <span className="text-gradient-orange">ME</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#FF6B00] mt-4 shadow-[0_0_8px_#FF6B00]" />
          <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
            Multidisciplinary UI/UX Designer, Creative Director & Mentor uniting aesthetic elegance with structural engineering precision.
          </p>
        </div>

        {/* INTERACTIVE QUICK-METRICS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-16">
          {quickMetrics.map((m, idx) => (
            <MetricCard key={idx} metric={m} />
          ))}
        </div>

        {/* Top Section Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Block (4 cols) - Portrait & Basic Details */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-6"
          >
            <div 
              ref={portraitTilt.ref}
              onMouseMove={portraitTilt.handleMouseMove}
              onMouseLeave={portraitTilt.handleMouseLeave}
              style={portraitTilt.style}
              className="p-6 rounded-2xl glass-card dark-blue-gold-card shadow-2xl relative group overflow-hidden transition-transform duration-300 ease-out"
            >
              {/* Gold border decorative line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#FF6B00] to-transparent" />
              
              {/* Portrait Image */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mb-6 bg-[#050C1A]">
                {/* Gold Circle halo background */}
                <div className="absolute inset-8 rounded-full border border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.3)] pointer-events-none z-0 animate-spin-slow" />
                <Image
                  src="/images/profile/pic.png"
                  alt="Prashant Portrait About"
                  fill
                  className="object-cover object-top relative z-10 brightness-[1.05] contrast-[1.05]"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                
                {/* Handwritten Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
                  <span className="font-signature text-3xl text-[#F5BA42] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none">
                    {profile.name}
                  </span>
                </div>
              </div>

              {/* Basic Contact Info */}
              <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-[#0d0d0d] border border-black/10 dark:border-white/10 flex items-center justify-center text-[#B8941F] dark:text-[#F5BA42]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono">Phone</span>
                    <a href={`tel:${profile.phone}`} className="font-medium text-slate-800 dark:text-gray-300 hover:text-[#B8941F] dark:hover:text-[#F5BA42] transition-colors duration-200">{profile.phone}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-[#0d0d0d] border border-black/10 dark:border-white/10 flex items-center justify-center text-[#B8941F] dark:text-[#F5BA42]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono">Email</span>
                    <a href={`mailto:${profile.email}`} className="font-medium text-slate-800 dark:text-gray-300 hover:text-[#B8941F] dark:hover:text-[#F5BA42] transition-colors duration-200">{profile.email}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-[#0d0d0d] border border-black/10 dark:border-white/10 flex items-center justify-center text-[#B8941F] dark:text-[#F5BA42]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono">Location</span>
                    <span className="font-medium text-slate-800 dark:text-gray-300">{profile.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-[#0d0d0d] border border-black/10 dark:border-white/10 flex items-center justify-center text-[#B8941F] dark:text-[#F5BA42]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono">Date of Birth</span>
                    <span className="font-medium text-slate-800 dark:text-gray-300">{profile.dob}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center & Right Block Combo (8 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-6"
          >
            
            {/* Center: Interactive Biography with Lens Switcher */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-white/10 relative shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5BA42] to-transparent" />
              
              {/* Lens Switcher Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#B8941F] dark:text-[#F5BA42] block">
                    Interactive Biography Lens
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0a1128] dark:text-white mt-1">
                    {lensData[activeLens].title}
                  </h3>
                </div>

                {/* Switcher Buttons */}
                <div className="flex flex-wrap p-1 rounded-xl bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 shrink-0">
                  {[
                    { id: "director", label: "Creative Director", icon: <Palette className="w-3.5 h-3.5" /> },
                    { id: "product", label: "Product UX", icon: <Layers className="w-3.5 h-3.5" /> },
                    { id: "technologist", label: "Technologist", icon: <Code2 className="w-3.5 h-3.5" /> }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setActiveLens(btn.id as BioLens)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer ${
                        activeLens === btn.id
                          ? "bg-[#D4AF37] text-black shadow-md font-extrabold"
                          : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {btn.icon}
                      <span className="hidden sm:inline">{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Narrative Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLens}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="space-y-3 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {lensData[activeLens].narrative.map((pText, pIdx) => (
                      <p key={pIdx}>{pText}</p>
                    ))}
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 space-y-2 mt-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">
                      Core Focus & Domain Strengths:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-800 dark:text-slate-200">
                      {lensData[activeLens].highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start space-x-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#B8941F] dark:text-[#F5BA42] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Resume Download & Verification Badge */}
              <div className="pt-6 border-t border-black/5 dark:border-white/5 mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <a
                    ref={resumeBtn.ref}
                    onMouseMove={resumeBtn.handleMouseMove}
                    onMouseLeave={resumeBtn.handleMouseLeave}
                    style={resumeBtn.style}
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:text-white transition-all duration-300 text-[#B8941F] dark:text-[#F5BA42] bg-[#D4AF37]/10 font-bold uppercase tracking-wider text-xs cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download CV (PDF)</span>
                  </a>

                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-[#D4AF37] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
                    title="Preview Resume"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                    ✓ ATS-Optimized
                  </span>
                  <span>PDF ~240 KB • Q3 2026</span>
                </div>
              </div>
            </div>

            {/* Right Side Part 2: Tools I Use with Filter Chips */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-white/10 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    Tools & Stack Mastery
                  </h3>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">
                    Production-grade software proficiency across UX, motion, and code.
                  </span>
                </div>

                {/* Filter chips */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "all", label: "All" },
                    { id: "design", label: "Design" },
                    { id: "video", label: "Video" },
                    { id: "code", label: "Code" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveToolCategory(cat.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        activeToolCategory === cat.id
                          ? "bg-[#D4AF37] text-black font-extrabold"
                          : "bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredTools.map((t, idx) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.02 }}
                    className={`p-3 border rounded-xl font-bold flex flex-col justify-between shadow-sm transition-all duration-300 hover:scale-[1.03] ${t.color}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black">{t.acronym}</span>
                      <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/40 text-slate-200">
                        {t.level}
                      </span>
                    </div>
                    <span className="text-xs text-slate-800 dark:text-slate-200 font-bold mt-2">
                      {t.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

        {/* Section: What Drives Me banner */}
        <div className="mb-20">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-center text-slate-500 dark:text-slate-400 mb-8">What Drives Me</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {drives.map((d, idx) => (
              <div key={idx} className="p-5 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-white/10 hover:border-[#D4AF37]/50 flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(212,175,55,0.1)]">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shadow-inner">
                  {d.icon}
                </div>
                <h4 className="font-extrabold text-xs tracking-wider text-[#0a1128] dark:text-white">{d.title}</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Timeline Section (Education, Skills, Achievements) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 pt-12 border-t border-black/10 dark:border-white/10">
          
          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#B8941F] dark:text-[#F5BA42]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-wider text-[#0a1128] dark:text-white">Education & Timeline</h3>
            </div>
            
            <div className="relative border-l border-black/15 dark:border-white/15 pl-6 ml-5 space-y-8">
              {education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Bullet */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border border-[#D4AF37] bg-white dark:bg-[#050C1A] group-hover:bg-[#D4AF37] transition-colors duration-300 shadow-[0_0_8px_#D4AF37]" />
                  
                  <div className="p-5 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-white/10 group-hover:border-[#D4AF37]/40 transition-all duration-300">
                    <span className="text-[10px] font-bold text-[#B8941F] dark:text-[#F5BA42] uppercase tracking-wider block mb-1 font-mono">{edu.period}</span>
                    <h4 className="font-extrabold text-sm text-[#0a1128] dark:text-white leading-snug group-hover:text-[#B8941F] dark:group-hover:text-[#F5BA42] transition-colors duration-300">{edu.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Achievements & Programming Skills */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            
            {/* Achievements */}
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#B8941F] dark:text-[#F5BA42]">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-wider text-[#0a1128] dark:text-white">Key Achievements</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {achievements.map((a, idx) => (
                  <AchievementCounter key={idx} rank={a.rank} detail={a.detail} />
                ))}
              </div>
            </div>

            {/* Technical Programming Skills */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#B8941F] dark:text-[#F5BA42]">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-wider text-[#0a1128] dark:text-white">Technical Skills & Frameworks</h3>
              </div>

              <div className="p-6 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-white/10 shadow-xl">
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill, idx) => (
                    <motion.span 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.03 }}
                      className="px-3.5 py-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#D4AF37] hover:text-[#0a1128] dark:hover:text-white hover:bg-[#D4AF37]/10 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

// Sub-component for interactive quick metrics
function MetricCard({ metric }: { metric: { title: string; count: number; suffix: string; detail: string; icon: React.ReactNode } }) {
  const { count, elementRef } = useCountUp(metric.count, 1500);

  return (
    <div 
      ref={elementRef}
      className="p-4 sm:p-5 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(212,175,55,0.12)]"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">KPI</span>
        <div className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 group-hover:scale-110 transition-transform">
          {metric.icon}
        </div>
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-black text-[#0a1128] dark:text-white tracking-tight">
          {count}{metric.suffix}
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#B8941F] dark:text-[#F5BA42] mt-0.5">
          {metric.title}
        </div>
        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
          {metric.detail}
        </div>
      </div>
    </div>
  );
}

// Sub-component for key achievements number animations
function AchievementCounter({ rank, detail }: { rank: string; detail: string }) {
  const matches = rank.match(/\d+/);
  const num = matches ? parseInt(matches[0]) : null;
  const prefix = num ? rank.split(String(num))[0] : "";
  const suffix = num ? rank.split(String(num))[1] : rank;
  
  const { count, elementRef } = useCountUp(num || 0, 1500);

  return (
    <div ref={elementRef} className="p-6 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-white/10 hover:border-[#D4AF37]/35 transition-all duration-300 flex flex-col justify-between group">
      <span className="text-sm font-black uppercase text-[#B8941F] dark:text-[#F5BA42] tracking-widest font-mono">
        {num !== null ? `${prefix}${count}${suffix}` : rank}
      </span>
      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{detail}</p>
      <div className="w-8 h-[2px] bg-black/20 dark:bg-white/20 mt-4 group-hover:w-16 group-hover:bg-[#D4AF37] transition-all duration-300" />
    </div>
  );
}
