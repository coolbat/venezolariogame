'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/types'
import { loadCards } from '@/lib/data'
import CollectionCard from '@/components/cards/CollectionCard'
import CollectionStats from '@/components/cards/CollectionStats'
import RarityFilter from '@/components/cards/RarityFilter'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-gray-800 text-xl">Cargando colección de cartas...</div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Colección de Cartas</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Colecciona hermosas cartas culturales que narran las historias detrás de cada 
              expresión venezolana. Cada carta desbloqueada es un paso más en tu aventura cultural.
            </p>
          </div>

          {/* 收集统计 */}
          <div className="mb-8">
            <CollectionStats
              totalCards={cards.length}
              unlockedCards={unlockedCards.length}
              collectionRate={collectionRate}
            />
          </div>

          {/* 稀有度筛选 */}
          <div className="mb-8">
            <RarityFilter
              selectedRarity={selectedRarity}
              onRarityChange={setSelectedRarity}
            />
          </div>

          {/* 卡片网格 */}
          {filteredCards.length === 0 ? (
            <div className="text-center text-gray-600 text-base">
              {selectedRarity !== 'all' ? 'No hay cartas de esta rareza' : 'No hay cartas disponibles'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCards.map((card) => (
                <CollectionCard key={card.id} card={card} />
              ))}
            </div>
          )}

          {/* 收集提示 */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💡 ¿Cómo obtener más cartas?</h3>
              <div className="text-gray-600 space-y-3 text-sm">
                <p>• Adivina palabras correctamente para desbloquear cartas culturales</p>
                <p>• Cada palabra tiene su propia carta cultural esperando ser coleccionada</p>
                <p>• Diferentes dificultades corresponden a diferentes rarezas de cartas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}