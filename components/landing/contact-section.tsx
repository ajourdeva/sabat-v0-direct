"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Instagram, Send, Linkedin, MapPin, Youtube } from "lucide-react";

const socialLinks = [
  { name: "WhatsApp", href: "#", icon: MessageCircle },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Telegram", href: "#", icon: Send },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "TripAdvisor", href: "#", icon: MapPin },
  { name: "YouTube", href: "#", icon: Youtube },
];

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
              Ready to get SABATIZED?
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

              {/* Request Proposal Button */}
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 has-[>svg]:px-4 h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5">
                Request a Proposal
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Social Links Box */}
              <div className="p-6 border border-foreground/10 rounded-lg bg-background/50 backdrop-blur-sm w-fit">
                <p className="text-xs font-medium text-foreground/60 mb-4 uppercase tracking-wide">Connect With Us</p>
                <div className="grid grid-cols-3 gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        title={link.name}
                        className="flex items-center justify-center w-10 h-10 rounded-lg border border-foreground/10 text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-200 group"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
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
                {submitted ? "Thank you!" : "Book Consultation"}
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
