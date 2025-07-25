'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/types'
import { loadCards } from '@/lib/data'
import CollectionCard from '@/components/cards/CollectionCard'
import CollectionStats from '@/components/cards/CollectionStats'
import RarityFilter from '@/components/cards/RarityFilter'

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([])
  const [filteredCards, setFilteredCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRarity, setSelectedRarity] = useState<string>('all')

  useEffect(() => {
    loadCardsData()
  }, [])

  useEffect(() => {
    filterCards()
  }, [cards, selectedRarity])

  const loadCardsData = async () => {
    try {
      const cardsData = await loadCards()
      // 模拟一些卡片已解锁（实际应用中从用户数据读取）
      const updatedCards = cardsData.map((card, index) => ({
        ...card,
        unlocked: index < 5 // 前5张卡片已解锁
      }))
      setCards(updatedCards)
    } catch (error) {
      console.error('Failed to load cards:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterCards = () => {
    let filtered = cards

    if (selectedRarity !== 'all') {
      filtered = filtered.filter(card => card.rarity === selectedRarity)
    }

    setFilteredCards(filtered)
  }

  const unlockedCards = cards.filter(card => card.unlocked)
  const collectionRate = cards.length > 0 ? (unlockedCards.length / cards.length) * 100 : 0

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-white text-xl">Cargando colección de cartas...</div>
      </div>
    )
  }

  return (
    <div className="h-full w-full px-4 py-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => window.history.back()}
          className="text-white hover:text-yellow-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h1 className="text-2xl font-bold text-white">Colección de Cartas</h1>
        
        <div className="w-6 h-6"></div>
      </div>

      {/* 收集统计 */}
      <div className="mb-6">
        <CollectionStats
          totalCards={cards.length}
          unlockedCards={unlockedCards.length}
          collectionRate={collectionRate}
        />
      </div>

      {/* 稀有度筛选 */}
      <div className="mb-6">
        <RarityFilter
          selectedRarity={selectedRarity}
          onRarityChange={setSelectedRarity}
        />
      </div>

      {/* 卡片网格 */}
      {filteredCards.length === 0 ? (
        <div className="text-center text-white text-base">
          {selectedRarity !== 'all' ? 'No hay cartas de esta rareza' : 'No hay cartas disponibles'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCards.map((card) => (
            <CollectionCard key={card.id} card={card} />
          ))}
        </div>
      )}

      {/* 收集提示 */}
      <div className="mt-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-3">💡 ¿Cómo obtener más cartas?</h3>
          <div className="text-white/90 space-y-2 text-sm">
            <p>• Adivina palabras correctamente para desbloquear cartas culturales</p>
            <p>• Cada palabra tiene su propia carta cultural esperando ser coleccionada</p>
            <p>• Diferentes dificultades corresponden a diferentes rarezas de cartas</p>
          </div>
        </div>
      </div>
    </div>
  )
}