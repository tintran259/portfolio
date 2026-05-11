"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SplashScreen from "@/components/SplashScreen";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";

const TechBackground = dynamic(() => import("@/components/TechBackground"), {
  ssr: false,
});

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <SplashScreen onComplete={() => setSplashDone(true)} />

      {splashDone && (
        <main style={{ position: "relative" }}>
          <TechBackground />
          <Navigation />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <ScrollToTop />
        </main>
      )}
    </>
  );
}
