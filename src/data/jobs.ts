import type { Artifact, CroJob, SlideCard } from "./types";

export const ACME_TAIL_SLIDES: SlideCard[] = [
  {
    n: 4,
    kicker: "Customer context",
    voice: "them",
    title: "The workflow",
    body: "Keep the application path clear, secure, and easy for the team to explain.",
  },
  {
    n: 5,
    kicker: "Mapped for review",
    voice: "us",
    title: "Where F5 fits",
    body: "Map the current F5 environment to the workflow under review.",
  },
  {
    n: 6,
    kicker: "Review point",
    voice: "them",
    title: "The owners",
    body: "Keep the application, security, and platform owners in the next step.",
  },
  {
    n: 7,
    kicker: "Next meeting",
    voice: "us",
    title: "A focused follow-up",
    body: "Confirm the workflow, its owner, and the questions that still need an answer.",
  },
];

const ACME_QUESTIONS: Extract<Artifact, { kind: "redlines" }> = {
  kind: "redlines",
  title: "Acme customer questions",
  paperTitle: "What needs an answer",
  from: "Customer team, received this morning",
  marks: [
    {
      text: "How would this fit the tools we already use?",
      note: "Start with one workflow around the current setup. No replacement plan is required.",
      take: true,
    },
    {
      text: "Who reviews the work before anything moves?",
      note: "The team sets the approval point. The draft stays put until the owner reviews it.",
      take: true,
    },
    {
      text: "Can we see where the answer came from?",
      note: "Keep the approved source links attached to the draft.",
      take: true,
    },
    {
      text: "What should the first test cover?",
      note: "Choose one trigger, the sources the agent can use, and the artifact the team wants back.",
      take: false,
    },
  ],
  reply: {
    to: "Acme customer team",
    subject: "Answers and a proposed first workflow",
    body: "Hi team,\n\nWe mapped a first workflow around the tools already in place. Your team keeps the review point. The agent handles the research and draft work, with the approved sources attached.\n\nFor a first test, we would agree on one trigger and one finished artifact. Nothing moves until the owner reviews it.\n\nBest,",
  },
};

const ACME_OUTBOUND: Extract<Artifact, { kind: "outbound" }> = {
  kind: "outbound",
  title: "Acme account research",
  account: "Acme",
  hypothesis: [
    {
      k: "Why F5",
      body: "Connect the public signal to an application delivery or security workflow that F5 can help the team review.",
    },
    {
      k: "Why now",
      body: "A public technical change gives the account team a useful reason to check in.",
    },
    {
      k: "Who may care",
      body: "Find the person who owns the affected application or security workflow.",
    },
  ],
  evidence: [
    {
      source: "Company update",
      finding:
        "A technical initiative is public. Verify the scope before using it in outreach.",
    },
    {
      source: "Careers page",
      finding:
        "An open technical role points to a team that may own the work.",
    },
    {
      source: "Existing account context",
      finding:
        "Check recent conversations before writing the first draft.",
    },
  ],
  targets: [
    {
      name: "Customer contact",
      role: "Application platform lead",
      why: "May own the workflow affected by the public technical change.",
    },
    {
      name: "Security contact",
      role: "Security lead",
      why: "Can check whether the proposed workflow fits the current review process.",
    },
  ],
  page: {
    headline: "A short account brief for Acme",
    body: "Connect the public signal to the current account context. Keep the first note useful, specific, and ready for the seller to review.",
  },
};

export const JOBS: CroJob[] = [
  {
    id: "standardize-room",
    number: 1,
    title: "Update the deck before the next call",
    trigger: "A customer call starts",
    backgroundAction: "Listening to the call + updating a working copy",
    problem:
      "A generic follow-up deck makes the seller repeat the same work after every call. The useful version carries the customer context into the next conversation.",
    botJob:
      "Grok Bot follows the connected meeting notes, updates a working copy, and brings the finished slides back for review.",
    storyboard: [
      {
        when: "Call starts",
        label: "The meeting begins. Grok Bot starts with it.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Customer workflow review",
          people: [
            { initials: "YOU", name: "You" },
            { initials: "CT", name: "Customer team" },
            { initials: "TT", name: "Technical team" },
          ],
        },
      },
      {
        when: "During the call",
        label: "The current workflow and open questions are added to the deck.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "Customer context",
          headline: "The application workflow under review",
          product: "Map the current F5 environment",
          status: "Working copy updated",
        },
      },
      {
        when: "Before the follow-up",
        label: "The account team opens the updated slides.",
        scene: "deck",
        slides: ACME_TAIL_SLIDES,
      },
    ],
    unlock:
      "The call context and the next step stay together in a deck the seller can review.",
    outcome:
      "One customer call becomes an updated deck for the next conversation.",
    clips: ["03-slides-granola"],
    demo: {
      title: "Customer workflow",
      subtitle: "Meeting context to updated slides",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "agent-01",
          name: "Agent 01",
          role: "bot",
          persona: "Reads the meeting notes and keeps the customer context together",
          color: "#E4002B",
        },
        {
          id: "agent-02",
          name: "Agent 02",
          role: "bot",
          persona: "Updates the working deck and prepares it for review",
          color: "#B00020",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "agent-01",
          kind: "routine",
          body: "Customer call started. I am following the connected notes and watching for the current workflow, owners, and open questions.",
        },
        {
          id: "m2",
          from: "agent-01",
          kind: "text",
          body: "The team is reviewing the handoff between application, security, and platform owners. I am adding those topics to the working deck.",
        },
        {
          id: "m3",
          from: "agent-02",
          kind: "draft",
          draftLabel: "Updated slides",
          artifact: {
            kind: "slides",
            title: "Customer workflow review",
            cards: ACME_TAIL_SLIDES,
          },
        },
        {
          id: "m4",
          from: "agent-02",
          kind: "draft",
          draftLabel: "One-page follow-up",
          artifact: {
            kind: "one-pager",
            title: "Acme workflow follow-up",
            eyebrow: "Draft for review",
            sections: [
              {
                heading: "Workflow",
                body: "Map the current application path and the owners involved in each handoff.",
              },
              {
                heading: "F5 context",
                body: "Show where the current F5 environment fits without asking the team to replace its existing tools.",
              },
              {
                heading: "Next step",
                body: "Confirm one workflow, one owner, and the questions that need a sourced answer.",
              },
            ],
          },
        },
        {
          id: "m5",
          from: "agent-01",
          kind: "system",
          body: "Nothing sent. The deck and one-pager stay in review.",
        },
      ],
    },
  },
  {
    id: "legal-redlines",
    number: 2,
    title: "Find product and internal answers fast",
    trigger: "A customer question lands",
    backgroundAction: "Checking product knowledge + approved internal context",
    problem:
      "A customer question can send the seller across product docs and internal threads. The customer waits while the account team looks for the current answer.",
    botJob:
      "Grok Bot watches for the question, checks approved sources, and prepares one reply with the source material attached.",
    storyboard: [
      {
        when: "Question arrives",
        label: "The customer asks how the workflow fits the current toolset.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Customer team",
          subject: "Question about the proposed workflow",
          questions: 4,
        },
      },
      {
        when: "Research in progress",
        label: "Agents check the approved sources in parallel.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Product docs", answer: "Current guidance found" },
            { name: "Internal notes", answer: "Review path checked" },
            { name: "Account context", answer: "Existing tools confirmed" },
          ],
          status: "Sources checked",
        },
      },
      {
        when: "Ready for review",
        label: "A sourced reply is waiting. Nothing has been sent.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Customer team",
          subject: "Answers and a proposed first workflow",
          status: "Ready to review",
        },
      },
      {
        when: "Seller review",
        label: "The final artifact is the answer package.",
        scene: "send",
        artifact: ACME_QUESTIONS,
      },
    ],
    unlock:
      "The seller gets a clear draft with its sources, not another list of places to search.",
    outcome:
      "Grok Bot checks the product and internal context, then prepares the answer for review.",
    clips: ["01-morning-inbox"],
    demo: {
      title: "Customer question",
      subtitle: "Approved sources to a reply draft",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "agent-03",
          name: "Agent 03",
          role: "bot",
          persona: "Checks approved sources and prepares a reply",
          color: "#E4002B",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "agent-03",
          kind: "routine",
          body: "New customer question detected. I am checking product documentation, approved internal notes, and the current account context.",
        },
        {
          id: "m2",
          from: "agent-03",
          kind: "text",
          body: "The source material is checked. I prepared a plain answer that fits the tools already in place.",
        },
        {
          id: "m3",
          from: "agent-03",
          kind: "draft",
          draftLabel: "Questions and answers",
          artifact: ACME_QUESTIONS,
        },
        {
          id: "m4",
          from: "agent-03",
          kind: "draft",
          draftLabel: "Email reply",
          artifact: {
            kind: "gmail",
            title: "Reply to customer team",
            to: ACME_QUESTIONS.reply.to,
            subject: ACME_QUESTIONS.reply.subject,
            body: ACME_QUESTIONS.reply.body,
          },
        },
        {
          id: "m5",
          from: "agent-03",
          kind: "system",
          body: "Nothing sent. The reply stays a draft until you approve it.",
        },
      ],
    },
  },
  {
    id: "attach-engine",
    number: 3,
    title: "Build a useful account list",
    trigger: "A target account enters the list",
    backgroundAction: "Checking public signals + preparing researched drafts",
    problem:
      "A name on a target list is not a reason to write. The seller still needs a useful signal, the account context, and a clear reason for the customer to care.",
    botJob:
      "Grok Bot checks public sources and the connected account context, then prepares a short account brief and outreach draft.",
    storyboard: [
      {
        when: "Account added",
        label: "Acme enters the target list. Research starts.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Acme",
          sources: ["Company updates", "Careers", "Account context"],
          signal: "Public technical change",
        },
      },
      {
        when: "Research complete",
        label: "The source material becomes a simple account hypothesis.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Why F5", answer: "Relevant workflow" },
            { label: "Why now", answer: "Public technical change" },
            { label: "Who may care", answer: "Workflow owner" },
          ],
        },
      },
      {
        when: "Draft ready",
        label: "The account team gets a brief and a draft to review.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "Customer contact",
          channels: ["Account brief", "Email", "Customer page"],
          status: "Drafts ready, nothing sent",
        },
      },
      {
        when: "Seller review",
        label: "The last frame is the finished account package.",
        scene: "send",
        artifact: ACME_OUTBOUND,
      },
    ],
    unlock:
      "The seller gets the signal, source, account hypothesis, and a draft in one review queue.",
    outcome:
      "One target account becomes a sourced brief and a useful first draft.",
    clips: ["02-prospecting-pg"],
    demo: {
      title: "Account research",
      subtitle: "Public signal to a review package",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "agent-04",
          name: "Agent 04",
          role: "bot",
          persona: "Checks the account and prepares a sourced brief",
          color: "#E4002B",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "agent-04",
          kind: "routine",
          body: "Acme entered the target list. I am checking public company updates, open roles, and the connected account context.",
        },
        {
          id: "m2",
          from: "agent-04",
          kind: "text",
          body: "I found a public technical change. I am checking whether it maps to an application delivery or security workflow before I draft anything.",
        },
        {
          id: "m3",
          from: "agent-04",
          kind: "draft",
          draftLabel: "Account hypothesis",
          artifact: {
            kind: "packet",
            title: "Acme account hypothesis",
            fields: ACME_OUTBOUND.hypothesis.map((item) => ({
              label: item.k,
              value: item.body,
            })),
          },
        },
        {
          id: "m4",
          from: "agent-04",
          kind: "draft",
          draftLabel: "Evidence and owners",
          artifact: {
            kind: "packet",
            title: "Sources and possible owners",
            fields: [
              ...ACME_OUTBOUND.evidence.map((item) => ({
                label: item.source,
                value: item.finding,
              })),
              ...ACME_OUTBOUND.targets.map((person) => ({
                label: `${person.name}, ${person.role}`,
                value: person.why,
              })),
            ],
          },
        },
        {
          id: "m5",
          from: "agent-04",
          kind: "draft",
          draftLabel: "Email draft",
          artifact: {
            kind: "gmail",
            title: "Email to customer contact",
            to: "Customer contact",
            subject: "A short note on Acme's application workflow",
            body: "Hi there,\n\nI saw the public technical update and put together a short note on the application workflow around it. I checked the current account context first so this would be useful, not a generic product message.\n\nIf the workflow is relevant, we can compare notes with the right owner.\n\nBest,",
          },
        },
        {
          id: "m6",
          from: "agent-04",
          kind: "draft",
          draftLabel: "Customer page",
          artifact: {
            kind: "one-pager",
            title: ACME_OUTBOUND.page.headline,
            eyebrow: "Draft account brief",
            sections: [
              {
                heading: "Public signal",
                body: ACME_OUTBOUND.evidence[0].finding,
              },
              {
                heading: "Possible owner",
                body: ACME_OUTBOUND.targets[0].why,
              },
              {
                heading: "F5 context",
                body: ACME_OUTBOUND.page.body,
              },
            ],
          },
        },
        {
          id: "m7",
          from: "agent-04",
          kind: "system",
          body: "Nothing sent. The brief, email, and page stay in review.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
