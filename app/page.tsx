"use client";

import { useMemo, useState } from "react";

type Role = "pastor" | "alex" | "jordan";
type Scenario = "growth" | "safety";
type PastorView = "overview" | "findings" | "debrief" | "plan";

const roleLabels: Record<Role, string> = {
  pastor: "Pastor Frank",
  alex: "Alex Rivera",
  jordan: "Jordan Rivera",
};

const pastorNavigation: Array<{
  id: PastorView;
  number: string;
  label: string;
}> = [
  { id: "overview", number: "01", label: "Case overview" },
  { id: "findings", number: "02", label: "Findings" },
  { id: "debrief", number: "03", label: "Debrief guide" },
  { id: "plan", number: "04", label: "Action plan" },
];

const scoreRows = [
  { label: "Connection", alex: 68, jordan: 73, tone: "sage" },
  { label: "Repair after conflict", alex: 38, jordan: 44, tone: "coral" },
  { label: "Trust & reliability", alex: 51, jordan: 67, tone: "gold" },
  { label: "Shared meaning", alex: 82, jordan: 79, tone: "sage" },
];

const assessmentQuestions = [
  {
    eyebrow: "Repair after conflict",
    prompt: "When a disagreement cools down, how easy is it to reconnect?",
    options: ["Very difficult", "Somewhat difficult", "Usually possible", "Very easy"],
  },
  {
    eyebrow: "Financial conversations",
    prompt: "How safe does it feel to talk openly about money with your spouse?",
    options: ["Not safe", "A little safe", "Mostly safe", "Very safe"],
  },
  {
    eyebrow: "Shared meaning",
    prompt: "We have a clear sense of what we want our marriage to stand for.",
    options: ["Strongly disagree", "Disagree", "Agree", "Strongly agree"],
  },
];

const actionItems = [
  {
    id: "pause-return",
    week: "Week 1",
    title: "Pause-and-return agreement",
    detail: "Choose a phrase, a 20-minute reset, and an exact time to return.",
    cadence: "Use during conflict",
    owner: "Together",
  },
  {
    id: "money-story",
    week: "Week 2",
    title: "Money story reflection",
    detail: "Share one early memory that shaped how each of you approaches money.",
    cadence: "25 minutes",
    owner: "Individual + together",
  },
  {
    id: "check-in",
    week: "Weeks 3–4",
    title: "Weekly connection check-in",
    detail: "Name one appreciation, one pressure, and one request for the week.",
    cadence: "Sunday evening",
    owner: "Together",
  },
];

function Brand() {
  return (
    <div className="brand">
      <div className="brand-monogram" aria-hidden="true">
        CC
      </div>
      <div>
        <p className="brand-name">Covenant Compass</p>
        <p className="brand-tagline">Pastoral decision support</p>
      </div>
    </div>
  );
}

function DemoNotice() {
  return (
    <div className="demo-notice" role="note">
      <span className="demo-dot" aria-hidden="true" />
      <span>
        <strong>Illustrative demo.</strong> Synthetic people, original sample
        questions, deterministic results, and no stored responses.
      </span>
    </div>
  );
}

function RoleSwitcher({
  role,
  onChange,
}: {
  role: Role;
  onChange: (next: Role) => void;
}) {
  return (
    <div className="role-switcher" aria-label="Preview role">
      {(Object.keys(roleLabels) as Role[]).map((item) => (
        <button
          className={role === item ? "role-button active" : "role-button"}
          key={item}
          onClick={() => onChange(item)}
          type="button"
          aria-pressed={role === item}
        >
          <span>{item === "pastor" ? "Facilitator" : "Spouse"}</span>
          {roleLabels[item]}
        </button>
      ))}
    </div>
  );
}

function ScenarioControl({
  scenario,
  onChange,
}: {
  scenario: Scenario;
  onChange: (next: Scenario) => void;
}) {
  return (
    <label className="scenario-control">
      <span>Demo pathway</span>
      <select
        value={scenario}
        onChange={(event) => onChange(event.target.value as Scenario)}
      >
        <option value="growth">Growth pathway</option>
        <option value="safety">Safety pathway</option>
      </select>
    </label>
  );
}

function AppHeader({
  role,
  scenario,
  onRoleChange,
  onScenarioChange,
}: {
  role: Role;
  scenario: Scenario;
  onRoleChange: (next: Role) => void;
  onScenarioChange: (next: Scenario) => void;
}) {
  return (
    <header className="topbar">
      <div className="mobile-brand">
        <Brand />
      </div>
      <div className="topbar-title">
        <p className="eyebrow">Synthetic case CC–1042</p>
        <p>Alex &amp; Jordan Rivera · Married 12 years</p>
      </div>
      <div className="topbar-controls">
        <ScenarioControl scenario={scenario} onChange={onScenarioChange} />
        <RoleSwitcher role={role} onChange={onRoleChange} />
      </div>
    </header>
  );
}

function Sidebar({
  activeView,
  onViewChange,
}: {
  activeView: PastorView;
  onViewChange: (next: PastorView) => void;
}) {
  return (
    <aside className="sidebar">
      <Brand />
      <div className="sidebar-case">
        <p className="eyebrow">Active case</p>
        <h2>Rivera marriage</h2>
        <p>Pastoral intake · Both complete</p>
      </div>
      <nav className="side-nav" aria-label="Pastor workspace">
        {pastorNavigation.map((item) => (
          <button
            key={item.id}
            type="button"
            className={activeView === item.id ? "nav-item active" : "nav-item"}
            onClick={() => onViewChange(item.id)}
            aria-current={activeView === item.id ? "page" : undefined}
          >
            <span>{item.number}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p className="eyebrow">Signed in as</p>
        <div className="avatar-row">
          <span className="avatar">FC</span>
          <span>
            <strong>Frank Chavira</strong>
            <small>Pastor facilitator</small>
          </span>
        </div>
      </div>
    </aside>
  );
}

function ScoreBar({
  value,
  tone,
  name,
}: {
  value: number;
  tone: string;
  name: string;
}) {
  return (
    <div className="score-person">
      <div className="score-person-label">
        <span>{name}</span>
        <strong>{value}</strong>
      </div>
      <div
        className="score-track"
        role="meter"
        aria-label={`${name} score ${value} out of 100`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <span
          className={`score-fill ${tone}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function RelationshipMap() {
  return (
    <section className="card relationship-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Relationship map</p>
          <h2>Two perspectives, held side by side</h2>
        </div>
        <span className="status-badge neutral">Provisional scores</span>
      </div>
      <div className="score-table">
        {scoreRows.map((row) => (
          <div className="score-row" key={row.label}>
            <div className="score-label">{row.label}</div>
            <ScoreBar
              value={row.alex}
              tone={row.tone}
              name="Alex"
            />
            <ScoreBar
              value={row.jordan}
              tone={row.tone}
              name="Jordan"
            />
          </div>
        ))}
      </div>
      <p className="card-footnote">
        Scores illustrate a deterministic demo fixture. They are not validated
        norms or a measure of marital success.
      </p>
    </section>
  );
}

function PatternCard({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <section className="card pattern-card">
      <div className="finding-number">01</div>
      <div className="finding-copy">
        <div className="finding-meta">
          <span className="status-badge priority">Explore first</span>
          <span className="confidence">3 supporting signals</span>
        </div>
        <p className="eyebrow">Possible interaction pattern</p>
        <h2>A pursue–withdraw cycle may sit beneath the money conflict.</h2>
        <p className="lede">
          Both partners describe finances as the presenting issue. Their answers
          point more strongly to difficulty returning to the conversation once
          tension rises.
        </p>
        <div className="evidence-list">
          <span>16-point trust perception gap</span>
          <span>Low repair confidence for both</span>
          <span>Open text references “shutting down”</span>
        </div>
        <div className="pattern-boundary">
          <strong>Working hypothesis—not a diagnosis.</strong>
          Confirm or reject this pattern through conversation before selecting
          any exercise.
        </div>
        <button className="primary-button" type="button" onClick={onContinue}>
          Review supporting findings
        </button>
      </div>
    </section>
  );
}

function ReleaseCard({
  released,
  onRelease,
}: {
  released: boolean;
  onRelease: () => void;
}) {
  return (
    <section className="card release-card">
      <div className="release-top">
        <p className="eyebrow">Couple visibility</p>
        <span className={released ? "status-badge ready" : "status-badge neutral"}>
          {released ? "Released" : "Pastor review"}
        </span>
      </div>
      <h3>{released ? "Shared summary is available" : "Detailed report is private"}</h3>
      <p>
        {released
          ? "Alex and Jordan can now see the agreed pattern, strengths, and four-week plan."
          : "Neither spouse can see private answers, excerpts, unconfirmed hypotheses, or facilitator notes."}
      </p>
      <div className="release-preview">
        <div>
          <span>Shared strength</span>
          <strong>Shared meaning</strong>
        </div>
        <div>
          <span>Growth focus</span>
          <strong>Repair after conflict</strong>
        </div>
      </div>
      {!released && (
        <button className="secondary-button" type="button" onClick={onRelease}>
          Preview staged release
        </button>
      )}
    </section>
  );
}

function PastorOverview({
  released,
  onRelease,
  onViewChange,
}: {
  released: boolean;
  onRelease: () => void;
  onViewChange: (next: PastorView) => void;
}) {
  return (
    <>
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Pastor workspace</p>
          <h1>Find the pattern beneath the conflict.</h1>
          <p>
            Begin with two private perspectives. Move toward one carefully
            reviewed conversation.
          </p>
        </div>
        <div className="case-status">
          <span className="case-status-number">2/2</span>
          <div>
            <strong>Assessments complete</strong>
            <p>Report generated from deterministic fixtures</p>
          </div>
        </div>
      </section>
      <DemoNotice />
      <div className="overview-grid">
        <div className="overview-main">
          <RelationshipMap />
          <PatternCard onContinue={() => onViewChange("findings")} />
        </div>
        <aside className="overview-aside">
          <section className="card profile-card">
            <p className="eyebrow">Presenting concern</p>
            <blockquote>
              “Every money conversation turns into the same argument, so now we
              avoid it.”
            </blockquote>
            <dl>
              <div>
                <dt>Marriage</dt>
                <dd>12 years</dd>
              </div>
              <div>
                <dt>Children</dt>
                <dd>2 at home</dd>
              </div>
              <div>
                <dt>Faith layer</dt>
                <dd>Core Christian</dd>
              </div>
              <div>
                <dt>Language</dt>
                <dd>English</dd>
              </div>
            </dl>
          </section>
          <ReleaseCard released={released} onRelease={onRelease} />
          <section className="principle-card">
            <p className="eyebrow">Facilitator principle</p>
            <p>
              The report should open a door for a better question—not close the
              case with a label.
            </p>
          </section>
        </aside>
      </div>
    </>
  );
}

function FindingsView({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const findings = [
    {
      number: "01",
      status: "Explore first",
      title: "Repair attempts are not landing",
      summary:
        "Both partners report difficulty reconnecting after conflict, even when one of them tries.",
      evidence: [
        "Alex: repair score 38",
        "Jordan: repair score 44",
        "Shared phrase: “we leave it unresolved”",
      ],
      question:
        "When one of you tries to restart the conversation, what tells the other person it is safe to return?",
    },
    {
      number: "02",
      status: "Explore next",
      title: "Trust is experienced differently",
      summary:
        "The partners agree on commitment but differ in how predictable and emotionally reliable the relationship feels.",
      evidence: [
        "16-point perception gap",
        "Agreement on commitment",
        "No safety indicator in growth pathway",
      ],
      question:
        "What does reliability look like in a small, observable action this week?",
    },
    {
      number: "03",
      status: "Protect this strength",
      title: "Shared meaning remains strong",
      summary:
        "Both partners describe a shared faith, investment in family, and a desire to repair the marriage.",
      evidence: [
        "Alex: shared meaning 82",
        "Jordan: shared meaning 79",
        "Both chose repair as the goal",
      ],
      question:
        "Which shared value can guide the way you approach the money conversation?",
    },
  ];

  return (
    <section className="workspace-section">
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Evidence review</p>
          <h1>Hold the findings lightly.</h1>
          <p>
            Each pattern is traceable to synthetic evidence and remains
            provisional until the couple confirms it.
          </p>
        </div>
        <button className="primary-button" type="button" onClick={onContinue}>
          Prepare the debrief
        </button>
      </div>
      <DemoNotice />
      <div className="findings-list">
        {findings.map((finding) => (
          <article className="finding-card" key={finding.number}>
            <div className="finding-index">{finding.number}</div>
            <div className="finding-body">
              <div className="finding-meta">
                <span
                  className={
                    finding.number === "01"
                      ? "status-badge priority"
                      : "status-badge neutral"
                  }
                >
                  {finding.status}
                </span>
                <span className="confidence">Possible pattern</span>
              </div>
              <h2>{finding.title}</h2>
              <p>{finding.summary}</p>
              <div className="evidence-list">
                {finding.evidence.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="question-card">
              <p className="eyebrow">Ask, don’t assume</p>
              <p>{finding.question}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DebriefView({
  released,
  onRelease,
  onContinue,
}: {
  released: boolean;
  onRelease: () => void;
  onContinue: () => void;
}) {
  const agenda = [
    {
      time: "05 min",
      title: "Set the room",
      detail: "Restate privacy boundaries and invite correction.",
    },
    {
      time: "10 min",
      title: "Begin with strength",
      detail: "Name shared meaning and the mutual desire to repair.",
    },
    {
      time: "20 min",
      title: "Test one pattern",
      detail: "Map the pursue–withdraw cycle without assigning blame.",
    },
    {
      time: "10 min",
      title: "Choose one next step",
      detail: "Agree on a pause-and-return practice and follow-up date.",
    },
  ];

  return (
    <section className="workspace-section">
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Facilitated debrief</p>
          <h1>Turn analysis into a safe conversation.</h1>
          <p>
            The pastor confirms the pattern with the couple before releasing
            language or exercises.
          </p>
        </div>
        <button className="primary-button" type="button" onClick={onContinue}>
          Build four-week plan
        </button>
      </div>
      <DemoNotice />
      <div className="debrief-grid">
        <section className="card agenda-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">45-minute session</p>
              <h2>Conversation guide</h2>
            </div>
            <span className="status-badge neutral">Pastor only</span>
          </div>
          <div className="agenda-list">
            {agenda.map((item, index) => (
              <div className="agenda-item" key={item.title}>
                <div className="agenda-line">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <small>{item.time}</small>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="debrief-side">
          <section className="card language-card">
            <p className="eyebrow">Suggested language</p>
            <blockquote>
              “This does not tell us why you do what you do. It gives us a
              pattern to test together. Tell me where it fits—and where it
              doesn’t.”
            </blockquote>
          </section>
          <ReleaseCard released={released} onRelease={onRelease} />
        </div>
      </div>
    </section>
  );
}

function PlanView({
  released,
  onRelease,
  completedActions,
  onToggleAction,
}: {
  released: boolean;
  onRelease: () => void;
  completedActions: string[];
  onToggleAction: (id: string) => void;
}) {
  return (
    <section className="workspace-section">
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Four-week pathway</p>
          <h1>Small practices. Clear ownership.</h1>
          <p>
            Every action names a purpose, cadence, owner, and stop condition.
            Completion changes only in this browser preview.
          </p>
        </div>
        <button className="primary-button" type="button" onClick={onRelease}>
          {released ? "Summary released" : "Release couple summary"}
        </button>
      </div>
      <DemoNotice />
      <div className="plan-layout">
        <div className="action-list">
          {actionItems.map((action) => {
            const checked = completedActions.includes(action.id);
            return (
              <article
                className={checked ? "action-card completed" : "action-card"}
                key={action.id}
              >
                <button
                  className="action-check"
                  type="button"
                  aria-pressed={checked}
                  onClick={() => onToggleAction(action.id)}
                >
                  {checked ? "Done" : "Mark done"}
                </button>
                <div className="action-week">{action.week}</div>
                <div className="action-copy">
                  <h2>{action.title}</h2>
                  <p>{action.detail}</p>
                  <div className="action-meta">
                    <span>{action.cadence}</span>
                    <span>{action.owner}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <aside className="card followup-card">
          <p className="eyebrow">Follow-up</p>
          <div className="followup-date">
            <span>28</span>
            <div>
              <strong>August</strong>
              <small>6:30 PM</small>
            </div>
          </div>
          <h3>Pastoral check-in</h3>
          <p>
            Review what was practiced, what felt safe, and whether a licensed
            referral would better serve the couple.
          </p>
          <div className="boundary-note">
            Stop any exercise that increases fear, coercion, retaliation, or
            emotional instability.
          </div>
        </aside>
      </div>
    </section>
  );
}

function SafetyPastorView() {
  return (
    <section className="workspace-section safety-workspace">
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Safety pathway</p>
          <h1>Pause the joint pathway.</h1>
          <p>
            A private response requires human follow-up before any couple
            debrief, shared summary, or relationship exercise.
          </p>
        </div>
        <span className="status-badge safety">Joint work paused</span>
      </div>
      <DemoNotice />
      <section className="safety-banner" role="alert">
        <div className="safety-code">S1</div>
        <div>
          <p className="eyebrow">Minimum necessary alert</p>
          <h2>Private safety review required</h2>
          <p>
            This demo intentionally withholds the spouse, exact answer, and
            supporting text. Follow the organization’s approved protocol and
            consult a qualified professional.
          </p>
        </div>
      </section>
      <div className="safety-grid">
        <section className="card protocol-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Facilitator protocol preview</p>
              <h2>Protect privacy before interpretation</h2>
            </div>
            <span className="status-badge neutral">Pastor only</span>
          </div>
          <ol>
            <li>
              <span>01</span>
              Do not confront the other spouse or reveal that a safety answer
              triggered the pause.
            </li>
            <li>
              <span>02</span>
              Contact the respondent privately using the consented safe method.
            </li>
            <li>
              <span>03</span>
              Follow the reviewed escalation and referral protocol for the
              respondent’s location.
            </li>
            <li>
              <span>04</span>
              Resume joint work only when an authorized human determines it is
              appropriate.
            </li>
          </ol>
        </section>
        <section className="card suppressed-card">
          <p className="eyebrow">Automatically suppressed</p>
          <h3>No pattern report is available</h3>
          <ul>
            <li>Couple summary and score comparison</li>
            <li>Joint communication exercises</li>
            <li>Partner notifications</li>
            <li>Automated advice or interpretation</li>
          </ul>
          <p className="card-footnote">
            A licensed safety advisor must author the real protocol before any
            live pilot.
          </p>
        </section>
      </div>
    </section>
  );
}

function CoupleSummary({ released }: { released: boolean }) {
  if (!released) {
    return (
      <section className="completion-card">
        <div className="completion-mark">Complete</div>
        <p className="eyebrow">Your part is finished</p>
        <h1>Thank you for sharing your perspective.</h1>
        <p>
          Pastor Frank is reviewing a couple-level report. Your spouse cannot
          see your individual answers or written responses.
        </p>
        <div className="waiting-state">
          <span />
          Shared summary awaiting facilitator review
        </div>
      </section>
    );
  }

  return (
    <section className="couple-summary">
      <div className="summary-hero">
        <p className="eyebrow">Shared summary</p>
        <h1>You agree on what matters. The next step is learning how to return.</h1>
        <p>
          This language was reviewed and released by Pastor Frank. It contains
          no private responses or unconfirmed findings.
        </p>
      </div>
      <div className="shared-insights">
        <article>
          <span>Shared strength</span>
          <h2>Meaning &amp; commitment</h2>
          <p>
            You both describe faith, family, and repairing the relationship as
            important.
          </p>
        </article>
        <article>
          <span>Growth focus</span>
          <h2>Returning after tension</h2>
          <p>
            Money conversations often stop before either person feels heard.
          </p>
        </article>
      </div>
      <div className="next-practice">
        <p className="eyebrow">This week’s shared practice</p>
        <h2>Build a pause-and-return agreement</h2>
        <p>
          Choose a phrase that pauses the conversation, take 20 minutes, and
          name the exact time you will return.
        </p>
        <div className="action-meta">
          <span>Owner: Together</span>
          <span>Use during conflict</span>
        </div>
      </div>
    </section>
  );
}

function SafetyCoupleView({ role }: { role: Role }) {
  if (role === "jordan") {
    return (
      <section className="completion-card">
        <div className="completion-mark">Complete</div>
        <p className="eyebrow">Your part is finished</p>
        <h1>Your responses remain private.</h1>
        <p>
          The next step is under facilitator review. This screen does not reveal
          another person’s completion details, answers, or pathway.
        </p>
        <div className="waiting-state">
          <span />
          Awaiting private facilitator review
        </div>
      </section>
    );
  }

  return (
    <section className="private-safety-card" role="alert">
      <div className="private-label">Private to you</div>
      <p className="eyebrow">Your safety comes first</p>
      <h1>You do not need to continue the couple assessment right now.</h1>
      <p>
        In a live product, this space would show region-appropriate, expert
        reviewed options and a safe way to request human follow-up. Your spouse
        would not receive this answer or be told what triggered the pause.
      </p>
      <div className="private-actions">
        <button className="light-button" type="button">
          Preview private follow-up
        </button>
        <button className="text-button light" type="button">
          Leave this screen
        </button>
      </div>
      <small>
        Demonstration only. No crisis service is connected and no request is
        sent.
      </small>
    </section>
  );
}

function CoupleAssessment({
  role,
  step,
  selected,
  onSelect,
  onContinue,
}: {
  role: "alex" | "jordan";
  step: number;
  selected: number | null;
  onSelect: (index: number) => void;
  onContinue: () => void;
}) {
  const question = assessmentQuestions[step];
  const progress = Math.round(((step + 1) / assessmentQuestions.length) * 100);

  return (
    <section className="assessment-shell">
      <div className="assessment-intro">
        <p className="eyebrow">Private perspective · {roleLabels[role]}</p>
        <h1>There is room for both stories here.</h1>
        <p>
          Answer from your own experience. Your spouse will not see your
          selections or written responses.
        </p>
        <div className="privacy-points">
          <span>Separate account</span>
          <span>Private responses</span>
          <span>Pastor-reviewed release</span>
        </div>
      </div>
      <div className="question-card-large">
        <div className="question-progress">
          <span>
            Preview question {step + 1} of {assessmentQuestions.length}
          </span>
          <strong>{progress}%</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Demo assessment progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="eyebrow">{question.eyebrow}</p>
        <h2>{question.prompt}</h2>
        <div className="answer-options" role="group" aria-label={question.prompt}>
          {question.options.map((option, index) => (
            <button
              type="button"
              className={selected === index ? "answer-option selected" : "answer-option"}
              key={option}
              onClick={() => onSelect(index)}
              aria-pressed={selected === index}
            >
              <span>{index + 1}</span>
              {option}
            </button>
          ))}
        </div>
        <div className="question-footer">
          <p>Selection stays only in this browser preview.</p>
          <button
            className="primary-button"
            type="button"
            onClick={onContinue}
            disabled={selected === null}
          >
            {step === assessmentQuestions.length - 1
              ? "Complete preview"
              : "Continue preview"}
          </button>
        </div>
      </div>
    </section>
  );
}

function CoupleWorkspace({
  role,
  scenario,
  released,
  partnerSteps,
  selectedAnswers,
  onSelect,
  onContinue,
}: {
  role: "alex" | "jordan";
  scenario: Scenario;
  released: boolean;
  partnerSteps: Record<"alex" | "jordan", number>;
  selectedAnswers: Record<"alex" | "jordan", number | null>;
  onSelect: (index: number) => void;
  onContinue: () => void;
}) {
  if (scenario === "safety") {
    return (
      <div className="couple-page">
        <DemoNotice />
        <SafetyCoupleView role={role} />
      </div>
    );
  }

  if (partnerSteps[role] >= assessmentQuestions.length) {
    return (
      <div className="couple-page">
        <DemoNotice />
        <CoupleSummary released={released} />
      </div>
    );
  }

  return (
    <div className="couple-page">
      <DemoNotice />
      <CoupleAssessment
        role={role}
        step={partnerSteps[role]}
        selected={selectedAnswers[role]}
        onSelect={onSelect}
        onContinue={onContinue}
      />
    </div>
  );
}

export default function Home() {
  const [role, setRole] = useState<Role>("pastor");
  const [scenario, setScenario] = useState<Scenario>("growth");
  const [pastorView, setPastorView] = useState<PastorView>("overview");
  const [released, setReleased] = useState(false);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [partnerSteps, setPartnerSteps] = useState({
    alex: 0,
    jordan: assessmentQuestions.length - 1,
  });
  const [selectedAnswers, setSelectedAnswers] = useState<{
    alex: number | null;
    jordan: number | null;
  }>({ alex: null, jordan: null });

  const roleName = useMemo(() => roleLabels[role], [role]);

  function handleScenarioChange(next: Scenario) {
    setScenario(next);
    setPastorView("overview");
  }

  function toggleAction(id: string) {
    setCompletedActions((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function continueAssessment(partner: "alex" | "jordan") {
    setPartnerSteps((current) => ({
      ...current,
      [partner]: Math.min(
        current[partner] + 1,
        assessmentQuestions.length,
      ),
    }));
    setSelectedAnswers((current) => ({ ...current, [partner]: null }));
  }

  return (
    <div className={role === "pastor" ? "app-shell pastor-shell" : "app-shell"}>
      {role === "pastor" && (
        <Sidebar activeView={pastorView} onViewChange={setPastorView} />
      )}
      <main className="main-shell">
        <AppHeader
          role={role}
          scenario={scenario}
          onRoleChange={setRole}
          onScenarioChange={handleScenarioChange}
        />
        <div className="page-content">
          <p className="sr-only">Current preview role: {roleName}</p>
          {role === "pastor" ? (
            scenario === "safety" ? (
              <SafetyPastorView />
            ) : pastorView === "overview" ? (
              <PastorOverview
                released={released}
                onRelease={() => setReleased(true)}
                onViewChange={setPastorView}
              />
            ) : pastorView === "findings" ? (
              <FindingsView onContinue={() => setPastorView("debrief")} />
            ) : pastorView === "debrief" ? (
              <DebriefView
                released={released}
                onRelease={() => setReleased(true)}
                onContinue={() => setPastorView("plan")}
              />
            ) : (
              <PlanView
                released={released}
                onRelease={() => setReleased(true)}
                completedActions={completedActions}
                onToggleAction={toggleAction}
              />
            )
          ) : (
            <CoupleWorkspace
              role={role}
              scenario={scenario}
              released={released}
              partnerSteps={partnerSteps}
              selectedAnswers={selectedAnswers}
              onSelect={(index) =>
                setSelectedAnswers((current) => ({
                  ...current,
                  [role]: index,
                }))
              }
              onContinue={() => continueAssessment(role)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
