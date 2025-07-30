'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAudioStore } from '@/stores/audioStore'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { playSound } = useAudioStore()
  const { language, setLanguage, t } = useLanguage()

  const handleClick = () => {
    playSound('click')
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-primary-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 font-bold text-xl text-primary-600 hover:text-primary-700 transition-colors"
            onClick={handleClick}
          >
            <span className="text-2xl">🇻🇪</span>
            <span>Venezolario</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/#game" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              onClick={handleClick}
            >
              {t('nav.game')}
            </Link>
            <Link 
              href="/#features" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              onClick={handleClick}
            >
              {t('nav.features')}
            </Link>
            <Link 
              href="/#how-it-works" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              onClick={handleClick}
            >
              {t('nav.howItWorks')}
            </Link>
            <Link 
              href="/#faq" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              onClick={handleClick}
            >
              {t('nav.faq')}
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              onClick={handleClick}
            >
              {t('nav.blog')}
            </Link>
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                <span className="text-sm">{language === 'es' ? '🇪🇸' : '🇺🇸'}</span>
                <span className="text-sm">{language === 'es' ? 'ES' : 'EN'}</span>
              </button>
            </div>
            
            <Link 
              href="/dictionary" 
              className="btn-primary px-4 py-2"
              onClick={handleClick}
            >
              {t('nav.dictionary')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/#game" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={handleClick}
              >
                {t('nav.game')}
              </Link>
              <Link 
                href="/#features" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={handleClick}
              >
                {t('nav.features')}
              </Link>
              <Link 
                href="/#how-it-works" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={handleClick}
              >
                {t('nav.howItWorks')}
              </Link>
              <Link 
                href="/#faq" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={handleClick}
              >
                {t('nav.faq')}
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={handleClick}
              >
                {t('nav.blog')}
              </Link>
              
              {/* Mobile Language Switcher */}
              <button
                onClick={() => {
                  setLanguage(language === 'es' ? 'en' : 'es')
                  handleClick()
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
              >
                <span>{language === 'es' ? '🇪🇸' : '🇺🇸'}</span>
                <span>{language === 'es' ? 'Español' : 'English'}</span>
              </button>
              
              <Link 
                href="/dictionary" 
                className="btn-primary px-4 py-2 text-center"
                onClick={handleClick}
              >
                {t('nav.dictionary')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}