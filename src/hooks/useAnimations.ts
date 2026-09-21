"use client";

import { useRef, useState, useEffect } from "react";

// Magnetic Button Animation Hook
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>() {
  const ref = useRef<T | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    // Button pulls 30% towards the mouse cursor coordinates
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: position.x === 0 ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
  };

  return { ref, handleMouseMove, handleMouseLeave, style };
}

// 3D Card Tilt Perspective Hook
export function useTilt() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    // Calculate tilt angles (limits rotations to 12 degrees max)
    const rotateY = ((x / width) - 0.5) * 16;
    const rotateX = ((y / height) - 0.5) * -16;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const style = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
    transition: tilt.rotateX === 0 ? "transform 0.5s ease" : "none",
  };

  return { ref, handleMouseMove, handleMouseLeave, style };
}

// Animated Numbers Count Up Hook
export function useCountUp(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const [startCount, setStartCount] = useState(false);
  const observerRef = useRef<any>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!startCount) return;
    let start = 0;
    const stepTime = 30;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [startCount, target, duration]);

  return { count, elementRef };
}
