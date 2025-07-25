'use client'

interface CollectionStatsProps {
  totalCards: number
  unlockedCards: number
  collectionRate: number
}

export default function CollectionStats({ 
  totalCards, 
  unlockedCards, 
  collectionRate 
}: CollectionStatsProps) {
  const getCollectionLevel = (rate: number) => {
    if (rate >= 90) return { level: 'Coleccionista Maestro', color: 'text-yellow-400', emoji: '🏆' }
    if (rate >= 70) return { level: 'Coleccionista Avanzado', color: 'text-purple-400', emoji: '🎖️' }
    if (rate >= 50) return { level: 'Coleccionista Intermedio', color: 'text-blue-400', emoji: '🥉' }
    if (rate >= 25) return { level: 'Coleccionista Principiante', color: 'text-green-400', emoji: '📋' }
    return { level: 'Coleccionista Novato', color: 'text-gray-400', emoji: '🔰' }
  }

  const collectionLevel = getCollectionLevel(collectionRate)

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      {/* 收藏等级 */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{collectionLevel.emoji}</div>
        <div className={`text-xl font-bold ${collectionLevel.color}`}>
          {collectionLevel.level}
        </div>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center">
          <div className="text-xl font-bold text-white">{unlockedCards}</div>
          <div className="text-xs text-white/70">Coleccionadas</div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-bold text-white">{totalCards}</div>
          <div className="text-xs text-white/70">Total cartas</div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-bold text-white">{collectionRate.toFixed(1)}%</div>
          <div className="text-xs text-white/70">Completado</div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-white/70 mb-2">
          <span>Progreso de colección</span>
          <span>{unlockedCards}/{totalCards}</span>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${collectionRate}%` }}
          ></div>
        </div>
      </div>

      {/* 下一级别提示 */}
      {collectionRate < 90 && (
        <div className="text-center text-xs text-white/60">
          Colecciona {Math.ceil((totalCards * (
            collectionRate < 25 ? 0.25 : 
            collectionRate < 50 ? 0.5 : 
            collectionRate < 70 ? 0.7 : 0.9
          )) - unlockedCards)} cartas más para el siguiente nivel
        </div>
      )}
    </div>
  )
}