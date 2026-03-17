"use client";

import { contactInfo, footerContent } from "@/content/site-content";

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4.5 6.5V12" stroke="#8a8894" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4.5 3.5V3.51" stroke="#8a8894" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.5 12V9C8.5 7.5 10 7 11 7.5C11.5 7.75 12 8.5 12 9.5V12" stroke="#8a8894" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 6.5V12" stroke="#8a8894" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 13C3 14 3 11 2 11M10 14V12C10 11 10.1 10.6 9.5 10C11.5 9.8 13 9 13 6.5C13 5.5 12.6 4.8 12 4.2C12.1 3.8 12.2 2.8 11.8 2C11.8 2 11 2 10 2.8C9 2.5 7 2.5 6 2.8C5 2 4.2 2 4.2 2C3.8 2.8 3.9 3.8 4 4.2C3.4 4.8 3 5.5 3 6.5C3 9 4.5 9.8 6.5 10C6 10.5 6 11 6 12V14" stroke="#8a8894" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 3L7.5 8.5M13 13L8.5 7.5M7.5 8.5L13 3M8.5 7.5L3 13" stroke="#8a8894" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const socialIcons: Record<string, React.ReactNode> = {
  LinkedIn: <LinkedInIcon />,
  GitHub: <GitHubIcon />,
  X: <XIcon />,
};

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      style={{ background: "transparent", minHeight: "500px", zIndex: 2 }}
    >
      <div
        className="relative mx-auto"
        style={{ maxWidth: "1280px", padding: "100px 5vw 0", zIndex: 10 }}
      >
        {/* Section label */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#4af0c0",
            marginBottom: "32px",
          }}
        >
          [ CONTACT ]
        </p>

        {/* Heading */}
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "14px",
          }}
        >
          {contactInfo.heading}
        </h2>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            color: "#8a8894",
            fontSize: "0.95rem",
            lineHeight: 1.5,
            marginBottom: "48px",
            maxWidth: "560px",
          }}
        >
          {contactInfo.subtitle}
        </p>

        {/* Email button-link */}
        <a
          href={`mailto:${contactInfo.email}`}
          className="flex items-center justify-between transition-colors duration-200 reveal"
          style={{
            border: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "22px 32px",
            textDecoration: "none",
            maxWidth: "560px",
            marginBottom: "36px",
            background: "rgba(255, 255, 255, 0.02)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(74, 240, 192, 0.25)";
            e.currentTarget.style.background = "rgba(74, 240, 192, 0.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              letterSpacing: "0.02em",
              color: "#ffffff",
            }}
          >
            {contactInfo.email}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(138, 136, 148, 0.5)",
            }}
          >
            Email
          </span>
        </a>

        {/* Social links */}
        <div className="flex items-center gap-3 reveal" style={{ marginBottom: "80px" }}>
          {contactInfo.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="flex items-center gap-3 transition-colors duration-200"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "12px 16px",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(74, 240, 192, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            >
              <div className="flex items-center justify-center" style={{ width: "16px", height: "16px" }}>
                {socialIcons[s.label]}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(138, 136, 148, 0.7)",
                }}
              >
                {s.label}
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        />
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
          style={{ padding: "24px 0 40px" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.08em",
              color: "rgba(138, 136, 148, 0.4)",
            }}
          >
            {footerContent.copyright}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.08em",
              color: "rgba(138, 136, 148, 0.4)",
            }}
          >
            {footerContent.tagline}
          </span>
        </div>
      </div>
    </section>
  );
}
