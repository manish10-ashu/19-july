"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function HeroSection({ onStartJourney }: { onStartJourney: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      alphaSpeed: number;
    }> = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Initialize particles
    const particleCount = 100;
    const colors = [
      "rgba(255, 183, 197, ", // Pink
      "rgba(233, 213, 255, ", // Lavender
      "rgba(254, 240, 138, ", // Gold
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.2, // Drifting upwards
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random(),
        alphaSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soft ambient background lighting spots
      const gradientPink = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.4,
        0,
        canvas.width * 0.3,
        canvas.height * 0.4,
        canvas.width * 0.5
      );
      gradientPink.addColorStop(0, "rgba(255, 183, 197, 0.08)");
      gradientPink.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradientPink;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradientGold = ctx.createRadialGradient(
        canvas.width * 0.7,
        canvas.height * 0.6,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        canvas.width * 0.5
      );
      gradientGold.addColorStop(0, "rgba(254, 240, 138, 0.05)");
      gradientGold.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradientGold;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = canvas.height;

        // Animate opacity (sparkle effect)
        p.alpha += p.alphaSpeed;
        if (p.alpha <= 0.1 || p.alpha >= 0.9) {
          p.alphaSpeed = -p.alphaSpeed;
        }
        // Clamping alpha
        p.alpha = Math.max(0.1, Math.min(0.9, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255, 183, 197, 0.5)";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for efficiency
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#090514] via-[#0d071d] to-[#090514]">
      {/* Sparkle background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Romantic glow spheres */}
      <div className="absolute top-[20%] left-[25%] w-[350px] h-[350px] bg-romantic-pink/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-romantic-lavender/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        {/* Rose Gold Premium Accent Bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-romantic-roseGold to-transparent mb-8"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif mb-6 tracking-wide bg-gradient-to-r from-white via-romantic-pink-light to-romantic-lavender-light bg-clip-text text-transparent drop-shadow-sm select-none"
        >
          Happy Birthday, Beibe ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl lg:text-2xl text-romantic-pink-light/75 font-sans font-light tracking-widest max-w-2xl mb-12 select-none"
        >
          Today the world celebrates the most beautiful person in my life.
        </motion.p>

        <motion.button
          onClick={onStartJourney}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 183, 197, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4 }}
          className="relative px-8 py-4 rounded-full font-sans tracking-widest text-sm font-semibold glassmorphism-pink text-white hover:border-romantic-pink/40 transition-all duration-300 group overflow-hidden"
          style={{
            border: "1px solid rgba(255, 183, 197, 0.25)",
            boxShadow: "0 0 15px rgba(255, 183, 197, 0.15)",
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-romantic-pink/20 to-romantic-lavender/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-2">
            START THE JOURNEY
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </span>
        </motion.button>
      </div>

      {/* Premium subtle bottom decoration */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <span className="text-[10px] tracking-[0.25em] font-sans font-light text-romantic-pink-light/60">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-6 bg-romantic-pink/30"
        />
      </div>
    </section>
  );
}
