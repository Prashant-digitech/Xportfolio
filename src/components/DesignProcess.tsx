"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Users, Eye, Layers, Compass, PlayCircle, ShieldCheck, CheckCircle
} from "lucide-react";

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
}

export default function DesignProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: ProcessStep[] = [
    {
      step: "01",
      title: "Discover",
      icon: <Compass className="w-5 h-5" />,
      subtitle: "Discovering user challenges and core system requirements.",
      challenge: "High checkout abandonment rate on the client portal (over 65%). Users reported confusion during payment.",
      goal: "Reduce abandonment by 20% and streamline the user flows to complete purchase in under 3 stages.",
      research: "Heuristic evaluation identified 12 key frictions. User surveys (150 respondents) revealed payment verification was the primary stress node.",
      flow: "Map the entry point directly to checkout, bypassing excessive detail screens.",
      result: "Constructed simplified wireframe diagrams eliminating 4 redundant confirmation steps.",
      metrics: "Reduced system drop-offs by 28% during the prototype phase testing."
    },
    {
      step: "02",
      title: "Research",
      icon: <Search className="w-5 h-5" />,
      subtitle: "Qualitative research, user personas, and competitor audits.",
      challenge: "Vague competitor data and unclear target demographics for a new AI tools platform.",
      goal: "Identify target personas and chart specific tool usage workflows.",
      research: "Conducted 10 structured interviews. Defined two core user personas: 'E-commerce Operator' (speed-oriented) and 'Corporate Buyer' (compliance-oriented).",
      flow: "Tailor custom workflows tailored to speed (one-click actions) and details (audit exports).",
      result: "Mapped user story boards showing exactly where AI prompt help is required.",
      metrics: "User interface clarity scored 9.2/10 during initial testing."
    },
    {
      step: "03",
      title: "Wireframe",
      icon: <Layers className="w-5 h-5" />,
      subtitle: "Structuring content hierarchy and LO-FI layout grids.",
      challenge: "Content overloading on the homepage dashboard. Critical stats were lost below the fold.",
      goal: "Reorganize architecture into a clean, metric-focused luxury dashboard.",
      research: "A/B card sorting with 8 users to determine what metrics drive business decisions.",
      flow: "Dashboard layout structured with critical KPIs at the top, detail lists folding below.",
      result: "Created 15 LO-FI layout frames in Figma mapping key responsive configurations.",
      metrics: "Average time-to-metric retrieval dropped from 18 seconds to 4.2 seconds."
    },
    {
      step: "04",
      title: "Prototype",
      icon: <PlayCircle className="w-5 h-5" />,
      subtitle: "High-fidelity interactive states and Figma Smart Animate flows.",
      challenge: "Users failing to understand the transition states of complex settings panels.",
      goal: "Construct a seamless micro-interactive settings drawer that morphs state on click.",
      research: "Observed users struggled to know if changes were saved automatically.",
      flow: "Add a floating status indicator that glows green ('Saved') or yellow ('Saving...').",
      result: "Implemented Figma Smart Animate prototype with complete custom component transitions.",
      metrics: "95% success rate for saving and updating configurations in testing."
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
      metrics: "Lighthouse mobile score increased from 78 to 96+."
    },
    {
      step: "06",
      title: "Launch",
      icon: <ShieldCheck className="w-5 h-5" />,
      subtitle: "System deployment, visual audits, and analytics monitoring.",
      challenge: "Post-launch user feedback reporting minor scaling issues on tablet portrait modes.",
      goal: "Achieve a pixel-perfect layout across all screens and desktop viewport ranges.",
      research: "Inspected Google Analytics screen resolution reports.",
      flow: "Adjust CSS media break points to wrap layouts at 768px and 1024px.",
      result: "Deployed production-ready patch ensuring seamless scaling on portrait and landscapes.",
      metrics: "Zero layout console errors reported; customer satisfaction scored 99.8%."
    }
  ];

  return (
    <section id="process" className="relative py-24 bg-[#FAFAF7] dark:bg-[#090A0E] text-[#111318] dark:text-white transition-colors duration-250">
      <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION 04: DESIGN PROCESS EXPERIENCE (Sections 34, 38, 39) */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#B8941F] dark:text-gold-light">Creative Roadmap</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#111318] dark:text-white">
            DESIGN <span className="text-[#B7791F] dark:text-[#D4AF37]">PROCESS</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mt-4 shadow-[0_0_8px_#D4A017]" />
          <p className="text-[#4B5563] dark:text-[#D1D5DB] mt-4 max-w-2xl text-base sm:text-lg leading-relaxed">
            Click on any phase below to expand the detailed UX case study files, architecture decisions, and verified metrics.
          </p>
        </div>

        {/* Horizontal journey timeline steps (Sections 35, 36, 37) */}
        <div className="w-full overflow-x-auto no-scrollbar pb-4 mb-10">
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

        {/* SECTION 05: CASE STUDY EXPERIENCE DETAIL */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-2xl border-[1.5px] border-[#D4AF37]/50 dark:border-[rgba(212,175,55,0.38)] bg-white dark:bg-[#0F1118] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] text-[#111318] dark:text-white relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
              
              <div className="mb-6 border-b border-black/5 dark:border-white/5 pb-4">
                <span className="text-xs font-mono text-[#B8941F] dark:text-gold-light block uppercase tracking-widest mb-1 font-bold">
                  PHASE_{steps[activeStep].step} // CASE_STUDY_METRICS
                </span>
                <h3 className="text-2xl font-black text-[#111318] dark:text-white uppercase tracking-wider">
                  {steps[activeStep].title} Stage Analysis
                </h3>
                <p className="text-sm text-[#4B5563] dark:text-[#D1D5DB] mt-2 font-medium">
                  {steps[activeStep].subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                {/* Challenge & Research */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-[#B8941F] dark:text-gray-400 tracking-wider mb-2 font-mono">// Core Challenge</h4>
                    <p className="text-xs text-[#374151] dark:text-gray-300 leading-relaxed bg-[#F4F1E8] dark:bg-white/[0.02] p-4 rounded-xl border border-black/5 dark:border-white/5">
                      {steps[activeStep].challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-[#B8941F] dark:text-gray-400 tracking-wider mb-2 font-mono">// UX Research & Personas</h4>
                    <p className="text-xs text-[#374151] dark:text-gray-300 leading-relaxed bg-[#F4F1E8] dark:bg-white/[0.02] p-4 rounded-xl border border-black/5 dark:border-white/5">
                      {steps[activeStep].research}
                    </p>
                  </div>
                </div>

                {/* Solution & Impact */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-[10px] uppercase font-bold text-[#B8941F] dark:text-gray-400 tracking-wider mb-2 font-mono">// Business Goal</h4>
                      <p className="text-xs text-[#374151] dark:text-gray-300 leading-relaxed bg-[#F4F1E8] dark:bg-white/[0.02] p-4 rounded-xl border border-black/5 dark:border-white/5">
                        {steps[activeStep].goal}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase font-bold text-[#B8941F] dark:text-gray-400 tracking-wider mb-2 font-mono">// Strategy & Flow</h4>
                      <p className="text-xs text-[#374151] dark:text-gray-300 leading-relaxed bg-[#F4F1E8] dark:bg-white/[0.02] p-4 rounded-xl border border-black/5 dark:border-white/5">
                        {steps[activeStep].flow}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-black/5 dark:border-white/5 pt-6">
                    <div className="col-span-2">
                      <h4 className="text-[10px] uppercase font-bold text-[#B8941F] dark:text-gray-400 tracking-wider mb-1 font-mono">// Visual Prototype Output</h4>
                      <p className="text-xs text-[#111318] dark:text-gray-200 font-bold">
                        {steps[activeStep].result}
                      </p>
                    </div>
                    <div className="text-right flex flex-col justify-center">
                      <span className="text-[9px] uppercase font-bold text-[#B8941F] dark:text-gold tracking-widest block mb-1 font-mono">Verified Impact</span>
                      <span className="text-sm font-black text-[#2563EB] dark:text-[#00F0FF]">{steps[activeStep].metrics}</span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
