"use client";

import { useEffect, useRef } from "react";

const TRAIL_COUNT = 6;

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot    = dotRef.current!;
    const ring   = ringRef.current!;
    const trails = trailsRef.current.filter(Boolean) as HTMLDivElement[];

    document.documentElement.classList.add("custom-cursor");

    let mx = -300, my = -300;
    let rx = -300, ry = -300;
    let prevRx = -300, prevRy = -300;

    /* trail positions */
    const tx = Array(TRAIL_COUNT).fill(-300);
    const ty = Array(TRAIL_COUNT).fill(-300);

    /* lerp factors per trail dot — slower = more lag */
    const LERP = [0.26, 0.21, 0.17, 0.14, 0.11, 0.09];

    let shown = false;
    let raf: number;

    const reveal = () => {
      if (shown) return;
      shown = true;
      dot.style.opacity  = "1";
      ring.style.opacity = "1";
    };

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      reveal();
    };

    const over = (e: MouseEvent) => {
      if ((e.target as Element).closest("a,button,[data-hover]")) {
        dot.classList.add("is-hover");
        ring.classList.add("is-hover");
        trails.forEach(t => t.classList.add("is-hover"));
      }
    };
    const out = (e: MouseEvent) => {
      if ((e.target as Element).closest("a,button,[data-hover]")) {
        dot.classList.remove("is-hover");
        ring.classList.remove("is-hover");
        trails.forEach(t => t.classList.remove("is-hover"));
      }
    };

    const down = () => {
      dot.classList.add("is-click");
      ring.classList.add("is-click");
    };
    const up = () => {
      dot.classList.remove("is-click");
      ring.classList.remove("is-click");
    };

    const hide = () => {
      dot.style.opacity  = "0";
      ring.style.opacity = "0";
      trails.forEach(t => { t.style.opacity = "0"; });
    };
    const show = () => {
      dot.style.opacity  = shown ? "1" : "0";
      ring.style.opacity = shown ? "1" : "0";
      trails.forEach((t, i) => {
        t.style.opacity = shown ? String(0.55 - i * 0.08) : "0";
      });
    };

    document.addEventListener("mousemove",  move);
    document.addEventListener("mouseover",  over);
    document.addEventListener("mouseout",   out);
    document.addEventListener("mousedown",  down);
    document.addEventListener("mouseup",    up);
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);

    const tick = () => {
      /* ── dot: snaps instantly ── */
      dot.style.transform = `translate(${mx}px,${my}px)`;

      /* ── ring: lags + velocity stretch ── */
      prevRx = rx; prevRy = ry;
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;

      const vx    = rx - prevRx;
      const vy    = ry - prevRy;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx);
      const sx    = 1 + Math.min(speed * 0.034, 0.45);

      ring.style.transform =
        `translate(${rx}px,${ry}px) rotate(${angle}rad) scaleX(${sx}) rotate(${-angle}rad)`;

      /* ── trail: staggered lerp ── */
      trails.forEach((t, i) => {
        const srcX = i === 0 ? mx : tx[i - 1];
        const srcY = i === 0 ? my : ty[i - 1];
        tx[i] += (srcX - tx[i]) * LERP[i];
        ty[i] += (srcY - ty[i]) * LERP[i];
        t.style.transform = `translate(${tx[i]}px,${ty[i]}px)`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove",  move);
      document.removeEventListener("mouseover",  over);
      document.removeEventListener("mouseout",   out);
      document.removeEventListener("mousedown",  down);
      document.removeEventListener("mouseup",    up);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      document.documentElement.classList.remove("custom-cursor");
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* trail dots — rendered first so they sit below ring+dot */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => {
        const size    = 5 - i * 0.6;
        const half    = size / 2;
        const opacity = 0.55 - i * 0.08;
        return (
          <div
            key={i}
            ref={el => { trailsRef.current[i] = el; }}
            className="cur-trail"
            style={{
              width:      `${size}px`,
              height:     `${size}px`,
              marginTop:  `-${half}px`,
              marginLeft: `-${half}px`,
              opacity,
            }}
            aria-hidden
          />
        );
      })}

      <div ref={ringRef} className="cur-ring" aria-hidden />
      <div ref={dotRef}  className="cur-dot"  aria-hidden />
    </>
  );
}
