"use client";

import { heroContent } from "@/content/site-content";
import { GradientText } from "@/components/ui/GradientText";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex flex-col justify-center"
      style={{ height: "100vh", minHeight: "700px", zIndex: 2, padding: "0 5vw", paddingTop: "80px" }}
    >
      <div className="max-w-[900px]">
        {/* Tag line */}
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#4af0c0",
            marginBottom: "1.5rem",
          }}
        >
          {heroContent.tag}
        </p>

        {/* Headline */}
        <h1
          className="reveal"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            marginBottom: "1.5rem",
          }}
        >
          I build AI agents
          <br />
          that <GradientText>run real businesses.</GradientText>
        </h1>

        {/* Subtitle */}
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            color: "#8a8894",
            fontSize: "1.1rem",
            lineHeight: 1.65,
            maxWidth: "520px",
            marginBottom: "2.5rem",
          }}
        >
          {heroContent.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="reveal flex flex-wrap items-center gap-4" style={{ marginBottom: "3.5rem" }}>
          <a
            href={heroContent.cta.primary.href}
            className="inline-block cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "#4af0c0",
              color: "#06060a",
              padding: "14px 32px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {heroContent.cta.primary.label}
          </a>
          <a
            href={heroContent.cta.secondary.href}
            className="inline-block cursor-pointer transition-all duration-200 hover:border-[var(--border-accent-hover)]"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "transparent",
              color: "#4af0c0",
              border: "1px solid rgba(74, 240, 192, 0.3)",
              padding: "14px 32px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {heroContent.cta.secondary.label}
          </a>
        </div>
      </div>

      {/* Stats row — pinned to bottom on desktop, in-flow on mobile */}
      <div
        className="md:absolute md:bottom-10 md:left-0 md:right-0 grid grid-cols-2 gap-6 md:flex md:flex-wrap md:items-end md:gap-12 reveal"
        style={{ padding: "0 5vw" }}
      >
        {heroContent.stats.map((stat) => (
          <div key={stat.label}>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#4af0c0",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8a8894",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
