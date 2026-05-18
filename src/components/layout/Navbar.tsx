"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/content/site-content";

export function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-50 backdrop-blur-md"
          style={{
            background: "rgba(10, 10, 10, 0.72)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
            <a
              href="#top"
              className="font-mono text-sm tracking-tight transition-colors"
              style={{ color: "var(--text)" }}
            >
              {nav.brand}
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors hover:text-[color:var(--text)]"
                  style={{ color: "var(--text-dim)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href={nav.cta.href}
              className="inline-flex items-center gap-2 rounded-md border px-3.5 py-1.5 text-sm font-medium transition-all"
              style={{
                borderColor: "var(--border-strong)",
                color: "var(--text)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-strong)";
                e.currentTarget.style.color = "var(--text)";
              }}
            >
              {nav.cta.label}
            </a>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
