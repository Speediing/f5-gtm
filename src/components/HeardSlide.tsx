import type { SlideCard } from "@/data/types";

export function HeardSlide({
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  return (
    <div className={`leave leave-heard size-${size}`}>
      <article className="heard-slide">
        <header className="heard-bar">
          <span>F5 customer workflow</span>
          <span>Draft for review</span>
        </header>
        <div className="heard-main">
          <h3>Updated customer deck</h3>
          <ol>
            {slides.slice(0, 2).map((slide) => (
              <li key={slide.n}>
                <p className="heard-quote">
                  <strong>{slide.title}.</strong> {slide.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <div className="heard-map">
          <ul>
            {slides.slice(2).map((slide) => (
              <li key={slide.n}>
                <strong>{slide.title}.</strong> {slide.body}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
