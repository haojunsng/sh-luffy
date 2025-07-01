'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface AnimatedMainProps {
  children: React.ReactNode
}

export default function AnimatedMain({ children }: AnimatedMainProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <motion.main
      className={isHome ? 'h-full w-full' : ''}
      key={pathname}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{
        opacity: isLoading ? 0.7 : 1,
        y: 0,
        scale: 1,
      }}
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
