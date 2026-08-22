# Project Context — Covenant Compass

## At a glance

| Field | Value |
| --- | --- |
| Product | Covenant Compass |
| Repository role | Private secondary source backup |
| Canonical working copy | `/home/ai-agents/Documents/Faith-based-marital-assessment` |
| Current milestone | Synthetic Phase 0–5 product demonstration |
| Runtime | OpenAI Sites / vinext, React, TypeScript |
| Persistence | None for participant responses in this milestone |
| AI integration | Deterministic simulation only; no model call |
| Intended next audience | Facilitators, faith-community program owners, and professional reviewers |

## Purpose

Covenant Compass explores a facilitator-guided marital assessment workflow for
faith-based programs. The current build is deliberately a product and policy
prototype rather than a production assessment service. It demonstrates role
views, consent, staged release, safety language, evidence traceability, action
planning, and privacy-aware cohort summaries using synthetic data.

## What exists now

- a complete interactive synthetic couple journey;
- spouse, facilitator, consent, safety, and action-plan views;
- deterministic, explainable indicators and simulated AI drafting;
- question-level evidence traceability for generated fixtures;
- synthetic seminar-cohort reporting with minimum-size suppression;
- methodology, claims, assumptions, and data/AI disclosures;
- automated production-build and rendered-HTML checks.

The implementation milestone is represented by Git commit `a734225`. The
working tree was clean when this context file was added on 2026-08-22.

Dependency audit note: `npm audit` reported 21 known findings (1 low, 4
moderate, 16 high, 0 critical) on 2026-08-22. The build and tests pass, but these
findings must be triaged and resolved or explicitly mitigated before production
or any public-source release.

## Architecture

- `app/` contains routes and server-rendered product surfaces.
- `components/` contains reusable interface elements.
- `lib/demo/manifest.ts` is the authoritative declaration of the prototype's
  supported claims and boundaries.
- `examples/` and versioned fixtures supply synthetic demonstration data.
- `tests/` verifies rendered output and milestone boundaries.
- `.openai/hosting.json` records Sites project configuration. D1 and R2 remain
  intentionally disconnected for this milestone.

## Data, safety, and AI boundary

This repository must not contain real couple submissions, counseling records,
licensed assessment instruments, credentials, or private stakeholder data. The
prototype does not diagnose, provide therapy, connect users to emergency
services, authenticate previewed roles, or persist interaction state. Its AI
surface is pre-authored and deterministic.

Production use requires separate approval and design for professional review,
licensed content, identity and authorization, consent records, encryption,
retention/deletion, abuse and crisis handling, auditability, and a paid model
API. An OpenAI subscription must never be treated as a production API backend.

## Local operation

Node.js `>=22.13.0` is required.

```bash
npm install
npm run dev
```

Validation:

```bash
npm test
npm run lint
git diff --check
```

## Readiness assessment

- **Private backup:** ready.
- **Portfolio showcase:** near ready as a clearly labeled synthetic concept.
- **Sellable product/SaaS:** promising, but not production-ready; professional,
  legal, privacy, security, identity, and real-data work is still required.
- **Public source:** not the first public-repo candidate because the domain needs
  careful claims and safety governance before broad reuse.

## Repository and publication policy

GitHub is a private secondary source backup. Deployments, databases, secrets,
runtime state, and participant data are backed up separately. Never make this
operational repository public. Any public release must be a clean-room copy with
fresh history, synthetic fixtures, a license review, and an independent secret
and privacy scan.

## Resume checklist

1. Read `README.md` and `lib/demo/manifest.ts` before changing claims.
2. Confirm `git status` and the active Sites project before editing or hosting.
3. Run the full validation commands above.
4. Keep Phase 0–5 disconnected boundaries unless a later milestone is explicitly
   authorized.
5. Record any new persistence, identity, AI, or licensed-content dependency in
   this file and in the user-facing disclosure routes.
