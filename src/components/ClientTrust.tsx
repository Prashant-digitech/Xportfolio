"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, CheckCircle2, Star, Clock, Trophy, Heart, Activity,
  ChevronLeft, ChevronRight, Sparkles, ShieldCheck, FileCheck, Layers,
  ExternalLink, X, Quote, Zap, Award
} from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  category: "uiux" | "graphics" | "mentorship";
  outcome: string;
  tools: string[];
  initials: string;
  gradient: string;
}

interface DeliverableGuarantee {
  title: string;
  spec: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
}

export default function ClientTrust() {
  const [viewMode, setViewMode] = useState<"marquee" | "carousel">("carousel");
  const [activeCarouselIdx, setActiveCarouselIdx] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<"all" | "uiux" | "graphics" | "mentorship">("all");
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const testimonials: Testimonial[] = [
    { 
      id: "aman-sharma",
      quote: "Prashant Sir is the most patient, enthusiastic, and knowledgeable mentor at Ducat Vikaspuri. His hands-on training on Figma, design systems, and real-world UI workflows gave me the exact confidence and portfolio needed to land my first product designer job.", 
      author: "Aman Sharma", 
      role: "UI/UX Designer", 
      company: "Ducat Vikaspuri Alumni",
      category: "uiux",
      outcome: "Secured Product Designer role within 45 days of course completion.",
      tools: ["Figma Systems", "Auto-Layout", "User Flows", "Prototyping"],
      initials: "AS",
      gradient: "from-blue-500 to-indigo-600"
    },
    { 
      id: "pooja-verma",
      quote: "Learning graphic design and typography under Prashant Sir at Vikaspuri Ducat was a career-defining experience. Complex tools like Photoshop, Illustrator, and visual manipulation felt effortless with his practical, step-by-step coaching.", 
      author: "Pooja Verma", 
      role: "Graphic & Brand Designer", 
      company: "Ducat Vikaspuri Alumni",
      category: "graphics",
      outcome: "Transitioned from beginner to lead graphic & brand identity specialist.",
      tools: ["Photoshop Matte", "Illustrator Vectors", "Typography", "Brand Identity"],
      initials: "PV",
      gradient: "from-amber-500 to-orange-600"
    },
    { 
      id: "rahul-mehra",
      quote: "Prashant Sir's teaching style is unmatched! He makes even the most difficult UX heuristics, wireframing rules, and responsive design systems feel simple with his humor and live industry examples. Hands-down the best mentor you could ask for.", 
      author: "Rahul Mehra", 
      role: "UI/UX & Frontend Trainee", 
      company: "Ducat Vikaspuri Alumni",
      category: "uiux",
      outcome: "Mastered end-to-end design token architecture and developer handshakes.",
      tools: ["Figma", "Design Tokens", "Wireframing", "Tailwind CSS"],
      initials: "RM",
      gradient: "from-emerald-500 to-teal-600"
    },
    { 
      id: "neha-choudhary",
      quote: "From day one at Ducat Vikaspuri, Prashant Sir pushed us to think like senior design leaders. His portfolio reviews, strict attention to typography, and color harmony helped me craft a standout portfolio that impressed every recruiter.", 
      author: "Neha Choudhary", 
      role: "Digital Product Designer", 
      company: "Ducat Vikaspuri Alumni",
      category: "mentorship",
      outcome: "Built an agency-ready design portfolio landing multiple recruiter interview requests.",
      tools: ["Portfolio Curation", "Design Strategy", "Design Heuristics", "Figma"],
      initials: "NC",
      gradient: "from-purple-500 to-pink-600"
    },
    { 
      id: "vikas-gupta",
      quote: "Prashant Sir's mentorship at Ducat Vikaspuri gave me complete mastery over color theory, corporate branding, and video motion compositing. His dedication to each student's career growth is truly exceptional.", 
      author: "Vikas Gupta", 
      role: "Motion & Graphic Artist", 
      company: "Ducat Vikaspuri Alumni",
      category: "graphics",
      outcome: "Specialized in high-impact motion trailers and corporate marketing collateral.",
      tools: ["Premiere Pro", "After Effects", "Color Grading", "Motion Posters"],
      initials: "VG",
      gradient: "from-rose-500 to-red-600"
    },
    { 
      id: "deepak-rawat",
      quote: "The best faculty for UI/UX and Graphic Design in Delhi! Prashant Sir clarifies every doubt with immense patience. His practical assignments replicate real agency design briefs.", 
      author: "Deepak Rawat", 
      role: "Visual UX Trainee", 
      company: "Ducat Vikaspuri Alumni",
      category: "mentorship",
      outcome: "Completed 12 live client briefs replicating real product sprint timelines.",
      tools: ["Agile UX Sprints", "Wireframing", "Interaction Design", "Figma"],
      initials: "DR",
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  const filteredTestimonials = activeCategory === "all" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  const metrics = [
    { title: "Students Mentored", value: "500+", label: "Ducat & design cohorts", icon: <Users className="w-5 h-5 text-[#D4AF37]" /> },
    { title: "Student Rating", value: "4.9/5", label: "Ducat Vikaspuri reviews", icon: <Heart className="w-5 h-5 text-neon-violet" /> },
    { title: "Course Curriculum", value: "Industry UX", label: "Figma, Adobe CC, Next.js", icon: <Activity className="w-5 h-5 text-[#D4AF37]" /> },
    { title: "Placement Rate", value: "95%+", label: "Portfolio-ready careers", icon: <Trophy className="w-5 h-5 text-neon-blue" /> },
    { title: "Practical Focus", value: "100%", label: "Live hands-on assignments", icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" /> }
  ];

  const deliverableGuarantees: DeliverableGuarantee[] = [
    {
      title: "WCAG 2.1 AA Accessibility",
      spec: "4.5:1 Minimum Contrast • Focus Rings",
      description: "Every screen adheres to strict WCAG 2.1 AA color contrast, keyboard focus ordering, and screen-reader accessibility standards.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      badge: "Accessibility Guarantee"
    },
    {
      title: "Zero-Drift Tokenized Figma",
      spec: "100% Auto-Layout • Named Tokens",
      description: "Structured Figma component architecture with tokenized color, typography, spacing, and elevation variables ready for engineering hand-off.",
      icon: <Layers className="w-5 h-5 text-neon-blue" />,
      badge: "Design System Strictness"
    },
    {
      title: "Sub-100ms Micro-Interactions",
      spec: "60 FPS Transitions • Zero Layout Shift",
      description: "Hardware-accelerated CSS/Framer motion easing curves engineered with zero cumulative layout shift (CLS < 0.05).",
      icon: <Zap className="w-5 h-5 text-[#FF6B00]" />,
      badge: "Performance Benchmark"
    },
    {
      title: "Print-Ready Vector & CMYK",
      spec: "300 DPI • Bleed Lines • Vector Curves",
      description: "Commercial print-ready graphics, packaging layouts, and movie posters built with strict CMYK color proofing and crisp vector paths.",
      icon: <FileCheck className="w-5 h-5 text-[#D4AF37]" />,
      badge: "Commercial Quality"
    },
    {
      title: "Engineering-Ready Handshake",
      spec: "Clean Semantic HTML • React/Next.js",
      description: "Full developer collaboration empathy: structured React component hierarchy, reusable CSS classes, and zero design ambiguity.",
      icon: <Award className="w-5 h-5 text-purple-400" />,
      badge: "Code Integration"
    }
  ];

  const handleNext = () => {
    setActiveCarouselIdx((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    setActiveCarouselIdx((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  return (
    <section id="trust" className="relative py-24 bg-[#f8fafc] dark:bg-[#050505] text-[#0a1128] dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* CSS keyframe injection for marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION 13: TESTIMONIAL WALL */}
        <div className="mb-24">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#B8941F] dark:text-[#D4AF37]">
              Ducat Vikaspuri & Student Mentorship
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#0a1128] dark:text-white">
              STUDENT TRUST & <span className="text-gradient-gold">REVIEWS</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#D4AF37] mt-4 shadow-[0_0_8px_#D4A017]" />
            <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
              Verified testimonials and career milestones from design trainees and professionals mentored by Prashant Sir at Ducat Vikaspuri.
            </p>
          </div>

          {/* Interactive Controls: Mode Switcher & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Reviews (6)" },
                { id: "uiux", label: "UI/UX Design" },
                { id: "graphics", label: "Branding & Graphics" },
                { id: "mentorship", label: "Career Mentorship" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id as any);
                    setActiveCarouselIdx(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-[#D4AF37] text-black shadow-md font-extrabold"
                      : "bg-white dark:bg-[#0F1118] border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#D4AF37]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <button
                onClick={() => setViewMode("carousel")}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === "carousel"
                    ? "bg-[#D4AF37] text-black font-extrabold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Spotlight Carousel
              </button>
              <button
                onClick={() => setViewMode("marquee")}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === "marquee"
                    ? "bg-[#D4AF37] text-black font-extrabold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Infinite Wall
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: INTERACTIVE CAROUSEL */}
          {viewMode === "carousel" && (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredTestimonials.map((t, idx) => (
                    <motion.div
                      key={t.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => setSelectedTestimonial(t)}
                      className="p-6 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-white/10 shadow-lg flex flex-col justify-between hover:border-[#D4AF37]/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
                    >
                      <div>
                        {/* Header: Stars & Category Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex space-x-1 text-[#F5BA42]">
                            {Array.from({ length: 5 }).map((_, sIdx) => (
                              <Star key={sIdx} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#B8941F] dark:text-[#F5BA42] border border-[#D4AF37]/20 font-bold uppercase tracking-wider">
                            {t.category.toUpperCase()}
                          </span>
                        </div>

                        {/* Quote excerpt */}
                        <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed mb-6 line-clamp-4 italic">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </div>

                      <div>
                        {/* Outcome Tag */}
                        <div className="p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 mb-4 text-[11px] text-slate-600 dark:text-slate-400">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                            ✓ Verified Outcome:
                          </span>
                          <span className="line-clamp-1">{t.outcome}</span>
                        </div>

                        {/* Author Info & Avatar */}
                        <div className="border-t border-black/5 dark:border-white/5 pt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${t.gradient} text-white font-bold text-xs flex items-center justify-center shadow-md`}>
                              {t.initials}
                            </div>
                            <div>
                              <span className="font-bold text-sm text-[#0a1128] dark:text-white block group-hover:text-[#B8941F] dark:group-hover:text-[#F5BA42] transition-colors">
                                {t.author}
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                {t.role}
                              </span>
                            </div>
                          </div>

                          <span className="text-[10px] font-mono text-[#B8941F] dark:text-[#F5BA42] group-hover:underline">
                            Details →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: INFINITE MARQUEE */}
          {viewMode === "marquee" && (
            <div className="relative w-full flex overflow-hidden border-t border-b border-black/10 dark:border-white/10 py-8 bg-black/[0.02] dark:bg-[#090909]/20 rounded-2xl">
              {/* Gradient shadow caps on left/right edges */}
              <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#f8fafc] dark:from-[#050505] to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#f8fafc] dark:from-[#050505] to-transparent z-10 pointer-events-none" />

              {/* Scrolling container */}
              <div className="flex space-x-6 shrink-0 animate-marquee whitespace-nowrap">
                {[...filteredTestimonials, ...filteredTestimonials].map((t, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedTestimonial(t)}
                    className="w-[300px] sm:w-[380px] p-6 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 shadow-md inline-block whitespace-normal select-none cursor-pointer hover:border-[#D4AF37]/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-1 text-[#F5BA42]">
                        {Array.from({ length: 5 }).map((_, sIdx) => (
                          <Star key={sIdx} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        ✓ Verified Alumni
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed mb-4 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    <div className="border-t border-black/5 dark:border-white/5 pt-3.5 flex items-center justify-between text-[11px]">
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${t.gradient} text-white font-bold text-[10px] flex items-center justify-center`}>
                          {t.initials}
                        </div>
                        <div>
                          <span className="font-bold text-[#0a1128] dark:text-white block">{t.author}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{t.role}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#B8941F] dark:text-[#F5BA42] font-mono">
                        Inspect
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ENTERPRISE VERIFIED DELIVERABLES & SLA GUARANTEES GRID */}
        <div className="mb-24">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#B8941F] dark:text-[#D4AF37]">
              Quality Assurance Benchmarks
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-2 text-[#0a1128] dark:text-white">
              VERIFIED DELIVERABLES & <span className="text-gradient-orange">SLA GUARANTEES</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#FF6B00] mt-4 shadow-[0_0_8px_#FF6B00]" />
            <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-xl text-sm leading-relaxed">
              Every design artifact and project hand-off is governed by strict enterprise specifications, WCAG AA compliance, and zero-drift token integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverableGuarantees.map((deliv, dIdx) => (
              <div
                key={dIdx}
                className="p-6 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-white/10 hover:border-[#D4AF37]/50 shadow-lg flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                      {deliv.icon}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {deliv.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#0a1128] dark:text-white group-hover:text-[#B8941F] dark:group-hover:text-[#F5BA42] transition-colors">
                    {deliv.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[#B8941F] dark:text-[#F5BA42] font-bold block mt-1">
                    {deliv.spec}
                  </span>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
                    {deliv.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Standard Protocol</span>
                  <span className="text-emerald-500 font-bold">✓ 100% Enforced</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 14: CLIENT TRUST SECTION (Metrics Dashboard) */}
        <div>
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#B8941F] dark:text-[#D4AF37]">
              Trust Operations Control
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-2 text-[#0a1128] dark:text-white">
              CLIENT TRUST <span className="text-gradient-gold">METRICS</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#D4AF37] mt-4 shadow-[0_0_8px_#D4A017]" />
            <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-xl text-sm leading-relaxed">
              Real-time operational dashboard monitoring quality metrics, project velocities, and system response targets.
            </p>
          </div>

          {/* Luxury dashboard grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {metrics.map((m, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl glass-card dark-blue-gold-card border border-black/10 dark:border-white/10 flex flex-col justify-between hover:border-[#D4AF37]/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] uppercase font-mono font-bold text-slate-500 tracking-wider">// KPI_{idx + 1}</span>
                  <div className="p-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 group-hover:text-[#F5BA42] transition-colors">{m.icon}</div>
                </div>

                <div className="my-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0a1128] dark:text-white">{m.value}</h3>
                  <span className="text-[10px] font-bold text-[#B8941F] dark:text-[#F5BA42] uppercase tracking-wider block mt-1">{m.title}</span>
                </div>

                <div className="border-t border-black/5 dark:border-white/5 pt-3 text-[10px] text-slate-600 dark:text-slate-400 leading-normal font-mono">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* TESTIMONIAL DETAIL / CAREER OUTCOME MODAL */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#090D18] border border-black/10 dark:border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                aria-label="Close testimonial popover"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${selectedTestimonial.gradient} text-white font-black text-lg flex items-center justify-center shadow-lg`}>
                  {selectedTestimonial.initials}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#B8941F] dark:text-[#F5BA42] uppercase font-bold tracking-wider block">
                    Verified Ducat Mentee • {selectedTestimonial.category.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-black text-[#0a1128] dark:text-white">
                    {selectedTestimonial.author}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    {selectedTestimonial.role} • {selectedTestimonial.company}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="relative p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 mb-6">
                <Quote className="w-6 h-6 text-[#D4AF37]/30 absolute top-3 left-3 -z-0" />
                <p className="relative z-10 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  &ldquo;{selectedTestimonial.quote}&rdquo;
                </p>
              </div>

              {/* Career Milestone Outcome */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block mb-1">
                    Career Milestone & Placement
                  </span>
                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                    ✓ {selectedTestimonial.outcome}
                  </p>
                </div>

                {/* Mastered Tools Under Mentorship */}
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block mb-2">
                    Key Competencies Mastered Under Prashant Sir
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedTestimonial.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Ducat Vikaspuri Cohort</span>
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="px-4 py-1.5 rounded-lg bg-[#D4AF37] text-black font-bold uppercase text-[10px] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
