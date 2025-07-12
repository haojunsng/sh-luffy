export const runtime = 'edge'

import List from '@/components/List'
import { genPageMetadata } from 'app/seo'
import { getBlogPageData } from '../../utils'

export const metadata = genPageMetadata({ title: 'Blog' })

const page = async ({ params }: { params: Promise<{ page: string }> }) => {
  const { page: pageParam } = await params
  const pageNumber = parseInt(pageParam)
  const { posts, initialDisplayPosts, pagination } = getBlogPageData(pageNumber)

  return (
    <List
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}

export default page
