export interface Word {
  id: string
  standardWord: string      // 标准西班牙语词汇
  venezuelanWord: string    // 委内瑞拉俚语
  definition: string        // 定义
  pronunciation: string     // 发音
  examples: string[]        // 例句
  culturalContext: string   // 文化背景
  category: string          // 分类
  difficulty: number        // 难度级别 1-5
  cardId?: string          // 关联卡片ID
}

export interface Card {
  id: string
  title: string
  description: string
  imageUrl?: string
  type: 'expression' | 'person' | 'food' | 'festival'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  wordId: string
  unlocked: boolean
}

export interface GameState {
  currentWord: Word | null
  score: number
  level: number
  guessHistory: string[]
  hintsUsed: number
  isCompleted: boolean
}

export interface GuessResult {
  isCorrect: boolean
  message: string
  score?: number
}