'use client'

interface GameHeaderProps {
  score: number
  level: number
  onBack: () => void
}

export default function GameHeader({ score, level, onBack }: GameHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <button
        onClick={onBack}
        className="text-white hover:text-yellow-300 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div className="flex space-x-6 text-white">
        <div className="text-center">
          <div className="text-sm opacity-80">Nivel</div>
          <div className="text-xl font-bold">{level}</div>
        </div>
        
        <div className="text-center">
          <div className="text-sm opacity-80">Puntos</div>
          <div className="text-xl font-bold">{score}</div>
        </div>
      </div>
    </div>
  )
}