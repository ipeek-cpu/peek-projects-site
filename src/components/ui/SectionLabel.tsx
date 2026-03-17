"use client";

export function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className="font-[var(--font-mono)] text-accent uppercase tracking-[0.15em]"
      style={{ fontSize: "0.65rem", marginBottom: "1.25rem" }}
    >
      [ {children} ]
    </p>
  );
}
