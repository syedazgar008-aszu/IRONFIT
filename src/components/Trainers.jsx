import React, { useEffect, useState } from "react";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { C, heading } from "../theme";
import { apiGet, DEMO } from "../api";
import { useReveal, revealStyle } from "../hooks/useReveal";

const DEMO_TRAINERS = [
  { ID: "1", Name: "Arjun Kumar", Specialty: "Strength & Conditioning", ImageURL: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=500&auto=format&fit=crop" },
  { ID: "2", Name: "Priya Sharma", Specialty: "Yoga & Flexibility", ImageURL: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=500&auto=format&fit=crop" },
  { ID: "3", Name: "Rohit Das", Specialty: "HIIT & CrossFit", ImageURL: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop" },
  { ID: "4", Name: "Sneha Iyer", Specialty: "Fitness & Nutrition", ImageURL: "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=500&auto=format&fit=crop" },
];

export default function Trainers() {
  const [trainers, setTrainers] = useState(DEMO ? DEMO_TRAINERS : []);
  const [ref, visible] = useReveal();

  useEffect(() => {
    if (DEMO) return;
    (async () => {
      const res = await apiGet("getTrainers");
      if (res.success) setTrainers(res.data);
    })();
  }, []);

  return (
    <section id="trainers" style={{ padding: "70px 24px", background: C.bg }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", ...revealStyle(visible) }}>
        <div style={{ color: C.green, fontSize: 12.5, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>EXPERT GUIDANCE</div>
        <h2 style={{ ...heading, fontSize: "clamp(26px, 4vw, 36px)", color: C.text, margin: "0 0 10px" }}>Meet Our Certified Trainers</h2>
        <p style={{ color: C.muted, fontSize: 15, marginBottom: 36, maxWidth: 520 }}>
          Our trainers are here to support, motivate and guide you at every step.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {trainers.map((t) => (
            <div key={t.ID} style={{
              borderRadius: 14, overflow: "hidden", border: `1px solid ${C.border}`, background: C.panel,
            }}>
              <div style={{ height: 220, backgroundImage: `url('${t.ImageURL}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ padding: "16px 18px" }}>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 15 }}>{t.Name}</div>
                <div style={{ color: C.muted, fontSize: 12.5, marginBottom: 12 }}>{t.Specialty}</div>
                <div style={{ display: "flex", gap: 10 }}>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
