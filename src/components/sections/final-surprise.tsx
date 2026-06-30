"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function FinalSurprise() {
  const [step, setStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const startSequence = () => {
    if (hasStarted) return;
    setHasStarted(true);
    setStep(1); // I Love You ❤️
  };

  useEffect(() => {
    if (!hasStarted || step === 0) return;

    let timer: NodeJS.Timeout;

    if (step === 1) {
      timer = setTimeout(() => setStep(2), 3000); // Happy Birthday
    } else if (step === 2) {
      timer = setTimeout(() => setStep(3), 3000); // You Mean Everything To Me
    } else if (step === 3) {
      timer = setTimeout(() => setStep(4), 3000); // Forever & Always
    } else if (step === 4) {
      timer = setTimeout(() => {
        setStep(5); // Golden Confetti & Bright Background
        triggerGoldConfetti();
      }, 3500);
    }

    return () => clearTimeout(timer);
  }, [step, hasStarted]);

  const triggerGoldConfetti = () => {
    const end = Date.now() + 6 * 1000;
    const colors = ["#FEF08A", "#F59E0B", "#D97706", "#FFF0F5", "#B76E79"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const textVariants = {
    initial: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    animate: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 1.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 1.1, 
      filter: "blur(8px)",
      transition: { duration: 1, ease: "easeIn" }
    }
  };

  return (
    <div
      ref={containerRef}
      id="final-surprise-section"
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden transition-all duration-[3000ms] ${
        step === 5 
          ? "bg-gradient-to-b from-[#180922] via-[#2f143a] to-[#180922] shadow-[inset_0_0_100px_rgba(245,158,11,0.15)]" 
          : "bg-black"
      }`}
    >
      {/* Background Soft Floating Gold Particles (Step 5 only) */}
      {step === 5 && <GoldParticlesBackground />}

      {/* Glow spots when brightened */}
      {step === 5 && (
        <>
          <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] bg-romantic-gold/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-romantic-pink/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        </>
      )}

      {/* Viewport trigger */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        onViewportEnter={startSequence}
        viewport={{ once: true, margin: "-100px" }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.h2
              key="step1"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-4xl md:text-7xl lg:text-8xl font-bold font-serif text-white text-glow-pink tracking-wider"
            >
              I Love You ❤️
            </motion.h2>
          )}

          {step === 2 && (
            <motion.h2
              key="step2"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-4xl md:text-7xl lg:text-8xl font-bold font-serif text-white text-glow-pink tracking-wider"
            >
              Happy Birthday
            </motion.h2>
          )}

          {step === 3 && (
            <motion.h2
              key="step3"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-white text-glow-pink tracking-wide leading-tight"
            >
              You Mean Everything To Me
            </motion.h2>
          )}

          {step === 4 && (
            <motion.h2
              key="step4"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-4xl md:text-7xl lg:text-8xl font-bold font-serif text-white text-glow-pink tracking-wider"
            >
              Forever & Always
            </motion.h2>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Gold heart element */}
              <div className="w-24 h-24 rounded-full bg-romantic-gold/20 flex items-center justify-center mb-8 border border-romantic-gold shadow-lg shadow-romantic-gold/10 animate-bounce">
                <span className="text-4xl">👑</span>
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-romantic-gold-light via-white to-romantic-pink-light tracking-wide text-glow-gold">
                To My Forever
              </h2>

              <p className="text-sm md:text-lg text-romantic-pink-light/80 font-sans font-light tracking-widest max-w-xl mt-6 leading-relaxed">
                May your day be filled with as much light, joy, and beauty as you bring into my life every single day.
              </p>

              <button
                onClick={triggerGoldConfetti}
                className="mt-12 px-6 py-3 rounded-full font-sans tracking-wider text-xs font-bold bg-gradient-to-r from-romantic-gold to-romantic-roseGold text-white hover:scale-105 transition-transform duration-300 shadow-md shadow-romantic-gold/20"
              >
                SPARK CELEBRATION ✨
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function GoldParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      decay: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 2.5 + 1.5,
      speedY: -(Math.random() * 1.5 + 0.8),
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.5,
      decay: Math.random() * 0.002 + 0.001
    });

    // populate initial particles
    for (let i = 0; i < 40; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.length < 60 && Math.random() < 0.15) {
        particles.push(createParticle());
      }

      particles.forEach((p, idx) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha -= p.decay;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`; // gold
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(245, 158, 11, 0.4)";
        ctx.fill();

        if (p.y < -10 || p.alpha <= 0) {
          particles[idx] = createParticle();
        }
      });

      ctx.shadowBlur = 0; // reset
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
