import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIntakeClient } from "@/content/intake-clients";
import { IntakeForm } from "@/components/intake/IntakeForm";
import { Footer } from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website intake — peek.consulting",
  robots: { index: false, follow: false },
};

function formatCall(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  }).format(d);
}

export default async function IntakePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = getIntakeClient(slug);
  if (!client) notFound();

  const callLabel = client.callAt ? formatCall(client.callAt) : "";

  return (
    <main className="relative w-full">
      <div className="mx-auto max-w-[680px] px-6 pt-16 pb-24 md:pt-24">
        <header className="flex flex-col gap-5" style={{ marginBottom: 48 }}>
          <a
            href="/"
            className="font-mono text-sm tracking-tight"
            style={{ color: "var(--text-muted)" }}
          >
            peek.consulting
          </a>
          <p
            className="font-mono text-xs uppercase"
            style={{ letterSpacing: "0.18em", color: "var(--text-muted)" }}
          >
            Before we talk
          </p>
          <h1
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              textWrap: "balance",
            }}
          >
            {client.firstName ? `${client.firstName}, ten` : "Ten"} quick questions about the
            site you&rsquo;re building
            {client.projectHint ? ` ${client.projectHint}` : ""}.
          </h1>
          <p style={{ color: "var(--text-dim)", maxWidth: "56ch" }}>
            Five minutes, rough answers welcome. It lets me spend our
            {callLabel ? ` ${callLabel}` : ""} call on the decisions that matter instead of
            the basics, and come with a first read on scope.
          </p>
        </header>

        <IntakeForm slug={client.slug} firstName={client.firstName} />
      </div>
      <Footer />
    </main>
  );
}
