"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundParticles from "@/components/BackgroundParticles";
import SectionSeparator from "@/components/SectionSeparator";
import FloatingAssistant from "@/components/FloatingAssistant";

// Advanced Sections
import CustomCursor from "@/components/CustomCursor";
import RecruiterLayout from "@/components/RecruiterLayout";
import CommandCenter from "@/components/CommandCenter";
import DesignDNA from "@/components/DesignDNA";
import SkillUniverse from "@/components/SkillUniverse";
import DesignProcess from "@/components/DesignProcess";
import BeforeAfter from "@/components/BeforeAfter";
import DesignSystemShowcase from "@/components/DesignSystemShowcase";
import FigmaLab from "@/components/FigmaLab";
import CertificationVault from "@/components/CertificationVault";
import ClientTrust from "@/components/ClientTrust";
import ProjectShowcase from "@/components/ProjectShowcase";
import AILab from "@/components/AILab";
import ThankYouSign from "@/components/ThankYouSign";

export interface ProfileData {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  dob: string;
  accent: "gold" | "blue" | "violet";
  status: string;
  experience: string;
  projects: string;
  certifications: string;
  focus: string[];
}

export default function Home() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "PRASHANT SISODHIYA",
    title: "UI/UX DESIGNER • VIDEO EDITOR • GRAPHICS DESIGNER",
    phone: "7006998128",
    email: "psisodhiya01@gmail.com",
    location: "Vadodara, India",
    dob: "30-01-1986",
    accent: "gold",
    status: "Available for Projects",
    experience: "3+ Years",
    projects: "50+",
    certifications: "10+",
    focus: ["AI UX", "Design Systems", "Creative Direction"],
  });

  const [recruiterMode, setRecruiterMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }

    const savedMode = localStorage.getItem("recruiterMode");
    if (savedMode) {
      setRecruiterMode(savedMode === "true");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-accent", profile.accent);
    }
  }, [profile.accent, mounted]);

  const updateProfile = (newProfile: ProfileData) => {
    setProfile(newProfile);
    localStorage.setItem("profile", JSON.stringify(newProfile));
  };

  const toggleRecruiterMode = (val: boolean) => {
    setRecruiterMode(val);
    localStorage.setItem("recruiterMode", String(val));
  };

  return (
    <>
      {/* Custom Cursor for Ultra Premium feel (disabled in recruiter mode) */}
      {mounted && !recruiterMode && <CustomCursor />}

      {/* Dynamic Animated Particles in Background (disabled in recruiter mode) */}
      {mounted && !recruiterMode && <BackgroundParticles accent={profile.accent} />}

      {/* Main layout */}
      <div className="relative z-10 min-h-screen flex flex-col text-[#171717] dark:text-white transition-colors duration-300">
        {/* Sticky Header */}
        <Navbar 
          profile={profile} 
          onUpdateProfile={updateProfile} 
          recruiterMode={recruiterMode}
          onToggleRecruiterMode={toggleRecruiterMode}
        />

        {/* Content sections */}
        <main className="flex-grow">
          {recruiterMode ? (
            <RecruiterLayout profile={profile} />
          ) : (
            <>
              {/* Cinematic Portfolio */}
              <Hero profile={profile} />
              <SectionSeparator />
              <About profile={profile} />
              <SectionSeparator />
              
              {/* SECTION 01 & 09: AI Command Center & Tool Stack */}
              <CommandCenter profile={profile} />
              <SectionSeparator />

              {/* SECTION 02: Design DNA Radar Chart */}
              <DesignDNA />
              <SectionSeparator />

              {/* SECTION 03: Skill Universe Constellation */}
              <SkillUniverse profile={profile} />
              <SectionSeparator />

              {/* SECTION 04 & 05: Design Process & Case Study Experience */}
              <DesignProcess />
              <SectionSeparator />

              {/* SECTION 06: Before After Slider */}
              <BeforeAfter />
              <SectionSeparator />

              {/* SECTION 07: Design System Showcase */}
              <DesignSystemShowcase />
              <SectionSeparator />

              {/* SECTION 08: Figma Lab */}
              <FigmaLab />
              <SectionSeparator />

              {/* SECTION 11 & 12: Certification Vault & Experience Journey */}
              <CertificationVault />
              <SectionSeparator />

              {/* SECTION 13 & 14: Client Trust Section & Testimonials */}
              <ClientTrust />
              <SectionSeparator />

              {/* SECTION 15, 16, 17, 18, 21: Featured Projects, Filters, Showreel, Graphics Showcase, Presentations */}
              <ProjectShowcase profile={profile} />
              <SectionSeparator />

              {/* SECTION 19, 20, 22: AI Future Vision, Prompt Lab, AI Projects Lab */}
              <AILab />
              <SectionSeparator />
              
              {/* Core Legacy Fallbacks */}
              <Services />
              <SectionSeparator />
              <Work />
              <SectionSeparator />
              
              {/* Contact Experience */}
              <Contact profile={profile} />
              <SectionSeparator />

              {/* SECTION 26: Thank You Experience */}
              <ThankYouSign profile={profile} />
            </>
          )}
        </main>

        {/* Brand Footer */}
        <Footer profile={profile} />

        {/* Floating Utilities */}
        <FloatingAssistant 
          profile={profile} 
          recruiterMode={recruiterMode}
          onToggleRecruiterMode={toggleRecruiterMode}
        />
      </div>
    </>
  );
}
