import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="relative z-40">
      <div className="mt-16 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center py-8">
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
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-600">Made with ⚓ and 🏴‍☠️</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
