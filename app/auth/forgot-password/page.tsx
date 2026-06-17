"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-display font-bold">Reset password</h1>
        <p className="text-muted-foreground">
          Enter your email and we&apos;ll send you a link to reset your password
        </p>
      </div>

      {isSubmitted ? (
        <div className="space-y-4 pt-4">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <p className="text-sm text-green-500 font-medium">
              Check your email
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              We&apos;ve sent a password reset link to your email address. 
              Click the link to proceed with resetting your password.
            </p>
          </div>

          <Button variant="outline" className="w-full h-12">
            <Link href="/auth/signin">Back to Sign In</Link>
          </Button>
        </div>
      ) : (
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input
              type="email"
              placeholder="you@company.com"
              className="h-12"
            />
          </div>

          <Button
            className="w-full h-12 text-base"
            onClick={() => setIsSubmitted(true)}
          >
            Send Reset Link
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
