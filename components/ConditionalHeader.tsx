'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export default function ConditionalHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return <Header showNav={!isHomePage} />
}
