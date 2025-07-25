'use client'

import { Word } from '@/types'
import SpeechButton from '@/components/ui/SpeechButton'

interface WordCardProps {
  word: Word
}

export default function WordCard({ word }: WordCardProps) {
  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'text-green-600 bg-green-100'
      case 2: return 'text-blue-600 bg-blue-100'
      case 3: return 'text-orange-600 bg-orange-100'
      case 4: return 'text-red-600 bg-red-100'
      case 5: return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'expression': return '💬'
      case 'food': return '🍽️'
      case 'person': return '👤'
      case 'festival': return '🎉'
      default: return '🔤'
    }
  }

  return (
    <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* 卡片头部 */}
      <div className="flex justify-between items-start mb-4">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(word.difficulty)}`}>
          {'★'.repeat(word.difficulty)}
        </div>
        <div className="text-2xl">
          {getCategoryEmoji(word.category)}
        </div>
      </div>

      {/* 主要内容 */}
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-primary-100 to-secondary-100 p-4 rounded-lg mb-4">
          <div className="text-lg font-bold text-primary-600 mb-2 flex items-center justify-center gap-3">
            {word.venezuelanWord}
            <SpeechButton 
              text={word.venezuelanWord}
              type="venezuelan"
              size="sm"
              variant="secondary"
              label="Escuchar pronunciación venezolana"
            />
          </div>
          <div className="text-sm text-gray-600">
            {word.pronunciation}
          </div>
        </div>

        <div className="text-gray-700 mb-2 flex items-center justify-center gap-2">
          <span className="font-semibold">Español estándar:</span> {word.standardWord}
          <SpeechButton 
            text={word.standardWord}
            type="standard"
            size="sm"
            variant="minimal"
            label="Escuchar pronunciación estándar"
          />
        </div>

        <div className="text-gray-600 text-sm">
          {word.definition}
        </div>
      </div>

      {/* 例句 */}
      {word.examples.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-700 mb-2">Ejemplo:</div>
          <div className="text-sm text-gray-600 italic flex items-start gap-2">
            "{word.examples[0]}"
            <SpeechButton 
              text={word.examples[0]}
              type="example"
              size="sm"
              variant="minimal"
              label="Escuchar ejemplo"
            />
          </div>
        </div>
      )}

      {/* 文化背景 */}
      <div className="border-t pt-4">
        <div className="text-xs font-semibold text-gray-600 mb-1">Contexto cultural:</div>
        <div className="text-xs text-gray-500 leading-relaxed">
          {word.culturalContext}
        </div>
      </div>

      {/* 分类标签 */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
          {word.category}
        </span>
        
        {word.cardId && (
          <div className="text-xs text-yellow-600 flex items-center">
            🎴 Carta disponible
          </div>
        )}
      </div>
    </div>
  )
}