"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Play, Pause, Volume2, VolumeX, Maximize2, Film,
  CheckCircle2, ArrowRight, X,
} from "lucide-react";

interface MotionProject {
  id: string;
  title: string;
  category: string;
  role: string;
  tools: string[];
  duration: string;
  description: string;
  poster: string;
  videoUrl: string;
  statsBadge: string;
  highlights: string[];
}

/* ─── Animation Variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

/* ─── Focus Trap Hook ─────────────────────────────────────── */
function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active || !containerRef.current) return;
    const el = containerRef.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), video, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [active, containerRef]);
}

export default function MotionLab() {
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeModalProject, setActiveModalProject] = useState<MotionProject | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  /* ─── Scroll-trigger refs ─────────────────────────────── */
  const sectionRef = useRef<HTMLElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const playerInView = useInView(playerRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  const motionProjects: MotionProject[] = [
    {
      id: "showreel-4k",
      title: "Cinematic Video Showreel 4K",
      category: "Master Showreel",
      role: "Lead Video Editor & Motion Designer",
      tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Audition"],
      duration: "00:34",
      description: "Flagship showreel highlighting dynamic speed ramping, Rec.709 color grading, kinetic typography, and precision multi-track sound design.",
      poster: "/images/showreel/video-showreel.png",
      videoUrl: "/videos/video-showreel.mp4",
      statsBadge: "4K Master • Speed Ramping",
      highlights: ["Frame-accurate beat matching", "Rec.709 film LUT calibration", "Kinetic subtitle typography"],
    },
    {
      id: "deepastro-walkthrough",
      title: "DeepAstro AI // 30s UX Product Walkthrough",
      category: "Product Walkthrough",
      role: "Lead UI/UX Designer & Product Architect",
      tools: ["Figma", "Design Tokens", "Next.js", "Framer Motion", "Antigravity"],
      duration: "00:30",
      description: "High-fidelity 30-second live product walkthrough of DeepAstro AI — demonstrating Vedic chart intelligence, Cosmic Dark glassmorphic design system, and multi-year life trajectory roadmap.",
      poster: "/images/ux/deepastro-hero.jpg",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      statsBadge: "30s Walkthrough • AI Life System",
      highlights: ["Cosmic Dark glassmorphism UI", "5-Year Future Intelligence roadmap", "SoulTrace karmic matrix"],
    },
    {
      id: "travel-cinematic",
      title: "Alpine Horizons // Travel Cinematic Film",
      category: "Cinematic Travel",
      role: "Director of Photography & Colorist",
      tools: ["Premiere Pro", "FilmConvert", "Lumetri Color"],
      duration: "02:30",
      description: "Atmospheric travel portfolio captured across the Swiss Alps and Dolomites. Features seamless whip-pan transitions, speed ramps, and natural acoustic ambiance.",
      poster: "/images/project_video_travel_cinematic.jpg",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      statsBadge: "Whip-Pans • Drone 4K",
      highlights: ["Natural spatial acoustic mix", "Speed-ramp mountain sweeps", "Teal and orange golden hour grading"],
    },
    {
      id: "fitness-promo",
      title: "Apex Velocity // Fitness Brand Commercial",
      category: "Commercial Ad",
      role: "Editor & VFX Compositor",
      tools: ["After Effects", "Premiere Pro", "Soundly"],
      duration: "00:45",
      description: "High-octane commercial film featuring rhythmic stutter cuts, bass-heavy sound synchronization, glitch overlays, and bold kinetic type graphics.",
      poster: "/images/project_video_fitness_promo.jpg",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      statsBadge: "High Energy • Glitch VFX",
      highlights: ["High-impact 140 BPM cut rate", "Custom glitch alpha overlays", "Sub-bass riser sound design"],
    },
    {
      id: "product-ad",
      title: "Lumina Noir // Luxury Product Commercial",
      category: "Product Commercial",
      role: "3D Motion Designer & Art Director",
      tools: ["After Effects", "Cinema 4D", "Premiere Pro"],
      duration: "00:30",
      description: "High-end luxury commercial highlighting dramatic macro-depth lighting, liquid particle dynamics, and sleek 3D typography callouts.",
      poster: "/images/project_video_product_ad.jpg",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      statsBadge: "Macro Lighting • 3D AE",
      highlights: ["Chiaroscuro glass reflections", "Depth-of-field focus pulling", "Minimalist luxury soundscape"],
    },
    {
      id: "wedding-highlights",
      title: "Eternal Radiance // Luxury Wedding Film",
      category: "Event Documentary",
      role: "Cinematographer & Lead Editor",
      tools: ["Premiere Pro", "Audition", "Color Finale"],
      duration: "03:15",
      description: "Emotional, narrative-driven wedding highlight reel featuring warm pastel color palettes, acoustic orchestration, and heartfelt dialogue weaving.",
      poster: "/images/project_video_wedding_highlights.jpg",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      statsBadge: "Emotional Narrative • Rec.709",
      highlights: ["Dialogue stem noise isolation", "Warm filmic grain overlay", "Slow-motion emotional b-roll"],
    },
    {
      id: "corporate-pitch-film",
      title: "Synthetix Enterprise // Brand Vision Film",
      category: "Corporate Narrative",
      role: "Visual Storyteller & Motion Lead",
      tools: ["After Effects", "Illustrator", "Premiere Pro"],
      duration: "01:15",
      description: "Executive narrative film blending infographics, live-action footage, and vector icon animations for high-stakes investor pitch presentations.",
      poster: "/images/project_graphics_promo_poster.jpg",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      statsBadge: "Executive Pitch • Motion",
      highlights: ["Motion infographic tracking", "Corporate brand color tokens", "Executive voiceover mastering"],
    },
  ];

  const [dynamicVideos, setDynamicVideos] = useState<MotionProject[]>([]);

  useEffect(() => {
    fetch("/api/upload")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.categories?.videos?.length) {
          interface UploadedVideoItem {
            id: string;
            title: string;
            role?: string;
            tools?: string[];
            duration?: string;
            description: string;
            publicUrl: string;
            statsBadge?: string;
            tags?: string[];
          }
          const mapped: MotionProject[] = data.categories.videos.map((v: UploadedVideoItem) => ({
            id: v.id,
            title: v.title,
            category: "Dynamic Video Showcase",
            role: v.role || "Lead Video Editor & Motion Designer",
            tools: v.tools || ["Premiere Pro", "After Effects"],
            duration: v.duration || "00:34",
            description: v.description,
            poster: "/images/showreel/video-showreel.png",
            videoUrl: v.publicUrl,
            statsBadge: v.statsBadge || "New Upload • 4K Master",
            highlights: v.tags || ["Dynamic Motion", "Color Graded", "Authentic Cut"],
          }));
          setDynamicVideos(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const allProjects = [...dynamicVideos, ...motionProjects];
  const currentProject = allProjects[activeProjectIdx] || allProjects[0];

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
    else { videoRef.current.play(); setIsPlaying(true); }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const closeModal = useCallback(() => setActiveModalProject(null), []);

  /* ─── Pause inline player when project changes ────────── */
  useEffect(() => {
    if (videoRef.current) { videoRef.current.load(); setIsPlaying(false); }
  }, [activeProjectIdx]);

  /* ─── Accessibility: scroll lock + ESC ───────────────── */
  useEffect(() => {
    if (!activeModalProject) { document.body.style.overflow = ""; return; }
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKeyDown); };
  }, [activeModalProject, closeModal]);

  useFocusTrap(!!activeModalProject, modalRef);

  return (
    <section
      id="motion"
      ref={sectionRef}
      aria-label="Motion and Film Lab"
      className="relative py-24 bg-[#FAFAF7] dark:bg-[#090A0E] text-[#111318] dark:text-white transition-colors duration-250 overflow-hidden"
    >
      {/* Background Ambience */}
      <div aria-hidden="true" className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#9D4EDD]/5 blur-[130px] pointer-events-none will-change-transform" />
      <div aria-hidden="true" className="absolute bottom-[10%] right-[-5%] w-[350px] h-[350px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={sectionInView ? "show" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0F1118] border border-[#B8941F]/40 dark:border-[#D4AF37]/30 text-[#111318] dark:text-gray-300 text-xs font-bold tracking-wider uppercase shadow-sm mb-3">
            <Film className="w-3.5 h-3.5 text-[#B8941F] dark:text-[#D4AF37]" aria-hidden="true" />
            <span>CINEMATIC STORYTELLING &amp; MOTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111318] dark:text-white">
            MOTION / <span className="text-gradient-gold">FILM LAB</span>
          </h2>

          <div aria-hidden="true" className="w-16 h-[2px] bg-[#D4AF37] mt-4 shadow-[0_0_8px_#D4A017]" />

          <p className="text-[#374151] dark:text-[#D1D5DB] mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
            Motion design, speed ramping, Rec.709 color grading, multi-track audio balancing, and visual storytelling that connect digital interfaces to human emotion.
          </p>
        </motion.div>

        {/* ── Featured Cinematic Player ────────────────────── */}
        <motion.div
          ref={playerRef}
          initial="hidden"
          animate={playerInView ? "show" : "hidden"}
          variants={scaleIn}
          className="mb-20 rounded-2xl border-[1.5px] border-[#D4AF37]/50 bg-white dark:bg-[#0F1118] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Video Box */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black border border-black/10 dark:border-white/10 shadow-xl group will-change-transform">
                <video
                  ref={videoRef}
                  src={currentProject.videoUrl}
                  poster={currentProject.poster}
                  muted={isMuted}
                  playsInline
                  loop
                  aria-label={`${currentProject.title} video preview`}
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {!isPlaying && (
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                )}

                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    role="button"
                    tabIndex={0}
                    aria-label={`Play ${currentProject.title}`}
                    onKeyDown={(e) => e.key === "Enter" && togglePlay()}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                  >
                    <div className="w-16 h-16 rounded-full bg-black/70 border-2 border-[#D4AF37] text-[#D4AF37] backdrop-blur-md flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform will-change-transform">
                      <Play className="w-7 h-7 fill-current ml-1" aria-hidden="true" />
                    </div>
                  </div>
                )}

                {/* Control Bar */}
                <div aria-label="Video controls" className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between text-white text-xs">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Play className="w-4 h-4 fill-current" aria-hidden="true" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                      aria-pressed={!isMuted}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" aria-hidden="true" /> : <Volume2 className="w-4 h-4" aria-hidden="true" />}
                    </button>
                    <span className="font-mono text-[10px] text-gray-300" aria-label={`Duration ${currentProject.duration}`}>
                      {currentProject.duration} // 4K 60FPS
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span aria-hidden="true" className="px-2 py-0.5 rounded bg-black/80 border border-[#D4AF37]/40 text-[9px] font-mono text-[#F5BA42] font-bold">
                      {currentProject.statsBadge}
                    </span>
                    <button
                      onClick={() => setActiveModalProject(currentProject)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                      aria-label={`Open ${currentProject.title} in fullscreen`}
                    >
                      <Maximize2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B8941F] dark:text-[#D4AF37] block mb-1">
                  FEATURED CINEMATIC WORK
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#111318] dark:text-white uppercase tracking-wider">
                  {currentProject.title}
                </h3>
                <span className="text-xs font-mono text-[#667085] dark:text-gray-400 block mt-1">
                  Role: {currentProject.role}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#374151] dark:text-gray-300 leading-relaxed">
                {currentProject.description}
              </p>

              <div className="space-y-2 border-t border-black/10 dark:border-white/10 pt-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#667085] dark:text-gray-400 block font-bold">
                  Key Motion Signatures:
                </span>
                {currentProject.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-[#111318] dark:text-gray-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8941F] dark:text-[#D4AF37] shrink-0" aria-hidden="true" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tools.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] font-mono font-bold">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setActiveModalProject(currentProject)}
                  aria-label={`Watch ${currentProject.title} fullscreen`}
                  className="btn-primary text-xs flex items-center space-x-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  <span>Watch Project</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Motion Portfolio Grid ────────────────────────── */}
        <div>
          <div className="border-b border-black/10 dark:border-white/10 pb-4 mb-8 flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-[#111318] dark:text-white uppercase tracking-wider">
              Selected Motion Portfolio
            </h3>
            <span className="text-xs font-mono text-[#667085] dark:text-gray-400 font-bold" aria-label={`${allProjects.length} motion projects`}>
              {allProjects.length} Motion Pieces
            </span>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {allProjects.map((proj, idx) => (
              <motion.article
                key={proj.id}
                initial="hidden"
                animate={gridInView ? "show" : "hidden"}
                variants={fadeUp}
                custom={idx}
                className="group p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0F1118] hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between will-change-transform"
              >
                <div>
                  {/* Poster Thumbnail */}
                  <div
                    onClick={() => { setActiveProjectIdx(idx); setActiveModalProject(proj); }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Watch ${proj.title}`}
                    onKeyDown={(e) => { if (e.key === "Enter") { setActiveProjectIdx(idx); setActiveModalProject(proj); } }}
                    className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black border border-black/10 dark:border-white/10 mb-4 cursor-pointer group/vid focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                  >
                    <Image
                      src={proj.poster}
                      alt={`${proj.title} preview poster`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/vid:scale-105 will-change-transform"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/vid:opacity-30 transition-opacity" />

                    {/* Play Overlay */}
                    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/70 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-lg group-hover/vid:scale-110 transition-transform will-change-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    <div aria-hidden="true" className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 text-[9px] font-mono text-[#F5BA42] font-bold">
                      {proj.duration}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-[#B8941F] dark:text-[#F5BA42] uppercase tracking-wider block mb-1 font-bold">
                    {proj.category.toUpperCase()} • {proj.statsBadge}
                  </span>
                  <h4 className="font-extrabold text-base text-[#111318] dark:text-white uppercase tracking-wider mb-2 group-hover:text-[#B8941F] dark:group-hover:text-[#F5BA42] transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-[#4B5563] dark:text-gray-300 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1">
                    {proj.tools.slice(0, 2).map((t, tidx) => (
                      <span key={tidx} className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[9px] font-mono text-[#667085] dark:text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => { setActiveProjectIdx(idx); setActiveModalProject(proj); }}
                    aria-label={`Watch ${proj.title}`}
                    className="text-[#B8941F] dark:text-[#D4AF37] hover:underline font-bold text-xs uppercase flex items-center space-x-1 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] rounded"
                  >
                    <span>Watch</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

      </div>

      {/* ── Video Modal ───────────────────────────────────── */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`Video player: ${activeModalProject.title}`}
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22 }}
              className="relative max-w-4xl w-full rounded-2xl bg-white dark:bg-[#0F1118] border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 text-[#111318] dark:text-white overflow-hidden"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black border border-black/10 dark:border-white/10">
                  <video
                    src={activeModalProject.videoUrl}
                    poster={activeModalProject.poster}
                    controls
                    autoPlay
                    aria-label={`${activeModalProject.title} — full video`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#B8941F] dark:text-[#D4AF37] font-bold uppercase">
                      {activeModalProject.category} • {activeModalProject.duration}
                    </span>
                    <h3 className="text-xl font-black text-[#111318] dark:text-white uppercase">
                      {activeModalProject.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-gray-400">
                    Role: {activeModalProject.role}
                  </span>
                </div>

                <p className="text-xs text-[#4B5563] dark:text-gray-300 leading-relaxed">
                  {activeModalProject.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {activeModalProject.tools.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] font-mono font-bold">
                      {t}
                    </span>
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
