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
    title: `${post.meta.title} — peek.consulting`,
    description: post.meta.description,
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      style={{
        fontSize: "1.9rem",
        fontWeight: 700,
        color: "var(--text)",
        lineHeight: 1.15,
        letterSpacing: "-0.03em",
        margin: "2rem 0 1rem",
      }}
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      style={{
        fontSize: "1.4rem",
        fontWeight: 700,
        color: "var(--text)",
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
        fontSize: "1.15rem",
        fontWeight: 700,
        color: "var(--text)",
        margin: "1.5rem 0 0.5rem",
      }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      style={{
        color: "var(--text-dim)",
        fontSize: "1rem",
        lineHeight: 1.7,
        margin: "0 0 1.25rem",
      }}
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a style={{ color: "var(--accent)", textDecoration: "underline" }} {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="font-mono"
      style={{
        fontSize: "0.88rem",
        color: "var(--accent)",
        background: "var(--surface-2)",
        padding: "2px 6px",
        borderRadius: "4px",
      }}
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="font-mono"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        padding: "20px",
        overflow: "auto",
        margin: "1.5rem 0",
        fontSize: "0.85rem",
        lineHeight: 1.6,
        borderRadius: "8px",
      }}
      {...props}
    />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      style={{
        borderLeft: "2px solid var(--accent)",
        paddingLeft: "1.25rem",
        margin: "1.5rem 0",
        color: "var(--text)",
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
    <div className="min-h-screen" style={{ padding: "120px 24px 80px" }}>
      <article style={{ maxWidth: "700px", margin: "0 auto" }}>
        <Link
          href="/blog"
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
          ← Back to writing
        </Link>

        <h1
          style={{
            fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)",
            fontWeight: 700,
            color: "var(--text)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "12px",
          }}
        >
          {post.meta.title}
        </h1>
        <p
          className="font-mono"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            marginBottom: "48px",
          }}
        >
          {post.meta.date}
        </p>

        <MDXRemote source={post.content} components={mdxComponents} />
      </article>
    </div>
  );
}
