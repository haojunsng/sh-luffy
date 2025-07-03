'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
  fork: boolean
}

const EXCLUDED_PROJECTS = ['haojunsng']

export default function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/haojunsng/repos?sort=updated&per_page=12&type=owner'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }

        const data: GitHubRepo[] = await response.json()

        // Filter out forks and sort by stars, then by update date
        const filteredRepos = data
          .filter((repo) => !repo.fork && !EXCLUDED_PROJECTS.includes(repo.name))
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          )
          .slice(0, 6) // Show top 6 repos

        setRepos(filteredRepos)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  if (loading) {
    return (
      <div className="py-8">
        <div className="mx-auto max-w-[1088px]">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Loading...</h2>
          <div className="flex flex-wrap gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 w-full animate-pulse rounded-lg bg-gray-200 sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] dark:bg-gray-700"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="mx-auto max-w-[1088px]">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Yikes!</h2>
          <div className="py-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Unable to load GitHub projects. Please try again later.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-[1088px]">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          A glimpse of what I've built so far on my voyage!
        </h2>
        <div className="flex flex-wrap">
          {repos.map((repo) => (
            <Card
              key={repo.id}
              title={repo.name}
              description={repo.description || 'No description available'}
              href={repo.html_url}
              imgSrc={`https://opengraph.githubassets.com/1/haojunsng/${repo.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
