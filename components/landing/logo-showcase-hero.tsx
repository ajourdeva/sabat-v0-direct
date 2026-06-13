"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function LogoShowcaseHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24">
      {/* Subtle background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${16.66 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${10 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div 
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <span className="w-8 h-px bg-foreground/30" />
                Welcome to SABAT
              </span>
            </div>

            {/* Main headline */}
            <h1 
              className={`text-5xl lg:text-6xl font-display leading-tight tracking-tight transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Enterprise-grade business travel coordination.
            </h1>

            {/* Description */}
            <p 
              className={`text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Streamline accommodation, executive hospitality, transfers, and mission logistics with dedicated partnership and 24/7 support.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row items-start gap-4 pt-4 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button 
                size="lg" 
                className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"
              >
                Request Consultation
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base rounded-full border-foreground/30 hover:bg-foreground/5"
              >
                Learn More
              </Button>
            </div>

            {/* Trust badges */}
            <div 
              className={`flex items-center gap-8 pt-8 border-t border-foreground/10 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div>
                <div className="text-2xl font-display font-bold">1500+</div>
                <div className="text-sm text-muted-foreground">Organization Partners</div>
              </div>
              <div className="h-12 w-px bg-foreground/10" />
              <div>
                <div className="text-2xl font-display font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">Service Uptime</div>
              </div>
            </div>
          </div>

          {/* Right - Logo showcase */}
          <div 
            className={`flex items-center justify-center transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative w-full aspect-square flex items-center justify-center">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-background to-foreground/5 rounded-2xl" />
              
              {/* Subtle animated border */}
              <div className="absolute inset-0 border border-foreground/10 rounded-2xl" />
              
              {/* Logo container with subtle shadow and glow */}
              <div className="relative z-10 p-12 flex items-center justify-center">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 blur-3xl opacity-20 bg-foreground rounded-full animate-pulse" />
                  
                  {/* Logo image */}
                  <Image 
                    src="/sabat-logo.png" 
                    alt="SABAT Logo" 
                    width={300}
                    height={300}
                    className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div 
          className={`mt-20 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </section>
  );
}
