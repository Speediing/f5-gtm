export function BrandLockup({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
  invert?: boolean;
}) {
  return (
    <div className={`brand-lockup brand-lockup-${size}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://www.f5.com/content/dam/f5-com/global-assets/images/f5-logo.svg"
        alt="F5"
        className="brand-f5"
      />
      <span className="brand-times" aria-hidden>
        ×
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/spacexai.svg" alt="SpaceXAI" className="brand-sxai" />
    </div>
  );
}
