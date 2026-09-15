import React, { useEffect, useState } from "react";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { C, heading } from "../theme";
import { apiGet, DEMO } from "../api";
import { useReveal, revealStyle, staggerStyle } from "../hooks/useReveal";

const DEMO_TRAINERS = [
  { ID: "1", Name: "Arjun Kumar", Specialty: "Strength & Conditioning", ImageURL: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=65&w=450&auto=format&fit=crop" },
  { ID: "2", Name: "Priya Sharma", Specialty: "Yoga & Flexibility", ImageURL: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=65&w=450&auto=format&fit=crop" },
  { ID: "3", Name: "Rohit Das", Specialty: "HIIT & CrossFit", ImageURL: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=65&w=450&auto=format&fit=crop" },
  { ID: "4", Name: "Sneha Iyer", Specialty: "Fitness & Nutrition", ImageURL: "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=65&w=450&auto=format&fit=crop" },
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
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} style={revealStyle(visible)}>
          <div style={{ color: C.green, fontSize: 12.5, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>EXPERT GUIDANCE</div>
          <h2 style={{ ...heading, fontSize: "clamp(26px, 4vw, 36px)", color: C.text, margin: "0 0 10px" }}>Meet Our Certified Trainers</h2>
          <p style={{ color: C.muted, fontSize: 15, marginBottom: 36, maxWidth: 520 }}>
            Our trainers are here to support, motivate and guide you at every step.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {trainers.map((t, i) => (
            <div key={t.ID} className="trainer-card" style={{
              borderRadius: 14, overflow: "hidden", border: `1px solid ${C.border}`, background: C.panel,
              ...staggerStyle(visible, i, 90),
            }}>
              <div className="trainer-img" style={{ height: 220, backgroundImage: `url('${t.ImageURL}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ padding: "16px 18px" }}>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 15 }}>{t.Name}</div>
                <div style={{ color: C.muted, fontSize: 12.5, marginBottom: 12 }}>{t.Specialty}</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {t.Instagram && <a href={t.Instagram} className="social-icon" style={{ color: C.muted }}><Instagram size={15} /></a>}
                  {t.Facebook && <a href={t.Facebook} className="social-icon" style={{ color: C.muted }}><Facebook size={15} /></a>}
                  {t.LinkedIn && <a href={t.LinkedIn} className="social-icon" style={{ color: C.muted }}><Linkedin size={15} /></a>}
                  {!t.Instagram && !t.Facebook && !t.LinkedIn && (
                    <>
                      <Instagram size={15} color={C.mutedDark} />
                      <Facebook size={15} color={C.mutedDark} />
                      <Linkedin size={15} color={C.mutedDark} />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trainer-card { transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease; }
        .trainer-card:hover { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0,0,0,0.3); }
        .trainer-img { transition: transform .4s ease; }
        .trainer-card:hover .trainer-img { transform: scale(1.06); }
        .social-icon { transition: color .2s ease, transform .2s ease; display: inline-flex; }
        .social-icon:hover { color: ${C.green} !important; transform: translateY(-2px); }
      `}</style>
    </section>
  );
}
