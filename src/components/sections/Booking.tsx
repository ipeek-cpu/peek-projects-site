"use client";

import { Reveal } from "@/components/motion/Reveal";
import { booking } from "@/content/site-content";

export function Booking() {
  return (
    <section id="book" className="relative w-full py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div className="flex flex-col gap-6">
            <Reveal>
              <p
                className="font-mono text-xs uppercase"
                style={{
                  letterSpacing: "0.18em",
                  color: "var(--text-muted)",
                }}
              >
                Book a call
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  color: "var(--text)",
                }}
              >
                {booking.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  color: "var(--text-dim)",
                  maxWidth: "40ch",
                }}
              >
                {booking.description}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div
              className="overflow-hidden rounded-xl"
              style={{
                border: "1px solid var(--border)",
                background: "var(--surface)",
                minHeight: "640px",
              }}
            >
              <iframe
                src={`${booking.calendlyUrl}?embed_domain=peek.consulting&embed_type=Inline&hide_event_type_details=0&background_color=141414&text_color=fafafa&primary_color=22d3ee`}
                title="Book a discovery call"
                width="100%"
                height="640"
                frameBorder={0}
                style={{ display: "block", colorScheme: "dark" }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
