// ─── Navigation ──────────────────────────────────────────────

export const navLinks = [
  { label: "Case Study", href: "#case-study" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Hero ────────────────────────────────────────────────────

export const heroContent = {
  tag: "// PEEK PROJECTS — CHICAGO, IL",
  headline: "I build AI agents that run real businesses.",
  subtitle:
    "Not chatbots. Not demos. Autonomous systems that operate in regulated, high-stakes environments — deployed in production, today.",
  cta: {
    primary: { label: "See the proof →", href: "#case-study" },
    secondary: { label: "Work with me", href: "#contact" },
  },
  stats: [
    { value: "3", label: "Regulated industries (law, finance, compliance)" },
    { value: "24/7", label: "Autonomous production uptime" },
    { value: "8+", label: "Years enterprise engineering" },
    { value: "0", label: "Human intervention required" },
  ],
} as const;

// ─── Case Study (Justice / Wolf Law) ─────────────────────────

export const caseStudy = {
  sectionLabel: "FEATURED DEPLOYMENT",
  badge: "Wronged.ai × Wolf Law, LLC",
  headline:
    "Justice isn't a chatbot. It's the operating core of an entire law firm.",
  body: "Wolf Law needed more than automation — they needed an AI backbone that could handle intake, triage, regulatory compliance, and case routing without adding headcount. We built a system of interconnected agents that now runs the operational core of the firm, from first client call to attorney-ready case package. Justice makes previously uneconomical cases ($12K–$50K in damages) viable by collapsing screening cost toward zero.",
  stats: [
    { value: "27", label: "Illinois employment statutes matched per caller" },
    { value: "Voice", label: "Live phone intake via ElevenLabs + Twilio" },
    { value: "Auto", label: "Case packages routed to attorney network" },
    { value: "IARDC", label: "Four-tier regulatory compliance" },
  ],
  capabilities: [
    {
      title: "Voice Intake & Triage",
      description:
        "Answers Wolf Law's phone line. Conducts warm, structured triage conversations. Extracts case data — employer size, timeline, incident type, documentation status, protected characteristics.",
    },
    {
      title: "Case Intelligence Engine",
      description:
        "Scores economic viability using an investment-banking-style framework. Surfaces relevant case law. Generates attorney-ready packages — statute rankings, arguing points, risk flags, agency self-file options.",
    },
    {
      title: "Attorney Routing Network",
      description:
        "Distributes case packages to subscribed plaintiff attorneys via SMS. Handles accept/decline workflow. Restores enforcement for workers with valid but small cases that firms wouldn't traditionally touch.",
    },
    {
      title: "Autonomous Code Execution",
      description:
        "Spawns Claude Code CLI as a subprocess to build features, manage repos, and generate reports — with phase-gate approvals, persistent memory via Beads, and full Notion progress logging.",
    },
    {
      title: "Executive Assistant",
      description:
        "Both co-founders interact with Justice directly via iMessage for scheduling, Notion updates, email drafting, case queries, pitch deck generation, and task management.",
    },
  ],
  techStack: [
    "TypeScript",
    "Next.js 15",
    "Svelte",
    "Vite",
    "Go",
    "Python",
    "Prisma",
    "PostgreSQL",
    "Redis",
    "Claude API (Anthropic)",
    "OpenAI API",
    "ElevenLabs",
    "Twilio",
    "Vercel AI SDK",
    "LangGraph",
    "pgvector",
    "Cloudflare",
    "Doppler",
    "Docker",
    "Linux / Unix",
    "Notion API",
  ],
} as const;

// ─── Services ────────────────────────────────────────────────

export const services = [
  {
    num: "01",
    title: "AI Agent Deployment",
    description:
      "End-to-end design, build, and deployment of autonomous AI agents that handle real business operations — intake, routing, compliance, outreach, and execution — without human intervention.",
    flagship: true,
  },
  {
    num: "02",
    title: "Voice & Conversational AI",
    description:
      "Production-grade voice systems powered by ElevenLabs and Twilio. Natural-sounding AI that handles phone intake, appointment scheduling, and client communication at scale.",
    flagship: false,
  },
  {
    num: "03",
    title: "Workflow Automation",
    description:
      "Replace fragile Zapier chains with resilient, self-healing automation pipelines. Multi-step workflows that handle exceptions, retry logic, and escalation paths automatically.",
    flagship: false,
  },
  {
    num: "04",
    title: "Data Infrastructure",
    description:
      "PostgreSQL, Redis, and vector database architectures designed for AI workloads. Real-time pipelines that feed your agents the context they need to make decisions.",
    flagship: false,
  },
  {
    num: "05",
    title: "API & Systems Integration",
    description:
      "Connect your existing tools into a unified AI backbone. CRM, legal databases, billing systems, and third-party APIs — wired together with type-safe, monitored integrations.",
    flagship: false,
  },
  {
    num: "06",
    title: "Strategic AI Consulting",
    description:
      "Not sure where to start? I'll audit your operations, identify the highest-ROI automation targets, and build a phased deployment roadmap tailored to your business.",
    flagship: false,
  },
] as const;

// ─── Projects ────────────────────────────────────────────────

export const projects = [
  {
    badge: "BETA",
    badgeColor: "#4af0c0",
    badgeTextColor: "#06060a",
    title: "Flaggd",
    link: { label: "flaggd.app →", href: "https://flaggd.app" },
    description:
      "A privacy-first iOS app that analyzes dating and relationship message threads to surface behavioral patterns and reduce emotional guesswork. Upload screenshots from iMessage, Instagram, or WhatsApp — Flaggd reconstructs the thread, scores behavioral dimensions (Consistency, Respect, Clarity of Intent, Emotional Regulation), assesses manipulation risk, and generates intentional response options.",
    tags: ["SwiftUI", "Claude API", "Vision OCR", "iOS"],
  },
  {
    badge: "IN DEVELOPMENT",
    badgeColor: "#6e6eff",
    badgeTextColor: "#ffffff",
    title: "HLSTC",
    link: null,
    description:
      "AI-powered premium fitness and nutrition app. AI-generated training plans tailored to specific goals, personalized nutrition aligned with training load, grocery list generation, recipe guidance, and 4-week plan generation with modification support. Premium UI/UX.",
    tags: ["SwiftUI", "Core ML", "Claude API", "HealthKit"],
  },
] as const;

// ─── Experience ──────────────────────────────────────────────

export const experience = [
  {
    dates: "2026 — Present",
    role: "Co-Founder & Technical Lead",
    company: "Wronged.ai",
    description:
      "Built Justice — an autonomous AI agent system that runs Wolf Law's full intake operation. Designed the voice AI pipeline, case intelligence engine, attorney routing network, and compliance layer. TypeScript monorepo, production infrastructure, regulatory compliance in a highly regulated legal environment.",
  },
  {
    dates: "2026 — Present",
    role: "Founder",
    company: "Aion Lab",
    description:
      "iOS application studio. Building and shipping AI-powered consumer apps — currently Flaggd (behavioral pattern analysis, in beta) and HLSTC (AI fitness and nutrition). Solo design, development, and App Store delivery.",
  },
  {
    dates: "2019 — 2023",
    role: "Senior Application Architect",
    company: "Bank of America",
    description:
      "Alternative Modeling & Quantitative Services Group. Architected and maintained enterprise data platforms powering quantitative risk analytics. Led cloud data migration programs, optimized ETL pipelines (cut runtime from ~2 weeks to 4 days), built production automation systems, and designed reliability and observability patterns for mission-critical financial data infrastructure.",
  },
  {
    dates: "2024 — 2026",
    role: "Application Specialist, Data Architecture & Governance",
    company: "Ariel Investments",
    description:
      "Data platform engineering and governance for a leading investment management firm. Power BI semantic model architecture, Azure cloud infrastructure, production API development, and enterprise data quality frameworks. Designed automation workflows that reduced manual reporting cycles across the investment research platform.",
  },
] as const;

export const credential = {
  text: "Machine Learning & Data Science — Georgia Institute of Technology",
} as const;

// ─── Contact ─────────────────────────────────────────────────

export const contactInfo = {
  heading: "Build something that runs.",
  subtitle:
    "If your business needs an AI agent deployed in a regulated environment, a production data platform, or a system that operates without you — let's talk.",
  email: "isaiah@peek.consulting",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/ipeek" },
    { label: "GitHub", href: "https://github.com/ipeek-cpu" },
    { label: "X", href: "https://x.com/marshallpeek" },
  ],
} as const;

// ─── Footer ──────────────────────────────────────────────────

export const footerContent = {
  copyright: "© 2025 Peek Projects LLC",
  tagline: "Chicago, IL — Building intelligence that works.",
} as const;
