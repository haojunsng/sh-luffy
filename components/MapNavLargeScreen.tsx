import { DynaPuff } from 'next/font/google'
import { useState, useEffect, useRef, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const MOVE_STEP = 20
const SVG_WIDTH = 1600
const SVG_HEIGHT = 900
const dynaPuff = DynaPuff({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
const ZONES = [
  {
    name: 'Hut',
    x: 830,
    y: 680,
    radius: 120,
    href: '/projects',
    label: 'Projects',
  },
  {
    name: 'Volcano',
    x: 1075,
    y: 250,
    radius: 120,
    href: '/about',
    label: 'About',
  },
  {
    name: 'Palms',
    x: 560,
    y: 310,
    radius: 120,
    href: '/blog',
    label: 'Blog',
  },
  {
    name: 'House',
    x: 1350,
    y: 550,
    radius: 120,
    href: '/contact',
    label: 'Contact',
  },
]

export default function MapNavLargeScreen() {
  const [avatarPos, setAvatarPos] = useState({ x: 300, y: 750 })
  const mapRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageRect, setImageRect] = useState({
    left: 0,
    top: 0,
    width: SVG_WIDTH,
    height: SVG_HEIGHT,
  })
  const [containerRect, setContainerRect] = useState({
    left: 0,
    top: 0,
    width: SVG_WIDTH,
    height: SVG_HEIGHT,
  })
  const [activeZone, setActiveZone] = useState<(typeof ZONES)[0] | null>(null)
  const [gauge, setGauge] = useState(0)
  const gaugeDuration = 1000 // ms
  const gaugeInterval = 20 // ms
  const router = useRouter()
  const gaugeRef = useRef<NodeJS.Timeout | null>(null)
  const MUGIWARA = 250

  useEffect(() => {
    function updateRects() {
      if (mapRef.current && containerRef.current) {
        const imgRect = mapRef.current.getBoundingClientRect()
        const contRect = containerRef.current.getBoundingClientRect()
        setImageRect({
          left: imgRect.left,
          top: imgRect.top,
          width: imgRect.width,
          height: imgRect.height,
        })
        setContainerRect({
          left: contRect.left,
          top: contRect.top,
          width: contRect.width,
          height: contRect.height,
        })
      }
    }
    updateRects()
    window.addEventListener('resize', updateRects)
    if (mapRef.current) {
      mapRef.current.onload = updateRects
    }
    return () => window.removeEventListener('resize', updateRects)
  }, [])

  function svgToScreen(x: number, y: number) {
    const scale = Math.min(imageRect.width / SVG_WIDTH, imageRect.height / SVG_HEIGHT)
    const displayWidth = SVG_WIDTH * scale
    const displayHeight = SVG_HEIGHT * scale
    // Offset from container, not viewport
    const offsetX = (containerRect.width - displayWidth) / 2
    const offsetY = (containerRect.height - displayHeight) / 2
    return {
      left: offsetX + x * scale,
      top: offsetY + y * scale,
      scale,
    }
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      setAvatarPos((pos) => {
        if (e.key === 'ArrowRight') return { ...pos, x: Math.min(pos.x + MOVE_STEP, SVG_WIDTH) }
        if (e.key === 'ArrowLeft') return { ...pos, x: Math.max(pos.x - MOVE_STEP, 0) }
        if (e.key === 'ArrowUp') return { ...pos, y: Math.max(pos.y - MOVE_STEP, 0) }
        if (e.key === 'ArrowDown') return { ...pos, y: Math.min(pos.y + MOVE_STEP, SVG_HEIGHT) }
        return pos
      })
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  type MapClickEvent =
    | React.MouseEvent<HTMLDivElement, MouseEvent>
    | {
        clientX: number
        clientY: number
        preventDefault: () => void
      }

  const handleMapClick = (e: MapClickEvent) => {
    if (!mapRef.current || !containerRef.current) return
    const imgRect = mapRef.current.getBoundingClientRect()
    const contRect = containerRef.current.getBoundingClientRect()
    const scale = Math.min(imgRect.width / SVG_WIDTH, imgRect.height / SVG_HEIGHT)
    const displayWidth = SVG_WIDTH * scale
    const displayHeight = SVG_HEIGHT * scale
    const offsetX = (contRect.width - displayWidth) / 2
    const offsetY = (contRect.height - displayHeight) / 2

    const relX = e.clientX - contRect.left
    const relY = e.clientY - contRect.top

    const x = (relX - offsetX) / scale
    const y = (relY - offsetY) / scale
    setAvatarPos({
      x: Math.max(0, Math.min(SVG_WIDTH, x)),
      y: Math.max(0, Math.min(SVG_HEIGHT, y)),
    })
  }

  const isInZone = (zone: (typeof ZONES)[0], pos: typeof avatarPos) =>
    Math.hypot(pos.x - zone.x, pos.y - zone.y) < zone.radius

  // Track which zone mugiwaraya is in
  useEffect(() => {
    const found = ZONES.find((zone) => isInZone(zone, avatarPos)) || null
    setActiveZone(found)
  }, [avatarPos])

  // Gauge logic
  useEffect(() => {
    if (activeZone) {
      if (gaugeRef.current) clearInterval(gaugeRef.current)
      setGauge(0)
      gaugeRef.current = setInterval(() => {
        setGauge((prev) => {
          if (prev >= 100) {
            if (gaugeRef.current) clearInterval(gaugeRef.current)
            return 100
          }
          return prev + 100 / (gaugeDuration / gaugeInterval)
        })
      }, gaugeInterval)
    } else {
      if (gaugeRef.current) clearInterval(gaugeRef.current)
      setGauge(0)
    }
    return () => {
      if (gaugeRef.current) clearInterval(gaugeRef.current)
    }
  }, [activeZone])

  useEffect(() => {
    if (gauge >= 100 && activeZone) {
      router.push(activeZone.href)
    }
  }, [gauge])

  return (
    <div
      ref={containerRef}
      className={'fixed relative inset-0 z-0 m-0 h-screen w-screen bg-white p-0 dark:bg-gray-950'}
      style={{ overflow: 'hidden' }}
    >
      <div
        tabIndex={0}
        role="button"
        aria-label="Move Luffy by clicking or pressing Enter/Space on the map"
        onClick={handleMapClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (mapRef.current && containerRef.current) {
              const contRect = containerRef.current.getBoundingClientRect()
              const fakeEvent = {
                clientX: contRect.left + contRect.width / 2,
                clientY: contRect.top + contRect.height / 2,
                preventDefault: () => {},
              }
              // @ts-ignore
              handleMapClick(fakeEvent)
            }
          }
        }}
        className="absolute inset-0 h-full w-full"
        style={{ display: 'block' }}
      >
        <img
          ref={mapRef}
          src="/static/images/one-piece.svg"
          alt="One Piece Map"
          className="h-full w-full object-contain"
          draggable={false}
          style={{ pointerEvents: 'none' }}
        />
      </div>
      {ZONES.map((zone) => {
        const avatarInZone = isInZone(zone, avatarPos)
        const { left, top, scale } = svgToScreen(zone.x, zone.y)
        return (
          <Fragment key={zone.name}>
            {/* Glowing zone */}
            <motion.div
              style={{
                position: 'absolute',
                left: left - zone.radius * scale,
                top: top - zone.radius * scale,
                width: zone.radius * 2 * scale,
                height: zone.radius * 2 * scale,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 20,
              }}
              animate={{
                boxShadow: avatarInZone ? '0 0 40px 20px #fbbf24, 0 0 80px 40px #fde68a' : 'none',
                opacity: avatarInZone ? 0.7 : 0.2,
              }}
              transition={{
                duration: 0.3,
                type: 'spring',
              }}
            />
            {/* Label */}
            <div
              className={`${dynaPuff.className} pointer-events-none absolute z-30 rounded-lg border-2 border-yellow-300 bg-black/50 px-2 py-1 font-bold text-yellow-200 sm:px-4 sm:py-2`}
              style={{
                left: left - 50 * scale,
                top: top - 150 * scale,
                textShadow: '2px 2px 6px #000, 0 0 8px #FFD700',
                fontSize: `${Math.max(12, Math.min(40, 28 * scale))}px`,
                padding: `${Math.max(2, Math.min(12, 6 * scale))}px ${Math.max(6, Math.min(32, 16 * scale))}px`,
              }}
            >
              {zone.label}
            </div>
            {/* Gauge bar */}
            {activeZone && activeZone.name === zone.name && (
              <div
                className="absolute z-40 overflow-hidden rounded-lg border-2 border-yellow-300 bg-black/70 shadow-lg"
                style={{
                  left: left - 60 * scale,
                  top: top - 100 * scale,
                  width: `${Math.max(40, Math.min(200, 120 * scale))}px`,
                  height: `${Math.max(6, Math.min(24, 16 * scale))}px`,
                }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-200 to-yellow-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${gauge}%` }}
                  transition={{ duration: gaugeInterval / 1000, ease: 'linear' }}
                />
              </div>
            )}
          </Fragment>
        )
      })}
      {/* Mugiwara */}
      {(() => {
        const { left, top, scale } = svgToScreen(avatarPos.x, avatarPos.y)
        return (
          <motion.img
            src="/static/images/chibi-luffy.png"
            alt="Luffy Avatar"
            className="pointer-events-none absolute h-20 w-20 sm:h-28 sm:w-28 lg:h-48 lg:w-48"
            style={{
              left: left - (MUGIWARA / 2) * scale,
              top: top - (MUGIWARA / 2) * scale,
              width: MUGIWARA * scale,
              height: MUGIWARA * scale,
            }}
            animate={{
              left: left - (MUGIWARA / 2) * scale,
              top: top - (MUGIWARA / 2) * scale,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 30,
            }}
          />
        )
      })()}
    </div>
  )
}
