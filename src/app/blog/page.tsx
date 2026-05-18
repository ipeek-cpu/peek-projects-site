import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

export const metadata = {
  title: "Writing — peek.consulting",
  description:
    "Notes on shipping production systems, AI agents, and the engineering decisions behind them.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen" style={{ padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Link
          href="/"
          className="font-mono"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "48px",
            display: "inline-block",
          }}
        >
          ← Back
        </Link>

        <h1
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 700,
            color: "var(--text)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "48px",
          }}
        >
          Writing
        </h1>

        {posts.length === 0 ? (
          <p style={{ color: "var(--text-dim)", fontSize: "1rem" }}>
            No posts yet.
          </p>
        ) : (
          <div className="flex flex-col">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block"
                style={{
                  padding: "24px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--text)",
                    }}
                  >
                    {post.title}
                  </h2>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {post.date}
                  </span>
                </div>
                <p
                  style={{
                    color: "var(--text-dim)",
                    fontSize: "0.92rem",
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
