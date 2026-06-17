"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/landing/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for dark mode
    setIsDark(document.documentElement.classList.contains("dark"));
    
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    
    return () => observer.disconnect();
  }, []);

  const lightGradient = "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)";
  const darkGradient = "linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe)";

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        background: isDark ? darkGradient : lightGradient,
        backgroundSize: "400% 400%",
        animation: "gradient-shift 15s ease infinite",
      }}
    >
      <Navigation />
      
      {/* Semi-transparent overlay for text contrast */}
      <div className="absolute inset-0 top-16 bg-white/20 dark:bg-black/30" />

      {/* Centered auth content */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-md">
          {mounted && children}
        </div>
      </div>
    </div>
  );
}
