"use client";

import { useEffect, useRef } from "react";
import { Mail, Download, ExternalLink } from "lucide-react";
import { ProfileData } from "@/app/page";

interface FooterProps {
  profile: ProfileData;
}

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  alphaSpeed: number;
  isSparkle: boolean;
  angle: number;
  spin: number;
}

export default function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const starColors = [
      "rgba(0, 240, 255, ",   // Electric Blue
      "rgba(157, 78, 221, ",  // Violet
      "rgba(212, 160, 23, ",   // Gold
      "rgba(255, 255, 255, ",  // White
    ];

    const initStars = (w: number, h: number) => {
      stars = [];
      const totalStars = 50;
      
      for (let i = 0; i < totalStars; i++) {
        const isSparkle = Math.random() > 0.4;
        const colorTemplate = isSparkle
          ? starColors[Math.floor(Math.random() * (starColors.length - 1))]
          : "rgba(255, 255, 255, ";
          
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: -0.05 + Math.random() * 0.1,
          vy: 0.04 + Math.random() * 0.12,
          size: isSparkle ? 0.7 + Math.random() * 0.8 : 0.3 + Math.random() * 0.5,
          color: colorTemplate,
          alpha: Math.random(),
          alphaSpeed: 0.003 + Math.random() * 0.01,
          isSparkle,
          angle: Math.random() * Math.PI * 2,
          spin: -0.008 + Math.random() * 0.016,
        });
      }
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initStars(rect.width, rect.height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawSparkle = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      color: string,
      alpha: number,
      angle: number
    ) => {
      c.save();
      c.translate(cx, cy);
      c.rotate(angle);
      c.beginPath();

      const outer = size * 2.0;
      const inner = size * 0.4;
      const spikes = 4;
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;

      c.moveTo(0, -outer);
      for (let i = 0; i < spikes; i++) {
        let x = Math.cos(rot) * outer;
        let y = Math.sin(rot) * outer;
        c.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * inner;
        let yInner = Math.sin(rot) * inner;
        c.lineTo(x, yInner);
        rot += step;
      }
      c.lineTo(0, -outer);
      c.closePath();

      c.fillStyle = `${color}${alpha})`;
      c.fill();
      c.restore();
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.classList.contains("dark");

      stars.forEach((s) => {
        s.alpha += s.alphaSpeed;
        if (s.alpha > 0.85 || s.alpha < 0.15) {
          s.alphaSpeed = -s.alphaSpeed;
        }
        s.alpha = Math.max(0.1, Math.min(0.85, s.alpha));

        s.y += s.vy;
        s.x += s.vx;
        s.angle += s.spin;

        if (s.y > h) {
          s.y = -10;
          s.x = Math.random() * w;
        }
        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;

        const displayAlpha = isDark ? s.alpha : s.alpha * 0.4;

        if (s.isSparkle) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${s.color}${displayAlpha * 0.12})`;
          ctx.fill();

          drawSparkle(ctx, s.x, s.y, s.size, s.color, displayAlpha, s.angle);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `${s.color}${displayAlpha})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const socialLinks = [
    { 
      name: "LinkedIn", 
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ), 
      url: "https://linkedin.com",
      hoverClass: "hover:text-[#0077b5] hover:border-[#0077b5] hover:shadow-[0_0_10px_rgba(0,119,181,0.4)]"
    },
    { 
      name: "Instagram", 
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ), 
      url: "https://instagram.com",
      hoverClass: "hover:text-[#e1306c] hover:border-[#e1306c] hover:shadow-[0_0_10px_rgba(225,48,108,0.4)]"
    },
    { 
      name: "YouTube", 
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.163c-.272-.98-1.09-1.755-2.127-2.022C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.37.541C1.593 4.408.775 5.184.502 6.163 0 7.98 0 12 0 12s0 4.02.502 5.837c.273.98 1.09 1.755 2.127 2.022C4.5 20.4 12 20.4 12 20.4s7.5 0 9.37-.541c1.037-.267 1.855-1.042 2.127-2.022C24 16.02 24 12 24 12s0-4.02-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ), 
      url: "https://youtube.com",
      hoverClass: "hover:text-[#ff0000] hover:border-[#ff0000] hover:shadow-[0_0_10px_rgba(255,0,0,0.4)]"
    },
    { 
      name: "Behance", 
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 7h-7v1.5h7V7zm-1.125 4.5c-.328-.518-.842-.816-1.523-.816-.763 0-1.309.387-1.558.986-.145.347-.202.825-.202 1.488h3.585c-.009-.768-.112-1.295-.302-1.658zm.134 4.084h-5.064c.057.697.29 1.189.697 1.464.444.303 1.055.452 1.83.452.793 0 1.4-.2 1.821-.601.272-.258.468-.621.583-1.085h1.77c-.198 1.018-.68 1.796-1.442 2.336C20.301 23.498 19.014 24 17.502 24c-2.146 0-3.791-.649-4.937-1.946-1.093-1.238-1.64-2.923-1.64-5.056 0-2.115.541-3.79 1.624-5.027C13.673 10.708 15.289 10 17.404 10c2.062 0 3.633.626 4.717 1.88 1.036 1.196 1.54 2.825 1.512 4.886h-2.616c.009-.434-.055-.838-.17-1.182zM8.136 14.86c.691.246 1.221.666 1.59 1.258.37.593.555 1.353.555 2.279 0 1.597-.568 2.809-1.703 3.637C7.575 22.766 5.86 23.18 3.434 23.18H0V.82h3.948c2.146 0 3.738.384 4.774 1.151 1.036.768 1.555 1.831 1.555 3.19 0 .93-.243 1.696-.729 2.298-.485.602-1.187 1.026-2.106 1.272.996.222 1.761.684 2.296 1.385.535.702.802 1.583.802 2.646 0 .977-.184 1.815-.551 2.513-.367.697-.918 1.225-1.653 1.585zM3 13.916v6.257h.953c1.139 0 1.959-.204 2.458-.611.5-.408.75-.989.75-1.745 0-.742-.259-1.32-.779-1.733-.52-.413-1.428-.62-2.723-.62H3zm0-10.366v5.276h1.27c.928 0 1.6-.179 2.013-.538.413-.358.62-.88.62-1.564 0-.693-.2-1.218-.601-1.576-.401-.358-1.103-.537-2.106-.537H3z"/>
        </svg>
      ), 
      url: "https://linkedin.com",
      hoverClass: "hover:text-[#0077b5] hover:border-[#0077b5] hover:shadow-[0_0_10px_rgba(0,119,181,0.4)]"
    },
    { 
      name: "Instagram", 
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ), 
      url: "https://instagram.com",
      hoverClass: "hover:text-[#e1306c] hover:border-[#e1306c] hover:shadow-[0_0_10px_rgba(225,48,108,0.4)]"
    },
    { 
      name: "YouTube", 
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.163c-.272-.98-1.09-1.755-2.127-2.022C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.37.541C1.593 4.408.775 5.184.502 6.163 0 7.98 0 12 0 12s0 4.02.502 5.837c.273.98 1.09 1.755 2.127 2.022C4.5 20.4 12 20.4 12 20.4s7.5 0 9.37-.541c1.037-.267 1.855-1.042 2.127-2.022C24 16.02 24 12 24 12s0-4.02-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ), 
      url: "https://youtube.com",
      hoverClass: "hover:text-[#ff0000] hover:border-[#ff0000] hover:shadow-[0_0_10px_rgba(255,0,0,0.4)]"
    },
    { 
      name: "Behance", 
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 7h-7v1.5h7V7zm-1.125 4.5c-.328-.518-.842-.816-1.523-.816-.763 0-1.309.387-1.558.986-.145.347-.202.825-.202 1.488h3.585c-.009-.768-.112-1.295-.302-1.658zm.134 4.084h-5.064c.057.697.29 1.189.697 1.464.444.303 1.055.452 1.83.452.793 0 1.4-.2 1.821-.601.272-.258.468-.621.583-1.085h1.77c-.198 1.018-.68 1.796-1.442 2.336C20.301 23.498 19.014 24 17.502 24c-2.146 0-3.791-.649-4.937-1.946-1.093-1.238-1.64-2.923-1.64-5.056 0-2.115.541-3.79 1.624-5.027C13.673 10.708 15.289 10 17.404 10c2.062 0 3.633.626 4.717 1.88 1.036 1.196 1.54 2.825 1.512 4.886h-2.616c.009-.434-.055-.838-.17-1.182zM8.136 14.86c.691.246 1.221.666 1.59 1.258.37.593.555 1.353.555 2.279 0 1.597-.568 2.809-1.703 3.637C7.575 22.766 5.86 23.18 3.434 23.18H0V.82h3.948c2.146 0 3.738.384 4.774 1.151 1.036.768 1.555 1.831 1.555 3.19 0 .93-.243 1.696-.729 2.298-.485.602-1.187 1.026-2.106 1.272.996.222 1.761.684 2.296 1.385.535.702.802 1.583.802 2.646 0 .977-.184 1.815-.551 2.513-.367.697-.918 1.225-1.653 1.585zM3 13.916v6.257h.953c1.139 0 1.959-.204 2.458-.611.5-.408.75-.989.75-1.745 0-.742-.259-1.32-.779-1.733-.52-.413-1.428-.62-2.723-.62H3zm0-10.366v5.276h1.27c.928 0 1.6-.179 2.013-.538.413-.358.62-.88.62-1.564 0-.693-.2-1.218-.601-1.576-.401-.358-1.103-.537-2.106-.537H3z"/>
        </svg>
      ), 
      url: "https://behance.net",
      hoverClass: "hover:text-[#0057ff] hover:border-[#0057ff] hover:shadow-[0_0_10px_rgba(0,87,255,0.4)]"
    },
    { 
      name: "Dribbble", 
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.203c-.398-.105-3.11-.777-6.284-.365 1.293 3.552 1.825 6.47 1.926 7.088 2.525-1.51 4.103-4.148 4.358-6.723zm-1.89-2.07c-.122-.023-2.617-.468-5.354-.02-1.157-2.716-2.317-5.184-2.6-5.78 2.684.975 4.745 3.01 5.922 5.678-1.177-2.668-3.238-4.703-5.922-5.678-.073.155-.078.167-.098.21-.297.625-1.493 3.197-2.607 5.992-3.125-.925-6.134-1.22-6.527-1.25.795-2.658 2.66-4.825 5.113-5.836-.073.12-.137.234-.196.347-.367.7-.687 1.488-.95 2.33 2.802.724 5.316 2.222 6.945 4.356 1.63-2.134 4.143-3.632 6.946-4.356.262-.843.582-1.63.95-2.33.06-.113.123-.227.195-.347C19.34 4.972 21.205 7.14 22 9.797c-.393.03-3.402.325-6.527 1.25-.022.054-.042.106-.064.162-.647 1.603-1.328 3.234-2.008 4.8-.02.046-.04.093-.06.14a408.064 408.064 0 0 1-2.068-4.94c3.174-.412 5.886.26 6.284.365a19.78 19.78 0 0 0-.25-4.526c-1.629-2.134-4.143-3.632-6.946-4.356-.02-.046-.04-.093-.06-.14L8.23 2.106C10.027 1.895 11.233 1.8 12 1.8c.767 0 1.973.095 3.77.306L15.71.446c-.02-.046-.04-.093-.06-.14a19.78 19.78 0 0 0-4.35 6.924c-2.453 1.011-4.318 3.178-5.113 5.836.393.03 3.402.325 6.527 1.25.109-.275.22-.552.333-.83.682-1.674 1.41-3.39 2.15-5.066.02-.046.04-.093.06-.14A408.064 408.064 0 0 0 17.39 12.3c2.737-.448 5.232-.003 5.354.02.122.023 2.617.468 5.354.02.262.843.582 1.63.95 2.33a19.78 19.78 0 0 0-5.922-5.678zm-11.758.857c.237-.768.528-1.48.86-2.127.052-.102.11-.202.164-.3-.11.025-.218.05-.328.08C6.67 11.666 4.31 13 3.195 14.86c.642.067 3.522.288 5.285-1.127zm.332 3.187c-1.442 1.157-3.782.977-4.484.918 1.134 2.57 3.327 4.545 6.012 5.258-.06-.525-.43-2.617-1.528-6.176z"/>
        </svg>
      ), 
      url: "https://dribbble.com",
      hoverClass: "hover:text-[#ea4c89] hover:border-[#ea4c89] hover:shadow-[0_0_10px_rgba(234,76,137,0.4)]"
    },
    { 
      name: "Email", 
      icon: <Mail className="w-3.5 h-3.5" />, 
      url: `mailto:${profile.email}`,
      hoverClass: "hover:text-gold hover:border-gold hover:shadow-[0_0_10px_rgba(212,160,23,0.4)]"
    },
  ];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="relative bg-white dark:bg-[#090A0E] border-t border-black/5 dark:border-white/10 py-10 overflow-hidden transition-colors duration-300">
      
      {/* Canvas for Twinkling Stars strictly within the footer container */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Subtle Glowing Top Border Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF] via-[#D4A017] via-[#9d4edd] to-transparent opacity-40 dark:opacity-60 shadow-[0_0_8px_rgba(0,240,255,0.3)] z-10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center space-y-6 z-10">
        
        {/* Editorial Brand Name */}
        <div className="text-center">
          <span className="font-extrabold text-sm tracking-[0.25em] text-slate-900 dark:text-white uppercase">
            PRASHANT SISODHIYA
          </span>
          <span className="mx-2 text-gold">|</span>
          <span className="text-xs font-mono text-[#F5BA42] tracking-wider uppercase">
            UI/UX • PRODUCT • AI • VISUAL SYSTEMS
          </span>
        </div>

        {/* Quick Navigation Links (Canonical Sequence) */}
        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          <button onClick={() => handleScrollTo("home")} className="hover:text-gold transition-colors cursor-pointer">Home</button>
          <button onClick={() => handleScrollTo("work")} className="hover:text-gold transition-colors cursor-pointer">Selected Work</button>
          <button onClick={() => handleScrollTo("process")} className="hover:text-gold transition-colors cursor-pointer">Process</button>
          <button onClick={() => handleScrollTo("about")} className="hover:text-gold transition-colors cursor-pointer">About</button>
          <button onClick={() => handleScrollTo("lab")} className="hover:text-gold transition-colors cursor-pointer">Lab</button>
          <button onClick={() => handleScrollTo("contact")} className="hover:text-gold transition-colors cursor-pointer">Contact</button>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors cursor-pointer flex items-center space-x-1">
            <span>Resume (PDF)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Social Icons List */}
        <div className="flex flex-wrap justify-center gap-3">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-8 h-8 rounded-full bg-white dark:bg-[#141821] border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 ${social.hoverClass} transition-all duration-300 transform hover:scale-105`}
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Dynamic Divider */}
        <div className="w-full border-t border-black/5 dark:border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-[10px] text-gray-500 dark:text-gray-400 font-medium">
          
          {/* Copyright */}
          <span>
            © 2026 Prashant Sisodhiya. All Rights Reserved.
          </span>

          {/* Tagline */}
          <div className="flex items-center space-x-1.5">
            <span>Designed with Precision & Empathy</span>
            <span className="text-[#D4A017] dark:text-[#FFCC4D] animate-pulse">✦</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
