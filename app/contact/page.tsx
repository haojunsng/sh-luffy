import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="mb-6 text-4xl font-bold">Contact</h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        Want to get in touch? Reach out via email or connect with me on GitHub or LinkedIn!
      </p>
      <div className="flex justify-center space-x-8">
        <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={8} />
        <SocialIcon kind="github" href={siteMetadata.github} size={8} />
        <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={8} />
      </div>
    </div>
  )
}
