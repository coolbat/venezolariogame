'use client'

import { useState } from 'react'
import speechManager from '@/lib/speechSynthesis'
import { useAudioStore } from '@/stores/audioStore'

interface SpeechButtonProps {
  text: string
  type?: 'venezuelan' | 'standard' | 'example'
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'minimal'
  label?: string
  rate?: number
}

export default function SpeechButton({ 
  text, 
  type = 'venezuelan',
  className = '',
  size = 'md',
  variant = 'primary',
  label,
  rate
}: SpeechButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const { playSound, soundEnabled, speechEnabled, speechRate } = useAudioStore()

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8 text-sm'
      case 'lg': return 'w-12 h-12 text-lg'
      default: return 'w-10 h-10 text-base'
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
      case 'minimal':
        return 'bg-transparent hover:bg-white/10 text-white/80 hover:text-white'
      default:
        return 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
    }
  }

  const handleSpeak = async () => {
    if (!speechManager.isAvailable() || !speechEnabled) {
      console.warn('语音合成不可用或已禁用')
      return
    }

    if (isSpeaking) {
      speechManager.stop()
      setIsSpeaking(false)
      return
    }

    try {
      setIsSpeaking(true)
      
      // 播放点击音效
      if (soundEnabled) {
        playSound('click')
      }

      // 使用设置中的语音速度，如果没有传入自定义速度
      const effectiveRate = rate || speechRate

      // 根据类型选择不同的语音方法
      switch (type) {
        case 'standard':
          await speechManager.speakStandardWord(text, effectiveRate)
          break
        case 'example':
          await speechManager.speakExample(text, effectiveRate)
          break
        default:
          await speechManager.speakVenezuelanWord(text, effectiveRate)
          break
      }
    } catch (error) {
      console.error('语音播放失败:', error)
    } finally {
      setIsSpeaking(false)
    }
  }

  const getIcon = () => {
    if (isSpeaking) {
      return '🔊'
    }
    
    switch (type) {
      case 'standard':
        return '🔊'
      case 'example':
        return '💬'
      default:
        return '🗣️'
    }
  }

  const getTooltip = () => {
    if (label) return label
    
    switch (type) {
      case 'standard':
        return 'Pronunciación estándar'
      case 'example':
        return 'Escuchar ejemplo'
      default:
        return 'Pronunciación venezolana'
    }
  }

  return (
    <button
      onClick={handleSpeak}
      disabled={!speechManager.isAvailable() || !speechEnabled}
      className={`
        ${getSizeClasses()}
        ${getVariantClasses()}
        rounded-full
        flex items-center justify-center
        transition-all duration-200
        transform hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isSpeaking ? 'animate-pulse' : ''}
        ${className}
      `}
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      <span className={isSpeaking ? 'animate-bounce' : ''}>
        {getIcon()}
      </span>
    </button>
  )
}