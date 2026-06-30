"use client";

import React from "react";
import { motion } from "framer-motion";

export function LetterSection() {
  return (
    <section id="letter-section" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#090514] via-[#0b0618] to-[#090514] relative overflow-hidden flex items-center justify-center">
      {/* Background glow spots */}
      <div className="absolute top-[25%] left-[25%] w-[400px] h-[400px] bg-romantic-pink/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[25%] right-[25%] w-[350px] h-[350px] bg-romantic-lavender/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs md:text-sm tracking-[0.3em] font-sans font-light text-romantic-pink-dark">SECTION 5</span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mt-2 tracking-wide text-white text-glow-pink">
            Love Letter
          </h2>
          <div className="w-16 h-[1px] bg-romantic-roseGold/40 mx-auto mt-4" />
        </div>

        {/* Floating Paper Container */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto rounded-3xl p-8 md:p-14 border shadow-2xl overflow-hidden glassmorphism-pink"
          style={{
            borderColor: "rgba(255, 183, 197, 0.15)",
            background: "rgba(255, 255, 255, 0.02)",
            boxShadow: "0 25px 60px -15px rgba(255, 183, 197, 0.12)",
          }}
        >
          {/* Subtle rose illustration overlay in background */}
          <div className="absolute top-8 right-8 w-24 h-24 opacity-5 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-white">
              <path d="M12 2C11.5 2 10 3 10 5C10 7.5 12 9.5 12 11C12 12.5 10 13 8 13C6 13 4.5 11.5 4.5 9.5C4.5 7.5 6 6.5 8 6.5C9 6.5 9.5 7 10 7" />
              <path d="M12 11C12 12.5 14 13 16 13C18 13 19.5 11.5 19.5 9.5C19.5 7.5 18 6.5 16 6.5C15 6.5 14.5 7 14 7" />
              <path d="M12 11V22" />
              <path d="M12 14C10 15 9 17 9 18" />
              <path d="M12 16C14 17 15 19 15 20" />
            </svg>
          </div>

          {/* Letter Content */}
          <div className="relative z-10 font-sans font-light text-romantic-pink-light/90 leading-relaxed text-sm md:text-base space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold italic text-white mb-2">
                A Letter From My Heart
              </h3>
              <div className="w-12 h-[1px] bg-romantic-roseGold/60" />
            </div>

            <p>
              My Dearest,
            </p>

            <p>
              From the moment you walked into my life, everything changed. You brought a warmth and a light that I didn't know was missing, and every single day since then has been a beautiful gift. The way you smile, the sound of your laughter, and the gentle kindness you show to everyone around you inspires me in ways words can't fully express.
            </p>

            <p>
              [On your birthday, I don't just want to wish you happiness. I want to thank you. Thank you for choosing me every day. Thank you for standing beside me for the last four years. Thank you for believing in me, even when I struggled to believe in myself.

I don't know what the future has planned for us, but I know one thing for certain: these four years have been some of the most meaningful years of my life because you were in them.]
            </p>

        

            <p className="pt-6">
              Thank you for being my peace, my partner, and my favorite adventure. Today is all about celebrating you.
            </p>

            <div className="pt-8 flex flex-col items-end">
              <p className="font-serif italic text-lg text-white">Forever & Always,</p>
              <p className="font-serif text-romantic-pink-dark font-bold text-xl mt-1 tracking-widest">ASHU</p>
            </div>
          </div>

          {/* Soft light decorative line */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-romantic-roseGold/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
