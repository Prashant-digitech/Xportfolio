"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Play, Eye, FileText, ArrowRight, X, Sparkles, ChevronLeft, ChevronRight,
  ExternalLink, Layers, BookOpen, Star, Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { uxProjectsList, UXProject } from "@/data/uxProjects";
import UXCaseStudyModal from "@/components/UXCaseStudyModal";

export interface LegacyProject {
  id: string;
  title: string;
  subtitle: string;
  category: "uiux" | "video" | "graphics";
  image: string;
  videoUrl?: string;
  details: string;
  projectUrl?: string;
  statsBadge?: string;
  tags?: string[];
}

type CombinedProject = (UXProject | LegacyProject) & {
  category: "uiux" | "video" | "graphics";
};

export default function Work() {
  const [activeTab, setActiveTab] = useState<"all" | "uiux" | "video" | "graphics">("all");
  const [selectedUXProject, setSelectedUXProject] = useState<UXProject | null>(null);
  const [selectedMediaProject, setSelectedMediaProject] = useState<LegacyProject | null>(null);

  // Non-UX Projects (Video & Graphics)
  const videoProjects: LegacyProject[] = [
    {
      id: "video-showreel",
      title: "Cinematic Video Showreel 4K",
      subtitle: "Motion & Editing Master Reel",
      category: "video",
      image: "/images/showreel/video-showreel.png",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      details: "Official 4K video editing showreel showcasing precision speed ramping, Rec.709 color grading, seamless match cuts, kinetic typography overlays, and multi-track audio synchronization.",
      statsBadge: "4K UHD • Speed Ramping • Color Grade",
      tags: ["Premiere Pro", "After Effects", "Showreel", "Sound Design"],
    },
    {
      id: "video-1",
      title: "Travel Cinematic Video",
      subtitle: "Cinematic Edit",
      category: "video",
      image: "/images/project_video_travel_cinematic.jpg",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      details: "Cinematic travel compilation featuring advanced color grading, match cuts, and atmospheric speed ramping elements.",
      statsBadge: "4K Color Graded • Cinematic Audio",
      tags: ["Premiere Pro", "Color Grading", "Sound Design"],
    },
    {
      id: "video-2",
      title: "Fitness Promo",
      subtitle: "Commercial Promo Edit",
      category: "video",
      image: "/images/project_video_fitness_promo.jpg",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      details: "High-energy commercial advertisement for fitness apparel. Emphasizes synchronized sound design and rapid visual pacing.",
      statsBadge: "High Energy • Speed Ramping",
      tags: ["Commercial", "After Effects", "Rhythm Cut"],
    },
    {
      id: "video-3",
      title: "Product Advertisement",
      subtitle: "Commercial 3D Edit",
      category: "video",
      image: "/images/project_video_product_ad.jpg",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      details: "Commercial showcase for wireless audio hardware. Integrates motion typography overlays, detailed macros, and 3D space tracking.",
      statsBadge: "Motion Typography • 3D Tracking",
      tags: ["Product Ad", "3D Camera", "Commercial"],
    },
    {
      id: "video-4",
      title: "Wedding Highlights",
      subtitle: "Luxury Highlight Film",
      category: "video",
      image: "/images/project_video_wedding_highlights.jpg",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      details: "Luxurious wedding highlight reel with emotional music synchronization, warm cinematic color tones, and seamless video transitions.",
      statsBadge: "Emotional Narrative • Film Look",
      tags: ["Wedding Film", "Storytelling", "Color LUTs"],
    },
  ];

  const graphicsProjects: LegacyProject[] = [
    {
      id: "graphics-manipulation",
      title: "Surreal Photo Manipulation",
      subtitle: "Digital Matte Painting & Lighting",
      category: "graphics",
      image: "/images/graphics/photo manipulation.png",
      details: "Multi-layered photo manipulation blending intricate environmental textures, complex atmospheric depth, and cinematic rim lighting into a cohesive surreal narrative.",
      statsBadge: "Surreal Composite • Lighting Art",
      tags: ["Photoshop", "Matte Painting", "Composite"],
    },
    {
      id: "graphics-imagination",
      title: "Imagination to Reality",
      subtitle: "Conceptual Visual Art",
      category: "graphics",
      image: "/images/graphics/imagination to reality.png",
      details: "An imaginative conceptual journey from ideation to final reality, combining surreal dimensional planes, ethereal glow illumination, and detailed spatial perspective.",
      statsBadge: "Creative Vision • Digital Art",
      tags: ["Photoshop", "Concept Art", "Atmosphere"],
    },
    {
      id: "graphics-movie-poster",
      title: "Cinematic Movie Poster",
      subtitle: "Theatrical Print & Typography",
      category: "graphics",
      image: "/images/graphics/movie poster.png",
      details: "Theatrical film poster layout with custom title typography, dramatic key lighting, particle embers, and professional billing block alignment.",
      statsBadge: "Cinematic Poster • CMYK Print",
      tags: ["Movie Poster", "Typography", "Color Grading"],
    },
    {
      id: "graphics-branding-1",
      title: "Corporate Brand Identity",
      subtitle: "Visual Design System",
      category: "graphics",
      image: "/images/graphics/branding.png",
      details: "End-to-end visual identity kit featuring modern logomarks, typography rules, color palettes, and stationery mockups.",
      statsBadge: "Brand Identity • Guidelines",
      tags: ["Branding", "Vector Identity", "Guidelines"],
    },
    {
      id: "graphics-branding-2",
      title: "Brand Collateral & Packaging",
      subtitle: "Product & Merchandise Suite",
      category: "graphics",
      image: "/images/graphics/branding2.png",
      details: "Extended commercial brand collateral including custom packaging design, apparel branding, and vector iconography.",
      statsBadge: "Merchandise • Packaging",
      tags: ["Packaging", "Brand System", "Collaterals"],
    },
    {
      id: "graphics-magazine",
      title: "Magazine & Editorial Cover",
      subtitle: "Publication Layout Design",
      category: "graphics",
      image: "/images/graphics/magazine book cover.png",
      details: "Sophisticated editorial cover featuring clean typographic hierarchy, structured editorial grid layout, and magazine aesthetics.",
      statsBadge: "Editorial Layout • Print Ready",
      tags: ["Editorial", "Magazine", "Typography"],
    },
    {
      id: "graphics-social",
      title: "Social Media Campaign Creatives",
      subtitle: "High-Engagement Marketing Pack",
      category: "graphics",
      image: "/images/graphics/social creatives.png",
      details: "A cohesive pack of high-converting social media marketing graphics crafted for Instagram, Facebook, and LinkedIn ad campaigns.",
      statsBadge: "High-CTR • Multi-Platform",
      tags: ["Social Media", "Advertising", "Conversion"],
    },
    {
      id: "graphics-flyer",
      title: "Promotional Event Flyer",
      subtitle: "Commercial Marketing Collateral",
      category: "graphics",
      image: "/images/graphics/flyerdesign.png",
      details: "Vibrant commercial flyer with high-contrast color blocking, dynamic geometric angles, and clean reading order.",
      statsBadge: "Commercial Flyer • High Res",
      tags: ["Flyer Design", "Marketing", "Print Collateral"],
    },
    {
      id: "graphics-invitation",
      title: "Luxury Event Invitation",
      subtitle: "Bespoke Stationery & Gold Accents",
      category: "graphics",
      image: "/images/graphics/invitation card.png",
      details: "Refined luxury invitation design featuring bespoke serif typography, tactile gold foil borders, and balanced whitespace.",
      statsBadge: "Gold Foil • Luxury Typography",
      tags: ["Invitation", "Stationery", "Luxury Print"],
    },
    {
      id: "graphics-pamphlet",
      title: "Corporate Brochure & Pamphlet",
      subtitle: "Informational Collateral",
      category: "graphics",
      image: "/images/graphics/pamphletes.png",
      details: "Corporate informational pamphlet with clean infographic callouts, structured service breakdowns, and branded visual hierarchy.",
      statsBadge: "Corporate Pamphlet • Bi-Fold",
      tags: ["Brochure", "Corporate", "Print Layout"],
    },
    {
      id: "graphics-photoshop",
      title: "Photoshop 21-Artwork Gallery",
      subtitle: "21 Creative Manipulations & Composites",
      category: "graphics",
      image: "/photoshop/page1.png",
      details: "An extensive gallery of 21 premium Photoshop manipulations, graphic layouts, composites, and digital art designs created by Prashant.",
      projectUrl: "/photoshop",
      statsBadge: "21 Artworks • Digital Compositing",
      tags: ["Photoshop", "Matte Painting", "Composite Art"],
    },
  ];

  // Handlers
  const handleOpenUXCaseStudy = (project: UXProject) => {
    setSelectedUXProject(project);
  };

  const handleOpenMediaProject = (project: LegacyProject) => {
    setSelectedMediaProject(project);
  };

  return (
    <section 
      id="work" 
      className="relative py-16 sm:py-24 bg-[#F8FAFC] dark:bg-[#050814] border-t border-slate-200 dark:border-white/5 text-[#0A1128] dark:text-white transition-colors duration-300 overflow-visible"
    >
      {/* Ambient background glows */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#FF6B00]/5 dark:bg-[#FF6B00]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#00F0FF]/5 dark:bg-[#00F0FF]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] dark:text-[#F5BA42] text-xs font-black uppercase tracking-[0.25em] mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0A1128] dark:text-white">
            PROJECTS <span className="text-gradient-orange">THAT SPEAK</span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-[#FF6B00] to-[#F5BA42] mt-4 shadow-[0_0_12px_rgba(255,107,0,0.5)] rounded-full" />
          <p className="text-slate-600 dark:text-gray-300 mt-4 max-w-2xl text-xs sm:text-sm md:text-base px-4 font-medium">
            Showcasing user-centered product design, design systems, AI platforms, and visual craft built for maximum impact.
          </p>
        </motion.div>

        {/* Tab Filters with Smooth Horizontally Scrollable Container for Mobile */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex max-w-full overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-slate-200/80 dark:bg-[#070D1E] border border-slate-300/80 dark:border-[#D4AF37]/30 space-x-1 sm:space-x-2 shadow-inner">
            {(["all", "uiux", "video", "graphics"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#D4AF37] text-white shadow-[0_0_20px_rgba(255,107,0,0.45)] border-none scale-105"
                    : "bg-transparent text-slate-700 dark:text-gray-400 hover:text-[#FF6B00] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                }`}
              >
                {tab === "all" ? "All Works" : tab === "uiux" ? "UI/UX Case Studies" : tab === "video" ? "Video Editing" : "Graphics Design"}
              </button>
            ))}
          </div>
        </div>

        {/* ALL TAB: Dedicated Tiered Rows */}
        {activeTab === "all" && (
          <div className="space-y-16 sm:space-y-24 overflow-visible">
            
            {/* ROW 1: UI/UX DESIGN FLAGSHIPS */}
            <div className="space-y-8 border-b border-slate-200 dark:border-white/10 pb-16 overflow-visible">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center space-x-2 text-[#0088FF] dark:text-neon-blue">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0088FF] dark:bg-neon-blue shadow-[0_0_10px_rgba(0,136,255,1)]" />
                    <h3 className="font-black text-sm uppercase tracking-widest text-[#0A1128] dark:text-white">
                      FLAGSHIP UI/UX PROJECTS & CASE STUDIES
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-medium">
                    Production-grade life intelligence, AI career operating systems, and data visualization architectures designed from user research to multi-platform launch.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab("uiux")}
                  className="self-start md:self-auto px-5 py-2.5 border-[1.5px] border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-sm"
                >
                  <span>View All {uxProjectsList.length} UX Studies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 3-in-a-row Responsive Grid for UX Flagships */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 overflow-visible py-4">
                {uxProjectsList.map((project) => (
                  <UXProjectCard
                    key={project.id}
                    project={project}
                    onOpenCaseStudy={() => handleOpenUXCaseStudy(project)}
                  />
                ))}
              </div>
            </div>

            {/* ROW 2: VIDEO EDITING SHOWCASE */}
            <div className="space-y-8 border-b border-slate-200 dark:border-white/10 pb-16 overflow-visible">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center space-x-2 text-neon-violet">
                    <span className="w-2.5 h-2.5 rounded-full bg-neon-violet shadow-[0_0_8px_rgba(157,78,221,1)]" />
                    <h3 className="font-black text-sm uppercase tracking-widest text-[#0A1128] dark:text-white">
                      VIDEO EDITING & MOTION CRAFT
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-medium">
                    Commercial video campaigns, cinematic color grading, and dynamic kinetic sound synchronization.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab("video")}
                  className="self-start md:self-auto px-5 py-2.5 border-[1.5px] border-neon-violet text-neon-violet hover:bg-neon-violet hover:text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-sm"
                >
                  <span>View All Video Edits</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 overflow-visible py-4">
                {videoProjects.map((p) => (
                  <MediaProjectCard
                    key={p.id}
                    project={p}
                    onClick={() => handleOpenMediaProject(p)}
                    isVideo
                  />
                ))}
              </div>
            </div>

            {/* ROW 3: GRAPHICS DESIGN & ARTWORKS */}
            <div className="space-y-8 pb-8 overflow-visible">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center space-x-2 text-[#D4AF37]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                    <h3 className="font-black text-sm uppercase tracking-widest text-[#0A1128] dark:text-white">
                      GRAPHIC DESIGN & CREATIVE COMPOSITING
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-medium">
                    Brand identity packages, digital marketing graphics, and a specialized 21-artwork Photoshop manipulation gallery.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab("graphics")}
                  className="self-start md:self-auto px-5 py-2.5 border-[1.5px] border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-sm"
                >
                  <span>View Graphics Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 overflow-visible py-4">
                {graphicsProjects.map((p) => (
                  <MediaProjectCard
                    key={p.id}
                    project={p}
                    onClick={() => handleOpenMediaProject(p)}
                  />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* UI/UX TAB: FULL FLAGSHIP GALLERY */}
        {activeTab === "uiux" && (
          <div className="space-y-8 overflow-visible">
            <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-[#0C1A38] dark:to-[#060D1E] border-[1.5px] border-[#D4AF37]/50 dark:text-white text-[#111318] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-black text-[#111318] dark:text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#FF6B00]" />
                  UI/UX Design Projects & End-to-End Case Studies
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Every card represents an end-to-end design engagement. Click <strong>Read Case Study</strong> on any card to view problem statements, user research, wireframes, and design tokens.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#FF6B00] px-3.5 py-1.5 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/40 whitespace-nowrap">
                {uxProjectsList.length} Case Studies Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 overflow-visible py-4">
              {uxProjectsList.map((project) => (
                <UXProjectCard
                  key={project.id}
                  project={project}
                  onOpenCaseStudy={() => handleOpenUXCaseStudy(project)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIDEO TAB */}
        {activeTab === "video" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 overflow-visible py-4">
            {videoProjects.map((p) => (
              <MediaProjectCard
                key={p.id}
                project={p}
                onClick={() => handleOpenMediaProject(p)}
                isVideo
              />
            ))}
          </div>
        )}

        {/* GRAPHICS TAB */}
        {activeTab === "graphics" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 overflow-visible py-4">
            {graphicsProjects.map((p) => (
              <MediaProjectCard
                key={p.id}
                project={p}
                onClick={() => handleOpenMediaProject(p)}
              />
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-24 p-6 rounded-2xl bg-gradient-to-r from-[#0C1A38] via-[#081226] to-[#050C1A] border-[1.5px] border-[#D4AF37]/50 text-center flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 shadow-2xl"
        >
          <Sparkles className="w-4 h-4 text-[#FF6B00] animate-spin-slow" />
          <span className="font-black text-xs sm:text-sm tracking-[0.2em] text-white uppercase text-center">
            EVERY PROJECT IS A STEP TOWARDS USER DELIGHT & METRIC EXCELLENCE
          </span>
          <Sparkles className="w-4 h-4 text-[#F5BA42] animate-spin-slow" />
        </motion.div>

      </div>

      {/* Complete Interactive UX Case Study Modal */}
      <AnimatePresence>
        {selectedUXProject && (
          <UXCaseStudyModal
            project={selectedUXProject}
            onClose={() => setSelectedUXProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Legacy Video / Graphic Lightbox Modal */}
      <AnimatePresence>
        {selectedMediaProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMediaProject(null)}
              className="absolute inset-0 cursor-pointer"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="relative max-w-4xl w-full rounded-2xl border-[1.5px] border-[#D4AF37]/50 overflow-hidden shadow-2xl z-10 bg-[#0A1428]"
            >
              <button
                onClick={() => setSelectedMediaProject(null)}
                className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-white rounded-full bg-black/70 border border-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative bg-black flex items-center justify-center min-h-[280px] sm:min-h-[400px]">
                  {selectedMediaProject.category === "video" && selectedMediaProject.videoUrl ? (
                    <video
                      src={selectedMediaProject.videoUrl}
                      controls
                      autoPlay
                      loop
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="relative w-full h-full min-h-[280px] sm:min-h-[400px]">
                      <Image
                        src={selectedMediaProject.image}
                        alt={selectedMediaProject.title}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#081226] space-y-6">
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6B00] border border-[#FF6B00]/40 px-2.5 py-1 bg-[#FF6B00]/10 rounded-md inline-block">
                      {selectedMediaProject.category === "video" ? "VIDEO EDITING" : "GRAPHICS DESIGN"}
                    </span>
                    <div>
                      <h3 className="text-2xl font-black text-white">{selectedMediaProject.title}</h3>
                      <p className="text-xs font-semibold text-slate-300 mt-1">{selectedMediaProject.subtitle}</p>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {selectedMediaProject.details}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    {selectedMediaProject.projectUrl ? (
                      <a
                        href={selectedMediaProject.projectUrl}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#FF6B00] to-[#D4AF37] hover:from-[#FF7A00] hover:to-[#F5BA42] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                      >
                        Open 21-Artwork Gallery
                      </a>
                    ) : (
                      <div className="text-xs font-bold text-slate-400 uppercase">Role: Lead Creator</div>
                    )}
                    <button
                      onClick={() => setSelectedMediaProject(null)}
                      className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

/* Sub-component: Flagship UX Project Card (Dark Blue with Golden Stroke & 1.2 Scale Hover) */
interface UXProjectCardProps {
  project: UXProject;
  onOpenCaseStudy: () => void;
}

function UXProjectCard({ project, onOpenCaseStudy }: UXProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-2xl overflow-visible border-[1.5px] border-[#D4AF37]/50 hover:border-[#F5BA42] bg-white dark:bg-gradient-to-br dark:from-[#0D1B38] dark:via-[#081328] dark:to-[#050C1A] shadow-[0_12px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.45),0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.2),0_0_30px_rgba(245,186,66,0.15)] dark:hover:shadow-[0_20px_45px_rgba(0,0,0,0.75),0_0_30px_rgba(245,186,66,0.35)] transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1.5 flex flex-col will-change-transform dark-blue-gold-card border-[#E5E7EB] dark:border-[rgba(212,175,55,0.5)]"
    >
      {/* Visual Header with Mockup Image */}
      <div 
        onClick={onOpenCaseStudy}
        className="relative w-full aspect-[16/10] bg-[#050B16] rounded-t-2xl overflow-hidden cursor-pointer"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081328] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

        {/* Floating Top Badges (Vibrant Orange & Gold) */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white shadow-[0_0_12px_rgba(255,107,0,0.4)] border border-[#FFA000]/40">
            UX CASE STUDY
          </span>
          <span className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold text-white bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 text-[#F5BA42] fill-[#F5BA42]" />
            <span className="truncate max-w-[150px]">{project.statsBadge}</span>
          </span>
        </div>

        {/* Hover Quick Action Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="px-4 py-2 rounded-full bg-[#0B1736]/90 backdrop-blur-md border border-[#F5BA42] text-[#F5BA42] text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(245,186,66,0.4)] scale-95 group-hover:scale-100 transition-transform">
            <BookOpen className="w-4 h-4 text-[#FF6B00]" />
            <span>Click to Open Case Study</span>
          </div>
        </div>

        {/* Gallery Screen Count Pill */}
        {project.gallery.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-gray-200 flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#00F0FF]" />
            <span>{project.gallery.length} Screens Included</span>
          </div>
        )}
      </div>

      {/* Card Content Details */}
      <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-5 bg-[#F8FAFC] dark:bg-gradient-to-b dark:from-[#081328] dark:to-[#050C1A] rounded-b-2xl">
        <div className="space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2FF] dark:bg-[#0F2248] border border-[#D4AF37]/30 text-[#374151] dark:text-[#F5BA42]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title & Subtitle */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#111318] dark:text-white group-hover:text-[#B8941F] dark:group-hover:text-[#F5BA42] transition-colors flex items-center justify-between">
              <span>{project.title}</span>
              <ArrowRight className="w-4 h-4 text-[#FF6B00] group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#374151] dark:text-[#94A3B8] mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#CBD5E1] leading-relaxed line-clamp-3">
            {project.summary}
          </p>
        </div>

        {/* Dual Actions Footer */}
        <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-[#667085] dark:text-[#94A3B8] w-full sm:w-auto">
            <span>Impact: </span>
            <span className="text-[#2563EB] dark:text-[#00F0FF] font-bold">{project.caseStudy.metrics[0].value}</span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={onOpenCaseStudy}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#D4AF37] hover:from-[#FF7A00] hover:to-[#F5BA42] text-white font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_18px_rgba(255,107,0,0.35)] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Read Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </motion.div>

  );
}

/* Sub-component: Video & Graphics Project Card (Dark Blue with Golden Stroke & 1.2 Scale Hover) */
interface MediaProjectCardProps {
  project: LegacyProject;
  onClick: () => void;
  isVideo?: boolean;
}

function MediaProjectCard({ project, onClick, isVideo = false }: MediaProjectCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group relative aspect-[4/3] rounded-xl overflow-visible border-[1.5px] border-[#D4AF37]/45 hover:border-[#F5BA42] bg-[#0A1428] shadow-[0_8px_25px_rgba(0,0,0,0.4),0_0_15px_rgba(212,175,55,0.12)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.75),0_0_30px_rgba(245,186,66,0.35)] transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1.5 cursor-pointer will-change-transform dark-blue-gold-card"
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E]/95 via-[#081328]/60 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-4">
          <div className="flex justify-end">
            <div className="w-8 h-8 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00] flex items-center justify-center text-[#FF6B00] group-hover:scale-110 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-md">
              {isVideo ? <Play className="w-3.5 h-3.5 fill-current stroke-[3]" /> : <Eye className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] sm:text-[10px] font-bold text-[#F5BA42] uppercase tracking-wider block">
              {project.subtitle}
            </span>
            <h4 className="font-black text-xs sm:text-sm text-white leading-tight">
              {project.title}
            </h4>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

