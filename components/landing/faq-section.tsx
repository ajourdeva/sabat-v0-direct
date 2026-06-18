"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How are services customized for our organization?",
    answer: "We begin with a comprehensive consultation to understand your travel patterns, budget, service preferences, and specific requirements. Based on these insights, we design tailored service packages that address your unique operational challenges and objectives.",
  },
  {
    question: "Can SABAT support nationwide operations?",
    answer: "Yes. Our nationwide hospitality network and partnerships enable us to coordinate accommodation and travel across all major cities and regions. Whether your team travels locally or nationally, we maintain consistent service standards and coordination.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Absolutely. We provide 24/7 operational support throughout all business journeys. Our team is available before, during, and after travel to address any changes, issues, or last-minute adjustments that may arise.",
  },
  {
    question: "Can travel arrangements change after confirmation?",
    answer: "Yes. We understand that business needs evolve. Our team manages any changes, cancellations, or modifications with flexibility and responsiveness. We work with our partners to minimize disruptions and ensure smooth transitions.",
  },
  {
    question: "How do organizations begin working with SABAT?",
    answer: "Start by requesting a consultation. During this initial meeting, we'll discuss your organization's travel needs, objectives, and current challenges. We'll then design a customized proposal and onboarding plan that works for your team.",
  },
];

function FAQItem({ question, answer, index, isOpen, onToggle }: any) {
  return (
    <div className="border-b border-foreground/10 last:border-0">
      <button
        onClick={() => onToggle(index)}
        className="w-full py-6 lg:py-8 flex items-start justify-between group text-left hover:text-foreground/80 transition-colors"
      >
        <span className="text-lg lg:text-xl font-display tracking-tight flex-1 pr-6">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 mt-1 text-muted-foreground transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-6 lg:pb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export function FAQSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Questions & Answers
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Frequently asked
            <br />
            <span className="text-muted-foreground">questions.</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
              isOpen={openIndex === index}
              onToggle={setOpenIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
