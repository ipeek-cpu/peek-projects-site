"use client";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { principles } from "@/content/site-content";

export function HowIWork() {
  return (
    <section id="how" className="relative w-full py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal>
          <p
            className="font-mono text-xs uppercase"
            style={{
              letterSpacing: "0.18em",
              color: "var(--text-muted)",
            }}
          >
            How I work
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {principles.map((p, idx) => (
            <StaggerItem key={p.title} as="article">
              <div className="flex flex-col gap-4">
                <span
                  className="font-mono text-xs"
                  style={{
                    color: "var(--accent)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    lineHeight: 1.25,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-dim)",
                    fontSize: "0.97rem",
                    lineHeight: 1.6,
                  }}
                >
                  {p.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
