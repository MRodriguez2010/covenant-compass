# Covenant Compass demo

A private, Sites-backed product demo for a facilitator-guided, faith-based
marital assessment workflow.

The current milestone is intentionally non-clinical and contains only:

- synthetic couple data;
- original illustrative questions;
- deterministic scoring fixtures;
- browser-local interaction state;
- simulated facilitator, spouse, staged-release, and safety-pathway views.

It does not collect or persist assessment submissions, call an AI model, provide
therapy, diagnose a condition, or connect to crisis services.

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
deployments.
