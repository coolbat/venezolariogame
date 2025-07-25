'use client'

import { useState } from 'react'
import { Word } from '@/types'

interface WordGuessGameProps {
  word: Word
  guessHistory: string[]
  hintsUsed: number
  onGuess: (guess: string) => void
  onUseHint: () => void
}

export default function WordGuessGame({ 
  word, 
  guessHistory, 
  hintsUsed, 
  onGuess, 
  onUseHint 
}: WordGuessGameProps) {
  const [currentGuess, setCurrentGuess] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentGuess.trim()) {
      onGuess(currentGuess.trim())
      setCurrentGuess('')
    }
  }

  const getHint = () => {
    if (hintsUsed === 0) {
      return `Primera letra: ${word.venezuelanWord[0].toUpperCase()}`
    } else if (hintsUsed === 1) {
      return `Pronunciación: ${word.pronunciation}`
    } else if (hintsUsed === 2) {
      return `Ejemplo: ${word.examples[0]}`
    }
    return 'No hay más pistas disponibles'
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* 题目卡片 */}
      <div className="card mb-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Adivina esta jerga venezolana
          </h2>
          
          <div className="bg-gradient-to-r from-primary-100 to-secondary-100 p-4 rounded-lg mb-4">
            <div className="text-base text-gray-700 mb-2">Español estándar:</div>
            <div className="text-2xl font-bold text-primary-600">
              {word.standardWord}
            </div>
          </div>
          
          <div className="text-gray-600 mb-3 text-sm">
            <strong>Significado:</strong> {word.definition}
          </div>
          
          <div className="text-xs text-gray-500">
            <strong>Categoría:</strong> {word.category} | <strong>Dificultad:</strong> {'★'.repeat(word.difficulty)}
          </div>
        </div>
      </div>

      {/* 提示区域 */}
      {hintsUsed > 0 && (
        <div className="card mb-4 bg-yellow-50 border-yellow-200">
          <div className="text-center">
            <h3 className="text-base font-semibold text-yellow-800 mb-2">💡 Pista</h3>
            <p className="text-yellow-700 text-sm">{getHint()}</p>
          </div>
        </div>
      )}

      {/* 猜测历史 */}
      {guessHistory.length > 0 && (
        <div className="card mb-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Tus intentos:</h3>
          <div className="space-y-2">
            {guessHistory.map((guess, index) => (
              <div 
                key={index}
                className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-3 py-2"
              >
                <span className="text-red-700 text-sm">{guess}</span>
                <span className="text-red-500 text-sm">❌</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 输入区域 */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="guess" className="block text-base font-semibold text-gray-800 mb-2">
              Tu respuesta:
            </label>
            <input
              type="text"
              id="guess"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-base"
              placeholder="Escribe la jerga venezolana..."
              autoComplete="off"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 btn-primary text-base py-2"
              disabled={!currentGuess.trim()}
            >
              Enviar Respuesta
            </button>
            
            <button
              type="button"
              onClick={onUseHint}
              className="btn-secondary px-4 py-2 text-sm"
              disabled={hintsUsed >= 3}
            >
              💡 Pista ({hintsUsed}/3)
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}