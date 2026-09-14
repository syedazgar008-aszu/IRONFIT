import React from "react";
import { Dumbbell, Instagram, Facebook, Youtube } from "lucide-react";
import { C, heading } from "../theme";

export default function Footer() {
  return (
    <footer style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "40px 24px 26px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Dumbbell size={15} color="#0d1210" />
          </div>
          <div style={{ ...heading, fontWeight: 700, fontSize: 15, color: C.text }}>IRONFIT</div>
        </div>
        <div style={{ color: C.mutedDark, fontSize: 12.5 }}>© {new Date().getFullYear()} IronFit Gym. All rights reserved.</div>
        <div style={{ display: "flex", gap: 14 }}>
          <Instagram size={17} color={C.muted} />
          <Facebook size={17} color={C.muted} />
          <Youtube size={17} color={C.muted} />
        </div>
      </div>
    </footer>
  );
}
