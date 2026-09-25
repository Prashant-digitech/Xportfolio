"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Check, ArrowRight, Layers, Film, PenTool, Target, Zap, Rocket, ShieldCheck, 
  Play, Eye, X, ExternalLink, Sparkles, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ServicePreviewModal {
  type: "uiux" | "video" | "graphics";
  title: string;
  image: string;
  desc: string;
  badge: string;
  actionLink: string;
  actionLabel: string;
}

export default function Services() {
  const [activePreview, setActivePreview] = useState<ServicePreviewModal | null>(null);

  useEffect(() => {
    if (activePreview) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActivePreview(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [activePreview]);

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

  const services = [
    {
      num: "01",
      title: "UI/UX DESIGN",
      desc: "Designing structured, research-backed interfaces that clarify user workflows, reduce cognitive friction, and elevate product usability.",
      points: [
        "User Research & Wireframing",
        "Design Systems & Token Architecture",
        "Web & Mobile Prototyping",
        "High-Signal Data Visualization",
        "WCAG 2.1 AA Accessibility",
      ],
      themeColor: "text-[#00F0FF] border-[#00F0FF]/35",
      btnColor: "border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.1)]",
      glassStyle: "border-[#00F0FF]/30 hover:border-[#00F0FF] shadow-[0_10px_30px_rgba(0,0,0,0.4)]",
      badgeColor: "bg-[#00F0FF]/10 text-[#00F0FF]",
      previewImg: "/images/ux/tradex/case-study-preview.png",
      previewBadge: "TradeX Terminal • Authentic Artifact",
      previewSub: "Algorithmic & Financial Systems",
      cta: "EXPLORE UI/UX WORK",
      targetSection: "work",
      modalData: {
        type: "uiux" as const,
        title: "TradeX Pro Trading Terminal",
        image: "/images/ux/projects/TradeX.png",
        desc: "An enterprise trading terminal designed for sub-second execution, modular widget architecture, and low-latency order flow visualization.",
        badge: "Flagship UI/UX Platform",
        actionLink: "#work",
        actionLabel: "View All 7 UX Case Studies"
      }
    },
    {
      num: "02",
      title: "VIDEO EDITING",
      desc: "Creating cinematic videos that tell stories, engage audiences and leave a lasting impact.",
      points: [
        "Cinematic Pace & Speed Ramping",
        "Professional Color Grading (Rec.709/LUTs)",
        "Kinetic Typography & Motion Graphics",
        "Multi-Track Sound Design & Beat Sync",
        "Commercial & YouTube Video Campaigns",
      ],
      themeColor: "text-[#9D4EDD] border-[#9D4EDD]/35",
      btnColor: "border-[#9D4EDD]/30 text-[#9D4EDD] hover:bg-[#9D4EDD]/10 hover:border-[#9D4EDD] shadow-[0_0_15px_rgba(157,78,221,0.1)]",
      glassStyle: "border-[#9D4EDD]/30 hover:border-[#9D4EDD] shadow-[0_10px_30px_rgba(0,0,0,0.4)]",
      badgeColor: "bg-[#9D4EDD]/10 text-[#9D4EDD]",
      previewImg: "/images/showreel/video-showreel.png",
      previewBadge: "4K Showreel • Motion & Cuts",
      previewSub: "Cinematic Timing & Match Cuts",
      cta: "EXPLORE VIDEO WORK",
      targetSection: "work",
      modalData: {
        type: "video" as const,
        title: "Cinematic Video Showreel",
        image: "/images/showreel/video-showreel.png",
        desc: "A comprehensive montage highlighting precision rhythm editing, dynamic speed ramping, bespoke motion graphics, and atmospheric sound design.",
        badge: "Official Video Showreel",
        actionLink: "#work",
        actionLabel: "Launch Video Showcase"
      }
    },
    {
      num: "03",
      title: "GRAPHICS DESIGN",
      desc: "Crafting visually stunning designs that build brand identity and communicate your message.",
      points: [
        "Digital Compositing & Matte Painting",
        "Luxury Brand & Identity Systems",
        "High-Conversion Social Creatives",
        "Cinematic Movie Posters & Typography",
        "Print & Commercial Collaterals",
      ],
      themeColor: "text-[#F5BA42] border-[#D4AF37]/35",
      btnColor: "border-[#D4AF37]/30 text-[#F5BA42] hover:bg-[#D4AF37]/10 hover:border-[#F5BA42] shadow-[0_0_15px_rgba(212,175,55,0.1)]",
      glassStyle: "border-[#D4AF37]/30 hover:border-[#F5BA42] shadow-[0_10px_30px_rgba(0,0,0,0.4)]",
      badgeColor: "bg-[#D4AF37]/10 text-[#F5BA42]",
      previewImg: "/images/graphics/photo manipulation.png",
      previewBadge: "Matte Painting & Compositing",
      previewSub: "Creative Visual Artworks",
      cta: "EXPLORE GRAPHICS WORK",
      targetSection: "work",
      modalData: {
        type: "graphics" as const,
        title: "Photo Manipulation & Creative Art",
        image: "/images/graphics/photo manipulation.png",
        desc: "Surreal digital compositing blending complex lighting layers, textures, and atmospheric grading into immersive visual worlds.",
        badge: "Digital Art & Matte Painting",
        actionLink: "/photoshop",
        actionLabel: "Explore 21-Artwork Gallery"
      }
    },
  ];

  const values = [
    { title: "USER FOCUSED", desc: "I design with users in mind to create meaningful experiences.", icon: <Target className="w-5 h-5 text-[#F5BA42]" /> },
    { title: "CREATIVE APPROACH", desc: "Unique ideas and visuals that make your brand stand out.", icon: <Zap className="w-5 h-5 text-[#F5BA42]" /> },
    { title: "QUALITY DELIVERED", desc: "High quality work delivered on time, every time.", icon: <Rocket className="w-5 h-5 text-[#F5BA42]" /> },
    { title: "CLIENT SATISFACTION", desc: "Your satisfaction is my priority. Let's build something great.", icon: <ShieldCheck className="w-5 h-5 text-[#F5BA42]" /> },
  ];

  return (
    <section id="services" className="relative py-24 bg-[#f8fafc] dark:bg-[#050814] border-t border-black/5 dark:border-white/5 text-[#0a1128] dark:text-white transition-colors duration-300">
      {/* Glow shapes */}
      <div className="absolute top-[25%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#FF6B00]/5 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[30%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#00F0FF]/5 blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] dark:text-[#F5BA42] text-xs font-black uppercase tracking-[0.25em] mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Multi-Disciplinary Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0a1128] dark:text-white">
            EXPERTISE & <span className="text-gradient-orange">SERVICES</span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-[#FF6B00] to-[#F5BA42] mt-4 shadow-[0_0_12px_rgba(255,107,0,0.5)] rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed">
            Click on any live project preview below to inspect real case studies, video showreels, and creative artworks.
          </p>
        </motion.div>

        {/* 3 Glowing Service Cards with REAL Project Previews */}
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            initial: {},
            whileInView: { transition: { staggerChildren: 0.12 } }
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20"
        >
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              variants={{
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className={`p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-400 hover:-translate-y-2 border bg-white dark:bg-gradient-to-br dark:from-[#0D1B38] dark:via-[#081328] dark:to-[#050C1A] text-[#111318] dark:text-white ${srv.glassStyle} border-[#E5E7EB] dark:border-[inherit]`}
            >
              {/* Card top */}
              <div>
                
                {/* Visual Project Preview Frame (Interactive) */}
                <div 
                  onClick={() => setActivePreview(srv.modalData)}
                  className="group/thumb relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-white/10 hover:border-[#F5BA42] cursor-pointer shadow-lg transition-all duration-300"
                >
                  <Image
                    src={srv.previewImg}
                    alt={srv.title}
                    fill
                    className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-75 group-hover/thumb:opacity-40 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-mono font-bold text-[#F5BA42]">
                      {srv.previewBadge}
                    </span>
                    <span className="text-2xl font-black font-mono opacity-60 text-white">
                      {srv.num}
                    </span>
                  </div>

                  {/* Center Play / Zoom Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                    <div className="w-11 h-11 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.6)] scale-90 group-hover/thumb:scale-100 transition-transform">
                      {srv.num === "02" ? <Play className="w-5 h-5 fill-current ml-0.5" /> : <Eye className="w-5 h-5 stroke-[2.5]" />}
                    </div>
                  </div>

                  {/* Bottom preview label */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-slate-300 pointer-events-none">
                    <span className="truncate font-semibold text-white">{srv.previewSub}</span>
                    <span className="text-[#FF6B00] font-bold text-[9px] uppercase tracking-wider flex items-center gap-0.5">
                      Preview <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-black tracking-wider text-[#111318] dark:text-white mb-2 flex items-center justify-between">
                  <span>{srv.title}</span>
                </h3>
                
                {/* Description */}
                <p className="text-xs text-[#4B5563] dark:text-slate-300 mb-6 leading-relaxed">
                  {srv.desc}
                </p>

                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {srv.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center space-x-2.5 text-xs text-[#374151] dark:text-slate-200">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${srv.badgeColor}`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Action Button */}
              <button 
                onClick={() => scrollToSection(srv.targetSection)}
                className={`w-full py-3 rounded-xl border text-center font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer ${srv.btnColor}`}
              >
                <span>{srv.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Banner Row: Core Values */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 rounded-2xl bg-gradient-to-r from-[#0C1A38] via-[#081226] to-[#050C1A] border-[1.5px] border-[#D4AF37]/40 mb-8 shadow-2xl text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {values.map((v, idx) => (
              <div key={idx} className="flex flex-col space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5BA42]/10 border border-[#F5BA42]/30 flex items-center justify-center">
                    {v.icon}
                  </div>
                  <span className="font-extrabold text-xs tracking-widest text-[#111318] dark:text-white">{v.title}</span>
                </div>
                <p className="text-[11px] text-[#4B5563] dark:text-slate-400 leading-relaxed pl-0 md:pl-11">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/40 bg-white dark:bg-gradient-to-r dark:from-[#0B1528] dark:via-[#081226] dark:to-[#050C1A] flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl text-[#111318] dark:text-white"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#D4AF37] flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,107,0,0.4)]">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#111318] dark:text-white text-base sm:text-lg">Have a project or high-impact role in mind?</h4>
              <p className="text-xs text-[#4B5563] dark:text-slate-400">Let's craft memorable digital products and visual stories together.</p>
            </div>
          </div>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-3.5 bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#D4AF37] hover:from-[#FF7A00] hover:to-[#F5BA42] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer flex items-center space-x-2 shrink-0"
          >
            <span>Let's Work Together</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </motion.div>

      </div>

      {/* Service Preview Lightbox Modal */}
      <AnimatePresence>
        {activePreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePreview(null)}
              className="absolute inset-0 cursor-pointer"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activePreview.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-3xl w-full rounded-2xl border-[1.5px] border-[#D4AF37]/60 overflow-hidden shadow-2xl z-10 bg-[#0A1428] text-white"
            >
              <button
                onClick={() => setActivePreview(null)}
                className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-white rounded-full bg-black/70 border border-white/10 transition-colors cursor-pointer"
                aria-label="Close preview modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-[16/10] bg-black">
                <Image
                  src={activePreview.image}
                  alt={activePreview.title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="p-6 bg-[#081226] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#F5BA42] uppercase tracking-wider font-bold">
                    {activePreview.badge}
                  </span>
                  <h4 className="text-xl font-black text-white uppercase">{activePreview.title}</h4>
                  <p className="text-xs text-slate-300 max-w-lg">{activePreview.desc}</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                  <a
                    href={activePreview.actionLink}
                    onClick={() => setActivePreview(null)}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#D4AF37] hover:from-[#FF7A00] hover:to-[#F5BA42] text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <span>{activePreview.actionLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setActivePreview(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
