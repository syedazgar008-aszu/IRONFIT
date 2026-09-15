import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { C, heading } from "../theme";
import { apiGet, apiPost, DEMO } from "../api";
import { useReveal, revealStyle } from "../hooks/useReveal";

const DEMO_REVIEWS = [
  { ID: "1", Name: "Divya S", Rating: 5, Message: "Best gym in the area, great trainers and super clean equipment!" },
  { ID: "2", Name: "Karthik B", Rating: 4, Message: "Flexible timings really helped me stay consistent. Loving the results." },
  { ID: "3", Name: "Meena R", Rating: 5, Message: "The Zumba classes are so much fun, and the trainers are very supportive." },
];

export default function Reviews() {
  const [reviews, setReviews] = useState(DEMO ? DEMO_REVIEWS : []);
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({ Name: "", Rating: 5, Message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (DEMO) return;
    (async () => {
      const res = await apiGet("getApprovedReviews");
      if (res.success) setReviews(res.data);
    })();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await apiPost("submitReview", form);
    setSent(true);
  };

  return (
    <section id="reviews" style={{ padding: "70px 24px", background: C.bg }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", ...revealStyle(visible) }}>
        <div style={{ color: C.green, fontSize: 12.5, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>TESTIMONIALS</div>
        <h2 style={{ ...heading, fontSize: "clamp(26px, 4vw, 36px)", color: C.text, margin: "0 0 30px" }}>What Our Members Say</h2>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 40 }} className="reviews-grid">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, alignContent: "start" }}>
            {reviews.map((r) => (
              <div key={r.ID} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill={i < r.Rating ? C.green : "none"} color={C.green} />
                  ))}
                </div>
                <div style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.6, marginBottom: 14 }}>"{r.Message}"</div>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 13.5 }}>{r.Name}</div>
              </div>
            ))}
            {reviews.length === 0 && <div style={{ color: C.muted, fontSize: 14 }}>Be the first to leave a review!</div>}
          </div>

          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 24px" }}>
            <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Leave a Review</div>
            {sent ? (
              <div style={{ color: C.green, fontSize: 14 }}>Thanks for your feedback! It'll appear after admin approval.</div>
            ) : (
              <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
                <input required placeholder="Your name" value={form.Name}
                  onChange={(e) => setForm({ ...form, Name: e.target.value })} style={inputStyle} />
                <div style={{ display: "flex", gap: 6 }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button type="button" key={n} onClick={() => setForm({ ...form, Rating: n })} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      <Star size={20} fill={n <= form.Rating ? C.green : "none"} color={C.green} />
                    </button>
                  ))}
                </div>
                <textarea required placeholder="Your experience..." rows={3} value={form.Message}
                  onChange={(e) => setForm({ ...form, Message: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
                <button type="submit" className="ironfit-btn" style={{
                  background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, color: "#0d1210", border: "none", borderRadius: 8,
                  padding: "11px 0", fontSize: 14, fontWeight: 700, cursor: "pointer",
                  position: "relative", overflow: "hidden",
                }}>
                  <span style={{ position: "relative", zIndex: 1 }}>Submit Review</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .reviews-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.border}`,
  borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 13.5, fontFamily: "'Inter', sans-serif", outline: "none",
};
