import React from "react";
import { Play, ArrowRight } from "lucide-react";
import { C, heading } from "../theme";
import { useReveal, revealStyle } from "../hooks/useReveal";

export default function Hero({ onBook }) {
  const [ref, visible] = useReveal();

  return (
    <section id="home" style={{
      position: "relative", minHeight: "92vh", display: "flex", alignItems: "center",
      background: `linear-gradient(120deg, rgba(13,18,16,0.94), rgba(13,18,16,0.75)), url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop') center/cover`,
      paddingTop: 90,
    }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%", ...revealStyle(visible) }}>
        <div style={{ color: C.green, fontSize: 13, fontWeight: 700, letterSpacing: 3, marginBottom: 18 }}>
          FITNESS / HEALTH / LIFESTYLE
        </div>
        <h1 style={{
          ...heading, fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 800, color: C.text,
          lineHeight: 1.05, margin: 0, maxWidth: 720,
        }}>
          BUILD A STRONGER <span style={{ color: C.green }}>YOU</span>
        </h1>
        <p style={{ color: C.muted, fontSize: 17, maxWidth: 480, marginTop: 22, lineHeight: 1.6 }}>
          Join IronFit Gym and take the first step towards a healthier, stronger and more confident you.
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
          <button onClick={onBook} style={{
            background: C.green, color: "#0d1210", border: "none", borderRadius: 9,
            padding: "14px 26px", fontSize: 15, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif",
          }}>
            Book a Session <ArrowRight size={17} />
          </button>
          <button style={{
            background: "transparent", color: C.text, border: `1px solid ${C.borderLight}`, borderRadius: 9,
            padding: "14px 26px", fontSize: 15, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif",
          }}>
            <Play size={15} /> Watch Video
          </button>
        </div>
      </div>
    </section>
  );
}
