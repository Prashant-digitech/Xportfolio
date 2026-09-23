"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Users, Eye, Layers, Compass, PlayCircle, ShieldCheck, CheckCircle,
  FileCode, Sparkles, Sliders, ArrowRight, Laptop, Activity, LayoutGrid, CheckSquare
} from "lucide-react";

type ProcessTab = "narrative" | "artifact" | "tokens";

interface ProcessStep {
  step: string;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  challenge: string;
  goal: string;
  research: string;
  flow: string;
  result: string;
  metrics: string;
  artifactName: string;
  artifactTag: string;
  artifactContent: React.ReactNode;
  tokens: {
    category: string;
    token: string;
    value: string;
    heuristic: string;
  }[];
}

export default function DesignProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<ProcessTab>("narrative");

  const steps: ProcessStep[] = [
    {
      step: "01",
      title: "Discover",
      icon: <Compass className="w-5 h-5" />,
      subtitle: "Discovering user challenges and core system requirements.",
      challenge: "High checkout abandonment rate on client portal (over 65%). Users reported confusion and hesitation during payment verification.",
      goal: "Reduce abandonment by 20% and streamline the user flows to complete transactions in under 3 simple stages.",
      research: "Heuristic evaluation identified 12 critical frictions. User surveys (150 respondents) revealed payment verification was the primary stress node.",
      flow: "Map entry point directly to secure checkout, bypassing redundant confirmation screens.",
      result: "Constructed simplified wireframe diagrams eliminating 4 redundant confirmation steps.",
      metrics: "Reduced system drop-offs by 28% during prototype testing.",
      artifactName: "Stakeholder Empathy Map & Friction Canvas",
      artifactTag: "Phase 01 Deliverable",
      artifactContent: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <span className="font-mono text-[10px] text-[#B8941F] dark:text-[#F5BA42] font-bold block mb-1">USER SAYS</span>
              <p className="text-slate-700 dark:text-slate-300 italic">&ldquo;I wasn&apos;t sure if my payment went through or if I was double-charged.&rdquo;</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <span className="font-mono text-[10px] text-neon-blue font-bold block mb-1">USER THINKS</span>
              <p className="text-slate-700 dark:text-slate-300 italic">&ldquo;Why are there 4 separate confirmation screens for a single transaction?&rdquo;</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <span className="font-mono text-[10px] text-[#FF6B00] font-bold block mb-1">PAIN POINTS</span>
              <p className="text-slate-700 dark:text-slate-300">Lack of instant progress bar; ambiguous error messages on card decline.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <span className="font-mono text-[10px] text-emerald-500 font-bold block mb-1">ACTION MANDATE</span>
              <p className="text-slate-700 dark:text-slate-300">Consolidate into 3-step checkout with live validation and clear badge indicators.</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
            ✓ Stakeholder Alignment: 100% agreement on 3-tier milestone reduction.
          </div>
        </div>
      ),
      tokens: [
        { category: "Color Token", token: "--status-warning", value: "#F59E0B", heuristic: "#1: Visibility of system status" },
        { category: "Color Token", token: "--status-error", value: "#EF4444", heuristic: "#9: Help users recognize, diagnose, and recover from errors" },
        { category: "Spacing Token", token: "--space-form-gap", value: "16px (1rem)", heuristic: "#4: Consistency and standards" },
        { category: "Elevation", token: "--shadow-modal", value: "0 20px 25px -5px rgba(0,0,0,0.5)", heuristic: "#8: Aesthetic and minimalist design" }
      ]
    },
    {
      step: "02",
      title: "Research",
      icon: <Search className="w-5 h-5" />,
      subtitle: "Qualitative research, user personas, and competitor audits.",
      challenge: "Vague competitor data and unclear target demographics for a new generative AI tools platform.",
      goal: "Identify target personas and chart specific tool usage workflows across speed vs compliance.",
      research: "Conducted 10 structured interviews. Defined two core user personas: 'E-commerce Operator' (speed-oriented) and 'Corporate Buyer' (compliance-oriented).",
      flow: "Tailor custom workflows tailored to speed (one-click actions) and details (audit exports).",
      result: "Mapped user storyboards showing exactly where AI prompt assistance is required.",
      metrics: "User interface clarity scored 9.2/10 during initial testing.",
      artifactName: "User Persona & Competitor Benchmark Matrix",
      artifactTag: "Phase 02 Deliverable",
      artifactContent: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#B8941F] dark:text-[#F5BA42] font-bold uppercase">PRIMARY PERSONA</span>
              <h4 className="text-base font-black text-[#0a1128] dark:text-white">Alex Morgan — Lead Operations Specialist</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Goal: Generate 50+ localized marketing variants in under 10 minutes with zero manual export friction.</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] font-mono font-bold shrink-0">
              High-Velocity Archetype
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-[10px] text-slate-500 block">Avg Session Time</span>
              <span className="font-bold text-[#0a1128] dark:text-white">4m 12s</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-[10px] text-slate-500 block">Task Success Rate</span>
              <span className="font-bold text-emerald-500">94.8%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-[10px] text-slate-500 block">Usability Score</span>
              <span className="font-bold text-[#FF6B00]">9.2 / 10</span>
            </div>
          </div>
        </div>
      ),
      tokens: [
        { category: "Typography", token: "--font-heading", value: "Outfit, sans-serif 700", heuristic: "#4: Consistency and standards" },
        { category: "Typography", token: "--font-mono", value: "JetBrains Mono 500", heuristic: "#2: Match between system and the real world" },
        { category: "Contrast", token: "--wcag-ratio", value: "7.2:1 (Passes AAA)", heuristic: "#7: Flexibility and efficiency of use" },
        { category: "Touch Target", token: "--min-touch-target", value: "44px x 44px", heuristic: "#5: Error prevention" }
      ]
    },
    {
      step: "03",
      title: "Wireframe",
      icon: <Layers className="w-5 h-5" />,
      subtitle: "Structuring content hierarchy and LO-FI layout grids.",
      challenge: "Content overloading on homepage dashboard. Critical stats were lost below the fold.",
      goal: "Reorganize architecture into a clean, metric-focused luxury dashboard.",
      research: "A/B card sorting with 8 users to determine what metrics drive business decisions.",
      flow: "Dashboard layout structured with critical KPIs at top, detail lists folding below.",
      result: "Created 15 LO-FI layout frames in Figma mapping key responsive configurations.",
      metrics: "Average time-to-metric retrieval dropped from 18 seconds to 4.2 seconds.",
      artifactName: "LO-FI Responsive Layout Architecture Diagram",
      artifactTag: "Phase 03 Deliverable",
      artifactContent: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-dashed border-black/20 dark:border-white/20 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-black/10 dark:border-white/10">
              <span>// 12-Column Responsive Blueprint (1440px / 768px / 375px)</span>
              <span className="text-emerald-500">Auto-Layout Strict</span>
            </div>
            <div className="h-6 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[10px] text-[#B8941F] dark:text-[#F5BA42] font-bold">
              [ HEADER & GLOBAL STATUS NAVIGATION ]
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="h-10 rounded bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-[9px] text-blue-400">KPI 1</div>
              <div className="h-10 rounded bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-[9px] text-blue-400">KPI 2</div>
              <div className="h-10 rounded bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-[9px] text-blue-400">KPI 3</div>
              <div className="h-10 rounded bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-[9px] text-blue-400">KPI 4</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-8 h-20 rounded bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-[10px] text-purple-400">[ INTERACTIVE CHART CANVAS (75%) ]</div>
              <div className="col-span-4 h-20 rounded bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[10px] text-amber-400">[ LIVE FEED (25%) ]</div>
            </div>
          </div>
        </div>
      ),
      tokens: [
        { category: "Grid Column", token: "--grid-columns-desktop", value: "12 cols (1440px)", heuristic: "#4: Consistency and standards" },
        { category: "Grid Gutter", token: "--grid-gutter-desktop", value: "24px", heuristic: "#8: Aesthetic and minimalist design" },
        { category: "Border Radius", token: "--radius-card", value: "16px (1rem)", heuristic: "#4: Consistency and standards" },
        { category: "Container Max", token: "--container-max", value: "1280px (80rem)", heuristic: "#7: Flexibility and efficiency of use" }
      ]
    },
    {
      step: "04",
      title: "Prototype",
      icon: <PlayCircle className="w-5 h-5" />,
      subtitle: "High-fidelity interactive states and Figma Smart Animate flows.",
      challenge: "Users failing to understand transition states of complex settings panels.",
      goal: "Construct a seamless micro-interactive settings drawer that morphs state on click.",
      research: "Observed users struggled to know if changes were saved automatically.",
      flow: "Add floating status indicator that glows green ('Saved') or yellow ('Saving...').",
      result: "Implemented Figma Smart Animate prototype with complete custom component transitions.",
      metrics: "95% success rate for saving and updating configurations in testing.",
      artifactName: "Figma Smart Animate Motion & State Spec",
      artifactTag: "Phase 04 Deliverable",
      artifactContent: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <span className="text-[10px] text-slate-500 block">Curve Easing</span>
              <span className="font-bold text-[#FF6B00]">cubic-bezier(0.16, 1, 0.3, 1)</span>
              <span className="text-[10px] text-slate-400 block mt-1">Apple-grade deceleration</span>
            </div>
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <span className="text-[10px] text-slate-500 block">Transition Duration</span>
              <span className="font-bold text-[#F5BA42]">250ms ~ 350ms</span>
              <span className="text-[10px] text-slate-400 block mt-1">Sub-perceptual latency</span>
            </div>
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <span className="text-[10px] text-slate-500 block">State Feedback</span>
              <span className="font-bold text-emerald-500">Live Auto-Save</span>
              <span className="text-[10px] text-slate-400 block mt-1">Persistent status badge</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-300">Active Interactive States: Hover, Focus, Active, Disabled, Loading, Success</span>
            <span className="text-emerald-500 font-mono font-bold">✓ 6/6 Tested</span>
          </div>
        </div>
      ),
      tokens: [
        { category: "Motion Duration", token: "--duration-fast", value: "150ms", heuristic: "#1: Visibility of system status" },
        { category: "Motion Duration", token: "--duration-medium", value: "300ms", heuristic: "#1: Visibility of system status" },
        { category: "Motion Easing", token: "--ease-spring", value: "cubic-bezier(0.16, 1, 0.3, 1)", heuristic: "#8: Aesthetic and minimalist design" },
        { category: "Z-Index Layer", token: "--z-drawer", value: "50", heuristic: "#6: Recognition rather than recall" }
      ]
    },
    {
      step: "05",
      title: "Test",
      icon: <Eye className="w-5 h-5" />,
      subtitle: "Usability testing, heatmaps, and performance benchmarks.",
      challenge: "Slow interaction times on mobile configurations due to heavy animations.",
      goal: "Optimize scroll performance to maintain 60 FPS and clean interactive transitions.",
      research: "Lighthouse audit revealed render-blocking resources. Playwright tests checked interactions.",
      flow: "Optimize canvas particles to pause when off-screen and simplify rendering math.",
      result: "Refactored codebase files to dynamically lazy-load heavy particle wave canvas modules.",
      metrics: "Lighthouse mobile score increased from 78 to 96+.",
      artifactName: "Usability Lab & Lighthouse Audit Scorecard",
      artifactTag: "Phase 05 Deliverable",
      artifactContent: (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">PERFORMANCE</span>
              <span className="text-2xl font-black text-emerald-500">98</span>
              <span className="text-[9px] text-slate-400 block">Lighthouse Mobile</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">ACCESSIBILITY</span>
              <span className="text-2xl font-black text-emerald-500">100</span>
              <span className="text-[9px] text-slate-400 block">WCAG 2.1 AA</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">BEST PRACTICES</span>
              <span className="text-2xl font-black text-emerald-500">100</span>
              <span className="text-[9px] text-slate-400 block">Modern Web</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">SEO SCORE</span>
              <span className="text-2xl font-black text-emerald-500">100</span>
              <span className="text-[9px] text-slate-400 block">Search Indexed</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600 dark:text-slate-400">Playwright E2E Interaction Test Suite: 24 tests passed</span>
            <span className="text-emerald-500 font-bold">✓ 0 Failures (0.4s)</span>
          </div>
        </div>
      ),
      tokens: [
        { category: "Web Vital", token: "CLS (Layout Shift)", value: "< 0.02 (Ideal)", heuristic: "#1: Visibility of system status" },
        { category: "Web Vital", token: "LCP (Largest Paint)", value: "1.1s (Ultra Fast)", heuristic: "#8: Aesthetic and minimalist design" },
        { category: "Web Vital", token: "INP (Interaction)", value: "42ms (Sub-50ms)", heuristic: "#7: Flexibility and efficiency of use" },
        { category: "Accessibility", token: "Aria Roles", value: "dialog, button, tablist", heuristic: "#2: Match between system and real world" }
      ]
    },
    {
      step: "06",
      title: "Launch",
      icon: <ShieldCheck className="w-5 h-5" />,
      subtitle: "System deployment, visual audits, and analytics monitoring.",
      challenge: "Post-launch user feedback reporting minor scaling issues on tablet portrait modes.",
      goal: "Achieve a pixel-perfect layout across all screens and desktop viewport ranges.",
      research: "Inspected Google Analytics screen resolution reports.",
      flow: "Adjust CSS media breakpoints to wrap layouts gracefully at 768px and 1024px.",
      result: "Deployed production-ready patch ensuring seamless scaling on portrait and landscapes.",
      metrics: "Zero layout console errors reported; customer satisfaction scored 99.8%.",
      artifactName: "Production Design Token Export & Release Matrix",
      artifactTag: "Phase 06 Deliverable",
      artifactContent: (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#050C1A] border border-white/10 font-mono text-[11px] text-slate-300 space-y-1">
            <span className="text-emerald-400 block">// tokens.export.json — Production Design System Tokens</span>
            <span className="text-slate-400">{`{`}</span>
            <span className="text-blue-300 pl-4">{`"color": { "primary": "#D4AF37", "accent": "#00F0FF", "surface": "#050814" },`}</span>
            <span className="text-amber-300 pl-4">{`"spacing": { "cardPadding": "24px", "stackGap": "16px" },`}</span>
            <span className="text-purple-300 pl-4">{`"elevation": { "glow": "0 0 25px rgba(212,175,55,0.25)" }`}</span>
            <span className="text-slate-400">{`}`}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-slate-700 dark:text-slate-300">Vercel Edge CDN Deployed</span>
            </div>
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-slate-700 dark:text-slate-300">Zero Runtime Console Errors</span>
            </div>
          </div>
        </div>
      ),
      tokens: [
        { category: "Release Target", token: "--env-target", value: "Production Vercel Global", heuristic: "#1: Visibility of system status" },
        { category: "Bundle Size", token: "--first-load-js", value: "85 KB (Turbopack Optimized)", heuristic: "#7: Flexibility and efficiency of use" },
        { category: "Caching Header", token: "Cache-Control", value: "public, max-age=31536000", heuristic: "#8: Aesthetic and minimalist design" },
        { category: "Uptime SLA", token: "--availability-target", value: "99.99%", heuristic: "#9: Help users recognize and recover" }
      ]
    }
  ];

  return (
    <section id="process" className="relative py-24 bg-[#FAFAF7] dark:bg-[#090A0E] text-[#111318] dark:text-white transition-colors duration-250">
      <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#B8941F] dark:text-[#D4AF37]">End-to-End Methodology</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#111318] dark:text-white">
            DESIGN <span className="text-[#B7791F] dark:text-[#D4AF37]">PROCESS</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mt-4 shadow-[0_0_8px_#D4A017]" />
          <p className="text-[#4B5563] dark:text-[#D1D5DB] mt-4 max-w-2xl text-base sm:text-lg leading-relaxed">
            Click on any phase to inspect UX research files, live artifact previews, and Figma design tokens.
          </p>
        </div>

        {/* Horizontal journey timeline steps */}
        <div className="w-full overflow-x-auto no-scrollbar pb-4 mb-8">
          <div className="flex items-center justify-start lg:justify-center gap-3 min-w-max px-2">
            {steps.map((s, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`min-w-[150px] sm:min-w-[170px] h-[48px] flex items-center justify-center space-x-3 px-4 py-2.5 rounded-xl border-[1.5px] text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-gold ${
                    isSelected
                      ? "bg-[#D4AF37] text-[#111318] dark:text-[#000000] border-[#D4AF37] shadow-[0_4px_16px_rgba(212,175,55,0.35)] scale-[1.03]"
                      : "bg-[#FFFFFF] dark:bg-[#0F1118] border-[#D6B95A] dark:border-[rgba(212,175,55,0.45)] text-[#374151] dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-[#FFF9E8] dark:hover:bg-[#171A21] hover:border-[#D4AF37] hover:text-[#111318]"
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Step ${s.step}: ${s.title}`}
                >
                  <span className={isSelected ? "text-[#111318] dark:text-[#000000]" : "text-[#6B7280] dark:text-[#D4AF37]"}>
                    {s.icon}
                  </span>
                  <span className={`font-mono text-[11px] ${isSelected ? "text-[#111318] dark:text-[#000000] font-bold" : "text-[#B8941F] dark:text-[#F5BA42]"}`}>
                    {s.step}
                  </span>
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP INSPECTION DASHBOARD */}
        <div className="min-h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl border-[1.5px] border-[#D4AF37]/50 dark:border-[rgba(212,175,55,0.38)] bg-white dark:bg-[#0F1118] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] text-[#111318] dark:text-white relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
              
              {/* Header with Sub-Tab Switcher */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-black/10 dark:border-white/10 pb-5">
                <div>
                  <span className="text-xs font-mono text-[#B8941F] dark:text-[#F5BA42] block uppercase tracking-widest mb-1 font-bold">
                    PHASE_{steps[activeStep].step} // STAGE_DEEP_DIVE
                  </span>
                  <h3 className="text-2xl font-black text-[#111318] dark:text-white uppercase tracking-wider">
                    {steps[activeStep].title} Stage Analysis
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
                    {steps[activeStep].subtitle}
                  </p>
                </div>

                {/* Sub-Tabs */}
                <div className="flex p-1 rounded-xl bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 shrink-0">
                  {[
                    { id: "narrative", label: "UX Narrative", icon: <Sliders className="w-3.5 h-3.5" /> },
                    { id: "artifact", label: "Artifact Preview", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
                    { id: "tokens", label: "Figma Tokens & Heuristics", icon: <FileCode className="w-3.5 h-3.5" /> },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as ProcessTab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-[#D4AF37] text-black font-extrabold shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SUB-TAB 1: UX NARRATIVE */}
              {activeTab === "narrative" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Challenge & Research */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] uppercase font-bold text-[#B8941F] dark:text-[#F5BA42] tracking-wider mb-2 font-mono">// Core Challenge</h4>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-[#F4F1E8] dark:bg-white/[0.02] p-4 rounded-xl border border-black/5 dark:border-white/5">
                        {steps[activeStep].challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase font-bold text-[#B8941F] dark:text-[#F5BA42] tracking-wider mb-2 font-mono">// UX Research & Personas</h4>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-[#F4F1E8] dark:bg-white/[0.02] p-4 rounded-xl border border-black/5 dark:border-white/5">
                        {steps[activeStep].research}
                      </p>
                    </div>
                  </div>

                  {/* Solution & Impact */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-[10px] uppercase font-bold text-[#B8941F] dark:text-[#F5BA42] tracking-wider mb-2 font-mono">// Business Goal</h4>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-[#F4F1E8] dark:bg-white/[0.02] p-4 rounded-xl border border-black/5 dark:border-white/5">
                          {steps[activeStep].goal}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase font-bold text-[#B8941F] dark:text-[#F5BA42] tracking-wider mb-2 font-mono">// Strategy & Flow</h4>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-[#F4F1E8] dark:bg-white/[0.02] p-4 rounded-xl border border-black/5 dark:border-white/5">
                          {steps[activeStep].flow}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-black/5 dark:border-white/5 pt-6">
                      <div className="col-span-2">
                        <h4 className="text-[10px] uppercase font-bold text-[#B8941F] dark:text-[#F5BA42] tracking-wider mb-1 font-mono">// Prototype Output</h4>
                        <p className="text-xs text-[#111318] dark:text-gray-200 font-bold">
                          {steps[activeStep].result}
                        </p>
                      </div>
                      <div className="text-right flex flex-col justify-center">
                        <span className="text-[9px] uppercase font-bold text-[#B8941F] dark:text-[#F5BA42] tracking-widest block mb-1 font-mono">Verified Impact</span>
                        <span className="text-sm font-black text-[#2563EB] dark:text-[#00F0FF]">{steps[activeStep].metrics}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: LIVE ARTIFACT DELIVERABLE */}
              {activeTab === "artifact" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/5">
                    <span className="text-sm font-bold text-[#0a1128] dark:text-white flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-[#D4AF37]" />
                      {steps[activeStep].artifactName}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-[#D4AF37]/10 text-[#B8941F] dark:text-[#F5BA42] border border-[#D4AF37]/20 text-[10px] font-mono font-bold">
                      {steps[activeStep].artifactTag}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 rounded-xl bg-black/[0.02] dark:bg-black/30 border border-black/10 dark:border-white/10">
                    {steps[activeStep].artifactContent}
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: FIGMA DESIGN TOKENS & HEURISTICS */}
              {activeTab === "tokens" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/5">
                    <span className="text-sm font-bold text-[#0a1128] dark:text-white flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-[#D4AF37]" />
                      Figma Design Tokens & Applied Usability Heuristics
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">
                      Strict Token Governance
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="border-b border-black/10 dark:border-white/10 text-slate-500 text-[10px] uppercase tracking-wider">
                          <th className="py-2.5 px-3">Category</th>
                          <th className="py-2.5 px-3">Design Token</th>
                          <th className="py-2.5 px-3">Computed Value</th>
                          <th className="py-2.5 px-3">Nielsen Norman UX Heuristic</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 dark:divide-white/5">
                        {steps[activeStep].tokens.map((tok, tIdx) => (
                          <tr key={tIdx} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                            <td className="py-2.5 px-3 font-bold text-[#0a1128] dark:text-white">{tok.category}</td>
                            <td className="py-2.5 px-3 text-[#B8941F] dark:text-[#F5BA42] font-semibold">{tok.token}</td>
                            <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{tok.value}</td>
                            <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">{tok.heuristic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
