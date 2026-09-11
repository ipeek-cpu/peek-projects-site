/**
 * Clients who have been sent an intake link. The slug is the URL:
 * https://peek.consulting/intake/<slug>
 *
 * Add one entry per prospect. Unknown slugs 404, so a link can't be
 * guessed and every tracked event is unambiguously one person's.
 */
export type IntakeClient = {
  slug: string;
  /** Used in the greeting. Omit for a neutral opening. */
  firstName?: string;
  company?: string;
  /** Optional one-liner shown under the heading, e.g. "for the studio relaunch". */
  projectHint?: string;
  /** ISO date of the scheduled call, shown so she knows the deadline. */
  callAt?: string;
};

export const intakeClients: IntakeClient[] = [
  {
    slug: "bayla",
    firstName: "Bayla",
    callAt: "2026-09-14T11:30:00-04:00",
  },
];

export function getIntakeClient(slug: string): IntakeClient | undefined {
  return intakeClients.find((c) => c.slug === slug);
}

/* ---------- Questionnaire ---------- */

export type QuestionType = "text" | "textarea" | "radio" | "checkbox";

export type Question = {
  id: string;
  type: QuestionType;
  label: string;
  help?: string;
  required?: boolean;
  options?: string[];
  /** When set, choosing this option reveals a free-text field. */
  otherOption?: string;
  placeholder?: string;
};

export const intakeQuestions: Question[] = [
  {
    id: "outcome",
    type: "textarea",
    label: "What should this website do for your business over the next 12 months?",
    help: "Leads, sales, bookings, credibility, replacing a manual process. The more concrete, the better I can scope it.",
    required: true,
    placeholder: "e.g. Book 10 consultations a month without me answering DMs.",
  },
  {
    id: "siteType",
    type: "radio",
    label: "Which of these is closest to what you're building?",
    required: true,
    options: [
      "Marketing / brochure site",
      "Online store",
      "Booking or service site",
      "Members-only area or client portal",
      "Web app / software product",
      "Not sure yet",
    ],
  },
  {
    id: "current",
    type: "textarea",
    label: "Do you have a site today? If so, what's the URL and what isn't working about it?",
    placeholder: "URL, and the honest version of what's wrong with it.",
  },
  {
    id: "pages",
    type: "checkbox",
    label: "Which pages or sections do you expect?",
    help: "Best guess is fine.",
    options: [
      "Home",
      "About",
      "Services",
      "Pricing",
      "Portfolio / case studies",
      "Blog / news",
      "FAQ",
      "Contact",
      "Other",
    ],
    otherOption: "Other",
  },
  {
    id: "features",
    type: "checkbox",
    label: "Anything beyond static pages?",
    options: [
      "Contact forms",
      "Online booking / scheduling",
      "Payments / checkout",
      "Customer accounts / login",
      "Edit content yourself (CMS)",
      "Email newsletter signup",
      "Chat or AI assistant",
      "Site search",
      "Multiple languages",
    ],
  },
  {
    id: "content",
    type: "radio",
    label: "Where's the content?",
    required: true,
    options: [
      "Copy, images, and logo are ready",
      "Some ready, some still to write",
      "I need help writing the copy",
      "Starting from zero — name, brand, and logo too",
    ],
  },
  {
    id: "integrations",
    type: "textarea",
    label: "Tools the site has to talk to",
    help: "CRM, calendar, payment processor, email platform, inventory, anything else.",
    placeholder: "e.g. HubSpot, Calendly, Stripe, Mailchimp",
  },
  {
    id: "timeline",
    type: "radio",
    label: "When does it need to be live?",
    required: true,
    options: [
      "Within a month",
      "1–2 months",
      "3+ months",
      "There's a fixed date",
    ],
    otherOption: "There's a fixed date",
  },
  {
    id: "budget",
    type: "radio",
    label: "Budget range you have in mind",
    help: "This sets the shape of what I propose, not the price. A range is enough.",
    required: true,
    options: [
      "Under $5k",
      "$5k – $15k",
      "$15k – $40k",
      "$40k+",
      "Not sure yet — help me calibrate",
    ],
  },
  {
    id: "decision",
    type: "textarea",
    label: "Who else is involved in the decision, and is there anything I should know before we talk?",
    placeholder: "Partners, a designer you already work with, deadlines, dealbreakers.",
  },
];
