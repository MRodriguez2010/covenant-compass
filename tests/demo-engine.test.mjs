import assert from "node:assert/strict";
import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

import { build } from "esbuild";

const projectRoot = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
);
const bundlePath = path.join(
  tmpdir(),
  `covenant-compass-engine-${process.pid}-${Date.now()}.mjs`,
);

await build({
  bundle: true,
  format: "esm",
  platform: "node",
  stdin: {
    contents: `
      export * from ${JSON.stringify(path.join(projectRoot, "lib/demo/engine.ts"))};
      export * from ${JSON.stringify(path.join(projectRoot, "lib/demo/fixtures.ts"))};
      export * from ${JSON.stringify(path.join(projectRoot, "lib/demo/providers.ts"))};
    `,
    loader: "ts",
    resolveDir: projectRoot,
  },
  outfile: bundlePath,
});

const demo = await import(`${pathToFileURL(bundlePath).href}?v=${Date.now()}`);

test.after(async () => {
  await rm(bundlePath, { force: true });
});

test("deterministic engine produces repeatable evidence-linked findings", () => {
  const first = demo.deriveDemoResult(demo.growthFixture);
  const second = demo.deriveDemoResult(demo.growthFixture);
  assert.deepEqual(first, second);
  assert.equal(first.generatedBy, "deterministic-rules-v1");
  assert.equal(first.safetySuppressed, false);
  assert.equal(first.releaseEligible, true);
  assert.equal("overallScore" in first, false);

  const knownEvidence = new Set(
    demo.growthFixture.evidence.map((item) => item.id),
  );
  for (const finding of first.findings) {
    assert.ok(finding.evidenceIds.length > 0);
    for (const id of finding.evidenceIds) {
      assert.ok(knownEvidence.has(id), `Unknown evidence reference ${id}`);
    }
  }
});

test("safety fixture deterministically suppresses reports and AI drafts", () => {
  const result = demo.deriveDemoResult(demo.safetyFixture);
  assert.equal(result.safetySuppressed, true);
  assert.equal(result.releaseEligible, false);
  assert.deepEqual(result.scores, []);
  assert.deepEqual(result.findings, []);
  assert.equal(demo.buildSimulatedAIDraft(result), null);
});

test("simulated AI draft is local, repeatable, and human-review shaped", () => {
  const result = demo.deriveDemoResult(demo.growthFixture);
  const first = demo.buildSimulatedAIDraft(result);
  const second = demo.buildSimulatedAIDraft(result);

  assert.deepEqual(first, second);
  assert.equal(first.modelCalled, false);
  assert.equal(first.generatedBy, "deterministic-template-v1");
  assert.ok(first.themes.every((theme) => theme.evidenceIds.length > 0));
  assert.doesNotMatch(
    first.themes.map((theme) => theme.hypothesis).join(" "),
    /\bdiagnos(?:e|is)|root cause|predicts? divorce\b/i,
  );
});

test("all provider boundaries are disconnected and paid integrations are empty", () => {
  assert.deepEqual(demo.paidRuntimeIntegrations, []);
  for (const provider of Object.values(demo.demoProviderBoundaries)) {
    assert.equal(provider.connected, false);
  }
});
