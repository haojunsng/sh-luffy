'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  return (
    <section
      className={
        isHome
          ? 'fixed inset-0 m-0 h-full w-full bg-white p-0 dark:bg-gray-950'
          : 'mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0'
      }
      style={isHome ? { zIndex: 0 } : {}}
    >
      {children}
    </section>
  )
}
