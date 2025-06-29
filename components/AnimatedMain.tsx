'use client'

import { motion } from 'framer-motion'

interface AnimatedMainProps {
  children: React.ReactNode
}

export default function AnimatedMain({ children }: AnimatedMainProps) {
  return (
    <motion.main
      className="mb-auto"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1,
      }}
    >
      {children}
    </motion.main>
  )
}
