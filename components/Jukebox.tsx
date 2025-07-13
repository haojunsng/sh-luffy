'use client'
import { useState, useRef, useEffect } from 'react'

export default function Jukebox() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1) // volume range: 0 to 1
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress(audio.currentTime)
    }

    const setAudioDuration = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', setAudioDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', setAudioDuration)
    }
  }, [])

  return (
    <div className="z-40 flex h-full flex-col items-center justify-center text-gray-600 dark:text-gray-400">
      <p>
        <i>Ready for a trip down memory lane?</i>
      </p>

      <button
        onClick={togglePlay}
        data-jukebox-play
        className="hover:bg-primary-600 mt-2 rounded-full border px-4 py-2"
      >
        {isPlaying ? '⏸️ Pause' : '▶️ Play'}
      </button>

      {/* Progress bar */}
      <input
        type="range"
        min="0"
        max={duration}
        step="0.1"
        value={progress}
        onChange={handleProgressChange}
        className="accent-primary-500 mt-4 w-64"
      />

      {/* Volume control */}
      <label className="mt-2 text-sm">
        Volume
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="accent-primary-500 ml-2 w-40 align-middle"
        />
      </label>

      {/* Audio element */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/static/audio/maplestory.mp3" loop preload="metadata" />
    </div>
  )
}
