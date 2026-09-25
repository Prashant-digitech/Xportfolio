"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
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
import VisualSystems from "@/components/VisualSystems";
import MotionLab from "@/components/MotionLab";
import FigmaLab from "@/components/FigmaLab";
import CertificationVault from "@/components/CertificationVault";
import ClientTrust from "@/components/ClientTrust";
import ProjectShowcase from "@/components/ProjectShowcase";
import CanvaPortfolioDeck from "@/components/CanvaPortfolioDeck";
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
              {/* 01: HERO */}
              <Hero profile={profile} />
              <SectionSeparator />

              {/* 02: SELECTED WORK (Flagship DeepAstro & Second Flagship TradeX) */}
              <ProjectShowcase profile={profile} />
              <SectionSeparator />

              {/* 02.5: CANVA EXECUTIVE MASTER DECK (26-Page Presentation Deck) */}
              <CanvaPortfolioDeck />
              <SectionSeparator />

              {/* 03: PROCESS & DESIGN SYSTEMS */}
              <DesignProcess />
              <SectionSeparator />
              <BeforeAfter />
              <SectionSeparator />
              <DesignSystemShowcase />
              <SectionSeparator />

              {/* 04: FIGMA LAB — DESIGN PROCESS LAB (How I Work: Wireframes → Mid-Fi → System → Iterations → Prototype → Handoff) */}
              <FigmaLab />
              <SectionSeparator />

              {/* 05: VISUAL SYSTEMS & ART DIRECTION */}
              <VisualSystems />
              <SectionSeparator />

              {/* 06: MOTION / FILM LAB */}
              <MotionLab />
              <SectionSeparator />

              {/* 07: MULTIDISCIPLINARY JOURNEY & CREDENTIALS */}
              <About profile={profile} />
              <SectionSeparator />
              <CertificationVault />
              <SectionSeparator />
              <CommandCenter profile={profile} />
              <SectionSeparator />
              <DesignDNA />
              <SectionSeparator />
              <SkillUniverse profile={profile} />
              <SectionSeparator />

              {/* CLIENT TRUST & TESTIMONIALS */}
              <ClientTrust />
              <SectionSeparator />

              {/* 08: AI LAB & EXPERIMENTS */}
              <AILab />
              <SectionSeparator />
              
              {/* 09: EXTENDED MEDIA & SERVICES */}
              <Services />
              <SectionSeparator />
              
              {/* 10: CONTACT */}
              <Contact profile={profile} />
              <SectionSeparator />

              {/* THANK YOU */}
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
