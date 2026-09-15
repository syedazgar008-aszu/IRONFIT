import React, { useState, Suspense, lazy } from "react";
import { C, fontImport } from "./theme";
import { buttonStyles } from "./components/Button";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { FeaturesStrip, About } from "./components/AboutFeatures";
import Classes from "./components/Classes";
import Plans from "./components/Plans";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import FloatingContact from "./components/FloatingContact";
import { DEMO } from "./api";

// Below-the-fold sections are code-split so the browser only has to parse
// and run the Hero/Classes/Plans bundle to get the page interactive —
// these chunks load in the background right after, well before the user
// scrolls down to them. This is the single biggest lever for a fast first
// paint on a long single-page site like this.
const Trainers = lazy(() => import("./components/Trainers"));
const Gallery = lazy(() => import("./components/Gallery"));
const Reviews = lazy(() => import("./components/Reviews"));
const Contact = lazy(() => import("./components/Contact"));

// Minimal, layout-matching fallback — avoids a layout jump (CLS) while a
// lazy chunk is still loading in on a slow connection.
function SectionFallback({ height = 400 }) {
  return <div style={{ height, background: C.bg }} />;
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [presetService, setPresetService] = useState("");

  const openBooking = (service = "") => {
    setPresetService(service);
    setBookingOpen(true);
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{`
        ${fontImport}
        ${buttonStyles}
        * { box-sizing: border-box; }
        body { margin: 0; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
        html { scroll-behavior: smooth; }
        input:focus, select:focus, textarea:focus { border-color: ${C.green} !important; }
        img { max-width: 100%; display: block; }
        ::selection { background: rgba(139,236,63,0.3); color: #fff; }
        /* Respect users who've asked the OS for reduced motion — accessibility + perf */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {DEMO && (
        <div style={{
          background: C.warn, color: "#1a1400", textAlign: "center", fontSize: 12.5,
          padding: "6px 12px", fontWeight: 600, position: "relative", zIndex: 101,
        }}>
          Demo mode — set API_BASE_URL in src/api.js to connect your live backend
        </div>
      )}

      <Navbar onBook={() => openBooking()} />
      <Hero onBook={() => openBooking()} />
      <FeaturesStrip />
      <About />
      <Classes onBook={() => openBooking()} />
      <Plans onBook={openBooking} />

      <Suspense fallback={<SectionFallback height={500} />}>
        <Trainers />
      </Suspense>
      <Suspense fallback={<SectionFallback height={500} />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<SectionFallback height={450} />}>
        <Reviews />
      </Suspense>
      <Suspense fallback={<SectionFallback height={450} />}>
        <Contact />
      </Suspense>

      <Footer />

      <FloatingContact />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} presetService={presetService} />
    </div>
  );
}
