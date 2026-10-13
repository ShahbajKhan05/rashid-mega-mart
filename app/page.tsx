"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const slides = [
  { id: "home", label: "Ghar ka samaan" },
  { id: "daily", label: "13 zaroori items" },
  { id: "kit", label: "₹1100 wali kit" },
  { id: "saving", label: "₹53 ki bachat" },
  { id: "brand", label: "Aasan shopping" },
] as const;

type SlideId = (typeof slides)[number]["id"];

function SlideArtwork({ id }: { id: SlideId }) {
  if (id === "home") {
    return (
      <div className="preview-panel preview-far-left">
        <span className="mini-brand">RASHID</span>
        <span className="preview-symbol">⌂</span>
        <h2 className="preview-title">GHAR KA<br />SAMAAN</h2>
        <span className="preview-caption">Sab ek jagah</span>
      </div>
    );
  }

  if (id === "daily") {
    return (
      <div className="preview-panel preview-daily">
        <span className="mini-brand">DAILY ESSENTIALS</span>
        <div className="daily-number">13</div>
        <h2 className="daily-title">Zaroori Items</h2>
        <div className="product-emojis" aria-hidden="true">
          <span>🌾</span><span>🛢️</span><span>🧂</span><span>🧼</span>
        </div>
        <p className="daily-bottom">Roz ke kaam ki cheezein</p>
      </div>
    );
  }

  if (id === "kit") {
    return (
      <div className="kit-poster">
        <div className="poster-header">
          <span className="poster-brand">RASHID MEGA MART</span>
          <h2 className="poster-title">₹1100<span>WALI KIT</span></h2>
          <p>Ghar ka zaroori samaan</p>
        </div>
        <div className="poster-content">
          <span className="poster-label">KIT MEIN SHAMIL</span>
          <div className="poster-products">
            <span>2 kg Shakkar</span>
            <span>5 kg Kanki</span>
            <span>Sarso Tel</span>
            <span>Refined Oil</span>
            <span>Namak</span>
            <span>Masale</span>
            <span>Kapde Sabun</span>
            <span>Nahane Sabun</span>
            <span>Bartan Sabun</span>
            <span>Shampoo, Jeera</span>
          </div>
        </div>
        <div className="poster-price">
          <span className="poster-market-price">Market value ₹1,153</span>
          <strong>₹1,100</strong>
          <span className="poster-saving">₹53 ki bachat</span>
        </div>
      </div>
    );
  }

  if (id === "saving") {
    return (
      <div className="preview-panel preview-saving">
        <span className="mini-brand">AAPKI BACHAT</span>
        <div className="saving-number">₹53</div>
        <h2 className="saving-title">Kam Daam</h2>
        <span className="saving-caption">13 items · Ek kit</span>
        <span className="saving-stamp">VALUE PACK</span>
      </div>
    );
  }

  return (
    <div className="preview-panel preview-far-right">
      <span className="preview-symbol">✳</span>
      <span className="mini-brand">AASAN SHOPPING</span>
      <h2 className="preview-title">AAPKI<br />APNI<br />MEGA MART</h2>
      <span className="preview-caption">Aapke paas</span>
    </div>
  );
}

function getPosition(offset: number) {
  if (offset === 0) return "position-center";
  if (offset === -1) return "position-left";
  if (offset === 1) return "position-right";
  if (offset < 0) return "position-left-far";
  return "position-right-far";
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(2);
  const dragStartX = useRef<number | null>(null);
  const didDrag = useRef(false);

  function moveCarousel(direction: number) {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    dragStartX.current = event.clientX;
    didDrag.current = false;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;
    const distance = event.clientX - dragStartX.current;
    dragStartX.current = null;

    if (Math.abs(distance) > 45) {
      didDrag.current = true;
      moveCarousel(distance < 0 ? 1 : -1);
    }
  }

  function handleCardClick(index: number) {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }
    setActiveIndex(index);
  }

  function handleCarouselKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveCarousel(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveCarousel(1);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF9D8] text-[#800020]">
      <Navbar />

      <section
        id="home"
        className="hero-intro flex min-h-[830px] flex-col items-center px-4 pb-12 pt-32 text-center sm:px-6 sm:pt-36"
      >
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] sm:text-xs">
          Rashid Mega Mart · Ghoghar, Rewa
        </p>

        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-ink">Ghar ki zaroorat.</span>
          <span className="burgundy-gradient-text mt-2 block">Ek hi kit mein.</span>
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-[#800020]/80 sm:text-base">
          Roz ke zaroori samaan ki shopping ab aasaan. Apni ₹1100 wali kit paayein aur ₹53 ki bachat karein.
        </p>

        <div
          id="kit"
          className="hero-stage"
          aria-label="Interactive kit carousel. Click a card, drag with your mouse, or swipe on your phone."
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { dragStartX.current = null; }}
          onKeyDown={handleCarouselKeys}
          tabIndex={0}
        >
          {slides.map((slide, index) => {
            const offset = ((index - activeIndex + slides.length + 2) % slides.length) - 2;
            const position = getPosition(offset);
            return (
              <button
                key={slide.id}
                type="button"
                aria-label={`${slide.label}. Select card`}
                aria-pressed={offset === 0}
                onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
                onClick={() => handleCardClick(index)}
                className={`kit-card coverflow-card ${position} ${offset === 0 ? "is-active" : ""}`}
                style={{ zIndex: offset === 0 ? 5 : Math.abs(offset) === 1 ? 3 : 1 }}
              >
                <SlideArtwork id={slide.id} />
              </button>
            );
          })}
        </div>

        <div className="carousel-controls" aria-label="Carousel controls">
          <button type="button" className="carousel-arrow" onClick={() => moveCarousel(-1)} aria-label="Previous card">
            ←
          </button>
          <div className="carousel-dots">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
                aria-label={`Show ${slide.label}`}
                aria-current={index === activeIndex ? "step" : undefined}
              />
            ))}
          </div>
          <button type="button" className="carousel-arrow" onClick={() => moveCarousel(1)} aria-label="Next card">
            →
          </button>
        </div>

        <a
          href="https://wa.me/918962531603?text=Namaste%2C%20mujhe%20%E2%82%B91100%20wali%20kit%20order%20karni%20hai."
          target="_blank"
          rel="noopener noreferrer"
          className="order-button mt-5 inline-flex items-center gap-3 rounded-full bg-[#800020] px-7 py-3.5 text-sm font-bold text-[#FFF9D8] transition duration-300 hover:-translate-y-1 hover:bg-[#610019] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#800020] sm:mt-6"
        >
          WhatsApp par Order Karein <span aria-hidden="true">↗</span>
        </a>

        <p className="mt-4 text-[11px] text-[#800020]/75">
          13 essential items · ₹1,100 kit · ₹53 bachat
        </p>
      </section>

      <Footer />
    </main>
  );
}
