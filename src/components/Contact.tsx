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
    <section id="contact" className="relative py-24 bg-[#f5f5f5] dark:bg-[#080808] border-t border-black/5 dark:border-white/5 text-black dark:text-white transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-gold/5 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Gold Constellations Background Graphics (Left & Right) */}
      <div className="absolute top-[15%] left-[-2%] w-[250px] h-[250px] pointer-events-none select-none opacity-30 hidden md:block">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <line x1="10" y1="20" x2="30" y2="40" stroke="#D4A017" strokeWidth="0.5" />
          <line x1="30" y1="40" x2="15" y2="80" stroke="#D4A017" strokeWidth="0.5" />
          <line x1="30" y1="40" x2="60" y2="30" stroke="#D4A017" strokeWidth="0.5" />
          <line x1="60" y1="30" x2="85" y2="55" stroke="#D4A017" strokeWidth="0.5" />
          <circle cx="10" cy="20" r="1.5" fill="#D4A017" className="animate-pulse" />
          <circle cx="30" cy="40" r="2.5" fill="#FFCC4D" />
          <circle cx="15" cy="80" r="1.5" fill="#D4A017" />
          <circle cx="60" cy="30" r="2" fill="#FFCC4D" className="animate-pulse" />
          <circle cx="85" cy="55" r="1.5" fill="#D4A017" />
        </svg>
      </div>

      <div className="absolute bottom-[10%] right-[-2%] w-[250px] h-[250px] pointer-events-none select-none opacity-30 hidden md:block">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <line x1="80" y1="20" x2="60" y2="50" stroke="#D4A017" strokeWidth="0.5" />
          <line x1="60" y1="50" x2="90" y2="80" stroke="#D4A017" strokeWidth="0.5" />
          <line x1="60" y1="50" x2="35" y2="40" stroke="#D4A017" strokeWidth="0.5" />
          <circle cx="80" cy="20" r="2" fill="#FFCC4D" />
          <circle cx="60" cy="50" r="2.5" fill="#D4A017" className="animate-pulse" />
          <circle cx="90" cy="80" r="1.5" fill="#FFCC4D" />
          <circle cx="35" cy="40" r="2" fill="#D4A017" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Page title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-gold-light">Get in touch</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-white">
            LET'S <span className="text-gradient-gold">WORK TOGETHER</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mt-4 shadow-[0_0_8px_#D4A017]" />
          <p className="font-signature text-2xl text-gold-light mt-4 select-none">
            I'd love to hear from you!
          </p>
        </motion.div>

        {/* Form & Info split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left Panel: Contact info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-lg glass-card border border-gold/30 shadow-[0_0_20px_rgba(212,160,23,0.05)] space-y-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 mb-6">Contact Info</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Have a project in mind or want to discuss how I can help your brand grow? Feel free to reach out. I'm always open to new ideas and exciting opportunities.
              </p>

              <div className="space-y-6 pt-4 border-t border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#0d0d0d] border border-gold/40 flex items-center justify-center text-gold shadow-[0_0_10px_rgba(212,160,23,0.15)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Phone</span>
                    <a href={`tel:${profile.phone}`} className="font-bold text-gray-200 hover:text-gold transition-colors duration-200">{profile.phone}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#0d0d0d] border border-gold/40 flex items-center justify-center text-gold shadow-[0_0_10px_rgba(212,160,23,0.15)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Email</span>
                    <a href={`mailto:${profile.email}`} className="font-bold text-gray-200 hover:text-gold transition-colors duration-200">{profile.email}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#0d0d0d] border border-gold/40 flex items-center justify-center text-gold shadow-[0_0_10px_rgba(212,160,23,0.15)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Location</span>
                    <span className="font-bold text-gray-200">{profile.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#0d0d0d] border border-gold/40 flex items-center justify-center text-gold shadow-[0_0_10px_rgba(212,160,23,0.15)]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Availability</span>
                    <span className="font-bold text-gray-200">Mon – Sat : 9:00 AM – 8:00 PM</span>
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
            <div className="p-8 rounded-lg glass-card border border-gold/30 shadow-[0_0_30px_rgba(212,160,23,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-transparent" />
              
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">SEND ME A MESSAGE</h3>
                  <p className="text-[10px] text-gray-500">Fill out the form and I'll get back to you as soon as possible.</p>
                </div>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-scale-up">
                  <CheckCircle2 className="w-16 h-16 text-gold animate-bounce" />
                  <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                    Thank you for writing. Prashant will respond to your email shortly.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Your Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D4A017]/80">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your Name"
                          className="w-full bg-[#050505] border border-gold/20 rounded pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Your Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D4A017]/80">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Your Email"
                          className="w-full bg-[#050505] border border-gold/20 rounded pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Subject</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D4A017]/80">
                        <PenTool className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="w-full bg-[#050505] border border-gold/20 rounded pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Your Message</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none text-[#D4A017]/80">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Your Message"
                        className="w-full bg-[#050505] border border-gold/20 rounded pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors duration-300"
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
                    className="w-full mt-4 py-3 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-extrabold text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(212,160,23,0.3)] hover:shadow-[0_0_25px_rgba(212,160,23,0.7)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{status === "sending" ? "SENDING MESSAGE..." : "SEND MESSAGE"}</span>
                    <Send className="w-3.5 h-3.5 fill-black stroke-[3]" />
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
          className="p-8 rounded-lg glass-card border border-gold/15 bg-gradient-to-br from-[#0d0d0d]/80 via-transparent to-white/[0.01] relative overflow-hidden"
        >
          {/* Rotated, glowing post-it note at top-right */}
          <div className="absolute top-6 right-6 w-36 h-36 bg-[#0d0d0d] border border-gold rounded p-4 shadow-[0_0_20px_rgba(212,160,23,0.25)] rotate-6 hidden md:flex flex-col justify-between hover:rotate-0 hover:scale-105 transition-all duration-300 select-none animate-float">
            <span className="text-[10px] text-gold font-bold tracking-widest">NOTE:</span>
            <p className="font-signature text-sm text-gold-light leading-snug">
              Let's create something amazing together! 😊
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left side card portrait with circular gold halo */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]">
                {/* Halo */}
                <div className="absolute inset-0 rounded-full border border-gold shadow-[0_0_30px_rgba(212,160,23,0.4)] pointer-events-none animate-spin-slow" />
                <div className="absolute inset-2 rounded-full overflow-hidden border border-white/10 bg-[#050505]">
                  <Image
                    src="/images/portrait_thankyou.jpg"
                    alt="Prashant Thank You Portrait"
                    fill
                    className="object-cover object-top brightness-[1.05] contrast-[1.05]"
                  />
                </div>
              </div>
            </div>

            {/* Right side thank you content with signature and golden pen */}
            <div className="md:col-span-8 space-y-4 relative pr-0 md:pr-40">
              
              {/* Gold fountain pen watermark/graphic absolute on right */}
              <div className="absolute right-0 bottom-0 opacity-15 w-24 h-48 pointer-events-none hidden lg:block rotate-12 animate-pulse-slow">
                <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10V100L40 110L50 190L60 110L50 100" stroke="#D4A017" strokeWidth="2" />
                  <path d="M50 100V160" stroke="#D4A017" strokeWidth="2" strokeDasharray="2 2" />
                </svg>
              </div>

              {/* Title handwritten signature-style */}
              <h3 className="font-signature text-5xl text-gold-light select-none drop-shadow-[0_2px_4px_rgba(212,160,23,0.1)]">
                Thank You!
              </h3>
              
              {/* Heading */}
              <h4 className="font-extrabold text-xs tracking-[0.25em] text-white uppercase">
                THANK YOU FOR VISITING I APPRECIATE YOUR TIME AND INTEREST.
              </h4>

              {/* Message */}
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                Thank you for visiting my portfolio. I truly appreciate your time and interest. Whether you have a project idea, collaboration opportunity, or simply want to connect, I would be delighted to hear from you. Let's create something extraordinary together.
              </p>

              {/* Gold handwritten signature */}
              <div className="pt-2">
                <span className="font-signature text-2xl text-gold-light select-none">
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
