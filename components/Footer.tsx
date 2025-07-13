import siteMetadata from '@/data/siteMetadata'
import SubscriptionForm from '@/components/SubscriptionForm'
import Jukebox from '@/components/Jukebox'

export default function Footer() {
  return (
    <footer className="relative z-40 pb-60">
      <div className="mt-16 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center space-y-6 py-8">
          {/* Subscription Form */}
          <div className="w-full max-w-xs">
            <SubscriptionForm />
          </div>
          {/* Main Footer Content */}
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sailing through data and tech - one adventure at a time.
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} {siteMetadata.author}. All rights reserved.
            </p>
          </div>
          <Jukebox />
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-600">Made with ⚓ and 🏴‍☠️</p>
          </div>
          <p className="text-xs text-gray-500">
            Background music: “MapleStory BGM: All Instrument Medoly Cover (Arrangement)” by
            NOCOMMENT, licensed under CC BY 4.0
          </p>
        </div>
      </div>
    </footer>
  )
}
