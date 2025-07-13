'use client'
import { useState, useRef } from 'react'

export default function Jukebox() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="z-40 flex h-full flex-col items-center justify-center text-gray-600 dark:text-gray-400">
      <p>
        <i>Ready for a trip down memory lane?</i>
      </p>
      <button
        onClick={togglePlay}
        data-jukebox-play
        className="hover:bg-primary-600 mt-2 rounded-full border p-3"
      >
        {isPlaying ? '⏸️ Hit to Pause!' : '▶️ Hit to Play!'}
      </button>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/static/audio/maplestory_compressed.mp3" loop preload="metadata" />
    </div>
  )
}
