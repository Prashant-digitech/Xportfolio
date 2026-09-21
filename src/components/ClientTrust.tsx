"use client";

import { motion } from "framer-motion";
import { 
  Users, CheckCircle2, Star, Clock, Trophy, Heart, Activity
} from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export default function ClientTrust() {
  const testimonials: Testimonial[] = [
    { 
      quote: "Prashant Sir is the most patient, enthusiastic, and knowledgeable mentor at Ducat Vikaspuri. His hands-on training on Figma, design systems, and real-world UI workflows gave me the exact confidence and portfolio needed to land my first product designer job.", 
      author: "Aman Sharma", 
      role: "UI/UX Designer", 
      company: "Ducat Vikaspuri Alumni" 
    },
    { 
      quote: "Learning graphic design and typography under Prashant Sir at Vikaspuri Ducat was a career-defining experience. Complex tools like Photoshop, Illustrator, and visual manipulation felt effortless with his practical, step-by-step coaching.", 
      author: "Pooja Verma", 
      role: "Graphic & Brand Designer", 
      company: "Ducat Vikaspuri Alumni" 
    },
    { 
      quote: "Prashant Sir's teaching style is unmatched! He makes even the most difficult UX heuristics, wireframing rules, and responsive design systems feel simple with his humor and live industry examples. Hands-down the best mentor you could ask for.", 
      author: "Rahul Mehra", 
      role: "UI/UX & Frontend Trainee", 
      company: "Ducat Vikaspuri Alumni" 
    },
    { 
      quote: "From day one at Ducat Vikaspuri, Prashant Sir pushed us to think like senior design leaders. His portfolio reviews, strict attention to typography, and color harmony helped me craft a standout portfolio that impressed every recruiter.", 
      author: "Neha Choudhary", 
      role: "Digital Product Designer", 
      company: "Ducat Vikaspuri Alumni" 
    },
    { 
      quote: "Prashant Sir's mentorship at Ducat Vikaspuri gave me complete mastery over color theory, corporate branding, and video motion compositing. His dedication to each student's career growth is truly exceptional.", 
      author: "Vikas Gupta", 
      role: "Motion & Graphic Artist", 
      company: "Ducat Vikaspuri Alumni" 
    },
    { 
      quote: "The best faculty for UI/UX and Graphic Design in Delhi! Prashant Sir clarifies every doubt with immense patience. His practical assignments replicate real agency design briefs.", 
      author: "Deepak Rawat", 
      role: "Visual UX Trainee", 
      company: "Ducat Vikaspuri Alumni" 
    }
  ];

  const metrics = [
    { title: "Students Mentored", value: "500+", label: "Ducat & design cohorts", icon: <Users className="w-5 h-5 text-gold" /> },
    { title: "Student Rating", value: "4.9/5", label: "Ducat Vikaspuri reviews", icon: <Heart className="w-5 h-5 text-neon-violet" /> },
    { title: "Course Curriculum", value: "Industry UX", label: "Figma, Adobe CC, Next.js", icon: <Activity className="w-5 h-5 text-gold" /> },
    { title: "Placement Rate", value: "95%+", label: "Portfolio-ready careers", icon: <Trophy className="w-5 h-5 text-neon-blue" /> },
    { title: "Practical Focus", value: "100%", label: "Live hands-on assignments", icon: <CheckCircle2 className="w-5 h-5 text-green-400" /> }
  ];

  return (
    <section className="relative py-24 bg-[#f8f8f8] dark:bg-[#050505] text-black dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* CSS keyframe injection for marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION 13: TESTIMONIAL WALL */}
        <div className="mb-24">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold-light">Ducat Vikaspuri & Student Feedback</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-white">
              TESTIMONIAL <span className="text-gradient-gold">WALL</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mt-4 shadow-[0_0_8px_#D4A017]" />
            <p className="text-gray-400 mt-4 max-w-xl text-sm leading-relaxed">
              Verified reviews and feedback from design students and professionals mentored by Prashant Sir at Ducat Vikaspuri. Hover to pause.
            </p>
          </div>

          {/* Marquee Wrapper */}
          <div className="relative w-full flex overflow-hidden border-t border-b border-white/5 py-8 bg-[#090909]/20">
            {/* Gradient shadow caps on left/right edges */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#f8f8f8] dark:from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#f8f8f8] dark:from-[#050505] to-transparent z-10 pointer-events-none" />

            {/* Scrolling container */}
            <div className="flex space-x-6 shrink-0 animate-marquee whitespace-nowrap">
              {/* Duplicate twice to ensure seamless looping */}
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div 
                  key={idx}
                  className="w-[300px] sm:w-[380px] p-6 rounded-lg glass-card border border-white/5 bg-black/40 shadow-md inline-block whitespace-normal select-none"
                >
                  {/* Stars */}
                  <div className="flex space-x-1 text-gold mb-4">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-300 leading-relaxed mb-4 italic">
                    "{t.quote}"
                  </p>

                  <div className="border-t border-white/5 pt-3.5 flex justify-between items-center text-[10px] text-gray-400 font-mono">
                    <span className="font-bold text-white uppercase tracking-wider">{t.author}</span>
                    <span>{t.role}, {t.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 14: CLIENT TRUST SECTION (Metrics Dashboard) */}
        <div>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold-light">Trust Operations Control</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-white">
              CLIENT TRUST <span className="text-gradient-gold">METRICS</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mt-4 shadow-[0_0_8px_#D4A017]" />
            <p className="text-gray-400 mt-4 max-w-xl text-sm leading-relaxed">
              Real-time operational dashboard monitoring quality metrics, project velocities, and system response targets.
            </p>
          </div>

          {/* Luxury dashboard grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {metrics.map((m, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-lg glass-card border border-white/5 bg-black/15 flex flex-col justify-between hover:border-gold/30 hover:shadow-[0_0_15px_rgba(212,160,23,0.08)] transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] uppercase font-mono font-bold text-gray-500 tracking-wider">// KPI_{idx + 1}</span>
                  <div className="p-1.5 rounded bg-white/[0.03] border border-white/5 group-hover:text-gold transition-colors">{m.icon}</div>
                </div>

                <div className="my-3">
                  <h3 className="text-2xl font-black text-white">{m.value}</h3>
                  <span className="text-[10px] font-bold text-gold-light uppercase tracking-wider block mt-1">{m.title}</span>
                </div>

                <div className="border-t border-white/5 pt-3 text-[9px] text-gray-400 leading-normal font-mono">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
