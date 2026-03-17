"use client";

import { useState, useEffect, useRef } from "react";
import { navLinks } from "@/content/site-content";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastScroll.current && y > 100);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-[5vw] py-4 transition-transform duration-300"
      style={{
        zIndex: 100,
        background: "rgba(6, 6, 10, 0.4)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(74, 240, 192, 0.08)",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        className="cursor-pointer"
        style={{ fontFamily: "var(--font-heading)", textDecoration: "none" }}
      >
        <span
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#ffffff",
          }}
        >
          peek
        </span>
        <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#4af0c0" }}>
          .
        </span>
      </a>

      {/* Desktop links */}
      <div
        className="hidden md:flex items-center gap-8"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="transition-colors duration-200 hover:text-accent"
            style={{ color: "rgba(138, 136, 148, 0.9)", textDecoration: "none" }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        style={{ background: "none", border: "none", padding: "4px" }}
      >
        <span
          className="block w-5 transition-transform"
          style={{
            height: "1.5px",
            background: "#4af0c0",
            transform: menuOpen ? "rotate(45deg) translate(2px, 4px)" : "none",
          }}
        />
        <span
          className="block w-5 transition-opacity"
          style={{
            height: "1.5px",
            background: "#4af0c0",
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          className="block w-5 transition-transform"
          style={{
            height: "1.5px",
            background: "#4af0c0",
            transform: menuOpen
              ? "rotate(-45deg) translate(2px, -4px)"
              : "none",
          }}
        />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col gap-6 px-[5vw] py-8 md:hidden"
          style={{
            background: "rgba(6, 6, 10, 0.95)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(74, 240, 192, 0.08)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ color: "rgba(138, 136, 148, 0.9)", textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
