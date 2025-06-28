import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function Home() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Welcome
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <div className="py-12">
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Hi, I'm {siteMetadata.author}
              </h2>
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link
                  href="/about"
                  className="px-6 py-3 text-base font-medium text-white bg-primary-500 hover:bg-primary-600 dark:hover:bg-primary-400 rounded-lg transition-colors"
                >
                  About Me
                </Link>
                <Link
                  href="/projects"
                  className="px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  View Projects
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <Link
                href="/blog"
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Blog
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Read my thoughts on technology, development, and more.
                </p>
              </Link>
              
              <Link
                href="/projects"
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Projects
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore the things I've built and worked on.
                </p>
              </Link>
              
              <Link
                href="/about"
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  About
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Learn more about my background and experience.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
