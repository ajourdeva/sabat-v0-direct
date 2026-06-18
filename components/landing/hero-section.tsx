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
    <section id="hero-second" className="relative min-h-[120vh] flex flex-col justify-between overflow-hidden pb-20 lg:pb-32">
      {/* Animated sphere background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] opacity-100 pointer-events-none">
        <AnimatedSphere />
      </div>
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
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
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        {/* Eyebrow */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            Professional Corporate Travel Management
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-12">
          <h1 
            className={`text-[clamp(3rem,12vw,6rem)] font-display leading-[0.95] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Professional Corporate Travel Solutions
          </h1>
        </div>
        
        {/* Description and CTA */}
        <div className="max-w-2xl">
          <p 
            className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            SABAT helps organizations coordinate accommodation, executive hospitality, transfers, and business travel operations through one trusted partner.
          </p>
          
          {/* CTA Button - directly under paragraph */}
          <div 
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button 
              size="lg" 
              className="bg-foreground hover:bg-foreground/90 text-background px-[101px] h-14 text-base rounded-full group"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        
      </div>
      
      {/* Stats marquee - full width outside container */}
      <div className="absolute bottom-32 lg:bottom-48 left-0 right-0 overflow-hidden">
        <div className="flex gap-24 marquee whitespace-nowrap">
          {[
            { value: "+5000", label: "Hotel Partners", company: "GLOBAL" },
            { value: "100%", label: "Dedicated Coordination", company: "COMMITTED" },
            { value: "Nationwide", label: "Hospitality Network", company: "COVERAGE" },
            { value: "Enterprise", label: "Service Standards", company: "TRUSTED" },
            { value: "+5000", label: "Hotel Partners", company: "GLOBAL" },
            { value: "100%", label: "Dedicated Coordination", company: "COMMITTED" },
            { value: "Nationwide", label: "Hospitality Network", company: "COVERAGE" },
            { value: "Enterprise", label: "Service Standards", company: "TRUSTED" },
          ].map((stat, index) => (
            <div key={index} className="flex items-baseline gap-4 flex-shrink-0">
              <span className="text-5xl lg:text-7xl font-display">{stat.value}</span>
              <span className="text-base text-muted-foreground font-light">
                {stat.label}
                <span className="block font-semibold text-xs mt-1 tracking-wider uppercase">{stat.company}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator - positioned at bottom */}
      <div className="relative z-10 flex justify-center">
        <ScrollIndicator />
      </div>
    </section>
  );
}
