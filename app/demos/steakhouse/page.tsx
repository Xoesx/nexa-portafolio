"use client";

import { useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { OurStory } from "./components/OurStory";
import { OurMenu } from "./components/OurMenu";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { BestIngredients } from "./components/BestIngredients";
import { Reservation } from "./components/Reservation";
import { Footer } from "./components/Footer";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { IdiomaProvider } from "./i18n";

export default function SteakhousePage() {
  // Activamos las animaciones de scroll
  useScrollReveal();

  // Scroll suave global
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <IdiomaProvider>
      {(idioma) => (
        <div
          lang={idioma}
          className="min-h-screen bg-[#111111] text-white antialiased"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          <Header />
          <main>
            <Hero />
            <OurStory />
            <OurMenu />
            <UpcomingEvents />
            <BestIngredients />
            <Reservation />
          </main>
          <Footer />
        </div>
      )}
    </IdiomaProvider>
  );
}
