"use client";

interface BadgeProps {
  label: string;
  bgColor: string;
  textColor: string;
}

export function Badge({ label, bgColor, textColor }: BadgeProps) {
  return (
    <span
      className="inline-block font-[var(--font-mono)] font-bold uppercase tracking-[0.1em]"
      style={{
        fontSize: "0.55rem",
        color: textColor,
        background: bgColor,
        padding: "4px 10px",
      }}
    >
      {label}
    </span>
  );
}
