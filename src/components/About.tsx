"use client";

import Image from "next/image";
import { 
  Phone, Mail, MapPin, Calendar, Download, Layers, Film, PenTool,
  Award, BookOpen, Cpu, Lightbulb, Target, Users, RefreshCw, Handshake
} from "lucide-react";

import { ProfileData } from "@/app/page";
import { useMagnetic, useTilt, useCountUp } from "@/hooks/useAnimations";
import { motion } from "framer-motion";

interface AboutProps {
  profile: ProfileData;
}

export default function About({ profile }: AboutProps) {
  const resumeBtn = useMagnetic<HTMLAnchorElement>();
  const portraitTilt = useTilt();

  const tools = [
    { name: "Photoshop", acronym: "Ps", color: "text-[#00f0ff] border-[#00f0ff]/30 bg-[#001d3d]/50" },
    { name: "Illustrator", acronym: "Ai", color: "text-[#ff9f1c] border-[#ff9f1c]/30 bg-[#2c1a04]/50" },
    { name: "After Effects", acronym: "Ae", color: "text-[#9d4edd] border-[#9d4edd]/30 bg-[#1d003d]/50" },
    { name: "Premiere Pro", acronym: "Pr", color: "text-[#ea00d9] border-[#ea00d9]/30 bg-[#210029]/50" },
    { name: "Figma", acronym: "Fi", color: "text-[#1ABC9C] border-[#1ABC9C]/30 bg-[#052c24]/50" },
    { name: "Canva", acronym: "Ca", color: "text-[#00c4cc] border-[#00c4cc]/30 bg-[#002729]/50" },
    { name: "Bootstrap", acronym: "Bs", color: "text-[#7952b3] border-[#7952b3]/30 bg-[#191026]/50" },
    { name: "WordPress", acronym: "Wp", color: "text-[#21759b] border-[#21759b]/30 bg-[#071921]/50" },
  ];

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

  const skills = ["HTML", "CSS", "JavaScript", "PHP", "React JS", "Bootstrap", "Tailwind CSS", "C/C++", "WordPress"];

  const achievements = [
    { rank: "Silver Medal", detail: "VTU MTech Academic Achievement" },
    { rank: "2nd Rank", detail: "Gogte Institute of Technology" },
    { rank: "500+ Rank", detail: "PGCET Academic Entrance Exam" },
    { rank: "780+ Rank", detail: "GCET Gujarat State Level Entrance" },
  ];

  const drives = [
    { title: "CREATIVITY", desc: "I turn ideas into creative solutions that make an impact.", icon: <Lightbulb className="w-5 h-5 text-gold" /> },
    { title: "FOCUS", desc: "I focus on details that matter and deliver quality work.", icon: <Target className="w-5 h-5 text-gold" /> },
    { title: "USER FIRST", desc: "I design with users in mind to create intuitive experiences.", icon: <Users className="w-5 h-5 text-gold" /> },
    { title: "STAY UPDATED", desc: "I keep learning new tools and trends to stay ahead.", icon: <RefreshCw className="w-5 h-5 text-gold" /> },
    { title: "COLLABORATION", desc: "I believe in strong communication and teamwork.", icon: <Handshake className="w-5 h-5 text-gold" /> },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#f8fafc] dark:bg-[#050814] border-t border-black/5 dark:border-white/5 text-[#0a1128] dark:text-white transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute top-[30%] right-[5%] w-[350px] h-[350px] rounded-full bg-[#FF6B00]/5 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-[#00F0FF]/5 blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Get to know me</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-[#0a1128] dark:text-white">
            ABOUT <span className="text-gradient-orange">ME</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#FF6B00] mt-4 shadow-[0_0_8px_#FF6B00]" />
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl text-sm sm:text-base">
            Crafting Digital Experiences That Inspire
          </p>
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
              className="p-6 rounded-lg glass-card shadow-2xl relative group overflow-hidden transition-transform duration-300 ease-out"
            >
              {/* Gold border decorative line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-transparent" />
              
              {/* Portrait Image */}
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden border border-white/10 mb-6 bg-[#050505]">
                {/* Gold Circle halo background */}
                <div className="absolute inset-8 rounded-full border border-gold/40 shadow-[0_0_30px_rgba(212,160,23,0.3)] pointer-events-none z-0 animate-spin-slow" />
                <Image
                  src="/images/profile/pic.png"
                  alt="Prashant Portrait About"
                  fill
                  className="object-cover object-top relative z-10 brightness-[1.05] contrast-[1.05]"
                />
                
                {/* Handwritten Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
                  <span className="font-signature text-3xl text-gold-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none">
                    {profile.name}
                  </span>
                </div>
              </div>

              {/* Basic Contact Info */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#0d0d0d] border border-white/10 flex items-center justify-center text-gold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Phone</span>
                    <a href={`tel:${profile.phone}`} className="font-medium text-gray-300 hover:text-gold transition-colors duration-200">{profile.phone}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#0d0d0d] border border-white/10 flex items-center justify-center text-gold">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Email</span>
                    <a href={`mailto:${profile.email}`} className="font-medium text-gray-300 hover:text-gold transition-colors duration-200">{profile.email}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#0d0d0d] border border-white/10 flex items-center justify-center text-gold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Location</span>
                    <span className="font-medium text-gray-300">{profile.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#0d0d0d] border border-white/10 flex items-center justify-center text-gold">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Date of Birth</span>
                    <span className="font-medium text-gray-300">{profile.dob}</span>
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
            
            {/* Center: Biography Narrative */}
            <div className="p-8 rounded-lg glass-card border border-white/5 relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-light to-transparent" />
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light mb-4">Biography</h3>
              <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong className="text-white font-bold">{profile.name}</strong> is a passionate designer and creative professional with expertise in UI/UX Design, Web Design, Graphics Design, and Video Editing.
                </p>
                <p>
                  Combining raw artistic creativity with a strong technical understanding of mechanical frameworks and coding languages, he builds engaging digital solutions. He crafts elegant, premium visual interfaces that prioritize the user journey and reinforce high-end branding directives.
                </p>
              </div>

              {/* Resume download button */}
              <div className="pt-6">
                <a
                  ref={resumeBtn.ref}
                  onMouseMove={resumeBtn.handleMouseMove}
                  onMouseLeave={resumeBtn.handleMouseLeave}
                  style={resumeBtn.style}
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-md border border-gold/40 hover:border-gold hover:text-white transition-all duration-300 text-gold-light bg-gold/5 font-bold uppercase tracking-wider text-xs cursor-pointer shadow-[0_0_10px_rgba(212,160,23,0.05)] hover:shadow-[0_0_20px_rgba(212,160,23,0.3)] inline-block"
                >
                  <Download className="w-4 h-4" />
                  <span>Download My Resume</span>
                </a>
              </div>
            </div>

            {/* Right Side Part 1: My Expertise cards */}
            <div className="p-8 rounded-lg glass-card border border-white/5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 mb-6">My Expertise</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* UI/UX Expert */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 text-neon-blue">
                    <Layers className="w-4.5 h-4.5" />
                    <span className="font-bold text-xs uppercase tracking-wider text-white">UI/UX DESIGNER</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Designing user centered interfaces and seamless experiences that solve real problems.
                  </p>
                </div>

                {/* Video Expert */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 text-neon-violet">
                    <Film className="w-4.5 h-4.5" />
                    <span className="font-bold text-xs uppercase tracking-wider text-white">VIDEO EDITOR</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Editing cinematic videos that tell stories, engage audiences and leave a lasting impact.
                  </p>
                </div>

                {/* Graphics Expert */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 text-gold">
                    <PenTool className="w-4.5 h-4.5" />
                    <span className="font-bold text-xs uppercase tracking-wider text-white">GRAPHICS DESIGNER</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Creating visual identities, branding assets and designs that make brands stand out.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side Part 2: Tools I Use */}
            <div className="p-8 rounded-lg glass-card border border-white/5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 mb-6">Tools I Use</h3>
              <div className="flex flex-wrap gap-3">
                {tools.map((t, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`px-4 py-2 border rounded-md font-bold text-xs flex items-center space-x-2 shadow-sm transition-all duration-300 hover:scale-105 ${t.color}`}
                  >
                    <span>{t.acronym}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{t.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

        {/* Section: What Drives Me banner */}
        <div className="mb-20">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-center text-gray-500 mb-8">What Drives Me</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {drives.map((d, idx) => (
              <div key={idx} className="p-5 rounded-lg glass-card border border-white/5 hover:border-gold/30 flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(212,160,23,0.05)]">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shadow-inner">
                  {d.icon}
                </div>
                <h4 className="font-extrabold text-xs tracking-wider text-white">{d.title}</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Timeline Section (Education, Skills, Achievements) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 pt-12 border-t border-white/5">
          
          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-md bg-gold/15 border border-gold/20 flex items-center justify-center text-gold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-wider text-[#0a1128] dark:text-white">Education & Timeline</h3>
            </div>
            
            <div className="relative border-l border-white/10 pl-6 ml-5 space-y-8">
              {education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Bullet */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border border-gold bg-[#050505] group-hover:bg-gold transition-colors duration-300 shadow-[0_0_8px_#D4A017]" />
                  
                  <div className="p-5 rounded-lg glass-card border border-white/5 group-hover:border-gold/30 transition-all duration-300">
                    <span className="text-[10px] font-bold text-gold-light uppercase tracking-wider block mb-1">{edu.period}</span>
                    <h4 className="font-extrabold text-sm text-white leading-snug group-hover:text-gold transition-colors duration-300">{edu.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{edu.institution}</p>
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
                <div className="w-10 h-10 rounded-md bg-gold/15 border border-gold/20 flex items-center justify-center text-gold">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-wider text-[#0a1128] dark:text-white">Key Achievements</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((a, idx) => (
                  <AchievementCounter key={idx} rank={a.rank} detail={a.detail} />
                ))}
              </div>
            </div>

            {/* Technical Programming Skills */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-md bg-gold/15 border border-gold/20 flex items-center justify-center text-gold">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-wider text-[#0a1128] dark:text-white">Programming Skills</h3>
              </div>

              <div className="p-6 rounded-lg glass-card border border-white/5">
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill, idx) => (
                    <motion.span 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-300 hover:border-gold hover:text-white hover:bg-gold/10 transition-all duration-300 cursor-default"
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

// Sub-component for key achievements number animations
function AchievementCounter({ rank, detail }: { rank: string; detail: string }) {
  const matches = rank.match(/\d+/);
  const num = matches ? parseInt(matches[0]) : null;
  const prefix = num ? rank.split(String(num))[0] : "";
  const suffix = num ? rank.split(String(num))[1] : rank;
  
  const { count, elementRef } = useCountUp(num || 0, 1500);

  return (
    <div ref={elementRef} className="p-6 rounded-lg glass-card hover:border-gold/25 transition-all duration-300 flex flex-col justify-between group">
      <span className="text-xs font-black uppercase text-gold-light tracking-widest">
        {num !== null ? `${prefix}${count}${suffix}` : rank}
      </span>
      <p className="text-xs text-gray-400 mt-2 leading-relaxed">{detail}</p>
      <div className="w-6 h-[1px] bg-white/20 mt-4 group-hover:w-12 group-hover:bg-gold transition-all duration-300" />
    </div>
  );
}
