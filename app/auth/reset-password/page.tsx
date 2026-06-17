"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const allChecks = Object.values(passwordChecks).every(Boolean);

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-display font-bold">Set new password</h1>
        <p className="text-muted-foreground">
          Create a strong password to secure your account
        </p>
      </div>

      {isSubmitted ? (
        <div className="space-y-4 pt-4">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <p className="text-sm text-green-500 font-medium">
              Password updated successfully
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Your password has been reset. You can now sign in with your new password.
            </p>
          </div>

          <Button className="w-full h-12">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      ) : (
        <form className="space-y-4">
          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Password strength indicator */}
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Password requirements:</div>
            <div className="space-y-1">
              {[
                { check: passwordChecks.length, label: "At least 8 characters" },
                { check: passwordChecks.uppercase, label: "One uppercase letter" },
                { check: passwordChecks.number, label: "One number" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs">
                  {item.check ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className={item.check ? "text-foreground" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <Button
            className="w-full h-12 text-base"
            disabled={!allChecks}
            onClick={() => setIsSubmitted(true)}
          >
            Reset Password
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-muted-foreground">
        <Link
          href="/auth/signin"
          className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
        >
          Back to Sign In
        </Link>
      </p>
    </div>
  );
}
