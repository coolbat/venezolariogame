'use client'

import { Card } from '@/types'

interface RarityFilterProps {
  selectedRarity: string
  onRarityChange: (rarity: string) => void
}

export default function RarityFilter({ selectedRarity, onRarityChange }: RarityFilterProps) {
  const rarities: { value: string; label: string; emoji: string; color: string }[] = [
    { value: 'all', label: 'Todas', emoji: '🌟', color: 'from-gray-400 to-gray-600' },
    { value: 'common', label: 'Común', emoji: '⚪', color: 'from-gray-400 to-gray-600' },
    { value: 'rare', label: 'Rara', emoji: '🔵', color: 'from-blue-400 to-blue-600' },
    { value: 'epic', label: 'Épica', emoji: '🟣', color: 'from-purple-400 to-purple-600' },
    { value: 'legendary', label: 'Legendaria', emoji: '🟡', color: 'from-yellow-400 to-orange-500' },
  ]

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {rarities.map((rarity) => (
        <button
          key={rarity.value}
          onClick={() => onRarityChange(rarity.value)}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
            selectedRarity === rarity.value
              ? `bg-gradient-to-r ${rarity.color} text-white shadow-lg transform scale-105`
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm'
          }`}
        >
          <span>{rarity.emoji}</span>
          <span>{rarity.label}</span>
        </button>
      ))}
    </div>
  )
}