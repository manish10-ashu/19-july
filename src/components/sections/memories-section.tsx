"use client";

import React from "react";
import { ImageGallery, GalleryMediaItem } from "@/components/ui/carousel-circular-image-gallery";

const mediaItems: GalleryMediaItem[] = [
  {
    title: "Summer Days ☀️",
    url: "/videos/VID_20250915_174426.mp4",
    type: "video"
  },
  {
    title: "Laughing Together 💕",
    url: "/videos/VID-20260514-WA0042.mp4",
    type: "video"
  },
  {
    title: "Beautiful Escapes 🌿",
    url: "/videos/VID-20250515-WA0025.mp4",
    type: "video"
  },
  {
    title: "Sweet Moments ✨",
    url: "/videos/VID-20260604-WA0041.mp4",
    type: "video"
  },
  {
    title: "Celebrating Us 🎉",
    url: "/videos/VID-20260628-WA0032.mp4",
    type: "video"
  }
];

export function MemoriesSection() {
  return (
    <section id="memories-section" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#090514] via-[#0c071d] to-[#090514] relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Background glow flares */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-romantic-pink/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-romantic-lavender/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs md:text-sm tracking-[0.3em] font-sans font-light text-romantic-pink-dark">SECTION 3</span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mt-2 tracking-wide text-white text-glow-pink">
            Our Memories
          </h2>
          <p className="text-xs md:text-sm text-romantic-pink-light/60 font-sans font-light tracking-widest mt-2 max-w-md mx-auto">
            A beautiful rotating collection of our favorite moments and video clips
          </p>
          <div className="w-16 h-[1px] bg-romantic-roseGold/40 mx-auto mt-4" />
        </div>

        {/* Circular image/video gallery */}
        <div className="w-full flex items-center justify-center">
          <ImageGallery items={mediaItems} />
        </div>
      </div>
    </section>
  );
}
