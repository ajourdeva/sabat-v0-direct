"use client";

import { useEffect, useRef } from "react";
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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    let animationId = 0;

    const render = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      // Clear with gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      if (isDark) {
        gradient.addColorStop(0, "rgba(15, 23, 42, 1)");
        gradient.addColorStop(0.5, "rgba(30, 64, 175, 0.02)");
        gradient.addColorStop(1, "rgba(15, 23, 42, 1)");
      } else {
        gradient.addColorStop(0, "rgba(248, 250, 252, 1)");
        gradient.addColorStop(0.5, "rgba(30, 64, 175, 0.03)");
        gradient.addColorStop(1, "rgba(248, 250, 252, 1)");
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Animated flowing waves
      ctx.strokeStyle = isDark ? "rgba(30, 64, 175, 0.08)" : "rgba(30, 64, 175, 0.06)";
      ctx.lineWidth = 2;

      for (let wave = 0; wave < 4; wave++) {
        ctx.beginPath();
        const waveAmplitude = 40 + wave * 20;
        const waveFrequency = 0.008 + wave * 0.002;
        const phaseShift = time * (0.3 - wave * 0.05);

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            centerY +
            Math.sin(x * waveFrequency + phaseShift) * waveAmplitude +
            Math.cos(time * 0.5 + wave) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Vertical flowing lines
      ctx.strokeStyle = isDark ? "rgba(30, 64, 175, 0.05)" : "rgba(30, 64, 175, 0.04)";
      ctx.lineWidth = 1;

      for (let line = 0; line < 6; line++) {
        ctx.beginPath();
        const lineX = centerX - 200 + (line * 80);
        for (let y = 0; y < canvas.height; y += 5) {
          const x =
            lineX +
            Math.sin(y * 0.005 + time * 0.4 + line) * 30 +
            Math.cos(time * 0.3) * 15;
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Pulsing circles in background
      ctx.fillStyle = isDark ? "rgba(30, 64, 175, 0.04)" : "rgba(30, 64, 175, 0.03)";
      for (let i = 0; i < 8; i++) {
        const angle = (time * 0.1 + (i * Math.PI * 2) / 8);
        const distance = 300 + Math.sin(time * 0.3 + i) * 100;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const size = 2 + Math.sin(time * 0.5 + i * 0.8) * 1.5;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 0.016;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleScroll = () => {
    const metricsSection = document.getElementById("metrics");
    metricsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Shader background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Logo */}
        <div className="mb-8 lg:mb-12 animate-fade-in">
          <div className="relative w-32 h-32 lg:w-48 lg:h-48 group">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full blur-2xl bg-blue-600/10 group-hover:bg-blue-600/20 transition-all duration-500 animate-pulse" />

            {/* Rotating ring */}
            <div
              className="absolute inset-0 rounded-full border border-blue-600/30"
              style={{ animation: "spin 40s linear infinite" }}
            />

            {/* Inner ring */}
            <div
              className="absolute inset-4 rounded-full border border-blue-600/15"
              style={{ animation: "spin 50s linear infinite reverse" }}
            />

            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/sabat-logo.png"
                alt="SABAT"
                width={180}
                height={180}
                className="w-full h-full object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Animated SABAT Text */}
        <div className="mb-6 lg:mb-8 space-y-4">
          <h1 className="text-6xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tighter">
            <span
              className="inline-block animate-fade-in"
              style={{
                background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #1E40AF 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientShift 4s ease infinite",
              }}
            >
              SABAT
            </span>
          </h1>
          <p className="text-sm lg:text-base text-foreground/50 font-light tracking-widest uppercase animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Excellence in Motion
          </p>
        </div>

        {/* Scroll button */}
        <button
          onClick={handleScroll}
          className="mt-24 lg:mt-32 group cursor-pointer animate-fade-in"
          style={{ animationDelay: "0.3s" }}
          aria-label="Scroll to next section"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs text-foreground/40 font-mono uppercase tracking-widest group-hover:text-foreground/60 transition-colors">
              Explore
            </span>
            <div className="w-6 h-10 border border-foreground/20 rounded-full flex items-center justify-center group-hover:border-foreground/40 transition-colors">
              <ChevronDown
                className="w-3 h-3 text-foreground/30 group-hover:text-foreground/50"
                style={{
                  animation: "bounce 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </button>
      </div>

      {/* Fade overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-5" />

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(8px);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
