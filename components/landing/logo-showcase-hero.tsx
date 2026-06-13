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
      
      // Clear canvas
      if (isDark) {
        ctx.fillStyle = "#0f172a";
      } else {
        ctx.fillStyle = "#f8fafc";
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw subtle animated lines in background
      ctx.strokeStyle = isDark ? "rgba(30, 64, 175, 0.08)" : "rgba(30, 64, 175, 0.06)";
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 3; i++) {
        const offset = Math.sin(time * 0.2 + i) * 20;
        ctx.beginPath();
        ctx.moveTo(0, centerY + i * 100 + offset);
        ctx.quadraticCurveTo(
          centerX,
          centerY + i * 100 + offset + 40,
          canvas.width,
          centerY + i * 100 + offset
        );
        ctx.stroke();
      }
      
      // Draw animated circles
      ctx.strokeStyle = isDark ? "rgba(30, 64, 175, 0.1)" : "rgba(30, 64, 175, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 2; i++) {
        const radius = 100 + i * 50 + Math.sin(time * 0.15 + i) * 15;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
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
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.4 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 gap-12">
        {/* Logo with subtle animation */}
        <div className="animate-fade-in" style={{ animationDelay: "0s" }}>
          <div className="relative w-20 h-20 lg:w-24 lg:h-24">
            <div className="absolute inset-0 rounded-full border border-foreground/20 animate-spin" style={{ animationDuration: "8s" }} />
            <div className="flex items-center justify-center h-full">
              <Image
                src="/sabat-logo.png"
                alt="SABAT"
                width={80}
                height={80}
                className="object-contain w-12 h-12 lg:w-16 lg:h-16"
                priority
              />
            </div>
          </div>
        </div>

        {/* Brand name with text animation */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-foreground tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70">
              SABAT
            </span>
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground font-light tracking-widest uppercase">
            Excellence in Motion
          </p>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={handleScroll}
          className="absolute bottom-12 lg:bottom-16 group cursor-pointer animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
              Explore
            </span>
            <ChevronDown 
              className="w-4 h-4 text-foreground/40 group-hover:text-foreground/60 transition-colors animate-bounce"
            />
          </div>
        </button>
      </div>

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Animations */}
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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

