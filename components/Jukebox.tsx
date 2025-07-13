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
    <div className="z-40">
      <button
        onClick={togglePlay}
        className="hover:bg-primary-600 rounded-full border p-3 text-white"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
      <audio ref={audioRef} src="/static/audio/maplestory.mp3" loop preload="metadata" />
    </div>
  )
}
