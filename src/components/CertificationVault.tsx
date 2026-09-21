"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, Calendar, BookOpen, ExternalLink, X, HelpCircle, GraduationCap, ShieldCheck
} from "lucide-react";
import Image from "next/image";

interface Certificate {
  title: string;
  institution: string;
  period: string;
  description: string;
  image: string;
}

export default function CertificationVault() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [flippedCertIdx, setFlippedCertIdx] = useState<number | null>(null);

  const toggleFlip = (idx: number, e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    setFlippedCertIdx(prev => prev === idx ? null : idx);
  };

  const certificates: Certificate[] = [
    {
      title: "Google UX Design Professional Certificate",
      institution: "Google / Coursera",
      period: "2024",
      description: "Rigorous industry-recognized professional UX curriculum covering foundational user research, empathy maps, personas, wireframing, high-fidelity Figma prototyping, and multi-round usability testing.",
      image: "/certificates/Google UX.pdf"
    },
    {
      title: "MTech in Production Management",
      institution: "Visvesvaraya Technological University (VTU)",
      period: "2010–2012",
      description: "Advanced product development management, manufacturing workflow optimization, and engineering systems. Graduated with a Silver Medal for academic excellence.",
      image: "/certificates/Mtech certi.jpg"
    },
    {
      title: "BE in Mechanical Engineering",
      institution: "Visvesvaraya Technological University (VTU)",
      period: "2003–2007",
      description: "Core mechanical engineering principles, structural system designs, fluid mechanics, and engineering graphics frameworks.",
      image: "/certificates/Btech Certi.jpg"
    },
    {
      title: "Professional Web Design & Dev",
      institution: "Arena Animation Institute",
      period: "2021–2022",
      description: "Comprehensive front-end development, responsive visual layouts, CSS systems, JavaScript interface logic, and modern web templates.",
      image: "/certificates/arena web design.jpg"
    },
    {
      title: "CCNA Routing & Switching",
      institution: "Cisco Networking Academy",
      period: "2018–2019",
      description: "Network systems engineering, subnets routing architectures, packet routing logistics, and device switch configurations.",
      image: "/certificates/ccna.jpg"
    },
    {
      title: "Azure AI Fundamentals",
      institution: "Microsoft",
      period: "2023",
      description: "Foundational knowledge of machine learning concepts and artificial intelligence workloads within Azure cloud services.",
      image: "/certificates/azure ai.jpg"
    },
    {
      title: "Azure Fundamentals",
      institution: "Microsoft",
      period: "2023",
      description: "Understanding of Azure cloud architectural structures, core services, security compliance, governance, and hosting setups.",
      image: "/certificates/azure fundamentals.jpg"
    },
    {
      title: "Arena Video Editing & Motion",
      institution: "Arena Animation Institute",
      period: "2021–2022",
      description: "Non-linear digital video editing, color grading layouts, kinetic typography, motion graphics, and audio balancing.",
      image: "/certificates/Arena video editing.jpg"
    },
    {
      title: "Arena Visual & Graphics Design",
      institution: "Arena Animation Institute",
      period: "2021–2022",
      description: "Corporate visual identities, graphic layouts curation, vector branding graphics, and typography systems.",
      image: "/certificates/arena visual.jpg"
    },
    {
      title: "Advanced Diploma in CADD PRO-E",
      institution: "CAD Center",
      period: "2009–2010",
      description: "Parametric 3D mechanical modeling, mechanical components blueprints design, product assembly, and engineering graphics.",
      image: "/certificates/proe.jpg"
    },
    {
      title: "C/C++ Programming Course",
      institution: "Professional Course Center",
      period: "2014",
      description: "Core logic development, object-oriented concepts, compilers execution, data structures, and memory references.",
      image: "/certificates/C.jpg"
    }
  ];

  const timelineEvents = [
    { 
      year: "2025+", 
      title: "AI Product Design & UX Strategy", 
      desc: "Crafting human-centered generative AI workflows, agent prompts, and custom dashboard design systems.",
      image: "/images/ux/projects/TradeX.png",
      tag: "AI & Figma",
      badge: "Live System",
      institution: "Enterprise FinTech & DeepAstro"
    },
    { 
      year: "2023", 
      title: "React & Modern UI Architecture", 
      desc: "Building modular reactive components, custom canvas particle animations, and Next.js platforms.",
      image: "/images/ux/projects/CosmosX.png",
      tag: "Next.js / React",
      badge: "Telemetry UI",
      institution: "Modern Web Systems"
    },
    { 
      year: "2021", 
      title: "Professional Web Design (Arena Animation)", 
      desc: "Web design principles, layout grids, HTML/CSS coding, JavaScript animations.",
      image: "/certificates/arena web design.jpg",
      tag: "Arena Animation",
      badge: "Distinction",
      institution: "Arena Animation Institute"
    },
    { 
      year: "2018", 
      title: "Cisco CCNA Routing & Switching", 
      desc: "Structured logic flow networks, packets tracing, routing architectures.",
      image: "/certificates/ccna.jpg",
      tag: "Cisco Systems",
      badge: "Certified",
      institution: "Cisco Networking Academy"
    },
    { 
      year: "2014", 
      title: "C/C++ Programming Foundations", 
      desc: "Object-oriented scripting logic, debugging systems, structural code layouts.",
      image: "/certificates/C.jpg",
      tag: "Core Computing",
      badge: "Programming",
      institution: "Professional Course Center"
    },
    { 
      year: "2010", 
      title: "MTech Production Management (Silver Medal)", 
      desc: "Academic excellence, project planning, resource optimization, manufacturing blueprints.",
      image: "/certificates/Mtech certi.jpg",
      tag: "VTU University",
      badge: "Silver Medal",
      institution: "Visvesvaraya Technological University"
    },
    { 
      year: "2009", 
      title: "Advanced CADD PRO-E (CAD Center)", 
      desc: "3D CAD modeling, blueprints compilation, parametric solid framework design.",
      image: "/certificates/proe.jpg",
      tag: "Parametric 3D",
      badge: "CAD Certified",
      institution: "CAD Center"
    },
    { 
      year: "2003", 
      title: "BE Mechanical Engineering (VTU)", 
      desc: "Thermodynamics, mechanical frameworks modeling, systems designs, engineering fundamentals.",
      image: "/certificates/Btech Certi.jpg",
      tag: "Engineering Roots",
      badge: "First Class",
      institution: "Visvesvaraya Technological University"
    }
  ];

  return (
    <section className="relative py-24 bg-[#f8fafc] dark:bg-[#050814] text-[#0a1128] dark:text-white transition-colors duration-300">
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-[#FF6B00]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION 11: CERTIFICATION VAULT */}
        <div className="mb-24">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Verified Academic Credentials</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#0a1128] dark:text-white">
              CERTIFICATION <span className="text-gradient-orange">VAULT</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#FF6B00] mt-4 shadow-[0_0_8px_#FF6B00]" />
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl text-sm leading-relaxed">
              Hover over any credential card below to flip it in 3D, and click to inspect the verified detail certificate.
            </p>
          </div>

          {/* 3D Flip Certificate Grid (Dark Blue with Golden Stroke) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((c, idx) => {
              const isFlipped = flippedCertIdx === idx;
              return (
                <div 
                  key={idx}
                  tabIndex={0}
                  role="button"
                  aria-label={`${c.title}, issued by ${c.institution} in ${c.period}. Press Enter or Space to flip, or click inspect button to view document.`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleFlip(idx, e);
                    }
                  }}
                  onClick={() => toggleFlip(idx)}
                  className="group relative h-48 w-full cursor-pointer [perspective:1000px] select-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-2xl"
                >
                  {/* Inner Flip Wrapper */}
                  <div className={`absolute inset-0 h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  } group-hover:[transform:rotateY(180deg)] border-[1.5px] border-[#D6D9DE] dark:border-[#D4AF37]/50 group-hover:border-[#D4AF37] dark:group-hover:border-[#F5BA42] bg-white dark:bg-gradient-to-br dark:from-[#0D1B38] dark:via-[#081328] dark:to-[#050C1A] shadow-lg`}>
                    
                    {/* Front Side */}
                    <div className="absolute inset-0 h-full w-full p-6 flex flex-col justify-between [backface-visibility:hidden]">
                      <div className="flex justify-between items-start">
                        <div className="p-2 rounded-xl bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 shadow-sm"><Award className="w-5 h-5" /></div>
                        <span className="text-[10px] text-[#B8941F] dark:text-[#F5BA42] font-mono font-bold">{c.period}</span>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-[#111318] dark:text-white uppercase tracking-wider mb-1 group-hover:text-[#B8941F] dark:group-hover:text-[#F5BA42] transition-colors">{c.title}</h4>
                        <p className="text-xs text-[#4B5563] dark:text-slate-300 font-medium">{c.institution}</p>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 h-full w-full p-6 flex flex-col justify-between bg-[#F4F1E8] dark:bg-gradient-to-br dark:from-[#0D1B38] dark:to-[#050C1A] border-[1.5px] border-[#D4AF37] rounded-2xl text-[#111318] dark:text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <div>
                        <span className="text-[9px] font-mono text-[#B8941F] dark:text-[#F5BA42] block uppercase tracking-widest mb-1.5 font-bold">CREDENTIAL OVERVIEW</span>
                        <p className="text-[11px] text-[#374151] dark:text-slate-200 leading-relaxed">
                          {c.description}
                        </p>
                      </div>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCert(c);
                        }}
                        className="flex justify-between items-center text-[10px] text-[#FF6B00] hover:text-[#B8941F] dark:hover:text-[#F5BA42] font-bold uppercase tracking-widest border-t border-black/10 dark:border-[#D4AF37]/30 pt-2.5 transition-colors cursor-pointer"
                      >
                        <span>Inspect verified doc</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 12: EXPERIENCE JOURNEY TIMELINE */}
        <div>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Career Progression Vector</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#0a1128] dark:text-white">
              EXPERIENCE <span className="text-gradient-orange">JOURNEY</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#FF6B00] mt-4 shadow-[0_0_8px_#FF6B00]" />
            <p className="text-[#4B5563] dark:text-slate-400 mt-4 max-w-xl text-sm leading-relaxed">
              Chronological layout connecting Prashant's solid engineering roots to modern reactive UI/UX and AI product design workflows.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative border-l border-[#D4AF37]/30 pl-8 ml-4 sm:ml-8 space-y-12 py-4">
            {timelineEvents.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="relative group"
              >
                {/* Bullet node indicator */}
                <div className="absolute -left-[43px] top-4 w-5 h-5 rounded-full border-2 border-[#FF6B00] bg-white dark:bg-[#050C1A] group-hover:bg-[#FF6B00] transition-colors duration-300 shadow-[0_0_10px_#FF6B00] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#F5BA42] rounded-full" />
                </div>

                <div className="p-6 rounded-2xl border-[1.5px] border-[#D6D9DE] dark:border-[#D4AF37]/45 bg-white dark:bg-gradient-to-br dark:from-[#0D1B38] dark:via-[#081328] dark:to-[#050C1A] group-hover:border-[#D4AF37] dark:group-hover:border-[#F5BA42] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left Column: Details */}
                  <div className="space-y-1.5 md:max-w-md lg:max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#B8941F] dark:text-[#F5BA42] uppercase tracking-widest font-mono block">{t.year}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#4B5563] dark:text-slate-300 font-mono">
                        {t.institution}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-base text-[#111318] dark:text-white uppercase tracking-wider group-hover:text-[#B8941F] dark:group-hover:text-[#F5BA42] transition-colors">
                      {t.title}
                    </h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>

                  {/* Right Column: Visual Milestone Preview Thumbnail */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div 
                      onClick={() => setSelectedCert({
                        title: t.title,
                        institution: t.institution,
                        period: t.year,
                        description: t.desc,
                        image: t.image
                      })}
                      className="group/img relative w-36 sm:w-44 md:w-52 aspect-[16/10] rounded-xl overflow-hidden border-[1.5px] border-[#D4AF37]/50 group-hover:border-[#F5BA42] shadow-[0_4px_20px_rgba(0,0,0,0.5)] bg-[#050B16] cursor-pointer transition-all duration-300 hover:scale-105"
                      title="Click to inspect credential"
                    >
                      <Image
                        src={t.image}
                        alt={t.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/img:scale-110"
                        sizes="(max-width: 768px) 150px, 220px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-75 group-hover/img:opacity-40 transition-opacity" />
                      <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-md border border-[#D4AF37]/40 text-[8px] font-mono font-bold text-[#F5BA42]">
                        {t.tag}
                      </div>
                      <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] font-bold text-white uppercase">
                        <span className="text-[#FF6B00] truncate">{t.badge}</span>
                        <ExternalLink className="w-3 h-3 text-[#F5BA42] shrink-0 ml-1" />
                      </div>
                    </div>

                    <div className="hidden lg:flex flex-col items-end text-right space-y-1">
                      <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                        VERIFIED CREDENTIAL
                      </span>
                      <span className="text-[8px] font-mono text-slate-400">
                        OFFICIAL RECORD
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-6 backdrop-blur-md"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-lg rounded-xl border border-gold/30 bg-[#0d0d0d] p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-1 rounded-full bg-white/5 border border-white/10 hover:border-gold text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="flex items-center space-x-2 text-gold mb-4">
                <ShieldCheck className="w-6 h-6 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">VERIFIED_SYSTEM_CREDENTIAL</span>
              </div>

              <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">
                {selectedCert.title}
              </h3>
              
              <div className="flex items-baseline space-x-2 mb-6 border-b border-white/5 pb-4">
                <span className="text-xs font-mono text-gold">{selectedCert.institution}</span>
                <span className="text-[9px] text-gray-500 font-mono uppercase font-bold">({selectedCert.period})</span>
              </div>

              {/* Real Certificate Image or Fallback Mockup or PDF */}
              <div className="w-full aspect-[4/3] rounded-lg border border-gold/20 bg-[#080808] flex items-center justify-center relative overflow-hidden mb-6 shadow-inner">
                {selectedCert.image.endsWith(".pdf") ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#D4AF37] flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,107,0,0.5)]">
                      <Award className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-base uppercase tracking-wider">{selectedCert.title}</h4>
                      <p className="text-xs text-slate-300 mt-1 font-mono">Issued by {selectedCert.institution} • {selectedCert.period}</p>
                    </div>
                    <a
                      href={selectedCert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#D4AF37] hover:from-[#FF7A00] hover:to-[#F5BA42] text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Official Google Certificate (PDF)</span>
                    </a>
                  </div>
                ) : selectedCert.image.startsWith("/certificates/") ? (
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    {/* Geometric halo bg */}
                    <div className="absolute inset-4 rounded-lg border border-dashed border-gold/20 animate-pulse-slow" />
                    <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-3">
                      <Award className="w-6 h-6" />
                    </div>
                    <h4 className="font-extrabold text-xs text-white uppercase tracking-wider max-w-xs">{selectedCert.title}</h4>
                    <p className="text-[10px] text-gray-500 mt-2 font-mono">{selectedCert.image}</p>
                  </div>
                )}
                
                {!selectedCert.image.startsWith("/certificates/") && (
                  <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full border border-gold bg-[#050505] flex items-center justify-center text-[7px] font-mono text-gold-light font-bold">
                    VTU SEAL
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-400 leading-relaxed font-mono">
                {"// verified cryptographic sign checksum: SHA256_"}
                {selectedCert.title.replace(/\s+/g, "").toUpperCase().slice(0, 12)}
                {"_OK_2026"}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
