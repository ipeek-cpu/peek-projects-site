"use client";

import { caseStudy } from "@/content/site-content";
import { SectionLabel } from "@/components/ui/SectionLabel";

function CapabilityIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="7" width="2" height="4" rx="0.5" fill="#4af0c0" />
      <rect x="5" y="4" width="2" height="10" rx="0.5" fill="#4af0c0" />
      <rect x="9" y="2" width="2" height="14" rx="0.5" fill="#4af0c0" />
      <rect x="13" y="5" width="2" height="8" rx="0.5" fill="#4af0c0" />
    </svg>,
    <svg key="1" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="4" r="2" stroke="#4af0c0" strokeWidth="1.2" />
      <circle cx="4" cy="13" r="2" stroke="#4af0c0" strokeWidth="1.2" />
      <circle cx="14" cy="13" r="2" stroke="#4af0c0" strokeWidth="1.2" />
      <line x1="9" y1="6" x2="5" y2="11" stroke="#4af0c0" strokeWidth="1" />
      <line x1="9" y1="6" x2="13" y2="11" stroke="#4af0c0" strokeWidth="1" />
      <line x1="6" y1="13" x2="12" y2="13" stroke="#4af0c0" strokeWidth="1" />
    </svg>,
    <svg key="2" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 9h6M12 4l4 5-4 5" stroke="#4af0c0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="2" stroke="#4af0c0" strokeWidth="1.2" />
    </svg>,
    <svg key="3" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6 3L2 9l4 6M12 3l4 6-4 6" stroke="#4af0c0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="5" x2="10" y2="13" stroke="#4af0c0" strokeWidth="1" />
    </svg>,
    <svg key="4" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="12" rx="1.5" stroke="#4af0c0" strokeWidth="1.2" />
      <line x1="2" y1="8" x2="16" y2="8" stroke="#4af0c0" strokeWidth="1" />
      <line x1="6" y1="2" x2="6" y2="5" stroke="#4af0c0" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="2" x2="12" y2="5" stroke="#4af0c0" strokeWidth="1.2" strokeLinecap="round" />
    </svg>,
  ];
  return icons[index] || icons[0];
}

export function CaseStudySection() {
  return (
    <section
      id="case-study"
      className="relative w-full overflow-hidden"
      style={{ background: "#06060a", minHeight: "900px", zIndex: 2 }}
    >
      <div
        className="relative mx-auto flex flex-col lg:flex-row gap-16"
        style={{
          zIndex: 10,
          maxWidth: "1280px",
          padding: "100px 5vw 80px",
        }}
      >
        {/* Left Column */}
        <div className="flex-1 min-w-0" style={{ maxWidth: "560px" }}>
          <SectionLabel>{caseStudy.sectionLabel}</SectionLabel>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 reveal"
            style={{
              border: "1px solid rgba(74, 240, 192, 0.3)",
              padding: "6px 16px",
              marginBottom: "2rem",
            }}
          >
            <span style={{ color: "#4af0c0", fontSize: "0.65rem" }}>&#9670;</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.06em",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              {caseStudy.badge}
            </span>
          </div>

          {/* Heading */}
          <h2
            className="reveal"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: "1.5rem",
            }}
          >
            {caseStudy.headline}
          </h2>

          {/* Body */}
          <p
            className="reveal"
            style={{
              fontFamily: "var(--font-body)",
              color: "#8a8894",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: "480px",
            }}
          >
            {caseStudy.body}
          </p>

          {/* 2x2 Stat Grid */}
          <div className="grid grid-cols-2 gap-3 reveal" style={{ maxWidth: "420px" }}>
            {caseStudy.stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  padding: "20px 22px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#4af0c0",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
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
        </div>

        {/* Right Column — Capabilities */}
        <div className="flex-1 min-w-0 flex flex-col lg:pt-12">
          {caseStudy.capabilities.map((cap, i) => (
            <div key={cap.title} className="reveal">
              {i > 0 && (
                <div
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(90deg, rgba(74, 240, 192, 0.12) 0%, rgba(255,255,255,0.04) 100%)",
                  }}
                />
              )}
              <div className="flex items-start gap-4" style={{ padding: "20px 0" }}>
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    marginTop: "2px",
                  }}
                >
                  <CapabilityIcon index={i} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      lineHeight: 1.3,
                      marginBottom: "6px",
                    }}
                  >
                    {cap.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "#8a8894",
                      fontSize: "0.82rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {cap.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(74, 240, 192, 0.12) 0%, rgba(255,255,255,0.04) 100%)",
            }}
          />
        </div>
      </div>

      {/* Tech Stack Bar */}
      <div
        className="relative mx-auto reveal"
        style={{ maxWidth: "1280px", padding: "0 5vw 80px", zIndex: 10 }}
      >
        <div
          style={{
            background: "rgba(16, 16, 28, 0.85)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            padding: "40px 44px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#4af0c0",
              marginBottom: "20px",
            }}
          >
            TECHNICAL STACK
          </p>
          <div className="flex flex-wrap gap-2">
            {caseStudy.techStack.map((tag) => (
              <span
                key={tag}
                className="inline-block"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.04em",
                  color: "#8a8894",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "5px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
