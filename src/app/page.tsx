'use client'

import Link from 'next/link'
import { useAudioStore } from '@/stores/audioStore'

export default function Home() {
  const { playSound } = useAudioStore()
  
  // Debug logging for iframe
  console.log('[Debug] Home component mounted')
  
  const handleLinkClick = (destination: string, soundType: 'click') => {
    console.log(`[Debug] Link clicked: ${destination}`)
    console.log('[Debug] PlaySound function:', typeof playSound)
    playSound(soundType)
  }
  
  return (
    <main className="w-full h-full px-4 py-6 flex flex-col items-center justify-center venezuela-pattern overflow-y-auto">
      <div className="text-center">
        {/* 主标题 */}
        <div className="float-animation mb-6">
          <h1 className="text-5xl font-bold text-white mb-3 venezuela-text-shadow">
            🇻🇪 Venezolario
          </h1>
          <div className="flex justify-center items-center space-x-2 mb-2">
            <span className="text-xl">🎯</span>
            <p className="text-lg text-white/90 venezuela-text-shadow">
              Juego de adivinanzas de jerga venezolana
            </p>
            <span className="text-xl">🎊</span>
          </div>
          <div className="text-sm text-white/70 venezuela-text-shadow">
            Explora la rica cultura lingüística de Venezuela
          </div>
        </div>
        
        {/* 装饰性元素 */}
        <div className="flex justify-center space-x-4 mb-6">
          <div className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>💃</div>
          <div className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎵</div>
          <div className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🏖️</div>
        </div>
        
        {/* 主要按钮 */}
        <div className="space-y-3 max-w-sm mx-auto">
          <Link 
            href="/game" 
            className="block w-full btn-primary text-lg py-3 pulse-glow"
            onClick={() => handleLinkClick('/game', 'click')}
          >
            🎮 Comenzar Juego
          </Link>
          
          <Link 
            href="/dictionary" 
            className="block w-full btn-secondary text-lg py-3"
            onClick={() => handleLinkClick('/dictionary', 'click')}
          >
            📖 Diccionario
          </Link>
          
          <Link 
            href="/cards" 
            className="block w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-lg shadow-lg hover:shadow-xl"
            onClick={() => handleLinkClick('/cards', 'click')}
          >
            🎴 Colección de Cartas
          </Link>
        </div>

        {/* 底部装饰 */}
        <div className="mt-8 glass-card p-4 max-w-lg mx-auto">
          <div className="text-white/90 text-sm leading-relaxed">
            <p className="mb-2">🌟 Aquí aprenderás:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>• Jerga auténtica venezolana</div>
              <div>• Contexto cultural rico</div>
              <div>• Historias lingüísticas</div>
              <div>• Cartas coleccionables</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}