"use client";

import { Reveal } from "@/components/motion/Reveal";
import { bringIt } from "@/content/site-content";

export function BringIt() {
  return (
    <section className="relative w-full overflow-hidden py-32 md:py-48">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(900px, 90vw)",
          height: "min(900px, 90vw)",
          background:
            "radial-gradient(circle at center, var(--accent-glow) 0%, transparent 60%)",
          opacity: 0.6,
          filter: "blur(40px)",
        }}
      />

      <Reveal className="relative mx-auto max-w-[1100px] px-6">
        <p
          className="text-balance"
          style={{
            fontSize: "clamp(1.6rem, 3.6vw, 2.75rem)",
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.025em",
            color: "var(--text)",
            maxWidth: "28ch",
          }}
        >
          {bringIt.body}
        </p>
      </Reveal>
    </section>
  );
}
