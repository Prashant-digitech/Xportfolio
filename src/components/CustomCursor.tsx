"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Smooth trail effect
  useEffect(() => {
    let animationFrameId: number;

    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (isHidden) return null;

  return (
    <>
      {/* Outer cursor ring */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full border border-gold/60 transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2 hidden md:block ${
          isHovered
            ? "w-12 h-12 bg-gold/10 border-gold shadow-[0_0_15px_rgba(212,160,23,0.4)]"
            : "w-6 h-6 shadow-[0_0_8px_rgba(212,160,23,0.15)]"
        }`}
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
      />
      {/* Inner cursor dot */}
      <div
        className={`fixed w-1.5 h-1.5 bg-gold pointer-events-none z-[10000] rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hidden md:block ${
          isHovered ? "scale-[1.8] bg-[#00F0FF]" : ""
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
