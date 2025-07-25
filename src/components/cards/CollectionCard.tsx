'use client'

import { Card } from '@/types'
import { useAudioStore } from '@/stores/audioStore'

interface CollectionCardProps {
  card: Card
}

export default function CollectionCard({ card }: CollectionCardProps) {
  const { playSound } = useAudioStore()
  const getRarityColor = (rarity: Card['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-yellow-400 to-orange-500'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getRarityName = (rarity: Card['rarity']) => {
    switch (rarity) {
      case 'common': return 'Común'
      case 'rare': return 'Rara'
      case 'epic': return 'Épica'
      case 'legendary': return 'Legendaria'
      default: return 'Común'
    }
  }

  const getTypeEmoji = (type: Card['type']) => {
    switch (type) {
      case 'expression': return '💬'
      case 'food': return '🍽️'
      case 'person': return '👤'
      case 'festival': return '🎉'
      default: return '🔤'
    }
  }

  if (!card.unlocked) {
    return (
      <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-400 rounded-xl shadow-lg flex flex-col items-center justify-center text-gray-600 relative overflow-hidden">
        {/* 锁定状态 */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl mb-2">🔒</div>
            <div className="text-xs font-medium text-white">Bloqueada</div>
          </div>
        </div>
        
        {/* 卡片轮廓 */}
        <div className="absolute inset-4 border-2 border-dashed border-gray-400 rounded-lg opacity-50"></div>
      </div>
    )
  }

  return (
    <div 
      className={`aspect-[3/4] bg-gradient-to-br ${getRarityColor(card.rarity)} rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden`}
      onClick={() => card.unlocked && playSound('card_flip')}
    >
      {/* 稀有度标识 */}
      <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
        <span className="text-white text-xs font-bold">
          {getRarityName(card.rarity)}
        </span>
      </div>

      {/* 类型标识 */}
      <div className="absolute top-2 left-2 text-2xl">
        {getTypeEmoji(card.type)}
      </div>

      {/* 卡片内容 */}
      <div className="p-4 h-full flex flex-col justify-between text-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            {/* 卡片图标/插图区域 */}
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-3xl">{getTypeEmoji(card.type)}</span>
            </div>
            
            {/* 卡片标题 */}
            <h3 className="text-lg font-bold mb-2 drop-shadow-lg">
              {card.title}
            </h3>
          </div>
        </div>

        {/* 卡片描述 */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
          <p className="text-sm text-center leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>

      {/* 稀有度装饰边框 */}
      <div className="absolute inset-0 rounded-xl border-2 border-white/30"></div>
      
      {/* 闪光效果 */}
      {card.rarity === 'legendary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      )}
    </div>
  )
}