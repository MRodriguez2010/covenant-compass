# Covenant Compass prototype

A private, Sites-backed product demo for a facilitator-guided, faith-based
marital workflow.

## Phase 0–5 milestone

The current milestone intentionally requires no paid runtime integration beyond
the existing development and Sites access. It contains only:

- versioned synthetic couple fixtures;
- original, unlicensed illustrative questions;
- transparent deterministic rules and indicators;
- browser-memory interaction state that clears on refresh;
- simulated facilitator, spouse, consent, staged-release, safety, and action-plan
  views;
- a deterministic simulated-AI draft with mandatory review controls;
- methodology, assumptions, claims, data, and AI disclosure pages.

It does not collect or persist assessment submissions, call an AI model, provide
therapy, diagnose a condition, authenticate the previewed roles, or connect to
crisis services, email, SMS, analytics, payments, databases, or file storage.
The role switch previews future access boundaries; it does not enforce them.

The public-facing prototype language must remain consistent with
`lib/demo/manifest.ts`. Licensed instruments, professional review, production
identity, persistent storage, real submissions, and model APIs are deferred
until a separately approved post-Phase-5 milestone.

## Demo routes

- `/` — interactive synthetic role and workflow preview;
- `/methodology` — assumptions, limitations, paid gates, and claims register;
- `/data-and-ai` — temporary data lifecycle and disconnected-provider status.

## Local preview

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

The local server prints the preview URL. Changes under `app/` update through the
development server.

## Validation

```bash
npm run build
node --test tests/rendered-html.test.mjs
```

The project uses the bundled vinext/Sites runtime. `.openai/hosting.json`
identifies the Sites project used for saved milestone versions and private
deployments. Its D1 and R2 bindings intentionally remain `null` through Phase 5.
