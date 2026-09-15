import { useEffect, useRef, useState } from "react";

// Lightweight fade/slide-in-on-scroll using IntersectionObserver — no extra library needed.
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export function revealStyle(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity .7s cubic-bezier(.2,.8,.2,1) ${delay}ms, transform .7s cubic-bezier(.2,.8,.2,1) ${delay}ms`,
    willChange: visible ? "auto" : "transform, opacity",
  };
}

// Same as revealStyle but for staggered lists — pass the item's index and
// it computes a capped, natural-feeling delay (capped so long lists don't
// take forever to finish animating in).
export function staggerStyle(visible, index = 0, step = 70, max = 500) {
  return revealStyle(visible, Math.min(index * step, max));
}
