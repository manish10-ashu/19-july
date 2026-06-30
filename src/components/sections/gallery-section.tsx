"use client";

import React from "react";
import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery";

const romanticGalleryData: GalleryItem[] = [
  {
    common: "Where It All Began",
    binomial: "June 26, 2022 ❤️",
    photo: {
      url: "/images/IMG_20220626_114016_0937.jpg",
      text: "First sweet moment together",
      pos: "center",
      by: "Love"
    }
  },
  {
    common: "Stolen Moments",
    binomial: "November 20, 2024 ☕",
    photo: {
      url: "/images/IMG-20241120-WA0013.jpg",
      text: "A beautiful day recorded in our hearts",
      pos: "center",
      by: "Love"
    }
  },
  {
    common: "Sweet Winter Nights",
    binomial: "February 04, 2025 ❄️",
    photo: {
      url: "/images/IMG-20250204-WA0044.jpg",
      text: "Cozying up against the winter chill",
      pos: "center",
      by: "Love"
    }
  },
  {
    common: "Springtime Smiles",
    binomial: "March 14, 2025 🌸",
    photo: {
      url: "/images/IMG-20250314-WA0022.jpg",
      text: "Radiant smiles under the spring sun",
      pos: "center",
      by: "Love"
    }
  },
  {
    common: "Chasing Sunsets",
    binomial: "May 04, 2025 🌅",
    photo: {
      url: "/images/IMG-20250504-WA0025.jpg",
      text: "Chasing sunset skies hand in hand",
      pos: "center",
      by: "Love"
    }
  },
  {
    common: "Beautiful Escapes",
    binomial: "May 25, 2025 🌿",
    photo: {
      url: "/images/IMG-20250525-WA0029.jpg",
      text: "Exploring the serene beauty together",
      pos: "center",
      by: "Love"
    }
  },
  {
    common: "Happy Times",
    binomial: "May 25, 2025 🎉",
    photo: {
      url: "/images/IMG-20250525-WA0044.jpg",
      text: "Pure joy captured on a sunny afternoon",
      pos: "center",
      by: "Love"
    }
  },
  {
    common: "Glow of Spring",
    binomial: "April 27, 2026 ✨",
    photo: {
      url: "/images/IMG-20260427-WA0015.jpg",
      text: "Basking in the golden evening light",
      pos: "center",
      by: "Love"
    }
  },
  {
    common: "Warm Embrace",
    binomial: "June 13, 2026 💫",
    photo: {
      url: "/images/IMG-20260613-WA0048.jpg",
      text: "Your arms, my favorite place in the world",
      pos: "center",
      by: "Love"
    }
  },
  {
    common: "Our Favorite Day",
    binomial: "June 20, 2026 🎈",
    photo: {
      url: "/images/IMG-20260620-WA0023.jpg",
      text: "Celebrating us and our beautiful story",
      pos: "center",
      by: "Love"
    }
  },
  {
    common: "Pure Magic",
    binomial: "Forever & Always 💞",
    photo: {
      url: "/images/file_00000000f91871fbab76988c334f7b6b.png",
      text: "A magical memories compilation frame",
      pos: "center",
      by: "Love"
    }
  }
];

export function GallerySection() {
  return (
    <div id="gallery-section" className="w-full bg-gradient-to-b from-[#090514] via-[#0b0617] to-[#090514] relative" style={{ height: "450vh" }}>
      {/* Sticky viewport container */}
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        {/* Soft background lighting */}
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-romantic-lavender/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-romantic-pink/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Section title */}
        <div className="text-center mb-8 absolute top-12 md:top-16 z-10 px-6">
          <span className="text-xs md:text-sm tracking-[0.3em] font-sans font-light text-romantic-pink-dark">SECTION 2</span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mt-2 tracking-wide text-white text-glow-pink">
            3D Memory Gallery
          </h2>
          <p className="text-xs md:text-sm text-romantic-pink-light/60 font-sans font-light tracking-widest mt-2">
            Scroll to rotate our beautiful moments together
          </p>
        </div>

        {/* 3D Gallery Component */}
        <div className="w-full h-full pt-16 flex items-center justify-center">
          <CircularGallery items={romanticGalleryData} radius={500} autoRotateSpeed={0.015} />
        </div>
      </div>
    </div>
  );
}
