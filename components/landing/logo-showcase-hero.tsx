"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function LogoShowcaseHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScroll = () => {
    const metricsSection = document.getElementById("metrics");
    metricsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-foreground/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-foreground/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-foreground/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Mouse-following glow effect */}
      <div 
        className="absolute pointer-events-none w-96 h-96 bg-foreground/5 rounded-full blur-3xl transition-all duration-100"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          opacity: isVisible ? 0.3 : 0,
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Main content container */}
        <div className="text-center space-y-16 lg:space-y-20">
          {/* Subtitle with animation */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-sm lg:text-base font-mono text-muted-foreground tracking-widest uppercase">
              Welcome to the future of
            </p>
          </div>

          {/* Logo showcase - centered and floating */}
          <div 
            className={`transition-all duration-1200 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-80"
            }`}
          >
            <div className="relative inline-block">
              {/* Animated rotating ring */}
              <div className="absolute inset-0 w-80 h-80 lg:w-96 lg:h-96 rounded-full border border-foreground/10 animate-spin" style={{ animationDuration: "20s" }} />
              
              {/* Second rotating ring - opposite direction */}
              <div className="absolute inset-8 w-64 h-64 lg:w-80 lg:h-80 rounded-full border border-foreground/5 animate-spin" style={{ animationDuration: "30s", animationDirection: "reverse" }} />

              {/* Logo container */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center">
                <Image 
                  src="/sabat-logo.png" 
                  alt="SABAT" 
                  width={200}
                  height={200}
                  className="w-48 h-48 lg:w-56 lg:h-56 object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Brand name */}
          <div 
            className={`transition-all duration-1200 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-6xl lg:text-8xl font-display font-bold tracking-tight">
              SABAT
            </h1>
            <p className="text-lg lg:text-2xl text-muted-foreground mt-6 font-light tracking-wide">
              Professional Corporate Travel Excellence
            </p>
          </div>

          {/* Minimal divider line */}
          <div 
            className={`w-24 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mx-auto transition-all duration-1200 delay-300 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        {/* Scroll indicator - positioned at bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={handleScroll}
            className="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-100 opacity-60"
            aria-label="Scroll to next section"
          >
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Scroll
            </span>
            <div className="relative w-6 h-10 border border-foreground/30 rounded-full flex items-start justify-center p-2 group-hover:border-foreground/60 transition-colors">
              <ChevronDown 
                className="w-3 h-3 text-foreground/40 group-hover:text-foreground/60 animate-bounce" 
                style={{ animationDuration: "2s" }}
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
