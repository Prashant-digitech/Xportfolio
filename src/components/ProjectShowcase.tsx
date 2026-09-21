"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileData } from "@/app/page";
import { 
  Play, Video, FileText, Image as ImageIcon, ChevronLeft, ChevronRight, 
  ExternalLink, Layers, Film, PenTool, Sparkles, Filter, Presentation,
  BookOpen, Star, ArrowRight, Pause, Volume2, Maximize2, X, Music, CheckCircle, Sliders
} from "lucide-react";
import { uxProjectsList, UXProject } from "@/data/uxProjects";
import UXCaseStudyModal from "@/components/UXCaseStudyModal";

interface ShowcaseProject {
  title: string;
  category: "uiux" | "web" | "mobile" | "graphics" | "video" | "ai" | "ppt";
  description: string;
  img: string;
  caseStudy: string;
  figmaUrl: string;
  uxProjectId?: string;
  statsBadge?: string;
}

interface ProjectShowcaseProps {
  profile: ProfileData;
}

export default function ProjectShowcase({ profile }: ProjectShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeCinemaIdx, setActiveCinemaIdx] = useState<number>(0);
  const [pptSlideIdx, setPptSlideIdx] = useState<number>(0);
  const [showreelTab, setShowreelTab] = useState<"showreel" | "bts" | "motion">("showreel");
  const [selectedUXProject, setSelectedUXProject] = useState<UXProject | null>(null);
  const [showreelModalOpen, setShowreelModalOpen] = useState<boolean>(false);
  const [isPlayingShowreel, setIsPlayingShowreel] = useState<boolean>(true);
  const [showreelChapter, setShowreelChapter] = useState<number>(0);

  // Cinematic Featured Projects (Section 15)
  const featuredProjects = [
    {
      id: "tradex",
      title: "TradeX Pro Financial Terminal",
      desc: "Enterprise-grade quantitative crypto & algorithmic trading terminal. Features sub-second execution speeds, live order book depth, and customizable modular smart-tile workspaces.",
      accent: "#00F5A0",
      spec: "FINTECH UX • HIGH-FREQUENCY TRADING • DARK MODE",
      challenge: "High-frequency traders faced severe cognitive overload and costly execution errors across fragmented, rigid legacy trading software.",
      impact: "Handled $1.2B+ quarterly volume with 0.12s execution latency and an 83% drop in erroneous order sizes.",
      img: "/images/ux/projects/TradeX.png",
      uxProjectId: "tradex",
    },
    {
      id: "deepastro",
      title: "DeepAstro AI Life Intelligence",
      desc: "An AI-powered Vedic astrology platform blending ancient cosmic wisdom with modern generative intelligence. Provides personalized life optimization roadmaps, planetary alignments, and evidence-based guidance.",
      accent: "#00F0FF",
      spec: "UI/UX • AI LIFE PLATFORM • MULTI-DEVICE",
      challenge: "Traditional Vedic astrology is intimidating and hard to decipher, while modern horoscope apps deliver superficial, generic predictions without depth.",
      impact: "Designed luminous Cosmic Glassmorphism dashboards and 5-year optimization roadmaps. 50,000+ active seekers with a 4.9/5 user rating.",
      img: "/images/ux/deepastro-hero.jpg",
      uxProjectId: "deepastro",
    },
    {
      id: "cosmosx",
      title: "CosmosX Planetary Telemetry",
      desc: "Deep space mission control dashboard with 3D orbital trajectory simulation, real-time planetary sensor arrays, spacecraft sub-system telemetry, and communication link status.",
      accent: "#38BDF8",
      spec: "DEEP TECH UX • 3D ORBIT TELEMETRY • MISSION CONTROL",
      challenge: "Aerospace telemetry was siloed in monochrome text logs, slowing anomaly triage during critical orbital insertion windows.",
      impact: "Achieved sub-80ms telemetry synchronization and a 54% acceleration in anomaly detection across aerospace simulation teams.",
      img: "/images/ux/projects/CosmosX.png",
      uxProjectId: "cosmosx",
    },
    {
      id: "cureiq",
      title: "CureIQ Clinical Intelligence",
      desc: "AI-assisted clinical diagnostics and empathetic patient health portal. Features differential diagnosis summaries, longitudinal biomarker trendlines, and automated treatment protocols.",
      accent: "#06B6D4",
      spec: "HEALTHCARE UX • AI DIAGNOSTICS • WCAG 2.1 AA",
      challenge: "Clinicians face EHR documentation burnout while patients struggle to comprehend complex clinical lab results.",
      impact: "Saved physicians 42 minutes per day in EHR charting and boosted patient medication adherence by 38%.",
      img: "/images/ux/projects/CureIQ.png",
      uxProjectId: "cureiq",
    },
    {
      id: "futuremind",
      title: "FutureMind AI Career Operating System",
      desc: "An AI career navigation platform featuring dynamic mountain elevation roadmaps, AI Career Coach drawer, skill intelligence modules, and live mentor connection.",
      accent: "#2563EB",
      spec: "EDTECH UX • AI CAREER OS • DESIGN TOKENS",
      challenge: "Tech career growth is fragmented across disjointed tutorials, static video courses, and unhelpful job boards, creating imposter syndrome and stalled progress.",
      impact: "Pioneered mountain elevation milestone visualization. Boosted path completion rate to 68.4% across 50,000+ tech learners.",
      img: "/images/ux/futuremind-hero.jpg",
      uxProjectId: "futuremind",
    },
    {
      id: "securex",
      title: "SecureX Zero-Trust Security",
      desc: "Next-gen Security Operations Center (SOC) dashboard. Delivers attack path topology graphs, automated entity threat clustering, and one-click incident containment.",
      accent: "#EF4444",
      spec: "CYBERSECURITY UX • SOC DASHBOARD • ZERO-TRUST",
      challenge: "SecOps teams suffered severe alert fatigue, with 92% of security warnings being redundant false positives.",
      impact: "Reduced alert fatigue by 75% and accelerated breach containment response time by 48%.",
      img: "/images/ux/projects/secureX.png",
      uxProjectId: "securex",
    },
  ];

  // Slide Deck Slides (Section 21)
  const pptSlides = [
    { title: "AI Integration in Corporate Workflows", sub: "Slide 1: Executive Summary", points: ["Leveraging custom LLM prompt architectures to automate research tasks", "Reducing creative collateral times by 40% using diffusion runs", "Aligning design system components directly to TypeScript repositories"] },
    { title: "Design Systems ROI Analysis", sub: "Slide 2: Strategic Impact", points: ["Reducing time-to-market for new screens from weeks to days", "Ensuring consistency across Web, Mobile, and Marketing touchpoints", "Reducing code debt using tokenized typography and spacing systems"] },
    { title: "Cinematic Storytelling & Brand Value", sub: "Slide 3: Video Showreels", points: ["Storyboarding visual timelines to boost customer retention", "Dynamic color grading matching core brand guidelines", "Integrating kinetic motion templates into web assets"] }
  ];

  // Projects Grid (Section 16, 18)
  const projects: ShowcaseProject[] = [
    // UI/UX Projects
    { 
      title: "TradeX Pro Trading Terminal", 
      category: "uiux", 
      description: "High-frequency financial terminal with dynamic smart-tiles, candlestick charts, and instant order execution.", 
      img: "/images/ux/projects/TradeX.png", 
      caseStudy: "Read UX Case Study", 
      figmaUrl: "#work",
      uxProjectId: "tradex",
      statsBadge: "$1.2B+ Vol • 0.12s Latency"
    },
    { 
      title: "DeepAstro AI Life Platform", 
      category: "uiux", 
      description: "Comprehensive AI life intelligence system featuring cosmic dashboard, Kundli charts, and mobile companion app.", 
      img: "/images/ux/deepastro-hero.jpg", 
      caseStudy: "Read UX Case Study", 
      figmaUrl: "#work",
      uxProjectId: "deepastro",
      statsBadge: "50K+ Users • 4.9/5 ★"
    },
    { 
      title: "CosmosX Orbit Mission Control", 
      category: "uiux", 
      description: "3D planetary trajectory visualizer and aerospace sensor telemetry operations dashboard.", 
      img: "/images/ux/projects/CosmosX.png", 
      caseStudy: "Read UX Case Study", 
      figmaUrl: "#work",
      uxProjectId: "cosmosx",
      statsBadge: "100K+ Bodies • 80ms Sync"
    },
    { 
      title: "CureIQ Health Intelligence", 
      category: "uiux", 
      description: "AI-powered clinical diagnostic hub with biomarker trendlines and empathetic patient care pathways.", 
      img: "/images/ux/projects/CureIQ.png", 
      caseStudy: "Read UX Case Study", 
      figmaUrl: "#work",
      uxProjectId: "cureiq",
      statsBadge: "99.2% Accuracy • HIPAA"
    },
    { 
      title: "SecureX SOC Security Console", 
      category: "uiux", 
      description: "Zero-Trust enterprise cybersecurity dashboard with threat vector correlation and one-click quarantine.", 
      img: "/images/ux/projects/secureX.png", 
      caseStudy: "Read UX Case Study", 
      figmaUrl: "#work",
      uxProjectId: "securex",
      statsBadge: "99.99% Mitigation • SOC"
    },
    { 
      title: "FutureMind Career OS", 
      category: "uiux", 
      description: "AI-guided tech career roadmap with mountain elevation progress curves, AI Career Coach, and skill intelligence.", 
      img: "/images/ux/futuremind-hero.jpg", 
      caseStudy: "Read UX Case Study", 
      figmaUrl: "#work",
      uxProjectId: "futuremind",
      statsBadge: "50K+ Learners • 200+ Paths"
    },
    { 
      title: "PathWise Skill Roadmap", 
      category: "uiux", 
      description: "Gamified career elevation roadmap with verified portfolio challenges and senior mentorship reviews.", 
      img: "/images/ux/projects/pathwise.png", 
      caseStudy: "Read UX Case Study", 
      figmaUrl: "#work",
      uxProjectId: "pathwise",
      statsBadge: "78% Completion • Gamified"
    },
    { 
      title: "Soul Journey Mobile Experience", 
      category: "mobile", 
      description: "Tactile mobile journey modal with atmospheric astral portal aesthetics and authentic Vedic chart calculations.", 
      img: "/images/ux/deepastro-soultrace-card.jpg", 
      caseStudy: "Read UX Case Study", 
      figmaUrl: "#work",
      uxProjectId: "deepastro",
      statsBadge: "Mobile UX • Touch Targets"
    },

    // Real Graphics Design Works from Desktop
    { 
      title: "Surreal Photo Manipulation", 
      category: "graphics", 
      description: "Atmospheric digital composite combining multi-source lighting, surreal environmental layers, and precision texture blending.", 
      img: "/images/graphics/photo manipulation.png", 
      caseStudy: "Inspect Artwork", 
      figmaUrl: "/photoshop",
      statsBadge: "Matte Painting • Compositing"
    },
    { 
      title: "Imagination to Reality", 
      category: "graphics", 
      description: "High-concept conceptual artwork exploring surreal dreamscapes, spatial depth, and cinematic color illumination.", 
      img: "/images/graphics/imagination to reality.png", 
      caseStudy: "Inspect Artwork", 
      figmaUrl: "/photoshop",
      statsBadge: "Creative Visual Art"
    },
    { 
      title: "Cinematic Movie Poster", 
      category: "graphics", 
      description: "Theatrical movie poster design featuring tailored typography composition, dramatic character keying, and atmospheric embers.", 
      img: "/images/graphics/movie poster.png", 
      caseStudy: "Inspect Poster", 
      figmaUrl: "/photoshop",
      statsBadge: "Theatrical Print • High Res"
    },
    { 
      title: "Brand Identity & Guidelines", 
      category: "graphics", 
      description: "Comprehensive corporate brand kit including typography hierarchy, color palette definitions, and business stationery.", 
      img: "/images/graphics/branding.png", 
      caseStudy: "View Brand Kit", 
      figmaUrl: "#work",
      statsBadge: "Full Brand System"
    },
    { 
      title: "Modern Brand Identity Collaterals", 
      category: "graphics", 
      description: "Secondary brand extension showcasing packaging mockups, logo variations, and high-impact vector iconography.", 
      img: "/images/graphics/branding2.png", 
      caseStudy: "View Collateral", 
      figmaUrl: "#work",
      statsBadge: "Vector & Packaging"
    },
    { 
      title: "Editorial Magazine Cover", 
      category: "graphics", 
      description: "Modern publication cover layout with bold editorial typography, structured column grids, and refined photo treatment.", 
      img: "/images/graphics/magazine book cover.png", 
      caseStudy: "View Cover", 
      figmaUrl: "/photoshop",
      statsBadge: "Editorial Typography"
    },
    { 
      title: "Social Media Campaign Creatives", 
      category: "graphics", 
      description: "High-converting social advertising pack crafted for Instagram, LinkedIn, and Facebook marketing campaigns.", 
      img: "/images/graphics/social creatives.png", 
      caseStudy: "View Campaign", 
      figmaUrl: "#work",
      statsBadge: "Ad Creatives • High CTR"
    },
    { 
      title: "Commercial Marketing Flyer", 
      category: "graphics", 
      description: "Print-ready promotional flyer featuring dynamic geometry, vibrant color blocking, and clear call-to-action flow.", 
      img: "/images/graphics/flyerdesign.png", 
      caseStudy: "View Flyer", 
      figmaUrl: "#work",
      statsBadge: "Print Ready • CMYK"
    },
    { 
      title: "Luxury Event Invitation", 
      category: "graphics", 
      description: "Bespoke invitation card typography with gold foil accents, tactile minimalist border, and luxury layout aesthetics.", 
      img: "/images/graphics/invitation card.png", 
      caseStudy: "View Invitation", 
      figmaUrl: "#work",
      statsBadge: "Gold Foil Finish"
    },
    { 
      title: "Photoshop 21-Artwork Gallery", 
      category: "graphics", 
      description: "Interactive showcase of 21 custom Photoshop art manipulations, composites, and digital retouching works.", 
      img: "/photoshop/page1.png", 
      caseStudy: "Explore 21 Artworks", 
      figmaUrl: "/photoshop",
      statsBadge: "21 Artworks • Digital Matte"
    },

    // Video Showreel & Commercials
    { 
      title: "Cinematic Video Showreel 4K", 
      category: "video", 
      description: "Flagship showreel highlighting precision speed ramping, Rec.709 color grading, sound design, and kinetic typography.", 
      img: "/images/showreel/video-showreel.png", 
      caseStudy: "Launch Showreel", 
      figmaUrl: "#work",
      statsBadge: "4K Master • Speed Ramping"
    },
    { 
      title: "Travel Cinematic Video", 
      category: "video", 
      description: "Cinematic travel compilation featuring advanced color grading, match cuts, and atmospheric speed ramping elements.", 
      img: "/images/project_video_travel_cinematic.jpg", 
      caseStudy: "Watch Video", 
      figmaUrl: "#work",
      statsBadge: "Color LUTs • Sound Sync"
    },
    { 
      title: "Corporate Pitch Slide Deck", 
      category: "ppt", 
      description: "Corporate PowerPoint pitch deck design with executive summary layouts and tokenized spacing.", 
      img: "/images/project_graphics_promo_poster.jpg", 
      caseStudy: "View Deck", 
      figmaUrl: "#work",
      statsBadge: "Executive Slides"
    }
  ];

  const handleNextCinema = () => {
    setActiveCinemaIdx((prev) => (prev + 1) % featuredProjects.length);
  };

  const handlePrevCinema = () => {
    setActiveCinemaIdx((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const handleOpenCaseStudy = (uxId?: string) => {
    if (!uxId) return;
    const match = uxProjectsList.find((p) => p.id === uxId);
    if (match) {
      setSelectedUXProject(match);
    }
  };

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);


  return (
    <section className="relative py-24 bg-[#f8fafc] dark:bg-[#050814] text-[#0a1128] dark:text-white transition-colors duration-300">
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] bg-[#FF6B00]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        
        {/* SECTION 15: FEATURED PROJECTS CINEMATIC SLIDER */}
        <div className="mb-24">
          <div className="flex flex-col items-center text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Interactive Cinematic Slider</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mt-2 text-[#0a1128] dark:text-white">
              FEATURED <span className="text-gradient-orange">PROJECTS</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#FF6B00] mt-4 shadow-[0_0_8px_#FF6B00]" />
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed">
              Explore Prashant&apos;s high-impact production designs. Toggle slides to inspect case notes, specs, and complete UX systems.
            </p>
          </div>

          {/* Cinematic Slider Display (Dark Blue with Golden Stroke) */}
          <div className="relative border-[1.5px] border-[#D4AF37]/50 rounded-2xl bg-gradient-to-br from-[#0D1B38] via-[#081328] to-[#050C1A] p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden min-h-[420px]">
            {/* Corner glowing line */}
            <div 
              className="absolute top-0 left-0 w-full h-[2px] transition-all duration-500"
              style={{ backgroundColor: featuredProjects[activeCinemaIdx].accent }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Content Panel (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F5BA42] block">
                  {featuredProjects[activeCinemaIdx].spec}
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
                  {featuredProjects[activeCinemaIdx].title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {featuredProjects[activeCinemaIdx].desc}
                </p>

                {/* Specs / Challenge & Impact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs">
                  <div>
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block mb-1">Challenge</span>
                    <p className="text-slate-300 leading-relaxed">{featuredProjects[activeCinemaIdx].challenge}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block mb-1">Impact</span>
                    <p className="text-slate-300 leading-relaxed">{featuredProjects[activeCinemaIdx].impact}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <button 
                    onClick={() => handleOpenCaseStudy(featuredProjects[activeCinemaIdx].uxProjectId)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#D4AF37] hover:from-[#FF7A00] hover:to-[#F5BA42] text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_18px_rgba(255,107,0,0.35)] transition-all flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Complete Case Study</span>
                  </button>
                  <a 
                    href="#work"
                    className="px-5 py-2.5 rounded-xl border border-[#D4AF37]/40 hover:border-[#F5BA42] hover:text-[#F5BA42] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer bg-white/5 flex items-center gap-1.5"
                  >
                    <span>View In Gallery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Graphic Mockup Panel (5 cols) with Real Image */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div 
                  onClick={() => handleOpenCaseStudy(featuredProjects[activeCinemaIdx].uxProjectId)}
                  className="w-full aspect-[16/10] rounded-xl border-[1.5px] relative overflow-hidden transition-all duration-500 group cursor-pointer shadow-2xl border-[#D4AF37]/60 hover:border-[#F5BA42]"
                >
                  <Image
                    src={featuredProjects[activeCinemaIdx].img}
                    alt={featuredProjects[activeCinemaIdx].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-bold truncate text-[11px] uppercase tracking-wider text-[#F5BA42]">
                      {featuredProjects[activeCinemaIdx].title}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono border border-[#D4AF37]/40 text-[#F5BA42]">
                      Click to Open
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Slider Navigation arrows */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button 
                onClick={handlePrevCinema}
                className="p-2 border border-[#D4AF37]/40 hover:border-[#F5BA42] hover:text-[#F5BA42] rounded-lg text-gray-300 cursor-pointer bg-black/70 transition-colors"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNextCinema}
                className="p-2 border border-[#D4AF37]/40 hover:border-[#F5BA42] hover:text-[#F5BA42] rounded-lg text-gray-300 cursor-pointer bg-black/70 transition-colors"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 16: PROJECT FILTER SYSTEM & MASONRY */}
        <div className="mb-24 overflow-visible">
          <div className="flex flex-col items-center text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Instant Filter Vector</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mt-2 text-[#0a1128] dark:text-white">
              PROJECTS <span className="text-gradient-orange">SHOWCASE</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#FF6B00] mt-4 shadow-[0_0_8px_#FF6B00]" />
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed">
              Explore Prashant&apos;s work across UI/UX, mobile apps, video editing, presentations, and AI workflows.
            </p>
          </div>

          {/* Filter Categories list */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-black/5 dark:border-white/5 pb-6">
            {[
              { id: "all", label: "All Works" },
              { id: "uiux", label: "UI/UX Design" },
              { id: "mobile", label: "Mobile Apps" },
              { id: "graphics", label: "Graphics Design" },
              { id: "video", label: "Video Editing" },
              { id: "ppt", label: "Presentations" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeFilter === cat.id 
                    ? "bg-gradient-to-r from-[#FF6B00] to-[#D4AF37] text-white font-black shadow-lg scale-105" 
                    : "bg-[#0B1528]/10 dark:bg-[#0B1528] border border-[#D4AF37]/35 text-[#0a1128] dark:text-slate-300 hover:border-[#F5BA42] hover:text-[#FF6B00]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filtered Grid Display (Dark Blue with Golden Stroke & 1.2 Hover Scale) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 overflow-visible py-4">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative p-5 border-[1.5px] border-[#D4AF37]/50 hover:border-[#F5BA42] rounded-2xl bg-gradient-to-br from-[#0D1B38] via-[#081328] to-[#050C1A] shadow-[0_12px_35px_rgba(0,0,0,0.45),0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.75),0_0_30px_rgba(245,186,66,0.35)] transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1.5 flex flex-col justify-between dark-blue-gold-card will-change-transform"
                >
                  <div>
                    {/* Visual Image Box */}
                    <div 
                      onClick={() => {
                        if (p.uxProjectId) {
                          handleOpenCaseStudy(p.uxProjectId);
                        }
                      }}
                      className="w-full aspect-[16/10] rounded-xl bg-[#050C1A] border border-[#D4AF37]/30 flex flex-col items-center justify-center text-center mb-4 relative overflow-hidden group cursor-pointer"
                    >
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                      {p.statsBadge && (
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 text-[9px] font-mono text-[#F5BA42] font-bold">
                          {p.statsBadge}
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] font-mono text-[#F5BA42] uppercase tracking-wider block mb-1 font-bold">
                      {p.category.toUpperCase()} PROJECT
                    </span>
                    <h4 className="font-extrabold text-base text-white uppercase tracking-wider mb-1.5 group-hover:text-[#F5BA42] transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-wider">
                    {p.uxProjectId ? (
                      <button
                        onClick={() => handleOpenCaseStudy(p.uxProjectId)}
                        className="text-[#FF6B00] flex items-center space-x-1 hover:text-[#F5BA42] transition-colors cursor-pointer"
                      >
                        <span>{p.caseStudy}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : p.figmaUrl.startsWith("/") ? (
                      <a href={p.figmaUrl} className="text-[#FF6B00] flex items-center space-x-1 hover:text-[#F5BA42] transition-colors">
                        <span>{p.caseStudy || "Explore Gallery"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <a href={p.figmaUrl} className="text-[#FF6B00] flex items-center space-x-1 hover:text-[#F5BA42] transition-colors">
                        <span>{p.caseStudy}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* SECTION 17: VIDEO SHOWREEL */}
        <div className="mb-24">
          <div className="flex flex-col items-center text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Cinematic Media Studio</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mt-2 text-[#0a1128] dark:text-white">
              VIDEO <span className="text-gradient-orange">SHOWREEL</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#FF6B00] mt-4 shadow-[0_0_8px_#FF6B00]" />
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed">
              Explore showreels, motion templates, and behind-the-scenes editing timeline panels.
            </p>
          </div>

          <div className="border-[1.5px] border-[#D4AF37]/50 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0D1B38] to-[#050C1A] shadow-2xl">
            <div className="bg-[#081226] border-b border-white/10 flex flex-wrap">
              {[
                { id: "showreel", label: "Play Showreel", icon: <Play className="w-3.5 h-3.5" /> },
                { id: "bts", label: "Behind The Scenes", icon: <Layers className="w-3.5 h-3.5" /> },
                { id: "motion", label: "Motion Graphics", icon: <Film className="w-3.5 h-3.5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setShowreelTab(tab.id as "showreel" | "bts" | "motion")}
                  className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border-r border-white/5 transition-colors cursor-pointer ${
                    showreelTab === tab.id ? "bg-gradient-to-r from-[#FF6B00] to-[#D4AF37] text-white font-extrabold" : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8 min-h-[360px] flex items-center justify-center relative bg-transparent">
              <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {showreelTab === "showreel" && (
                  <motion.div 
                    key="showreel" 
                    initial={{ opacity: 0, scale: 0.96 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.96 }} 
                    className="w-full max-w-2xl relative z-10"
                  >
                    {/* Real Video Frame Preview */}
                    <div 
                      onClick={() => setShowreelModalOpen(true)}
                      className="group relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-[1.5px] border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.2)] hover:border-[#F5BA42] cursor-pointer"
                    >
                      <Image
                        src="/images/showreel/video-showreel.png"
                        alt="Cinematic Video Showreel"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 opacity-75 group-hover:opacity-40 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-[10px] font-mono font-bold text-[#F5BA42] uppercase tracking-wider">
                          4K UHD • 60 FPS • MASTER REEL
                        </span>
                        <span className="px-2.5 py-1 rounded bg-[#FF6B00] text-white text-[10px] font-black uppercase tracking-wider shadow-[0_0_10px_rgba(255,107,0,0.6)]">
                          02:45 DURATION
                        </span>
                      </div>

                      {/* Center Pulsing Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#D4AF37] text-white flex items-center justify-center shadow-[0_0_35px_rgba(255,107,0,0.8)] scale-95 group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
                        </div>
                      </div>

                      {/* Bottom Title & Specs */}
                      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2 pointer-events-none">
                        <div>
                          <h4 className="font-black text-base sm:text-lg uppercase text-white tracking-wider">
                            PRASHANT SISODHIYA • CINEMATIC REEL
                          </h4>
                          <p className="text-[11px] text-slate-300">
                            Speed Ramping • Match Cuts • Rec.709 Color Grading • Kinetic Typography
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-bold text-[#00F0FF] self-start sm:self-auto">
                          Click to Launch Player
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {showreelTab === "bts" && (
                  <motion.div key="bts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4 max-w-lg relative z-10 font-mono text-xs w-full">
                    <div className="p-5 rounded-2xl border border-[#D4AF37]/40 bg-[#060D1E] text-[#00F0FF] shadow-2xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-slate-400 uppercase tracking-widest text-[10px] font-bold flex items-center gap-2">
                          <Sliders className="w-3.5 h-3.5 text-[#F5BA42]" />
                          TIMELINE_MULTITRACK_MONITOR
                        </span>
                        <span className="text-[#00F5A0] text-[10px]">SYNC_LOCKED</span>
                      </div>
                      <div className="space-y-2.5 text-left text-[11px]">
                        <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                          <span>V3 [Motion Titles]: Kinetic Lottie & After Effects 3D Camera</span>
                          <span className="text-[#F5BA42]">AE_Linked</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                          <span>V2 [VFX/Grade]: Lumetri Rec.709 Film LUT + Glow Mask (1.4x)</span>
                          <span className="text-[#00F0FF]">LUT_Applied</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                          <span>V1 [Footage]: 4K ProRes Master, Speed Ramped Beats</span>
                          <span className="text-[#38BDF8]">ProRes_422</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                          <span>A1-A4 [Audio]: Multi-track SFX, Whooshes, Sub-bass hit (-3dB)</span>
                          <span className="text-[#10B981]">Normalized</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {showreelTab === "motion" && (
                  <motion.div key="motion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4 max-w-md relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#D4AF37] text-white flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,107,0,0.5)]">
                      <Film className="w-7 h-7" />
                    </div>
                    <h4 className="font-extrabold text-sm uppercase text-white tracking-wider">
                      ADOBE AFTER EFFECTS MOTION GRAPHICS
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Custom 2D/3D kinetic titles, geometric stinger transitions, particle disintegrations, and interactive UI animations designed for digital campaigns.
                    </p>
                    <button
                      onClick={() => setShowreelModalOpen(true)}
                      className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider"
                    >
                      Inspect Reel Transitions
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* SECTION 21: PRESENTATION DESIGN STUDIO */}
        <div>
          <div className="flex flex-col items-center text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Presentation Design Studio</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mt-2 text-[#0a1128] dark:text-white">
              PRESENTATION <span className="text-gradient-orange">STUDIO</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#FF6B00] mt-4 shadow-[0_0_8px_#FF6B00]" />
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed">
              Interactive Slide Deck Studio. Click arrows to toggle corporate presentation slides and pitch layouts.
            </p>
          </div>

          <div className="relative border-[1.5px] border-[#D4AF37]/50 rounded-2xl bg-gradient-to-br from-[#0D1B38] to-[#050C1A] p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden min-h-[350px]">
            <div className="absolute top-4 left-6 text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">
              SLIDE_DECK_FRAME // SHEET_0{pptSlideIdx + 1}_OF_03
            </div>

            <div className="my-auto flex flex-col justify-center items-center py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pptSlideIdx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-[600px] border border-[#D4AF37]/40 bg-[#0B1736]/60 rounded-2xl p-6 relative shadow-[0_0_20px_rgba(212,175,55,0.15)] text-center"
                >
                  <span className="text-[9px] font-mono text-[#F5BA42] uppercase tracking-widest block mb-1">
                    {pptSlides[pptSlideIdx].sub}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider mb-6">
                    {pptSlides[pptSlideIdx].title}
                  </h3>
                  
                  <div className="space-y-3 text-left max-w-md mx-auto">
                    {pptSlides[pptSlideIdx].points.map((p, pIdx) => (
                      <div key={pIdx} className="flex items-start space-x-2.5 text-xs text-slate-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00] mt-1.5 shrink-0" />
                        <p className="leading-relaxed">{p}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-4 right-6 flex space-x-2">
              <button 
                onClick={() => setPptSlideIdx((prev) => (prev - 1 + 3) % 3)}
                className="p-1.5 border border-[#D4AF37]/40 hover:border-[#F5BA42] hover:text-[#F5BA42] rounded-lg text-gray-300 cursor-pointer bg-black/70 transition-colors"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setPptSlideIdx((prev) => (prev + 1) % 3)}
                className="p-1.5 border border-[#D4AF37]/40 hover:border-[#F5BA42] hover:text-[#F5BA42] rounded-lg text-gray-300 cursor-pointer bg-black/70 transition-colors"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Case Study Modal Triggered from Project Showcase */}
      <AnimatePresence>
        {selectedUXProject && (
          <UXCaseStudyModal
            project={selectedUXProject}
            onClose={() => setSelectedUXProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Dedicated Interactive Video Showreel Player Lightbox */}
      <AnimatePresence>
        {showreelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowreelModalOpen(false)}
              className="absolute inset-0 cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative max-w-5xl w-full rounded-2xl border-[1.5px] border-[#D4AF37]/60 overflow-hidden shadow-[0_0_50px_rgba(255,107,0,0.3)] z-10 bg-[#070E1E] text-white"
            >
              {/* Top Modal Bar */}
              <div className="px-5 py-3.5 bg-[#050B16] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
                  <span className="font-black text-xs uppercase tracking-widest text-white">
                    CINEMATIC SHOWREEL 4K // PRASHANT SISODHIYA
                  </span>
                </div>
                <button
                  onClick={() => setShowreelModalOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Screen Area */}
              <div className="relative w-full aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
                <Image
                  src="/images/showreel/video-showreel.png"
                  alt="Video Showreel Frame"
                  fill
                  className="object-contain"
                  priority
                />
                
                {/* Visual Audio Waveform Simulation */}
                <div className="absolute bottom-16 left-6 right-6 flex items-end gap-1 h-12 pointer-events-none opacity-80">
                  {[24, 45, 18, 55, 78, 92, 40, 68, 85, 95, 30, 60, 48, 70, 88, 52, 34, 76, 90, 65, 42, 80, 95, 60, 38, 82, 58, 44, 72, 90, 36, 50].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-[#FF6B00] via-[#F5BA42] to-[#00F0FF] rounded-t-sm transition-all duration-300"
                      style={{ height: isPlayingShowreel ? `${(h * ((i % 3) + 1)) % 100}%` : "15%" }}
                    />
                  ))}
                </div>

                {/* Center Big Play Toggle Overlay */}
                <button
                  onClick={() => setIsPlayingShowreel(!isPlayingShowreel)}
                  className="absolute z-20 w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-[#F5BA42] text-[#F5BA42] hover:scale-110 transition-transform flex items-center justify-center cursor-pointer shadow-[0_0_25px_rgba(245,186,66,0.5)]"
                >
                  {isPlayingShowreel ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                </button>

                {/* Bottom Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-2 z-20">
                  {/* Scrubber Bar */}
                  <div className="relative w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                    <div 
                      className="h-full bg-gradient-to-r from-[#FF6B00] to-[#F5BA42] transition-all duration-300"
                      style={{ width: `${((showreelChapter + 1) / 5) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsPlayingShowreel(!isPlayingShowreel)}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        {isPlayingShowreel ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <span className="text-[#F5BA42] font-bold">01:{showreelChapter * 25 + 15} / 02:45</span>
                      <span className="hidden sm:inline text-slate-500">|</span>
                      <span className="hidden sm:inline text-slate-300">Chapter {showreelChapter + 1} of 5</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] text-[#00F0FF] font-bold">
                        REC.709 LUT
                      </span>
                      <Volume2 className="w-4 h-4 text-slate-400" />
                      <Maximize2 className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chapter Markers & Breakdown */}
              <div className="p-5 bg-[#050C1A] border-t border-white/10">
                <span className="text-[10px] font-mono text-[#F5BA42] uppercase tracking-widest block mb-2 font-bold">
                  INTERACTIVE REEL CHAPTERS & EDITING CRAFT
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 0, time: "00:15", title: "Match Cuts", tech: "Rhythm Cut" },
                    { id: 1, time: "00:48", title: "Speed Ramping", tech: "Curve Re-timing" },
                    { id: 2, time: "01:20", title: "Color Grading", tech: "Rec.709 & Teal/Orange" },
                    { id: 3, time: "01:55", title: "Kinetic Titles", tech: "After Effects 3D" },
                    { id: 4, time: "02:30", title: "Sound Design", tech: "Multi-Track SFX" },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setShowreelChapter(ch.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        showreelChapter === ch.id
                          ? "bg-[#FF6B00]/15 border-[#FF6B00] text-white shadow-[0_0_12px_rgba(255,107,0,0.3)]"
                          : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      <span className="text-[9px] font-mono text-[#F5BA42] block">{ch.time}</span>
                      <span className="text-xs font-bold block truncate">{ch.title}</span>
                      <span className="text-[9px] text-slate-400 block truncate">{ch.tech}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
