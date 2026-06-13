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
      
      // Create gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (isDark) {
        bgGradient.addColorStop(0, "#0f172a");
        bgGradient.addColorStop(0.5, "#1e293b");
        bgGradient.addColorStop(1, "#0f172a");
      } else {
        bgGradient.addColorStop(0, "#f8fafc");
        bgGradient.addColorStop(0.5, "#f1f5f9");
        bgGradient.addColorStop(1, "#f8fafc");
      }
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Radial glow from center
      const radialGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 600);
      radialGlow.addColorStop(0, isDark ? "rgba(30, 64, 175, 0.15)" : "rgba(30, 64, 175, 0.08)");
      radialGlow.addColorStop(1, isDark ? "rgba(30, 64, 175, 0)" : "rgba(30, 64, 175, 0)");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated flowing waves
      ctx.strokeStyle = isDark ? "rgba(30, 64, 175, 0.12)" : "rgba(30, 64, 175, 0.08)";
      ctx.lineWidth = 1.5;

      for (let layer = 0; layer < 5; layer++) {
        ctx.beginPath();
        const amplitude = 50 + layer * 20;
        const frequency = 0.005 + layer * 0.001;
        const phase = time * 0.3 + layer * 0.5;

        for (let x = 0; x < canvas.width; x += 4) {
          const y =
            centerY +
            Math.sin(x * frequency + phase) * amplitude +
            Math.cos(time * 0.2 + layer) * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Vertical flowing streams
      ctx.strokeStyle = isDark ? "rgba(30, 64, 175, 0.08)" : "rgba(30, 64, 175, 0.05)";
      ctx.lineWidth = 1;

      for (let stream = 0; stream < 8; stream++) {
        ctx.beginPath();
        const startX = centerX - 300 + (stream * 85);
        for (let y = 0; y < canvas.height; y += 5) {
          const x =
            startX +
            Math.sin(y * 0.006 + time * 0.4 + stream * 0.8) * 40 +
            Math.cos(time * 0.25 + stream) * 20;
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Animated orbital dots
      ctx.fillStyle = isDark ? "rgba(30, 64, 175, 0.6)" : "rgba(30, 64, 175, 0.4)";
      for (let i = 0; i < 12; i++) {
        const angle = time * 0.12 + (i * Math.PI * 2) / 12;
        const distance = 200 + Math.sin(time * 0.3 + i * 0.6) * 60;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const size = 2 + Math.sin(time * 0.8 + i * 0.5) * 1.2;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Concentric pulsing rings
      ctx.strokeStyle = isDark ? "rgba(30, 64, 175, 0.1)" : "rgba(30, 64, 175, 0.06)";
      ctx.lineWidth = 1;

      for (let ring = 1; ring <= 4; ring++) {
        const baseRadius = 150 * ring;
        const pulse = Math.sin(time * 0.5 + ring * 0.7) * 30;
        const wobble = Math.sin(time * 0.2 + ring) * 0.02;

        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.08) {
          const radius = baseRadius + pulse + Math.sin(angle * 3 + time * 0.3) * 20;
          const x = centerX + Math.cos(angle) * radius * (1 + wobble);
          const y = centerY + Math.sin(angle) * radius * (1 + wobble);
          if (angle === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
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
    if (metricsSection) {
      metricsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Content with proper spacing */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-24 lg:space-y-32 px-6">
        
        {/* Tagline at top */}
        <div className="animate-fade-in" style={{ animationDelay: "0s" }}>
          <p className="text-xs lg:text-sm text-foreground/50 font-mono tracking-widest uppercase">
            Professional Corporate Travel Management
          </p>
        </div>

        {/* Large logo */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="relative w-40 h-40 lg:w-56 lg:h-56">
            {/* Outer rotating ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-foreground/20"
              style={{ animation: "spin 30s linear infinite" }}
            />
            
            {/* Middle ring */}
            <div
              className="absolute inset-4 rounded-full border border-foreground/10"
              style={{ animation: "spin 40s linear infinite reverse" }}
            />
            
            {/* Inner ring */}
            <div
              className="absolute inset-8 rounded-full border border-foreground/5"
              style={{ animation: "spin 50s linear infinite" }}
            />

            {/* Logo center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/sabat-logo.png"
                alt="SABAT"
                width={180}
                height={180}
                className="w-24 h-24 lg:w-36 lg:h-36 object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Main headline with sophisticated gradient */}
        <div className="space-y-6 lg:space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-6xl lg:text-8xl xl:text-9xl font-display font-bold leading-[1.1] tracking-tighter">
            <span 
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, hsl(220, 90%, 56%), hsl(235, 85%, 50%), hsl(250, 88%, 52%), hsl(235, 85%, 50%), hsl(220, 90%, 56%))",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientFlow 6s ease infinite",
              }}
            >
              SABAT
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg lg:text-2xl text-foreground/60 font-light tracking-wide max-w-2xl mx-auto">
            Excellence in Motion
          </p>
        </div>

        {/* Scroll button at bottom */}
        <button
          onClick={handleScroll}
          className="group cursor-pointer animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs text-foreground/40 font-mono uppercase tracking-widest group-hover:text-foreground/60 transition-colors duration-300">
              Explore
            </span>
            <div className="relative w-6 h-10 border border-foreground/20 rounded-full flex items-center justify-center group-hover:border-foreground/40 transition-colors duration-300">
              <ChevronDown
                className="w-3.5 h-3.5 text-foreground/30 group-hover:text-foreground/50 transition-colors duration-300"
                style={{
                  animation: "bounce 2.5s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </button>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none z-20" />

      {/* Styles */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradientFlow {
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
            opacity: 0.5;
          }
          50% {
            transform: translateY(10px);
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
