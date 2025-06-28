import 'css/prism.css'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import PostLayout from '@/layouts/PostLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/') }))
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  const post = allBlogs.find((p) => p.slug === slug)
  if (!post) return notFound()

  const mainContent = coreContent(post)

  return (
    <PostLayout content={mainContent} authorDetails={[]} next={undefined} prev={undefined}>
      <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
    </PostLayout>
  )
}
