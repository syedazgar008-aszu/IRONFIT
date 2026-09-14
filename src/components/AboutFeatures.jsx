import React from "react";
import { Dumbbell, UserCheck, Clock, ShieldCheck } from "lucide-react";
import { C, heading } from "../theme";
import { useReveal, revealStyle } from "../hooks/useReveal";

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
      ...revealStyle(visible),
    }}>
      {FEATURES.map((f) => {
        const Icon = f.icon;
        return (
          <div key={f.title} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
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
    </div>
  );
}

const STATS = [
  { value: "5+", label: "Years Experience" },
  { value: "2,400+", label: "Happy Members" },
  { value: "15+", label: "Professional Trainers" },
  { value: "100%", label: "Clean & Safe" },
];

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
          backgroundImage: `url('https://images.unsplash.com/photo-1584863231364-2edc166de576?q=80&w=1000&auto=format&fit=crop')`,
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
            {STATS.map((s) => (
              <div key={s.label}>
                <div style={{ ...heading, fontSize: 26, fontWeight: 700, color: C.green }}>{s.value}</div>
                <div style={{ color: C.muted, fontSize: 13 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
