import siteMetadata from '@/data/siteMetadata'
import SubscriptionForm from '@/components/SubscriptionForm'
// import Jukebox from '@/components/Jukebox' // Removed from Footer
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isRelax = pathname === '/relax'

  // Choose text color class for relax page
  const relaxText = isRelax ? 'text-[#f0f4f8]' : ''

  return (
    <>
      {/* Jukebox removed from Footer, now only in root layout */}
      {!isHome && (
        <footer className={`relative z-40 pb-8`}>
          <div className="mt-16 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center space-y-6 py-8">
              {/* Subscription Form */}
              {!isRelax && (
                <div className="w-full max-w-xs">
                  <SubscriptionForm />
                </div>
              )}
              {/* Main Footer Content */}
              <div className="mb-4 text-center">
                <p
                  className={`text-sm ${relaxText} ${!isRelax ? 'text-gray-600 dark:text-gray-400' : ''}`}
                >
                  Sailing through data and tech - one adventure at a time.
                </p>
              </div>
              <div className="text-center">
                <p
                  className={`text-xs ${relaxText} ${!isRelax ? 'text-gray-500 dark:text-gray-500' : ''}`}
                >
                  © {new Date().getFullYear()} {siteMetadata.author}. All rights reserved.
                </p>
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-xs ${relaxText} ${!isRelax ? 'text-gray-400 dark:text-gray-600' : ''}`}
                >
                  Made with ⚓ and 🏴‍☠️
                </p>
              </div>
              <p className={`text-xs ${relaxText} ${!isRelax ? 'text-gray-500' : ''}`}>
                Background music: “Music to help you beat zakum - calming/peaceful maplestory lofi
                mix” by Conjuring Pixel, licensed under CC BY 4.0
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  )
}
