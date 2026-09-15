import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { C, heading } from "../theme";
import { apiGet, apiPost, DEMO } from "../api";
import { useReveal, revealStyle } from "../hooks/useReveal";

export default function Contact() {
  const [ref, visible] = useReveal();
  const [settings, setSettings] = useState({});
  const [form, setForm] = useState({ Name: "", Phone: "", Email: "", Message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (DEMO) return;
    (async () => {
      const res = await apiGet("getSettings");
      if (res.success) setSettings(res.data);
    })();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await apiPost("createEnquiry", { ...form, Source: "Website Contact Form" });
    setSent(true);
  };

  const phone = settings.phone || "+91 00000 00000";
  const whatsapp = settings.whatsapp || phone;

  return (
    <section id="contact" style={{ padding: "70px 24px", background: C.bgAlt }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", ...revealStyle(visible) }}>
        <div style={{ color: C.green, fontSize: 12.5, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>GET IN TOUCH</div>
        <h2 style={{ ...heading, fontSize: "clamp(26px, 4vw, 36px)", color: C.text, margin: "0 0 30px" }}>Visit or Contact Us</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }} className="contact-grid">
          <div>
            <div style={{ borderRadius: 14, overflow: "hidden", height: 260, marginBottom: 20, border: `1px solid ${C.border}` }}>
              <iframe
                title="IronFit Location"
                src={settings.mapsEmbedUrl || "https://www.google.com/maps?q=gym+near+me&output=embed"}
                width="100%" height="100%" style={{ border: 0, filter: "grayscale(0.3) invert(0.92) contrast(0.9)" }}
                loading="lazy"
              />
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href={`tel:${phone}`} style={{
                display: "flex", alignItems: "center", gap: 8, background: C.panel, border: `1px solid ${C.border}`,
                borderRadius: 9, padding: "11px 18px", color: C.text, fontSize: 13.5, textDecoration: "none", fontWeight: 600,
              }}>
                <Phone size={15} color={C.green} /> {phone}
              </a>
              <a href={`https://wa.me/${String(whatsapp).replace(/\D/g, "")}`} target="_blank" rel="noreferrer" style={{
                display: "flex", alignItems: "center", gap: 8, background: "#25D36622", border: "1px solid #25D36644",
                borderRadius: 9, padding: "11px 18px", color: "#25D366", fontSize: 13.5, textDecoration: "none", fontWeight: 600,
              }}>
                <MessageCircle size={15} /> WhatsApp Us
              </a>
              {settings.address && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.muted, fontSize: 13.5 }}>
                  <MapPin size={15} color={C.green} /> {settings.address}
                </div>
              )}
            </div>
          </div>

          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, padding: "26px 26px" }}>
            <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Send an Enquiry</div>
            {sent ? (
              <div style={{ color: C.green, fontSize: 14 }}>Thanks! We'll get back to you shortly.</div>
            ) : (
              <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
                <input required placeholder="Your name" value={form.Name} onChange={(e) => setForm({ ...form, Name: e.target.value })} style={inputStyle} />
                <input required placeholder="Phone number" value={form.Phone} onChange={(e) => setForm({ ...form, Phone: e.target.value })} style={inputStyle} />
                <input type="email" placeholder="Email (optional)" value={form.Email} onChange={(e) => setForm({ ...form, Email: e.target.value })} style={inputStyle} />
                <textarea required rows={3} placeholder="How can we help?" value={form.Message} onChange={(e) => setForm({ ...form, Message: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
                <button type="submit" className="ironfit-btn" style={{
                  background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, color: "#0d1210", border: "none", borderRadius: 8,
                  padding: "11px 0", fontSize: 14, fontWeight: 700, cursor: "pointer",
                  position: "relative", overflow: "hidden",
                }}>
                  <span style={{ position: "relative", zIndex: 1 }}>Send Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.border}`,
  borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 13.5, fontFamily: "'Inter', sans-serif", outline: "none",
};
