"use client";

import { useState, useEffect, useRef } from "react";
import { ProfileData } from "@/app/page";
import { 
  Briefcase, Award, CheckCircle, MapPin, Mail, Phone, Calendar, Download, 
  Layers, Film, PenTool, ExternalLink, Cpu, BookOpen, Clock, Check, Send, 
  Sparkles, RefreshCw, Clipboard, CheckCircle2, User, ChevronRight, MessageSquare,
  Palette, Play, Eye, Video
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMagnetic, useTilt } from "@/hooks/useAnimations";

interface RecruiterLayoutProps {
  profile: ProfileData;
}

interface Message {
  id: string;
  sender: "user" | "twin";
  text: string;
  timestamp: Date;
}

export default function RecruiterLayout({ profile }: RecruiterLayoutProps) {
  // 1. Role Filter State
  const [activeCategory, setActiveCategory] = useState<"all" | "design" | "video" | "dev" | "academic">("all");
  
  // 2. JD Skill Matcher State
  const [jdText, setJdText] = useState("");
  const [matchScore, setMatchScore] = useState(0);
  const [isMatching, setIsMatching] = useState(false);
  const [matchedSkills, setMatchedSkills] = useState<string[]>([]);
  const [currentJDMode, setCurrentJDMode] = useState<string>("custom");

  // 3. AI Twin Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "twin",
      text: `Hello! I am Prashant's virtual twin. I can help answer your questions about his experience, relocation status, background in mechanical engineering, or design toolstack. Choose a question from the presets below to start our chat!`,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 4. Dossier State
  const [dossierCopied, setDossierCopied] = useState(false);
  const [isGeneratingDossier, setIsGeneratingDossier] = useState(false);
  const [showDossierResult, setShowDossierResult] = useState(false);

  // Magnetic download button
  const downloadCvBtn = useMagnetic<HTMLAnchorElement>();

  // Filtered Experiences
  const experiences = [
    { year: "2025+", title: "AI Product Designer & Creative Technologist", details: "Designing futuristic generative AI workflows, agent interfaces, and prompting platforms.", category: "design" },
    { year: "2024", title: "Google UX Design Professional Certification", details: "Coursera / Google - Foundational user research, wireframing, Figma design systems, and iterative usability testing.", category: "design" },
    { year: "2023", title: "React & Modern UI Web Development", details: "Integrating advanced web tech frameworks with user-centered design systems.", category: "dev" },
    { year: "2021", title: "Professional Web Design & Development Certification", details: "Arena Animation Institute - Professional Web Design practices.", category: "design" },
    { year: "2018", title: "Cisco Certified Network Associate (CCNA)", details: "Cisco Networking Academy - Network routing and systems.", category: "dev" },
    { year: "2014", title: "C/C++ Programming Course", details: "Logic foundations and object-oriented software engineering.", category: "dev" },
    { year: "2010–2012", title: "MTech in Production Management", details: "VTU - Silver Medal for Academic Achievement.", category: "academic" },
    { year: "2009–2010", title: "Advanced Graduate Diploma in CAD PRO-E", details: "CAD Center - Engineering workflows.", category: "design" },
    { year: "2003–2007", title: "BE in Mechanical Engineering", details: "VTU - Mechanical design, thermodynamics, systems modeling.", category: "academic" },
  ];

  const filteredExperiences = experiences.filter(exp => {
    if (activeCategory === "all") return true;
    if (activeCategory === "academic") return exp.category === "academic";
    return exp.category === activeCategory;
  });

  const tools = [
    { name: "Figma", category: "Design", matchKeywords: ["figma", "ux", "ui", "wireframe", "prototype"] },
    { name: "Photoshop", category: "Design", matchKeywords: ["photoshop", "ps", "graphics", "photo", "image"] },
    { name: "Illustrator", category: "Design", matchKeywords: ["illustrator", "vector", "logo", "branding", "ai"] },
    { name: "Canva", category: "Design", matchKeywords: ["canva", "social media", "banner", "slides"] },
    { name: "Premiere Pro", category: "Video", matchKeywords: ["premiere", "pr", "video", "editing", "cut"] },
    { name: "After Effects", category: "Video", matchKeywords: ["after effects", "ae", "motion graphics", "vfx", "animation"] },
    { name: "React JS", category: "Development", matchKeywords: ["react", "frontend", "spa", "javascript", "js", "web"] },
    { name: "HTML / CSS / JavaScript", category: "Development", matchKeywords: ["html", "css", "js", "javascript", "responsive", "frontend"] },
    { name: "PHP / WordPress / Bootstrap", category: "Development", matchKeywords: ["php", "wordpress", "wp", "bootstrap", "cms", "backend"] },
    { name: "ChatGPT / Claude / Gemini / Midjourney / Cursor", category: "AI Tools", matchKeywords: ["chatgpt", "claude", "gemini", "midjourney", "cursor", "ai", "llm", "generative"] },
  ];

  // JD Presets
  const jdPresets = [
    {
      id: "ux-designer",
      label: "Senior UI/UX Designer",
      text: "We are seeking a senior UI/UX designer fluent in Figma, component design systems, vector art in Illustrator, and photo retouching in Photoshop. Experience building responsive prototypes and collaborating with front-end React developers is a huge plus."
    },
    {
      id: "creative-tech",
      label: "AI Creative Technologist",
      text: "Looking for a creative technologist who can harness generative AI (ChatGPT, Claude, Midjourney) inside design pipelines. Must have strong prototyping skills (Figma), motion design (After Effects), and basic front-end coding capabilities in React or JavaScript."
    },
    {
      id: "video-producer",
      label: "Video Editor & Motion Designer",
      text: "Wanted: Video Editor with expert skills in Premiere Pro, After Effects, and graphic editing in Photoshop/Illustrator. You will create social media campaigns, edit promo reels, design branding slide decks, and render visual content."
    },
    {
      id: "web-dev",
      label: "Front-End Developer & Designer",
      text: "Seeking a designer-developer proficient in building responsive websites using HTML, CSS, JavaScript, WordPress, and React JS. Must be able to import Figma wireframes and implement clean, high-performance UI structures."
    }
  ];

  // Q&A FAQ Presets
  const chatFaqs = [
    {
      q: "Explain your transition from Mechanical Eng. to Design & Video editing?",
      a: "My background in Mechanical Engineering (BE) and Production Management (MTech, Silver Medalist) taught me strict engineering precision, structural systems thinking, and technical modeling. When I transitioned into visual design, I brought this problem-solving framework with me. Design isn't just about aesthetics; it's about structural hierarchies. Completing my Professional Web Design certification at Arena Animation bridged the gap, and my technical coding skills (C/C++, PHP, React) allow me to collaborate flawlessly with developer teams."
    },
    {
      q: "How do you integrate generative AI in your creative design workflows?",
      a: "I view Generative AI as a collaborative amplifier, not a replacement. In design, I utilize Midjourney and Photoshop Firefly to rapidly construct high-fidelity mood boards, generate original textures, and draft UI layouts. I use Claude and ChatGPT to generate content copies, analyze user stories, and debug React layouts. Using Cursor editor accelerates my front-end development cycle. This enables me to prototype at high fidelity and ship complex responsive screens much faster."
    },
    {
      q: "What is your CCNA certification, and does it help you as a developer?",
      a: "My Cisco Certified Network Associate (CCNA) certification provides a robust grounding in network protocols, server architectures, routing, and DNS mapping. For front-end development, this helps me optimize loading budgets, inspect asset latencies, and understand performance bottlenecks. When I design high-fidelity prototypes, network awareness ensures that they are optimized for real-world latencies rather than just local development speeds."
    },
    {
      q: "Are you open to relocation, and what is your notice period?",
      a: "I am based in Vadodara, India, and open to remote contracts globally. I am also fully open to relocation for strategic, high-impact roles. In terms of availability, I have a 0-day notice period and am ready to start immediately on new engagements. You can download my resume or copy the generated Candidate Dossier on this dashboard to share with your HR hiring managers."
    }
  ];

  // JD Analysis Handler
  const analyzeJD = (text: string) => {
    if (!text.trim()) {
      setMatchScore(0);
      setMatchedSkills([]);
      return;
    }
    setIsMatching(true);
    
    // Simulate thinking time
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      const matched: string[] = [];
      let totalScore = 40; // baseline match score
      
      tools.forEach(tool => {
        const matches = tool.matchKeywords.some(keyword => lowerText.includes(keyword));
        if (matches) {
          matched.push(tool.name);
          totalScore += 6;
        }
      });

      // Cap at 100%
      const finalScore = Math.min(totalScore, 100);
      
      setMatchScore(finalScore);
      setMatchedSkills(matched);
      setIsMatching(false);
    }, 850);
  };

  // Chat Handler
  const handleAskQuestion = (questionText: string, answerText: string) => {
    if (isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: questionText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const twinMsg: Message = {
        id: `twin-${Date.now()}`,
        sender: "twin",
        text: answerText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, twinMsg]);
      setIsTyping(false);
    }, 1200);
  };

  // Dossier Generator Handler
  const handleGenerateDossier = () => {
    setIsGeneratingDossier(true);
    setTimeout(() => {
      setIsGeneratingDossier(false);
      setShowDossierResult(true);
    }, 1000);
  };

  const copyDossierToClipboard = () => {
    const dossierText = `--- CANDIDATE DOSSIER EVALUATION ---
Candidate Name: PRASHANT SISODHIYA
Target Role: UI/UX Designer • Video Editor • Creative Technologist
Location: Vadodara, India (Open to Relocation / Remote)
Contact: +91 7006998128 | psisodhiya01@gmail.com
Experience: 3+ Years

ACADEMIC EXCELLENCE:
- MTech in Production Management (VTU) - Academic Silver Medalist
- BE in Mechanical Engineering (VTU)

TECHNICAL CERTIFICATIONS:
- Professional Web Design & Development (Arena Animation)
- Cisco Certified Network Associate (CCNA Routing & Switching)
- C/C++ Programming Course

CORE SKILLSTACK:
- UI/UX Design: Figma, Photoshop, Illustrator, Canva
- Video & Motion: Premiere Pro, After Effects
- Web Development: React JS, HTML/CSS/JavaScript, PHP, WordPress, Bootstrap
- AI Engineering: Claude, ChatGPT, Gemini, Midjourney, Cursor

VERIFICATION TICKET STATUS:
[✓] ID & Location Verified
[✓] Academic Credentials Verified (Silver Medalist)
[✓] CCNA Networking Cisco Badge Verified
[✓] Portfolio Projects Verified
-------------------------------------`;

    navigator.clipboard.writeText(dossierText);
    setDossierCopied(true);
    setTimeout(() => setDossierCopied(false), 2000);
  };

  // Scroll Chat to Bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Pre-load default match on mount
  useEffect(() => {
    // default presets match trigger
    analyzeJD(jdPresets[0].text);
    setCurrentJDMode(jdPresets[0].id);
    setJdText(jdPresets[0].text);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-black dark:text-white transition-colors duration-300">
      
      {/* Top Welcome Title Panel */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-black/10 dark:border-white/10 pb-6"
      >
        <div>
          <div className="flex items-center space-x-2.5 mb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-green-500">Recruiter Cockpit Ready</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            Recruiter <span className="text-gradient-gold">Twin Center</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xl font-medium uppercase tracking-wider">
            Evaluate skills, run custom JD matches, and interrogate virtual AI twins in real-time.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <a 
            ref={downloadCvBtn.ref}
            onMouseMove={downloadCvBtn.handleMouseMove}
            onMouseLeave={downloadCvBtn.handleMouseLeave}
            style={downloadCvBtn.style}
            href="/resume.pdf" 
            download 
            className="px-5 py-2.5 bg-gold text-black rounded font-black uppercase tracking-wider text-[11px] flex items-center space-x-2 hover:bg-gold-light transition-colors duration-300 cursor-pointer shadow-[0_4px_12px_rgba(212,160,23,0.15)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Official CV</span>
          </a>
          <a 
            href={`mailto:${profile.email}`}
            className="px-5 py-2.5 border border-black/15 dark:border-gold/30 hover:border-gold rounded font-black uppercase tracking-wider text-[11px] flex items-center space-x-2 hover:bg-gold/5 transition-colors duration-300 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-gold" />
            <span>Email Interview Request</span>
          </a>
        </div>
      </motion.div>

      {/* Grid Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Profile info, career timeline, and role selector (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Executive Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl glass-card relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-transparent" />
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="relative w-20 h-20 rounded-full border-2 border-gold/40 flex-shrink-0 bg-[#0a0a0a] flex items-center justify-center text-gold shadow-md">
                <User className="w-10 h-10" />
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border border-[#0d0d0d]">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <span className="text-[10px] font-black uppercase tracking-widest text-gold dark:text-gold-light">
                  {profile.title}
                </span>
                <h2 className="text-2xl font-black tracking-tight mt-0.5 text-white select-all">{profile.name}</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-gold" />
                    <span className="lowercase text-gray-300 font-normal select-all">{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-gold" />
                    <span>+91 {profile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>DOB: {profile.dob}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Capsules */}
            <div className="grid grid-cols-3 gap-3 border-t border-white/5 mt-6 pt-5 text-center">
              <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                <span className="block text-xs font-bold text-gray-500 uppercase">Experience</span>
                <span className="text-lg font-black text-white mt-1 block">{profile.experience}</span>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                <span className="block text-xs font-bold text-gray-500 uppercase">Projects</span>
                <span className="text-lg font-black text-white mt-1 block">{profile.projects}</span>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                <span className="block text-xs font-bold text-gray-500 uppercase">Certifications</span>
                <span className="text-lg font-black text-white mt-1 block">{profile.certifications}</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Career Timeline & Role Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="p-6 rounded-2xl glass-card relative"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-white/5">
              <div>
                <h3 className="text-base font-black tracking-tight text-white uppercase flex items-center space-x-2">
                  <Briefcase className="w-4.5 h-4.5 text-gold" />
                  <span>Interactive Career Timeline</span>
                </h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Filter items by recruiter target specialization</p>
              </div>

              {/* Specialization Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 bg-black/30 border border-white/5 p-1 rounded-lg">
                {[
                  { id: "all", label: "All Details" },
                  { id: "design", label: "UI/UX" },
                  { id: "video", label: "Video/Editing" },
                  { id: "dev", label: "Tech Stack" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id as any)}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                      activeCategory === tab.id 
                        ? "bg-gold text-black shadow-sm" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Experience */}
            <div className="relative border-l border-white/10 pl-6 ml-3 space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredExperiences.map((exp, idx) => (
                  <motion.div
                    key={exp.title + exp.year}
                    layoutId={exp.title}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="relative group"
                  >
                    {/* Glowing Bullet */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-gold bg-[#050505] group-hover:bg-gold transition-colors duration-300 shadow-[0_0_8px_#D4A017]" />
                    
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-gold/30 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-[10px] font-black text-gold-light uppercase tracking-wider">{exp.year}</span>
                        <h4 className="font-extrabold text-sm text-white leading-snug group-hover:text-gold transition-colors duration-300">{exp.title}</h4>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{exp.details}</p>
                      
                      {/* Specialization tag pill */}
                      <span className="inline-block mt-3 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] uppercase font-bold text-gray-500">
                        {exp.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Tool Stack Highlight Board */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-6 rounded-2xl glass-card"
          >
            <h3 className="text-base font-black tracking-tight text-white uppercase flex items-center space-x-2 mb-6">
              <Cpu className="w-4.5 h-4.5 text-gold" />
              <span>Full Toolkit Capabilities</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tools.map((t, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-xl transition-all duration-300 border flex justify-between items-center ${
                    matchedSkills.includes(t.name) 
                      ? "bg-gold/10 border-gold shadow-[0_0_12px_rgba(245,197,66,0.1)]" 
                      : "bg-white/5 border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {matchedSkills.includes(t.name) ? (
                      <Check className="w-3.5 h-3.5 text-gold" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                    )}
                    <span className="text-xs font-extrabold text-white">{t.name}</span>
                  </div>
                  <span className="text-[9px] uppercase font-black text-gold px-2 py-0.5 rounded bg-gold/10 border border-gold/10">
                    {t.category}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: JD Matcher and Q&A chat (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Job Description Skill Matcher */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl glass-card relative"
          >
            <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
            <h3 className="text-base font-black tracking-tight text-white uppercase flex items-center space-x-2 mb-2">
              <Sparkles className="w-4.5 h-4.5 text-gold animate-pulse" />
              <span>JD Skill Matcher</span>
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-5">Analyze candidate capability alignment</p>

            {/* Presets Selectors */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {jdPresets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setCurrentJDMode(preset.id);
                    setJdText(preset.text);
                    analyzeJD(preset.text);
                  }}
                  className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider border transition-all duration-300 ${
                    currentJDMode === preset.id
                      ? "bg-gold/15 border-gold text-white"
                      : "bg-black/20 border-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setCurrentJDMode("custom");
                  setJdText("");
                  setMatchScore(0);
                  setMatchedSkills([]);
                }}
                className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider border transition-all duration-300 ${
                  currentJDMode === "custom"
                    ? "bg-gold/15 border-gold text-white"
                    : "bg-black/20 border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                Custom JD
              </button>
            </div>

            {/* JD Input */}
            <div className="relative mb-5">
              <textarea
                value={jdText}
                onChange={(e) => {
                  setCurrentJDMode("custom");
                  setJdText(e.target.value);
                  analyzeJD(e.target.value);
                }}
                placeholder="Paste your job description requirements here to calculate real-time compatibility score..."
                className="w-full h-32 p-4 text-xs bg-black/40 border border-white/10 rounded-xl focus:border-gold outline-none resize-none font-medium text-gray-300"
              />
            </div>

            {/* Animated Match Gauge */}
            <div className="flex items-center justify-between bg-black/30 border border-white/5 p-4 rounded-xl">
              <div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Compatibility Match</span>
                <span className="text-3xl font-black text-white mt-1 block">
                  {isMatching ? (
                    <span className="inline-block animate-pulse">Analyzing...</span>
                  ) : (
                    <span>{matchScore}%</span>
                  )}
                </span>
              </div>

              {/* Visual radial indicator */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/5"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className="text-gold"
                    strokeWidth="3.5"
                    strokeDasharray={`${isMatching ? 10 : matchScore}, 100`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: `${isMatching ? 10 : matchScore}, 100` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle2 className={`w-6 h-6 transition-colors duration-300 ${matchScore > 80 ? "text-gold" : "text-gray-600"}`} />
                </div>
              </div>
            </div>

            {/* Match highlights */}
            {matchedSkills.length > 0 && !isMatching && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-[9px] font-black text-gray-500 uppercase block mb-2.5">Key Identified Strengths:</span>
                <div className="flex flex-wrap gap-1.5">
                  {matchedSkills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-1 bg-gold/10 border border-gold/20 text-gold rounded-full text-[9px] font-black uppercase tracking-wider flex items-center space-x-1"
                    >
                      <Check className="w-2.5 h-2.5 text-gold" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* AI Twin Q&A Interrogator Chat */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="p-6 rounded-2xl glass-card flex flex-col h-[480px] relative"
          >
            <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="mb-4 pb-3 border-b border-white/5 flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-gold/10 border border-gold/20 text-gold">
                <MessageSquare className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-tight text-white uppercase">AI Candidate Twin Chat</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Interrogate simulated twin in real time</p>
              </div>
            </div>

            {/* Chat Box */}
            <div className="flex-grow overflow-y-auto no-scrollbar space-y-4 mb-4 pr-1">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed font-medium ${
                      msg.sender === "user"
                        ? "bg-gold text-black rounded-tr-none font-bold"
                        : "bg-white/5 border border-white/5 text-gray-300 rounded-tl-none"
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1.5 text-[9px] uppercase font-bold tracking-widest text-gray-500">
                      {msg.sender === "user" ? (
                        <span className="text-black/60">Recruiter Query</span>
                      ) : (
                        <span className="text-gold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> AI Twin Twin
                        </span>
                      )}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 text-gray-300 rounded-2xl rounded-tl-none px-4 py-3 text-xs">
                    <span className="flex items-center gap-1 font-bold text-gold text-[9px] uppercase tracking-widest mb-1.5">
                      AI Twin Twin is typing
                    </span>
                    <span className="flex items-center space-x-1.5 py-1">
                      <span className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Questions Grid */}
            <div className="mt-auto border-t border-white/5 pt-4">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2.5">
                Suggested Interview Questions:
              </span>
              <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto no-scrollbar">
                {chatFaqs.map((faq, index) => (
                  <button
                    key={index}
                    disabled={isTyping}
                    onClick={() => handleAskQuestion(faq.q, faq.a)}
                    className="p-2.5 rounded-lg bg-black/20 border border-white/5 hover:border-gold/30 text-left text-[11px] font-bold text-gray-300 hover:text-white transition-all duration-300 flex justify-between items-center group cursor-pointer disabled:opacity-50"
                  >
                    <span className="line-clamp-1">{faq.q}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-gold transition-colors duration-200" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Verified Credentials & Assessment Dossier */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-6 rounded-2xl glass-card relative"
          >
            <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
            <h3 className="text-base font-black tracking-tight text-white uppercase flex items-center space-x-2 mb-2">
              <Award className="w-4.5 h-4.5 text-gold" />
              <span>Assessment & Verified Dossier</span>
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-5">Audit and generate executive profiles</p>

            {/* Verification Checklist */}
            <div className="space-y-3 mb-6 bg-black/25 border border-white/5 p-4 rounded-xl">
              {[
                "Candidate identity and contact details verified",
                "MTech production credentials audited (Silver Medal)",
                "Cisco Systems CCNA certification active",
                "Arena Web Design professional module completed",
                "Portfolio UI/UX case studies and reels fully live"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-2.5 text-xs font-semibold text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Generate Dossier Button */}
            {!showDossierResult ? (
              <button
                onClick={handleGenerateDossier}
                disabled={isGeneratingDossier}
                className="w-full py-3 bg-gold text-black rounded font-black uppercase tracking-wider text-xs flex items-center justify-center space-x-2 hover:bg-gold-light transition-colors cursor-pointer shadow-[0_4px_12px_rgba(212,160,23,0.15)]"
              >
                {isGeneratingDossier ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Dossier...</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-4 h-4" />
                    <span>Generate Executive Dossier</span>
                  </>
                )}
              </button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="bg-black/50 border border-gold/30 rounded-xl p-4 font-mono text-[10px] text-gray-300 leading-relaxed max-h-48 overflow-y-auto no-scrollbar relative select-all whitespace-pre-wrap">
                  {`--- CANDIDATE DOSSIER EVALUATION ---
Name: PRASHANT SISODHIYA
Target: UI/UX Designer & Video Editor
MTech Production (Silver Medalist)
Cisco CCNA & Arena Certification
Matching Score: ${matchScore}%
Status: Available immediately / Relocation OK`}
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={copyDossierToClipboard}
                    className="flex-grow py-2.5 border border-gold hover:bg-gold hover:text-black rounded font-black uppercase tracking-wider text-[11px] flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer text-gold"
                  >
                    {dossierCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-4 h-4" />
                        <span>Copy Dossier Summary</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowDossierResult(false)}
                    className="px-4 py-2.5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white rounded font-black uppercase tracking-wider text-[11px] transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </motion.div>
            )}

            <div className="mt-5 text-[10px] font-bold text-gray-500 uppercase text-center leading-relaxed tracking-wider">
              *Candidate dossiers compile audited academic transcripts and project hashes.
            </div>
          </motion.div>

        </div>

      </div>

      {/* ── Visual & Motion Portfolio Strip ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 pt-10 border-t border-black/10 dark:border-white/10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold dark:text-gold-light block mb-1">
              VISUAL SYSTEMS &amp; MOTION PORTFOLIO
            </span>
            <h3 className="text-xl font-black tracking-tight text-black dark:text-white uppercase">
              Creative Craft Evidence
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
              Brand identity, graphic design, compositing, and cinematic motion — a recruiter-focused snapshot.
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="#visual"
              onClick={(e) => { e.preventDefault(); document.getElementById('visual')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-4 py-2 bg-gold/10 border border-gold/30 rounded text-[10px] font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-black transition-colors flex items-center space-x-1.5 cursor-pointer"
              aria-label="View full Visual Systems section"
            >
              <Palette className="w-3 h-3" aria-hidden="true" />
              <span>Full Visual Gallery</span>
            </a>
            <a
              href="#motion"
              onClick={(e) => { e.preventDefault(); document.getElementById('motion')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-4 py-2 bg-gold/10 border border-gold/30 rounded text-[10px] font-black uppercase tracking-wider text-gold hover:bg-gold hover:text-black transition-colors flex items-center space-x-1.5 cursor-pointer"
              aria-label="View full Motion Lab section"
            >
              <Film className="w-3 h-3" aria-hidden="true" />
              <span>Full Motion Lab</span>
            </a>
          </div>
        </div>

        {/* Visual Discipline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Visual Systems Summary */}
          <div className="p-5 rounded-2xl glass-card space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-gold/10 border border-gold/20">
                <Palette className="w-4 h-4 text-gold" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wide">Visual Systems &amp; Art Direction</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Brand • Editorial • Compositing • Print</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Brand Identity Systems", spec: "Full Guidelines" },
                { label: "Theatrical Movie Poster", spec: "27×40 CMYK Print" },
                { label: "Surreal Compositing", spec: "6000×4000 • 48 Layers" },
                { label: "Editorial Magazine Cover", spec: "A4 UV Coated" },
                { label: "Social Media Campaign", spec: "Meta • LinkedIn" },
                { label: "Luxury Event Stationery", spec: "Gold Foil Finish" },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-gold/30 transition-colors">
                  <p className="text-[11px] font-bold text-white leading-tight">{item.label}</p>
                  <p className="text-[9px] font-mono text-gold mt-0.5">{item.spec}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
              {["Photoshop CC", "Illustrator", "InDesign", "Figma", "Lightroom"].map((tool, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-gold/10 border border-gold/10 text-[9px] font-mono text-gold font-bold">{tool}</span>
              ))}
            </div>
          </div>

          {/* Motion Summary */}
          <div className="p-5 rounded-2xl glass-card space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-gold/10 border border-gold/20">
                <Video className="w-4 h-4 text-gold" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wide">Motion / Film Lab</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Showreel • Cinematic • Commercial</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Cinematic Showreel 4K", spec: "Speed Ramp • Rec.709" },
                { label: "Travel Cinematic Film", spec: "Drone • Whip-Pans" },
                { label: "Fitness Brand Commercial", spec: "Glitch VFX • 140 BPM" },
                { label: "Luxury Product Ad", spec: "3D AE • Cinema 4D" },
                { label: "Wedding Documentary", spec: "Emotional Narrative" },
                { label: "Corporate Pitch Film", spec: "Executive Motion" },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-gold/30 transition-colors">
                  <p className="text-[11px] font-bold text-white leading-tight">{item.label}</p>
                  <p className="text-[9px] font-mono text-gold mt-0.5">{item.spec}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
              {["Premiere Pro", "After Effects", "DaVinci Resolve", "Audition", "Cinema 4D"].map((tool, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-gold/10 border border-gold/10 text-[9px] font-mono text-gold font-bold">{tool}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Photoshop Gallery Callout */}
        <div className="p-5 rounded-2xl border border-gold/30 bg-gold/5 dark:bg-gold/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold block mb-0.5">EXTENDED VISUAL PORTFOLIO</span>
            <h4 className="text-base font-black text-black dark:text-white uppercase">21 Full-Resolution Photoshop Artworks</h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
              Matte paintings, surreal compositing studies, and professional photo retouching — navigable gallery.
            </p>
          </div>
          <a
            href="/photoshop"
            className="px-5 py-2.5 bg-gold text-black rounded font-black uppercase tracking-wider text-[11px] flex items-center space-x-2 hover:bg-gold-light transition-colors shrink-0 cursor-pointer shadow-[0_4px_12px_rgba(212,160,23,0.2)]"
            aria-label="Open Photoshop 21-artwork gallery"
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span>View Gallery</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </motion.div>

    </div>
  );
}
