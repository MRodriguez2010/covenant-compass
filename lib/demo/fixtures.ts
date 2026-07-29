import { ORIGINAL_DEMO_PROVENANCE } from "./manifest";
import type {
  DemoAction,
  DemoCaseFixture,
  DemoQuestion,
} from "./types";

export const assessmentQuestions: DemoQuestion[] = [
  {
    id: "original-repair-01",
    version: "demo-items-1.0",
    eyebrow: "Repair after conflict",
    prompt: "In this fictional example, how easy is it to reconnect after a disagreement cools down?",
    options: [
      "Very difficult",
      "Somewhat difficult",
      "Usually possible",
      "Very easy",
    ],
    domain: "repair",
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
  {
    id: "original-trust-01",
    version: "demo-items-1.0",
    eyebrow: "Financial conversations",
    prompt: "In this fictional example, how safe does it feel to talk openly about money?",
    options: ["Not safe", "A little safe", "Mostly safe", "Very safe"],
    domain: "trust",
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
  {
    id: "original-meaning-01",
    version: "demo-items-1.0",
    eyebrow: "Shared meaning",
    prompt: "This fictional couple has a clear sense of what they want their marriage to stand for.",
    options: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
    domain: "sharedMeaning",
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
];

export const growthFixture: DemoCaseFixture = {
  id: "CC-1042",
  fixtureVersion: "rivera-growth-1.0",
  scoringVersion: "demo-rules-1.0",
  fictional: true,
  scenario: "growth",
  coupleLabel: "Alex & Jordan Rivera",
  marriageYears: 12,
  childrenAtHome: 2,
  faithLayer: "Core Christian",
  language: "English",
  presentingConcern:
    "“Every money conversation turns into the same argument, so now we avoid it.”",
  domains: [
    { id: "connection", label: "Connection", alex: 68, jordan: 73, tone: "sage" },
    {
      id: "repair",
      label: "Repair after conflict",
      alex: 38,
      jordan: 44,
      tone: "coral",
    },
    {
      id: "trust",
      label: "Trust & reliability",
      alex: 51,
      jordan: 67,
      tone: "gold",
    },
    {
      id: "sharedMeaning",
      label: "Shared meaning",
      alex: 82,
      jordan: 79,
      tone: "sage",
    },
  ],
  evidence: [
    { id: "E-REPAIR-A", label: "Alex fixture: repair indicator 38" },
    { id: "E-REPAIR-J", label: "Jordan fixture: repair indicator 44" },
    {
      id: "E-REPAIR-S",
      label: "Synthetic fixture phrase: “we leave it unresolved”",
    },
    { id: "E-TRUST-GAP", label: "16-point trust perception gap" },
    {
      id: "E-COMMIT",
      label: "Synthetic responses agree on commitment",
    },
    {
      id: "E-MEANING-A",
      label: "Alex fixture: shared meaning indicator 82",
    },
    {
      id: "E-MEANING-J",
      label: "Jordan fixture: shared meaning indicator 79",
    },
    {
      id: "E-GOAL",
      label: "Both fictional respondents selected repair as the goal",
    },
  ],
};

export const safetyFixture: DemoCaseFixture = {
  ...growthFixture,
  id: "CC-SAFE-01",
  fixtureVersion: "rivera-safety-1.0",
  scenario: "safety",
};

export const actionItems: DemoAction[] = [
  {
    id: "pause-return",
    week: "Week 1",
    title: "Pause-and-return agreement",
    purpose: "Practice returning to one conversation after tension lowers.",
    detail: "Choose a phrase, a 20-minute reset, and an exact time to return.",
    cadence: "Use during conflict",
    owner: "Together",
    stopCondition:
      "Stop if the exercise increases fear, coercion, retaliation, or instability.",
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
  {
    id: "money-story",
    week: "Week 2",
    title: "Money story reflection",
    purpose: "Replace assumptions with curiosity about learned money patterns.",
    detail:
      "Share one fictional early memory that could shape how each person approaches money.",
    cadence: "25-minute preview",
    owner: "Individual + together",
    stopCondition:
      "Pause if either person does not freely consent to continuing the conversation.",
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
  {
    id: "check-in",
    week: "Weeks 3–4",
    title: "Weekly connection check-in",
    purpose: "Demonstrate a small, observable follow-up practice.",
    detail:
      "Using the fictional case, name one appreciation, one pressure, and one request.",
    cadence: "Sunday evening",
    owner: "Together",
    stopCondition:
      "Stop and seek qualified support if the practice becomes unsafe or destabilizing.",
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
];
