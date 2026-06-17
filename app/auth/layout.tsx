"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/landing/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Animated shader gradient background */}
      <div className="fixed inset-0 top-16 -z-10" style={{
        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 15s ease infinite",
      }} />
      
      {/* Dark mode gradient override */}
      <div className="fixed inset-0 top-16 -z-10 dark:block hidden" style={{
        background: "linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe)",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 15s ease infinite",
      }} />
      
      {/* Overlay for glassmorphism effect and text visibility */}
      <div className="fixed inset-0 top-16 -z-10 bg-white/40 dark:bg-black/50" />

      {/* Centered auth content */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">
          {mounted && children}
        </div>
      </div>
    </div>
  );
}
