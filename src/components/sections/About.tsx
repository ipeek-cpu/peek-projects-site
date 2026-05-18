"use client";

import { Reveal } from "@/components/motion/Reveal";
import { about } from "@/content/site-content";

export function About() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="grid gap-10 md:grid-cols-[8rem_1fr]">
          <Reveal>
            <p
              className="font-mono text-xs uppercase"
              style={{
                letterSpacing: "0.18em",
                color: "var(--text-muted)",
              }}
            >
              About
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <blockquote
              className="text-balance"
              style={{
                fontSize: "clamp(1.15rem, 1.7vw, 1.4rem)",
                lineHeight: 1.55,
                color: "var(--text)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                maxWidth: "44ch",
                borderLeft: "2px solid var(--accent)",
                paddingLeft: "1.5rem",
              }}
            >
              {about.body}
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
