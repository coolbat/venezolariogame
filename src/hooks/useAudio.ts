import { useEffect, useRef, useState } from 'react'

interface UseAudioOptions {
  loop?: boolean
  volume?: number
  autoPlay?: boolean
}

export function useAudio(src: string, options: UseAudioOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const audio = new Audio(src)
    audioRef.current = audio

    // Configurar opciones
    audio.loop = options.loop || false
    audio.volume = options.volume || 0.7

    // Event listeners
    const handleLoadedData = () => setIsLoaded(true)
    const handleError = () => setError('Failed to load audio')
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('error', handleError)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    // Auto play si está configurado
    if (options.autoPlay && isLoaded) {
      audio.play().catch(() => {
        setError('Auto-play was prevented by browser')
      })
    }

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      audio.currentTime = 0
    }
  }, [src, options.loop, options.volume, options.autoPlay])

  const play = () => {
    if (audioRef.current && isLoaded) {
      audioRef.current.play().catch((err) => {
        setError('Failed to play audio: ' + err.message)
      })
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume))
    }
  }

  return {
    play,
    pause,
    stop,
    setVolume,
    isPlaying,
    isLoaded,
    error,
  }
}