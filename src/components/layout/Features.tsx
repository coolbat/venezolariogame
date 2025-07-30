'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Features() {
  const { t } = useLanguage()
  
  const features = [
    {
      icon: '🎯',
      title: t('features.interactive.title'),
      description: t('features.interactive.desc'),
    },
    {
      icon: '🏛️',
      title: t('features.cultural.title'),
      description: t('features.cultural.desc'),
    },
    {
      icon: '🎴',
      title: t('features.cards.title'),
      description: t('features.cards.desc'),
    },
    {
      icon: '🔊',
      title: t('features.pronunciation.title'),
      description: t('features.pronunciation.desc'),
    },
    {
      icon: '📚',
      title: t('features.dictionary.title'),
      description: t('features.dictionary.desc'),
    },
    {
      icon: '🎮',
      title: t('features.gamified.title'),
      description: t('features.gamified.desc'),
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200"
            >
              <div className="text-4xl mb-4 text-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-400 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t('features.cta.title')}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {t('features.cta.subtitle')}
            </p>
            <a 
              href="/#game"
              className="inline-block bg-white text-primary-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              {t('features.cta.button')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}