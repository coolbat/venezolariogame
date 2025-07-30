'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAudioStore } from '@/stores/audioStore'
import { useLanguage } from '@/contexts/LanguageContext'
import { Word } from '@/types'
import { loadWords, getRandomWord, checkGuess } from '@/lib/data'
import SocialShare from '@/components/ui/SocialShare'

export default function Hero() {
  const [currentWord, setCurrentWord] = useState<Word | null>(null)
  const [guess, setGuess] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [score, setScore] = useState(0)
  const { playSound } = useAudioStore()
  const { t } = useLanguage()

  useEffect(() => {
    loadWords().then(words => {
      if (words.length > 0) {
        setCurrentWord(getRandomWord(words))
      }
    })
  }, [])

  const handleGuess = () => {
    if (!currentWord || !guess.trim()) return
    
    const correct = checkGuess(guess, currentWord.venezuelanWord)
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      playSound('correct')
      setScore(prev => prev + (10 - hintsUsed * 2))
    } else {
      playSound('incorrect')
    }
  }

  const handleNextWord = () => {
    loadWords().then(words => {
      if (words.length > 0) {
        setCurrentWord(getRandomWord(words))
        setGuess('')
        setShowResult(false)
        setHintsUsed(0)
      }
    })
  }

  const getHint = () => {
    if (!currentWord) return ''
    if (hintsUsed === 0) {
      return `Primera letra: ${currentWord.venezuelanWord[0].toUpperCase()}`
    } else if (hintsUsed === 1) {
      return `Pronunciación: ${currentWord.pronunciation}`
    } else if (hintsUsed === 2) {
      return `Ejemplo: ${currentWord.examples[0]}`
    }
    return 'No hay más pistas disponibles'
  }

  const useHint = () => {
    if (hintsUsed < 3) {
      setHintsUsed(prev => prev + 1)
      playSound('hint')
    }
  }

  return (
    <section id="game" className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-primary-600">🇻🇪 {t('hero.title')}</span>
            <br />
            <span className="text-gray-700 text-3xl sm:text-4xl lg:text-5xl">
              {t('hero.subtitle')}
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
            {t('hero.description')}
          </p>
        </div>

        {/* Centered Game Demo */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('hero.gameDemo')}
              </h2>
              <div className="text-sm text-gray-600">
                {t('hero.score')}: <span className="font-bold text-primary-600">{score}</span>
              </div>
            </div>

            {currentWord ? (
              <div className="space-y-6">
                {/* Question */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-lg font-medium text-gray-700 mb-2">
                      {t('hero.standardWord')}
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      {currentWord.standardWord}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {currentWord.definition}
                    </div>
                  </div>
                </div>

                {/* Hints */}
                {hintsUsed > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="text-sm font-medium text-yellow-800">
                      💡 Pista: {getHint()}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="space-y-3">
                  <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder={t('hero.inputPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                    disabled={showResult}
                  />
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleGuess}
                      disabled={!guess.trim() || showResult}
                      className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t('hero.guess')}
                    </button>
                    <button
                      onClick={useHint}
                      disabled={hintsUsed >= 3 || showResult}
                      className="px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t('hero.hint')}
                    </button>
                  </div>
                </div>

                {/* Result */}
                {showResult && (
                  <div className={`rounded-lg p-4 text-center ${
                    isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className={`text-lg font-bold mb-2 ${
                      isCorrect ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {isCorrect ? t('hero.correct') : t('hero.tryAgain')}
                    </div>
                    <div className="text-sm text-gray-700 mb-3">
                      {t('hero.answer')} <span className="font-bold">{currentWord.venezuelanWord}</span>
                      <br />
                      {t('hero.pronunciation')} {currentWord.pronunciation}
                    </div>
                    <button
                      onClick={handleNextWord}
                      className="btn-primary px-6 py-2"
                    >
                      {t('hero.nextWord')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <div className="text-gray-600">{t('hero.loading')}</div>
              </div>
            )}
          </div>

          {/* Game Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dictionary" 
              className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center"
              onClick={() => playSound('click')}
            >
              {t('hero.dictionary')}
            </Link>
            <Link 
              href="/cards" 
              className="btn-secondary text-lg px-8 py-3 inline-flex items-center justify-center"
              onClick={() => playSound('click')}
            >
              {t('hero.cards')}
            </Link>
          </div>

          {/* Social Share */}
          <div className="mt-8 flex justify-center">
            <SocialShare 
              url={typeof window !== 'undefined' ? window.location.href : ''}
              title={t('share.text')}
              description={t('share.description')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}