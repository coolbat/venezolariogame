'use client'

import { useState, useEffect } from 'react'
import { Word } from '@/types'
import { loadWords } from '@/lib/data'
import WordCard from '@/components/dictionary/WordCard'
import SearchBar from '@/components/dictionary/SearchBar'
import CategoryFilter from '@/components/dictionary/CategoryFilter'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-gray-800 text-xl">Cargando diccionario...</div>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Diccionario Venezolano</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explora nuestro completo diccionario de jerga venezolana con pronunciación, 
              ejemplos y contexto cultural para cada palabra.
            </p>
          </div>

          {/* 搜索和筛选 */}
          <div className="mb-8 space-y-6">
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
          <div className="mb-8 text-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 inline-block">
              <span className="text-gray-700 text-sm">
                Se encontraron <span className="font-bold text-primary-600">{filteredWords.length}</span> palabras
              </span>
            </div>
          </div>

          {/* 词汇列表 */}
          {filteredWords.length === 0 ? (
            <div className="text-center text-gray-600 text-base">
              {searchTerm || selectedCategory !== 'all' ? 'No se encontraron palabras coincidentes' : 'Diccionario vacío'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWords.map((word) => (
                <WordCard key={word.id} word={word} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}