"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full py-12 bg-[#090514] border-t border-white/5 flex flex-col items-center justify-center relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-romantic-pink/5 opacity-50" />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <p className="font-serif italic text-sm md:text-base text-romantic-pink-light/70 tracking-widest">
          Made with all my love ❤️
        </p>
        <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-white/20 mt-1">
          © {new Date().getFullYear()} • Forever & Always
        </p>
      </div>
    </footer>
  );
}
