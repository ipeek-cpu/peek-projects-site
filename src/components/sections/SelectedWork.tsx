"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { caseStudies, type CaseStudy } from "@/content/site-content";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

export function SelectedWork() {
  return (
    <section id="work" className="relative w-full py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal>
          <p
            className="font-mono text-xs uppercase"
            style={{
              letterSpacing: "0.18em",
              color: "var(--text-muted)",
            }}
          >
            Selected work
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 flex flex-col gap-6">
          {caseStudies.map((c) => (
            <StaggerItem key={c.id}>
              <Card study={c} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function Card({ study }: { study: CaseStudy }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="rounded-xl transition-all"
      style={{
        background: "var(--surface)",
        border: `1px solid ${hover ? "var(--accent)" : "var(--border)"}`,
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        transitionDuration: "200ms",
        transitionTimingFunction: "ease-out",
      }}
    >
      <div className="p-7 md:p-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h3
            style={{
              fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            {study.client}
          </h3>
          {study.url && (
            <a
              href={study.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {study.url.replace(/^https?:\/\//, "")} ↗
            </a>
          )}
        </div>

        <div className="mt-8 grid gap-7 md:grid-cols-[8rem_1fr]">
          <Label>Problem</Label>
          <Body>{study.problem}</Body>

          <Label>Approach</Label>
          <Body>{study.approach}</Body>

          <Label>Outcome</Label>
          <Body>
            <span style={{ color: "var(--text)" }}>{study.outcome}</span>
          </Body>
        </div>

        <div
          className="mt-8 pt-6"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase transition-colors"
            style={{
              letterSpacing: "0.14em",
              color: open ? "var(--accent)" : "var(--text-dim)",
            }}
          >
            <span>Stack</span>
            <span
              aria-hidden
              className="transition-transform"
              style={{
                transform: open ? "rotate(90deg)" : "rotate(0deg)",
                display: "inline-block",
              }}
            >
              ›
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="stack"
                initial={reduced ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <ul className="mt-5 flex flex-wrap gap-2">
                  {study.stack.map((s) => (
                    <li
                      key={s}
                      className="font-mono text-xs"
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        color: "var(--text-dim)",
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-mono text-xs uppercase"
      style={{
        letterSpacing: "0.14em",
        color: "var(--text-muted)",
        paddingTop: "2px",
      }}
    >
      {children}
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "1rem",
        lineHeight: 1.65,
        color: "var(--text-dim)",
      }}
    >
      {children}
    </p>
  );
}
