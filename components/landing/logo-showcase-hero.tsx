"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function LogoShowcaseHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    let animationFrameId = 0;
    let time = 0;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
    }> = [];

    const createParticles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      ctx.fillStyle = isDark
        ? "rgba(18, 18, 18, 0.1)"
        : "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Draw intricate geometric patterns
      ctx.strokeStyle = "rgba(30, 64, 175, 0.06)";
      ctx.lineWidth = 0.8;

      // Animated concentric circles with wobble
      for (let i = 1; i <= 5; i++) {
        const radius = 50 + i * 25 + Math.sin(time * 0.5 + i * 0.7) * 10;
        const wobble = Math.sin(time * 0.3 + i) * 0.03;
        
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const r = radius * (1 + wobble * Math.sin(angle * 2));
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          if (angle === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Draw flowing sine waves radiating from center
      ctx.strokeStyle = "rgba(30, 64, 175, 0.08)";
      ctx.lineWidth = 1;
      for (let ray = 0; ray < 8; ray++) {
        const baseAngle = (ray * Math.PI * 2) / 8;
        ctx.beginPath();
        for (let dist = 20; dist < 180; dist += 5) {
          const wave = Math.sin(dist * 0.08 + time * 0.6 + ray) * 15;
          const angle = baseAngle + (wave * 0.05);
          const x = centerX + Math.cos(angle) * (dist + wave);
          const y = centerY + Math.sin(angle) * (dist + wave);
          if (dist === 20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw pulsing dots in orbital pattern
      ctx.fillStyle = "rgba(30, 64, 175, 0.4)";
      for (let i = 0; i < 12; i++) {
        const angle = (time * 0.15 + (i * Math.PI * 2) / 12);
        const distance = 90 + Math.sin(time * 0.7 + i * 0.5) * 20;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const size = 1.5 + Math.sin(time * 1 + i * 0.4) * 0.8;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connecting web lines with varying opacity
      ctx.strokeStyle = "rgba(30, 64, 175, 0.08)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 12; i++) {
        for (let j = i + 2; j < 12; j++) {
          const opacity = Math.sin(time * 0.5 + i + j) * 0.5 + 0.5;
          ctx.globalAlpha = opacity * 0.1;
          
          const angle1 = time * 0.15 + (i * Math.PI * 2) / 12;
          const angle2 = time * 0.15 + (j * Math.PI * 2) / 12;
          const distance = 90 + Math.sin(time * 0.7 + i * 0.5) * 20;

          const x1 = centerX + Math.cos(angle1) * distance;
          const y1 = centerY + Math.sin(angle1) * distance;
          const x2 = centerX + Math.cos(angle2) * distance;
          const y2 = centerY + Math.sin(angle2) * distance;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(30, 64, 175, ${p.life * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      // Generate particles occasionally
      if (Math.random() < 0.08) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 85;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        createParticles(x, y, 1);
      }

      // Draw mouse-following glow
      const dx = mousePos.x - centerX;
      const dy = mousePos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 400) {
        const intensity = Math.max(0, 1 - distance / 400);
        ctx.fillStyle = `rgba(30, 64, 175, ${intensity * 0.06})`;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 150, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 0.016;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector("#services");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-background/98"
    >
      {/* Canvas background animations */}
      <canvas ref={canvasRef} className="absolute inset-0" style={{ opacity: 0.7 }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Logo with minimal rotating rings */}
        <div className="relative w-24 h-24 lg:w-28 lg:h-28 mb-8">
          {/* Ring 1 */}
          <div
            className="absolute inset-0 rounded-full border border-foreground/15"
            style={{
              animation: "spin 30s linear infinite",
            }}
          />

          {/* Ring 2 */}
          <div
            className="absolute inset-1 rounded-full border border-foreground/8"
            style={{
              animation: "spin 45s linear infinite reverse",
            }}
          />

          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/sabat-logo.png"
              alt="SABAT"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Minimal text */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl lg:text-3xl font-display tracking-tight opacity-90">
            SABAT
          </h1>
          <p className="text-xs lg:text-sm text-muted-foreground font-light tracking-widest uppercase opacity-70">
            Excellence in Motion
          </p>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToNextSection}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 group cursor-pointer"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
              Scroll
            </span>
            <ChevronDown
              className="w-3.5 h-3.5 text-foreground/30 group-hover:text-foreground/50 transition-all"
              style={{
                animation: "bounce 2.5s ease-in-out infinite",
              }}
            />
          </div>
        </button>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
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

