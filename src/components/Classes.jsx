import React, { useEffect, useState } from "react";
import { C, heading } from "../theme";
import { apiGet, DEMO } from "../api";
import { useReveal, staggerStyle } from "../hooks/useReveal";

const DEMO_CLASSES = [
  { ID: "1", Name: "Strength Training", Description: "Build muscle & power", ImageURL: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=65&w=500&auto=format&fit=crop" },
  { ID: "2", Name: "HIIT", Description: "Burn fat, boost stamina", ImageURL: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=65&w=500&auto=format&fit=crop" },
  { ID: "3", Name: "Yoga", Description: "Improve flexibility & mind", ImageURL: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=65&w=500&auto=format&fit=crop" },
  { ID: "4", Name: "Cardio", Description: "Better heart health", ImageURL: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=65&w=500&auto=format&fit=crop" },
  { ID: "5", Name: "Zumba", Description: "Fun fitness, great energy", ImageURL: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=65&w=500&auto=format&fit=crop" },
];

export default function Classes({ onBook }) {
  const [classes, setClasses] = useState(DEMO ? DEMO_CLASSES : []);
  const [ref, visible] = useReveal();

  useEffect(() => {
    if (DEMO) return;
    (async () => {
      const res = await apiGet("getClasses");
      if (res.success) setClasses(res.data);
    })();
  }, []);

  return (
    <section id="classes" style={{ padding: "70px 24px", background: C.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} style={staggerStyle(visible, 0)}>
          <div style={{ color: C.green, fontSize: 12.5, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>OUR CLASSES</div>
          <h2 style={{ ...heading, fontSize: "clamp(26px, 4vw, 36px)", color: C.text, margin: "0 0 10px" }}>Choose Your Fitness Journey</h2>
          <p style={{ color: C.muted, fontSize: 15, marginBottom: 36, maxWidth: 520 }}>
            From strength training to yoga, we have a variety of classes to help you reach your goals.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
          {classes.map((c, i) => (
            <div key={c.ID} className="class-card" style={{
              borderRadius: 14, overflow: "hidden", border: `1px solid ${C.border}`,
              background: C.panel, cursor: "pointer",
              ...staggerStyle(visible, i, 80),
            }}>
              <div className="class-card-img" style={{
                height: 150, backgroundImage: `url('${c.ImageURL}')`, backgroundSize: "cover", backgroundPosition: "center",
              }} />
              <div style={{ padding: "16px 18px" }}>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{c.Name}</div>
                <div style={{ color: C.muted, fontSize: 12.5, marginBottom: 12 }}>{c.Description}</div>
                <button onClick={onBook} style={{
                  background: "none", border: "none", color: C.green, fontSize: 12.5, fontWeight: 700,
                  cursor: "pointer", padding: 0, fontFamily: "'Inter', sans-serif",
                }}>
                  Book Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .class-card { transition: transform .3s cubic-bezier(.2,.8,.2,1), border-color .3s ease, box-shadow .3s ease; }
        .class-card:hover { transform: translateY(-6px); border-color: rgba(139,236,63,0.35); box-shadow: 0 16px 32px rgba(0,0,0,0.3); }
        .class-card-img { transition: transform .4s ease; }
        .class-card:hover .class-card-img { transform: scale(1.06); }
      `}</style>
    </section>
  );
}
