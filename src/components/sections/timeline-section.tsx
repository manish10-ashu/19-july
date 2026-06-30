"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Phone, Calendar, Star, Heart } from "lucide-react";

interface TimelineEvent {
  icon: React.ReactNode;
  title: string;
  date: string;
  description: string;
}

const events: TimelineEvent[] = [
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: "First Message",
    date: "June 12, 2022",
    description: "A simple message that started it all. We clicked instantly, talking for hours and sharing our worlds."
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    title: "First Date",
    date: "June 26, 2022",
    description: "Meeting face-to-face. The butterflies in my stomach and the realization that you were even more special than I imagined."
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Winter Nights",
    date: "Feb 04, 2025",
    description: "Cold winter evenings turned warm through long phone calls and promises of growing together through the seasons."
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Favorite Adventures",
    date: "May 25, 2025",
    description: "Exploring new paths and sharing sweet escapes. Building a beautiful library of memories, one step at a time."
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Today",
    date: "Today ❤️",
    description: "Celebrating another beautiful year of your life. Grateful for our beautiful past and excited for our infinite future."
  }
];

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // We can track scroll progress of this section to animate a glowing timeline indicator
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section ref={containerRef} id="timeline-section" className="py-24 bg-gradient-to-b from-[#090514] via-[#0a0618] to-[#090514] relative overflow-hidden">
      {/* Background soft lighting */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-romantic-lavender/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-romantic-pink/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs md:text-sm tracking-[0.3em] font-sans font-light text-romantic-pink-dark">SECTION 6</span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mt-2 tracking-wide text-white text-glow-pink">
            Our Journey
          </h2>
          <div className="w-16 h-[1px] bg-romantic-roseGold/40 mx-auto mt-4" />
        </div>

        {/* Timeline Path Container - Horizontal Scrolling Layout */}
        <div className="relative w-full overflow-x-auto no-scrollbar py-12 px-4 flex gap-12 snap-x snap-mandatory">
          
          {/* Connecting glowing bar */}
          <div className="absolute top-[88px] left-[150px] right-[150px] h-[2px] bg-white/10 hidden md:block">
            <motion.div 
              style={{ scaleX: pathLength, originX: 0 }}
              className="w-full h-full bg-gradient-to-r from-romantic-pink via-romantic-roseGold to-romantic-lavender shadow-[0_0_8px_rgba(255,183,197,0.8)]"
            />
          </div>

          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
              className="flex-shrink-0 w-[280px] md:w-[320px] snap-center flex flex-col items-center text-center relative"
            >
              {/* Event node indicator */}
              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-romantic-pink-dark to-romantic-roseGold text-white shadow-lg border-4 border-[#090514] mb-6 hover:scale-110 transition-transform duration-300">
                {event.icon}
              </div>

              {/* Event details card */}
              <div 
                className="w-full rounded-2xl p-6 glassmorphism border border-white/5 shadow-xl hover:border-romantic-pink/20 transition-all duration-300"
                style={{
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)"
                }}
              >
                <span className="text-xs font-sans tracking-widest text-romantic-pink font-semibold">
                  {event.date}
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-2 mb-3">
                  {event.title}
                </h3>
                <p className="text-xs md:text-sm text-romantic-pink-light/75 font-sans font-light leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Horizontal scroll indicator for mobile */}
        <div className="flex justify-center gap-1 mt-8 md:hidden">
          {events.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
          ))}
        </div>
      </div>
    </section>
  );
}
