'use client'
import { useState, useEffect, useRef } from 'react'

const quotes = [
  "You're allowed to rest. Nothing's chasing you.",
  "Peace isn't a place — it's a pace.",
  'Take a breath. That’s enough for now.',
  "You're doing fine. Truly.",
  'Log out of the hustle for a bit.',
  "The clouds are still pretty even when you're tired.",
  'Not every moment needs to be productive.',
  'This is a good time to just... be.',
  "You're safe here. Let go of the weight.",
  'Little joys matter. A lot.',
  'You made it this far — that counts for something.',
  'Even your idle mode has value.',
  'Let your mind wander like wind through trees.',
  'No plans, no pressure. Just chill.',
  'Today is soft. Let it be.',
  "You're not late. You're on your own time.",
  'Stillness is underrated.',
  'The world can wait a little.',
  'This moment doesn’t ask for anything from you.',
  'Quiet doesn’t mean empty.',
  'Pause. Breathe. Smile (if you want).',
  'Float, don’t force.',
  'There’s no next task. Just this.',
  'Existing is enough right now.',
  "You're allowed to slow down.",
  'Comfort can be a destination.',
  'No quests today — only vibes.',
  'Rest is part of the rhythm.',
  'Let the noise fade — just for now.',
  'Nothing urgent. Just you and a good exhale.',
  'Have you been drinking water today?',
]

const dogImages = [
  'haagen.png',
  'haagen2.png',
  'haagen3.png',
  'haagen4.png',
  'haagen5.png',
  'haagen6.png',
  'haagen7.png',
  'haagen8.png',
  'haagen9.png',
  'haagen10.png',
  'haagen11.png',
  'haagen12.png',
  'haagen13.png',
  'haagen14.png',
  'haagen15.png',
  'haagen16.png',
  'haagen17.png',
  'haagen18.png',
]

export default function RelaxPage() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const jukebox = document.getElementById('jukebox-wrapper')
    if (jukebox) {
      jukebox.style.position = 'fixed'
      jukebox.style.left = '0'
      jukebox.style.bottom = '70px'
      jukebox.style.width = '100vw'
      jukebox.style.zIndex = '50'
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#2c3e50] to-[#4ca1af]" />

      <div className="pointer-events-none fixed z-0 flex flex-col items-center justify-center">
        <h1 className="mb-2 text-4xl font-bold text-[#f0f4f8]">🌴 Relax Zone 🌴</h1>
        <p className="mb-6 max-w-md text-lg text-[#f0f4f8] italic">{quotes[quoteIndex]}</p>
        <div
          ref={galleryRef}
          className="flex gap-6"
          style={{
            animation: 'scroll-gallery 30s linear infinite',
            width: `${dogImages.length * 7}rem`,
          }}
        >
          {dogImages.concat(dogImages).map((img, i) => (
            <img
              key={i}
              src={`/static/haagen/${img}`}
              alt={`dog ${i + 1}`}
              className="h-28 w-28 rounded-xl object-cover shadow-lg"
              draggable={false}
            />
          ))}
        </div>
      </div>

      {/* Add this style block for the animation */}
      <style jsx global>{`
        @keyframes scroll-gallery {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
