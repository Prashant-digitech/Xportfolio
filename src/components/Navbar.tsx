"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Moon, Sun, Laptop, Settings, User, Menu, X, Briefcase, Upload } from "lucide-react";
import { useTheme } from "next-themes";
import { ProfileData } from "@/app/page";
import QRCode from "qrcode";

interface NavbarProps {
  profile: ProfileData;
  onUpdateProfile: (newProfile: ProfileData) => void;
  recruiterMode: boolean;
  onToggleRecruiterMode: (val: boolean) => void;
  onOpenUpload?: () => void;
}

export default function Navbar({ profile, onUpdateProfile, recruiterMode, onToggleRecruiterMode, onOpenUpload }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setQrUrl(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (!qrUrl) return;
    QRCode.toDataURL(
      qrUrl,
      {
        width: 150,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      },
      (err, url) => {
        if (err) {
          console.error("QR Code generation error", err);
          return;
        }
        setQrImage(url);
      }
    );
  }, [qrUrl]);
  
  // Settings form local state
  const [editForm, setEditForm] = useState<ProfileData>({ ...profile });

  // Sync settings form state when profile changes
  useEffect(() => {
    setEditForm({ ...profile });
  }, [profile]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setSettingsOpen(false);
        setAvatarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "work", "canva-deck", "process", "visual", "motion", "about", "lab", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "Work", id: "work" },
    { label: "Deck", id: "canva-deck" },
    { label: "Process", id: "process" },
    { label: "Visual", id: "visual" },
    { label: "Motion", id: "motion" },
    { label: "About", id: "about" },
    { label: "Lab", id: "lab" },
    { label: "Contact", id: "contact" },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editForm);
    setSettingsOpen(false);
  };

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : true;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#FAFAF7]/95 dark:bg-[#090A0E]/95 backdrop-blur-md border-b border-[#D6D9DE] dark:border-[rgba(212,175,55,0.38)] shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between relative">
          {/* Left: Brand Logo & Title */}
          <div 
            onClick={() => scrollToSection("home")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* Glowing blue square logo */}
            <div className="w-10 h-10 bg-[#0d0d0d] border border-neon-blue rounded-xl flex items-center justify-center font-bold text-lg text-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] group-hover:scale-105 transition-all duration-300">
              PS
            </div>
            {/* Brand name */}
            <div className="flex flex-col select-none text-[#111318] dark:text-white">
              <span className="font-extrabold text-sm tracking-[0.2em] group-hover:text-gold transition-colors duration-300">
                {profile.name.split(" ")[0] || "PRASHANT"}
              </span>
              <span className="font-semibold text-[10px] tracking-[0.3em] text-[#B8941F] dark:text-gold-light group-hover:text-[#111318] dark:group-hover:text-white transition-colors duration-300">
                {profile.name.split(" ")[1] || "SISODHIYA"}
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative font-semibold text-xs tracking-wider uppercase transition-all duration-200 hover:text-[#B8941F] dark:hover:text-[#D4AF37] cursor-pointer py-1 ${
                  activeSection === item.id
                    ? "text-[#B8941F] dark:text-[#D4AF37] font-bold"
                    : "text-[#111318] dark:text-[#E5E7EB]"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-light to-gold shadow-[0_0_8px_#D4A017]" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Quick actions (Theme, Recruiter Mode, Settings, Avatar) */}
          <div className="hidden md:flex items-center space-x-3 relative">
            {/* Dedicated 1-Click Dark & Light Toggle Button (Sections 18, 19, 20) */}
            <button 
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDark}
              className={`h-[44px] px-4 rounded-xl border-[1.5px] transition-all duration-200 cursor-pointer flex items-center space-x-2 text-xs font-bold uppercase tracking-wider select-none ${
                isDark
                  ? "bg-[#0F1118] border-[#D4AF37] text-white shadow-[0_4px_14px_rgba(0,0,0,0.30)] hover:border-[#F5C84B] hover:bg-[#141821]"
                  : "bg-[#FFFFFF] border-[#B8941F] text-[#111318] shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-[#F4F1E8] hover:border-[#D4AF37]"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-[#F5C84B] shrink-0" />
                  <span>LIGHT</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#A67C00] shrink-0" />
                  <span>DARK</span>
                </>
              )}
            </button>
            
            {/* Recruiter Mode Toggle (Section 31) */}
            <button
              onClick={() => onToggleRecruiterMode(!recruiterMode)}
              className={`h-[44px] px-4 rounded-xl border-[1.5px] transition-all duration-200 cursor-pointer flex items-center space-x-2 text-xs font-bold uppercase tracking-wider ${
                recruiterMode
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                  : "bg-white dark:bg-[#0F1118] text-[#111318] dark:text-white border-[#B8941F] dark:border-[#D4AF37] hover:bg-[#F4F1E8] dark:hover:bg-[#141821]"
              }`}
              title="Toggle Recruiter Mode"
              aria-label="Toggle Recruiter Mode"
              aria-pressed={recruiterMode}
            >
              <Briefcase className="w-4 h-4 text-[#B8941F] dark:text-[#D4AF37]" />
              <span className="hidden lg:inline">{recruiterMode ? "Recruiter Active" : "Recruiter Mode"}</span>
            </button>

            {/* Intelligent Upload Engine Button */}
            <button
              onClick={onOpenUpload}
              className="h-[44px] px-3.5 rounded-xl border-[1.5px] border-[#B8941F] dark:border-[#D4AF37] bg-white dark:bg-[#0F1118] text-[#111318] dark:text-white hover:bg-[#D4AF37] hover:text-black transition-all duration-200 cursor-pointer flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider shadow-sm group"
              title="Asset Intelligence Studio (Upload Anything — Ctrl+U)"
              aria-label="Upload Anything Engine"
            >
              <Upload className="w-4 h-4 text-[#B8941F] dark:text-[#D4AF37] group-hover:text-black transition-colors" />
              <span className="hidden xl:inline">AI Studio</span>
            </button>

            {/* Settings Gear (Section 32) */}
            <button 
              onClick={() => setSettingsOpen(true)}
              className="w-[44px] h-[44px] rounded-xl border-[1.5px] border-[#B8941F] dark:border-[#D4AF37] bg-white dark:bg-[#0F1118] text-[#111318] dark:text-white hover:text-gold hover:rotate-90 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm"
              title="Settings"
              aria-label="Settings"
            >
              <Settings className="w-4.5 h-4.5 text-[#B8941F] dark:text-[#D4AF37]" />
            </button>
            
            {/* Avatar Profile (Section 33) */}
            <button 
              onClick={() => setAvatarOpen(!avatarOpen)}
              className="w-[44px] h-[44px] rounded-xl border-[1.5px] border-[#B8941F] dark:border-[#D4AF37] bg-white dark:bg-[#0F1118] flex items-center justify-center shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer overflow-hidden relative"
              title="Profile"
              aria-label="Profile Avatar"
            >
              <User className="w-4.5 h-4.5 text-[#B8941F] dark:text-[#D4AF37]" />
            </button>

            {/* Avatar Dropdown Card */}
            {avatarOpen && (
              <div className="absolute right-0 top-14 w-64 rounded-xl bg-white dark:bg-[#0F1118] border border-[#B8941F] dark:border-gold/40 p-6 shadow-2xl z-[90] animate-fade-in text-[#111318] dark:text-white backdrop-blur-2xl">
                <div className="flex flex-col items-center space-y-4">
                  {/* Small portrait */}
                  <div className="relative w-16 h-16 rounded-full border border-gold overflow-hidden bg-[#050505] shadow-[0_0_15px_rgba(212,160,23,0.3)]">
                    <Image
                      src="/images/portrait_thankyou.jpg"
                      alt="Avatar Portrait"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  
                  {/* Name and title */}
                  <div className="text-center">
                    <h4 className="font-extrabold text-sm tracking-wider text-[#111318] dark:text-white">
                      {profile.name}
                    </h4>
                    <p className="text-[10px] text-[#B8941F] dark:text-gold-light mt-1 font-semibold">
                      {profile.title.split("•")[0] || profile.title}
                    </p>
                  </div>

                  {/* Mini Details list */}
                  <div className="w-full border-t border-black/10 dark:border-white/10 pt-4 space-y-2 text-[10px] text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span className="font-semibold uppercase tracking-wider text-gray-400">Location:</span>
                      <span>{profile.location.split(",")[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold uppercase tracking-wider text-gray-400">Email:</span>
                      <span className="truncate max-w-[120px]">{profile.email}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => { setAvatarOpen(false); setSettingsOpen(true); }}
                    className="w-full py-2 border border-gold/40 hover:border-gold text-[#B8941F] dark:text-gold hover:bg-gold/10 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors duration-200"
                  >
                    Manage Settings
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={() => setTheme(isDark ? "light" : "dark")} 
              className={`min-w-[44px] min-h-[44px] h-[44px] px-3 rounded-xl border-[1.5px] flex items-center justify-center space-x-1.5 transition-all duration-200 cursor-pointer ${
                isDark
                  ? "bg-[#0F1118] border-[#D4AF37] text-white"
                  : "bg-[#FFFFFF] border-[#B8941F] text-[#111318]"
              }`}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-[#F5C84B]" />
                  <span className="text-[10px] font-bold">LIGHT</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#A67C00]" />
                  <span className="text-[10px] font-bold">DARK</span>
                </>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0F1118] text-[#111318] dark:text-white hover:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[72px] bg-[#FAFAF7]/98 dark:bg-[#090A0E]/98 backdrop-blur-xl border-t border-black/10 dark:border-white/10 z-40 transition-all duration-300 animate-fade-in overflow-y-auto">
            <div className="flex flex-col space-y-4 p-8 h-full justify-start items-center">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full min-h-[48px] flex items-center justify-center font-bold text-base uppercase tracking-widest transition-all duration-200 rounded-xl ${
                    activeSection === item.id 
                      ? "text-[#B8941F] dark:text-[#D4AF37] scale-105" 
                      : "text-[#111318] dark:text-gray-300 hover:text-gold"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile 2-way Theme Selection Row */}
              <div className="flex bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-1.5 w-full max-w-[280px] justify-between items-center mt-4">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center justify-center space-x-1.5 flex-grow py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${!isDark ? "bg-[#D4AF37] text-black shadow-sm" : "text-gray-500"}`}
                >
                  <Sun className="w-4 h-4" />
                  <span>Light Mode</span>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center justify-center space-x-1.5 flex-grow py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${isDark ? "bg-[#D4AF37] text-black shadow-sm" : "text-gray-500"}`}
                >
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode</span>
                </button>
              </div>

              <div className="flex flex-col items-center space-y-4 pt-6 border-t border-black/10 dark:border-white/10 w-full justify-center">
                <button
                  onClick={() => { onToggleRecruiterMode(!recruiterMode); setMobileMenuOpen(false); }}
                  className={`w-full max-w-[280px] py-3 rounded-xl border-[1.5px] text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer ${
                    recruiterMode
                      ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-md"
                      : "bg-white dark:bg-[#0F1118] text-[#111318] dark:text-white border-[#B8941F] dark:border-[#D4AF37]"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>{recruiterMode ? "Recruiter Mode Active" : "Enable Recruiter Mode"}</span>
                </button>

                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenUpload?.(); }}
                  className="w-full max-w-[280px] py-3 rounded-xl border border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Asset Intelligence Studio</span>
                </button>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => { setMobileMenuOpen(false); setSettingsOpen(true); }}
                    className="p-3 bg-[#0d0d0d] rounded-full border border-white/10 text-gray-300"
                  >
                    <Settings className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); setAvatarOpen(true); }}
                    className="p-3 bg-[#0d0d0d] rounded-full border border-gold text-gold"
                  >
                    <User className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Settings Drawer Overlay */}
      {settingsOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-end transition-opacity duration-300 cursor-pointer"
          onClick={() => setSettingsOpen(false)}
        >
          {/* Drawer Container */}
          <div 
            className="w-full max-w-sm h-full bg-white dark:bg-[#0d0d0d] border-l border-black/10 dark:border-gold/30 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl transition-transform duration-300 animate-slide-in-right cursor-default text-black dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-black/5 dark:border-white/5 pb-4">
              <h3 className="text-lg font-black tracking-wider text-gradient-gold">SYSTEM SETTINGS</h3>
              <button
                onClick={() => setSettingsOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveSettings} className="space-y-4 flex-grow">
              {/* Name */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">User Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#050505] border border-black/10 dark:border-gold/20 rounded px-3 py-2 text-xs text-black dark:text-white focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">Professional Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#050505] border border-black/10 dark:border-gold/20 rounded px-3 py-2 text-xs text-black dark:text-white focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              {/* Accent Selection */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-2 font-bold">Color Accent System</label>
                <div className="flex space-x-2">
                  {(["gold", "blue", "violet"] as const).map((acc) => (
                    <button
                      type="button"
                      key={acc}
                      onClick={() => {
                        setEditForm({ ...editForm, accent: acc });
                        document.documentElement.setAttribute("data-accent", acc);
                      }}
                      className={`flex-1 py-1.5 rounded border text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        editForm.accent === acc
                          ? acc === "gold"
                            ? "bg-gold text-black border-gold shadow-[0_0_8px_#D4A017]"
                            : acc === "blue"
                            ? "bg-[#00F0FF] text-black border-[#00F0FF] shadow-[0_0_8px_#00F0FF]"
                            : "bg-[#9d4edd] text-white border-[#9d4edd] shadow-[0_0_8px_#9d4edd]"
                          : "bg-transparent text-gray-500 dark:text-gray-400 border-black/10 dark:border-white/10 hover:border-gold"
                      }`}
                    >
                      {acc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">Phone</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#050505] border border-black/10 dark:border-gold/20 rounded px-3 py-2 text-xs text-black dark:text-white focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#050505] border border-black/10 dark:border-gold/20 rounded px-3 py-2 text-xs text-black dark:text-white focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#050505] border border-black/10 dark:border-gold/20 rounded px-3 py-2 text-xs text-black dark:text-white focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">Recruiter Status</label>
                <input
                  type="text"
                  value={editForm.status || ""}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#050505] border border-black/10 dark:border-gold/20 rounded px-3 py-2 text-xs text-black dark:text-white focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">Experience (e.g. 3+ Years)</label>
                <input
                  type="text"
                  value={editForm.experience || ""}
                  onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#050505] border border-black/10 dark:border-gold/20 rounded px-3 py-2 text-xs text-black dark:text-white focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              {/* Projects */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">Projects Delivered (e.g. 50+)</label>
                <input
                  type="text"
                  value={editForm.projects || ""}
                  onChange={(e) => setEditForm({ ...editForm, projects: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#050505] border border-black/10 dark:border-gold/20 rounded px-3 py-2 text-xs text-black dark:text-white focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              {/* Certifications */}
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">Certifications (e.g. 10+)</label>
                <input
                  type="text"
                  value={editForm.certifications || ""}
                  onChange={(e) => setEditForm({ ...editForm, certifications: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#050505] border border-black/10 dark:border-gold/20 rounded px-3 py-2 text-xs text-black dark:text-white focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              {/* Recruiter Access QR */}
              <div className="border-t border-black/5 dark:border-white/5 pt-4 mt-4 space-y-3">
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">Recruiter Access QR Generator</label>
                <input
                  type="text"
                  value={qrUrl}
                  onChange={(e) => setQrUrl(e.target.value)}
                  placeholder="Website URL"
                  className="w-full bg-gray-50 dark:bg-[#050505] border border-black/10 dark:border-gold/20 rounded px-3 py-2 text-xs text-black dark:text-white focus:outline-none focus:border-gold transition-colors duration-300"
                />
                {qrImage && (
                  <div className="flex flex-col items-center justify-center p-4 bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-lg space-y-3">
                    <div className="p-2 bg-white rounded-lg border border-gold/30 shadow-md">
                      <Image src={qrImage} alt="Portfolio QR Code" width={120} height={120} className="object-contain" unoptimized />
                    </div>
                    <a
                      href={qrImage}
                      download="portfolio-qr.png"
                      className="px-3 py-1.5 border border-gold/30 hover:border-gold text-gold hover:text-white bg-gold/5 font-extrabold text-[9px] uppercase tracking-wider rounded transition-all duration-300 cursor-pointer flex items-center space-x-1"
                    >
                      <span>Download QR PNG</span>
                    </a>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-extrabold text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(212,160,23,0.3)] hover:shadow-[0_0_25px_rgba(212,160,23,0.7)] transition-all duration-300 cursor-pointer"
              >
                SAVE CHANGES
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
