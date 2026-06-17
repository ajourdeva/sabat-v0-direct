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
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      {/* Animated shader gradient background */}
      <div className="fixed inset-0 top-16 -z-10 auth-gradient-bg" />
      
      {/* Overlay for glassmorphism effect */}
      <div className="fixed inset-0 top-16 -z-10 bg-black/30 dark:bg-black/50" />

      {/* Centered auth content */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">
          {mounted && children}
        </div>
      </div>
    </div>
  );
}
