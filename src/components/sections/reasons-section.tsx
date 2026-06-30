"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Laugh, Shield, Smile, HeartHandshake } from "lucide-react";

interface Reason {
  title: string;
  icon: React.ReactNode;
  text: string;
}

export function ReasonsSection() {
  const reasons: Reason[] = [
    {
      title: "Your Smile",
      icon: <Heart className="w-10 h-10 text-romantic-pink-dark" />,
      text: "It has this magical ability to instantly brighten my darkest days and make everything feel perfect. A single smile from you makes the whole world fade away."
    },
    {
      title: "Your Kindness",
      icon: <Sparkles className="w-10 h-10 text-romantic-lavender-dark" />,
      text: "The way you care for everyone around you, showing endless warmth and compassion. You make this world a gentler, more beautiful place to live in."
    },
    {
      title: "Your Laugh",
      icon: <Laugh className="w-10 h-10 text-romantic-gold" />,
      text: "It is the sweetest melody I've ever heard. Hearing it instantly brings a smile to my face and fills my heart with absolute warmth and pure joy."
    },
    {
      title: "Your Support",
      icon: <Shield className="w-10 h-10 text-romantic-roseGold" />,
      text: "You are my anchor. No matter what challenges arise, you believe in me, encourage me, stand by my side, and give me the strength to keep going."
    },
    {
      title: "Your Goofy Side",
      icon: <Smile className="w-10 h-10 text-romantic-pink" />,
      text: "All your silly jokes, funny faces, and spontaneous dances that make life an absolute adventure. You remind me never to take things too seriously."
    },
    {
      title: "Everything",
      icon: <HeartHandshake className="w-10 h-10 text-romantic-roseGold-light" />,
      text: "From your greatest achievements to your tiniest quirks, I love every single piece of who you are. You are my home, my peace, and my favorite adventure."
    }
  ];

  return (
    <section id="reasons-section" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#090514] via-[#090513] to-[#090514] relative overflow-hidden">
      {/* Background decoration flares */}
      <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-romantic-pink/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[35%] right-[20%] w-[350px] h-[350px] bg-romantic-lavender/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs md:text-sm tracking-[0.3em] font-sans font-light text-romantic-pink-dark">SECTION 4</span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mt-2 tracking-wide text-white text-glow-pink">
            Reasons I Love You
          </h2>
          <div className="w-16 h-[1px] bg-romantic-roseGold/40 mx-auto mt-4" />
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <FlipCard key={idx} reason={reason} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ reason }: { reason: Reason }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full h-[320px] cursor-pointer perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl glassmorphism border border-white/10 flex flex-col items-center justify-center p-6 text-center select-none"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 shadow-inner border border-white/5">
            {reason.icon}
          </div>
          <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
            {reason.title}
          </h3>
          <p className="text-xs text-romantic-pink-light/50 tracking-widest mt-4 uppercase">
            Hover to Reveal
          </p>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-romantic-pink/10 via-romantic-lavender/5 to-[#0b061b] border border-romantic-pink-dark/25 p-8 flex flex-col items-center justify-center text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "inset 0 0 20px rgba(255, 183, 197, 0.05)"
          }}
        >
          <Heart className="w-8 h-8 text-romantic-pink-dark mb-4 animate-pulse" />
          <p className="text-sm md:text-base text-romantic-pink-light/95 font-sans font-light leading-relaxed">
            {reason.text}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
