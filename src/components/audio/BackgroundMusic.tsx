'use client'

import { useEffect, useRef } from 'react'
import { useAudioStore } from '@/stores/audioStore'

interface BackgroundMusicProps {
  src: string
  fadeInDuration?: number
  fadeOutDuration?: number
}

export default function BackgroundMusic({ 
  src, 
  fadeInDuration = 2000,
  fadeOutDuration = 1000 
}: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const { musicEnabled, musicVolume } = useAudioStore()

  useEffect(() => {
    // Crear elemento de audio
    const audio = new Audio(src)
    audioRef.current = audio
    
    audio.loop = true
    audio.preload = 'auto'
    
    // Configurar volumen inicial
    audio.volume = 0

    const handleCanPlayThrough = () => {
      if (musicEnabled) {
        startPlayback()
      }
    }

    audio.addEventListener('canplaythrough', handleCanPlayThrough)

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough)
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
      audio.pause()
    }
  }, [src])

  // Manejar cambios en la configuración de música
  useEffect(() => {
    if (!audioRef.current) return

    if (musicEnabled) {
      startPlayback()
    } else {
      stopPlayback()
    }
  }, [musicEnabled])

  // Manejar cambios en el volumen
  useEffect(() => {
    if (!audioRef.current) return
    
    if (musicEnabled && !audioRef.current.paused) {
      audioRef.current.volume = musicVolume
    }
  }, [musicVolume, musicEnabled])

  const startPlayback = () => {
    if (!audioRef.current || !musicEnabled) return

    audioRef.current.play().then(() => {
      fadeIn()
    }).catch(error => {
      console.warn('Failed to start background music:', error)
    })
  }

  const stopPlayback = () => {
    if (!audioRef.current) return

    fadeOut(() => {
      audioRef.current!.pause()
    })
  }

  const fadeIn = () => {
    if (!audioRef.current) return

    const audio = audioRef.current
    const targetVolume = musicVolume
    const steps = 50
    const volumeStep = targetVolume / steps
    const timeStep = fadeInDuration / steps

    let currentStep = 0

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
    }

    fadeIntervalRef.current = setInterval(() => {
      currentStep++
      const newVolume = Math.min(volumeStep * currentStep, targetVolume)
      audio.volume = newVolume

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current!)
        fadeIntervalRef.current = null
      }
    }, timeStep)
  }

  const fadeOut = (onComplete?: () => void) => {
    if (!audioRef.current) return

    const audio = audioRef.current
    const initialVolume = audio.volume
    const steps = 30
    const volumeStep = initialVolume / steps
    const timeStep = fadeOutDuration / steps

    let currentStep = 0

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
    }

    fadeIntervalRef.current = setInterval(() => {
      currentStep++
      const newVolume = Math.max(initialVolume - (volumeStep * currentStep), 0)
      audio.volume = newVolume

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current!)
        fadeIntervalRef.current = null
        onComplete?.()
      }
    }, timeStep)
  }

  return null // Este componente no renderiza nada visible
}