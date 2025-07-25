'use client'

import { useState, useEffect } from 'react'
import { Word } from '@/types'
import { loadWords } from '@/lib/data'
import WordCard from '@/components/dictionary/WordCard'
import SearchBar from '@/components/dictionary/SearchBar'
import CategoryFilter from '@/components/dictionary/CategoryFilter'

export default function DictionaryPage() {
  const [words, setWords] = useState<Word[]>([])
  const [filteredWords, setFilteredWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    loadDictionaryData()
  }, [])

  useEffect(() => {
    filterWords()
  }, [words, searchTerm, selectedCategory])

  const loadDictionaryData = async () => {
    try {
      const wordsData = await loadWords()
      setWords(wordsData)
    } catch (error) {
      console.error('Failed to load dictionary:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterWords = () => {
    let filtered = words

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(word =>
        word.venezuelanWord.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.standardWord.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.definition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(word => word.category === selectedCategory)
    }

    setFilteredWords(filtered)
  }

  const categories = Array.from(new Set(words.map(word => word.category)))

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-white text-xl">Cargando diccionario...</div>
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
        
        <h1 className="text-2xl font-bold text-white">Diccionario Venezolano</h1>
        
        <div className="w-6 h-6"></div>
      </div>

      {/* 搜索和筛选 */}
      <div className="mb-6 space-y-3">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* 统计信息 */}
      <div className="mb-4 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 inline-block">
          <span className="text-white text-sm">
            Se encontraron <span className="font-bold text-yellow-300">{filteredWords.length}</span> palabras
          </span>
        </div>
      </div>

      {/* 词汇列表 */}
      {filteredWords.length === 0 ? (
        <div className="text-center text-white text-base">
          {searchTerm || selectedCategory !== 'all' ? 'No se encontraron palabras coincidentes' : 'Diccionario vacío'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      )}
    </div>
  )
}