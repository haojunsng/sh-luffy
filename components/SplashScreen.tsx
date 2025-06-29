'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SplashScreenProps {
  children: React.ReactNode
}

export default function SplashScreen({ children }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000) // Show splash for 2 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700"
          >
            {/* Animated Background Waves */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 left-0 w-full"
                  initial={{ y: 100 }}
                  animate={{ y: -20 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: i * 0.5,
                    ease: 'easeInOut',
                  }}
                >
                  <svg
                    viewBox="0 0 1200 120"
                    className="h-32 w-full opacity-20"
                    style={{ transform: `translateY(${i * 20}px)` }}
                  >
                    <path
                      d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                      fill="currentColor"
                      className="text-white"
                    />
                  </svg>
                </motion.div>
              ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center">
              {/* Chibi Luffy Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="mb-8"
              >
                <div className="relative mx-auto h-32 w-32">
                  <img
                    src="/static/images/chibi-luffy.png"
                    alt="Chibi Luffy"
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      // Fallback to CSS version if image fails to load
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-pirata-one mb-4 text-5xl font-bold text-white md:text-7xl"
              >
                SNG'S PORTFOLIO
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-pirata-one mb-8 text-xl text-blue-100 md:text-2xl"
              >
                Bon Voyage!
              </motion.p>

              {/* Loading Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex justify-center space-x-2"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-3 w-3 rounded-full bg-white"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>

              {/* One Piece Quote */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="mx-auto mt-8 max-w-md text-sm text-blue-200 italic"
              >
                "I'm gonna be King of the Pirates!"
              </motion.p>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-10 right-10 text-white opacity-30"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚓
            </motion.div>
            <motion.div
              className="absolute top-20 left-10 text-white opacity-30"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              🗺️
            </motion.div>
            <motion.div
              className="absolute right-20 bottom-20 text-white opacity-30"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              🏴‍☠️
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {!isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
