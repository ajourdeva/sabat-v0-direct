"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function LogoShowcaseHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      // Clear with semi-transparent backdrop for subtle motion trails
      ctx.fillStyle = isDark ? "rgba(12, 12, 12, 0.98)" : "rgba(255, 255, 255, 0.98)";
      ctx.fillRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = h / 2;

      // Draw flowing gradient background
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      if (isDark) {
        gradient.addColorStop(0, "rgba(30, 64, 175, 0.15)");
        gradient.addColorStop(0.5, "rgba(30, 64, 175, 0.08)");
        gradient.addColorStop(1, "rgba(30, 64, 175, 0.12)");
      } else {
        gradient.addColorStop(0, "rgba(30, 64, 175, 0.08)");
        gradient.addColorStop(0.5, "rgba(30, 64, 175, 0.04)");
        gradient.addColorStop(1, "rgba(30, 64, 175, 0.06)");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Draw animated organic blob shapes
      ctx.globalAlpha = isDark ? 0.08 : 0.06;
      for (let i = 0; i < 4; i++) {
        const x = centerX + Math.sin(time * 0.0005 + i) * w * 0.35;
        const y = centerY + Math.cos(time * 0.0004 + i * 1.5) * h * 0.25;
        const size = 300 + Math.sin(time * 0.0002 + i * 0.8) * 150;

        const radialGrad = ctx.createRadialGradient(x, y, 0, x, y, size);
        radialGrad.addColorStop(0, isDark ? "rgba(100, 150, 255, 0.4)" : "rgba(30, 64, 175, 0.3)");
        radialGrad.addColorStop(1, isDark ? "rgba(100, 150, 255, 0)" : "rgba(30, 64, 175, 0)");

        ctx.fillStyle = radialGrad;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Draw flowing waves
      ctx.strokeStyle = isDark ? "rgba(100, 150, 255, 0.08)" : "rgba(30, 64, 175, 0.06)";
      ctx.lineWidth = 1.5;

      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 40) {
          const y =
            centerY +
            Math.sin(x * 0.008 + time * 0.0003 + layer * 2) * 50 +
            Math.cos(x * 0.004 + time * 0.00025 + layer) * 40 +
            layer * 30 - 45;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw subtle connecting nodes
      ctx.fillStyle = isDark ? "rgba(100, 150, 255, 0.3)" : "rgba(30, 64, 175, 0.2)";
      for (let i = 0; i < 8; i++) {
        const angle = (time * 0.0001 + (i * Math.PI * 2) / 8);
        const radius = 180 + Math.sin(time * 0.0002 + i) * 40;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const size = 2 + Math.sin(time * 0.0004 + i * 0.5) * 1.5;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw subtle connecting lines between nodes
      ctx.strokeStyle = isDark ? "rgba(100, 150, 255, 0.04)" : "rgba(30, 64, 175, 0.03)";
      ctx.lineWidth = 0.8;

      for (let i = 0; i < 8; i++) {
        for (let j = i + 2; j < Math.min(i + 4, 8); j++) {
          const a1 = time * 0.0001 + (i * Math.PI * 2) / 8;
          const a2 = time * 0.0001 + (j * Math.PI * 2) / 8;
          const r1 = 180 + Math.sin(time * 0.0002 + i) * 40;
          const r2 = 180 + Math.sin(time * 0.0002 + j) * 40;

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

      time += 1;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleScroll = () => {
    const nextSection = document.querySelector("#metrics");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Canvas animation background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.85 }}
      />

      {/* Fade-out at bottom for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-background pointer-events-none z-20" />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 py-20">
        {/* Header section */}
        <div className="text-center space-y-3 mb-16 lg:mb-20">
          <p className="text-xs lg:text-sm font-mono text-muted-foreground uppercase tracking-[0.15em]">
            Professional Corporate Travel
          </p>
          <h1 className="text-6xl lg:text-8xl font-display font-bold tracking-tight text-foreground">
            SABAT
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground font-light tracking-wide">
            Excellence in Motion
          </p>
        </div>

        {/* Logo showcase */}
        <div className="relative mb-20 lg:mb-24">
          {/* Morphing frame background */}
          <div
            className="absolute inset-0 rounded-2xl lg:rounded-3xl"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(30, 64, 175, 0.1), transparent)",
              animation: "morph-shape 8s ease-in-out infinite",
            }}
          />

          {/* Logo container */}
          <div className="relative w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center">
            <Image
              src="/sabat-logo.png"
              alt="SABAT"
              width={200}
              height={200}
              className="w-3/4 h-3/4 object-contain drop-shadow-md"
              priority
            />
          </div>

          {/* Animated rings */}
          <div
            className="absolute inset-0 rounded-2xl lg:rounded-3xl border border-foreground/20"
            style={{
              animation: "rotate-ring 25s linear infinite",
            }}
          />
          <div
            className="absolute inset-2 rounded-2xl lg:rounded-3xl border border-foreground/10"
            style={{
              animation: "rotate-ring 35s linear infinite reverse",
            }}
          />
        </div>

        {/* Description */}
        <div className="text-center max-w-xl mb-24 lg:mb-32">
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            Professional corporate travel management reimagined for excellence
          </p>
        </div>

        {/* Scroll button - properly positioned at bottom */}
        <button
          onClick={handleScroll}
          className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 group cursor-pointer transition-all duration-300"
          aria-label="Scroll to next section"
        >
          <div className="flex flex-col items-center gap-1.5 group-hover:opacity-100 opacity-70 transition-opacity">
            <span className="text-[10px] lg:text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Explore
            </span>
            <div className="w-5 h-8 border border-muted-foreground/40 rounded-full flex items-center justify-center group-hover:border-muted-foreground/70 transition-colors">
              <div
                style={{
                  animation: "scroll-pulse 2s ease-in-out infinite",
                }}
              >
                <ChevronDown className="w-3 h-3 text-muted-foreground/50 group-hover:text-muted-foreground/80" />
              </div>
            </div>
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes rotate-ring {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes morph-shape {
          0%,
          100% {
            border-radius: 20%;
            opacity: 0.8;
          }
          50% {
            border-radius: 50%;
            opacity: 1;
          }
        }

        @keyframes scroll-pulse {
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
      `}</style>
    </section>
  );
}
