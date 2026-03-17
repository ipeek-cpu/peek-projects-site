"use client";

export function TagPill({ children }: { children: string }) {
  return (
    <span
      className="inline-block font-[var(--font-mono)] whitespace-nowrap"
      style={{
        fontSize: "0.58rem",
        letterSpacing: "0.04em",
        color: "rgba(138, 136, 148, 0.8)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "4px 12px",
      }}
    >
      {children}
    </span>
  );
}
