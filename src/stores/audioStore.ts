import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AudioGenerator from '@/lib/audioGenerator'

interface AudioState {
  // 音效设置
  soundEnabled: boolean
  musicEnabled: boolean
  speechEnabled: boolean
  soundVolume: number
  musicVolume: number
  speechVolume: number
  speechRate: number
  
  // 动作
  setSoundEnabled: (enabled: boolean) => void
  setMusicEnabled: (enabled: boolean) => void
  setSpeechEnabled: (enabled: boolean) => void
  setSoundVolume: (volume: number) => void
  setMusicVolume: (volume: number) => void
  setSpeechVolume: (volume: number) => void
  setSpeechRate: (rate: number) => void
  
  // 音效播放方法
  playSound: (soundType: SoundType) => void
}

export type SoundType = 
  | 'click' 
  | 'correct' 
  | 'incorrect' 
  | 'unlock' 
  | 'hint' 
  | 'level_up'
  | 'card_flip'

// 音效文件映射
const SOUND_FILES: Record<SoundType, string> = {
  click: '/sounds/click.mp3',
  correct: '/sounds/correct.mp3', 
  incorrect: '/sounds/incorrect.mp3',
  unlock: '/sounds/unlock.mp3',
  hint: '/sounds/hint.mp3',
  level_up: '/sounds/level_up.mp3',
  card_flip: '/sounds/card_flip.mp3',
}

// 创建音频实例缓存
const audioCache: Map<SoundType, HTMLAudioElement> = new Map()
let audioGenerator: AudioGenerator | null = null

// 预加载音频文件，如果失败则使用生成的音效
const preloadAudio = (soundType: SoundType) => {
  // Skip during SSR
  if (typeof window === 'undefined') return null
  
  if (!audioCache.has(soundType)) {
    const audio = new Audio(SOUND_FILES[soundType])
    audio.preload = 'auto'
    
    // 如果文件加载失败，标记为使用生成音效
    audio.addEventListener('error', () => {
      console.warn(`Failed to load ${soundType} audio file, will use generated sound`)
      audio.dataset.useGenerated = 'true'
    })
    
    audioCache.set(soundType, audio)
  }
  return audioCache.get(soundType)!
}

// 初始化音频生成器（仅在客户端）
const initializeAudioGenerator = () => {
  if (typeof window !== 'undefined' && !audioGenerator) {
    audioGenerator = new AudioGenerator()
  }
  return audioGenerator
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      // 初始状态
      soundEnabled: true,
      musicEnabled: true,
      speechEnabled: true,
      soundVolume: 0.7,
      musicVolume: 0.5,
      speechVolume: 0.8,
      speechRate: 0.8,

      // 设置动作
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setMusicEnabled: (enabled) => set({ musicEnabled: enabled }),
      setSpeechEnabled: (enabled) => set({ speechEnabled: enabled }),
      setSoundVolume: (volume) => set({ soundVolume: volume }),
      setMusicVolume: (volume) => set({ musicVolume: volume }),
      setSpeechVolume: (volume) => set({ speechVolume: volume }),
      setSpeechRate: (rate) => set({ speechRate: rate }),

      // 播放音效
      playSound: (soundType: SoundType) => {
        const state = get()
        if (!state.soundEnabled || typeof window === 'undefined') return

        try {
          const audio = preloadAudio(soundType)
          
          // 如果文件加载失败或者标记使用生成音效，使用Web Audio API生成
          if (!audio || audio.dataset.useGenerated === 'true' || audio.error) {
            const generator = initializeAudioGenerator()
            if (!generator) return
            
            let buffer: AudioBuffer | null = null
            
            switch (soundType) {
              case 'click':
                buffer = generator.generateClickSound()
                break
              case 'correct':
                buffer = generator.generateSuccessSound()
                break
              case 'incorrect':
                buffer = generator.generateErrorSound()
                break
              case 'hint':
                buffer = generator.generateHintSound()
                break
              case 'level_up':
                buffer = generator.generateLevelUpSound()
                break
              case 'unlock':
                buffer = generator.generateUnlockSound()
                break
              case 'card_flip':
                buffer = generator.generateCardFlipSound()
                break
            }
            
            if (buffer) {
              generator.playBuffer(buffer, state.soundVolume)
            }
          } else {
            // 使用音频文件
            audio.volume = state.soundVolume
            audio.currentTime = 0
            
            const playPromise = audio.play()
            if (playPromise !== undefined) {
              playPromise.catch(error => {
                console.warn(`Failed to play sound ${soundType}:`, error)
                // 如果播放失败，回退到生成音效
                audio.dataset.useGenerated = 'true'
                get().playSound(soundType)
              })
            }
          }
        } catch (error) {
          console.warn(`Error playing sound ${soundType}:`, error)
        }
      },
    }),
    {
      name: 'venezolario-audio-settings',
      partialize: (state) => ({
        soundEnabled: state.soundEnabled,
        musicEnabled: state.musicEnabled,
        speechEnabled: state.speechEnabled,
        soundVolume: state.soundVolume,
        musicVolume: state.musicVolume,
        speechVolume: state.speechVolume,
        speechRate: state.speechRate,
      }),
    }
  )
)