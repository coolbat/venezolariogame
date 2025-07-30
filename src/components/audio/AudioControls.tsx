'use client'

import { useState } from 'react'
import { useAudioStore } from '@/stores/audioStore'

export default function AudioControls() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    soundEnabled,
    musicEnabled,
    speechEnabled,
    soundVolume,
    musicVolume,
    speechVolume,
    speechRate,
    setSoundEnabled,
    setMusicEnabled,
    setSpeechEnabled,
    setSoundVolume,
    setMusicVolume,
    setSpeechVolume,
    setSpeechRate,
    playSound,
  } = useAudioStore()

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled)
    if (!soundEnabled) {
      playSound('click')
    }
  }

  const handleMusicToggle = () => {
    setMusicEnabled(!musicEnabled)
    playSound('click')
  }

  const handleSoundVolumeChange = (value: number) => {
    setSoundVolume(value)
    playSound('click')
  }

  const handleMusicVolumeChange = (value: number) => {
    setMusicVolume(value)
  }

  const handleSpeechToggle = () => {
    setSpeechEnabled(!speechEnabled)
    playSound('click')
  }

  const handleSpeechVolumeChange = (value: number) => {
    setSpeechVolume(value)
  }

  const handleSpeechRateChange = (value: number) => {
    setSpeechRate(value)
  }

  return (
    <div className="fixed top-20 right-4 z-40">
      {/* Botón de audio */}
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          playSound('click')
        }}
        className="bg-primary-500 hover:bg-primary-600 backdrop-blur-sm border border-primary-300 rounded-full p-3 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        title="Configuración de audio"
      >
        {soundEnabled || musicEnabled || speechEnabled ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 12H5a2 2 0 01-2-2V9a2 2 0 012-2h4l4.5-4.5v15l-4.5-4.5z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </button>

      {/* Panel de controles */}
      {isOpen && (
        <div className="absolute top-16 right-0 bg-white backdrop-blur-md border border-gray-200 rounded-xl p-4 min-w-64 shadow-xl">
          <h3 className="text-gray-800 font-semibold mb-4">Configuración de Audio</h3>
          
          {/* Control de efectos de sonido */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 text-sm">Efectos de Sonido</span>
              <button
                onClick={handleSoundToggle}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  soundEnabled ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                    soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {soundEnabled && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-xs">🔉</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={soundVolume}
                  onChange={(e) => handleSoundVolumeChange(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-600 text-xs">🔊</span>
              </div>
            )}
          </div>

          {/* Control de música */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 text-sm">Música de Fondo</span>
              <button
                onClick={handleMusicToggle}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  musicEnabled ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                    musicEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {musicEnabled && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-xs">🎵</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={musicVolume}
                  onChange={(e) => handleMusicVolumeChange(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-600 text-xs">🎶</span>
              </div>
            )}
          </div>

          {/* Control de pronunciación */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 text-sm">Pronunciación</span>
              <button
                onClick={handleSpeechToggle}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  speechEnabled ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                    speechEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {speechEnabled && (
              <div className="space-y-3">
                {/* Control de velocidad */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600 text-xs">Velocidad</span>
                    <span className="text-gray-600 text-xs">{Math.round(speechRate * 100)}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-xs">🐌</span>
                    <input
                      type="range"
                      min="0.3"
                      max="1.5"
                      step="0.1"
                      value={speechRate}
                      onChange={(e) => handleSpeechRateChange(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-gray-600 text-xs">🐰</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botones de prueba */}
          <div className="space-y-2">
            <button
              onClick={() => playSound('correct')}
              disabled={!soundEnabled}
              className="w-full btn-secondary py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔊 Probar Sonido
            </button>
            <button
              onClick={() => {
                if (speechEnabled) {
                  import('@/lib/speechSynthesis').then(({ default: speechManager }) => {
                    speechManager.speakVenezuelanWord('chamo', speechRate)
                  })
                }
              }}
              disabled={!speechEnabled}
              className="w-full btn-secondary py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🗣️ Probar Pronunciación
            </button>
          </div>
        </div>
      )}
    </div>
  )
}