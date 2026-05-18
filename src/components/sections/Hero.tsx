"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/content/site-content";

export function Hero() {
  const reduced = useReducedMotion();

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center"
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <motion.p
          {...fade(0)}
          className="mb-8 font-mono text-xs uppercase"
          style={{
            letterSpacing: "0.18em",
            color: "var(--text-muted)",
          }}
        >
          peek.consulting
        </motion.p>

        <motion.h1
          {...fade(0.08)}
          className="text-balance"
          style={{
            fontSize: "clamp(2.4rem, 5.6vw, 4.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            color: "var(--text)",
            maxWidth: "22ch",
          }}
        >
          {hero.h1}
        </motion.h1>

        <motion.p
          {...fade(0.18)}
          className="mt-8 text-balance"
          style={{
            fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
            lineHeight: 1.55,
            color: "var(--text-dim)",
            maxWidth: "58ch",
          }}
        >
          {hero.subhead}
        </motion.p>

        <motion.div {...fade(0.28)} className="mt-12">
          <a
            href={hero.primaryCta.href}
            className="group inline-flex items-center gap-3 rounded-md px-5 py-3 text-sm font-medium transition-all"
            style={{
              background: "var(--text)",
              color: "var(--bg)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--text)";
            }}
          >
            {hero.primaryCta.label}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
