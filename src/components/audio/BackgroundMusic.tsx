'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [userInteracted, setUserInteracted] = useState(false)
  const { musicEnabled, musicVolume } = useAudioStore()

  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') return
    
    // Crear elemento de audio
    const audio = new Audio()
    audioRef.current = audio
    
    audio.loop = true
    audio.preload = 'auto'
    audio.crossOrigin = 'anonymous' // Para iframe compatibility
    
    // Configurar volumen inicial
    audio.volume = 0

    const handleCanPlayThrough = () => {
      if (musicEnabled) {
        startPlayback()
      }
    }

    const handleError = (error: any) => {
      console.warn('Background music file not found or failed to load:', error)
      // No mostrar error al usuario, simplemente no reproducir música
    }

    audio.addEventListener('canplaythrough', handleCanPlayThrough)
    audio.addEventListener('error', handleError)

    // Configurar src después de los event listeners
    audio.src = src

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough)
      audio.removeEventListener('error', handleError)
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
      audio.pause()
    }
  }, [src])

  // 监听用户交互来启用音频播放（iframe要求）
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleUserInteraction = () => {
      setUserInteracted(true)
      // 如果音乐启用且用户已交互，尝试播放
      if (musicEnabled && audioRef.current) {
        startPlayback()
      }
    }

    // 监听多种用户交互事件
    const events = ['click', 'touchstart', 'keydown']
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction)
      })
    }
  }, [musicEnabled])

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

    // 在iframe中，需要等待用户交互
    if (!userInteracted) {
      console.log('Waiting for user interaction to start background music')
      return
    }

    // 在iframe中，音频播放需要用户交互，优雅地处理这种情况
    const playPromise = audioRef.current.play()
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        fadeIn()
      }).catch(error => {
        // 如果是用户交互要求的错误(DOMException)，在iframe中很常见
        if (error.name === 'NotAllowedError') {
          console.log('Background music requires user interaction to play in iframe')
        } else {
          console.warn('Failed to start background music:', error)
        }
      })
    }
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