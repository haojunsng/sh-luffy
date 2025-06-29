import GitHubProjects from '@/components/GitHubProjects'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Projects
          </h1>
        </div>
        {/* GIF Section - width matches 2 cards */}
        <div className="py-8">
          <div className="mx-auto max-w-[1088px] p-4" style={{ aspectRatio: '16/6' }}>
            <img
              src="/static/images/projects-hero.gif"
              alt="Projects Animation"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>

        {/* GitHub Projects - Dynamically Fetched */}
        <GitHubProjects />
      </div>
    </>
  )
}
