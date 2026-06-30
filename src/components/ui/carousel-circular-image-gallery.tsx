"use client"

import { useState, useEffect, useRef, useCallback } from "react"

declare global {
  interface Window {
    gsap: any
    MotionPathPlugin: any
  }
}

export interface GalleryMediaItem {
  title: string
  url: string
  type?: "image" | "video"
}

interface ImageGalleryProps {
  items: GalleryMediaItem[]
}

// Main component for the Image/Video Gallery
export function ImageGallery({ items }: ImageGalleryProps) {
  const [opened, setOpened] = useState(0)
  const [inPlace, setInPlace] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [gsapReady, setGsapReady] = useState(false)
  const autoplayTimer = useRef<number | null>(null)

  useEffect(() => {
    // This effect loads the GSAP library and its plugin from a CDN.
    const loadScripts = () => {
      if (window.gsap && window.MotionPathPlugin) {
        window.gsap.registerPlugin(window.MotionPathPlugin)
        setGsapReady(true)
        return
      }

      const gsapScript = document.createElement("script")
      gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
      gsapScript.onload = () => {
        const motionPathScript = document.createElement("script")
        motionPathScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"
        motionPathScript.onload = () => {
          if (window.gsap && window.MotionPathPlugin) {
            window.gsap.registerPlugin(window.MotionPathPlugin)
            setGsapReady(true)
          }
        }
        document.body.appendChild(motionPathScript)
      }
      document.body.appendChild(gsapScript)
    }

    loadScripts()
  }, [])

  const onClick = (index: number) => {
    if (!disabled) setOpened(index)
  }

  const onInPlace = (index: number) => setInPlace(index)

  const next = useCallback(() => {
    setOpened((currentOpened) => {
      let nextIndex = currentOpened + 1
      if (nextIndex >= items.length) nextIndex = 0
      return nextIndex
    })
  }, [items.length])

  const prev = useCallback(() => {
    setOpened((currentOpened) => {
      let prevIndex = currentOpened - 1
      if (prevIndex < 0) prevIndex = items.length - 1
      return prevIndex
    })
  }, [items.length])

  // Disable clicks during animation transitions
  useEffect(() => setDisabled(true), [opened])
  useEffect(() => {
    const timer = setTimeout(() => {
      setInPlace(opened)
      setDisabled(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [opened])

  // Autoplay and timer reset logic
  useEffect(() => {
    if (!gsapReady || items.length <= 1) return

    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current)
    }

    autoplayTimer.current = window.setInterval(next, 5000)

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current)
      }
    }
  }, [opened, gsapReady, next, items.length])

  return (
    <div className="flex items-center justify-center min-h-[600px] w-full font-sans relative">
      <div className="relative h-[80vmin] w-[80vmin] max-h-[500px] max-w-[500px] md:max-h-[600px] md:max-w-[600px] overflow-hidden rounded-[20px] shadow-[0_2.8px_2.2px_rgba(255,183,197,0.02),0_6.7px_5.3px_rgba(255,183,197,0.03),0_12.5px_10px_rgba(255,183,197,0.04),0_22.3px_17.9px_rgba(255,183,197,0.05),0_41.8px_33.4px_rgba(255,183,197,0.06),0_100px_80px_rgba(255,183,197,0.08)] bg-black/40 border border-white/10 backdrop-blur-md">
        {items.map((item, i) => (
          <div
            key={item.url}
            className="absolute left-0 top-0 h-full w-full transition-opacity duration-500"
            style={{ 
              zIndex: inPlace === i ? 10 : i,
              opacity: inPlace === i ? 1 : 0
            }}
          >
            <GalleryImage
              total={items.length}
              id={i}
              url={item.url}
              type={item.type || "image"}
              title={item.title}
              open={opened === i}
              inPlace={inPlace === i}
              onInPlace={onInPlace}
            />
          </div>
        ))}
        <div className="absolute left-0 top-0 z-[100] h-full w-full pointer-events-none">
          <Tabs items={items} onSelect={onClick} />
        </div>
      </div>

      <button
        className="absolute left-4 md:left-[calc(50%-40vmin-40px)] lg:left-[calc(50%-300px-50px)] top-1/2 z-[101] flex h-12 w-12 sm:h-16 sm:w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-romantic-pink/30 bg-[#090514]/80 backdrop-blur-md shadow-lg outline-none transition-all duration-300 ease-out hover:scale-110 hover:bg-[#090514] hover:border-romantic-pink/60 active:scale-95 disabled:opacity-40"
        onClick={prev}
        disabled={disabled}
        aria-label="Previous Image"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-romantic-pink-light"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        className="absolute right-4 md:right-[calc(50%-40vmin-40px)] lg:right-[calc(50%-300px-50px)] top-1/2 z-[101] flex h-12 w-12 sm:h-16 sm:w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-romantic-pink/30 bg-[#090514]/80 backdrop-blur-md shadow-lg outline-none transition-all duration-300 ease-out hover:scale-110 hover:bg-[#090514] hover:border-romantic-pink/60 active:scale-95 disabled:opacity-40"
        onClick={next}
        disabled={disabled}
        aria-label="Next Image"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-romantic-pink-light"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}

interface GalleryImageProps {
  url: string
  type: "image" | "video"
  title: string
  open: boolean
  inPlace: boolean
  id: number
  onInPlace: (id: number) => void
  total: number
}

function GalleryImage({ url, type, title, open, inPlace, id, onInPlace, total }: GalleryImageProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  // --- Video playback control ---
  useEffect(() => {
    const video = videoRef.current
    if (type !== "video" || !video) return

    if (inPlace) {
      // readyState >= 3 means HAVE_FUTURE_DATA — enough data to play
      if (video.readyState >= 3) {
        setIsLoading(false)
        video.play().catch(() => {})
      } else {
        // Show spinner while buffering
        setIsLoading(true)
        const onCanPlay = () => {
          setIsLoading(false)
          video.play().catch(() => {})
        }
        const onWaiting = () => setIsLoading(true)
        const onPlaying = () => setIsLoading(false)
        video.addEventListener("canplay", onCanPlay, { once: true })
        video.addEventListener("waiting", onWaiting)
        video.addEventListener("playing", onPlaying)
        // If network is idle (nothing loading), kick off a load
        if (video.networkState === HTMLMediaElement.NETWORK_IDLE ||
            video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
          video.load()
        }
        return () => {
          video.removeEventListener("canplay", onCanPlay)
          video.removeEventListener("waiting", onWaiting)
          video.removeEventListener("playing", onPlaying)
        }
      }
    } else {
      setIsLoading(false)
      video.pause()
    }
  }, [inPlace, type])

  return (
    <div className="relative w-full h-full">
      {type === "video" ? (
        <div className="w-full h-full bg-black">
          <video
            ref={videoRef}
            src={url}
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          {/* Loading spinner shown while video is buffering */}
          {inPlace && isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-romantic-pink animate-spin" />
                <span className="text-xs text-white/50 font-sans tracking-widest">Loading…</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <img
          src={url}
          alt={title}
          className="w-full h-full object-cover"
        />
      )}

      {/* Title overlay (Only when fully in place) */}
      {inPlace && (
        <div className="absolute bottom-12 left-0 w-full text-center px-6 pointer-events-none">
          <h4 className="text-lg md:text-xl font-serif font-bold text-white text-glow-pink select-none bg-black/40 backdrop-blur-sm py-1.5 px-4 rounded-full inline-block">
            {title}
          </h4>
        </div>
      )}
    </div>
  )
}

interface TabsProps {
  items: GalleryMediaItem[]
  onSelect: (index: number) => void
}

function Tabs({ items, onSelect }: TabsProps) {
  const gap = 10
  const circleRadius = 7
  const width = 400
  const height = 400

  const getPosX = (i: number) =>
    width / 2 - (items.length * (circleRadius * 2 + gap) - gap) / 2 + i * (circleRadius * 2 + gap)
  const getPosY = () => height - 30

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      {items.map((item, i) => (
        <g key={item.url} className="pointer-events-auto">
          <defs>
            <clipPath id={`tab_${i}_clip`}>
              <circle cx={getPosX(i)} cy={getPosY()} r={circleRadius} />
            </clipPath>
          </defs>
          
          {item.type === "video" ? (
            <foreignObject
              x={getPosX(i) - circleRadius}
              y={getPosY() - circleRadius}
              width={circleRadius * 2}
              height={circleRadius * 2}
              clipPath={`url(#tab_${i}_clip)`}
            >
              <div className="w-full h-full bg-[#B76E79] flex items-center justify-center text-[6px] text-white">
                ▶
              </div>
            </foreignObject>
          ) : (
            <image
              x={getPosX(i) - circleRadius}
              y={getPosY() - circleRadius}
              width={circleRadius * 2}
              height={circleRadius * 2}
              href={item.url}
              clipPath={`url(#tab_${i}_clip)`}
              className="pointer-events-none"
              preserveAspectRatio="xMidYMid slice"
            />
          )}

          <circle
            onClick={() => onSelect(i)}
            className="cursor-pointer fill-white/0 stroke-white/70 hover:stroke-white/100 transition-all"
            strokeWidth="2"
            cx={getPosX(i)}
            cy={getPosY()}
            r={circleRadius + 2}
          />
        </g>
      ))}
    </svg>
  )
}
