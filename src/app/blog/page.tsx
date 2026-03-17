import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

export const metadata = {
  title: "Blog — Peek Projects",
  description:
    "Thoughts on AI agents, data engineering, and building things that work.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div
      className="min-h-screen"
      style={{ background: "#06060a", padding: "120px 5vw 80px" }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Back link */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            color: "#4af0c0",
            textDecoration: "none",
            marginBottom: "48px",
            display: "inline-block",
          }}
        >
          &larr; Back
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "48px",
          }}
        >
          Writing
        </h1>

        {posts.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "#8a8894",
              fontSize: "0.95rem",
            }}
          >
            No posts yet.
          </p>
        ) : (
          <div className="flex flex-col gap-0">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block transition-colors duration-200"
                style={{
                  textDecoration: "none",
                  padding: "24px 0",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {post.title}
                  </h2>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: "rgba(138, 136, 148, 0.6)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {post.date}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#8a8894",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                    marginTop: "6px",
                  }}
                >
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
