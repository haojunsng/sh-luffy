import { DynaPuff } from 'next/font/google'
import { useState, useEffect, useRef, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

type Zone = {
  name: string
  x: number
  y: number
  radius: number
  href: string
  label: string
}

type MapNavProps = {
  svgWidth: number
  svgHeight: number
  zones: Zone[]
  avatarStartPos: { x: number; y: number }
  mugiwara: number
  containerClassName: string
  innerDivClassName?: string
  imageSrc: string
  imageAlt: string
}

const dynaPuff = DynaPuff({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function MapNav(props: MapNavProps) {
  const [avatarPos, setAvatarPos] = useState(props.avatarStartPos)
  const mapRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageRect, setImageRect] = useState({
    left: 0,
    top: 0,
    width: props.svgWidth,
    height: props.svgHeight,
  })
  const [containerRect, setContainerRect] = useState({
    left: 0,
    top: 0,
    width: props.svgWidth,
    height: props.svgHeight,
  })
  const [activeZone, setActiveZone] = useState<(typeof props.zones)[0] | null>(null)
  const [gauge, setGauge] = useState(0)
  const gaugeDuration = 1000 // ms
  const gaugeInterval = 20 // ms
  const router = useRouter()
  const gaugeRef = useRef<NodeJS.Timeout | null>(null)

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
    const scale = Math.min(imageRect.width / props.svgWidth, imageRect.height / props.svgHeight)
    const displayWidth = props.svgWidth * scale
    const displayHeight = props.svgHeight * scale
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
        if (e.key === 'ArrowRight') return { ...pos, x: Math.min(pos.x + 20, props.svgWidth) }
        if (e.key === 'ArrowLeft') return { ...pos, x: Math.max(pos.x - 20, 0) }
        if (e.key === 'ArrowUp') return { ...pos, y: Math.max(pos.y - 20, 0) }
        if (e.key === 'ArrowDown') return { ...pos, y: Math.min(pos.y + 20, props.svgHeight) }
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
    const scale = Math.min(imgRect.width / props.svgWidth, imgRect.height / props.svgHeight)
    const displayWidth = props.svgWidth * scale
    const displayHeight = props.svgHeight * scale
    const offsetX = (contRect.width - displayWidth) / 2
    const offsetY = (contRect.height - displayHeight) / 2

    const relX = e.clientX - contRect.left
    const relY = e.clientY - contRect.top

    const x = (relX - offsetX) / scale
    const y = (relY - offsetY) / scale
    setAvatarPos({
      x: Math.max(0, Math.min(props.svgWidth, x)),
      y: Math.max(0, Math.min(props.svgHeight, y)),
    })
  }

  const isInZone = (zone: (typeof props.zones)[0], pos: typeof avatarPos) =>
    Math.hypot(pos.x - zone.x, pos.y - zone.y) < zone.radius

  // Track which zone mugiwaraya is in
  useEffect(() => {
    const found = props.zones.find((zone) => isInZone(zone, avatarPos)) || null
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
    <div ref={containerRef} className={props.containerClassName} style={{ overflow: 'hidden' }}>
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
        className={props.innerDivClassName ?? ''}
        style={{ display: 'block' }}
      >
        <img
          ref={mapRef}
          src={props.imageSrc}
          alt={props.imageAlt}
          className="h-full w-full object-contain"
          draggable={false}
          style={{ pointerEvents: 'none' }}
        />
      </div>
      {props.zones.map((zone) => {
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
              left: left - (props.mugiwara / 2) * scale,
              top: top - (props.mugiwara / 2) * scale,
              width: props.mugiwara * scale,
              height: props.mugiwara * scale,
            }}
            animate={{
              left: left - (props.mugiwara / 2) * scale,
              top: top - (props.mugiwara / 2) * scale,
            }}
            transition={{
              type: 'tween',
            }}
          />
        )
      })()}
    </div>
  )
}
