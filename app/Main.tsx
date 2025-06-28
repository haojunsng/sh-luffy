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
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Hi, I'm {siteMetadata.author}
              </h2>

              {/* Call to Action Buttons */}
              <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                <Link
                  href="/about"
                  className="bg-primary-500 hover:bg-primary-600 dark:hover:bg-primary-400 rounded-lg px-6 py-3 text-base font-medium text-white transition-colors"
                >
                  About Me
                </Link>
                <Link
                  href="/projects"
                  className="rounded-lg bg-gray-100 px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  View Projects
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-3">
              <Link
                href="/blog"
                className="hover:border-primary-500 dark:hover:border-primary-400 rounded-lg border border-gray-200 p-6 transition-colors dark:border-gray-700"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Blog
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Read my thoughts on technology, development, and more.
                </p>
              </Link>

              <Link
                href="/projects"
                className="hover:border-primary-500 dark:hover:border-primary-400 rounded-lg border border-gray-200 p-6 transition-colors dark:border-gray-700"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Projects
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore the things I've built and worked on.
                </p>
              </Link>

              <Link
                href="/about"
                className="hover:border-primary-500 dark:hover:border-primary-400 rounded-lg border border-gray-200 p-6 transition-colors dark:border-gray-700"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
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
