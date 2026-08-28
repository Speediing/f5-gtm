import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "rep",
    name: "Every sales rep",
    blurb: "The human stays in control. Their agents keep the surrounding work moving.",
    color: "#E8E8ED",
    mark: "AE",
    seat: true,
  },
  {
    id: "inbox",
    name: "Agent 01",
    blurb: "Watches for customer questions and prepares sourced answers.",
    jobId: "legal-redlines",
    color: "#E4002B",
  },
  {
    id: "cross-sell",
    name: "Agent 02",
    blurb: "Checks target accounts and prepares researched drafts for review.",
    jobId: "attach-engine",
    color: "#B00020",
  },
];
