"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

const getColorsForAccent = (acc: "gold" | "blue" | "violet") => {
  if (acc === "blue") {
    return [new THREE.Color("#0088FF"), new THREE.Color("#00F0FF"), new THREE.Color("#0055cc")];
  } else if (acc === "violet") {
    return [new THREE.Color("#7b2cbf"), new THREE.Color("#9d4edd"), new THREE.Color("#e2afff")];
  } else { // gold
    return [new THREE.Color("#D4A017"), new THREE.Color("#FFCC4D"), new THREE.Color("#F5C542")];
  }
};

interface BackgroundParticlesProps {
  accent: "gold" | "blue" | "violet";
}

export default function BackgroundParticles({ accent }: BackgroundParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  
  // Keep refs for rendering properties that change on theme toggle
  const materialRef = useRef<THREE.PointsMaterial | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    // Dynamic updates for light/dark theme parameters
    if (materialRef.current) {
      if (resolvedTheme === "light") {
        materialRef.current.opacity = 0.2;
        materialRef.current.size = 0.1;
      } else {
        materialRef.current.opacity = 0.55;
        materialRef.current.size = 0.13;
      }
    }
  }, [resolvedTheme]);

  useEffect(() => {
    if (!geometryRef.current) return;
    const colorsAttr = geometryRef.current.getAttribute("color") as THREE.BufferAttribute;
    const array = colorsAttr.array as Float32Array;
    
    const palette = getColorsForAccent(accent);
    const particleCount = array.length / 3;
    for (let p = 0; p < particleCount; p++) {
      const color = palette[Math.floor(Math.random() * palette.length)];
      array[p * 3] = color.r;
      array[p * 3 + 1] = color.g;
      array[p * 3 + 2] = color.b;
    }
    colorsAttr.needsUpdate = true;
  }, [accent]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.set(0, 4, 9);
    camera.lookAt(0, 0, 0);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle grid dimensions
    const countX = 55;
    const countZ = 55;
    const particleCount = countX * countZ;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = getColorsForAccent(accent);

    let i = 0;
    const gap = 0.45;
    for (let x = 0; x < countX; x++) {
      for (let z = 0; z < countZ; z++) {
        // Position centering
        positions[i * 3] = (x - countX / 2) * gap;
        positions[i * 3 + 1] = 0; // Y axis gets offset in animation loop
        positions[i * 3 + 2] = (z - countZ / 2) * gap;

        // Colors selection
        const color = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometryRef.current = geometry;

    // Dynamic circle soft glow texture creation
    const createCircleTexture = () => {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 32;
      textureCanvas.height = 32;
      const ctx = textureCanvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.6)");
        gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.15)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      const texture = new THREE.CanvasTexture(textureCanvas);
      return texture;
    };

    const particleTexture = createCircleTexture();

    // Material
    const isLightMode = resolvedTheme === "light";
    const material = new THREE.PointsMaterial({
      size: isLightMode ? 0.1 : 0.13,
      vertexColors: true,
      transparent: true,
      opacity: isLightMode ? 0.2 : 0.55,
      blending: THREE.AdditiveBlending,
      map: particleTexture,
      depthWrite: false,
    });
    materialRef.current = material;

    // Points Mesh
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse coordinates tracking for smooth 3D parallax
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // Animation variables
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.009;

      const posAttr = geometry.getAttribute("position");
      const posArr = posAttr.array as Float32Array;

      let idx = 0;
      for (let x = 0; x < countX; x++) {
        for (let z = 0; z < countZ; z++) {
          const posX = posArr[idx * 3];
          const posZ = posArr[idx * 3 + 2];

          // Ripple math deformation
          posArr[idx * 3 + 1] =
            Math.sin(posX * 0.2 + time) * 0.65 +
            Math.cos(posZ * 0.2 + time) * 0.65;

          idx++;
        }
      }
      posAttr.needsUpdate = true;

      // Mouse Parallax Camera Interpolation
      const targetX = mouseX * 2.5;
      const targetY = 4.0 - mouseY * 1.5;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up to prevent WebGL context leaks
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      
      // Memory releases
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-transparent"
    />
  );
}
