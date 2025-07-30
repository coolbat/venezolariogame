'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function HowItWorks() {
  const { t } = useLanguage()
  
  const steps = [
    {
      step: '1',
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.desc'),
      icon: '📝'
    },
    {
      step: '2',
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.desc'),
      icon: '🤔'
    },
    {
      step: '3',
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.desc'),
      icon: '💡'
    },
    {
      step: '4',
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.desc'),
      icon: '🎴'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((stepItem, index) => (
            <div key={index} className="text-center">
              {/* Step Number Circle */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {stepItem.step}
                </div>
                <div className="text-4xl">{stepItem.icon}</div>
                {/* Connector Line (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-200 -translate-y-0.5" 
                       style={{ width: 'calc(100% - 2rem)' }}>
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {stepItem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {stepItem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Example Section */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              {t('howItWorks.example')}
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary-500">
                  <div className="font-medium text-primary-800">{t('howItWorks.example.spanish')}</div>
                  <div className="text-xl font-bold text-primary-900">joven</div>
                  <div className="text-sm text-primary-700 mt-1">{t('howItWorks.example.definition')}</div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                  <div className="font-medium text-yellow-800">{t('howItWorks.example.hint')}</div>
                  <div className="text-yellow-900">{t('howItWorks.example.hintText')}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <div className="font-medium text-green-800">{t('howItWorks.example.correct')}</div>
                  <div className="text-xl font-bold text-green-900">chamo</div>
                  <div className="text-sm text-green-700 mt-1">{t('howItWorks.example.pronunciation')}</div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="font-medium text-blue-800">{t('howItWorks.example.card')}</div>
                  <div className="text-blue-900">{t('howItWorks.example.cardText')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a 
            href="/#game"
            className="inline-block btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t('howItWorks.button')}
          </a>
        </div>
      </div>
    </section>
  )
}