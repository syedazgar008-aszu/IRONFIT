import React, { useState, useEffect } from "react";
import { Play, ArrowRight, ChevronDown } from "lucide-react";
import { C, heading } from "../theme";

export default function Hero({ onBook }) {
  // One-time mount animation (not scroll-triggered — it's the first thing
  // the user sees, so it plays immediately instead of waiting on IntersectionObserver).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const stagger = (i) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: `opacity .7s cubic-bezier(.2,.8,.2,1) ${i * 110}ms, transform .7s cubic-bezier(.2,.8,.2,1) ${i * 110}ms`,
  });

  return (
    <section id="home" style={{
      position: "relative", minHeight: "92vh", display: "flex", alignItems: "center",
      background: `linear-gradient(120deg, rgba(13,18,16,0.95), rgba(13,18,16,0.8)), url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=65&w=1400&auto=format&fit=crop') center/cover`,
      paddingTop: 90, overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div style={{ color: C.green, fontSize: 13, fontWeight: 700, letterSpacing: 3, marginBottom: 18, ...stagger(0) }}>
          FITNESS / HEALTH / LIFESTYLE
        </div>
        <h1 style={{
          ...heading, fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 800, color: C.text,
          lineHeight: 1.05, margin: 0, maxWidth: 720, ...stagger(1),
        }}>
          BUILD A STRONGER <span style={{ color: C.green, position: "relative" }}>
            YOU
            <svg viewBox="0 0 140 14" style={{
              position: "absolute", left: 0, bottom: -8, width: "100%", height: 14,
              opacity: mounted ? 1 : 0, transition: "opacity .5s ease 900ms",
            }}>
              <path d="M2 10 Q 35 2, 70 8 T 138 6" stroke={C.green} strokeWidth="4" fill="none" strokeLinecap="round"
                style={{
                  strokeDasharray: 160, strokeDashoffset: mounted ? 0 : 160,
                  transition: "stroke-dashoffset 1s cubic-bezier(.2,.8,.2,1) 950ms",
                }} />
            </svg>
          </span>
        </h1>
        <p style={{ color: C.muted, fontSize: 17, maxWidth: 480, marginTop: 26, lineHeight: 1.6, ...stagger(2) }}>
          Join IronFit Gym and take the first step towards a healthier, stronger and more confident you.
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap", ...stagger(3) }}>
          <button onClick={onBook} className="ironfit-btn" style={{
            background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, color: "#0d1210", border: "none", borderRadius: 10,
            padding: "15px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif",
            position: "relative", overflow: "hidden",
          }}>
            <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8 }}>
              Book a Session <ArrowRight size={17} />
            </span>
          </button>
          <button className="ironfit-btn" style={{
            background: "rgba(255,255,255,0.04)", color: C.text, border: `1px solid ${C.borderLight}`, borderRadius: 10,
            padding: "15px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif",
            position: "relative", overflow: "hidden",
          }}>
            <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8 }}>
              <Play size={15} /> Watch Video
            </span>
          </button>
        </div>
      </div>

      {/* Scroll cue — pure CSS bounce, cheap */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        opacity: mounted ? 0.7 : 0, transition: "opacity .6s ease 1.2s",
        animation: "heroBounce 2.2s ease-in-out infinite",
      }}>
        <ChevronDown size={20} color={C.muted} />
      </div>

      <style>{`
        @keyframes heroBounce { 0%,100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 8px); } }
      `}</style>
    </section>
  );
}
