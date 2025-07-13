'use client'
import { useState, useEffect } from 'react'

export default function MusicPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const musicChoice = sessionStorage.getItem('music-preference')

    if (musicChoice === null) {
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleChoice = (enabled: boolean) => {
    setShowPrompt(false)
    sessionStorage.setItem('music-preference', enabled ? 'enabled' : 'disabled')

    if (enabled) {
      const jukeboxButton = document.querySelector('[data-jukebox-play]') as HTMLButtonElement
      if (jukeboxButton) {
        jukeboxButton.click()
      }
    }
  }

  if (!showPrompt) return null

  return (
    <div className="fixed z-50 flex h-full w-full items-center justify-center">
      <div className="w-[280px] rounded-[10%] bg-white px-8 py-6 text-center shadow-lg">
        <p>🎵🍁🎵</p>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          <i>Care to be transported to nostalgia land?</i>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleChoice(true)}
            className="bg-primary-500 hover:bg-primary-600 dark:hover:bg-primary-400 flex-1 rounded px-3 py-2 text-sm text-white"
          >
            Yes!
          </button>
          <button
            onClick={() => handleChoice(false)}
            className="flex-1 rounded bg-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            Nope.
          </button>
        </div>
      </div>
    </div>
  )
}
