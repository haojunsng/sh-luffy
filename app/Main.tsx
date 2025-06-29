import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

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
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 lg:grid-cols-4">
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

              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Contact
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Let's connect and discuss opportunities.
                </p>
                <div className="flex space-x-4">
                  <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
                  <SocialIcon kind="github" href={siteMetadata.github} size={6} />
                  <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
