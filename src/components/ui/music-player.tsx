"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [hovered, setHovered] = useState(false);

  // Play the song "Aarzu"
  const audioSrc = "/audio/aarzu.mp3";

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn("Autoplay block or loading error:", e);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMute = !isMuted;
    audioRef.current.muted = newMute;
    setIsMuted(newMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={audioSrc} loop />
      <motion.div
        className="glassmorphism-pink px-4 py-3 rounded-full flex items-center gap-3 shadow-xl backdrop-blur-xl transition-all duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          border: "1px solid rgba(255, 183, 197, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(255, 183, 197, 0.15)",
        }}
      >
        <div className="w-8 h-8 rounded-full bg-romantic-roseGold/20 flex items-center justify-center animate-pulse">
          <Music className="w-4 h-4 text-romantic-pink-dark" />
        </div>

        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-romantic-pink-dark to-romantic-roseGold text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform duration-200"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current translate-x-[1px]" />
          )}
        </button>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <button
                onClick={toggleMute}
                className="text-romantic-pink hover:text-white transition-colors duration-200"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-romantic-pink cursor-pointer h-1 rounded-lg bg-white/20"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
