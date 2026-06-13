"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function LogoShowcaseHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScroll = () => {
    const metricsSection = document.getElementById("metrics");
    metricsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl" style={{ animation: "float 20s ease-in-out infinite" }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/6 rounded-full blur-3xl" style={{ animation: "float 25s ease-in-out infinite reverse" }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-32 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}>
            
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-foreground/50 uppercase tracking-widest">Welcome</span>
              <div className="w-12 h-px bg-gradient-to-r from-blue-600 to-transparent" />
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight text-foreground">
                SABAT
              </h1>
              <p className="text-base lg:text-lg text-foreground/70">Professional corporate travel excellence</p>
            </div>

            {/* Description */}
            <p className="text-base lg:text-lg text-foreground/60 leading-relaxed max-w-lg">
              Seamless coordination of accommodation, transfers, and business travel operations. One trusted partner for exceptional journeys.
            </p>

            {/* Stats or trust markers */}
            <div className="flex gap-8 pt-4">
              <div className="space-y-1">
                <p className="text-2xl lg:text-3xl font-display font-bold text-blue-600">24/7</p>
                <p className="text-xs lg:text-sm text-foreground/60">Support Available</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl lg:text-3xl font-display font-bold text-blue-600">99.9%</p>
                <p className="text-xs lg:text-sm text-foreground/60">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right - Logo Showcase */}
          <div className={`flex items-center justify-center transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              
              {/* Animated background glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-blue-600/8 blur-2xl" style={{ animation: "pulse 4s ease-in-out infinite" }} />
              
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-3xl border border-blue-600/20" style={{ animation: "rotate 30s linear infinite" }} />
              <div className="absolute inset-6 rounded-3xl border border-blue-600/10" style={{ animation: "rotate 45s linear infinite reverse" }} />

              {/* Logo container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-56 h-56 lg:w-72 lg:h-72">
                  <Image
                    src="/sabat-logo.png"
                    alt="SABAT Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute -top-3 -right-3 w-2 h-2 bg-blue-600/60 rounded-full" style={{ animation: "pulse 3s ease-in-out infinite" }} />
              <div className="absolute -bottom-3 -left-3 w-2.5 h-2.5 bg-blue-600/40 rounded-full" style={{ animation: "pulse 4s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - at the very bottom */}
      <button
        onClick={handleScroll}
        className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 group cursor-pointer"
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-mono text-foreground/60 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border border-foreground/30 rounded-full flex items-center justify-center group-hover:border-foreground/50 transition-colors">
            <ChevronDown className="w-3 h-3 text-foreground/50 group-hover:text-foreground/70" style={{ animation: "bounce-down 2s ease-in-out infinite" }} />
          </div>
        </div>
      </button>

      {/* Fade at bottom for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(8px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
