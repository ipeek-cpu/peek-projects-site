import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} — Peek Projects`,
    description: post.meta.description,
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      style={{
        fontFamily: "var(--font-heading)",
        fontSize: "2rem",
        fontWeight: 800,
        color: "#ffffff",
        lineHeight: 1.2,
        letterSpacing: "-0.03em",
        margin: "2rem 0 1rem",
      }}
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      style={{
        fontFamily: "var(--font-heading)",
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "#ffffff",
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
        margin: "2rem 0 0.75rem",
      }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      style={{
        fontFamily: "var(--font-heading)",
        fontSize: "1.2rem",
        fontWeight: 700,
        color: "#ffffff",
        margin: "1.5rem 0 0.5rem",
      }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      style={{
        fontFamily: "var(--font-body)",
        color: "#8a8894",
        fontSize: "0.95rem",
        lineHeight: 1.7,
        margin: "0 0 1.25rem",
      }}
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      style={{ color: "#4af0c0", textDecoration: "underline" }}
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.85rem",
        color: "#4af0c0",
        background: "rgba(255, 255, 255, 0.05)",
        padding: "2px 6px",
      }}
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      style={{
        background: "#10101c",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        padding: "24px",
        overflow: "auto",
        margin: "1.5rem 0",
        fontFamily: "var(--font-mono)",
        fontSize: "0.85rem",
        lineHeight: 1.6,
      }}
      {...props}
    />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      style={{
        borderLeft: "3px solid #4af0c0",
        paddingLeft: "1rem",
        margin: "1.5rem 0",
        fontStyle: "italic",
        color: "#8a8894",
      }}
      {...props}
    />
  ),
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div
      className="min-h-screen"
      style={{ background: "#06060a", padding: "120px 5vw 80px" }}
    >
      <article style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* Back link */}
        <Link
          href="/blog"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            color: "#4af0c0",
            textDecoration: "none",
            marginBottom: "32px",
            display: "inline-block",
          }}
        >
          &larr; Back to Writing
        </Link>

        {/* Post header */}
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            marginBottom: "12px",
          }}
        >
          {post.meta.title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            color: "rgba(138, 136, 148, 0.6)",
            marginBottom: "48px",
          }}
        >
          {post.meta.date}
        </p>

        {/* MDX Content */}
        <MDXRemote source={post.content} components={mdxComponents} />
      </article>
    </div>
  );
}
