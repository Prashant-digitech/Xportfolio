"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronLeft, ChevronRight, X, ArrowLeft, Sparkles, Download, ImageIcon, Eye, 
  ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, Filter, Layers, Check, ExternalLink,
  Printer, ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundParticles from "@/components/BackgroundParticles";
import FlyerScrollOverlay from "@/components/FlyerScrollOverlay";

export interface PhotoshopArtwork {
  id: number;
  title: string;
  category: "flyers" | "advertising" | "posters" | "editorial" | "invitations" | "compositing" | "retouching" | "social";
  categoryLabel: string;
  path: string;
  year: string;
  tools: string[];
  specs: string;
  technique: string;
}

// 50 Master Works from Prashant's Creative Library (Categorized by Showcase)
const ALL_ARTWORKS: PhotoshopArtwork[] = [
  // ── 1. Flyers Collection (1-5) ──────────────────────────────────────
  {
    id: 1,
    title: "Corporate Direct-Response Business Flyer",
    category: "flyers",
    categoryLabel: "Marketing Flyer",
    path: "/images/graphics/my-work/flyer.png",
    year: "2023",
    tools: ["InDesign", "Illustrator", "Photoshop", "Z-Pattern Scan"],
    specs: "A5 Double-Sided • 300 DPI CMYK Print Master",
    technique: "High-conversion Z-pattern visual scan, modular pricing matrix, and high-visibility CTAs."
  },
  {
    id: 2,
    title: "Executive Business Summit & Conference Flyer",
    category: "flyers",
    categoryLabel: "Conference Flyer",
    path: "/images/graphics/my-work/flyer1.png",
    year: "2024",
    tools: ["Swiss Grid", "InDesign", "Illustrator", "Typography"],
    specs: "A4 Master • 300 DPI Bleed Certified",
    technique: "Structured Swiss grid timetable, executive keynote hierarchy, and corporate slate typography."
  },
  {
    id: 3,
    title: "Modern Tech Enterprise Solutions Flyer",
    category: "flyers",
    categoryLabel: "Enterprise Flyer",
    path: "/images/graphics/my-work/flyer2.png",
    year: "2024",
    tools: ["Illustrator", "Photoshop", "Vector Tokens", "Dark Mode"],
    specs: "Double-Sided A5 • 300 DPI Offset • Spot UV",
    technique: "Dark mode visual aesthetics, scannable 3-column capability matrix, and enterprise compliance badges."
  },
  {
    id: 4,
    title: "Creative Agency Portfolio & Services Flyer",
    category: "flyers",
    categoryLabel: "Agency Flyer",
    path: "/images/graphics/my-work/flyer3.png",
    year: "2024",
    tools: ["InDesign", "Photoshop", "Color Curation", "Gold Foil"],
    specs: "Commercial Print Master • 300 DPI CMYK",
    technique: "Dynamic diagonal geometric cuts, high-fidelity project vignettes, and gold foil registration marks."
  },
  {
    id: 5,
    title: "Retail Seasonal Campaign Promotional Leaflet",
    category: "flyers",
    categoryLabel: "Retail Flyer",
    path: "/images/graphics/my-work/flyer4.png",
    year: "2024",
    tools: ["Photoshop", "Illustrator", "Commercial Print", "QR Code"],
    specs: "Mass-Distribution Print Master • CMYK Offset",
    technique: "High-contrast discount percentage bursts, 3D product hero framing, and instant store QR codes."
  },

  // ── 2. Commercial Advertising & Brand Campaigns (6-14) ──────────────
  {
    id: 6,
    title: "Belle Haute Parfumerie Luxury Campaign",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/ads beelle.png",
    year: "2024",
    tools: ["Photoshop CC", "Camera Raw", "Frequency Separation", "Typography"],
    specs: "4500×6000px • 300 DPI • Print Ready",
    technique: "Refractive glass lighting passes, micro floral dispersion, and gold foil serif typography."
  },
  {
    id: 7,
    title: "Performance Audio Commercial Keyart",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/ads.png",
    year: "2023",
    tools: ["Photoshop", "Lightroom", "Volumetric Lighting"],
    specs: "4K Master • 16-Bit Color Depth",
    technique: "Dynamic acoustic soundwave particle flow, precision bevel lighting, and studio metallic reflections."
  },
  {
    id: 8,
    title: "boAt Lifestyle Audio Commercial Keyart",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/boat ad.png",
    year: "2024",
    tools: ["Photoshop CC", "Water Splash Dynamics", "Camera Raw", "Color Grading"],
    specs: "4K Master • 300 DPI Commercial Print",
    technique: "High-speed water fluid splash compositing, zero-gravity levitation, and neon driver accents."
  },
  {
    id: 9,
    title: "Artisan Molten Chocolate Splash Composite",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/chocolate ad.png",
    year: "2023",
    tools: ["Photoshop", "Liquid Blending", "Multi-Pass Lighting"],
    specs: "300 DPI CMYK Print Master",
    technique: "Multi-exposure macro liquid splash masking, gloss specular mapping, and cocoa powder dispersion."
  },
  {
    id: 10,
    title: "Denver Men's Grooming Chiaroscuro Campaign",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/denver ad.png",
    year: "2023",
    tools: ["Photoshop", "Illustrator", "Matte Composite"],
    specs: "Billboard & Digital Display • 300 DPI",
    technique: "Chiaroscuro studio keys, atmospheric smoke haze, and embossed masculine brand typography."
  },
  {
    id: 11,
    title: "Next-Gen Smartphone Flagship Launch",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/ipone-ad.png",
    year: "2024",
    tools: ["Photoshop", "Optic Flares", "Vector Masking"],
    specs: "Retina Digital Keynote Master",
    technique: "Custom glass bevel lighting, optical dispersion lens flares, and titanium highlight passes."
  },
  {
    id: 12,
    title: "Haute Horlogerie Luxury Timepiece Keyart",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/luxuryad.png",
    year: "2023",
    tools: ["Photoshop", "Macro Lighting", "Focus Stacking"],
    specs: "300 DPI Fine Art Magazine Spread",
    technique: "Focus-stacked tourbillon mechanical detailing, sapphire crystal reflections, and gold sheen."
  },
  {
    id: 13,
    title: "Nike Athletic Performance Commercial Campaign",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/nike ad.png",
    year: "2024",
    tools: ["Photoshop CC", "Kinetic Particle Emitters", "Typography"],
    specs: "Omni-Channel Stadium Billboard & Paid Social",
    technique: "High-velocity explosive particle geometry, high-contrast rim glows, and kinetic typography velocity."
  },
  {
    id: 14,
    title: "Athletic Footwear Kinetic Particle Keyart",
    category: "advertising",
    categoryLabel: "Commercial Ad",
    path: "/images/graphics/my-work/shoe ad.png",
    year: "2023",
    tools: ["Photoshop", "Action Particle FX", "Velocity Blur"],
    specs: "Omni-Channel Social & Stadium Billboard",
    technique: "Zero-gravity sole disintegration particles and aerodynamic air vortex shockwaves."
  },

  // ── 3. Theatrical Movie Posters & Cinema Keyart (15-19) ─────────────
  {
    id: 15,
    title: "Cinematic Action Blockbuster Theatrical One-Sheet",
    category: "posters",
    categoryLabel: "Movie Poster",
    path: "/images/graphics/my-work/movie poster1.png",
    year: "2023",
    tools: ["Photoshop CC", "Title Typographic Kerning", "Cinema Grading"],
    specs: "27×40 in Studio One-Sheet • 300 DPI",
    technique: "High-octane hero composition, explosive debris particle blending, and studio billing blocks."
  },
  {
    id: 16,
    title: "Psychological Thriller Theatrical Keyart",
    category: "posters",
    categoryLabel: "Movie Poster",
    path: "/images/graphics/my-work/movie poster2.png",
    year: "2023",
    tools: ["Photoshop", "Illustrator", "Billing Block Kerning"],
    specs: "27×40 in Studio One-Sheet",
    technique: "Shattered glass refraction passes, crimson title accent, and studio credit billing typography."
  },
  {
    id: 17,
    title: "Cyberpunk Sci-Fi Cinema IMAX Blockbuster",
    category: "posters",
    categoryLabel: "Movie Poster",
    path: "/images/graphics/my-work/movie poster3.png",
    year: "2023",
    tools: ["Photoshop CC", "Cinema 3D Passes", "Color Grading"],
    specs: "Theatrical One-Sheet • IMAX Lightbox",
    technique: "Rain-slicked neon skyscrapers, cybernetic character integration, and anamorphic flare bloom."
  },
  {
    id: 18,
    title: "Grimdark Supernatural Horror Keyart",
    category: "posters",
    categoryLabel: "Movie Poster",
    path: "/images/graphics/my-work/movie poster4.png",
    year: "2023",
    tools: ["Photoshop", "Texture Blending", "Typography Kerning"],
    specs: "Theatrical Cinema Release • 300 DPI",
    technique: "Distressed parchment texture overlays, suffocating fog silhouettes, and weathered serif title."
  },
  {
    id: 19,
    title: "Epic Action Adventure Theatrical Poster",
    category: "posters",
    categoryLabel: "Movie Poster",
    path: "/images/graphics/my-work/movie poster5.png",
    year: "2023",
    tools: ["Photoshop", "Particle Dynamics", "Title Design"],
    specs: "27×40 Studio One-Sheet CMYK",
    technique: "Multi-layered spark/debris emitters, heroic triangle lighting, and 3D embossed metallic title."
  },

  // ── 4. Magazines & Editorial Publications (20-27) ───────────────────
  {
    id: 20,
    title: "Fashion & Culture Editorial Spread v1",
    category: "editorial",
    categoryLabel: "Magazine Spread",
    path: "/images/graphics/my-work/magazine.png",
    year: "2023",
    tools: ["InDesign", "Photoshop", "Typography Pairing"],
    specs: "Newsstand A4 Spread • Spot Varnishing",
    technique: "Strict baseline grid alignment, optical kerning pairs, and asymmetric editorial photography."
  },
  {
    id: 21,
    title: "High-Fashion Editorial Publication Cover",
    category: "editorial",
    categoryLabel: "Magazine Cover",
    path: "/images/graphics/my-work/magazine1.png",
    year: "2024",
    tools: ["InDesign", "Photoshop", "Masthead Typography"],
    specs: "A4 Trim • Newsstand UV Coated",
    technique: "Overlapping portrait silhouette across masthead typography and luxury editorial pacing."
  },
  {
    id: 22,
    title: "Contemporary Architectural Journal Spread v2",
    category: "editorial",
    categoryLabel: "Architectural Journal",
    path: "/images/graphics/my-work/magazine2.png",
    year: "2023",
    tools: ["InDesign", "Photoshop", "Grid Architecture"],
    specs: "Double Page Spread • CMYK Offset",
    technique: "Swiss typography discipline, generous negative space, and architectural line drawings."
  },
  {
    id: 23,
    title: "Architectural Form & Structure Feature Spread",
    category: "editorial",
    categoryLabel: "Architecture Spread",
    path: "/images/graphics/my-work/magazine2 (2).png",
    year: "2024",
    tools: ["InDesign", "Swiss Grid", "Photoshop"],
    specs: "Double Page Spread • 300 DPI Fine Art Print",
    technique: "Proportional column ratios, structural framing, and high-contrast geometric layout."
  },
  {
    id: 24,
    title: "Modern Lifestyle & Urban Culture Publication",
    category: "editorial",
    categoryLabel: "Culture Magazine",
    path: "/images/graphics/my-work/magazine3.png",
    year: "2024",
    tools: ["InDesign", "Photoshop", "Color Palette"],
    specs: "A4 Double Page Feature • 300 DPI",
    technique: "Editorial narrative pull quotes, multi-column reading ergonomics, and calibrated margins."
  },
  {
    id: 25,
    title: "Avant-Garde Typography & Grid Architecture",
    category: "editorial",
    categoryLabel: "Editorial Layout",
    path: "/images/graphics/my-work/magazine4.png",
    year: "2024",
    tools: ["InDesign", "Illustrator", "Grid Systems"],
    specs: "Design Biennial Monograph Spread",
    technique: "Experimental typographic weight pairing, modular column rhythm, and artistic negative space."
  },
  {
    id: 26,
    title: "Creative Arts & Visual Storytelling Monograph",
    category: "editorial",
    categoryLabel: "Arts Monograph",
    path: "/images/graphics/my-work/magazine5.png",
    year: "2024",
    tools: ["Photoshop", "InDesign", "Fine Art Layout"],
    specs: "Case-Bound Art Book Spread",
    technique: "Gallery-standard exhibition catalog format, archival paper tone simulation, and caption hierarchy."
  },
  {
    id: 27,
    title: "International Design Review Editorial Journal",
    category: "editorial",
    categoryLabel: "Design Review",
    path: "/images/graphics/my-work/magazine7.png",
    year: "2024",
    tools: ["InDesign", "Typography", "Offset Specs"],
    specs: "Quarterly Design Journal Spread",
    technique: "Refined serif body text, structured multi-tier subheadings, and high-resolution plate insets."
  },

  // ── 5. Invitations & Bespoke Stationery (28-31) ─────────────────────
  {
    id: 28,
    title: "Luxury Gold Foil Gala Invitation Card v1",
    category: "invitations",
    categoryLabel: "Bespoke Invitation",
    path: "/images/graphics/my-work/invitation1.png",
    year: "2024",
    tools: ["Illustrator", "Photoshop Texturing", "Foil Plates"],
    specs: "5×7 in Custom Die-Cut • Metallic Gold Foil",
    technique: "Foil plate vector separation layers, blind deboss registration marks, and luxury serif typography."
  },
  {
    id: 29,
    title: "Minimalist Royal Wedding & Formal Stationery v2",
    category: "invitations",
    categoryLabel: "Wedding Stationery",
    path: "/images/graphics/my-work/invitation2.png",
    year: "2024",
    tools: ["Illustrator", "Photoshop 3D", "Typography"],
    specs: "Fine Art Cotton Cardstock • 300 DPI",
    technique: "Refined minimalist framing, hand-crafted calligraphic monograms, and tactile cardstock texture."
  },
  {
    id: 30,
    title: "Bespoke Executive Celebration Invitation v3",
    category: "invitations",
    categoryLabel: "Executive Invitation",
    path: "/images/graphics/my-work/invitation 3.png",
    year: "2024",
    tools: ["Illustrator", "InDesign", "Die-Cut Specs"],
    specs: "Custom Envelope & RSVP Card Suite",
    technique: "Geometric gold foil filigree accents, understated luxury palette, and formal event hierarchy."
  },
  {
    id: 31,
    title: "Artisan Embossed Botanical Event Stationery v4",
    category: "invitations",
    categoryLabel: "Event Stationery",
    path: "/images/graphics/my-work/invitation4.png",
    year: "2024",
    tools: ["Illustrator", "Photoshop", "Emboss Maps"],
    specs: "Textured Linen Card • Spot Gold Varnish",
    technique: "Delicate botanical contour vector illustrations, embossed relief channels, and luxury typography."
  },

  // ── 6. Surreal Photo Manipulation & World Building (32-42) ───────────
  {
    id: 32,
    title: "Mythological Titan Ruins Digital Matte Painting",
    category: "compositing",
    categoryLabel: "Matte Painting",
    path: "/images/graphics/my-work/manipulation1.png",
    year: "2023",
    tools: ["Photoshop", "Matte Painting Brushes", "Atmospheric Haze"],
    specs: "Panoramic Master • 6000×3200px",
    technique: "Scale-establishing character silhouette against colossal ancient titan ruins with aerial depth cues."
  },
  {
    id: 33,
    title: "Celestial Titan Cosmic Matte Painting v2",
    category: "compositing",
    categoryLabel: "Matte Painting",
    path: "/images/graphics/my-work/manipulation2.png",
    year: "2024",
    tools: ["Photoshop CC", "Matte Painting", "Nebula Textures"],
    specs: "Ultra-Wide Cinematic Canvas • 16-Bit Color",
    technique: "Planetary ring structures, celestial nebula vortexes, and solitary human exploratory perspective."
  },
  {
    id: 34,
    title: "Bioluminescent Nightscape Fantasy Manipulation",
    category: "compositing",
    categoryLabel: "Surreal Composite",
    path: "/images/graphics/my-work/manipulation glow.png",
    year: "2023",
    tools: ["Photoshop CC", "Digital Painting", "Color Dodge Modes"],
    specs: "Ultra-HD Digital Artwork • 56 Layers",
    technique: "Multi-layered color dodge glow channels and volumetric night fog atmospheric scatter."
  },
  {
    id: 35,
    title: "Ethereal Botanical Surreal Portrait",
    category: "compositing",
    categoryLabel: "Surreal Composite",
    path: "/images/graphics/my-work/manipulation girl and flower.png",
    year: "2024",
    tools: ["Photoshop CC", "Botanical Masking", "Volumetric Glow", "Lightroom"],
    specs: "Ultra-HD Fine Art Print • 300 DPI",
    technique: "Organic floral hair blending, delicate butterfly dispersion, and soft rim lighting keys."
  },
  {
    id: 36,
    title: "Mystic Ancient Realm Environment Composite",
    category: "compositing",
    categoryLabel: "World Building",
    path: "/images/graphics/my-work/realm.png",
    year: "2024",
    tools: ["Photoshop CC", "Environment Matte Painting", "Water Dynamics"],
    specs: "Panoramic Environmental Master • 300 DPI",
    technique: "Crystalline architecture, cascading waterfall fluids, and aerial haze depth perspective."
  },
  {
    id: 37,
    title: "Dark Coven Sorceress Fantasy Keyart",
    category: "compositing",
    categoryLabel: "Dark Fantasy",
    path: "/images/graphics/my-work/witch.png",
    year: "2024",
    tools: ["Photoshop CC", "Arcane Glow Passes", "Fabric Texture Blending"],
    specs: "Theatrical Character Keyart • 300 DPI",
    technique: "Ember particle brushes, arcane spellcraft glows, and deep dramatic chiaroscuro."
  },
  {
    id: 38,
    title: "Submerged Aquatic Fantasy Matte Painting v1",
    category: "compositing",
    categoryLabel: "Aquatic Matte",
    path: "/images/graphics/my-work/underwater.png",
    year: "2024",
    tools: ["Photoshop CC", "Underwater Caustics", "Volumetric Light Rays"],
    specs: "Cinematic 4K Master • 16-Bit ProPhoto",
    technique: "Refractive sunlight water caustics, submerged particulate suspension, and depth color grading."
  },
  {
    id: 39,
    title: "Deep Sea Abyss Bioluminescent Concept v2",
    category: "compositing",
    categoryLabel: "Deep Sea Concept",
    path: "/images/graphics/my-work/underwater2.png",
    year: "2024",
    tools: ["Photoshop", "Bioluminescent Shaders", "Fog Scatter"],
    specs: "Digital Concept Art • 300 DPI",
    technique: "Abyssal trench lighting, bioluminescent organism glow passes, and atmospheric marine snow."
  },
  {
    id: 40,
    title: "Atmospheric Oceanic Exploration Keyart v3",
    category: "compositing",
    categoryLabel: "Oceanic Matte",
    path: "/images/graphics/my-work/underwater3.png",
    year: "2024",
    tools: ["Photoshop CC", "Fluid Compositing", "Underwater Grading"],
    specs: "Ultra-Wide Panoramic Canvas • 300 DPI",
    technique: "Deep oceanic exploration, sunken architectural remnants, and cinematic blue-cyan grading."
  },
  {
    id: 41,
    title: "VFX Atmospheric Glow & Particle Effects Showcase",
    category: "compositing",
    categoryLabel: "VFX Effects",
    path: "/images/graphics/my-work/effect shocasw.png",
    year: "2024",
    tools: ["Photoshop CC", "Particle Dynamics", "Lighting Passes"],
    specs: "Digital Art Master • 300 DPI",
    technique: "Specular spark emitters, chromatic light blooms, and high-energy magical displacement fields."
  },
  {
    id: 42,
    title: "Surreal Double Exposure Fine Art Portrait",
    category: "compositing",
    categoryLabel: "Fine Art",
    path: "/images/graphics/my-work/double exposure.png",
    year: "2022",
    tools: ["Photoshop CC", "Screen Blending", "Gradient Mapping"],
    specs: "Gallery Exhibition Print • 300 DPI",
    technique: "Luma silhouette keying merging portraiture with alpine wilderness and celestial nebulas."
  },

  // ── 7. Retouching, Color Grading & Restoration (43-48) ──────────────
  {
    id: 43,
    title: "High-End Beauty Skin Frequency Separation",
    category: "retouching",
    categoryLabel: "Skin Retouching",
    path: "/images/graphics/my-work/before after.png",
    year: "2022",
    tools: ["Photoshop CC", "Dual Frequency Separation", "Micro-Dodge & Burn"],
    specs: "Ultra-HD Portrait • Zero Texture Loss",
    technique: "High/low frequency spatial filtering strictly preserving natural dermal micropores."
  },
  {
    id: 44,
    title: "Camera Raw HDR Dynamic Range Color Grade",
    category: "retouching",
    categoryLabel: "Color Grading",
    path: "/images/graphics/my-work/camera raw.png",
    year: "2022",
    tools: ["Adobe Camera Raw", "Photoshop", "Curve Mastering"],
    specs: "6000×4000 RAW • ProPhoto RGB",
    technique: "Multi-stop exposure bracket merging and calibrated HSL split-toning."
  },
  {
    id: 45,
    title: "Historical Vintage Archive Photo Colorization",
    category: "retouching",
    categoryLabel: "Restoration",
    path: "/images/graphics/my-work/colorize.png",
    year: "2021",
    tools: ["Photoshop", "Luminance Masks", "Historical Archives"],
    specs: "Fine Art Archive Restoration • 48 Layers",
    technique: "Period-accurate textile tinting and multi-layer skin tone undertone balance."
  },
  {
    id: 46,
    title: "Fine Art Archival Recolorization Master Study",
    category: "retouching",
    categoryLabel: "Recolorization",
    path: "/images/graphics/my-work/recolorization.png",
    year: "2024",
    tools: ["Photoshop CC", "Selective Color", "Texture Inpainting"],
    specs: "Museum Curation Master • 300 DPI",
    technique: "Archival scratch removal, multi-pass historical color mapping, and specular preservation."
  },
  {
    id: 47,
    title: "Portrait Vintage Photo Restoration & Retouching",
    category: "retouching",
    categoryLabel: "Restoration",
    path: "/images/graphics/my-work/recolorize.png",
    year: "2024",
    tools: ["Photoshop", "Healing Brush", "Skin Tones"],
    specs: "Fine Art Restoration Print • 300 DPI",
    technique: "Facial contour reconstruction, grain harmonization, and lifelike skin tone gradation."
  },
  {
    id: 48,
    title: "Experimental Creative Typography & Masking Composition",
    category: "retouching",
    categoryLabel: "Creative Typography",
    path: "/images/graphics/my-work/typography.png",
    year: "2024",
    tools: ["Photoshop CC", "Clipping Masks", "Kerning Optimization"],
    specs: "Graphic Art Print • 300 DPI",
    technique: "Negative space letterform interlocks, multi-plane clipping masks, and bold contrast."
  },

  // ── 8. Social Media Creatives & Digital Branding (49-50) ─────────────
  {
    id: 49,
    title: "High-Converting Commercial Social Media Ad Post",
    category: "social",
    categoryLabel: "Social Ad",
    path: "/images/graphics/my-work/social media post.png",
    year: "2024",
    tools: ["Photoshop", "Illustrator", "Social Sizing"],
    specs: "1080×1080px Retina • Meta Verified",
    technique: "Thumb-stopping visual contrast, clear promotion hierarchy, and mobile CTA anchors."
  },
  {
    id: 50,
    title: "Instagram Reel & Story High-Impact Keyart",
    category: "social",
    categoryLabel: "Social Story",
    path: "/images/graphics/my-work/social real.png",
    year: "2024",
    tools: ["Photoshop CC", "Motion Stills", "Story Canvas"],
    specs: "1080×1920px Full Vertical HD",
    technique: "9:16 mobile viewport optimization, thumb-friendly safe zones, and vibrant branding."
  }
];

const CATEGORIES = [
  { id: "all", label: "All Works", count: 50 },
  { id: "flyers", label: "Flyers Collection", count: 5 },
  { id: "advertising", label: "Commercial & Brands", count: 9 },
  { id: "compositing", label: "Matte & Compositing", count: 11 },
  { id: "posters", label: "Theatrical Posters", count: 5 },
  { id: "editorial", label: "Editorial & Magazines", count: 8 },
  { id: "invitations", label: "Invitations & Cards", count: 4 },
  { id: "retouching", label: "Retouch & Color Grade", count: 6 },
  { id: "social", label: "Social Media Creatives", count: 2 },
] as const;

export default function PhotoshopGallery() {
  const [accent, setAccent] = useState<"gold" | "blue" | "violet">("gold");
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [flyerOverlayOpen, setFlyerOverlayOpen] = useState<boolean>(false);
  const [initialFlyerIdx, setInitialFlyerIdx] = useState<number>(0);

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
      if (flyerOverlayOpen) return; // Handled inside FlyerScrollOverlay
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
  }, [lightboxIdx, flyerOverlayOpen, handlePrev, handleNext, handleClose]);

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
              Master Graphic Design & Creative Works Vault
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
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-gold" />
            <span>50 Curated High-Definition Deliverables</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-none">
            PHOTOSHOP & GRAPHIC <span className="text-gradient-gold">MASTERWORKS</span>
          </h1>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shadow-[0_0_12px_#D4AF37]" />
          <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            All 50 verified commercial client artworks, marketing flyers, theatrical movie posters, luxury campaigns, editorial publication journals, and surreal matte paintings designed by Prashant Sisodhiya.
          </p>
        </div>

        {/* ── Spotlight Banner: All 5 Flyers Scrollable Viewport ── */}
        <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 via-[#00E5FF]/10 to-transparent border-2 border-[#D4AF37]/40 shadow-[0_0_35px_rgba(212,175,55,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#D4AF37] text-black flex items-center justify-center font-black shadow-lg shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#F5BA42]">
                  Print Collateral Special
                </span>
                <span className="px-2 py-0.5 rounded bg-black/40 text-[9px] font-mono text-cyan-300 font-bold border border-cyan-500/30">
                  5 Flyers Included
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight mt-0.5">
                Complete Commercial & Corporate Flyer Collection
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              setInitialFlyerIdx(0);
              setFlyerOverlayOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F5BA42] text-black font-black text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <span>Open All Flyers (Scrollable Viewport)</span>
            <ExternalLink className="w-4 h-4" />
          </button>
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
                onClick={() => {
                  if (art.category === "flyers") {
                    // Open in scrollable overlay format as requested
                    setInitialFlyerIdx(art.id - 1);
                    setFlyerOverlayOpen(true);
                  } else {
                    setLightboxIdx(idx);
                  }
                }}
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
                      {art.category === "flyers" ? <Printer className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider block">
                      #{art.id.toString().padStart(2, "0")} · {art.category === "flyers" ? "Click to open in scrollable overlay" : art.specs.split("•")[0]}
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
            <span>50-Work Authentic Production Archive</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
            All 50 deliverables represent authentic commercial client assets, marketing collateral, and design milestones created by Prashant Sisodhiya.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <Link
              href="/"
              className="px-6 py-2.5 bg-gold text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-gold-light transition-all duration-300 shadow-[0_4px_16px_rgba(212,175,55,0.25)] cursor-pointer"
            >
              Back to Portfolio
            </Link>
            <button
              onClick={() => {
                setInitialFlyerIdx(0);
                setFlyerOverlayOpen(true);
              }}
              className="px-6 py-2.5 bg-white/5 border border-[#D4AF37]/50 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#D4AF37]/15 hover:text-gold transition-all duration-300 cursor-pointer flex items-center space-x-1.5"
            >
              <span>Scrollable Flyer Overlay</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
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

      {/* ── All 5 Flyers Scrollable Viewport Overlay ── */}
      <FlyerScrollOverlay
        isOpen={flyerOverlayOpen}
        onClose={() => setFlyerOverlayOpen(false)}
        initialFlyerIndex={initialFlyerIdx}
      />

    </div>
  );
}
