export type HeroJobIcon =
  | "outbound"
  | "research"
  | "follow-up"
  | "deal-desk"
  | "pipeline"
  | "renewal"
  | "competitive"
  | "chief-of-staff";

export type HeroJob = {
  name: string;
  icon: HeroJobIcon;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS: HeroJob[] = [
  {
    name: "Sales Outbound",
    icon: "outbound",
    account: "Example account",
    signal: "Public application platform update",
    work: "I checked the public update and current account context, then drafted a note around the application workflow that may have changed.",
    result: "Sourced email draft ready",
    user: "keep this in review",
    bot: "saved. nothing has been sent.",
  },
  {
    name: "Account Research",
    icon: "research",
    account: "Target account",
    signal: "New application delivery initiative",
    work: "I mapped the public initiative, reviewed the connected account history, and found the people who may own the workflow.",
    result: "Account brief and sources ready",
    user: "brief me before the call",
    bot: "ready. the sources are attached.",
  },
  {
    name: "Call Follow-up",
    icon: "follow-up",
    account: "Customer workflow review",
    signal: "Customer call ended",
    work: "I organized the application, security, and platform questions, updated the working deck, and drafted the recap.",
    result: "Deck and follow-up draft ready",
    user: "keep both in review",
    bot: "done. both are ready when you are.",
  },
  {
    name: "Deal Desk",
    icon: "deal-desk",
    account: "Customer technical review",
    signal: "Technical questionnaire received",
    work: "I checked approved F5 product guidance and internal notes, then prepared a response with the source material attached.",
    result: "Sourced response draft ready",
    user: "route the open items for review",
    bot: "routed. the rest stays in draft.",
  },
  {
    name: "Pipeline Health",
    icon: "pipeline",
    account: "F5 field pipeline",
    signal: "Opportunities need a clear next step",
    work: "I reviewed the connected account activity and prepared the open question, owner, and next action for each account team.",
    result: "Account follow-up queue ready",
    user: "share with the account owners",
    bot: "shared. each owner has a review draft.",
  },
  {
    name: "Renewal Risk",
    icon: "renewal",
    account: "Installed-base account",
    signal: "Account activity changed",
    work: "I checked the current account context and prepared the questions the seller should bring to the next customer review.",
    result: "Customer review brief ready",
    user: "send this to the account team",
    bot: "shared. i will keep the brief current.",
  },
  {
    name: "Competitive Intel",
    icon: "competitive",
    account: "Customer call",
    signal: "A competitor came up in the conversation",
    work: "I matched the customer concern to approved F5 guidance and prepared a sourced talk track for the next conversation.",
    result: "Competitive talk track ready",
    user: "add it to the call brief",
    bot: "added. the sources are linked.",
  },
  {
    name: "Sales Chief of Staff",
    icon: "chief-of-staff",
    account: "Field operating review",
    signal: "Open decisions need owners",
    work: "I gathered account changes, follow-up commitments, and open questions across the connected tools, then prepared the decisions for review.",
    result: "Field leadership brief ready",
    user: "share it with the leadership team",
    bot: "shared. the review tracker is ready.",
  },
];
