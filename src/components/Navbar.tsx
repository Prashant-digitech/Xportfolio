"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Moon, Sun, Laptop, Settings, User, Menu, X, Briefcase } from "lucide-react";
import { useTheme } from "next-themes";
import { ProfileData } from "@/app/page";
import QRCode from "qrcode";

interface NavbarProps {
  profile: ProfileData;
  onUpdateProfile: (newProfile: ProfileData) => void;
  recruiterMode: boolean;
  onToggleRecruiterMode: (val: boolean) => void;
}

export default function Navbar({ profile, onUpdateProfile, recruiterMode, onToggleRecruiterMode }: NavbarProps) {
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

      const sections = ["home", "work", "process", "about", "lab", "contact"];
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
    { label: "Process", id: "process" },
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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 dark:bg-[#050505]/90 backdrop-blur-md border-b-2 border-gold/40 shadow-[0_4px_25px_rgba(245,197,66,0.18)] ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between relative">
          {/* Left: Brand Logo & Title */}
          <div 
            onClick={() => scrollToSection("home")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* Glowing blue square logo */}
            <div className="w-10 h-10 bg-[#0d0d0d] border border-neon-blue rounded-md flex items-center justify-center font-bold text-lg text-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] group-hover:scale-105 transition-all duration-300">
              PS
            </div>
            {/* Brand name */}
            <div className="flex flex-col select-none text-black dark:text-white">
              <span className="font-extrabold text-sm tracking-[0.2em] group-hover:text-gold transition-colors duration-300">
                {profile.name.split(" ")[0] || "PRASHANT"}
              </span>
              <span className="font-medium text-[10px] tracking-[0.3em] text-gold-light group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
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
                className={`relative font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:text-gold cursor-pointer py-1 ${
                  activeSection === item.id
                    ? "text-gold"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-light to-gold shadow-[0_0_8px_#D4A017]" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Quick actions (Theme, Settings, Avatar) */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {/* Dedicated 1-Click Dark & Light Toggle Button */}
            <button 
              onClick={() => {
                const nextTheme = theme === "dark" ? "light" : "dark";
                setTheme(nextTheme);
              }}
              className="px-3.5 py-1.5 rounded-full border border-gold/40 hover:border-gold bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-300 cursor-pointer flex items-center space-x-2 text-xs font-black uppercase tracking-wider shadow-sm"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {!mounted ? (
                <Sun className="w-4 h-4 text-gold" />
              ) : theme === "dark" ? (
                <>
                  <Moon className="w-4 h-4 text-gold-light drop-shadow-[0_0_8px_rgba(245,197,66,0.8)]" />
                  <span className="text-[10px] text-white">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-[#FF6B00] drop-shadow-[0_0_8px_rgba(255,107,0,0.8)]" />
                  <span className="text-[10px] text-slate-900 font-extrabold">Light</span>
                </>
              )}
            </button>
            
            {/* Recruiter Mode Toggle */}
            <button
              onClick={() => onToggleRecruiterMode(!recruiterMode)}
              className={`p-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center space-x-1.5 text-xs font-bold uppercase tracking-wider ${
                recruiterMode
                  ? "bg-gold text-black border-gold shadow-[0_0_10px_#D4A017]"
                  : "bg-transparent text-gray-500 dark:text-gray-400 border-black/10 dark:border-white/10 hover:border-gold hover:text-gold"
              }`}
              title="Toggle Recruiter Mode"
            >
              <Briefcase className="w-4 h-4" />
              <span className="text-[9px] hidden lg:inline">{recruiterMode ? "Recruiter Active" : "Recruiter Mode"}</span>
            </button>

            {/* Settings Gear */}
            <button 
              onClick={() => setSettingsOpen(true)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gold hover:rotate-90 transition-all duration-300 cursor-pointer"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            {/* Avatar Profile */}
            <div 
              onClick={() => setAvatarOpen(!avatarOpen)}
              className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-[#0d0d0d] shadow-[0_0_10px_rgba(212,160,23,0.3)] hover:shadow-[0_0_15px_rgba(212,160,23,0.6)] transition-all duration-300 cursor-pointer overflow-hidden relative"
            >
              <User className="w-5 h-5 text-gold" />
            </div>

            {/* Avatar Dropdown Card */}
            {avatarOpen && (
              <div className="absolute right-0 top-14 w-64 rounded-lg bg-white/98 dark:bg-[#0c0c0c]/98 border border-gold/30 p-6 shadow-[0_10px_50px_rgba(0,0,0,0.4)] z-[90] animate-fade-in text-black dark:text-white backdrop-blur-2xl">
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
                    <h4 className="font-extrabold text-sm tracking-wider text-black dark:text-white">
                      {profile.name}
                    </h4>
                    <p className="text-[10px] text-gold-light mt-1 font-semibold">
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
                    className="w-full py-1.5 border border-gold/30 hover:border-gold text-gold hover:bg-gold/5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors duration-300"
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
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} 
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-gold/20 text-gold-light hover:border-gold transition-all duration-300 cursor-pointer"
              aria-label="Toggle light and dark theme"
            >
              {resolvedTheme === "dark" ? (
                <Moon className="w-5 h-5 text-gold-light drop-shadow-[0_0_8px_rgba(245,197,66,0.6)]" />
              ) : (
                <Sun className="w-5 h-5 text-gold drop-shadow-[0_0_8px_rgba(212,160,23,0.6)]" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[72px] bg-[#050505]/95 backdrop-blur-lg border-t border-white/5 z-40 transition-all duration-300 animate-fade-in overflow-y-auto">
            <div className="flex flex-col space-y-4 p-8 h-full justify-start items-center">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full min-h-[48px] flex items-center justify-center font-semibold text-base uppercase tracking-widest transition-all duration-300 rounded-lg ${
                    activeSection === item.id ? "text-gold scale-110" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile 3-way Theme Selection Row */}
              <div className="flex bg-black/10 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg p-1 w-full max-w-[280px] justify-between items-center mt-4">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center justify-center space-x-1 flex-grow py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 ${theme === "light" ? "bg-gold text-black shadow-[0_0_8px_#D4A017]" : "text-gray-500"}`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center justify-center space-x-1 flex-grow py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 ${theme === "dark" ? "bg-gold text-black shadow-[0_0_8px_#D4A017]" : "text-gray-500"}`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`flex items-center justify-center space-x-1 flex-grow py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 ${theme === "system" ? "bg-gold text-black shadow-[0_0_8px_#D4A017]" : "text-gray-500"}`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>System</span>
                </button>
              </div>

              <div className="flex flex-col items-center space-y-4 pt-8 border-t border-white/10 w-full justify-center">
                <button
                  onClick={() => { onToggleRecruiterMode(!recruiterMode); setMobileMenuOpen(false); }}
                  className={`w-full max-w-[280px] py-2.5 rounded border text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                    recruiterMode
                      ? "bg-gold text-black border-gold shadow-[0_0_8px_#D4A017]"
                      : "bg-[#0d0d0d] text-gray-300 border-white/10"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>{recruiterMode ? "Recruiter Mode Active" : "Enable Recruiter Mode"}</span>
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
