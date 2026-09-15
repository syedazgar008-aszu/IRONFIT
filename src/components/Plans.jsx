import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { C, heading } from "../theme";
import { apiGet, DEMO } from "../api";
import { useReveal, revealStyle, staggerStyle } from "../hooks/useReveal";

const DEMO_PLANS = [
  { ID: "1", Name: "Basic", Price: 2499, Duration: "month", Popular: false,
    Features: "Gym access (6AM-10PM),Basic equipment,Locker access,1 Free PT session/month" },
  { ID: "2", Name: "Pro", Price: 3999, Duration: "month", Popular: true,
    Features: "All Basic features,Group classes,Personal training (optional),Nutrition guidance" },
  { ID: "3", Name: "Premium", Price: 5999, Duration: "month", Popular: false,
    Features: "All Pro features,Unlimited group classes,Personal training (included),Diet plan + progress tracking" },
];

export default function Plans({ onBook }) {
  const [plans, setPlans] = useState(DEMO ? DEMO_PLANS : []);
  const [ref, visible] = useReveal();

  useEffect(() => {
    if (DEMO) return;
    (async () => {
      const res = await apiGet("getPlans");
      if (res.success) setPlans(res.data);
    })();
  }, []);

  return (
    <section id="membership" style={{ padding: "70px 24px", background: C.bgAlt }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", ...revealStyle(visible) }}>
        <div style={{ color: C.green, fontSize: 12.5, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>MEMBERSHIP</div>
        <h2 style={{ ...heading, fontSize: "clamp(26px, 4vw, 36px)", color: C.text, margin: "0 0 10px" }}>Flexible Plans for Every Goal</h2>
        <p style={{ color: C.muted, fontSize: 15, marginBottom: 40, maxWidth: 520 }}>
          Choose the plan that fits your lifestyle and start your fitness journey today.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
          {plans.map((p, i) => {
            const popular = p.Popular === true || p.Popular === "TRUE";
            const features = String(p.Features || "").split(",").filter(Boolean);
            return (
              <div key={p.ID} className="plan-card" style={{
                position: "relative", borderRadius: 16, padding: "30px 26px",
                background: popular ? "#111713" : C.panel,
                border: popular ? `2px solid ${C.green}` : `1px solid ${C.border}`,
                ...staggerStyle(visible, i, 100),
              }}>
                {popular && (
                  <div className="popular-badge" style={{
                    position: "absolute", top: -13, left: 26, background: C.green, color: "#0d1210",
                    fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20,
                  }}>
                    Most Popular
                  </div>
                )}
                <div style={{ color: C.text, fontWeight: 600, fontSize: 17, marginBottom: 6 }}>{p.Name}</div>
                <div style={{ marginBottom: 22 }}>
                  <span style={{ ...heading, fontSize: 32, fontWeight: 700, color: C.text }}>₹{Number(p.Price).toLocaleString("en-IN")}</span>
                  <span style={{ color: C.muted, fontSize: 14 }}> /{p.Duration}</span>
                </div>
                <div style={{ display: "grid", gap: 12, marginBottom: 26 }}>
                  {features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Check size={15} color={C.green} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ color: C.muted, fontSize: 13.5 }}>{f.trim()}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => onBook(p.Name)} className="ironfit-btn" style={{
                  width: "100%", background: popular ? `linear-gradient(135deg, ${C.green}, ${C.greenDark})` : "transparent",
                  color: popular ? "#0d1210" : C.text,
                  border: popular ? "none" : `1px solid ${C.borderLight}`,
                  borderRadius: 9, padding: "12px 0", fontSize: 14, fontWeight: 700,
                  cursor: "pointer", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden",
                }}>
                  <span style={{ position: "relative", zIndex: 1 }}>Choose Plan</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .plan-card { transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease; }
        .plan-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(0,0,0,0.35); }
        @keyframes badgePulse { 0%,100% { box-shadow: 0 0 0 0 rgba(139,236,63,0.4); } 50% { box-shadow: 0 0 0 6px rgba(139,236,63,0); } }
        .popular-badge { animation: badgePulse 2.4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
