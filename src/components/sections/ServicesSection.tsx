"use client";

import { useState } from "react";
import { services } from "@/content/site-content";
import { SectionLabel } from "@/components/ui/SectionLabel";

function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  const [hovered, setHovered] = useState(false);
  const isFlagship = service.flagship;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: isFlagship ? "1px" : 0 }}
    >
      {/* Flagship gradient border */}
      {isFlagship && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(74, 240, 192, 0.4) 0%, rgba(100, 100, 255, 0.3) 50%, rgba(168, 85, 247, 0.35) 100%)",
            zIndex: 0,
          }}
        />
      )}

      {/* Card body */}
      <div
        className="relative"
        style={{
          background: "#10101c",
          border: isFlagship ? "none" : "1px solid rgba(255, 255, 255, 0.06)",
          padding: "36px 34px",
          minHeight: "220px",
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
        }}
      >
        {/* Hover top gradient line (non-flagship) */}
        {!isFlagship && (
          <div
            className="absolute top-0 left-0 right-0 transition-opacity duration-300"
            style={{
              height: "2px",
              background: "linear-gradient(90deg, #4af0c0 0%, #a855f7 100%)",
              opacity: hovered ? 1 : 0,
              zIndex: 2,
            }}
          />
        )}

        {/* Number */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            color: isFlagship
              ? "rgba(74, 240, 192, 0.5)"
              : "rgba(138, 136, 148, 0.4)",
            marginBottom: "16px",
          }}
        >
          {service.num}
        </p>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: isFlagship ? "#4af0c0" : "#ffffff",
            lineHeight: 1.25,
            marginBottom: "14px",
          }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "#8a8894",
            fontSize: "0.82rem",
            lineHeight: 1.65,
            flex: 1,
          }}
        >
          {service.description}
        </p>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full"
      style={{ background: "#06060a", padding: "100px 0 120px", zIndex: 2 }}
    >
      <div
        className="relative mx-auto"
        style={{ maxWidth: "1280px", padding: "0 5vw" }}
      >
        {/* Section header */}
        <div style={{ marginBottom: "48px" }}>
          <SectionLabel>WHAT I BUILD</SectionLabel>
          <h2
            className="reveal"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "12px",
            }}
          >
            Services
          </h2>
          <p
            className="reveal"
            style={{
              fontFamily: "var(--font-body)",
              color: "#8a8894",
              fontSize: "0.95rem",
              lineHeight: 1.5,
            }}
          >
            Six core capabilities — each one engineered to eliminate manual work permanently.
          </p>
        </div>

        {/* 3x2 Grid (2-col tablet, 1-col mobile) */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 reveal"
          style={{ gap: "2px" }}
        >
          {services.map((service) => (
            <ServiceCard key={service.num} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
