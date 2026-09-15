import React from "react";
import { Dumbbell, UserCheck, Clock, ShieldCheck } from "lucide-react";
import { C, heading } from "../theme";
import { useReveal, revealStyle, staggerStyle } from "../hooks/useReveal";
import { useCountUp } from "../hooks/useCountUp";

const FEATURES = [
  { icon: Dumbbell, title: "Modern Equipment", sub: "State-of-the-art fitness gear" },
  { icon: UserCheck, title: "Certified Trainers", sub: "Expert guidance & support" },
  { icon: Clock, title: "Flexible Timings", sub: "Early morning to late night" },
  { icon: ShieldCheck, title: "Safe & Clean", sub: "Hygienic & comfortable environment" },
];

export function FeaturesStrip() {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      maxWidth: 1200, margin: "0 auto", padding: "36px 24px",
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20,
    }}>
      {FEATURES.map((f, i) => {
        const Icon = f.icon;
        return (
          <div key={f.title} className="feature-item" style={{
            display: "flex", alignItems: "center", gap: 14,
            ...staggerStyle(visible, i, 90),
          }}>
            <div className="feature-icon" style={{
              width: 44, height: 44, borderRadius: 11, background: "#8bec3f14",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Icon size={20} color={C.green} />
            </div>
            <div>
              <div style={{ color: C.text, fontWeight: 600, fontSize: 14.5 }}>{f.title}</div>
              <div style={{ color: C.muted, fontSize: 12.5 }}>{f.sub}</div>
            </div>
          </div>
        );
      })}
      <style>{`
        .feature-icon { transition: transform .3s cubic-bezier(.2,.8,.2,1), background .3s ease; }
        .feature-item:hover .feature-icon { transform: scale(1.1) rotate(-4deg); background: #8bec3f26; }
      `}</style>
    </div>
  );
}

// Stat with an integer target — used to drive the count-up animation.
// Non-numeric suffix (+ / %) is appended after counting finishes.
const STATS = [
  { target: 5, suffix: "+", label: "Years Experience" },
  { target: 2400, suffix: "+", label: "Happy Members" },
  { target: 15, suffix: "+", label: "Professional Trainers" },
  { target: 100, suffix: "%", label: "Clean & Safe" },
];

function StatItem({ target, suffix, label }) {
  const [ref, value] = useCountUp(target, 1400);
  return (
    <div ref={ref}>
      <div style={{ ...heading, fontSize: 26, fontWeight: 700, color: C.green, fontVariantNumeric: "tabular-nums" }}>
        {value.toLocaleString("en-IN")}{suffix}
      </div>
      <div style={{ color: C.muted, fontSize: 13 }}>{label}</div>
    </div>
  );
}

export function About() {
  const [ref, visible] = useReveal();
  return (
    <section id="about" style={{ background: C.bgAlt, padding: "70px 24px" }}>
      <div ref={ref} style={{
        maxWidth: 1200, margin: "0 auto", display: "grid",
        gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "center",
        ...revealStyle(visible),
      }} className="about-grid">
        <div style={{
          borderRadius: 18, overflow: "hidden", aspectRatio: "4/5",
          backgroundImage: `url('https://images.unsplash.com/photo-1584863231364-2edc166de576?q=65&w=800&auto=format&fit=crop')`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div>
          <div style={{ color: C.green, fontSize: 12.5, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>ABOUT US</div>
          <h2 style={{ ...heading, fontSize: "clamp(26px, 4vw, 38px)", color: C.text, margin: "0 0 18px", lineHeight: 1.2 }}>
            More Than Just a Gym — It's a <span style={{ color: C.green }}>Lifestyle</span>
          </h2>
          <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.7, marginBottom: 30 }}>
            At IronFit, we believe fitness is not just about working out, it's about building a better you.
            Our goal is to provide a motivating, supportive and professional environment for everyone, from
            beginners to athletes.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
            {STATS.map((s) => <StatItem key={s.label} {...s} />)}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
