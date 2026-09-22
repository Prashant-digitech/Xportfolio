"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, ArrowUp, Send, X, Bot, User, Sparkles, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileData } from "@/app/page";

interface FloatingAssistantProps {
  profile: ProfileData;
  recruiterMode: boolean;
  onToggleRecruiterMode: (val: boolean) => void;
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
}

export default function FloatingAssistant({ profile, recruiterMode, onToggleRecruiterMode }: FloatingAssistantProps) {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: `Hello! I'm Prashant's virtual assistant. Ask me anything about his UI/UX designs, video editing skills, education, or contact details!`,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Monitor scroll for scroll-up button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMsg("");
    setIsTyping(true);

    // Simulate bot thinking/typing
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();

    // 1. Greetings
    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("who are you") || q.includes("who is prashant")) {
      return `${profile.name} is a professional ${profile.title} based in ${profile.location}. He has over ${profile.experience} of experience crafting interactive layouts, luxury dark-theme visual panels, and engineering solid front-end applications.`;
    }

    // 2. Skills
    if (q.includes("skills") || q.includes("programming") || q.includes("languages") || q.includes("code") || q.includes("show skills")) {
      return `${profile.name.split(" ")[0]}'s technical stack spans: HTML, CSS, JavaScript, PHP, React JS, Bootstrap, Tailwind CSS, and WordPress. On the design side, he's an expert in Figma, Adobe Photoshop, Illustrator, After Effects, and Premiere Pro.`;
    }

    // 3. Projects
    if (q.includes("projects") || q.includes("show projects") || q.includes("work")) {
      return `${profile.name.split(" ")[0]} has delivered over ${profile.projects} projects globally. Key works cover:\n• AI Prompt Agent Workspace UI\n• SaaS Analytics Dashboard (Next.js/React)\n• Decentralized Mobile Crypto Wallet\n• Cinematic Video Showreels & Motion graphics`;
    }

    // 4. Certificates
    if (q.includes("certificates") || q.includes("show certificates") || q.includes("education")) {
      return `Prashant holds verified credentials:\n• BE Mechanical Engineering (VTU)\n• MTech Production Management (VTU Silver Medalist)\n• Professional Web Design (Arena Animation)\n• CCNA Routing & Switching (Cisco)\n• C/C++ Programming Course`;
    }

    // 5. Contact / Book meeting
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("book meeting") || q.includes("meeting")) {
      return `You can get in touch with Prashant at:\n• Email: ${profile.email}\n• Phone: ${profile.phone}\n• Location: ${profile.location}\n\nYou can schedule a meeting directly using the action links in the chatbot panel!`;
    }

    // 6. Recruiter Mode
    if (q.includes("recruiter") || q.includes("enable recruiter")) {
      setTimeout(() => {
        onToggleRecruiterMode(true);
      }, 500);
      return `Enabling Recruiter Mode... Swapping page animations for clean resume panels.`;
    }

    return `Prashant is an Elite UI/UX Designer, Video Editor, and Creative Technologist. Let me know if you want me to scroll to his skills, projects, certificates, or trigger a direct resume download!`;
  };

  const suggestions = [
    { label: "Who is Prashant?", text: "Who is Prashant?" },
    { label: "Show Skills", text: "Show Skills" },
    { label: "Show Projects", text: "Show Projects" },
    { label: "Show Certificates", text: "Show Certificates" },
    { label: "Download Resume", text: "Download Resume" },
    { label: "Contact Prashant", text: "Contact Prashant" },
    { label: "Book Meeting", text: "Book Meeting" },
    { label: "Enable Recruiter Mode", text: "Enable Recruiter Mode" }
  ];

  const handleSuggestionClick = (chip: { label: string; text: string }) => {
    handleSendMessage(chip.text);

    // Dynamic scroll routing
    setTimeout(() => {
      const scrollTargets: Record<string, string> = {
        "Who is Prashant?": "about",
        "Show Skills": "about",
        "Show Projects": "work",
        "Show Certificates": "about",
        "Contact Prashant": "contact"
      };

      const targetId = scrollTargets[chip.text];
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      if (chip.text === "Download Resume") {
        window.open("/resume.pdf", "_blank");
      }

      if (chip.text === "Book Meeting") {
        window.open(`mailto:${profile.email}?subject=Meeting%20Booking`, "_blank");
      }
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99] flex flex-col items-end space-y-4">
      
      {/* 1. Scroll-To-Top Floating Button */}
      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleScrollToTop}
            className="w-11 h-11 rounded-full glass-card border border-gold/40 flex items-center justify-center text-gold cursor-pointer shadow-[0_0_15px_rgba(245,197,66,0.2)] hover:border-gold hover:shadow-[0_0_20px_rgba(245,197,66,0.4)] transition-all duration-300 z-[99]"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. Chatbot Dialog Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="PS AI Portfolio Assistant"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[340px] sm:w-[380px] h-[520px] rounded-2xl glass-card border-2 border-gold/45 shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(245,197,66,0.15)] overflow-hidden flex flex-col select-none text-black dark:text-white"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black flex items-center justify-between border-b border-gold/30">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-[#050505] border border-gold/40 flex items-center justify-center text-gold shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs tracking-wider uppercase">PS AI Assistant</h4>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                    <span className="text-[9px] font-bold text-gray-800">Recruiter Support Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                aria-label="Close AI assistant"
                className="p-1 rounded-full hover:bg-black/10 transition-colors duration-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 no-scrollbar bg-[#050505]/40 backdrop-blur-md">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs border ${
                    msg.sender === "user" 
                      ? "bg-gold/15 border-gold text-gold" 
                      : "bg-[#0d0d0d] border-white/10 text-gray-300"
                  }`}>
                    {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  <div className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gold text-black font-semibold rounded-tr-none shadow-md"
                      : "bg-[#0d0d0d]/90 border border-white/5 text-gray-200 rounded-tl-none shadow-sm whitespace-pre-line"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#0d0d0d] border border-white/10 flex items-center justify-center text-gray-300">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-[#0d0d0d]/90 border border-white/5 rounded-2xl rounded-tl-none p-3 flex space-x-1 items-center justify-center w-14 h-9">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips (Section 24) */}
            <div className="p-3 border-t border-white/5 bg-[#050505]/60 flex flex-col space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Recruiter Options:</span>
              <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto no-scrollbar">
                {suggestions.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(chip)}
                    className="px-2.5 py-1 rounded-full border border-gold/20 hover:border-gold/60 text-[9px] text-gold-light bg-gold/5 transition-all duration-300 cursor-pointer flex items-center space-x-1"
                  >
                    {chip.label === "Enable Recruiter Mode" && <Briefcase className="w-2.5 h-2.5" />}
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMsg);
              }}
              className="p-3 border-t border-white/5 bg-[#0d0d0d] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask assistant a question..."
                className="flex-grow bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors duration-300"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim()}
                className="p-2 bg-gradient-to-r from-gold-dark to-gold text-black rounded-lg hover:shadow-[0_0_10px_rgba(245,197,66,0.3)] transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 fill-black" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Floating Assistant Bubble Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setChatOpen(!chatOpen)}
        aria-label={chatOpen ? "Close AI Assistant" : "Open AI Assistant"}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black flex items-center justify-center shadow-[0_5px_20px_rgba(245,197,66,0.3),0_0_20px_rgba(245,197,66,0.15)] cursor-pointer relative z-[99]"
        title="PS AI Assistant"
      >
        <span className="absolute inset-0 rounded-full border border-gold animate-ping opacity-35" />
        {chatOpen ? (
          <X className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <MessageSquare className="w-6 h-6 fill-black" />
        )}
      </motion.button>

    </div>
  );
}
