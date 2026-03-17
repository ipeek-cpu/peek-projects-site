"use client";

import { experience, credential } from "@/content/site-content";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ExperienceSection() {
  return (
    <div id="experience">
      <SectionLabel>EXPERIENCE</SectionLabel>

      <div style={{ maxWidth: "800px" }}>
        {experience.map((entry, i) => (
          <div key={entry.company} className="reveal">
            {i > 0 && (
              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                }}
              />
            )}

            <div
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8"
              style={{ padding: "24px 0", alignItems: "start" }}
            >
              {/* Date */}
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.06em",
                  color: "rgba(138, 136, 148, 0.6)",
                  paddingTop: "3px",
                  whiteSpace: "nowrap",
                }}
              >
                {entry.dates}
              </p>

              {/* Content */}
              <div>
                <p style={{ marginBottom: "4px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {entry.role}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "rgba(74, 240, 192, 0.7)",
                      marginLeft: "8px",
                    }}
                  >
                    — {entry.company}
                  </span>
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#8a8894",
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                  }}
                >
                  {entry.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Final line */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        />

        {/* Georgia Tech credential — subtle one-liner */}
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            color: "rgba(138, 136, 148, 0.4)",
            marginTop: "20px",
          }}
        >
          {credential.text}
        </p>
      </div>
    </div>
  );
}
