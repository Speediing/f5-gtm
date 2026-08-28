import type { Artifact, DemoMessage, SlideCard } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { CLIPS } from "@/data/clips";
import { ACME_TAIL_SLIDES } from "@/data/jobs";
import { HeardSlide } from "./HeardSlide";

function asSlides(artifact?: Artifact) {
  return artifact?.kind === "slides" ? artifact : null;
}
function asTable(artifact?: Artifact) {
  return artifact?.kind === "table" ? artifact : null;
}
function asGmail(artifact?: Artifact) {
  return artifact?.kind === "gmail" ? artifact : null;
}
function asSlack(artifact?: Artifact) {
  return artifact?.kind === "slack" ? artifact : null;
}
function asOnePager(artifact?: Artifact) {
  return artifact?.kind === "one-pager" ? artifact : null;
}
function asForecast(artifact?: Artifact) {
  return artifact?.kind === "forecast" ? artifact : null;
}
function asTalks(artifact?: Artifact) {
  return artifact?.kind === "talk-tracks" ? artifact : null;
}
function asGaps(artifact?: Artifact) {
  return artifact?.kind === "gaps" ? artifact : null;
}
function asPacket(artifact?: Artifact) {
  return artifact?.kind === "packet" ? artifact : null;
}
function asLinkedin(artifact?: Artifact) {
  return artifact?.kind === "linkedin" ? artifact : null;
}
function asOutbound(artifact?: Artifact) {
  return artifact?.kind === "outbound" ? artifact : null;
}

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  if (beat.site === "clip" && beat.clip) {
    const clip = CLIPS[beat.clip];
    return (
      <div className="site-clip">
        <video
          src={clip.file}
          controls
          playsInline
          controlsList="nodownload"
          aria-label={clip.title}
        />
      </div>
    );
  }

  switch (beat.site) {
    case "granola":
      return <GranolaScreen />;
    case "figma":
      return <FigmaScreen account={account} artifact={artifact} />;
    case "gong":
      return <GongScreen account={account} />;
    case "sfdc-account":
      return <SfdcAccountScreen account={account} />;
    case "sfdc-opp":
      return (
        <SfdcOppScreen
          account={account}
          highlight={Boolean(asGaps(artifact))}
        />
      );
    case "sheets":
      return <SheetsScreen account={account} artifact={artifact} />;
    case "gmail":
      return (
        <GmailScreen account={account} artifact={asGmail(artifact)} sent={sent} />
      );
    case "linkedin":
      return (
        <LinkedInScreen
          account={account}
          artifact={asLinkedin(artifact)}
          sent={sent}
        />
      );
    case "research":
      return <ResearchScreen account={account} />;
    case "page":
      return (
        <PageScreen
          account={account}
          onePager={asOnePager(artifact)}
          outbound={asOutbound(artifact)}
        />
      );
    case "slack":
      return (
        <SlackScreen account={account} artifact={asSlack(artifact)} sent={sent} />
      );
    case "gdoc":
      return (
        <GdocScreen
          account={account}
          onePager={asOnePager(artifact)}
          forecast={asForecast(artifact)}
          talks={asTalks(artifact)}
          packet={asPacket(artifact)}
        />
      );
    default:
      return <GranolaScreen />;
  }
}

function GranolaScreen() {
  return (
    <div className="site site-granola">
      <header>
        <strong>Granola</strong>
        <span>Live · last 20 min</span>
      </header>
      <p className="site-time">Still on the call · Granola in</p>
      <ul>
        <li>
          <span>14:12</span> Current application workflow is under review.
        </li>
        <li>
          <span>14:18</span> Application, security, and platform owners are in
          the room.
        </li>
        <li>
          <span>14:21</span> Map the existing F5 environment before proposing a
          change.
        </li>
        <li>
          <span>14:24</span> Keep the next step to one workflow and one owner.
        </li>
        <li>
          <span>14:28</span> Open questions need approved source material.
        </li>
      </ul>
    </div>
  );
}

function FigmaScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Artifact;
}) {
  const slides = asSlides(artifact);
  const packet = artifact?.kind === "packet" ? artifact : null;
  const pager = asOnePager(artifact);
  const cards: SlideCard[] = slides?.cards ?? ACME_TAIL_SLIDES;

  return (
    <div className="site site-figma">
      <header>
        <span className="figma-logo">F</span>
        <strong>
          {slides
            ? slides.title
            : pager
              ? `${account} one-pager`
              : packet
                ? `${account} inside note`
                : `${account} North Star`}
        </strong>
        <em>Draft</em>
      </header>
      <div className="figma-board">
        {packet ? (
          <div className="figma-doc">
            {packet.fields.map((field) => (
              <p key={field.label}>
                <b>{field.label}</b>
                {field.value}
              </p>
            ))}
          </div>
        ) : pager ? (
          <div className="figma-doc">
            {pager.sections.map((section) => (
              <p key={section.heading}>
                <b>{section.heading}</b>
                {section.body}
              </p>
            ))}
          </div>
        ) : (
          <HeardSlide slides={cards} size="sm" />
        )}
      </div>
    </div>
  );
}

function GongScreen({ account }: { account: string }) {
  return (
    <div className="site site-gong">
      <header>
        <strong>Gong</strong>
        <span>
          {account} · customer meeting
        </span>
      </header>
      <div className="gong-recap">
        <h4>Call recap</h4>
        <ul>
          <li>Current application workflow reviewed</li>
          <li>Security and platform owners involved</li>
          <li>Existing F5 environment needs mapping</li>
          <li>Open questions need sourced answers</li>
        </ul>
      </div>
    </div>
  );
}

function SfdcAccountScreen({ account }: { account: string }) {
  return (
    <div className="site site-sfdc">
      <header>
        <span className="sfdc-cloud" />
        <strong>Sales</strong>
        <em>Lightning</em>
      </header>
      <div className="sfdc-title">
        <p>Account</p>
        <h3>{account}</h3>
      </div>
      <dl className="sfdc-fields">
        <div>
          <dt>Current focus</dt>
          <dd>Application workflow</dd>
        </div>
        <div>
          <dt>Application owner</dt>
          <dd>Needs confirmation</dd>
        </div>
        <div>
          <dt>Security owner</dt>
          <dd>Part of the review</dd>
        </div>
        <div>
          <dt>Next step</dt>
          <dd>Map the current environment</dd>
        </div>
      </dl>
      <table className="sfdc-related">
        <caption>Workflow review</caption>
        <thead>
          <tr>
            <th>Workstream</th>
            <th>Owner</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Application path</td>
            <td>Platform owner</td>
            <td>Map current state</td>
          </tr>
          <tr>
            <td>Security review</td>
            <td>Security lead</td>
            <td>Open questions</td>
          </tr>
          <tr>
            <td>Source material</td>
            <td>Account team</td>
            <td>Collect approved docs</td>
          </tr>
          <tr>
            <td>Follow-up</td>
            <td>Seller</td>
            <td>Draft for review</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function SfdcOppScreen({
  account,
  highlight,
}: {
  account: string;
  highlight: boolean;
}) {
  return (
    <div className="site site-sfdc">
      <header>
        <span className="sfdc-cloud" />
        <strong>Sales</strong>
        <em>Lightning</em>
      </header>
      <div className="sfdc-title">
        <p>Opportunity</p>
        <h3>{account} · workflow review</h3>
      </div>
      <dl className="sfdc-fields">
        <div>
          <dt>Status</dt>
          <dd>Discovery in progress</dd>
        </div>
        <div className={highlight ? "gap" : undefined}>
          <dt>Application owner</dt>
          <dd>Needs confirmation</dd>
        </div>
        <div className={highlight ? "gap" : undefined}>
          <dt>Security review</dt>
          <dd>Open questions</dd>
        </div>
        <div className={highlight ? "gap" : undefined}>
          <dt>Current contact</dt>
          <dd>Account map incomplete</dd>
        </div>
        <div className={highlight ? "gap" : undefined}>
          <dt>Next action</dt>
          <dd>Prepare sourced follow-up</dd>
        </div>
      </dl>
    </div>
  );
}

function SheetsScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Artifact;
}) {
  const table = asTable(artifact);
  const rows = table
    ? table.rows
    : [
        [account, "Current contact", "App owner", "Public update", "Review"],
        ["Account 02", "New contact", "Security owner", "Open role", "Research"],
        ["Account 03", "Current contact", "Platform owner", "Company news", "Draft"],
        ["Account 04", "New contact", "App owner", "Technical post", "Research"],
        ["Account 05", "Current contact", "Owner unknown", "Account note", "Review"],
      ];
  const cols = table
    ? table.columns
    : ["Account", "Contact", "Possible owner", "Signal", "Next"];

  return (
    <div className="site site-sheets">
      <header>
        <span className="sheets-mark">Sheets</span>
        <strong>
          {table ? `${account} account review` : "Target account review"}
        </strong>
      </header>
      <table>
        <thead>
          <tr>
            {cols.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GmailScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asGmail>;
  sent: boolean;
}) {
  return (
    <div className="site site-gmail">
      <header>
        <strong>Gmail</strong>
        <em>{sent ? "Sent" : "Draft · not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} contact`}
      </p>
      <p>
        <span>Subject</span>
        {artifact?.subject || `${account} / F5`}
      </p>
      <div>{artifact?.body || "Draft parked here until you tap Send?"}</div>
    </div>
  );
}

function SlackScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asSlack>;
  sent: boolean;
}) {
  return (
    <div className="site site-slack">
      <header>
        <h4>{artifact?.channel || "#gtm-field"}</h4>
        <em>{sent ? "Sent" : "Draft · not sent"}</em>
      </header>
      <div className="slack-draft">
        {artifact?.body ||
          `Friday pack for ${account}. Draft only. Nothing posted.`}
      </div>
    </div>
  );
}

function GdocScreen({
  account,
  onePager,
  forecast,
  talks,
  packet,
}: {
  account: string;
  onePager: ReturnType<typeof asOnePager>;
  forecast: ReturnType<typeof asForecast>;
  talks: ReturnType<typeof asTalks>;
  packet: ReturnType<typeof asPacket>;
}) {
  return (
    <div className="site site-gdoc">
      <header>
        <strong>Docs</strong>
        <span>
          {forecast
            ? `${account} forecast`
            : talks
              ? "Customer workflow talk tracks"
              : packet
                ? packet.title
                : onePager?.title || `${account} brief`}
        </span>
      </header>
      <article>
        {forecast ? (
          <>
            <p className="gdoc-status">{forecast.status}</p>
            <p>{forecast.body}</p>
          </>
        ) : talks ? (
          talks.tracks.map((track) => (
            <p key={track.seat}>
              <b>{track.seat}.</b> {track.line}
            </p>
          ))
        ) : packet ? (
          packet.fields.map((field) => (
            <p key={field.label}>
              <b>{field.label}.</b> {field.value}
            </p>
          ))
        ) : onePager ? (
          onePager.sections.map((section) => (
            <p key={section.heading}>
              <b>{section.heading}.</b> {section.body}
            </p>
          ))
        ) : (
          <p>Working note for {account}.</p>
        )}
      </article>
    </div>
  );
}

function ResearchScreen({ account }: { account: string }) {
  return (
    <div className="site site-research">
      <header>
        <strong>{account}.com</strong>
        <span>Public sources</span>
      </header>
      <p className="site-time">Researching the account, not running a sequence</p>
      <ul>
        <li>
          <span>Company</span> A public technical update may affect an
          application workflow.
        </li>
        <li>
          <span>Careers</span> An open role may point to the team that owns the
          work.
        </li>
        <li>
          <span>Account</span> Check recent conversations before writing.
        </li>
        <li>
          <span>Owner</span> Confirm who runs the affected workflow.
        </li>
      </ul>
    </div>
  );
}

function LinkedInScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asLinkedin>;
  sent: boolean;
}) {
  return (
    <div className="site site-linkedin">
      <header>
        <strong>LinkedIn</strong>
        <em>{sent ? "Sent" : "Draft · not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} application lead`}
        {artifact?.role ? ` · ${artifact.role}` : ""}
      </p>
      <div>{artifact?.body || "InMail parked here until you tap Send."}</div>
    </div>
  );
}

function PageScreen({
  account,
  onePager,
  outbound,
}: {
  account: string;
  onePager: ReturnType<typeof asOnePager>;
  outbound: ReturnType<typeof asOutbound>;
}) {
  const headline =
    outbound?.page.headline || onePager?.title || `For ${account}`;
  const body =
    outbound?.page.body ||
    onePager?.sections.map((section) => section.body).join(" ") ||
    `A page for ${account}. Draft only.`;

  return (
    <div className="site site-page">
      <header>
        <strong>Page</strong>
        <em>Not live</em>
      </header>
      <h4>{headline}</h4>
      {onePager ? (
        onePager.sections.map((section) => (
          <p key={section.heading}>
            <b>{section.heading}.</b> {section.body}
          </p>
        ))
      ) : (
        <p>{body}</p>
      )}
    </div>
  );
}
