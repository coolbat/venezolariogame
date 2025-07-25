'use client'

import { Word } from '@/types'
import SpeechButton from '@/components/ui/SpeechButton'

interface GameResultProps {
  word: Word
  score: number
  attemptsUsed: number
  hintsUsed: number
  onNextWord: () => void
}

export default function GameResult({ 
  word, 
  score, 
  attemptsUsed, 
  hintsUsed, 
  onNextWord 
}: GameResultProps) {
  const getPerformanceMessage = () => {
    if (attemptsUsed === 1 && hintsUsed === 0) {
      return { message: '🎉 ¡Perfecto! ¡Primer intento!', color: 'text-green-600' }
    } else if (attemptsUsed <= 3) {
      return { message: '👍 ¡Muy bien!', color: 'text-blue-600' }
    } else {
      return { message: '💪 ¡Sigue intentando!', color: 'text-orange-600' }
    }
  }

  const performance = getPerformanceMessage()

  return (
    <div className="max-w-2xl mx-auto">
      {/* 成功提示 */}
      <div className="card mb-6 text-center bg-green-50 border-green-200">
        <div className="text-3xl mb-3">🎉</div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">¡Correcto!</h2>
        <p className={`text-lg ${performance.color} font-semibold`}>
          {performance.message}
        </p>
      </div>

      {/* 词语详情 */}
      <div className="card mb-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Detalles de la palabra</h3>
          
          <div className="bg-gradient-to-r from-primary-100 to-secondary-100 p-4 rounded-lg mb-4">
            <div className="text-base text-gray-700 mb-2">Jerga venezolana:</div>
            <div className="text-3xl font-bold text-primary-600 mb-3 flex items-center justify-center gap-3">
              {word.venezuelanWord}
              <SpeechButton 
                text={word.venezuelanWord}
                type="venezuelan"
                size="md"
                variant="secondary"
                label="Escuchar pronunciación venezolana"
              />
            </div>
            <div className="text-base text-gray-600 flex items-center justify-center gap-2">
              Pronunciación: {word.pronunciation}
            </div>
          </div>

          <div className="text-left space-y-3 text-sm">
            <div>
              <strong className="text-gray-800">Significado:</strong>
              <span className="text-gray-600 ml-2">{word.definition}</span>
            </div>
            
            <div>
              <strong className="text-gray-800">Ejemplos:</strong>
              <ul className="mt-2 space-y-1">
                {word.examples.map((example, index) => (
                  <li key={index} className="text-gray-600 ml-4 flex items-start gap-2">
                    • {example}
                    <SpeechButton 
                      text={example}
                      type="example"
                      size="sm"
                      variant="minimal"
                      label="Escuchar ejemplo"
                    />
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong className="text-gray-800">Contexto cultural:</strong>
              <p className="text-gray-600 mt-2">{word.culturalContext}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 得分统计 */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">Estadísticas de la ronda</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-xl font-bold text-blue-600">{score}</div>
            <div className="text-xs text-blue-500">Puntos obtenidos</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-xl font-bold text-orange-600">{attemptsUsed}</div>
            <div className="text-xs text-orange-500">Intentos</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-xl font-bold text-purple-600">{hintsUsed}</div>
            <div className="text-xs text-purple-500">Pistas usadas</div>
          </div>
        </div>
      </div>

      {/* 解锁卡片提示 */}
      {word.cardId && (
        <div className="card mb-6 bg-yellow-50 border-yellow-200 text-center">
          <div className="text-xl mb-2">🎴</div>
          <h3 className="text-base font-semibold text-yellow-800 mb-2">¡Nueva carta desbloqueada!</h3>
          <p className="text-yellow-700 text-sm">
            Has desbloqueado la carta cultural de "{word.venezuelanWord}"
          </p>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex space-x-3">
        <button
          onClick={onNextWord}
          className="flex-1 btn-primary text-base py-3"
        >
          Siguiente palabra
        </button>
        
        <button
          onClick={() => window.location.href = '/dictionary'}
          className="btn-secondary px-4 py-3 text-sm"
        >
          Ver diccionario
        </button>
      </div>
    </div>
  )
}