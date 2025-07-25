'use client'

import { useState, useEffect } from 'react'
import { Word, GameState } from '@/types'
import { loadWords, getRandomWord, checkGuess } from '@/lib/data'
import WordGuessGame from '@/components/game/WordGuessGame'
import GameHeader from '@/components/game/GameHeader'
import GameResult from '@/components/game/GameResult'
import { useAudioStore } from '@/stores/audioStore'

export default function GamePage() {
  const { playSound } = useAudioStore()
  const [words, setWords] = useState<Word[]>([])
  const [gameState, setGameState] = useState<GameState>({
    currentWord: null,
    score: 0,
    level: 1,
    guessHistory: [],
    hintsUsed: 0,
    isCompleted: false,
  })
  const [loading, setLoading] = useState(true)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    loadGameData()
  }, [])

  const loadGameData = async () => {
    try {
      const wordsData = await loadWords()
      setWords(wordsData)
      
      if (wordsData.length > 0) {
        const firstWord = getRandomWord(wordsData, 1)
        setGameState(prev => ({
          ...prev,
          currentWord: firstWord,
        }))
      }
    } catch (error) {
      console.error('Failed to load game data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGuess = (guess: string) => {
    if (!gameState.currentWord) return

    const isCorrect = checkGuess(guess, gameState.currentWord.venezuelanWord)
    const newGuessHistory = [...gameState.guessHistory, guess]

    if (isCorrect) {
      // 答对了
      playSound('correct')
      const points = Math.max(100 - (gameState.hintsUsed * 10) - (newGuessHistory.length * 5), 10)
      setGameState(prev => ({
        ...prev,
        score: prev.score + points,
        guessHistory: newGuessHistory,
        isCompleted: true,
      }))
      setShowResult(true)
      
      // Reproducir sonido de desbloqueo de carta si hay una carta asociada
      if (gameState.currentWord?.cardId) {
        setTimeout(() => playSound('unlock'), 500)
      }
    } else {
      // 答错了
      playSound('incorrect')
      setGameState(prev => ({
        ...prev,
        guessHistory: newGuessHistory,
      }))
    }
  }

  const handleNextWord = () => {
    playSound('click')
    const nextWord = getRandomWord(words, Math.min(gameState.level, 5))
    const oldLevel = gameState.level
    const newLevel = oldLevel + 1
    
    setGameState(prev => ({
      ...prev,
      currentWord: nextWord,
      guessHistory: [],
      hintsUsed: 0,
      isCompleted: false,
      level: newLevel,
    }))
    setShowResult(false)
    
    // Reproducir sonido de level up cada 5 niveles
    if (newLevel % 5 === 0) {
      setTimeout(() => playSound('level_up'), 200)
    }
  }

  const handleUseHint = () => {
    playSound('hint')
    setGameState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
    }))
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    )
  }

  if (!gameState.currentWord) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-white text-xl">No se pudieron cargar los datos del juego</div>
      </div>
    )
  }

  return (
    <div className="h-full w-full px-4 py-6">
      <GameHeader 
        score={gameState.score} 
        level={gameState.level} 
        onBack={() => window.history.back()}
      />
      
      {showResult ? (
        <GameResult
          word={gameState.currentWord}
          score={gameState.score}
          attemptsUsed={gameState.guessHistory.length}
          hintsUsed={gameState.hintsUsed}
          onNextWord={handleNextWord}
        />
      ) : (
        <WordGuessGame
          word={gameState.currentWord}
          guessHistory={gameState.guessHistory}
          hintsUsed={gameState.hintsUsed}
          onGuess={handleGuess}
          onUseHint={handleUseHint}
        />
      )}
    </div>
  )
}