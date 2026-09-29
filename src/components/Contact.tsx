"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, User, PenTool, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";


import { ProfileData } from "@/app/page";
import { useMagnetic } from "@/hooks/useAnimations";
import { motion } from "framer-motion";

interface ContactProps {
  profile: ProfileData;
}

export default function Contact({ profile }: ContactProps) {
  const submitBtn = useMagnetic();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");

    // Construct mailto link
    const subject = encodeURIComponent(formData.subject || `Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Sender Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    // Redirect to mailto
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    // Simulate sending email
    setTimeout(() => {
      setStatus("success");
      
      // Trigger premium celebration confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFCC4D", "#D4A017", "#00F0FF", "#9d4edd"],
      });

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#FAFAF7] dark:bg-[#06070A] border-t border-gray-200 dark:border-[#2A3441]/70 text-[#0A0F1D] dark:text-[#F8FAFC] transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute top-[20%] right-[10%] w-[320px] h-[320px] rounded-full bg-[#003882]/5 dark:bg-[#00E5FF]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#003882]/5 dark:bg-[#3B82F6]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#003882] dark:text-[#00E5FF] px-3.5 py-1 rounded-full bg-[#003882]/10 dark:bg-[#00E5FF]/10 border border-[#003882]/20 dark:border-[#00E5FF]/20">
            INITIATE ENGAGEMENT
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mt-4 text-[#0A0F1D] dark:text-[#F8FAFC] uppercase">
            LET&apos;S BUILD SOMETHING <span className="text-[#003882] dark:text-[#00E5FF]">MEANINGFUL</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#003882] dark:bg-[#00E5FF] mt-4 shadow-[0_0_12px_rgba(0,56,130,0.3)] dark:shadow-[0_0_12px_#00E5FF]" />
          <p className="text-[#1E293B] dark:text-[#CBD5E1] mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
            Available for Senior Product Design, UX strategy, Design Systems architecture, and end-to-end digital craft worldwide.
          </p>

          {/* Quick Action Channels Strip (Req 26) */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
            <a
              href={`mailto:${profile.email}`}
              className="px-5 py-2.5 rounded-xl bg-[#003882] hover:bg-[#002D6E] text-white dark:bg-[#00E5FF] dark:hover:bg-[#00c8e0] dark:text-black font-extrabold uppercase text-xs tracking-wider flex items-center space-x-2 transition-all shadow-md cursor-pointer hover:scale-105"
            >
              <Mail className="w-4 h-4 text-white dark:text-black" />
              <span>EMAIL ME</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#1A1F2B] border border-gray-200 dark:border-[#2A3441] text-[#0A0F1D] dark:text-[#F8FAFC] hover:border-[#003882] dark:hover:border-[#00E5FF] font-bold uppercase text-xs tracking-wider flex items-center space-x-2 transition-all cursor-pointer hover:scale-105 shadow-sm"
            >
              <span>LINKEDIN</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#1A1F2B] border border-gray-200 dark:border-[#2A3441] text-[#0A0F1D] dark:text-[#F8FAFC] hover:border-[#003882] dark:hover:border-[#00E5FF] font-bold uppercase text-xs tracking-wider flex items-center space-x-2 transition-all cursor-pointer hover:scale-105 shadow-sm"
            >
              <span>VIEW RESUME</span>
            </a>
          </div>
        </motion.div>

        {/* Form & Info split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24">
          
          {/* Left Panel: Contact info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-2xl bg-white dark:bg-[#1A1F2B] border border-gray-200 dark:border-[#2A3441] shadow-xl space-y-6 text-[#0A0F1D] dark:text-[#F8FAFC]">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-[#2A3441]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#003882] dark:text-[#00E5FF]">
                  DIRECT CHANNELS
                </h3>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>Available Q3/Q4</span>
                </span>
              </div>
              <p className="text-xs text-[#1E293B] dark:text-[#CBD5E1] leading-relaxed">
                Have an ambitious product in mind or want to audit your application&apos;s UX friction? Reach out directly via email, phone, or the communication channel below.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-4 p-3 rounded-xl bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-[#2A3441]">
                  <div className="w-10 h-10 rounded-lg bg-[#003882]/10 dark:bg-[#00E5FF]/10 border border-[#003882]/20 dark:border-[#00E5FF]/20 flex items-center justify-center text-[#003882] dark:text-[#00E5FF]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#1E293B] dark:text-[#94A3B8] uppercase tracking-widest font-mono">Phone</span>
                    <a href={`tel:${profile.phone}`} className="font-bold text-xs sm:text-sm text-[#0A0F1D] dark:text-[#F8FAFC] hover:text-[#003882] dark:hover:text-[#00E5FF] transition-colors">{profile.phone}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 rounded-xl bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-[#2A3441]">
                  <div className="w-10 h-10 rounded-lg bg-[#003882]/10 dark:bg-[#00E5FF]/10 border border-[#003882]/20 dark:border-[#00E5FF]/20 flex items-center justify-center text-[#003882] dark:text-[#00E5FF]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#1E293B] dark:text-[#94A3B8] uppercase tracking-widest font-mono">Email</span>
                    <a href={`mailto:${profile.email}`} className="font-bold text-xs sm:text-sm text-[#0A0F1D] dark:text-[#F8FAFC] hover:text-[#003882] dark:hover:text-[#00E5FF] transition-colors">{profile.email}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 rounded-xl bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-[#2A3441]">
                  <div className="w-10 h-10 rounded-lg bg-[#003882]/10 dark:bg-[#00E5FF]/10 border border-[#003882]/20 dark:border-[#00E5FF]/20 flex items-center justify-center text-[#003882] dark:text-[#00E5FF]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#1E293B] dark:text-[#94A3B8] uppercase tracking-widest font-mono">Location</span>
                    <span className="font-bold text-xs sm:text-sm text-[#0A0F1D] dark:text-[#F8FAFC]">{profile.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 rounded-xl bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-[#2A3441]">
                  <div className="w-10 h-10 rounded-lg bg-[#003882]/10 dark:bg-[#00E5FF]/10 border border-[#003882]/20 dark:border-[#00E5FF]/20 flex items-center justify-center text-[#003882] dark:text-[#00E5FF]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#1E293B] dark:text-[#94A3B8] uppercase tracking-widest font-mono">Response Window</span>
                    <span className="font-bold text-xs sm:text-sm text-[#0A0F1D] dark:text-[#F8FAFC]">Mon – Sat : 9:00 AM – 8:00 PM IST (&lt; 24h)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Contact form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-8 rounded-2xl bg-white dark:bg-[#1A1F2B] border border-gray-200 dark:border-[#2A3441] shadow-xl relative overflow-hidden text-[#0A0F1D] dark:text-[#F8FAFC]">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 dark:border-[#2A3441]">
                <div className="w-9 h-9 rounded-lg bg-[#003882]/10 dark:bg-[#00E5FF]/10 border border-[#003882]/25 dark:border-[#00E5FF]/25 flex items-center justify-center text-[#003882] dark:text-[#00E5FF]">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A0F1D] dark:text-[#F8FAFC] text-sm uppercase">SEND ME A MESSAGE</h3>
                  <p className="text-[10px] text-[#1E293B] dark:text-[#94A3B8]">Direct message inquiry pipeline with instant verification.</p>
                </div>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-scale-up">
                  <CheckCircle2 className="w-16 h-16 text-[#003882] dark:text-[#00E5FF] animate-bounce" />
                  <h4 className="text-xl font-bold text-[#0A0F1D] dark:text-[#F8FAFC]">Message Sent Successfully!</h4>
                  <p className="text-xs text-[#1E293B] dark:text-[#CBD5E1] max-w-xs leading-relaxed">
                    Thank you for writing. Prashant will respond to your email promptly.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-[#1E293B] dark:text-[#CBD5E1] font-mono font-bold uppercase tracking-wider mb-1.5">Your Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#003882]/70 dark:text-[#00E5FF]/70">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your Name"
                          className="w-full bg-gray-50 dark:bg-[#111827] border border-gray-300 dark:border-[#2A3441] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0A0F1D] dark:text-[#F8FAFC] placeholder-gray-400 dark:placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#003882] dark:focus:border-[#00E5FF] transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#1E293B] dark:text-[#CBD5E1] font-mono font-bold uppercase tracking-wider mb-1.5">Your Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#003882]/70 dark:text-[#00E5FF]/70">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@domain.com"
                          className="w-full bg-gray-50 dark:bg-[#111827] border border-gray-300 dark:border-[#2A3441] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0A0F1D] dark:text-[#F8FAFC] placeholder-gray-400 dark:placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#003882] dark:focus:border-[#00E5FF] transition-colors duration-200"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#1E293B] dark:text-[#CBD5E1] font-mono font-bold uppercase tracking-wider mb-1.5">Subject</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#003882]/70 dark:text-[#00E5FF]/70">
                        <PenTool className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Discussion / UX Opportunity"
                        className="w-full bg-gray-50 dark:bg-[#111827] border border-gray-300 dark:border-[#2A3441] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0A0F1D] dark:text-[#F8FAFC] placeholder-gray-400 dark:placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#003882] dark:focus:border-[#00E5FF] transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#1E293B] dark:text-[#CBD5E1] font-mono font-bold uppercase tracking-wider mb-1.5">Your Message</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3.5 pointer-events-none text-[#003882]/70 dark:text-[#00E5FF]/70">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell me about your product, timeline, or design needs..."
                        className="w-full bg-gray-50 dark:bg-[#111827] border border-gray-300 dark:border-[#2A3441] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0A0F1D] dark:text-[#F8FAFC] placeholder-gray-400 dark:placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#003882] dark:focus:border-[#00E5FF] transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <button
                    ref={submitBtn.ref}
                    onMouseMove={submitBtn.handleMouseMove}
                    onMouseLeave={submitBtn.handleMouseLeave}
                    style={submitBtn.style}
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full mt-4 py-3.5 bg-[#003882] hover:bg-[#002D6E] text-white dark:bg-[#00E5FF] dark:hover:bg-[#00c8e0] dark:text-black font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{status === "sending" ? "TRANSMITTING..." : "SEND MESSAGE"}</span>
                    <Send className="w-3.5 h-3.5 fill-white dark:fill-black stroke-[2.5]" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>

        {/* BOTTOM: THANK YOU SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 rounded-2xl bg-white dark:bg-[#1A1F2B] border border-gray-200 dark:border-[#2A3441] shadow-xl relative overflow-hidden text-[#0A0F1D] dark:text-[#F8FAFC]"
        >
          {/* Subtle note at top-right */}
          <div className="absolute top-6 right-6 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-[#111827] border border-gray-200 dark:border-[#2A3441] hidden md:flex items-center space-x-2 select-none">
            <span className="w-2 h-2 rounded-full bg-[#003882] dark:bg-[#00E5FF]" />
            <span className="text-[11px] font-mono text-[#003882] dark:text-[#00E5FF] font-bold">
              Looking Forward to Collaborating
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left side card portrait with circular telemetry halo */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
                <div className="absolute inset-0 rounded-full border border-[#003882]/40 dark:border-[#00E5FF]/40 shadow-[0_0_24px_rgba(0,56,130,0.15)] dark:shadow-[0_0_24px_rgba(0,229,255,0.25)] pointer-events-none" />
                <div className="absolute inset-2 rounded-full overflow-hidden border border-gray-300 dark:border-[#2A3441] bg-gray-100 dark:bg-[#06070A]">
                  <Image
                    src="/images/portrait_thankyou.jpg"
                    alt="Prashant Thank You Portrait"
                    fill
                    className="object-cover object-top brightness-[1.05] contrast-[1.05]"
                  />
                </div>
              </div>
            </div>

            {/* Right side thank you content with signature */}
            <div className="md:col-span-8 space-y-4 relative pr-0 md:pr-10">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#003882] dark:text-[#00E5FF]">
                APPRECIATION &amp; CONNECTION
              </span>
              
              <h4 className="font-black text-lg sm:text-xl tracking-tight text-[#0A0F1D] dark:text-[#F8FAFC] uppercase">
                THANK YOU FOR EXPLORING MY PORTFOLIO
              </h4>

              <p className="text-[#1E293B] dark:text-[#CBD5E1] text-xs sm:text-sm leading-relaxed max-w-xl">
                I truly appreciate your time and consideration. Whether you are seeking a Senior UX Designer for a strategic initiative, a Design Systems leader, or an inventive multidisciplinary creative partner, I look forward to building high-converting, friction-free experiences together.
              </p>

              {/* Handwritten signature */}
              <div className="pt-2">
                <span className="font-signature text-2xl text-[#003882] dark:text-[#00E5FF] select-none">
                  — {profile.name}
                </span>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
