export function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 0",
      }}
    >
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-6">
        <span
          className="font-mono text-xs"
          style={{
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
          }}
        >
          peek.consulting
        </span>
        <span
          className="font-mono text-xs"
          style={{
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
          }}
        >
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
