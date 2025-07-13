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
  const isRelax = pathname === '/relax'

  if (isRelax) {
    // Only render relax page content, no SectionContainer or layout wrappers
    return (
      <>
        <BackButton />
        <AnimatedMain>{children}</AnimatedMain>
      </>
    )
  }

  return (
    <SectionContainer>
      {!isHome && <ConditionalHeader />}
      <BackButton />
      <AnimatedMain>{children}</AnimatedMain>
      <div className={isHome ? 'hidden' : ''}>
        <Footer />
      </div>
      {!isHome && <WaveAnimation />}
    </SectionContainer>
  )
}
