import React, { useEffect, useState } from "react";
import { C, heading } from "../theme";
import { apiGet, DEMO } from "../api";
import { useReveal, revealStyle } from "../hooks/useReveal";

const DEMO_GALLERY = [
  { ID: "1", Category: "Gym", ImageURL: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop" },
  { ID: "2", Category: "Classes", ImageURL: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=500&auto=format&fit=crop" },
  { ID: "3", Category: "Gym", ImageURL: "https://images.unsplash.com/photo-1637666556256-1e58f80b6a80?q=80&w=500&auto=format&fit=crop" },
  { ID: "4", Category: "Community", ImageURL: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=500&auto=format&fit=crop" },
  { ID: "5", Category: "Classes", ImageURL: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=500&auto=format&fit=crop" },
  { ID: "6", Category: "Gym", ImageURL: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=500&auto=format&fit=crop" },
];

const TABS = ["All", "Gym", "Classes", "Community"];

export default function Gallery() {
  const [images, setImages] = useState(DEMO ? DEMO_GALLERY : []);
  const [tab, setTab] = useState("All");
  const [ref, visible] = useReveal();

  useEffect(() => {
    if (DEMO) return;
    (async () => {
      const res = await apiGet("getGallery");
      if (res.success) setImages(res.data);
    })();
  }, []);

  const filtered = tab === "All" ? images : images.filter((i) => i.Category === tab);

  return (
    <section id="gallery" style={{ padding: "70px 24px", background: C.bgAlt }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", ...revealStyle(visible) }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div>
            <div style={{ color: C.green, fontSize: 12.5, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>OUR GYM</div>
            <h2 style={{ ...heading, fontSize: "clamp(26px, 4vw, 36px)", color: C.text, margin: 0 }}>Gallery</h2>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: tab === t ? C.green : "transparent",
                color: tab === t ? "#0d1210" : C.muted,
                border: tab === t ? "none" : `1px solid ${C.border}`,
                borderRadius: 20, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
              }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
          {filtered.map((img) => (
            <div key={img.ID} style={{
              aspectRatio: "1/1", borderRadius: 12, overflow: "hidden",
              backgroundImage: `url('${img.ImageURL}')`, backgroundSize: "cover", backgroundPosition: "center",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
