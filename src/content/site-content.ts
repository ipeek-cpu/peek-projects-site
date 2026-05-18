export const hero = {
  h1: "I take systems from working-in-demo to running-in-production.",
  subhead:
    "Senior engineering for founders and teams who need their next product, system, or AI build to actually work — and last.",
  primaryCta: {
    label: "Book a discovery call",
    href: "#book",
  },
};

export const bringIt = {
  body: "Any technological need — bring it. We'll figure out together if it's a fit. If it's not, I'll tell you, and I won't do the work.",
};

export type CaseStudy = {
  id: string;
  client: string;
  url?: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "wolf-tri",
    client: "Wolf Transactional Risk Insurance",
    url: "https://wolfTRI.com",
    problem:
      "A regulated transactional risk insurance practice needed a single owned system — not a stack of disconnected vendor tools — and AI that could actually carry weight on the team.",
    approach:
      "Built the entire production infrastructure end-to-end. A custom CRM purpose-fit to the workflow. A SOC 2 compliant Azure foundation hosting email, CRM, and web. And a fully conversational AI agent that operates as a real team member — handling intake, scheduling, CRM updates, meeting notes, and outbound calls across iMessage, Telegram, and voice.",
    outcome:
      "The team ships product changes weekly instead of monthly. Replaced their vendor stack with one owned system. Cut costs.",
    stack: [
      "Azure",
      "SOC 2 compliant infrastructure",
      "Custom agent framework",
      "iMessage",
      "Telegram",
      "ElevenLabs (conversational voice)",
    ],
  },
];

export const principles = [
  {
    title: "Scope first, always.",
    body: "No surprises in pricing or timeline. I'd rather lose a deal than mis-scope it.",
  },
  {
    title: "Production-grade from day one.",
    body: "Code written like it's already running in front of real users — because eventually it is.",
  },
  {
    title: "Boring tech where boring works.",
    body: "Judgment over novelty. The stack should serve the outcome, not the résumé.",
  },
];

export const about = {
  body: "I take on engagements I can deliver on without compromising the things that matter more — faith, family, and my word. That shows up as honest scope, honest pricing, and honest answers when something isn't the right fit, including yours.",
};

export const booking = {
  heading: "Book a discovery call",
  description:
    "30-minute call. Best fit if you're a founder or team with a real engineering problem to solve — a product to build, an MVP to harden, an AI agent to deploy, or a tangle of systems to replace with something owned. Free.",
  calendlyUrl: "https://calendly.com/isaiah-peek/30min",
};

export const nav = {
  brand: "peek.consulting",
  links: [
    { label: "Work", href: "#work" },
    { label: "How I work", href: "#how" },
    { label: "About", href: "#about" },
  ],
  cta: { label: "Book a call", href: "#book" },
};
