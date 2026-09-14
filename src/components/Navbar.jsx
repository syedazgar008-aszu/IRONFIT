import React, { useState, useEffect } from "react";
import { Dumbbell, Menu, X } from "lucide-react";
import { C, heading } from "../theme";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Classes", href: "#classes" },
  { label: "Trainers", href: "#trainers" },
  { label: "Membership", href: "#membership" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(13,18,16,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all .3s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Dumbbell size={17} color="#0d1210" />
          </div>
          <div style={{ ...heading, fontWeight: 700, fontSize: 17, color: C.text, letterSpacing: 0.3 }}>IRONFIT</div>
        </div>

        <div style={{ display: "flex", gap: 30 }} className="nav-links-desktop">
          {LINKS.map((l) => (
            <button key={l.href} onClick={() => go(l.href)} style={{
              background: "none", border: "none", color: C.muted, fontSize: 14,
              cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 500,
            }}>
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={onBook} className="book-btn-desktop" style={{
            background: C.green, color: "#0d1210", border: "none", borderRadius: 8,
            padding: "9px 18px", fontSize: 13.5, fontWeight: 700, cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
          }}>
            Book Appointment
          </button>
          <button onClick={() => setOpen(!open)} className="menu-btn-mobile" style={{
            background: "none", border: "none", color: C.text, cursor: "pointer", display: "none",
          }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "12px 24px 20px" }}>
          {LINKS.map((l) => (
            <button key={l.href} onClick={() => go(l.href)} style={{
              display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
              color: C.muted, fontSize: 15, padding: "10px 0", cursor: "pointer", fontFamily: "'Inter', sans-serif",
            }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => { setOpen(false); onBook(); }} style={{
            marginTop: 8, width: "100%", background: C.green, color: "#0d1210", border: "none",
            borderRadius: 8, padding: "11px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}>
            Book Appointment
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .nav-links-desktop, .book-btn-desktop { display: none !important; }
          .menu-btn-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
}
