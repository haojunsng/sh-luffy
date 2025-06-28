import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Blog' })

const page = async () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Blog</h1>
      <p className="max-w-md text-lg text-gray-600 dark:text-gray-400">
        No blog posts yet. Check back soon for updates on data engineering, tech, and running
        adventures!
      </p>
    </div>
  )
}

export default page
