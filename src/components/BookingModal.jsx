import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { C, heading } from "../theme";
import { apiGet, apiPost, DEMO } from "../api";

const SERVICES = ["Gym Session", "Strength Training", "HIIT", "Yoga", "Cardio", "Zumba", "Personal Training"];
const TIMES = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];

export default function BookingModal({ open, onClose, presetService }) {
  const [form, setForm] = useState({ FullName: "", Phone: "", Service: "", Date: "", Time: "", Trainer: "" });
  const [trainers, setTrainers] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  useEffect(() => {
    if (presetService) setForm((f) => ({ ...f, Service: presetService }));
  }, [presetService]);

  useEffect(() => {
    if (!open || DEMO) return;
    (async () => {
      const res = await apiGet("getTrainers");
      if (res.success) setTrainers(res.data);
    })();
  }, [open]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const res = await apiPost("createBooking", form);
    setStatus(res.success ? "done" : "error");
  };

  const reset = () => {
    setForm({ FullName: "", Phone: "", Service: "", Date: "", Time: "", Trainer: "" });
    setStatus("idle");
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={reset}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16,
        padding: "28px 26px", width: 420, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ ...heading, fontWeight: 700, fontSize: 19, color: C.text }}>Book Appointment</div>
          <button onClick={reset} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer" }}><X size={20} /></button>
        </div>
        <div style={{ color: C.muted, fontSize: 13, marginBottom: 22 }}>Choose your preferred date, time and class.</div>

        {status === "done" ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#8bec3f22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Check size={24} color={C.green} />
            </div>
            <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Booking request sent!</div>
            <div style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>We'll confirm your slot on WhatsApp/call shortly.</div>
            <button onClick={reset} style={{ background: C.green, color: "#0d1210", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}>Done</button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "grid", gap: 14 }}>
            <Field label="Full Name">
              <input required value={form.FullName} onChange={(e) => setForm({ ...form, FullName: e.target.value })} style={inputStyle} placeholder="Enter your name" />
            </Field>
            <Field label="Phone Number">
              <input required value={form.Phone} onChange={(e) => setForm({ ...form, Phone: e.target.value })} style={inputStyle} placeholder="+91 Enter your phone number" />
            </Field>
            <Field label="Select Service">
              <select required value={form.Service} onChange={(e) => setForm({ ...form, Service: e.target.value })} style={inputStyle}>
                <option value="">Select service</option>
                {SERVICES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Select Date">
                <input required type="date" value={form.Date} onChange={(e) => setForm({ ...form, Date: e.target.value })} style={inputStyle} />
              </Field>
              <Field label="Select Time">
                <select required value={form.Time} onChange={(e) => setForm({ ...form, Time: e.target.value })} style={inputStyle}>
                  <option value="">Choose time</option>
                  {TIMES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Select Trainer (Optional)">
              <select value={form.Trainer} onChange={(e) => setForm({ ...form, Trainer: e.target.value })} style={inputStyle}>
                <option value="">Choose trainer</option>
                {(DEMO ? ["Arjun Kumar", "Priya Sharma", "Rohit Das", "Sneha Iyer"] : trainers.map((t) => t.Name)).map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </Field>

            {status === "error" && <div style={{ color: C.danger, fontSize: 13 }}>Something went wrong. Please try again.</div>}

            <button type="submit" disabled={status === "sending"} className="ironfit-btn" style={{
              background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, color: "#0d1210", border: "none", borderRadius: 9,
              padding: "12px 0", fontSize: 14.5, fontWeight: 700, cursor: "pointer", marginTop: 4,
              opacity: status === "sending" ? 0.6 : 1, position: "relative", overflow: "hidden",
            }}>
              <span style={{ position: "relative", zIndex: 1 }}>{status === "sending" ? "Booking..." : "Book Now"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ fontSize: 12.5, color: C.muted, display: "block", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box", background: C.bg, border: `1px solid ${C.border}`,
  borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 13.5, fontFamily: "'Inter', sans-serif", outline: "none",
};
