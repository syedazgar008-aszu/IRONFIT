import React from "react";
import { C } from "../theme";

/**
 * Advanced button — all motion uses only `transform` + `opacity`
 * (GPU-composited, no layout/paint cost) so it stays smooth even on
 * low-end devices. No JS-driven animation, pure CSS.
 */
export default function Button({
  children, onClick, variant = "solid", size = "md", type = "button", disabled, style,
}) {
  const sizes = {
    md: { padding: "13px 26px", fontSize: 14.5 },
    lg: { padding: "15px 30px", fontSize: 15.5 },
    sm: { padding: "9px 18px", fontSize: 13 },
  }[size];

  const variants = {
    solid: {
      background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
      color: "#0d1210", border: "none",
    },
    outline: {
      background: "transparent", color: C.text, border: `1px solid ${C.borderLight}`,
    },
    ghost: {
      background: "rgba(255,255,255,0.04)", color: C.text, border: "1px solid transparent",
    },
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="ironfit-btn"
      style={{
        ...variants, ...sizes,
        borderRadius: 10, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'Inter', sans-serif", display: "inline-flex", alignItems: "center",
        justifyContent: "center", gap: 8, position: "relative", overflow: "hidden",
        opacity: disabled ? 0.6 : 1, ...style,
      }}
    >
      <span style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: 8 }}>
        {children}
      </span>
    </button>
  );
}

// Injected once globally (see App.jsx) — keeps all button motion in one
// GPU-cheap stylesheet instead of per-instance inline animation.
export const buttonStyles = `
.ironfit-btn {
  transition: transform .22s cubic-bezier(.2,.8,.2,1), box-shadow .22s ease, filter .22s ease;
  will-change: transform;
}
.ironfit-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
  transform: translateX(-120%);
  transition: transform .6s ease;
}
.ironfit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(139,236,63,0.28);
  filter: brightness(1.04);
}
.ironfit-btn:hover:not(:disabled)::before { transform: translateX(120%); }
.ironfit-btn:active:not(:disabled) { transform: translateY(0); }
`;
