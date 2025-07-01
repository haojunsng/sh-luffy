'use client'
import { usePathname } from 'next/navigation'
import ConditionalHeader from '@/components/ConditionalHeader'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import AnimatedMain from '@/components/AnimatedMain'
import BackButton from '@/components/BackButton'
import WaveAnimation from '@/components/WaveAnimation'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  return (
    <SectionContainer>
      {!isHome && <ConditionalHeader />}
      <BackButton />
      <AnimatedMain>{children}</AnimatedMain>
      {!isHome && <Footer />}
      {!isHome && <WaveAnimation />}
    </SectionContainer>
  )
}
