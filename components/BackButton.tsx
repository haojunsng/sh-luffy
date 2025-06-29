'use client'

import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  // Don't show back button on home page
  if (pathname === '/') {
    return null
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <motion.button
      onClick={handleBack}
      className="fixed top-24 left-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition-shadow duration-200 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Go back"
    >
      <svg
        className="h-5 w-5 text-gray-700 dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </motion.button>
  )
}
