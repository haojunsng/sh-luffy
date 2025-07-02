'use client'
import { useEffect, useState } from 'react'
import MapNavLargeScreen from '@/components/MapNavLargeScreen'
import MapNavMobile from '@/components/MapNavMobile'

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])
  return isMobile
}

export default function Home() {
  const isMobile = useIsMobile()
  return isMobile ? <MapNavMobile /> : <MapNavLargeScreen />
}
