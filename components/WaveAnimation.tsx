'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function WaveAnimation() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-30 h-60 w-full overflow-hidden">
      {/* Thousand Sunny Ship - 3D Floating Animation */}
      <motion.div
        className="absolute -bottom-10 left-1/2 z-20 -translate-x-1/2 transform"
        animate={{
          y: [0, -25, 0],
          x: [-400, 200, -400],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          x: {
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <Image
          src="/static/images/thousand-sunny.png"
          alt="Thousand Sunny"
          width={120}
          height={100}
          className="brightness-125 contrast-110 drop-shadow-lg saturate-110"
          priority
        />
      </motion.div>
      {/* Multiple wave layers for depth */}
      <div className="absolute bottom-0 w-full">
        {/* Wave 1 - Deep */}
        <svg
          className="absolute bottom-0 h-20 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,120V73.71c47.79-22.2,103.59-32.17,158-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27-18,138.3-24.88,209.4-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z"
            opacity=".4"
            fill="#1e40af"
            animate={{
              d: [
                'M0,120V73.71c47.79-22.2,103.59-32.17,158-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27-18,138.3-24.88,209.4-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z',
                'M0,120V39.71c67.79-32.2,123.59-42.17,178-38,90.36,7.37,156.33,35.31,226.8,39.5C458.64,97.57,532.34,76.33,603,57.95c89.27-20,158.3-26.88,229.4-15.08,56.15,8,89.85,19.84,124.45,31.34C1009.49,105,1133,144.29,1200,77.53V120Z',
                'M0,120V73.71c47.79-22.2,103.59-32.17,158-28,70.36,5.37,136.33,33.31,206.8,37.5C438.64,87.57,512.34,66.33,583,47.95c69.27-18,138.3-24.88,209.4-13.08,36.15,6,69.85,17.84,104.45,29.34C989.49,95,1113,134.29,1200,67.53V120Z',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>

        {/* Wave 2 - Medium */}
        <svg
          className="absolute bottom-0 h-28 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,120V90c100-20,200-20,300,0s200,20,300,0,200-20,300,0,200,20,300,0V120Z"
            opacity=".6"
            fill="#3b82f6"
            animate={{
              d: [
                'M0,120V90c100-20,200-20,300,0s200,20,300,0,200-20,300,0,200,20,300,0V120Z',
                'M0,120V60c100-40,200-40,300,0s200,40,300,0,200-40,300,0,200,40,300,0V120Z',
                'M0,120V90c100-20,200-20,300,0s200,20,300,0,200-20,300,0,200,20,300,0V120Z',
              ],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />
        </svg>

        {/* Wave 3 - Surface with natural wave top */}
        <svg
          className="absolute bottom-0 h-32 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,120V100c150-30,250-30,400,0s250,30,400,0,250-30,400,0V120Z"
            opacity=".8"
            fill="#60a5fa"
            animate={{
              d: [
                'M0,120V100c150-30,250-30,400,0s250,30,400,0,250-30,400,0V120Z',
                'M0,120V70c150-60,250-60,400,0s250,60,400,0,250-60,400,0V120Z',
                'M0,120V100c150-30,250-30,400,0s200,30,400,0,250-30,400,0V120Z',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.6,
            }}
          />
        </svg>
      </div>
    </div>
  )
}
