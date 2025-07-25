import Papa from 'papaparse'
import { Word, Card } from '@/types'

export async function loadWords(): Promise<Word[]> {
  try {
    const response = await fetch('/api/words')
    if (!response.ok) {
      throw new Error('Failed to fetch words')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error loading words:', error)
    return []
  }
}

export async function loadCards(): Promise<Card[]> {
  try {
    const response = await fetch('/api/cards')
    if (!response.ok) {
      throw new Error('Failed to fetch cards')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error loading cards:', error)
    return []
  }
}

export function parseCSVWords(csvContent: string): Word[] {
  const parsed = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
  })

  return parsed.data.map((row: any) => ({
    id: row.id,
    standardWord: row.standardWord,
    venezuelanWord: row.venezuelanWord,
    definition: row.definition,
    pronunciation: row.pronunciation,
    examples: row.examples ? row.examples.split('|') : [],
    culturalContext: row.culturalContext,
    category: row.category,
    difficulty: parseInt(row.difficulty) || 1,
    cardId: row.cardId,
  }))
}

export function parseCSVCards(csvContent: string): Card[] {
  const parsed = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
  })

  return parsed.data.map((row: any) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    type: row.type as Card['type'],
    rarity: row.rarity as Card['rarity'],
    wordId: row.wordId,
    unlocked: row.unlocked === 'true',
  }))
}

export function getRandomWord(words: Word[], difficulty?: number): Word | null {
  if (words.length === 0) return null
  
  let filteredWords = words
  if (difficulty) {
    filteredWords = words.filter(word => word.difficulty === difficulty)
  }
  
  if (filteredWords.length === 0) {
    filteredWords = words
  }
  
  const randomIndex = Math.floor(Math.random() * filteredWords.length)
  return filteredWords[randomIndex]
}

export function checkGuess(guess: string, correctAnswer: string): boolean {
  const normalizedGuess = guess.toLowerCase().trim()
  const normalizedAnswer = correctAnswer.toLowerCase().trim()
  
  // 完全匹配
  if (normalizedGuess === normalizedAnswer) {
    return true
  }
  
  // 容错匹配（允许简单的拼写错误）
  if (Math.abs(normalizedGuess.length - normalizedAnswer.length) <= 1) {
    let differences = 0
    const maxLength = Math.max(normalizedGuess.length, normalizedAnswer.length)
    
    for (let i = 0; i < maxLength; i++) {
      if (normalizedGuess[i] !== normalizedAnswer[i]) {
        differences++
      }
    }
    
    // 允许1-2个字符差异
    return differences <= 2
  }
  
  return false
}