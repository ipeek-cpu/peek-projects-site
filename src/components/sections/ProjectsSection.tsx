"use client";

import { projects } from "@/content/site-content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { TagPill } from "@/components/ui/TagPill";

export function ProjectsSection() {
  return (
    <div id="projects" style={{ marginBottom: "100px" }}>
      <SectionLabel>SIDE PROJECTS</SectionLabel>

      <div
        className="grid grid-cols-1 md:grid-cols-2 reveal"
        style={{ gap: "2px" }}
      >
        {projects.map((project) => (
          <div
            key={project.title}
            style={{
              background: "#10101c",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              padding: "40px 38px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Badge */}
            <div style={{ marginBottom: "20px" }}>
              <Badge
                label={project.badge}
                bgColor={project.badgeColor}
                textColor={project.badgeTextColor}
              />
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2rem",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "8px",
              }}
            >
              {project.title}
            </h3>

            {/* Link */}
            {project.link ? (
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.06em",
                  color: "#4af0c0",
                  textDecoration: "none",
                  marginBottom: "18px",
                  display: "inline-block",
                }}
              >
                {project.link.label}
              </a>
            ) : (
              <div style={{ marginBottom: "18px" }} />
            )}

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#8a8894",
                fontSize: "0.85rem",
                lineHeight: 1.65,
                marginBottom: "24px",
                flex: 1,
              }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
