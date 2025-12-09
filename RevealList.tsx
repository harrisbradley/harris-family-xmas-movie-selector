import React, { useEffect, useRef, useState } from "react";
import "./reveal.css";

/**
 * Props:
 * - items: string[] (the 3 movie titles)
 * - startImmediately?: boolean (if true, reveal runs on mount)
 * - playJingle?: boolean (if true, plays optional jingle audio; pass false to disable)
 */
export default function RevealList({
  items = [],
  startImmediately = false,
  playJingle = true,
}: {
  items: string[];
  startImmediately?: boolean;
  playJingle?: boolean;
}) {
  const [revealed, setRevealed] = useState<boolean>(startImmediately);
  const [visibleCount, setVisibleCount] = useState<number>(startImmediately ? items.length : 0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // When we start the reveal we stagger the item reveals
  useEffect(() => {
    if (!revealed) return;
    let timers: number[] = [];
    // stagger 3 items with a bit of overlap
    items.slice(0, 3).forEach((_, i) => {
      const t = window.setTimeout(() => {
        setVisibleCount((c) => c + 1);
        // trigger confetti on the last item if available
        if (i === Math.min(2, items.length - 1)) {
          runConfettiBurst();
        }
      }, 600 + i * 300);
      timers.push(t);
    });
    return () => timers.forEach((t) => clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  useEffect(() => {
    if (revealed && playJingle && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked; that's fine.
      });
    }
  }, [revealed, playJingle]);

  function handleReveal() {
    setRevealed(true);
  }

  return (
    <div className="xmas-reveal-root" aria-live="polite">
      {/* Snow layer */}
      <div className="snow-layer" aria-hidden="true" />
      {/* Garland & lights */}
      <div className="garland" aria-hidden="true">
        <div className="garland-string" />
        <div className="light light-1" />
        <div className="light light-2" />
        <div className="light light-3" />
        <div className="light light-4" />
        <div className="star" />
      </div>

      <div className="reveal-container">
        {!revealed ? (
          <button className="reveal-button" onClick={handleReveal} aria-pressed="false">
            Draw the family pick!
          </button>
        ) : null}

        <ul className={`movie-list ${revealed ? "is-revealing" : ""}`} role="list">
          {items.slice(0, 3).map((title, idx) => (
            <li
              key={idx}
              className={`movie-item ${visibleCount > idx ? "visible" : ""}`}
              style={{ "--i": String(idx) } as React.CSSProperties}
              aria-hidden={visibleCount <= idx}
            >
              <div className="movie-card">
                <div className="movie-decor left" aria-hidden="true" />
                <div className="movie-content">
                  <span className="movie-index">{idx + 1}</span>
                  <span className="movie-title">{title}</span>
                </div>
                <div className="movie-decor right" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Optional audio: provide a small jingle file in public/ or project assets */}
      <audio ref={audioRef} src="/xmas-jingle-short.mp3" preload="auto" />
    </div>
  );
}

/* Basic confetti burst implemented using DOM for lightweight effect.
   It creates a handful of small colored pieces and animates them.
   You can replace with a library like canvas-confetti if you prefer.
*/
function runConfettiBurst() {
  const root = document.querySelector(".xmas-reveal-root");
  if (!root) return;
  const confettiCount = 28;
  const colors = ["#D7263D", "#F4C95D", "#2E8B57", "#ffffff", "#8B0000"];
  const wrapper = document.createElement("div");
  wrapper.className = "confetti-wrapper";
  for (let i = 0; i < confettiCount; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.background = colors[i % colors.length];
    piece.style.left = `${50 + (Math.random() - 0.5) * 40}%`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.width = `${6 + Math.random() * 8}px`;
    piece.style.height = `${6 + Math.random() * 12}px`;
    wrapper.appendChild(piece);
  }
  root.appendChild(wrapper);
  // remove after animation (2.5s)
  setTimeout(() => wrapper.remove(), 2600);
}
