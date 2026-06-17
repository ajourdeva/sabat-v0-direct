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
      
      {/* Animated gradient background */}
      <div className="fixed inset-0 top-16 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-foreground/5" />
        
        {/* Animated gradient blobs */}
        <div className="absolute top-1/4 -left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
      </div>

      {/* Centered auth content */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">
          {mounted && children}
        </div>
      </div>
    </div>
  );
}
