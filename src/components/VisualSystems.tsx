"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Palette, X, ZoomIn, ZoomOut, RotateCcw,
  ArrowRight, ArrowLeft, ExternalLink, Sparkles,
  Layers, Maximize2, CheckCircle2, SlidersHorizontal,
  ChevronLeft, ChevronRight
} from "lucide-react";

export interface GraphicItem {
  id: string;
  title: string;
  category: "brand" | "graphic" | "compositing" | "editorial";
  badge: string;
  description: string;
  image: string;
  tools: string[];
  specs: string;
  concept?: string;
  sketch?: string;
  construction?: string;
  application?: string;
}

/* ─── Focus Trap Hook ─────────────────────────────────────── */
function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active || !containerRef.current) return;
    const el = containerRef.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [active, containerRef]);
}

export default function VisualSystems() {
  const [activeTab, setActiveTab] = useState<"all" | "graphic" | "compositing" | "editorial" | "brand">("all");
  const [selectedItem, setSelectedItem] = useState<GraphicItem | null>(null);
  const [activeLogoStep, setActiveLogoStep] = useState<"concept" | "sketch" | "construction" | "final" | "application">("final");
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);

  /* ─── Scroll-trigger refs ─────────────────────────────── */
  const sectionRef = useRef<HTMLElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const matrixInView = useInView(matrixRef, { once: true, margin: "-60px" });
  const brandInView = useInView(brandRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  /* ─── Comprehensive 30-Artwork Vault ─────────────────── */
  const graphicWorks: GraphicItem[] = [
    // 01: Belle Fragrance
    {
      id: "belle-fragrance",
      title: "Belle Luxury Fragrance Campaign",
      category: "graphic",
      badge: "Luxury Commercial Ad",
      description: "Haute parfumerie advertising keyart featuring calibrated refractive glass reflections, floral dispersion particles, and luxury serif typography.",
      image: "/images/graphics/my-work/ads beelle.png",
      tools: ["Photoshop CC", "Camera Raw", "Frequency Separation", "Typography"],
      specs: "4500×6000px • 300 DPI • Print & Billboard Ready",
      concept: "Convey sensual luxury and ethereal floral weightlessness through translucent refractive glass rendering.",
      construction: "Multi-point specular lighting passes, custom floral particle brushes, and micro-curve contrast grading.",
      application: "Vogue magazine full-page spread, luxury boutique lightboxes, and digital brand launch.",
    },
    // 02: Performance Audio Ad
    {
      id: "audio-ad",
      title: "Performance Audio Commercial Keyart",
      category: "graphic",
      badge: "Product Advertising",
      description: "Commercial product advertising composite with dramatic rim lighting, sonic soundwave particle dynamics, and precision metallic reflections.",
      image: "/images/graphics/my-work/ads.png",
      tools: ["Photoshop", "Lightroom", "Volumetric Lighting"],
      specs: "4K Master • 16-Bit Color Depth",
      concept: "Synthesize acoustic acoustic power into kinetic visual waveforms wrapping the industrial product hardware.",
      construction: "Bevel edge lighting, luminance dodging, and custom sonic particle velocity fields.",
      application: "E-commerce hero product splash, consumer tech billboards, and global social campaign.",
    },
    // 03: Beauty Skin Retouching
    {
      id: "beauty-retouching",
      title: "High-End Beauty & Skin Retouching",
      category: "compositing",
      badge: "Frequency Separation Master",
      description: "Before/After high-end portrait retouching utilizing dual frequency separation, micro-dodge & burn texture preservation, and tonal balancing.",
      image: "/images/graphics/my-work/before after.png",
      tools: ["Photoshop CC", "Wacom Intuos", "Color Grading LUTs"],
      specs: "Ultra-HD Portrait • Zero Texture Loss",
      concept: "Flawless commercial beauty polish while strictly preserving organic skin micropore integrity.",
      construction: "High/low frequency texture separation, selective color lookup grading, and iris luminosity enhancement.",
      application: "Cosmetics packaging, international beauty lookbooks, and high-fashion editorial print.",
    },
    // 04: Camera Raw HDR
    {
      id: "camera-raw-hdr",
      title: "Camera Raw HDR Dynamic Range Grading",
      category: "compositing",
      badge: "Camera Raw • HDR Grade",
      description: "Advanced tone mapping and high-dynamic-range color science extraction preserving shadow fidelity, sky luminosity, and micro-contrast.",
      image: "/images/graphics/my-work/camera raw.png",
      tools: ["Adobe Camera Raw", "Photoshop", "Curve Mastering"],
      specs: "6000×4000 RAW • ProPhoto RGB",
      concept: "Maximal dynamic range extraction reproducing the human eye's natural multi-stop exposure perception.",
      construction: "Exposure bracket blending, calibrated HSL split-toning, and dehaze volumetric balancing.",
      application: "Cinematography stills, landscape fine art exhibitions, and commercial architectural print.",
    },
    // 05: Artisan Chocolate Splash
    {
      id: "chocolate-splash",
      title: "Artisan Chocolate Splash Composite",
      category: "graphic",
      badge: "Commercial Food Composite",
      description: "High-speed macro liquid splash compositing merging multiple fluid captures, cocoa powder dispersion, and mouth-watering specular highlights.",
      image: "/images/graphics/my-work/chocolate ad.png",
      tools: ["Photoshop", "Liquid Blending", "Multi-Pass Lighting"],
      specs: "300 DPI CMYK Print Master",
      concept: "Sensory decadence: capture the visceral moment molten chocolate collides with crispy roasted nuts.",
      construction: "Multi-exposure liquid splash masking, gloss specular mapping, and depth-of-field feathering.",
      application: "Packaging point-of-sale displays, confectionary retail billboards, and brand motion stills.",
    },
    // 06: Photo Colorization
    {
      id: "photo-colorization",
      title: "Historical Archive Photo Colorization",
      category: "compositing",
      badge: "Historical Restoration",
      description: "Full historical archival photo restoration and realistic multi-layer colorization grounded in period-accurate textile and skin tone research.",
      image: "/images/graphics/my-work/colorize.png",
      tools: ["Photoshop", "Luminance Masks", "Historical Palette Matching"],
      specs: "Fine Art Archive Restoration • 48 Layers",
      concept: "Breathe vivid life into vintage historical imagery while maintaining solemn archival integrity.",
      construction: "Dust/scratch removal, base skin tone tinting, ambient specular balancing, and historical textile matching.",
      application: "Museum historical curation, documentary book publications, and heritage archives.",
    },
    // 07: Denver Men Grooming
    {
      id: "denver-grooming",
      title: "Denver Grooming Keyart Advertising",
      category: "graphic",
      badge: "Men Grooming Campaign",
      description: "Theatrical masculine grooming advertising keyart featuring atmospheric chiaroscuro lighting, subtle smoke haze, and bold brand typography.",
      image: "/images/graphics/my-work/denver ad.png",
      tools: ["Photoshop", "Illustrator", "Matte Composite"],
      specs: "Outdoor Billboard & Digital Display",
      concept: "Rugged sophistication: bold magnetic brand presence tailored for modern discerning gentlemen.",
      construction: "Chiaroscuro studio lighting keys, textured carbon backdrops, and foil embossed logo treatments.",
      application: "Metro airport advertising panels, digital display ads, and point-of-sale retail stands.",
    },
    // 08: Double Exposure Art
    {
      id: "double-exposure-art",
      title: "Surreal Double Exposure Fine Art",
      category: "compositing",
      badge: "Double Exposure Art",
      description: "Poetic fine art composite seamlessly blending human silhouette portraiture with deep alpine forest landscape and celestial nebula gradients.",
      image: "/images/graphics/my-work/double exposure.png",
      tools: ["Photoshop CC", "Screen Blending", "Gradient Mapping"],
      specs: "Gallery Exhibition Print • 300 DPI",
      concept: "Visualizing the philosophical unity between human consciousness and primordial wilderness.",
      construction: "Luma silhouette keying, screen transfer blend modes, and dual-tone gradient harmonization.",
      application: "Fine art canvas gallery prints, indie album vinyl jackets, and conceptual design posters.",
    },
    // 09: Business Direct Response Flyer
    {
      id: "direct-response-flyer",
      title: "Corporate Direct-Response Business Flyer",
      category: "editorial",
      badge: "Marketing Collateral",
      description: "Structured commercial marketing collateral designed with clean geometric information hierarchy, conversion-driven typography, and brand tokens.",
      image: "/images/graphics/my-work/flyer.png",
      tools: ["InDesign", "Illustrator", "Photoshop"],
      specs: "A5 Double-Sided • Print Ready CMYK",
      concept: "Maximize sales conversion through rigorous Z-pattern visual flow and instant offer scanability.",
      construction: "Modular card layouts, bleed/slug margin alignment, and high-visibility CTA callouts.",
      application: "Corporate enterprise outreach, conference attendee packs, and direct-mail campaigns.",
    },
    // 10: Next-Gen Smartphone Keynote
    {
      id: "smartphone-keynote",
      title: "Next-Gen Smartphone Keynote Ad",
      category: "graphic",
      badge: "Tech Hardware Campaign",
      description: "Futuristic consumer electronics launch keyart featuring holographic optic flares, bevel light sweeps, and cinematic dark mode aesthetics.",
      image: "/images/graphics/my-work/ipone-ad.png",
      tools: ["Photoshop", "Optic Flares", "Vector Masking"],
      specs: "Digital Keynote Master • Retina Verified",
      concept: "Position consumer tech hardware as a futuristic monolith of speed, optical clarity, and power.",
      construction: "Custom glass bevel lighting, lens dispersion aberrations, and titanium edge highlight passes.",
      application: "Global flagship product launch, keynote hero slide, and flagship store window displays.",
    },
    // 11: Luxury Watch Keyart
    {
      id: "luxury-watch-keyart",
      title: "Haute Horlogerie Luxury Timepiece Ad",
      category: "graphic",
      badge: "Luxury Watch Keyart",
      description: "Premium horology macro composite highlighting tourbillon mechanical detailing, sapphire crystal reflections, and subtle gold specular sheen.",
      image: "/images/graphics/my-work/luxuryad.png",
      tools: ["Photoshop", "Macro Lighting", "Focus Stacking"],
      specs: "Magazine Spread • 300 DPI Fine Art",
      concept: "Celebrating micro-mechanical mastery through surgical lighting control and rich obsidian contrast.",
      construction: "Focus stacked macro passes, crystal glare polarization, and micro gold leaf brushwork.",
      application: "High-net-worth luxury magazines, international airport VIP lounge lightboxes, and collector catalog.",
    },
    // 12: Fashion Magazine Spread 1
    {
      id: "fashion-magazine-1",
      title: "Fashion & Culture Editorial Spread v1",
      category: "editorial",
      badge: "Editorial Publication",
      description: "High-fashion publication layout balancing experimental editorial typography, modular column grids, and bold photography art direction.",
      image: "/images/graphics/my-work/magazine.png",
      tools: ["InDesign", "Photoshop", "Typography Pairing"],
      specs: "Newsstand A4 Spread • Spot Varnishing",
      concept: "Harmonize avant-garde typography with dynamic negative space to elevate fashion storytelling.",
      construction: "Strict baseline grid alignment, optical kerning pairs, and asymmetric photo placements.",
      application: "International fashion bi-annual, digital tablet interactive magazine, and press portfolio.",
    },
    // 13: Architectural Magazine Spread 2
    {
      id: "architectural-magazine-2",
      title: "Contemporary Architectural Journal v2",
      category: "editorial",
      badge: "Architectural Editorial",
      description: "Minimalist architectural magazine double-page spread with generous negative space, refined serif body text, and structural grid rhythm.",
      image: "/images/graphics/my-work/magazine2.png",
      tools: ["InDesign", "Photoshop", "Grid Architecture"],
      specs: "Double Page Spread • CMYK Offset",
      concept: "Reflect modernist architectural restraint through disciplined typographic margins and quiet breathing space.",
      construction: "Swiss typography grid, proportional column ratios, and subtle architectural line drawings.",
      application: "Design biennial journal, university architecture library editions, and monograph spreads.",
    },
    // 14: Bioluminescent Glow
    {
      id: "bioluminescent-glow",
      title: "Bioluminescent Nightscape Manipulation",
      category: "compositing",
      badge: "Bioluminescent FX",
      description: "Enchanting night fantasy scene with hand-painted glowing neon flora, volumetric light shafts, and edge-illuminated mythical focal point.",
      image: "/images/graphics/my-work/manipulation glow.png",
      tools: ["Photoshop CC", "Digital Painting", "Color Dodge Modes"],
      specs: "Ultra-HD Digital Artwork • 56 Layers",
      concept: "Create an otherworldly nocturnal ecosystem where living plants emit natural radiant bioluminescence.",
      construction: "Multi-layered color dodge glow channels, particle mist atmospheric scatter, and rim edge painting.",
      application: "Fantasy game keyart, digital art collector editions, and immersive video game environment concept.",
    },
    // 15: Mythological Fantasy Matte Painting
    {
      id: "mythological-matte-painting",
      title: "Mythological Fantasy Digital Matte Painting",
      category: "compositing",
      badge: "Epic Matte Art",
      description: "Grand-scale panoramic matte painting combining ancient monumental ruins, cinematic atmospheric haze, scale-establishing characters, and turbulent skies.",
      image: "/images/graphics/my-work/manipulation1.png",
      tools: ["Photoshop", "Matte Painting", "Custom Brushes"],
      specs: "Panoramic Master • 6000×3200px",
      concept: "Convey awe-inspiring antiquity and colossal scale as lone explorers discover ancient titan ruins.",
      construction: "Atmospheric depth cue aerial perspective, photo integration blending, and hand-painted rock textures.",
      application: "Feature film visual effects backdrop, fantasy cinematic marketing, and concept art portfolio.",
    },
    // 16: Thriller Movie Poster 2
    {
      id: "thriller-poster-2",
      title: "Psychological Thriller Theatrical Keyart",
      category: "editorial",
      badge: "Theatrical Movie Poster",
      description: "High-tension psychological suspense film poster featuring shattered glass motif, low-key monochrome lighting with crimson accent typography.",
      image: "/images/graphics/my-work/movie poster2.png",
      tools: ["Photoshop", "Illustrator", "Billing Block Kerning"],
      specs: "27×40 in Studio One-Sheet",
      concept: "Induce psychological vertigo and visceral unease through fractured facial reflections and stark negative space.",
      construction: "Fragmented glass refraction passes, high-contrast chiaroscuro shadows, and studio billing block hierarchy.",
      application: "Cinema lobby lightboxes, film festival promotional posters, and Netflix/Prime streaming keyart.",
    },
    // 17: Cyberpunk Movie Poster 3
    {
      id: "cyberpunk-poster-3",
      title: "Cyberpunk Sci-Fi Cinema Blockbuster",
      category: "editorial",
      badge: "Sci-Fi Movie Poster",
      description: "Theatrical sci-fi keyart featuring neon holographic cityscapes, mechanized character compositing, chromatic aberration, and cinematic letterboxing.",
      image: "/images/graphics/my-work/movie poster3.png",
      tools: ["Photoshop CC", "Cinema 3D Passes", "Color Grading"],
      specs: "Theatrical One-Sheet • IMAX Lightbox",
      concept: "Futuristic dystopian adrenaline: immerse viewers in rain-slicked neon skyscrapers and cybernetic rebellion.",
      construction: "Rain droplet displacement shaders, neon volumetric light blooming, and cinematic anamorphic flare passes.",
      application: "IMAX theater one-sheet posters, comic-con hero banners, and promotional merchandise.",
    },
    // 18: Horror Movie Poster 4
    {
      id: "horror-poster-4",
      title: "Grimdark Supernatural Horror Keyart",
      category: "editorial",
      badge: "Horror Theatrical Poster",
      description: "Visceral dark fantasy horror poster layout combining decayed texture overlays, eerie fog silhouettes, and unsettling focal lighting.",
      image: "/images/graphics/my-work/movie poster4.png",
      tools: ["Photoshop", "Texture Blending", "Typography Kerning"],
      specs: "Theatrical Cinema Release • 300 DPI",
      concept: "Evoke ancient dread and haunting supernatural mystery through deep carbon shadows and suffocating fog.",
      construction: "Distressed parchment texture overlays, volumetric fog blending, and weathered serif title typography.",
      application: "Theatrical release poster, international film distributor collateral, and Halloween season keyart.",
    },
    // 19: Action Blockbuster Poster 5
    {
      id: "action-poster-5",
      title: "Epic Action Adventure Theatrical Poster",
      category: "editorial",
      badge: "Action Movie Poster",
      description: "Dynamic heroic block poster with explosive debris particles, sunset backlighting, heroic triangle composition, and embossed metallic title logo.",
      image: "/images/graphics/my-work/movie poster5.png",
      tools: ["Photoshop", "Particle Dynamics", "Title Design"],
      specs: "27×40 Studio One-Sheet CMYK",
      concept: "High-octane heroic triumph: capture explosive cinematic momentum with powerful golden-hour warmth.",
      construction: "Multi-layered spark/debris emitters, dynamic rim lighting keys, and 3D metallic bevel typography.",
      application: "Cinema display hoardings, billboard outdoor advertising, and Blu-ray collector steelbook.",
    },
    // 20: Athletic Sneaker Ad
    {
      id: "athletic-sneaker-ad",
      title: "Athletic Sneaker Gravity-Defying Ad",
      category: "graphic",
      badge: "Performance Footwear Campaign",
      description: "Zero-gravity sports footwear commercial visual featuring dynamic particle disintegration, shockwave rings, and high-velocity motion blur.",
      image: "/images/graphics/my-work/shoe ad.png",
      tools: ["Photoshop", "Action Particle FX", "Brand Identity"],
      specs: "Omni-Channel Social & Billboard",
      concept: "Visualize pure speed and weightless bounce through exploded kinetic debris and aerodynamic air rings.",
      construction: "Exploding sole particle geometry, high-contrast rim glows, and kinetic typography velocity slants.",
      application: "Global flagship sneaker drop, Instagram/TikTok paid video stills, and stadium billboard screens.",
    },

    // Cornerstone Projects 21-30
    {
      id: "surreal-photo-manipulation",
      title: "Surreal Atmospheric Compositing",
      category: "compositing",
      badge: "Matte Painting • Photoshop",
      description: "Complex digital matte compositing combining multiple photographic exposures, customized volumetric lighting, atmospheric fog, and edge-blended micro-textures.",
      image: "/images/graphics/photo manipulation.png",
      tools: ["Photoshop CC", "Wacom Intuos", "Camera Raw"],
      specs: "6000×4000px • 300 DPI • 48 Layers",
      concept: "Synthesize solitary human contemplation against an infinite cosmic mountain landscape.",
      construction: "Multi-point light keying, frequency separation skin retouching, and shadow feathering.",
      application: "Exhibition print, high-resolution hero keyart, album packaging.",
    },
    {
      id: "imagination-reality",
      title: "Imagination to Reality",
      category: "compositing",
      badge: "Creative Visual Art",
      description: "High-concept surrealistic artwork exploring dreamscape dimensions, spatial depth transitions, and cinematic golden hour illumination.",
      image: "/images/graphics/imagination to reality.png",
      tools: ["Photoshop", "Lightroom", "Color Lookup Tables"],
      specs: "Ultra-HD Print Master • 16-Bit ProPhoto",
      concept: "Visualizing the subconscious threshold where creative ideas crystallize into physical reality.",
      construction: "Precision mask clipping, luminance gradient mapping, and particle smoke overlays.",
      application: "Digital art showcase and agency promotional hero visual.",
    },
    {
      id: "theatrical-movie-poster",
      title: "Theatrical Movie Poster Keyart",
      category: "editorial",
      badge: "Theatrical Print • High Res",
      description: "Major studio theatrical poster layout with custom title typography, dramatic chiaroscuro character lighting, floating ember particles, and billing block hierarchy.",
      image: "/images/graphics/movie poster.png",
      tools: ["Photoshop", "Illustrator", "InDesign"],
      specs: "27×40 in One-Sheet • CMYK Offset Print",
      concept: "High-stakes heroic confrontation with high emotional contrast and visceral tension.",
      construction: "Custom typography kerning, distress texturing, and calibrated color grading.",
      application: "Cinema lobby lightboxes, outdoor billboards, and streaming thumbnail keyart.",
    },
    {
      id: "brand-identity",
      title: "Corporate Brand Identity & Token Architecture",
      category: "brand",
      badge: "Full Brand System",
      description: "End-to-end corporate identity guidelines including logomark geometry, primary and secondary color tokens, typography scales, business stationery, and brand voice guidelines.",
      image: "/images/graphics/branding.png",
      tools: ["Illustrator", "InDesign", "Figma"],
      specs: "Comprehensive Brand Guidelines PDF • Vector Master",
      concept: "Geometric precision meets trustworthy corporate authority with timeless elegance.",
      construction: "Strict optical alignment, grid construction curves, and mathematical spacing tokens.",
      application: "Corporate stationery, signage, mobile app icons, and investor pitch decks.",
    },
    {
      id: "brand-collaterals",
      title: "Modern Brand Identity Collaterals",
      category: "brand",
      badge: "Vector & Packaging",
      description: "Secondary brand collateral ecosystem featuring premium packaging mockups, embossed stationery, logo variation matrix, and high-impact vector iconography.",
      image: "/images/graphics/branding2.png",
      tools: ["Illustrator", "Photoshop 3D Mockup"],
      specs: "Vector SVG Master + 300 DPI CMYK Print",
      concept: "Tactile premium presentation conveying artisan craft and modern minimalism.",
      construction: "Spot UV varnish specifications and foil-stamping vector separation layers.",
      application: "Retail product packaging, corporate gift boxes, and brand touchpoints.",
    },
    {
      id: "magazine-cover",
      title: "Editorial Magazine Cover Typography",
      category: "editorial",
      badge: "Editorial Typography",
      description: "Contemporary publication cover design featuring bold editorial serif typography, structured column alignment, high-fashion color palette, and subtle depth-of-field.",
      image: "/images/graphics/magazine book cover.png",
      tools: ["Photoshop", "InDesign", "Typography Pairing"],
      specs: "A4 Trim Size • Newsstand UV Coated",
      concept: "Sophisticated editorial gravitas blending fashion, architecture, and technology.",
      construction: "Negative space balance allowing portrait hair to overlap the publication masthead.",
      application: "Print newsstand edition and tablet interactive e-magazine.",
    },
    {
      id: "social-creatives",
      title: "Performance Social Media Campaign",
      category: "graphic",
      badge: "High-Converting Ad Creatives",
      description: "Cohesive multi-platform social advertising suite designed for Instagram stories, feed carousels, and LinkedIn campaigns with calibrated thumb-stopping contrast.",
      image: "/images/graphics/social creatives.png",
      tools: ["Photoshop", "Illustrator", "Figma"],
      specs: "1080×1080 & 1080×1920 • Retina Verified",
      concept: "Thumb-stopping social ads maximizing CTR while preserving strict brand aesthetic guidelines.",
      construction: "Bold typography hierarchy with high-contrast accent gold badges.",
      application: "Paid social campaigns across Meta, LinkedIn, and Google Display Network.",
    },
    {
      id: "commercial-flyer",
      title: "Commercial Marketing Collateral",
      category: "graphic",
      badge: "Print Ready • CMYK",
      description: "Dynamic marketing flyer with clean geometric zoning, vibrant gradient accents, scannable offer bullet points, and high-contrast call-to-action flow.",
      image: "/images/graphics/flyerdesign.png",
      tools: ["Illustrator", "Photoshop", "Acrobat Preflight"],
      specs: "A5 Double-Sided • 3mm Bleed CMYK",
      concept: "Direct-response promotional piece balancing informational density with visual breathing room.",
      construction: "Bleed and safe margin compliance with embedded vector fonts.",
      application: "Direct-mail campaigns, conference handouts, and in-store displays.",
    },
    {
      id: "luxury-invitation",
      title: "Luxury Event Invitation Stationery",
      category: "brand",
      badge: "Gold Foil Finish",
      description: "Bespoke formal event invitation featuring custom luxury typography, delicate gold foil filigree accents, minimalist framing, and tactile cardstock texture.",
      image: "/images/graphics/invitation card.png",
      tools: ["Illustrator", "Photoshop Texturing"],
      specs: "5×7 in Custom Die-Cut • Metallic Foil Plate",
      concept: "Understated opulence for high-profile executive gala and exclusive brand launch.",
      construction: "Foil plate vector separation layers and blind deboss registration marks.",
      application: "VIP event invitations and collector keepsake cards.",
    },
    {
      id: "pitch-deck-poster",
      title: "Corporate Pitch & Visual Deck Systems",
      category: "editorial",
      badge: "Executive Presentation",
      description: "Editorial slide deck collage synthesizing complex business narratives, data charts, and brand photography into clean executive presentation spreads.",
      image: "/images/project_graphics_promo_poster.jpg",
      tools: ["PowerPoint", "Photoshop", "Illustrator"],
      specs: "16:9 Widescreen • 4K Master Deck",
      concept: "Elevate corporate investor pitch from dry spreadsheets to cinematic executive storytelling.",
      construction: "Tokenized color hierarchy with dark charcoal backgrounds and gold emphasis points.",
      application: "Series A venture pitch decks and enterprise client proposals.",
    },
  ];

  const filteredWorks =
    activeTab === "all" ? graphicWorks : graphicWorks.filter((w) => w.category === activeTab);

  /* ─── Accessibility & Modal Navigation ─────────────── */
  const closeModal = useCallback(() => {
    setSelectedItem(null);
    setLightboxZoom(1);
  }, []);

  const currentIndex = selectedItem ? graphicWorks.findIndex((item) => item.id === selectedItem.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex <= 0) {
      setSelectedItem(graphicWorks[graphicWorks.length - 1]);
    } else {
      setSelectedItem(graphicWorks[currentIndex - 1]);
    }
    setLightboxZoom(1);
  }, [currentIndex, graphicWorks]);

  const handleNext = useCallback(() => {
    if (currentIndex >= graphicWorks.length - 1) {
      setSelectedItem(graphicWorks[0]);
    } else {
      setSelectedItem(graphicWorks[currentIndex + 1]);
    }
    setLightboxZoom(1);
  }, [currentIndex, graphicWorks]);

  useEffect(() => {
    if (!selectedItem) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem, closeModal, handlePrev, handleNext]);

  useFocusTrap(!!selectedItem, modalRef);

  const capabilities = [
    { label: "BRAND", desc: "Identity & Guidelines", num: "01" },
    { label: "ADVERTISING", desc: "Commercial & Splash Keyart", num: "02" },
    { label: "COMPOSITING", desc: "Matte Art & Retouching", num: "03" },
    { label: "EDITORIAL", desc: "Publication & Posters", num: "04" },
    { label: "COLOR GRADING", desc: "Camera Raw & LUTs", num: "05" },
  ];

  const logoSteps = ["concept", "sketch", "construction", "final", "application"] as const;
  const stepContent: Record<typeof logoSteps[number], { title: string; body: string; bullets: string[] }> = {
    concept: {
      title: "Conceptual Ideation & Semiotics",
      body: "Analyzing corporate market positioning, competitive whitespace, and core brand values. The objective was formulating a timeless mark combining institutional strength with forward-looking technological agility.",
      bullets: ["Semiotics: Upward trajectory, golden ratio balance, structural integrity.", "Audience: High-net-worth investors, enterprise partners, modern consumers."],
    },
    sketch: {
      title: "Pencil Thumbnails & Optical Iterations",
      body: "Executing over 60 rapid pencil ideation thumbnails. Stress-testing silhouette clarity at 16×16px favicon scale up to 40-foot outdoor billboard distances to guarantee instantaneous recognition.",
      bullets: ["Tested 12 distinct ligature and geometric monograms.", "Optical testing against dense monochrome backgrounds."],
    },
    construction: {
      title: "Vector Grid & Golden Ratio Geometry",
      body: "Constructing mathematical vector curves in Adobe Illustrator. Every arc, tangent, and negative space aperture conforms to Fibonacci proportions (1:1.618) to ensure visual stability.",
      bullets: ["Zero unanchored bezier artifacts or uneven stroke weights.", "Exact mathematical clearance boundaries for responsive lockups."],
    },
    final: {
      title: "Master Identity Mark & Color Tokens",
      body: "The finalized brand emblem rendered in metallic gold and deep carbon black. Engineered to project prestige, clarity, and authority across light and dark backgrounds with zero optical distortion.",
      bullets: ["Color Tokens: Metallic Gold #D4AF37, Obsidian Carbon #0A0E17.", "Full vector SVG & EPS responsive lockups verified."],
    },
    application: {
      title: "Stationery, Packaging & Physical Print",
      body: "Translating digital vector tokens to tactile physical brand artifacts. Specifications include 600 GSM duplexed cotton cardstock, blind deboss registration, and hot-stamped metallic gold foil.",
      bullets: ["Hot-stamp metallic foil separation layers.", "Tested on matte black luxury gift packaging and letterheads."],
    },
  };

  return (
    <section
      id="visual-systems"
      ref={sectionRef}
      className="py-24 sm:py-32 relative bg-[#FAFAF7] dark:bg-[#06070A] border-t border-gray-200 dark:border-[#2A3441]/70 transition-colors duration-300 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.55 }}
          className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#003882]/20 dark:border-[#00E5FF]/30 bg-[#003882]/10 dark:bg-[#00E5FF]/10 text-xs font-mono font-bold tracking-widest text-[#003882] dark:text-[#00E5FF] uppercase">
            <Palette className="w-3.5 h-3.5" aria-hidden="true" />
            <span>VISUAL SYSTEMS &amp; BRAND ARCHITECTURE • 30 WORKS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0A0F1D] dark:text-[#F8FAFC]">
            Visual Systems &amp;{" "}
            <span className="text-[#003882] dark:text-[#00E5FF]">Art Direction</span>
          </h2>

          <p className="text-sm sm:text-base text-[#1E293B] dark:text-[#CBD5E1] leading-relaxed">
            Multi-disciplinary graphic design showcase featuring 30 authentic projects: commercial product advertising, high-end beauty retouching, theatrical movie posters, and rigorous brand identity architecture.
          </p>
        </motion.div>

        {/* ── Capabilities Matrix ──────────────────────────── */}
        <div
          ref={matrixRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-16 sm:mb-24"
        >
          {capabilities.map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 20 }}
              animate={matrixInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-[#2A3441] bg-white dark:bg-[#1A1F2B] hover:border-[#003882] dark:hover:border-[#00E5FF]/60 transition-all group shadow-sm hover:shadow-md"
            >
              <span className="font-mono text-xs font-bold text-[#003882] dark:text-[#00E5FF] block mb-1">
                {c.num}
              </span>
              <p className="font-black text-xs sm:text-sm text-[#0A0F1D] dark:text-[#F8FAFC] uppercase tracking-wider group-hover:text-[#003882] dark:group-hover:text-[#00E5FF] transition-colors">
                {c.label}
              </p>
              <p className="text-[10px] text-[#1E293B] dark:text-[#94A3B8] mt-1 font-mono">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Brand Identity Case Study ────────────────────── */}
        <motion.div
          ref={brandRef}
          initial={{ opacity: 0, y: 28 }}
          animate={brandInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.6 }}
          className="mb-20 sm:mb-28 rounded-3xl border border-gray-200 dark:border-[#2A3441] bg-white dark:bg-[#111827] p-6 sm:p-10 shadow-xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-[#2A3441] mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003882] dark:text-[#00E5FF]">
                DECONSTRUCTED CASE STUDY
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0A0F1D] dark:text-[#F8FAFC] uppercase">
                Brand Identity: Ideation to Application
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-gray-100 dark:bg-[#1A1F2B] border border-gray-200 dark:border-[#2A3441] text-[#1E293B] dark:text-[#CBD5E1]">
              5-Step Systematic Method
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {logoSteps.map((step, idx) => (
              <button
                key={step}
                role="tab"
                aria-selected={activeLogoStep === step}
                onClick={() => setActiveLogoStep(step)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeLogoStep === step
                    ? "bg-[#003882] text-white dark:bg-[#00E5FF] dark:text-[#06070A] shadow-md scale-105"
                    : "bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[#1E293B] dark:text-gray-300 hover:border-[#003882] dark:hover:border-[#00E5FF]"
                }`}
              >
                {`0${idx + 1}. ${step}`}
              </button>
            ))}
          </div>

          {/* Step Details & Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLogoStep}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <h4 className="text-lg font-black text-[#0A0F1D] dark:text-white">
                    {stepContent[activeLogoStep].title}
                  </h4>
                  <p className="text-xs text-[#1E293B] dark:text-gray-300 leading-relaxed">
                    {stepContent[activeLogoStep].body}
                  </p>
                  <ul className="text-xs space-y-1.5 text-[#334155] dark:text-gray-400 list-disc list-inside">
                    {stepContent[activeLogoStep].bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg group bg-[#0A0E17]">
                <Image
                  src={activeLogoStep === "application" ? "/images/graphics/branding2.png" : "/images/graphics/branding.png"}
                  alt={`Brand design — ${activeLogoStep} phase`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-mono text-[10px] text-[#F5BA42] font-bold">
                    SYSTEM SPEC: LOGO_{activeLogoStep.toUpperCase()}_v2.4
                  </span>
                  <span className="text-[10px] font-mono text-gray-300">Vector Master Spec</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Filter Tabs ──────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 dark:border-white/10 pb-6 mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003882] dark:text-[#00E5FF]">
              CREATIVE WORKS ARCHIVE
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-[#0A0F1D] dark:text-[#F8FAFC] uppercase tracking-wider">
              {filteredWorks.length} Verified Masterworks
            </h3>
          </div>

          {/* Filter Pills */}
          <div role="group" aria-label="Filter graphic works by category" className="flex flex-wrap gap-2">
            {([
              { id: "all", label: `All (${graphicWorks.length})` },
              { id: "graphic", label: "Commercial & Ads" },
              { id: "compositing", label: "Compositing & Retouching" },
              { id: "editorial", label: "Posters & Editorial" },
              { id: "brand", label: "Brand Systems" },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                aria-pressed={activeTab === tab.id}
                className={`px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#003882] text-white dark:bg-[#00E5FF] dark:text-[#06070A] font-extrabold shadow-md scale-105"
                    : "bg-white dark:bg-[#1A1F2B] border border-gray-200 dark:border-[#2A3441] text-[#1E293B] dark:text-[#CBD5E1] hover:border-[#003882] dark:hover:border-[#00E5FF]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Proper Card-Like System Grid with Hover Effects ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((item, idx) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.28, delay: gridInView ? idx * 0.04 : 0 }}
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-2xl border border-gray-200 dark:border-[#2A3441] bg-white dark:bg-[#1A1F2B] hover:border-[#003882] dark:hover:border-[#00E5FF] p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,56,130,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,229,255,0.14)]"
              >
                <div>
                  {/* Card Thumbnail Container */}
                  <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-[#0A0E17] border border-gray-200 dark:border-[#2A3441] mb-4 group/img">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Corner Tag */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#00E5FF]/40 text-[9px] font-mono text-[#00E5FF] font-bold uppercase tracking-wider shadow-md">
                      {item.badge}
                    </div>

                    {/* Hover Quick View Spotlight Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className="px-4 py-2 rounded-xl bg-black/80 border border-[#00E5FF] text-[#00E5FF] flex items-center space-x-2 shadow-2xl backdrop-blur-md transform scale-90 group-hover:scale-100 transition-transform">
                        <ZoomIn className="w-4 h-4 stroke-[2.5]" />
                        <span className="text-xs font-mono font-bold tracking-wider uppercase">
                          Inspect Project
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Category & Specs Line */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#003882] dark:text-[#00E5FF] font-bold uppercase tracking-wider mb-1.5">
                    <span>{item.category}</span>
                    <span className="text-[#1E293B] dark:text-[#94A3B8] font-normal">
                      {item.specs.split("•")[0]?.trim()}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-black text-base sm:text-lg text-[#0A0F1D] dark:text-[#F8FAFC] uppercase tracking-tight mb-2 group-hover:text-[#003882] dark:group-hover:text-[#00E5FF] transition-colors line-clamp-1">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-[#1E293B] dark:text-[#CBD5E1] leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Footer Badges & Inspect CTA */}
                <div className="pt-3.5 border-t border-gray-200 dark:border-[#2A3441] flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {item.tools.slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-gray-100 dark:bg-[#111827] border border-gray-200 dark:border-[#2A3441] text-[9px] font-mono text-[#1E293B] dark:text-[#CBD5E1]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-[#003882] dark:text-[#00E5FF] font-bold text-xs uppercase flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Extended 21-Artwork Gallery Launch Banner ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 rounded-2xl border border-gray-200 dark:border-[#2A3441] bg-white dark:bg-[#111827] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold text-[#003882] dark:text-[#00E5FF] uppercase tracking-widest block">
              EXTENDED MASTER VAULT
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-[#0A0F1D] dark:text-[#F8FAFC] uppercase">
              Photoshop 21-Artwork Dedicated Gallery
            </h4>
            <p className="text-xs text-[#1E293B] dark:text-[#CBD5E1] max-w-xl leading-relaxed">
              Explore the dedicated exhibition room featuring all 21 full-resolution matte paintings, surreal composites, and digital photo retouching studies.
            </p>
          </div>
          <a
            href="/photoshop"
            className="px-6 py-3 rounded-xl bg-[#003882] text-white dark:bg-[#00E5FF] dark:text-black font-extrabold text-xs uppercase tracking-wider shrink-0 flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform"
          >
            <span>Launch 21 Artworks Room</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>

      </div>

      {/* ── Overlay Modal with Scale Transition ─────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/92 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={`Artwork detail: ${selectedItem.title}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            {/* Modal Box with Scale Transition */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 320 }}
              className="relative max-w-5xl w-full max-h-[94vh] overflow-y-auto rounded-3xl bg-[#090D16] border border-[#D4AF37]/50 shadow-[0_0_80px_rgba(0,0,0,0.9)] p-5 sm:p-8 text-white z-10 font-sans"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[10px] font-mono font-bold text-[#F5BA42] uppercase">
                    ARTWORK {currentIndex + 1} OF {graphicWorks.length}
                  </span>
                  <span className="hidden sm:inline-block text-xs font-mono text-gray-400">
                    Use ← → Arrow Keys to Browse
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Prev Artwork */}
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-xl bg-white/5 hover:bg-[#D4AF37] hover:text-black border border-white/10 transition-colors cursor-pointer"
                    title="Previous Artwork (Left Arrow)"
                    aria-label="Previous artwork"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Next Artwork */}
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-xl bg-white/5 hover:bg-[#D4AF37] hover:text-black border border-white/10 transition-colors cursor-pointer"
                    title="Next Artwork (Right Arrow)"
                    aria-label="Next artwork"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-400 border border-white/10 transition-colors cursor-pointer ml-2"
                    title="Close (Esc)"
                    aria-label="Close detail view"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: High-Res Visual Viewport */}
                <div className="lg:col-span-7 flex flex-col items-center">
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#06080F] group shadow-inner">
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      fill
                      className="object-contain transition-transform duration-300"
                      style={{ transform: `scale(${lightboxZoom})` }}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />

                    {/* Floating Zoom Controls */}
                    <div className="absolute bottom-3 right-3 flex items-center space-x-1.5 p-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/15">
                      <button
                        onClick={() => setLightboxZoom((prev) => Math.min(prev + 0.25, 2.5))}
                        className="p-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer"
                        title="Zoom In"
                        aria-label="Zoom in"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setLightboxZoom((prev) => Math.max(prev - 0.25, 1))}
                        className="p-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer"
                        title="Zoom Out"
                        aria-label="Zoom out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      {lightboxZoom > 1 && (
                        <button
                          onClick={() => setLightboxZoom(1)}
                          className="p-1.5 hover:text-[#D4AF37] transition-colors cursor-pointer"
                          title="Reset Zoom"
                          aria-label="Reset zoom"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <a
                    href={selectedItem.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-xs font-mono text-[#D4AF37] hover:underline flex items-center space-x-1"
                  >
                    <span>Open Raw Full-Resolution Image</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Right: Detailed Project Documentation */}
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[10px] font-mono font-bold text-[#F5BA42] uppercase tracking-wider">
                      {selectedItem.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase mt-2.5">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="border-t border-white/10 pt-4 space-y-3 text-xs">
                    {selectedItem.concept && (
                      <div>
                        <span className="font-mono text-[10px] text-gray-400 uppercase font-bold block">
                          Conceptual Intent:
                        </span>
                        <p className="text-gray-200 mt-0.5 leading-relaxed">
                          {selectedItem.concept}
                        </p>
                      </div>
                    )}

                    {selectedItem.construction && (
                      <div>
                        <span className="font-mono text-[10px] text-gray-400 uppercase font-bold block">
                          Craft &amp; Layer Architecture:
                        </span>
                        <p className="text-gray-200 mt-0.5 leading-relaxed">
                          {selectedItem.construction}
                        </p>
                      </div>
                    )}

                    <div>
                      <span className="font-mono text-[10px] text-gray-400 uppercase font-bold block">
                        Technical Deliverable Specs:
                      </span>
                      <p className="text-[#D4AF37] font-mono mt-0.5 font-bold">
                        {selectedItem.specs}
                      </p>
                    </div>

                    {selectedItem.application && (
                      <div>
                        <span className="font-mono text-[10px] text-gray-400 uppercase font-bold block">
                          Commercial Applications:
                        </span>
                        <p className="text-gray-200 mt-0.5 leading-relaxed">
                          {selectedItem.application}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Software & Skills Pills */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="font-mono text-[10px] text-gray-400 uppercase font-bold block mb-2">
                      Tools &amp; Pipeline:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.tools.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300 font-bold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
