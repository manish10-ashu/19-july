"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Lenis from "lenis";

import { HeroSection } from "@/components/sections/hero-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { MemoriesSection } from "@/components/sections/memories-section";
import { ReasonsSection } from "@/components/sections/reasons-section";
import { LetterSection } from "@/components/sections/letter-section";
import { FinalSurprise } from "@/components/sections/final-surprise";
import { Footer } from "@/components/layout/footer";
import { MusicPlayer } from "@/components/ui/music-player";

export default function Home() {
  // 1. Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Bind to anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = anchor.getAttribute("href");
        if (id) {
          lenis.scrollTo(id);
        }
      }
    };
    window.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      window.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  // 2. Cursor Glow Effect
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const startJourney = () => {
    const section = document.getElementById("gallery-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#090514]">
      {/* Premium Cursor Glow (Hidden on touch devices) */}
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen bg-gradient-to-r from-romantic-pink to-romantic-lavender blur-[6px] opacity-60 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          boxShadow: "0 0 20px rgba(255, 183, 197, 0.6), 0 0 40px rgba(233, 213, 255, 0.4)",
        }}
      />

      {/* Floating Music Player */}
      <MusicPlayer />

      {/* Cinematic Journey Sections */}
      <HeroSection onStartJourney={startJourney} />
      <GallerySection />
      <MemoriesSection />
      <ReasonsSection />
      <LetterSection />
      <FinalSurprise />
      <Footer />
    </main>
  );
}
