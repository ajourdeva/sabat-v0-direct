"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    serviceInterest: "accommodation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        organizationName: "",
        contactPerson: "",
        email: "",
        phone: "",
        serviceInterest: "accommodation",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 border-t border-foreground/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Get Started
            </span>
            <h2
              className={`text-4xl lg:text-6xl font-display tracking-tight mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Ready to simplify your travel operations?
            </h2>
            <p
              className={`text-lg text-muted-foreground leading-relaxed mb-12 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Whether managing executive guests, employee missions, or long-term accommodation projects, SABAT becomes an extension of your team.
            </p>

            {/* Contact Info */}
            <div
              className={`space-y-6 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div>
                <p className="text-sm font-mono text-muted-foreground mb-2">Phone</p>
                <p className="text-lg text-foreground">+98 (XXX) XXX-XXXX</p>
              </div>
              <div>
                <p className="text-sm font-mono text-muted-foreground mb-2">Email</p>
                <p className="text-lg text-foreground">contact@sabat.ir</p>
              </div>
              <div>
                <p className="text-sm font-mono text-muted-foreground mb-2">Address</p>
                <p className="text-lg text-foreground">Tehran, Iran</p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Name */}
              <div>
                <label className="block text-sm font-mono text-muted-foreground mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="Your company"
                />
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-sm font-mono text-muted-foreground mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-mono text-muted-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-mono text-muted-foreground mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="+98 (XXX) XXX-XXXX"
                />
              </div>

              {/* Service Interest */}
              <div>
                <label className="block text-sm font-mono text-muted-foreground mb-2">
                  Service Interest *
                </label>
                <select
                  name="serviceInterest"
                  value={formData.serviceInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all text-foreground"
                >
                  <option value="accommodation">Corporate Accommodation</option>
                  <option value="transfers">Transfers & Executive Hospitality</option>
                  <option value="business-travel">Business Travel Operations</option>
                  <option value="all">All Services</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-mono text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-lg focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all text-foreground placeholder:text-muted-foreground resize-none"
                  placeholder="Tell us about your travel coordination needs..."
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-lg h-12 text-base font-medium group"
              >
                {submitted ? "Thank you!" : "Request Consultation"}
                {!submitted && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We&apos;ll respond within 24 business hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
