import React, { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { C } from "../theme";

export default function FloatingContact({ phone = "+910000000000", whatsapp = "910000000000" }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 150, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
      {open && (
        <>
          <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" style={pillStyle("#25D366")}>
            <MessageCircle size={17} /> WhatsApp
          </a>
          <a href={`tel:${phone}`} style={pillStyle(C.green, "#0d1210")}>
            <Phone size={17} /> Call Us
          </a>
        </>
      )}
      <button onClick={() => setOpen(!open)} style={{
        width: 52, height: 52, borderRadius: "50%", background: C.green, border: "none",
        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        boxShadow: "0 6px 20px rgba(139,236,63,0.4)",
      }}>
        {open ? <X size={22} color="#0d1210" /> : <MessageCircle size={22} color="#0d1210" />}
      </button>
    </div>
  );
}

const pillStyle = (bg, color = "#fff") => ({
  display: "flex", alignItems: "center", gap: 8, background: bg, color,
  padding: "10px 16px", borderRadius: 24, textDecoration: "none", fontSize: 13.5,
  fontWeight: 600, fontFamily: "'Inter', sans-serif", boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
  whiteSpace: "nowrap",
});
