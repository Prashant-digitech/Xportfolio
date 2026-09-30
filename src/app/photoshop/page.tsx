"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronLeft, ChevronRight, X, ArrowLeft, Sparkles, Download, ImageIcon, Eye, 
  ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, Filter, Layers, Check, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "@/components/BackgroundParticles";

export interface PhotoshopArtwork {
  id: number;
  title: string;
  category: "advertising" | "compositing" | "posters" | "editorial" | "deck";
  categoryLabel: string;
  path: string;
  year: string;
  tools: string[];
  specs: string;
  technique: string;
}

// 50 Master Artworks: 29 Client & Conceptual Masterpieces + 21 Milestone Presentation Deck Pages
const ALL_ARTWORKS: PhotoshopArtwork[] = [
  // ── Commercial & Ad Campaigns (1-8) ──────────────────────────────────
  {
    id: 1,
    title: "Belle Haute Parfumerie Luxury Campaign",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/ads beelle.png",
    year: "2024",
    tools: ["Photoshop CC", "Camera Raw", "Frequency Separation", "Typography"],
    specs: "4500×6000px • 300 DPI • Print Ready",
    technique: "Refractive glass lighting, micro floral dispersion, and gold foil typography."
  },
  {
    id: 2,
    title: "Performance Audio Commercial Keyart",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/ads.png",
    year: "2023",
    tools: ["Photoshop", "Lightroom", "Volumetric Lighting"],
    specs: "4K Master • 16-Bit Color Depth",
    technique: "Dynamic sonic soundwave particle flow and studio rim reflections."
  },
  {
    id: 3,
    title: "boAt Lifestyle Audio Commercial Keyart",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/boat ad.png",
    year: "2024",
    tools: ["Photoshop CC", "Water Splash Dynamics", "Camera Raw", "Color Grading"],
    specs: "4K Master • 300 DPI Commercial Print",
    technique: "High-speed fluid splash compositing, zero-gravity levitation, and neon driver accents."
  },
  {
    id: 4,
    title: "Artisan Molten Chocolate Splash",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/chocolate ad.png",
    year: "2023",
    tools: ["Photoshop", "Liquid Blending", "Multi-Pass Lighting"],
    specs: "300 DPI CMYK Print Master",
    technique: "Multi-exposure macro liquid splash masking and cocoa powder dispersion."
  },
  {
    id: 5,
    title: "Denver Men's Grooming Chiaroscuro Ad",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/denver ad.png",
    year: "2023",
    tools: ["Photoshop", "Illustrator", "Matte Composite"],
    specs: "Billboard & Digital Display • 300 DPI",
    technique: "Chiaroscuro studio keys, atmospheric smoke haze, and embossed brand typography."
  },
  {
    id: 6,
    title: "Next-Gen Smartphone Flagship Launch",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/ipone-ad.png",
    year: "2024",
    tools: ["Photoshop", "Optic Flares", "Vector Masking"],
    specs: "Retina Digital Keynote Master",
    technique: "Custom glass bevel lighting, optical dispersion flares, and titanium highlights."
  },
  {
    id: 7,
    title: "Haute Horlogerie Luxury Timepiece",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/luxuryad.png",
    year: "2023",
    tools: ["Photoshop", "Macro Lighting", "Focus Stacking"],
    specs: "300 DPI Fine Art Magazine Spread",
    technique: "Focus-stacked tourbillon movement detailing and sapphire crystal polarization."
  },
  {
    id: 8,
    title: "Athletic Footwear Kinetic Particle Keyart",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/shoe ad.png",
    year: "2023",
    tools: ["Photoshop", "Action Particle FX", "Velocity Blur"],
    specs: "Omni-Channel Social & Stadium Billboard",
    technique: "Zero-gravity sole disintegration particles and aerodynamic air vortex rings."
  },

  // ── Matte Painting & Composites (9-19) ──────────────────────────────
  {
    id: 9,
    title: "High-End Beauty Skin Retouching",
    category: "compositing",
    categoryLabel: "Retouching",
    path: "/images/graphics/my-work/before after.png",
    year: "2022",
    tools: ["Photoshop CC", "Dual Frequency Separation", "Micro-Dodge & Burn"],
    specs: "Ultra-HD Portrait • Zero Texture Loss",
    technique: "High/low frequency spatial filtering preserving natural dermal micropores."
  },
  {
    id: 10,
    title: "Camera Raw HDR Dynamic Range Grade",
    category: "compositing",
    categoryLabel: "Color Grading",
    path: "/images/graphics/my-work/camera raw.png",
    year: "2022",
    tools: ["Adobe Camera Raw", "Photoshop", "Curve Mastering"],
    specs: "6000×4000 RAW • ProPhoto RGB",
    technique: "Multi-stop exposure bracket merging and calibrated HSL split-toning."
  },
  {
    id: 11,
    title: "Historical Archive Photo Colorization",
    category: "compositing",
    categoryLabel: "Restoration",
    path: "/images/graphics/my-work/colorize.png",
    year: "2021",
    tools: ["Photoshop", "Luminance Masks", "Historical Archives"],
    specs: "Fine Art Archive Restoration • 48 Layers",
    technique: "Period-accurate textile tinting and multi-layer skin tone undertone balance."
  },
  {
    id: 12,
    title: "Surreal Double Exposure Fine Art",
    category: "compositing",
    categoryLabel: "Fine Art",
    path: "/images/graphics/my-work/double exposure.png",
    year: "2022",
    tools: ["Photoshop CC", "Screen Blending", "Gradient Mapping"],
    specs: "Gallery Exhibition Print • 300 DPI",
    technique: "Luma silhouette keying merging portraiture with alpine wilderness horizons."
  },
  {
    id: 13,
    title: "Ethereal Botanical Surreal Portrait",
    category: "compositing",
    categoryLabel: "Surreal Composite",
    path: "/images/graphics/my-work/manipulation girl and flower.png",
    year: "2024",
    tools: ["Photoshop CC", "Botanical Masking", "Volumetric Glow", "Lightroom"],
    specs: "Ultra-HD Fine Art Print • 300 DPI",
    technique: "Organic floral hair blending, delicate butterfly dispersion, and soft rim keys."
  },
  {
    id: 14,
    title: "Bioluminescent Nightscape Manipulation",
    category: "compositing",
    categoryLabel: "Surreal Composite",
    path: "/images/graphics/my-work/manipulation glow.png",
    year: "2023",
    tools: ["Photoshop CC", "Digital Painting", "Color Dodge Modes"],
    specs: "Ultra-HD Digital Artwork • 56 Layers",
    technique: "Multi-layered color dodge glow channels and volumetric night fog scattering."
  },
  {
    id: 15,
    title: "Mythological Titan Ruins Matte Painting",
    category: "compositing",
    categoryLabel: "Matte Painting",
    path: "/images/graphics/my-work/manipulation1.png",
    year: "2023",
    tools: ["Photoshop", "Matte Painting Brushes", "Atmospheric Haze"],
    specs: "Panoramic Master • 6000×3200px",
    technique: "Scale-establishing character silhouette against colossal ancient monument ruins."
  },
  {
    id: 16,
    title: "Celestial Titan Cosmic Matte Painting v2",
    category: "compositing",
    categoryLabel: "Matte Painting",
    path: "/images/graphics/my-work/manipulation2.png",
    year: "2024",
    tools: ["Photoshop CC", "Matte Painting", "Nebula Textures"],
    specs: "Ultra-Wide Cinematic Canvas • 16-Bit Color",
    technique: "Planetary ring structures, celestial nebula vortexes, and exploratory perspective."
  },
  {
    id: 17,
    title: "Mystic Ancient Realm Environment Composite",
    category: "compositing",
    categoryLabel: "World Building",
    path: "/images/graphics/my-work/realm.png",
    year: "2024",
    tools: ["Photoshop CC", "Environment Matte Painting", "Water Dynamics"],
    specs: "Panoramic Environmental Master • 300 DPI",
    technique: "Crystalline architecture, cascading waterfall fluids, and aerial depth cues."
  },
  {
    id: 18,
    title: "Dark Coven Sorceress Fantasy Keyart",
    category: "compositing",
    categoryLabel: "Dark Fantasy",
    path: "/images/graphics/my-work/witch.png",
    year: "2024",
    tools: ["Photoshop CC", "Arcane Glow Passes", "Fabric Texture Blending"],
    specs: "Theatrical Character Keyart • 300 DPI",
    technique: "Ember particle brushes, arcane spellcraft glows, and deep dramatic chiaroscuro."
  },

  // ── Theatrical Cinema Posters (19-22) ───────────────────────────────
  {
    id: 19,
    title: "Psychological Thriller Theatrical Keyart",
    category: "posters",
    categoryLabel: "Movie Poster",
    path: "/images/graphics/my-work/movie poster2.png",
    year: "2023",
    tools: ["Photoshop", "Illustrator", "Billing Block Kerning"],
    specs: "27×40 in Studio One-Sheet",
    technique: "Shattered glass refraction passes, crimson title accent, and studio credit billing."
  },
  {
    id: 20,
    title: "Cyberpunk Sci-Fi Cinema Blockbuster",
    category: "posters",
    categoryLabel: "Movie Poster",
    path: "/images/graphics/my-work/movie poster3.png",
    year: "2023",
    tools: ["Photoshop CC", "Cinema 3D Passes", "Color Grading"],
    specs: "Theatrical One-Sheet • IMAX Lightbox",
    technique: "Rain-slicked neon skyscrapers, cybernetic character integration, and anamorphic flare."
  },
  {
    id: 21,
    title: "Grimdark Supernatural Horror Keyart",
    category: "posters",
    categoryLabel: "Movie Poster",
    path: "/images/graphics/my-work/movie poster4.png",
    year: "2023",
    tools: ["Photoshop", "Texture Blending", "Typography Kerning"],
    specs: "Theatrical Cinema Release • 300 DPI",
    technique: "Distressed parchment texture overlays, suffocating fog, and weathered serif title."
  },
  {
    id: 22,
    title: "Epic Action Adventure Theatrical Poster",
    category: "posters",
    categoryLabel: "Movie Poster",
    path: "/images/graphics/my-work/movie poster5.png",
    year: "2023",
    tools: ["Photoshop", "Particle Dynamics", "Title Design"],
    specs: "27×40 Studio One-Sheet CMYK",
    technique: "Multi-layered spark/debris emitters, heroic triangle lighting, and 3D metallic bevel."
  },

  // ── Editorial, Journals & Corporate Flyers (23-29) ──────────────────
  {
    id: 23,
    title: "Corporate Direct-Response Business Flyer",
    category: "editorial",
    categoryLabel: "Marketing Collateral",
    path: "/images/graphics/my-work/flyer.png",
    year: "2022",
    tools: ["InDesign", "Illustrator", "Photoshop"],
    specs: "A5 Double-Sided • Print Ready CMYK",
    technique: "Z-pattern visual conversion hierarchy, card zoning, and high-visibility CTAs."
  },
  {
    id: 24,
    title: "Executive Business Summit & Conference Flyer",
    category: "editorial",
    categoryLabel: "Conference Collateral",
    path: "/images/graphics/my-work/flyer1.png",
    year: "2024",
    tools: ["InDesign", "Illustrator", "Photoshop", "Swiss Grid"],
    specs: "A4 / Letter Print Master • CMYK Bleed Ready",
    technique: "Geometric typography hierarchy, speaker schedule grid, and corporate authority."
  },
  {
    id: 25,
    title: "Modern Tech Enterprise Solutions Flyer",
    category: "editorial",
    categoryLabel: "B2B Marketing",
    path: "/images/graphics/my-work/flyer2.png",
    year: "2024",
    tools: ["Illustrator", "Photoshop", "Vector Tokens"],
    specs: "Double-Sided A5 • 300 DPI Offset",
    technique: "Dark mode visual accents, scannable feature pillars, and icon-driven list cards."
  },
  {
    id: 26,
    title: "Creative Agency Portfolio & Services Flyer",
    category: "editorial",
    categoryLabel: "Agency Showcase",
    path: "/images/graphics/my-work/flyer3.png",
    year: "2024",
    tools: ["InDesign", "Photoshop", "Color Palette Curation"],
    specs: "Commercial Print Ready • Spot UV Accents",
    technique: "Dynamic diagonal dividers, high-fidelity project vignettes, and gold foil badges."
  },
  {
    id: 27,
    title: "Retail Seasonal Campaign Promotional Leaflet",
    category: "editorial",
    categoryLabel: "Retail Campaign",
    path: "/images/graphics/my-work/flyer4.png",
    year: "2024",
    tools: ["Photoshop", "Illustrator", "Promotional Keyart"],
    specs: "Mass-Distribution Print Master • CMYK",
    technique: "High-contrast discount burst geometry, product focal framing, and QR code integration."
  },
  {
    id: 28,
    title: "Fashion & Culture Editorial Spread v1",
    category: "editorial",
    categoryLabel: "Editorial Magazine",
    path: "/images/graphics/my-work/magazine.png",
    year: "2023",
    tools: ["InDesign", "Photoshop", "Typography Pairing"],
    specs: "Newsstand A4 Spread • Spot Varnishing",
    technique: "Strict baseline grid alignment, optical kerning pairs, and asymmetric editorial photos."
  },
  {
    id: 29,
    title: "Contemporary Architectural Journal v2",
    category: "editorial",
    categoryLabel: "Editorial Magazine",
    path: "/images/graphics/my-work/magazine2.png",
    year: "2023",
    tools: ["InDesign", "Photoshop", "Grid Architecture"],
    specs: "Double Page Spread • CMYK Offset",
    technique: "Swiss typography discipline, generous negative space, and architectural line drawings."
  },

  // ── Milestone Presentation Deck Pages (30-50) ───────────────────────
  {
    id: 30,
    title: "Executive Cover & Identity Design (2026 Master Deck)",
    category: "deck",
    categoryLabel: "Master Deck",
    path: "/photoshop/page1.png",
    year: "2026",
    tools: ["Photoshop", "Figma", "Design Tokens"],
    specs: "Master Cover Art • High-Res Vector Overlay",
    technique: "Master typography hierarchy, golden ratio grid alignment, and executive branding."
  },
  {
    id: 31,
    title: "Surreal Atmospheric Composite (2020 Edition)",
    category: "deck",
    categoryLabel: "Foundational Craft",
    path: "/photoshop/page2.png",
    year: "2020",
    tools: ["Photoshop CC", "Camera Raw", "Intuos Pro"],
    specs: "Milestone Deck Page 02 • 300 DPI",
    technique: "Multi-source shadow matching, atmospheric depth, and cinematic lighting balance."
  },
  {
    id: 32,
    title: "Cinematic Matte Painting Environment (2020 Edition)",
    category: "deck",
    categoryLabel: "Foundational Craft",
    path: "/photoshop/page3.png",
    year: "2020",
    tools: ["Photoshop", "Custom Brushes", "Matte Painting"],
    specs: "Milestone Deck Page 03 • 300 DPI",
    technique: "Environmental world-building, celestial color palette, and aerial perspective."
  },
  {
    id: 33,
    title: "Geometric Brand Composition (2021 Transition)",
    category: "deck",
    categoryLabel: "Graphic Precision",
    path: "/photoshop/page4.png",
    year: "2021",
    tools: ["Illustrator", "Photoshop", "Grid Systems"],
    specs: "Milestone Deck Page 04 • 300 DPI",
    technique: "High-contrast minimalist layout, negative space calibration, and typographic weight."
  },
  {
    id: 34,
    title: "Character Lighting Integration (2021 Transition)",
    category: "deck",
    categoryLabel: "Graphic Precision",
    path: "/photoshop/page5.png",
    year: "2021",
    tools: ["Photoshop CC", "Luma Masks", "Subsurface Passes"],
    specs: "Milestone Deck Page 05 • 300 DPI",
    technique: "Subsurface scattering integration and multi-layer rim lighting compositing."
  },
  {
    id: 35,
    title: "Cosmic Landscape Study (2022 Systems)",
    category: "deck",
    categoryLabel: "Graphic Precision",
    path: "/photoshop/page6.png",
    year: "2022",
    tools: ["Photoshop", "Nebula Brushes", "Gradient Maps"],
    specs: "Milestone Deck Page 06 • 300 DPI",
    technique: "Expansive horizon scale, nebula color harmony, and foreground depth anchoring."
  },
  {
    id: 36,
    title: "Atmospheric Visual Glow (2022 Systems)",
    category: "deck",
    categoryLabel: "Graphic Precision",
    path: "/photoshop/page7.png",
    year: "2022",
    tools: ["Photoshop", "Color Dodge", "Volumetric Fog"],
    specs: "Milestone Deck Page 07 • 300 DPI",
    technique: "Volumetric fog scatter, specular flare blooming, and photographic grain balance."
  },
  {
    id: 37,
    title: "Dynamic Action Poster Keyart (2023 Brands)",
    category: "deck",
    categoryLabel: "Brand Systems",
    path: "/photoshop/page8.png",
    year: "2023",
    tools: ["Photoshop", "Illustrator", "Typography Layout"],
    specs: "Milestone Deck Page 08 • 300 DPI",
    technique: "Kinetic visual flow, action title kerning, and explosive particle integration."
  },
  {
    id: 38,
    title: "Futuristic Cybernetic Art (2023 Brands)",
    category: "deck",
    categoryLabel: "Brand Systems",
    path: "/photoshop/page9.png",
    year: "2023",
    tools: ["Photoshop CC", "Vector Shaders", "Neon Glows"],
    specs: "Milestone Deck Page 09 • 300 DPI",
    technique: "Neon vector luminescence, digital telemetry accents, and cybernetic textures."
  },
  {
    id: 39,
    title: "Commercial Editorial Retouch (2023 Brands)",
    category: "deck",
    categoryLabel: "Brand Systems",
    path: "/photoshop/page10.png",
    year: "2023",
    tools: ["Photoshop", "High-End Retouch", "Studio Illumination"],
    specs: "Milestone Deck Page 10 • 300 DPI",
    technique: "Commercial packaging fidelity, specular studio reflections, and tonal balance."
  },
  {
    id: 40,
    title: "Abstract Corporate Branding System (2024 Edition)",
    category: "deck",
    categoryLabel: "Brand Systems",
    path: "/photoshop/page11.png",
    year: "2024",
    tools: ["Figma", "Illustrator", "Brand Guidelines"],
    specs: "Milestone Deck Page 11 • 300 DPI",
    technique: "Modular geometric brand architecture, vector purity, and corporate guidelines."
  },
  {
    id: 41,
    title: "High-Contrast Event Poster (2024 Edition)",
    category: "deck",
    categoryLabel: "Brand Systems",
    path: "/photoshop/page12.png",
    year: "2024",
    tools: ["InDesign", "Photoshop", "Swiss Grid"],
    specs: "Milestone Deck Page 12 • 300 DPI",
    technique: "Bold typographic hierarchy, architectural negative space, and spot color palette."
  },
  {
    id: 42,
    title: "Creative Merchandise Showcase (2024 Edition)",
    category: "deck",
    categoryLabel: "Brand Systems",
    path: "/photoshop/page13.png",
    year: "2024",
    tools: ["Photoshop 3D", "Illustrator", "Material Shaders"],
    specs: "Milestone Deck Page 13 • 300 DPI",
    technique: "Tactile material finish rendering, retail product mockups, and gold foil accents."
  },
  {
    id: 43,
    title: "Environmental Experience Canvas (2025 Product)",
    category: "deck",
    categoryLabel: "Product & UX",
    path: "/photoshop/page14.png",
    year: "2025",
    tools: ["Figma", "Photoshop", "Responsive Layout"],
    specs: "Milestone Deck Page 14 • 300 DPI",
    technique: "Digital product hero storytelling, responsive cross-screen layout, and visual flow."
  },
  {
    id: 44,
    title: "Telemetry Glow & HUD System (2025 Product)",
    category: "deck",
    categoryLabel: "Product & UX",
    path: "/photoshop/page15.png",
    year: "2025",
    tools: ["Photoshop", "After Effects", "HUD Vector Assets"],
    specs: "Milestone Deck Page 15 • 300 DPI",
    technique: "Real-time telemetry HUDs, sensor dashboard aesthetics, and accessible contrast."
  },
  {
    id: 45,
    title: "Cyber HUD Interface Concept (2025 Product)",
    category: "deck",
    categoryLabel: "Product & UX",
    path: "/photoshop/page16.png",
    year: "2025",
    tools: ["Figma", "Tailwind Tokens", "TypeScript"],
    specs: "Milestone Deck Page 16 • 300 DPI",
    technique: "Dense operational status cards, information density control, and WCAG AA contrast."
  },
  {
    id: 46,
    title: "Cross-Platform Token Suite (2025 Product)",
    category: "deck",
    categoryLabel: "Product & UX",
    path: "/photoshop/page17.png",
    year: "2025",
    tools: ["Figma Tokens", "Design Systems", "Vector Set"],
    specs: "Milestone Deck Page 17 • 300 DPI",
    technique: "Scalable color tokens, elevation layers, typographic rhythm, and iconography."
  },
  {
    id: 47,
    title: "AI-Augmented Creative Concept (2026 Master)",
    category: "deck",
    categoryLabel: "Product & UX",
    path: "/photoshop/page18.png",
    year: "2026",
    tools: ["Photoshop", "Generative Fill", "Human Curation"],
    specs: "Milestone Deck Page 18 • 300 DPI",
    technique: "Generative workflow synthesis, strict human artistic direction, and pixel polish."
  },
  {
    id: 48,
    title: "Spatial Navigation Architecture (2026 Master)",
    category: "deck",
    categoryLabel: "Product & UX",
    path: "/photoshop/page19.png",
    year: "2026",
    tools: ["Figma", "Prototyping", "Spatial UI"],
    specs: "Milestone Deck Page 19 • 300 DPI",
    technique: "Context-aware progressive disclosure, depth layering, and ergonomic hit targets."
  },
  {
    id: 49,
    title: "Glassmorphic Lighting Model (2026 Master)",
    category: "deck",
    categoryLabel: "Product & UX",
    path: "/photoshop/page20.png",
    year: "2026",
    tools: ["Tailwind CSS", "Photoshop", "Shader Math"],
    specs: "Milestone Deck Page 20 • 300 DPI",
    technique: "Calibrated backdrop blur, 1px specular micro-borders, and radiant gold glow."
  },
  {
    id: 50,
    title: "Unified Design Manifesto: Art, UX & Code (2026)",
    category: "deck",
    categoryLabel: "Product & UX",
    path: "/photoshop/page21.png",
    year: "2026",
    tools: ["Next.js", "TypeScript", "WCAG AA", "Figma"],
    specs: "Milestone Deck Page 21 • 300 DPI",
    technique: "Synthesis of visual craft, ergonomic UX heuristics, and production engineering rigor."
  }
];

const CATEGORIES = [
  { id: "all", label: "All Works", count: 50 },
  { id: "advertising", label: "Commercial & Brands", count: 8 },
  { id: "compositing", label: "Matte & Compositing", count: 10 },
  { id: "posters", label: "Theatrical Posters", count: 4 },
  { id: "editorial", label: "Editorial & Flyers", count: 7 },
  { id: "deck", label: "Master Milestone Decks", count: 21 },
] as const;

export default function PhotoshopGallery() {
  const [accent, setAccent] = useState<"gold" | "blue" | "violet">("gold");
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Sync Accent from Profile
  useEffect(() => {
    setMounted(true);
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.accent) {
          setAccent(parsed.accent);
        }
      } catch (e) {
        console.error("Failed to parse profile accent", e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-accent", accent);
    }
  }, [accent, mounted]);

  // Filtered Artworks
  const filteredArtworks = useMemo(() => {
    if (activeCategory === "all") return ALL_ARTWORKS;
    return ALL_ARTWORKS.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (lightboxIdx === null) return;
    setZoomLevel(1);
    setLightboxIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredArtworks.length - 1));
  }, [lightboxIdx, filteredArtworks.length]);

  const handleNext = useCallback(() => {
    if (lightboxIdx === null) return;
    setZoomLevel(1);
    setLightboxIdx((prev) => (prev !== null && prev < filteredArtworks.length - 1 ? prev + 1 : 0));
  }, [lightboxIdx, filteredArtworks.length]);

  const handleClose = useCallback(() => {
    setLightboxIdx(null);
    setZoomLevel(1);
    setIsFullscreen(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") handleClose();
      if (e.key === "+" || e.key === "=") setZoomLevel((z) => Math.min(z + 0.25, 3));
      if (e.key === "-") setZoomLevel((z) => Math.max(z - 0.25, 0.75));
      if (e.key === "0") setZoomLevel(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIdx, handlePrev, handleNext, handleClose]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentArtwork = lightboxIdx !== null ? filteredArtworks[lightboxIdx] : null;

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden pb-24 font-sans selection:bg-gold/30 selection:text-gold-light">
      
      {/* 3D WebGL Ambient Particles Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <BackgroundParticles accent={accent} />
      </div>

      {/* Decorative glows */}
      <div className="absolute top-[5%] left-[-10%] w-[500px] h-[500px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-[35%] right-[-10%] w-[550px] h-[550px] bg-[#00E5FF]/5 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[450px] h-[450px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        
        {/* Navigation / Header Area */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 border-b border-white/5 pb-8">
          
          {/* Back Home trigger */}
          <Link 
            href="/"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-white/10 bg-black/50 hover:border-gold hover:text-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300 group cursor-pointer text-xs font-bold uppercase tracking-wider text-gray-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home Base</span>
          </Link>

          {/* Heading badge */}
          <div className="flex items-center space-x-2.5 text-gold bg-gold/5 border border-gold/20 px-4 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 animate-pulse-slow" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-extrabold select-none">
              Master Graphic Design & Matte Art Vault
            </span>
            <Sparkles className="w-4 h-4 animate-pulse-slow" />
          </div>

          {/* Link to Evolution Section on main page */}
          <Link
            href="/#evolution"
            className="text-xs font-mono text-gray-400 hover:text-gold transition-colors flex items-center space-x-1 uppercase tracking-wider"
          >
            <span>View 2020→2026 Trajectory</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </header>

        {/* Main Title Banner */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-gold" />
            <span>50 Curated High-Definition Deliverables</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-none">
            PHOTOSHOP & GRAPHIC <span className="text-gradient-gold">MASTERWORKS</span>
          </h1>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shadow-[0_0_12px_#D4AF37]" />
          <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            From high-stakes commercial ad campaigns and cinematic movie posters to multi-layer matte paintings, frequency separation retouching, and 26-page architectural executive decks. Click any artwork to launch the high-resolution viewport.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setLightboxIdx(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 border cursor-pointer ${
                  isActive
                    ? "bg-gold text-black border-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                    : "bg-black/60 text-gray-400 border-white/10 hover:border-gold/40 hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive ? "bg-black/20 text-black font-extrabold" : "bg-white/10 text-gray-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Artworks Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((art, idx) => (
              <motion.article
                layout
                key={`${art.category}-${art.id}`}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.3) }}
                onClick={() => setLightboxIdx(idx)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-xl cursor-pointer hover:border-gold/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all duration-300"
              >
                {/* Thumbnail image scan */}
                <Image
                  src={art.path}
                  alt={art.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                />

                {/* Permanent subtle top tag */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-wider text-gold-light font-bold">
                    {art.categoryLabel}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5 z-10">
                  <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono text-gray-300">
                    {art.year}
                  </span>
                </div>

                {/* Glass overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-20">
                  <div className="flex justify-end pt-8">
                    <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider block">
                      #{art.id.toString().padStart(2, "0")} · {art.specs}
                    </span>
                    <h3 className="font-extrabold text-sm text-white leading-tight uppercase line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                      {art.technique}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Footer Banner */}
        <div className="mt-20 p-8 rounded-2xl glass-card border border-white/10 bg-white/[0.02] text-center flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2 text-xs text-gold font-bold uppercase tracking-widest">
            <ImageIcon className="w-4 h-4 text-gold" />
            <span>50-Work Full High-Fidelity Archive</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
            All artworks represent real production client assets, commercial advertising deliverables, and design system milestones designed by Prashant Sisodhiya.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <Link
              href="/"
              className="px-6 py-2.5 bg-gold text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-gold-light transition-all duration-300 shadow-[0_4px_16px_rgba(212,175,55,0.25)] cursor-pointer"
            >
              Back to Portfolio
            </Link>
            <Link
              href="/#evolution"
              className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer"
            >
              Explore Evolution Decks
            </Link>
          </div>
        </div>

      </div>

      {/* ── High-Resolution Lightbox Viewport ─────────────────── */}
      <AnimatePresence>
        {currentArtwork && lightboxIdx !== null && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-md select-none"
            role="dialog"
            aria-modal="true"
            aria-label={`Artwork detail: ${currentArtwork.title}`}
          >
            {/* Clickable Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 cursor-pointer"
            />

            {/* Lightbox content box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`relative ${
                isFullscreen ? "w-screen h-screen rounded-none" : "max-w-6xl w-full h-[90vh] rounded-2xl"
              } flex flex-col justify-between z-10 bg-[#0A0A0A] border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden`}
            >
              {/* Upper Header Control Bar */}
              <div className="flex justify-between items-center bg-black/75 backdrop-blur-md border-b border-white/10 px-4 py-3 text-white">
                <div className="min-w-0 pr-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider">
                      {lightboxIdx + 1} of {filteredArtworks.length}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">•</span>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                      {currentArtwork.categoryLabel} ({currentArtwork.year})
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wide truncate">
                    {currentArtwork.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {/* Zoom Controls */}
                  <div className="hidden sm:flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 3))}
                      className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors"
                      title="Zoom In (+)"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                      className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors"
                      title="Zoom Out (-)"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(1)}
                      className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors text-[10px] font-mono"
                      title="Reset Zoom (0)"
                      aria-label="Reset zoom"
                    >
                      {Math.round(zoomLevel * 100)}%
                    </button>
                  </div>

                  {/* Fullscreen Toggle */}
                  <button
                    onClick={() => setIsFullscreen((f) => !f)}
                    className="p-2 text-gray-400 hover:text-white rounded-lg bg-white/5 border border-white/10 hover:border-gold/40 transition-colors"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    aria-label="Toggle fullscreen"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>

                  {/* File Download Anchor */}
                  <a
                    href={currentArtwork.path}
                    download={`Prashant-Artwork-${currentArtwork.id}-${currentArtwork.title.replace(/\s+/g, "-")}.png`}
                    className="p-2 text-gray-400 hover:text-gold rounded-lg bg-white/5 border border-white/10 hover:border-gold/40 transition-colors"
                    title="Download High-Res Master"
                    aria-label="Download image"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="p-2 text-gray-400 hover:text-red-400 rounded-lg bg-white/5 border border-white/10 hover:border-red-400/40 transition-colors"
                    aria-label="Close lightbox"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Center Image Container */}
              <div className="relative flex-1 bg-[#050505] overflow-hidden flex items-center justify-center p-2 sm:p-4">
                <div 
                  className="relative w-full h-full transition-transform duration-200 flex items-center justify-center"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <Image
                    src={currentArtwork.path}
                    alt={currentArtwork.title}
                    fill
                    priority
                    unoptimized
                    className="object-contain select-none"
                  />
                </div>

                {/* Left navigation arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-6 p-3 rounded-full bg-black/75 backdrop-blur-md border border-white/15 hover:border-gold hover:text-gold text-gray-300 transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 z-20"
                  aria-label="Previous artwork"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right navigation arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 sm:right-6 p-3 rounded-full bg-black/75 backdrop-blur-md border border-white/15 hover:border-gold hover:text-gold text-gray-300 transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 z-20"
                  aria-label="Next artwork"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lower Info & Metadata Bar */}
              <div className="bg-black/85 backdrop-blur-md border-t border-white/10 px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-gray-400">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-gray-300 font-bold">
                    {currentArtwork.specs}
                  </span>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <span className="text-gray-300 text-[11px]">
                    {currentArtwork.technique}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  {currentArtwork.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-[9px] uppercase tracking-wider text-gold-light border border-gold/30 px-2 py-0.5 rounded bg-gold/5"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
