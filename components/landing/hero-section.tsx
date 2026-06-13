"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";
import { ScrollIndicator } from "./scroll-indicator";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-24 lg:pt-32 pb-0 overflow-hidden">
      {/* Full-height hero with sphere showcase */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated sphere background - centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] xl:w-[900px] xl:h-[900px]">
            <AnimatedSphere />
          </div>
        </div>
        
        {/* Subtle grid lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute h-px bg-foreground/10"
              style={{
                top: `${12.5 * (i + 1)}%`,
                left: 0,
                right: 0,
              }}
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute w-px bg-foreground/10"
              style={{
                left: `${8.33 * (i + 1)}%`,
                top: 0,
                bottom: 0,
              }}
            />
          ))}
        </div>
        
        {/* Content overlay - positioned to left side */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full flex items-center">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div 
              className={`mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <span className="w-8 h-px bg-foreground/30" />
                Professional Corporate Travel Management
              </span>
            </div>
            
            {/* Main headline */}
            <div className="mb-8">
              <h1 
                className={`text-[clamp(2.5rem,10vw,6rem)] font-display leading-[0.95] tracking-tight transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                The platform behind exceptional business journeys.
              </h1>
            </div>
            
            {/* Description */}
            <p 
              className={`text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              SABAT helps organizations coordinate accommodation, executive hospitality, transfers, and business travel operations through one trusted partner.
            </p>
            
            {/* CTAs */}
            <div 
              className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
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
                className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-12">
        <ScrollIndicator />
      </div>
    </section>
  );
}
