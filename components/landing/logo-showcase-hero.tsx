"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function LogoShowcaseHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let animationId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Watch for color scheme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleColorSchemeChange = () => {
      // Force re-render on color scheme change
      cancelAnimationFrame(animationId);
      animationId = 0;
    };
    mediaQuery.addEventListener("change", handleColorSchemeChange);

    const render = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      // Create liquid gradient background - fresh check each frame
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      
      // Animated gradient colors - Blue hues only, adapting to dark/light mode
      if (isDark) {
        // Dark mode: dark blue/black background
        gradient.addColorStop(0, `hsl(220, 40%, 10%)`);
        gradient.addColorStop(0.5, `hsl(235, 35%, 12%)`);
        gradient.addColorStop(1, `hsl(250, 38%, 8%)`);
      } else {
        // Light mode: light blue background
        gradient.addColorStop(0, `hsl(220, 85%, 92%)`);
        gradient.addColorStop(0.5, `hsl(235, 75%, 88%)`);
        gradient.addColorStop(1, `hsl(250, 80%, 94%)`);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Add turbulent liquid effect with flowing shapes
      ctx.globalAlpha = 0.08;
      const hue1 = (time * 0.02 + 220) % 360;
      for (let i = 0; i < 6; i++) {
        const x = w * 0.5 + Math.sin(time * 0.001 + i * 1.2) * w * 0.4;
        const y = h * 0.5 + Math.cos(time * 0.0008 + i * 0.9) * h * 0.3;
        const size = 200 + Math.sin(time * 0.003 + i) * 100;

        const radialGrad = ctx.createRadialGradient(x, y, size * 0.3, x, y, size);
        if (isDark) {
          radialGrad.addColorStop(0, `hsla(${hue1 + i * 20}, 100%, 40%, 0.6)`);
          radialGrad.addColorStop(1, `hsla(${hue1 + i * 20}, 100%, 40%, 0)`);
        } else {
          radialGrad.addColorStop(0, `hsla(${hue1 + i * 20}, 100%, 50%, 0.6)`);
          radialGrad.addColorStop(1, `hsla(${hue1 + i * 20}, 100%, 50%, 0)`);
        }

        ctx.fillStyle = radialGrad;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Draw flowing wave patterns
      ctx.strokeStyle = isDark 
        ? `rgba(30, 64, 175, ${0.04 + Math.sin(time * 0.005) * 0.02})`
        : `rgba(30, 64, 175, ${0.08 + Math.sin(time * 0.005) * 0.04})`;
      ctx.lineWidth = 1;

      for (let waveLayer = 0; waveLayer < 4; waveLayer++) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 30) {
          const y =
            h * 0.5 +
            Math.sin(x * 0.01 + time * 0.002 + waveLayer * 1.5) * 40 +
            Math.cos(x * 0.005 + time * 0.0015 + waveLayer) * 30 +
            waveLayer * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw morphing circles with shader-like effect
      ctx.globalAlpha = 0.12;
      const centerX = w * 0.5;
      const centerY = h * 0.5;

      for (let ring = 0; ring < 5; ring++) {
        const angle = time * (0.001 - ring * 0.0002);
        const radius = 60 + ring * 50 + Math.sin(time * 0.003 + ring * 0.5) * 30;
        const distortion = Math.sin(time * 0.004 + ring) * 0.15;

        for (let i = 0; i < 12; i++) {
          const a = (angle + (i * Math.PI * 2) / 12) * (1 + distortion);
          const r =
            radius *
            (1 + Math.sin(time * 0.005 + i * 0.3 + ring * 0.8) * 0.3);
          const x = centerX + Math.cos(a) * r;
          const y = centerY + Math.sin(a) * r;

          const grad = ctx.createRadialGradient(x, y, 0, x, y, 20);
          if (isDark) {
            grad.addColorStop(
              0,
              `hsla(${hue1 + ring * 15}, 90%, 45%, ${0.4 + Math.sin(time * 0.006 + i) * 0.3})`
            );
            grad.addColorStop(1, `hsla(${hue1 + ring * 15}, 90%, 45%, 0)`);
          } else {
            grad.addColorStop(
              0,
              `hsla(${hue1 + ring * 15}, 90%, 60%, ${0.4 + Math.sin(time * 0.006 + i) * 0.3})`
            );
            grad.addColorStop(1, `hsla(${hue1 + ring * 15}, 90%, 60%, 0)`);
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      // Draw connecting network lines
      ctx.strokeStyle = isDark
        ? `rgba(30, 64, 175, ${0.03 + Math.sin(time * 0.004) * 0.02})`
        : `rgba(30, 64, 175, ${0.06 + Math.sin(time * 0.004) * 0.04})`;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < 8; i++) {
        for (let j = i + 1; j < 8; j++) {
          const a1 = time * (0.001 - i * 0.0002) + (i * Math.PI * 2) / 8;
          const a2 = time * (0.001 - j * 0.0002) + (j * Math.PI * 2) / 8;
          const r1 = 120 + Math.sin(time * 0.003 + i) * 40;
          const r2 = 120 + Math.sin(time * 0.003 + j) * 40;

          const x1 = centerX + Math.cos(a1) * r1;
          const y1 = centerY + Math.sin(a1) * r1;
          const x2 = centerX + Math.cos(a2) * r2;
          const y2 = centerY + Math.sin(a2) * r2;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // Add mouse-following glow with smooth falloff - REMOVED
      // Removed pointer brush stamp effect as requested

      time += 1;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      mediaQuery.removeEventListener("change", handleColorSchemeChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleScroll = () => {
    const nextSection = document.querySelector("#hero-second");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black"
    >
      {/* Canvas - liquid gradient background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.9 }}
      />

      {/* Fade-out gradient at bottom for seamless transition - adapts to dark mode */}
      <div className="absolute bottom-0 left-0 right-0 h-32 lg:h-40 bg-gradient-to-b from-transparent to-background dark:to-slate-950 pointer-events-none z-20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 lg:px-8">
        {/* Animated title with staggered entrance */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <p className="text-xs lg:text-sm font-mono text-foreground/50 dark:text-foreground/70 uppercase tracking-[0.2em] animate-fade-in">
            Introducing
          </p>
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight text-foreground dark:text-white animate-fade-in" style={{ animationDelay: "0.1s" }}>
            SABAT
          </h1>
          <p className="text-sm lg:text-base text-foreground/60 dark:text-foreground/75 font-light tracking-wide animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Excellence in Motion
          </p>
        </div>

        {/* Logo with animated frame */}
        <div className="relative mb-16 lg:mb-20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {/* Animated frame with morphing shape */}
          <div className="relative inline-block">
            {/* Outer morphing border */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `linear-gradient(45deg, rgba(30, 64, 175, 0.2), rgba(30, 64, 175, 0.1))`,
                animation: "morph 8s ease-in-out infinite",
              }}
            />

            {/* Logo container */}
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 flex items-center justify-center p-6 lg:p-8">
              <Image
                src="/sabat-logo.png"
                alt="SABAT"
                width={160}
                height={160}
                className="w-full h-full object-contain drop-shadow-lg"
                priority
              />
            </div>

            {/* Inner glow rings */}
            <div
              className="absolute inset-0 rounded-3xl border border-foreground/20"
              style={{ animation: "spin 20s linear infinite" }}
            />
            <div
              className="absolute inset-2 rounded-3xl border border-foreground/10"
              style={{ animation: "spin 30s linear infinite reverse" }}
            />
          </div>
        </div>

        {/* Scroll indicator - positioned at bottom with proper spacing */}
        <button
          onClick={handleScroll}
          className="absolute bottom-12 lg:bottom-20 left-1/2 -translate-x-1/2 group cursor-pointer animate-fade-in"
          style={{ animationDelay: "0.5s" }}
          aria-label="Scroll to next section"
        >
          <div className="flex flex-col items-center gap-2 transition-all duration-300 group-hover:opacity-100 opacity-70">
            <span className="text-[10px] lg:text-xs font-mono text-foreground/50 uppercase tracking-widest">
              Explore
            </span>
            <div
              className="w-5 h-8 border border-foreground/40 rounded-full flex items-start justify-center p-1.5 group-hover:border-foreground/60 transition-colors"
              style={{
                animation: "scroll-float 2s ease-in-out infinite",
              }}
            >
              <ChevronDown className="w-3 h-3 text-foreground/50 group-hover:text-foreground/70" />
            </div>
          </div>
        </button>
      </div>

      {/* Global animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes morph {
          0% {
            border-radius: 40%;
          }
          50% {
            border-radius: 60%;
          }
          100% {
            border-radius: 40%;
          }
        }

        @keyframes scroll-float {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(6px);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
