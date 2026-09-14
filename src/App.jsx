import React, { useState } from "react";
import { C, fontImport } from "./theme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { FeaturesStrip, About } from "./components/AboutFeatures";
import Classes from "./components/Classes";
import Plans from "./components/Plans";
import Trainers from "./components/Trainers";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import FloatingContact from "./components/FloatingContact";
import { DEMO } from "./api";

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
        * { box-sizing: border-box; }
        body { margin: 0; }
        html { scroll-behavior: smooth; }
        input:focus, select:focus, textarea:focus { border-color: ${C.green} !important; }
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
      <Trainers />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />

      <FloatingContact />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} presetService={presetService} />
    </div>
  );
}
