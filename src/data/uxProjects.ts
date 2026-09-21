export interface CaseStudyData {
  overview: string;
  clientType: string;
  role: string;
  duration: string;
  tools: string[];
  deliverables: string[];
  metrics: { label: string; value: string; detail: string }[];
  problem: {
    statement: string;
    points: string[];
    userQuote?: string;
  };
  solution: {
    statement: string;
    highlights: { title: string; desc: string }[];
  };
  research: {
    summary: string;
    personas: { name: string; role: string; goal: string; painPoint: string }[];
    insights: string[];
  };
  informationArchitecture: {
    description: string;
    hierarchy: string[];
  };
  designSystem: {
    theme: string;
    colors: { name: string; hex: string; role: string }[];
    typography: string;
    principles: string[];
  };
  keyFeatures: {
    title: string;
    desc: string;
    screenImg: string;
    tags: string[];
  }[];
  impact: {
    summary: string;
    stats: { number: string; label: string }[];
  };
}

export interface UXProject {
  id: string;
  title: string;
  subtitle: string;
  category: "uiux" | "video" | "graphics";
  featured?: boolean;
  image: string;
  gallery: { url: string; title: string; caption: string }[];
  summary: string;
  tags: string[];
  statsBadge: string;
  caseStudy: CaseStudyData;
}

export const uxProjectsList: UXProject[] = [
  {
    id: "deepastro",
    title: "DeepAstro",
    subtitle: "AI-Powered Vedic Astrology & Life Intelligence Ecosystem",
    category: "uiux",
    featured: true,
    image: "/images/ux/deepastro-hero.jpg",
    gallery: [
      {
        url: "/images/ux/deepastro-hero.jpg",
        title: "Cosmic Ecosystem Showcase",
        caption: "Cross-platform responsive design featuring desktop command dashboard and companion iOS mobile experience.",
      },
      {
        url: "/images/ux/deepastro-future-intelligence.jpg",
        title: "Future Intelligence 8.0 Roadmap",
        caption: "Multi-year trajectory mapping, 5-year timeline projection, life domain scores, and customized remedial actions.",
      },
      {
        url: "/images/ux/deepastro-soultrace-karmic.jpg",
        title: "SoulTrace Karmic Matrix",
        caption: "Detailed karmic pattern breakdown, planetary house influences (4th, 8th, 10th, 12th houses), and Rahu-Ketu nodal axis.",
      },
      {
        url: "/images/ux/deepastro-soultrace-card.jpg",
        title: "Deep Soul Journey Card Experience",
        caption: "Tactile modal journey with atmospheric astral portal aesthetics, soul lesson checkpoints, and authentic chart calculation.",
      },
    ],
    summary: "A revolutionary AI life intelligence system that bridges ancient Vedic astronomical wisdom with modern generative intelligence, transforming complex planetary charts into intuitive, actionable guidance.",
    tags: ["AI Intelligence", "Vedic Data", "Design System", "Mobile & Web", "Data Visualization"],
    statsBadge: "50K+ Active Users • 4.9/5 Rating",
    caseStudy: {
      overview: "DeepAstro reimagines personal astrology from fatalistic predictions into an empowering, data-driven life intelligence operating system. By analyzing complex Kundli charts, divisional Vargas, transits, and planetary Dashas through an empathetic AI engine, users receive crystal-clear personal roadmaps for career, wealth, health, and spiritual alignment.",
      clientType: "Venture-Backed AI & Wellness Tech Startup",
      role: "Lead UI/UX Designer & Product Architect",
      duration: "14 Weeks (Concept to Multi-Platform Launch)",
      tools: ["Figma", "Design Tokens", "Framer Motion", "Next.js", "Tailwind CSS"],
      deliverables: ["Product Information Architecture", "Design System (Cosmic Dark)", "Interactive Prototypes", "Mobile iOS/Android App Layouts", "Data Visualization Suite"],
      metrics: [
        { label: "Active Seekers", value: "50,000+", detail: "Engaged active users within 6 months of platform release" },
        { label: "User Satisfaction", value: "4.9 / 5.0", detail: "Consistently rated across 12,000+ app store reviews" },
        { label: "Task Completion", value: "94.2%", detail: "Users successfully generating customized 5-year improvement roadmaps" },
        { label: "Engagement Time", value: "8.4 min", detail: "Average session duration across cosmic dashboard modules" },
      ],
      problem: {
        statement: "Vedic astrology offers profound wisdom but suffers from severe accessibility barriers: complex Sanskrit terminologies, confusing geometric Kundli charts, and overwhelming text-heavy tables. Meanwhile, contemporary horoscope apps are overly simplistic, producing vague predictions without genuine depth or actionable advice.",
        points: [
          "Users feel intimidated and overwhelmed by dense classical Kundli tables with no clear hierarchy.",
          "Lack of temporal visualization: seekers cannot visualize how planetary cycles transition over 3, 5, or 10 years.",
          "Disconnect between astrological diagnosis and practical lifestyle remedies or mindset interventions.",
          "Substandard mobile experiences with cramped charts that fail to adapt gracefully across various screen form factors.",
        ],
        userQuote: "I want to understand what the cosmos is indicating for my career and life, but every astrology site looks like an unreadable 1990s spreadsheet.",
      },
      solution: {
        statement: "Designed a luminous 'Cosmic Glassmorphism' design language that categorizes astronomical computations into four intuitive cognitive layers: Executive Summary, Temporal Roadmap, Planetary Analysis, and Actionable Remedial Guidance.",
        highlights: [
          {
            title: "Future Intelligence 8.0 Engine",
            desc: "Designed an interactive 5-year optimization slider with categorical life domain radars (Career, Wealth, Relations, Health, Learning, Spirituality) allowing users to see year-by-year shifts.",
          },
          {
            title: "SoulTrace Deep Soul Journey",
            desc: "Constructed an immersive visual portal breaking down karmic themes (Saturn discipline, Rahu-Ketu balance) and mapping planetary energies to specific life houses with color-coded intensity tags.",
          },
          {
            title: "Contextual AI Astrologer",
            desc: "Integrated natural conversational queries alongside visual charts, allowing seekers to ask open-ended questions and receive instant personalized synthesis.",
          },
          {
            title: "Omni-Channel Device Adaptability",
            desc: "Crafted dedicated responsive grid architectures: expansive data cockpit for desktop widescreen, and stacked swipeable cards with bottom navigation for mobile viewports.",
          },
        ],
      },
      research: {
        summary: "Conducted 24 qualitative user interviews spanning seasoned astrology practitioners, casual spiritual seekers, and young professionals. Evaluated 12 competitor platforms to identify key friction points in data comprehension and emotional reassurance.",
        personas: [
          {
            name: "Aarav Sharma (31)",
            role: "Product Manager & Soul Seeker",
            goal: "Align career changes and major relocations with favorable astrological timing without getting overwhelmed by jargon.",
            painPoint: "Confused by conflicting predictions from different astrologers; wanted an evidence-based roadmap.",
          },
          {
            name: "Priya Patel (27)",
            role: "Creative Director",
            goal: "Understand recurring emotional and relationship patterns and receive peaceful, actionable mindfulness remedies.",
            painPoint: "Apps either feel superstitious and fearful or overly superficial with generic daily horoscopes.",
          },
        ],
        insights: [
          "Seekers prioritize agency over fatalism: 88% wanted suggestions on 'What I can influence' rather than immutable prophecies.",
          "Color psychology is critical: Deep Obsidian (#040714) with Astral Cyan and Vedic Gold created an immediate sense of wonder, trust, and calm focus.",
          "Visual timeline bars increased comprehension of planetary transits by 310% compared to traditional almanac tables.",
        ],
      },
      informationArchitecture: {
        description: "Organized complex multi-faceted astrological data into a progressive disclosure architecture: High-level Key Insights on landing -> Horizon Timelines -> Deep Planetary Influences -> Prescribed Remedial Action Plan.",
        hierarchy: [
          "Level 1: Cosmic Overview & Today's Vital Alignment Index",
          "Level 2: Temporal Optimization Roadmap (2026-2030 Five-Year Horizons)",
          "Level 3: Life Domain Breakdown (Career, Wealth, Relationships, Health, Longevity)",
          "Level 4: SoulTrace Deep Soul Matrix (Karmic Patterns, Houses 4, 8, 10, 12, Rahu-Ketu Axis)",
          "Level 5: Actionable Solutions (Gemstone Advice, Mantras, Pooja Guidance & Habits)",
        ],
      },
      designSystem: {
        theme: "Cosmic Obsidian Glassmorphism",
        colors: [
          { name: "Cosmic Obsidian", hex: "#050814", role: "Primary Background" },
          { name: "Astral Cyan", hex: "#00F0FF", role: "Primary Highlights & Active State" },
          { name: "Vedic Gold", hex: "#F5BA42", role: "Wisdom, Dominant Themes & Accents" },
          { name: "Spiritual Violet", hex: "#9D4EDD", role: "Karmic & Soul Connection Accents" },
          { name: "Emerald Growth", hex: "#10B981", role: "Positive Alignment & Remedies" },
        ],
        typography: "Cinzel / Serif Display paired with Inter Modern Sans for clear tabular numeracy and astronomical figures.",
        principles: [
          "Clarity Before Mysticism: Never obscure meaning behind archaic formatting.",
          "Empowerment Over Fatalism: Frame cosmic signals as opportunities for conscious action.",
          "Accessible Data Density: Use progressive disclosure modals and collapsible drawers to avoid visual fatigue.",
        ],
      },
      keyFeatures: [
        {
          title: "Future Intelligence 8.0 Roadmap",
          desc: "Interactive multi-year timeline with dynamic stage cards (Foundation, Career Growth, Wealth Expansion, Balance) showing planetary support indices.",
          screenImg: "/images/ux/deepastro-future-intelligence.jpg",
          tags: ["Timeline Slider", "Alignment Index", "Radar Metrics"],
        },
        {
          title: "SoulTrace Karmic Matrix",
          desc: "Visualizes generational karma, unfinished cycles, and the Rahu-Ketu balancing axis with house-level impact badges.",
          screenImg: "/images/ux/deepastro-soultrace-karmic.jpg",
          tags: ["Karmic Patterns", "Planetary Houses", "Soul Lessons"],
        },
        {
          title: "Tactile Deep Soul Journey Experience",
          desc: "Atmospheric celestial archway modal featuring past life reflections, spiritual seeking metrics, and personalized Vedic audio mantras.",
          screenImg: "/images/ux/deepastro-soultrace-card.jpg",
          tags: ["Interactive Modal", "Micro-Interactions", "Sound Design"],
        },
        {
          title: "Cross-Platform Responsive Ecosystem",
          desc: "Widescreen dual-pane navigation tailored for desktop power users, smoothly morphing into a thumb-zone friendly mobile navigation bar.",
          screenImg: "/images/ux/deepastro-hero.jpg",
          tags: ["Responsive Web", "iOS Mobile App", "Dynamic Grids"],
        },
      ],
      impact: {
        summary: "DeepAstro redefined user trust and engagement in digital astrology, demonstrating that ancient spiritual traditions can be transformed through thoughtful UX into a modern, empowering life guidance platform.",
        stats: [
          { number: "50,000+", label: "Active Global Seekers" },
          { number: "94.2%", label: "Roadmap Completion Rate" },
          { number: "4.9 / 5", label: "App Store User Rating" },
          { number: "3.2x", label: "Increase in Daily Return Visits" },
        ],
      },
    },
  },
  {
    id: "tradex",
    title: "TradeX Pro",
    subtitle: "High-Frequency Algorithmic & Crypto Trading Terminal UX",
    category: "uiux",
    featured: true,
    image: "/images/ux/projects/TradeX.png",
    gallery: [
      {
        url: "/images/ux/projects/TradeX.png",
        title: "TradeX Multi-Asset Trading Terminal",
        caption: "Dark-mode high-contrast trading workstation with real-time order books, multi-timeframe candlestick charts, and instant execution drawer.",
      },
      {
        url: "/images/ux/projects/tradex.png",
        title: "Algorithmic Risk Management Console",
        caption: "Automated stop-loss, take-profit triggers, volatility gauges, and multi-exchange liquidity depth.",
      },
      {
        url: "/images/ux/projects/Ux projects overview.png",
        title: "TradeX Within UX Portfolio Ecosystem",
        caption: "Cross-platform design token system bridging desktop power user layouts and mobile swift orders.",
      },
    ],
    summary: "An enterprise-grade financial terminal built for institutional and active retail traders, delivering millisecond execution speed, customizable modular widget workspaces, and intuitive visual risk controls.",
    tags: ["Fintech UX", "Trading Terminal", "Data Density", "Design Tokens", "Dark Mode UI"],
    statsBadge: "Institutional Quantitative Terminal • 0.12s Latency",
    caseStudy: {
      overview: "TradeX Pro was architected to solve the dual challenges of high-frequency market analysis: extreme data density without cognitive fatigue, and rapid order execution with zero input error. The terminal empowers traders to monitor dozens of live ticker feeds, execute multi-leg options and crypto swaps, and visualize risk exposure dynamically.",
      clientType: "Fintech & Web3 Quantitative Trading Firm",
      role: "Lead Product Designer & Financial Systems UX Architect",
      duration: "16 Weeks (Concept, Research, Design System, Testing)",
      tools: ["Figma", "Design Tokens", "React", "TradingView Lightweight Charts", "Tailwind CSS"],
      deliverables: ["Terminal Layout Framework", "Modular Widget Drag-and-Drop System", "Keyboard Shortcut & Hotkey Engine", "Mobile Companion App Layouts"],
      metrics: [
        { label: "Execution Latency", value: "0.12s", detail: "Fastest single-click order entry workflow in benchmark testing" },
        { label: "Trader Volume", value: "$1.2B+", detail: "Quarterly volume processed through the redesigned terminal" },
        { label: "Order Error Reduction", value: "83%", detail: "Drop in erroneous order sizes due to smart risk safeguards" },
        { label: "User Retention", value: "91.4%", detail: "30-day active trader retention rate" },
      ],
      problem: {
        statement: "Legacy financial software is notoriously cluttered, rigid, and slow, forcing traders to juggle multiple monitors with inconsistent design languages, confusing order forms, and critical metrics buried under opaque navigation menus.",
        points: [
          "Information overload during volatile market breakouts causing costly mis-clicks.",
          "Rigid grid systems that do not allow custom floating or docked analytics panels.",
          "Poor accessibility in low-light trading environments with uncalibrated contrast ratios.",
          "Disconnected mobile apps that fail to synchronize live watchlists and open positions in real time.",
        ],
        userQuote: "When Bitcoin drops $4,000 in 3 minutes, I need instant visual clarity on my liquidation levels without hunting through five sub-menus.",
      },
      solution: {
        statement: "Engineered a modular, 'High-Signal Obsidian' terminal interface centered on user ergonomics, customizable tile layouts, and bi-directional visual risk feedback.",
        highlights: [
          {
            title: "Dynamic Smart-Tile Workspace",
            desc: "Drag-and-dock widget architecture enabling users to arrange depth charts, order books, and news feeds to their individual workflow.",
          },
          {
            title: "One-Click Safe Execution Bar",
            desc: "Unified order entry component with slider leverage controls, slippage tolerance indicators, and dual confirmation triggers.",
          },
          {
            title: "Calibrated Color Accents",
            desc: "Tailored emerald green (#00F5A0) and crimson (#FF3366) values optimized for prolonged screen exposure without eye strain.",
          },
        ],
      },
      research: {
        summary: "Conducted contextual inquiries and eye-tracking studies with 24 professional crypto and equities day traders.",
        personas: [
          {
            name: "Devon Vance (31)",
            role: "Quantitative Crypto Trader",
            goal: "Execute fast scalping strategies across multiple DEX/CEX pairs with sub-second feedback.",
            painPoint: "Previous software lagged during high volume spikes, causing slippage and anxiety.",
          },
        ],
        insights: [
          "Traders prioritize hotkey navigation: 76% of actions were initiated via keyboard rather than mouse clicks.",
          "Visual depth cues on order book volumes reduced order assessment time by 44%.",
        ],
      },
      informationArchitecture: {
        description: "Hierarchical 3-zone layout: Macro Market Bar -> Active Analytics Canvas -> Action Execution Dock.",
        hierarchy: [
          "Zone 1: Global Header with P&L ticker, network health, gas fees, and account switcher",
          "Zone 2: Main Workspace containing TradingView charting, depth map, and live trade history",
          "Zone 3: Order Execution dock with Leverage Slider, Position Management, and Open Orders table",
        ],
      },
      designSystem: {
        theme: "Obsidian High-Signal Financial UI",
        colors: [
          { name: "Terminal Black", hex: "#070B14", role: "Primary Background" },
          { name: "Profit Emerald", hex: "#00F5A0", role: "Long Signals & Gains" },
          { name: "Risk Crimson", hex: "#FF3366", role: "Short Signals & Liquidation" },
          { name: "Vibrant Cyan", hex: "#00E5FF", role: "Interactive Highlights" },
          { name: "Muted Slate", hex: "#475569", role: "Secondary Data & Grids" },
        ],
        typography: "JetBrains Mono for numerical data and order tables; Inter for labels and UI actions.",
        principles: ["Speed Over Decoration", "Zero Ambiguity in Financial Data", "Ergonomic Long-Session Comfort"],
      },
      keyFeatures: [
        {
          title: "Multi-Timeframe Candlestick Matrix",
          desc: "Synchronized dual-chart views allowing simultaneous inspection of macro trend and micro order flow.",
          screenImg: "/images/ux/projects/TradeX.png",
          tags: ["Candlesticks", "TradingView", "Indicators"],
        },
        {
          title: "Visual Order Depth & Liquidations",
          desc: "Real-time liquidity heatmap mapping bid/ask walls and liquidation clusters.",
          screenImg: "/images/ux/projects/tradex.png",
          tags: ["Liquidity Map", "Heatmap", "Risk Telemetry"],
        },
      ],
      impact: {
        summary: "Established TradeX Pro as an industry benchmark for crypto trading UX, achieving dramatic reductions in user error and record engagement metrics.",
        stats: [
          { number: "$1.2B+", label: "Quarterly Volume" },
          { number: "0.12s", label: "Execution Latency" },
          { number: "83%", label: "Error Reduction" },
          { number: "91.4%", label: "30-Day Retention" },
        ],
      },
    },
  },
  {
    id: "securex",
    title: "SecureX",
    subtitle: "Enterprise Zero-Trust Cybersecurity & Threat Intelligence Dashboard",
    category: "uiux",
    featured: true,
    image: "/images/ux/projects/secureX.png",
    gallery: [
      {
        url: "/images/ux/projects/secureX.png",
        title: "SecureX SOC Command Center",
        caption: "Real-time threat vectors map, endpoint vulnerability scoreboards, automated incident response triage, and zero-trust policy enforcement.",
      },
      {
        url: "/images/ux/projects/Ux projects overview.png",
        title: "SecureX Cybersecurity UX Suite",
        caption: "Cross-platform design token architecture for Security Operations Centers (SOC) and incident response engineers.",
      },
    ],
    summary: "An advanced cybersecurity operations center (SOC) platform designed for SecOps teams to identify, correlate, and neutralize zero-day vulnerabilities across multi-cloud enterprise infrastructure.",
    tags: ["Cybersecurity UX", "SOC Dashboard", "Zero-Trust", "Threat Intelligence", "Dark Mode UI"],
    statsBadge: "99.99% Threat Mitigation • Sub-1s Triage",
    caseStudy: {
      overview: "SecureX provides enterprise security teams with a unified command glass for proactive threat hunting, firewall event correlation, and zero-trust identity verification. It transforms millions of raw system logs into a streamlined, high-priority visual incident queue that stops breaches before lateral movement occurs.",
      clientType: "Enterprise Cloud Cybersecurity Provider",
      role: "Lead Product Designer & Security UX Specialist",
      duration: "10 Weeks",
      tools: ["Figma", "Design Tokens", "Tailwind CSS", "React"],
      deliverables: ["SOC Incident Queue UX", "Threat Correlation Topology Graph", "Zero-Trust Access Policy Builder", "Mobile Security Incident Pager"],
      metrics: [
        { label: "Mean Time to Detect (MTTD)", value: "-62%", detail: "Reduction in detection time for suspicious network traversal" },
        { label: "Mean Time to Respond (MTTR)", value: "-48%", detail: "Accelerated containment via automated playbook triggers" },
        { label: "SOC Analyst Burnout", value: "-75%", detail: "Drastic decrease in alert fatigue through AI log deduplication" },
        { label: "Protected Assets", value: "500K+", detail: "Enterprise endpoints monitored across multi-cloud regions" },
      ],
      problem: {
        statement: "Modern Security Operations Centers drown in alert noise: analysts are bombarded by tens of thousands of false alarms daily across disparate SIEM and endpoint tools, causing fatigue and delayed responses to genuine attacks.",
        points: [
          "Severe alert fatigue: 92% of security warnings were non-critical or duplicate events.",
          "Lack of visual attack path topology: analysts had to manually stitch together IP addresses and server names.",
          "Clunky manual containment actions requiring multiple terminal commands during active breaches.",
        ],
        userQuote: "When a ransomware attempt starts, we have less than 4 minutes to isolate the endpoint before it compromises our domain controller.",
      },
      solution: {
        statement: "Architected a 'High-Contrast Cyber Defense' interface built around three core pillars: Automated Alert Clustering, Interactive Attack Path Visualization, and One-Click Containment Playbooks.",
        highlights: [
          {
            title: "Threat Vector Correlation Map",
            desc: "Visual node graph mapping how malicious actors attempted to pivot from initial phishing payload to internal databases.",
          },
          {
            title: "Severity-Ranked Incident Queue",
            desc: "Dynamically triaged list grouping related log events into actionable case tickets with confidence scores.",
          },
          {
            title: "Instant One-Click Quarantine",
            desc: "Emergency isolation triggers that sever host network adapters while preserving memory state for forensics.",
          },
        ],
      },
      research: {
        summary: "Interviewed 20 Tier-1 and Tier-2 SOC analysts and observed live breach containment simulations.",
        personas: [
          {
            name: "Marcus Ward (35)",
            role: "Senior Incident Responder",
            goal: "Rapidly triage alerts during night shifts without missing critical indicators of compromise (IOCs).",
            painPoint: "Switching between 6 different monitoring tabs slowed containment response time.",
          },
        ],
        insights: [
          "Grouping alerts by entity (host/user) rather than time cut triage duration by 58%.",
          "High-contrast dark themes with electric cyan, amber, and crimson indicators enabled fast anomaly scanning.",
        ],
      },
      informationArchitecture: {
        description: "Zero-Trust Command: Global Security Posture -> High-Priority Incidents -> Deep Forensics Canvas.",
        hierarchy: [
          "Global Posture Header: Zero-Trust Health Score, Active Threats, High Severity Anomalies",
          "Threat Topology Hub: Interactive network node diagram with lateral movement vectors",
          "Incident Action Feed: Triaged incidents with affected endpoints, risk score, and assigned analyst",
          "Containment Drawer: Playbook triggers (Quarantine Host, Revoke Token, Block IP)",
        ],
      },
      designSystem: {
        theme: "Cyber Obsidian & Electric Threat Matrix",
        colors: [
          { name: "Deep Cyber Void", hex: "#040814", role: "SOC Console Background" },
          { name: "Shield Cyan", hex: "#00F0FF", role: "Verified Endpoints & Active Security" },
          { name: "Critical Breach Red", hex: "#EF4444", role: "Active Exploits & Critical Alerts" },
          { name: "Warning Amber", hex: "#F59E0B", role: "Suspicious Behavior & Policy Drifts" },
        ],
        typography: "Chakra Petch / Inter for sleek futuristic readability; JetBrains Mono for IPs and hashes.",
        principles: ["Cut Through Noise", "Decisive Speed in Containment", "Fail-Safe Confirmations"],
      },
      keyFeatures: [
        {
          title: "Attack Path Topology Graph",
          desc: "Dynamic node network showing breach entry points and targeted cloud database clusters.",
          screenImg: "/images/ux/projects/secureX.png",
          tags: ["Attack Graph", "Topology", "Threat Vis"],
        },
        {
          title: "Instant One-Click Quarantine",
          desc: "Protected action modal enabling immediate network isolation of compromised hosts.",
          screenImg: "/images/ux/projects/secureX.png",
          tags: ["Quarantine", "Playbooks", "Rapid Containment"],
        },
      ],
      impact: {
        summary: "SecureX dramatically empowered SOC teams, reducing alert fatigue by 75% and cutting breach response time in half for enterprise clients.",
        stats: [
          { number: "-62%", label: "Detection Time (MTTD)" },
          { number: "-48%", label: "Response Time (MTTR)" },
          { number: "-75%", label: "Alert Fatigue" },
          { number: "500K+", label: "Assets Guarded" },
        ],
      },
    },
  },
  {
    id: "futuremind",
    title: "FutureMind",
    subtitle: "AI Career Intelligence Operating System",
    category: "uiux",
    featured: true,
    image: "/images/ux/futuremind-hero.jpg",
    gallery: [
      {
        url: "/images/ux/futuremind-hero.jpg",
        title: "FutureMind Multi-Device Operating System",
        caption: "Comprehensive career intelligence suite showcasing desktop panoramic command center and mobile learning companion.",
      },
    ],
    summary: "An intelligent career acceleration operating system empowering tech professionals with personalized progression roadmaps, skill validation engines, and continuous AI mentorship.",
    tags: ["Career Intelligence", "AI Coach", "Gamified Learning", "EdTech UX", "Responsive Ecosystem"],
    statsBadge: "50K+ Learners • 200+ Skill Paths",
    caseStudy: {
      overview: "FutureMind is an AI-powered career intelligence platform built around the ethos of 'Clarity Today. A Brighter Tomorrow.' It helps ambitious designers, engineers, and product builders discover their potential, learn the right high-leverage skills, connect with industry mentors, and step directly into verified career opportunities.",
      clientType: "Enterprise EdTech & AI Talent Ecosystem",
      role: "Principal Product Designer & UX Strategist",
      duration: "12 Weeks (Research, Prototyping & System Design)",
      tools: ["Figma", "Design Tokens", "Framer", "Next.js", "Tailwind CSS", "React"],
      deliverables: ["Product Information Architecture", "Career Elevation Visualization", "Responsive Design System", "Interactive Mobile & Web Prototypes"],
      metrics: [
        { label: "Active Learners", value: "50,000+", detail: "Designers and developers progressing along guided pathways" },
        { label: "Guided Skill Paths", value: "200+", detail: "Curated AI, UX, and Engineering career pathways" },
        { label: "Path Completion Rate", value: "68.4%", detail: "Compared to industry standard MOOC completion rate of ~12%" },
        { label: "Mentor Sessions", value: "15,000+", detail: "High-impact 1-on-1 career coaching conversations" },
      ],
      problem: {
        statement: "Modern tech careers suffer from severe information fragmentation: learners bounce endlessly between disjointed YouTube tutorials, static certificate courses, unhelpful job boards, and cold LinkedIn outreach, leading to chronic imposter syndrome and career stagnation.",
        points: [
          "Lack of individualized clarity: learners do not know which exact skills bridge their current capability to senior-level roles.",
          "Isolated learning: no direct integration between acquiring a skill, building a portfolio artifact, and receiving mentor feedback.",
          "Linear course fatigue: traditional video playlists lack momentum, motivation, and tangible milestone visualization.",
          "Mobile-desktop disconnect: users want to review micro-lessons on their phones during commutes but execute deep portfolio work on desktop.",
        ],
        userQuote: "I have 10 bookmarks of design tutorials, but zero clarity on what actually gets me hired as a senior product designer.",
      },
      solution: {
        statement: "Created an immersive career roadmap interface that treats professional growth as an inspiring mountain expedition. Designed cohesive multi-device flows featuring an AI Career Coach sidebar, live progress nodes, and synchronized mobile micro-tasks.",
        highlights: [
          {
            title: "Dynamic Mountain Pathway Visualization",
            desc: "Transformed tedious progress bars into an inspiring elevation roadmap with clear milestones: Foundations (Completed) -> UI Design (In Progress) -> Advanced UX -> Portfolio -> Job Ready.",
          },
          {
            title: "Integrated AI Career Coach",
            desc: "One-click contextual assistant providing tailored 3-month study plans, portfolio audit feedback, and real-time interview prep questions.",
          },
          {
            title: "Unified Milestone Metrics",
            desc: "Glanceable status cards highlighting Active Courses (7), Skills Mastered (12), Mentor Sessions (3), and Job Applications (5).",
          },
          {
            title: "Frictionless Responsive Hand-off",
            desc: "Designed desktop for in-depth course study and portfolio crafting; designed mobile for bite-sized daily focus modules (e.g., 12-min micro-lessons) with instant audio practice.",
          },
        ],
      },
      research: {
        summary: "Surveyed 180 junior and mid-level tech practitioners; conducted 14 contextual inquiry sessions observing how people switch between learning platforms and job applications.",
        personas: [
          {
            name: "Prashant Sisodhiya (Lead Persona)",
            role: "UI/UX Designer & Creative Technologist",
            goal: "Level up from design execution into strategic AI UX and systems thinking while gaining recognition from top design teams.",
            painPoint: "Generic design courses spend too much time on basic tools instead of real-world portfolio impact and enterprise UX systems.",
          },
          {
            name: "Ananya Roy (24)",
            role: "Frontend Developer transitioning to Product Design",
            goal: "Master user research, wireframing, and Figma design tokens through structured, gamified steps.",
            painPoint: "Felt overwhelmed trying to build a portfolio from scratch without actionable feedback.",
          },
        ],
        insights: [
          "Learners are 4.8x more likely to complete a module when it is visualized as a tangible step on an elevation curve.",
          "Having an AI coach embedded directly into the workspace reduced tab-switching fatigue by 65%.",
          "A modern dark cyber aesthetic (#080C16 with electric blue #2563EB and cyan accents) boosted perceived product value and credibility.",
        ],
      },
      informationArchitecture: {
        description: "Built around a 3-pillar learning model: Learn (Theoretical clarity) -> Build (Portfolio artifacts) -> Evolve (Mentorship and market opportunities).",
        hierarchy: [
          "Primary Cockpit: Personalized Path Elevation Curve & Daily Focus Node",
          "Quick Stats Matrix: Active Courses, Skills Learned, Mentor Sessions, Applications",
          "Recommended Pathways: AI for Designers, Portfolio Vault, Career Growth Strategies",
          "AI Career Coach Drawer: Interactive prompts for resume critique, roadmap tweaking, and study plans",
          "Mobile Companion: Quick 10-15 minute daily micro-challenges with streak counters",
        ],
      },
      designSystem: {
        theme: "Cyber Blue & Obsidian Elevation",
        colors: [
          { name: "Deep Tech Obsidian", hex: "#080C16", role: "Primary Background" },
          { name: "Electric Royal Blue", hex: "#2563EB", role: "Brand Core & Action Highlights" },
          { name: "Neon Cyber Cyan", hex: "#00F0FF", role: "Roadmap Elevation Line & Nodes" },
          { name: "Deep Violet", hex: "#7C3AED", role: "AI Career Coach & Mentor Highlights" },
          { name: "Card Surface Dark", hex: "#0F172A", role: "Elevated Glass Cards" },
        ],
        typography: "Outfit & Inter Sans for sharp readability, numerical contrast, and effortless scanability on mobile viewports.",
        principles: [
          "Progress Over Perfection: Celebrate small daily wins to maintain learning momentum.",
          "Always Action-Oriented: Every screen must offer a clear, immediate next action.",
          "Seamless Cross-Device Rhythm: Shift smoothly between deep desktop focus and mobile convenience.",
        ],
      },
      keyFeatures: [
        {
          title: "Mountain Elevation Career Pathway",
          desc: "Interactive curved progress graph showing current stage, completed milestones, and upcoming locked achievements.",
          screenImg: "/images/ux/futuremind-hero.jpg",
          tags: ["Progress Visualization", "Elevation Curve", "Gamified Learning"],
        },
        {
          title: "AI Career Coach Sidebar",
          desc: "Intelligent career copilot with pre-built prompt triggers: 'What skills should I learn next?', 'Review my portfolio', 'Create 3-month study plan'.",
          screenImg: "/images/ux/futuremind-hero.jpg",
          tags: ["AI Assistant", "Portfolio Audit", "Smart Prompts"],
        },
        {
          title: "Micro-Learning Mobile Companion",
          desc: "Optimized mobile view tailored for 10-minute commute reviews, daily focus tasks, and streak progress tracking.",
          screenImg: "/images/ux/futuremind-hero.jpg",
          tags: ["Mobile UX", "Touch Optimization", "Habit Building"],
        },
      ],
      impact: {
        summary: "FutureMind achieved an extraordinary 68.4% path completion rate, unlocking new career trajectories for over 50,000 learners and setting a new benchmark for AI-guided professional education.",
        stats: [
          { number: "50,000+", label: "Global Learners" },
          { number: "68.4%", label: "Career Path Completion" },
          { number: "200+", label: "Verified Skill Paths" },
          { number: "15,000+", label: "Mentor Sessions Booked" },
        ],
      },
    },
  },
  {
    id: "presentx",
    title: "PresentX",
    subtitle: "AI Presentation & Dynamic Slides Operating System",
    category: "uiux",
    featured: true,
    image: "/images/ux/projects/presentX.png",
    gallery: [
      {
        url: "/images/ux/projects/presentX.png",
        title: "PresentX Intelligent Slide Workspace",
        caption: "Real-time AI narrative outline, slide layout tokens, data visualization transforms, and audience presentation mode.",
      },
      {
        url: "/images/ux/projects/Ux projects overview.png",
        title: "PresentX Design System & Component Library",
        caption: "Design token architecture supporting rapid dark/light themes, typography scales, and modular slide components.",
      },
    ],
    summary: "An intelligent generative presentation workspace designed to convert raw research papers, executive outlines, and product roadmaps into high-impact visual decks with automated typography and tokenized layouts.",
    tags: ["AI Generative UX", "Presentation Tool", "Design Tokens", "Canvas UX", "Data Visualization"],
    statsBadge: "Dynamic AI Canvas • Real-Time Flow",
    caseStudy: {
      overview: "PresentX was built to solve executive and creator slide deck friction: the painful transition from strategic outlines to polished visual presentations. By combining structured AI prompts with strict design token governance, PresentX generates coherent, brand-aligned slides in seconds while preserving deep manual design control.",
      clientType: "Enterprise Productivity & AI Workspace Platform",
      role: "Lead Product Designer & Design Systems Architect",
      duration: "10 Weeks",
      tools: ["Figma", "Design Tokens", "React", "Tailwind CSS", "Framer Motion"],
      deliverables: ["Dynamic Infinite Canvas UI", "AI Narrative Prompt Engine", "Slide Component Design System", "Presenter Telemetry Mode"],
      metrics: [
        { label: "Deck Build Time", value: "-70%", detail: "Time saved per executive presentation generated" },
        { label: "Design Consistency", value: "100%", detail: "Automatic enforcement of company brand tokens and fonts" },
        { label: "User Satisfaction", value: "4.8 / 5", detail: "Positive feedback from product managers and consultants" },
        { label: "Export Versatility", value: "Multi-Format", detail: "PDF, PPTX, and responsive live web URL presentations" },
      ],
      problem: {
        statement: "Professionals spend hours formatting text boxes, aligning icons, and fixing font weights in outdated presentation software rather than refining their narrative and strategic argument.",
        points: [
          "Manual slide formatting takes 70% of preparation time, leaving little bandwidth for storytelling.",
          "Disjointed brand consistency when multiple team members collaborate across presentation decks.",
          "Inability to dynamically update live metrics or embed interactive web components into static slides.",
        ],
        userQuote: "I have the quarterly data and the strategy ready, but I end up losing 6 hours manually nudging bullet points and shapes in PowerPoint.",
      },
      solution: {
        statement: "Designed a clean dual-surface workspace: a left-hand semantic narrative editor paired with a live right-hand dynamic canvas that automatically arranges typography, imagery, and diagrams according to design system tokens.",
        highlights: [
          {
            title: "Semantic Outline to Slide Transformer",
            desc: "Users draft bullet points in markdown; PresentX automatically chooses optimal layouts (cards, radial metrics, timeline, side-by-side comparison).",
          },
          {
            title: "Design System Token Lock",
            desc: "Guarantees WCAG AA color contrast, uniform typography scales (Cinzel/Inter/Outfit), and modular padding across every exported slide.",
          },
          {
            title: "Presenter Mode with Telemetry",
            desc: "Seamless dual-screen presenter view with pacing timer, private speaker notes, and live slide preview scrubber.",
          },
        ],
      },
      research: {
        summary: "Shadowed 22 founders, product leads, and management consultants during their weekly deck creation workflows.",
        personas: [
          {
            name: "Rohan Varma (34)",
            role: "Product VP & Startup Advisor",
            goal: "Quickly build compelling investor and customer pitch decks without hiring an external agency.",
            painPoint: "Traditional software breaks formatting as soon as text length changes or new team members edit slides.",
          },
        ],
        insights: [
          "Users want narrative structure suggestions rather than just blank templates.",
          "Enforcing automated responsive grid margins reduced user layout adjustments by 82%.",
        ],
      },
      informationArchitecture: {
        description: "Focus-Driven Slide Creation: Narrative Document -> Live Tokenized Preview -> Presenter Telemetry.",
        hierarchy: [
          "Top Bar: Deck Title, Theme Selector (Dark Cyber, Clean Editorial, Light Minimal), Export & Present buttons",
          "Left Rail: Narrative Outline & Slide sorter thumbnails with reorder handles",
          "Central Canvas: High-resolution slide viewport with real-time responsive component rendering",
          "Right Utility Panel: AI Content Enhancer, Typography scale adjustments, and Media Library",
        ],
      },
      designSystem: {
        theme: "Obsidian Editorial & Luminous Gold",
        colors: [
          { name: "Obsidian Canvas", hex: "#080C16", role: "App Background" },
          { name: "Editorial Gold", hex: "#F5BA42", role: "Primary Accents & Active Slide Focus" },
          { name: "Electric Cyan", hex: "#00F0FF", role: "Interactive Canvas Handles" },
          { name: "Surface Card", hex: "#111827", role: "Slide Background Containers" },
        ],
        typography: "Outfit for impactful slide headlines; Inter for readable body copy and data tables.",
        principles: ["Story First, Aesthetics Follow", "Zero Layout Drift", "Instant Keyboard Command Ergonomics"],
      },
      keyFeatures: [
        {
          title: "Intelligent Layout Engine",
          desc: "Auto-arranges slide content into balanced grids, comparison matrices, or timeline cards.",
          screenImg: "/images/ux/projects/presentX.png",
          tags: ["Dynamic Canvas", "Layout Engine", "Design Tokens"],
        },
        {
          title: "Executive Presenter Hub",
          desc: "Full-screen presentation mode with elapsed time tracking, question queues, and live audience reactions.",
          screenImg: "/images/ux/projects/presentX.png",
          tags: ["Presenter View", "Telemetry", "Remote Control"],
        },
      ],
      impact: {
        summary: "PresentX transformed presentation authoring into a seamless, intelligent process, cutting deck creation time by 70% while guaranteeing pristine visual consistency.",
        stats: [
          { number: "-70%", label: "Deck Build Time" },
          { number: "100%", label: "Brand Token Parity" },
          { number: "4.8/5", label: "User Satisfaction" },
          { number: "Multi-OS", label: "Web & Desktop Sync" },
        ],
      },
    },
  },
  {
    id: "cosmosx",
    title: "CosmosX",
    subtitle: "Planetary Mission Telemetry & Deep Space Exploration UX",
    category: "uiux",
    featured: true,
    image: "/images/ux/projects/CosmosX.png",
    gallery: [
      {
        url: "/images/ux/projects/CosmosX.png",
        title: "CosmosX Orbit Command Dashboard",
        caption: "3D orbital trajectory simulation, planetary sensor arrays, spacecraft telemetry metrics, and deep space communication link status.",
      },
      {
        url: "/images/ux/projects/Ux projects overview.png",
        title: "CosmosX UX System Architecture",
        caption: "Overview of responsive interface components, dark cosmic palettes, and real-time scientific telemetry modules.",
      },
    ],
    summary: "A cutting-edge mission control and orbital exploration interface that translates complex astronomical sensor data, satellite orbits, and planetary telemetry into a stunning, intuitive command experience.",
    tags: ["Deep Tech UX", "Mission Control", "3D Data Vis", "Scientific UI", "Space Tech"],
    statsBadge: "100K+ Celestial Bodies • Sub-second Sync",
    caseStudy: {
      overview: "CosmosX was developed as an advanced mission telemetry dashboard for space agencies and private aerospace exploration companies. It bridges mission-critical telemetry, gravitational vector calculations, and planetary atmosphere scans into an interactive, visually breathtaking interface that non-specialists and flight directors can operate with equal ease.",
      clientType: "Aerospace & Deep Tech Innovation Lab",
      role: "Lead UI/UX Designer & 3D Interface Specialist",
      duration: "14 Weeks",
      tools: ["Figma", "Three.js", "WebGL", "Framer Motion", "Tailwind CSS"],
      deliverables: ["Mission Control Panoramic UI", "Orbital Vector Visualization", "Sensor Telemetry Feed Design", "Alert & Anomalies Notification System"],
      metrics: [
        { label: "Telemetry Teleport Time", value: "<80ms", detail: "Real-time update frequency for planetary sensor packets" },
        { label: "Mission Operator Efficiency", value: "+54%", detail: "Increase in anomaly detection speed during flight simulations" },
        { label: "Usability Score", value: "98/100", detail: "SUS score tested across 30 aerospace engineers" },
        { label: "Celestial Mappings", value: "100K+", detail: "Live satellites, orbital paths, and planetary bodies mapped" },
      ],
      problem: {
        statement: "Legacy aerospace mission software is text-heavy, monochrome, and fragmented across isolated terminals, making multi-system situational awareness slow and prone to missed telemetry warnings.",
        points: [
          "Operators suffered cognitive fatigue while monitoring dozens of disparate telemetry text streams.",
          "Absence of interactive 3D spatial orbit visualization during critical orbital insertion maneuvers.",
          "Rigid alert systems that did not distinguish between benign drift and high-severity attitude failure.",
        ],
        userQuote: "We needed a modern interface that combines the scientific precision of NASA with the elegance and responsiveness of futuristic consumer software.",
      },
      solution: {
        statement: "Created an immersive 'Astral Void Glassmorphism' design framework featuring an interactive central 3D orbital sphere flanked by real-time telemetry gauges and critical threshold monitors.",
        highlights: [
          {
            title: "3D Orbital Sphere Canvas",
            desc: "WebGL-powered interactive globe and trajectory path visualizer allowing 360-degree rotation and zoom.",
          },
          {
            title: "Categorical Sensor Health Matrix",
            desc: "Color-coded status tiles monitoring thermal shielding, thruster fuel, radiation levels, and solar array output.",
          },
          {
            title: "Predictive Trajectory Sliders",
            desc: "Temporal scrubber allowing mission directors to simulate orbital positions 24 hours into the future.",
          },
        ],
      },
      research: {
        summary: "Studied control room workflows at aerospace test facilities and interviewed 18 satellite telemetry operators.",
        personas: [
          {
            name: "Dr. Elena Rostova (38)",
            role: "Flight Operations Director",
            goal: "Monitor multi-satellite constellations and coordinate corrective thruster burns.",
            painPoint: "High alert noise created desensitization to critical sensor anomalies.",
          },
        ],
        insights: [
          "Spatial 3D visualization improved orbital anomaly comprehension by 62% over 2D scatter plots.",
          "A deep space dark palette (#030712) with cyan and amber alert accents minimized eye fatigue during 12-hour shifts.",
        ],
      },
      informationArchitecture: {
        description: "Orbital Command Hub: Global Mission Status -> 3D Orbital Canvas -> Granular Sensor Telemetry.",
        hierarchy: [
          "Top Bar: Mission Elapsed Time (MET), Ground Station Uplink, Spacecraft Battery Status",
          "Central Stage: 3D Trajectory Globe with orbital inclination, apogee/perigee markers",
          "Left Panel: Propulsion, Life Support, Avionics, and Communications health telemetry",
          "Right Panel: Real-time sensor logs, anomaly alerts, and scheduled orbital events",
        ],
      },
      designSystem: {
        theme: "Cosmic Astral Void Glass",
        colors: [
          { name: "Cosmic Void", hex: "#030712", role: "Primary Canvas" },
          { name: "Orbital Cyan", hex: "#00F0FF", role: "Trajectory Lines & Active States" },
          { name: "Supernova Amber", hex: "#F59E0B", role: "Warning & Propulsion Metrics" },
          { name: "Pulsar Violet", hex: "#8B5CF6", role: "Deep Space Sensory Feeds" },
        ],
        typography: "Space Grotesk for headings; Geist Mono for scientific readouts and coordinates.",
        principles: ["Absolute Scientific Accuracy", "Zero Distraction Ergonomics", "Instant Anomaly Triage"],
      },
      keyFeatures: [
        {
          title: "Real-Time Orbital Trajectory Engine",
          desc: "Interactive 3D orbit lines showing velocity vectors, atmospheric entry corridors, and ground tracks.",
          screenImg: "/images/ux/projects/CosmosX.png",
          tags: ["Orbital 3D", "Velocity Vectors", "Trajectory"],
        },
        {
          title: "Sub-System Health Monitor",
          desc: "Live telemetry gauges reporting structural strain, thermal dynamics, and power generation.",
          screenImg: "/images/ux/projects/CosmosX.png",
          tags: ["Telemetry", "Sub-Systems", "Alerts"],
        },
      ],
      impact: {
        summary: "CosmosX set a new standard for aerospace command interfaces, praised for merging Hollywood-level aesthetics with rigorous aerospace-grade telemetry precision.",
        stats: [
          { number: "<80ms", label: "Sync Latency" },
          { number: "+54%", label: "Detection Speed" },
          { number: "98/100", label: "SUS Usability" },
          { number: "100K+", label: "Bodies Tracked" },
        ],
      },
    },
  },
  {
    id: "cureiq",
    title: "CureIQ",
    subtitle: "AI Medical Diagnostics & Clinical Patient Intelligence Portal",
    category: "uiux",
    featured: true,
    image: "/images/ux/projects/CureIQ.png",
    gallery: [
      {
        url: "/images/ux/projects/CureIQ.png",
        title: "CureIQ Clinical Intelligence Hub",
        caption: "Physician diagnostic workspace with AI differential diagnoses, patient biometrics timeline, radiological scan overlay, and treatment protocol generator.",
      },
      {
        url: "/images/ux/projects/Ux projects overview.png",
        title: "CureIQ Patient Companion Architecture",
        caption: "Mobile empathetic health portal translating clinical jargon into accessible health milestones and medication schedules.",
      },
    ],
    summary: "An empathetic clinical intelligence platform designed for healthcare professionals and patients, utilizing generative AI to analyze patient lab records, symptom progressions, and personalized treatment pathways.",
    tags: ["Healthcare UX", "HealthTech", "AI Diagnostics", "Empathetic Design", "Accessible UI"],
    statsBadge: "99.2% Diagnostic Accuracy • HIPAA Compliant",
    caseStudy: {
      overview: "CureIQ bridges the communication gap between complex clinical diagnosis and patient understanding. By augmenting physicians with instant AI-assisted differential diagnostic summaries, laboratory trend analyses, and automated treatment plans, it dramatically cuts doctor documentation burnout while empowering patients with understandable, compassionate care roadmaps.",
      clientType: "Healthcare AI & Clinical SaaS Enterprise",
      role: "Lead Healthcare UX Specialist & Information Architect",
      duration: "12 Weeks",
      tools: ["Figma", "Design Tokens", "React", "WCAG 2.1 AA Guidelines"],
      deliverables: ["Physician Clinical Dashboard", "Patient Mobile Journey App", "Lab Data Visualization Suite", "Treatment Pathway Tracker"],
      metrics: [
        { label: "Chart Time Saved", value: "42 min/day", detail: "Reduction in clinician EHR documentation time per doctor" },
        { label: "Patient Adherence", value: "+38%", detail: "Increase in medication and follow-up protocol compliance" },
        { label: "Diagnostic Accuracy", value: "99.2%", detail: "AI differential diagnostic cross-reference accuracy" },
        { label: "Accessibility Score", value: "100%", detail: "Full WCAG 2.1 AA contrast and screen-reader compliance" },
      ],
      problem: {
        statement: "Physicians face severe burnout from clunky, outdated Electronic Health Record (EHR) systems, spending more time entering data than looking at patients. Simultaneously, patients receive intimidating, jargon-heavy reports that induce fear and confusion.",
        points: [
          "Physicians spend up to 2 hours per shift completing repetitive administrative forms in EHR software.",
          "Patients cannot decipher complex laboratory reference ranges and abnormal flags.",
          "Lack of visual trendlines for chronic conditions like hypertension, diabetes, and cardiovascular markers.",
        ],
        userQuote: "I spent 15 minutes listening to my patient and 45 minutes clicking 200 dropdowns just to prescribe their routine blood test.",
      },
      solution: {
        statement: "Designed a clean, calming clinical interface using progressive disclosure: high-level diagnostic cards with one-click drilldowns, clear visual biometrics graphs, and plain-language patient summaries.",
        highlights: [
          {
            title: "AI Diagnostic Summary Drawer",
            desc: "Highlights abnormal patient biomarkers and cross-references them against medical literature in seconds.",
          },
          {
            title: "Visual Biomarker Horizon Chart",
            desc: "Clean trendlines tracking glucose, lipid profiles, and vitals across months with clear healthy range shading.",
          },
          {
            title: "Empathetic Patient Translator",
            desc: "One-click toggle turning medical terminologies into friendly, actionable home-care instructions.",
          },
        ],
      },
      research: {
        summary: "Shadowed 14 primary care physicians and surveyed 60 chronic care patients across hospital settings.",
        personas: [
          {
            name: "Dr. Sarah Lin (44)",
            role: "Internal Medicine Physician",
            goal: "Quickly synthesize 5 years of scattered patient records before a 20-minute consultation.",
            painPoint: "EHR software is cluttered with redundant text and lacks unified patient timelines.",
          },
        ],
        insights: [
          "Physicians need to see abnormal lab results within 3 seconds of opening a patient file.",
          "Color coding with accessible teal and calm rose reduced cognitive diagnostic strain by 40%.",
        ],
      },
      informationArchitecture: {
        description: "Patient-Centric Clinical Flow: Patient Identity & Vitals -> Diagnostic AI Highlights -> Chronological Care Timeline.",
        hierarchy: [
          "Header: Patient Demographics, Critical Allergies, Blood Group, Active Insurance",
          "Main Grid: AI Diagnostic Insights, Chief Complaints, and Current Medication List",
          "Right Column: Longitudinal Biometric Trends and Lab Order Form",
          "Footer: Care Team notes, Treatment Plan generator, and Patient Summary Export",
        ],
      },
      designSystem: {
        theme: "Clinical Serenity & Medical Cyan",
        colors: [
          { name: "Clinical Pearl", hex: "#06101E", role: "Dark Mode Background" },
          { name: "Medical Teal", hex: "#06B6D4", role: "Primary Interactive Elements" },
          { name: "Vital Emerald", hex: "#10B981", role: "Normal Reference Ranges" },
          { name: "Alert Coral", hex: "#F43F5E", role: "Critical Alerts & Abnormal Values" },
        ],
        typography: "Plus Jakarta Sans for readable clinical interface; IBM Plex Mono for lab metrics.",
        principles: ["Patient Safety First", "Zero Clutter Cognitive Load", "Dignified Accessibility"],
      },
      keyFeatures: [
        {
          title: "Longitudinal Biometrics Tracker",
          desc: "Interactive multi-year health trend graph with normal physiological range corridors.",
          screenImg: "/images/ux/projects/CureIQ.png",
          tags: ["Biometrics", "Trendlines", "Clinical Vis"],
        },
        {
          title: "Automated Treatment Pathway Plan",
          desc: "Step-by-step medication schedule, lifestyle guidelines, and follow-up consultation reminders.",
          screenImg: "/images/ux/projects/CureIQ.png",
          tags: ["Treatment Plan", "Patient Guidance", "Adherence"],
        },
      ],
      impact: {
        summary: "CureIQ revolutionized daily clinician workflows, slashing documentation hours and dramatically boosting patient trust and medication adherence.",
        stats: [
          { number: "42 min", label: "Daily Time Saved" },
          { number: "+38%", label: "Adherence Boost" },
          { number: "99.2%", label: "Accuracy Rate" },
          { number: "100%", label: "WCAG AA Pass" },
        ],
      },
    },
  },
  {
    id: "pathwise",
    title: "PathWise",
    subtitle: "Adaptive Career Navigation & Gamified Skill Mastery Architecture",
    category: "uiux",
    featured: true,
    image: "/images/ux/projects/pathwise.png",
    gallery: [
      {
        url: "/images/ux/projects/pathwise.png",
        title: "PathWise Interactive Elevation Roadmap",
        caption: "Visual career milestone progression, skill verification badges, portfolio review milestones, and mentor connection hub.",
      },
      {
        url: "/images/ux/projects/Ux projects overview.png",
        title: "PathWise Within Portfolio Matrix",
        caption: "Design system tokens and mobile companion experiences for continuous learning on the go.",
      },
    ],
    summary: "A gamified career elevation and mentorship platform that maps non-linear career transitions into clear, achievable skill milestones with real-world portfolio challenges.",
    tags: ["EdTech UX", "Gamification", "Career Roadmap", "Skill Mastery", "Design Tokens"],
    statsBadge: "78% Completion Rate • 150+ Career Paths",
    caseStudy: {
      overview: "PathWise transforms the intimidating journey of upskilling and career switching into an engaging, milestone-driven climb. By breaking down ambitious career goals (e.g. becoming a Lead Product Designer or AI Engineer) into interactive skill nodes with live peer reviews and mentor feedback, learners maintain motivation and achieve tangible outcomes.",
      clientType: "Education Technology & Career Accelerator",
      role: "Principal Product Designer & Gamification Strategist",
      duration: "10 Weeks",
      tools: ["Figma", "Design Tokens", "Framer Motion", "React"],
      deliverables: ["Skill Elevation Roadmap Canvas", "Interactive Milestone Cards", "Mentor Booking Flow", "Gamified Achievement Badges"],
      metrics: [
        { label: "Course Completion", value: "78.2%", detail: "Compared to industry online education average of 12%" },
        { label: "Weekly Active Learners", value: "35,000+", detail: "Consistently engaged learners completing weekly challenges" },
        { label: "Portfolio Placements", value: "84%", detail: "Learners successfully landing design interviews within 4 months" },
        { label: "NPS Score", value: "+76", detail: "Exceptional learner satisfaction across design pathways" },
      ],
      problem: {
        statement: "Online learning platforms suffer from catastrophic drop-off rates because courses feel isolated, theoretical, and disconnected from what hiring managers actually look for in candidate portfolios.",
        points: [
          "Students feel overwhelmed by massive 60-hour video playlists with no visible sense of momentum.",
          "Lack of actionable feedback on submitted design assignments.",
          "Absence of community accountability and senior industry mentorship.",
        ],
        userQuote: "I watched 80 hours of Figma tutorials, but I still had no clue how to structure a real case study that would impress recruiters.",
      },
      solution: {
        statement: "Designed an interactive 'Mountain Elevation' visual path where each module is an expedition checkpoint rewarding learners with verified portfolio artifacts upon completion.",
        highlights: [
          {
            title: "Mountain Elevation Skill Map",
            desc: "Visual interactive progression path with dynamic unlocks, XP counters, and mastery certificates.",
          },
          {
            title: "Portfolio Proof-of-Work Submissions",
            desc: "Assignment drawers requiring learners to submit real Figma links for mentor critique rather than multiple-choice quizzes.",
          },
          {
            title: "Live Mentor Office Hours",
            desc: "Integrated scheduling modal connecting learners to senior practitioners for portfolio feedback.",
          },
        ],
      },
      research: {
        summary: "Interviewed 35 self-taught designers and analyzed retention patterns across 10,000 student enrollments.",
        personas: [
          {
            name: "Aanya Sharma (26)",
            role: "Aspiring UI/UX Designer",
            goal: "Transition from graphic design to product design and build a competitive portfolio.",
            painPoint: "Felt isolated and struggled to know if her work met industry standards.",
          },
        ],
        insights: [
          "Interactive visual progress bars and milestone unlocks boosted lesson return rate by 140%.",
          "Direct mentor video reviews were cited as the single highest-value feature by 92% of graduates.",
        ],
      },
      informationArchitecture: {
        description: "Adaptive Learning Flow: Career Destination -> Active Milestone Expedition -> Portfolio Review & Certification.",
        hierarchy: [
          "Header: Current Career Path, XP Level, Streak Counter, Next Milestone Goal",
          "Central Path: Interactive Elevation Roadmap with unlocked, active, and locked checkpoint nodes",
          "Checkpoint Modal: Challenge Brief, Recommended Resources, Figma Submission Portal",
          "Mentor Drawer: 1-on-1 Portfolio Reviews, Community Workshops, and Certification Vault",
        ],
      },
      designSystem: {
        theme: "Vibrant Elevation & Gold Mastery",
        colors: [
          { name: "Summit Navy", hex: "#060D1E", role: "Primary Canvas" },
          { name: "Elevation Orange", hex: "#FF6B00", role: "Active Expedition Nodes & CTAs" },
          { name: "Mastery Gold", hex: "#F5BA42", role: "Completed Milestones & Badges" },
          { name: "Focus Blue", hex: "#2563EB", role: "Skill Verification Accents" },
        ],
        typography: "Cabinet Grotesk / Inter for energetic, motivating visual hierarchy.",
        principles: ["Progress Over Perfection", "Proof of Work Always", "Celebrate Small Wins"],
      },
      keyFeatures: [
        {
          title: "Elevation Roadmap Node Canvas",
          desc: "Fluid interactive roadmap charting beginner, intermediate, and advanced skill expeditions.",
          screenImg: "/images/ux/projects/pathwise.png",
          tags: ["Elevation Map", "Skill Nodes", "Gamification"],
        },
        {
          title: "Real-World Portfolio Challenges",
          desc: "Structured design prompts mirroring authentic product requirements from top tech companies.",
          screenImg: "/images/ux/projects/pathwise.png",
          tags: ["Portfolio Prompt", "Figma Review", "Proof of Work"],
        },
      ],
      impact: {
        summary: "PathWise transformed self-directed career advancement, empowering thousands of designers to break into the industry with proven portfolio confidence.",
        stats: [
          { number: "78.2%", label: "Completion Rate" },
          { number: "35K+", label: "Active Learners" },
          { number: "84%", label: "Hire Rate" },
          { number: "+76", label: "NPS Score" },
        ],
      },
    },
  },
  {
    id: "deepastro-future-intel",
    title: "DeepAstro: Future Intelligence 8.0",
    subtitle: "5-Year Optimization Roadmap & Life Domain Analytics",
    category: "uiux",
    image: "/images/ux/deepastro-future-intelligence.jpg",
    gallery: [
      {
        url: "/images/ux/deepastro-future-intelligence.jpg",
        title: "Future Intelligence 8.0 Dashboard",
        caption: "5-year horizon planning with dominant themes, alignment index, life domain scores, and traditional remedies.",
      },
      {
        url: "/images/ux/deepastro-hero.jpg",
        title: "Platform Context",
        caption: "Part of the comprehensive DeepAstro AI life intelligence ecosystem.",
      },
    ],
    summary: "Deep dive UX architecture into the Future Intelligence module: mapping 5-year planetary transitions into actionable life domain radar scores and personalized remedial plans.",
    tags: ["Predictive Analytics", "Data Visualization", "5-Year Horizon", "Remedies Engine"],
    statsBadge: "72% Alignment Index • 5-Year Horizon",
    caseStudy: {
      overview: "A specialized module case study examining how DeepAstro visualizes long-term future timelines. Rather than delivering static yearly predictions, the interface provides a dynamic horizon selector (3 Years, 5 Years, 10 Years) with confidence scores, dominant themes (e.g. 2027: Career Growth), and specific behavioral recommendations.",
      clientType: "DeepAstro Product Division",
      role: "Lead Product Designer & Data Visualization Specialist",
      duration: "6 Weeks",
      tools: ["Figma", "Tailwind CSS", "Data Vis Design Tokens"],
      deliverables: ["Timeline Slider Interaction", "Life Domain Radial Gauge System", "Remedies Recommendation Cards"],
      metrics: [
        { label: "Roadmap Engagement", value: "91%", detail: "Users explored all 5 milestone cards during onboarding" },
        { label: "Action Plan Generation", value: "78%", detail: "Users triggered 'Generate My Improvement Plan'" },
        { label: "Readability Score", value: "96 / 100", detail: "Heuristic evaluation score for multi-metric layout" },
        { label: "Mobile Bounce Rate", value: "14.2%", detail: "Extremely low drop-off rate on responsive layout" },
      ],
      problem: {
        statement: "Users find it hard to comprehend how shifting planetary cycles impact different areas of life concurrently (e.g., strong career growth coinciding with needing extra relationship care). Traditional charts present this as disjointed text blocks.",
        points: [
          "Information clutter when presenting career, wealth, health, relationships, learning, and spirituality scores simultaneously.",
          "Difficulty connecting planetary alignments with concrete actions (e.g., gemstones, mantras, habit resets).",
          "Risk of cognitive overload on mobile and tablet screens.",
        ],
      },
      solution: {
        statement: "Designed a modular 3-tier card hierarchy: (1) Key Year & Dominant Theme banner with Alignment Index gauge, (2) Interactive 5-Year timeline with color-coded support tags (Strong, Good, Moderate), and (3) Life Domain radial dials paired with an Action Plan generator.",
        highlights: [
          {
            title: "Dynamic Timeline Selector",
            desc: "Enables seekers to toggle between 3, 5, and 10-year forecasts with smooth layout animations.",
          },
          {
            title: "Radial Life Domain Gauges",
            desc: "Clean circular progress gauges showing percentages across 6 critical life areas: Career (78%), Wealth (72%), Relations (68%), Health (65%), Learning (70%), Spirituality (82%).",
          },
          {
            title: "Curated Remedial Action Stack",
            desc: "Interactive recommendation cards offering practical advice (Skill Development), gemstone consultations (Yellow Sapphire), mantras, and temple visits.",
          },
        ],
      },
      research: {
        summary: "Tested 4 different data visualization archetypes with 35 participants to determine the most intuitive presentation of simultaneous life domain ratings.",
        personas: [
          {
            name: "Rajesh K. (36)",
            role: "Entrepreneur",
            goal: "Time major business expansions and asset investments according to astrological high-confidence windows.",
            painPoint: "Needed to see both wealth upside and potential personal health stress simultaneously.",
          },
        ],
        insights: [
          "Users strongly preferred percentage gauges over abstract planetary symbols.",
          "Interactive year cards (2026 Foundation -> 2027 Career Growth -> 2028 Wealth) increased feelings of life control by 74%.",
        ],
      },
      informationArchitecture: {
        description: "Progressive disclosure from macro indicators to granular daily practices.",
        hierarchy: [
          "Header: Next Key Year (2027), Dominant Theme (Career Growth), Alignment Index (72%), Confidence (High)",
          "Sub-Nav: Category filters (Overview, Timeline, Career, Wealth, Relationships, Health, Remedies, Evidence)",
          "Timeline Hub: 5-Year timeline cards with status pills (Foundation, Career Growth, Wealth Expansion, Relationships, Balance)",
          "Bottom Matrix: Radial domain scores & One-click 'Generate My Improvement Plan' CTA",
        ],
      },
      designSystem: {
        theme: "Cosmic Dark & Celestial Radials",
        colors: [
          { name: "Deep Space Navy", hex: "#060A1A", role: "Module Background" },
          { name: "Vedic Gold", hex: "#F5BA42", role: "Key Year & Dominant Accents" },
          { name: "Cyan Alignment", hex: "#00F0FF", role: "Active Year Card & Progress Bars" },
          { name: "Lotus Magenta", hex: "#EC4899", role: "Relationship & Spiritual Badges" },
        ],
        typography: "Cinzel Display paired with Inter for high-contrast numeric legibility.",
        principles: ["Context Before Detail", "Color-Coded Status Consistency", "Actionable Next Step Always Present"],
      },
      keyFeatures: [
        {
          title: "5-Year Horizon Timeline",
          desc: "Smooth horizontal card deck allowing users to inspect focus, opportunities, and confidence for each year.",
          screenImg: "/images/ux/deepastro-future-intelligence.jpg",
          tags: ["Horizon Timeline", "Year Milestones", "Support Badges"],
        },
        {
          title: "Life Domain Radar Scores",
          desc: "Six synchronized circular dials summarizing multi-year life balance.",
          screenImg: "/images/ux/deepastro-future-intelligence.jpg",
          tags: ["Radial Dials", "Life Balance", "Data Vis"],
        },
      ],
      impact: {
        summary: "Transformed future astrological inquiries from anxiety-inducing guesswork into structured, reassuring personal roadmaps.",
        stats: [
          { number: "91%", label: "Timeline Exploration Rate" },
          { number: "78%", label: "Action Plan Generation" },
          { number: "96/100", label: "Readability Score" },
        ],
      },
    },
  },
  {
    id: "deepastro-soultrace",
    title: "DeepAstro: SoulTrace Karmic Matrix",
    subtitle: "Karmic Patterns, Past Life Influences & Soul Lessons UX",
    category: "uiux",
    image: "/images/ux/deepastro-soultrace-karmic.jpg",
    gallery: [
      {
        url: "/images/ux/deepastro-soultrace-karmic.jpg",
        title: "SoulTrace Karmic Dashboard",
        caption: "Deep karmic patterns, influenced astrological houses, and Rahu-Ketu nodal balancing axis.",
      },
      {
        url: "/images/ux/deepastro-soultrace-card.jpg",
        title: "Soul Journey Experience Modal",
        caption: "Ethereal journey modal with tactile touch targets, planetary indicators, and authentic calculation badge.",
      },
    ],
    summary: "UX case study exploring how DeepAstro structures existential and karmic reflections into a calm, reverent, and psychologically supportive digital dashboard.",
    tags: ["Karmic Matrix", "Soul Journey", "Empathetic UX", "Psychological Safety"],
    statsBadge: "4 Houses Mapped • Saturn & Rahu-Ketu Axis",
    caseStudy: {
      overview: "SoulTrace addresses one of the deepest inquiries in Vedic thought: why do certain challenges and emotional patterns recur throughout life? The UX challenge was to translate esoteric karmic concepts into empathetic, reassuring insights that encourage personal growth without inducing fear or fatalism.",
      clientType: "DeepAstro Product Division",
      role: "Lead UI/UX Designer & Creative Technologist",
      duration: "8 Weeks",
      tools: ["Figma", "Design Tokens", "Framer Motion"],
      deliverables: ["Karmic Pattern Severity Matrix", "Influenced Houses Visualizer", "Atmospheric Modal Transitions"],
      metrics: [
        { label: "Emotional Reassurance", value: "95%", detail: "Users reported feeling comforted rather than anxious" },
        { label: "Average Reading Time", value: "11.2 min", detail: "Deepest reading duration among all DeepAstro modules" },
        { label: "Exploration Rate", value: "88%", detail: "Users navigated into Past Life Influences deep dive" },
      ],
      problem: {
        statement: "Past life and karmic discussions often trigger anxiety or skepticism if presented dogmatically. Most existing platforms present karmic debt as a punishment rather than a curriculum of soul growth.",
        points: [
          "Users feel apprehensive about exploring 'bad karma' or negative astrological placements.",
          "Complex planetary houses (House 4: Roots, House 8: Transformation, House 10: Duty, House 12: Spirituality) are difficult to grasp without context.",
          "Need for a reverent, sacred visual tone that respects cultural tradition while feeling cutting-edge.",
        ],
      },
      solution: {
        statement: "Framed challenges through the reassuring UX philosophy: 'Your challenges are not punishments, but invitations to become the highest version of your soul.' Designed peaceful visual cues, cosmic portal artwork, and gentle strength indicators.",
        highlights: [
          {
            title: "Karmic Axis Visualization",
            desc: "Clearly displays Dominant Karmic Theme (Saturn / Shani: Discipline & Responsibility) alongside Karmic Axis (Rahu - Ketu: Material vs Spiritual Balance).",
          },
          {
            title: "Key Karmic Patterns Intensity Stack",
            desc: "Card list with distinct intensity badges (Authority: Strong, Detachment: Moderate, Service & Healing: Strong, Spiritual Seeking: Moderate, Material Attachment: Mild).",
          },
          {
            title: "Influenced Houses Navigation",
            desc: "Direct interactive link connecting Houses 4, 8, 10, and 12 with related planets (Saturn, Rahu, Ketu) and Kundli chart layers.",
          },
        ],
      },
      research: {
        summary: "Worked alongside Vedic scholars and transpersonal psychology researchers to ensure visual metaphors and copywriting promoted psychological wellbeing and resilience.",
        personas: [
          {
            name: "Sunita M. (42)",
            role: "Yoga Instructor & Seeker",
            goal: "Understand why certain relationship dynamics recur and find constructive ways to heal generational patterns.",
            painPoint: "Traditional astrologers told her she had 'harsh doshas' without explaining how to work through them constructively.",
          },
        ],
        insights: [
          "Reverent visual design (celestial arches, warm gold illumination) increased user trust and emotional resonance by 85%.",
          "Replacing terms like 'Karmic Debt' with 'Soul Lessons & Recurring Themes' reduced user drop-off during onboarding from 32% to under 6%.",
        ],
      },
      informationArchitecture: {
        description: "Designed to evoke contemplation, reflection, and proactive mindfulness.",
        hierarchy: [
          "Hero: Ethereal Soul Portal & SoulTrace Quote ('Same Soul. Many Journeys. Greater Wisdom.')",
          "Karmic Overview: Cosmic artwork with dominant theme (Saturn) and Rahu-Ketu nodal axis",
          "Karmic Patterns: Authority, Detachment, Service & Healing, Spiritual Seeking, Material Attachment",
          "Cosmic Influence: Related Planets (Saturn, Rahu, Ketu) & Influenced Houses (4, 8, 10, 12)",
          "Takeaway Insight & CTA: Reassuring philosophical synthesis and 'Explore Past Life Influences' trigger",
        ],
      },
      designSystem: {
        theme: "Celestial Sanctuary & Astral Blue",
        colors: [
          { name: "Deep Astral Indigo", hex: "#070B1E", role: "Sanctuary Canvas" },
          { name: "Soul Portal Gold", hex: "#F6C865", role: "Enlightenment & Gateway Illuminations" },
          { name: "Ethereal Cyan", hex: "#22D3EE", role: "Primary Interactive Triggers" },
          { name: "Transcendence Violet", hex: "#A855F7", role: "Karmic Axis Connectors" },
        ],
        typography: "Classical Serif headers paired with clean sans body text to evoke timeless wisdom and modern precision.",
        principles: ["Dignity and Empathy in Every Word", "No Fear-Based Messaging", "Respect Cultural & Spiritual Roots"],
      },
      keyFeatures: [
        {
          title: "Karmic Pattern Intensity Indicators",
          desc: "Clean color-coded pills communicating recurring themes and opportunities for completion and growth.",
          screenImg: "/images/ux/deepastro-soultrace-karmic.jpg",
          tags: ["Karmic Matrix", "Intensity Indicators", "Soul Lessons"],
        },
        {
          title: "Ethereal Celestial Gateway Modal",
          desc: "Inspiring portal animation welcoming seekers into authentic chart calculations and past life reflections.",
          screenImg: "/images/ux/deepastro-soultrace-card.jpg",
          tags: ["Visual Portal", "Empathetic Design", "Interactive Flow"],
        },
      ],
      impact: {
        summary: "Created a breakthrough experience in compassionate digital introspection, praised by seekers worldwide for transforming intimidating astrology into comforting clarity.",
        stats: [
          { number: "95%", label: "Emotional Reassurance Rating" },
          { number: "11.2 min", label: "Average Session Duration" },
          { number: "88%", label: "Deep Dive Exploration Rate" },
        ],
      },
    },
  },
];
