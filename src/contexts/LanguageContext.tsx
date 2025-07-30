'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    // Navigation
    'nav.game': 'Juego',
    'nav.features': 'Características',
    'nav.howItWorks': 'Cómo Funciona',
    'nav.faq': 'FAQ',
    'nav.dictionary': 'Diccionario',
    'nav.blog': 'Blog',
    
    // Hero Section
    'hero.title': 'Venezolario',
    'hero.subtitle': 'Aprende Jerga Venezolana',
    'hero.description': 'Descubre la rica cultura lingüística de Venezuela a través de un juego interactivo de adivinanzas. Aprende palabras auténticas, su pronunciación y contexto cultural.',
    'hero.playGame': '🎮 Jugar Ahora',
    'hero.dictionary': '📖 Ver Diccionario Completo',
    'hero.cards': '🎴 Colección de Cartas',
    'hero.gameDemo': '¡Prueba el Juego Ahora!',
    'hero.score': 'Puntuación',
    'hero.standardWord': 'Palabra en español estándar:',
    'hero.guess': 'Adivinar',
    'hero.hint': '💡 Pista',
    'hero.correct': '¡Correcto! 🎉',
    'hero.tryAgain': '¡Inténtalo de nuevo! 😊',
    'hero.answer': 'La respuesta es:',
    'hero.pronunciation': 'Pronunciación:',
    'hero.nextWord': 'Siguiente Palabra',
    'hero.loading': 'Cargando juego...',
    'hero.inputPlaceholder': 'Escribe la jerga venezolana...',
    
    // Features
    'features.title': '¿Por Qué Elegir Venezolario?',
    'features.subtitle': 'Descubre las características que hacen de Venezolario la mejor manera de aprender la rica jerga venezolana de forma divertida e interactiva.',
    'features.interactive.title': 'Aprendizaje Interactivo',
    'features.interactive.desc': 'Aprende jerga venezolana auténtica a través de juegos de adivinanzas que te mantienen comprometido y motivado.',
    'features.cultural.title': 'Contexto Cultural Rico',
    'features.cultural.desc': 'Cada palabra viene con su historia cultural, pronunciación correcta y ejemplos de uso en situaciones reales.',
    'features.cards.title': 'Cartas Coleccionables',
    'features.cards.desc': 'Desbloquea hermosas cartas culturales con diferentes niveles de rareza mientras progresas en tu aprendizaje.',
    'features.pronunciation.title': 'Pronunciación Correcta',
    'features.pronunciation.desc': 'Aprende la pronunciación exacta de cada expresión venezolana con guías fonéticas detalladas.',
    'features.dictionary.title': 'Diccionario Completo',
    'features.dictionary.desc': 'Accede a un diccionario completo de jerga venezolana organizado por categorías y niveles de dificultad.',
    'features.gamified.title': 'Progresión Gamificada',
    'features.gamified.desc': 'Sistema de puntuación, pistas inteligentes y desafíos progresivos que hacen el aprendizaje divertido.',
    'features.cta.title': '¡Comienza Tu Aventura Cultural Ahora!',
    'features.cta.subtitle': 'Únete a miles de personas que ya están descubriendo la riqueza del español venezolano.',
    'features.cta.button': 'Jugar Ahora Gratis',
    
    // How It Works
    'howItWorks.title': '¿Cómo Funciona Venezolario?',
    'howItWorks.subtitle': 'Aprender jerga venezolana nunca fue tan fácil y divertido. Sigue estos simples pasos para sumergirte en la cultura lingüística de Venezuela.',
    'howItWorks.step1.title': 'Elige una Palabra',
    'howItWorks.step1.desc': 'El juego te presenta una palabra en español estándar con su definición para que entiendas el contexto.',
    'howItWorks.step2.title': 'Adivina la Jerga',
    'howItWorks.step2.desc': 'Intenta adivinar cómo se dice esa palabra en jerga venezolana. ¡Usa tu intuición cultural!',
    'howItWorks.step3.title': 'Usa Pistas si Necesitas',
    'howItWorks.step3.desc': 'Si te quedas atorado, puedes usar pistas como la primera letra, pronunciación o ejemplos de uso.',
    'howItWorks.step4.title': 'Aprende y Colecciona',
    'howItWorks.step4.desc': 'Descubre la respuesta correcta, aprende sobre su origen cultural y desbloquea cartas coleccionables.',
    'howItWorks.example': 'Ejemplo de Juego',
    'howItWorks.example.spanish': 'Palabra en español:',
    'howItWorks.example.definition': 'Definición: Persona de poca edad',
    'howItWorks.example.hint': '💡 Pista disponible:',
    'howItWorks.example.hintText': 'Primera letra: C',
    'howItWorks.example.correct': '✅ Respuesta correcta:',
    'howItWorks.example.pronunciation': 'Pronunciación: CHAH-moh',
    'howItWorks.example.card': '🎴 Carta desbloqueada:',
    'howItWorks.example.cardText': '"Chamo" - Expresión icónica venezolana',
    'howItWorks.button': '¡Empezar a Jugar Ahora!',
    
    // FAQ
    'faq.title': 'Preguntas Frecuentes',
    'faq.subtitle': 'Encuentra respuestas a las preguntas más comunes sobre Venezolario',
    'faq.contact.title': '¿Tienes Más Preguntas?',
    'faq.contact.subtitle': 'Si no encontraste la respuesta que buscabas, no dudes en contactarnos.',
    'faq.contact.button': 'Contactar Soporte',
    
    // FAQ Items
    'faq.q1': '¿Qué es Venezolario?',
    'faq.a1': 'Venezolario es un juego educativo interactivo diseñado para enseñar jerga y expresiones venezolanas auténticas. A través de adivinanzas, contexto cultural y cartas coleccionables, los usuarios aprenden el rico vocabulario de Venezuela de manera divertida.',
    'faq.q2': '¿Cómo funciona el sistema de puntuación?',
    'faq.a2': 'Ganas puntos por cada respuesta correcta. Empiezas con 10 puntos por palabra, pero cada pista usada reduce tu puntuación en 2 puntos. ¡Intenta adivinar sin pistas para obtener la máxima puntuación!',
    'faq.q3': '¿Qué son las cartas coleccionables?',
    'faq.a3': 'Las cartas son elementos desbloqueables que proporcionan información cultural profunda sobre cada expresión venezolana. Tienen diferentes niveles de rareza (común, raro, épico, legendario) y cuentan historias fascinantes sobre el origen y uso de cada palabra.',
    'faq.q4': '¿Puedo usar Venezolario sin conexión a internet?',
    'faq.a4': 'Actualmente, Venezolario requiere conexión a internet para cargar el contenido y las actualizaciones. Estamos trabajando en una versión offline para futuras actualizaciones.',
    'faq.q5': '¿Las expresiones son realmente usadas en Venezuela?',
    'faq.a5': 'Absolutamente. Todas las expresiones en Venezolario han sido cuidadosamente seleccionadas y verificadas por hablantes nativos venezolanos para asegurar su autenticidad y uso actual en el país.',
    'faq.q6': '¿Hay diferentes niveles de dificultad?',
    'faq.a6': 'Sí, las palabras están organizadas en 5 niveles de dificultad, desde expresiones básicas y comunes hasta jerga más específica y regional. El juego se adapta progresivamente a tu nivel.',
    'faq.q7': '¿Puedo compartir mis logros en redes sociales?',
    'faq.a7': '¡Por supuesto! Venezolario incluye funciones de compartir en X (Twitter), Facebook y WhatsApp para que puedas mostrar tus puntuaciones y desafiar a tus amigos.',
    'faq.q8': '¿Venezolario es gratuito?',
    'faq.a8': 'Sí, Venezolario es completamente gratuito. Nuestro objetivo es promover y preservar la rica cultura lingüística venezolana, haciéndola accesible para todos.',
    
    // Footer
    'footer.description': 'Descubre y aprende la rica jerga venezolana a través de juegos interactivos y contenido cultural auténtico. Una experiencia educativa única que celebra la diversidad lingüística de Venezuela.',
    'footer.navigation': 'Navegación',
    'footer.resources': 'Recursos',
    'footer.pronunciation': 'Guía de Pronunciación',
    'footer.cultural': 'Historia Cultural',
    'footer.contact': 'Contacto',
    'footer.blog': 'Blog',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Uso',
    'footer.cookies': 'Cookies',
    'footer.copyright': 'Hecho con ❤️ para preservar la cultura venezolana.',
    
    // Social Share
    'share.text': '¡Descubre Venezolario! Aprende jerga venezolana jugando',
    'share.description': 'Un juego interactivo para aprender la rica cultura lingüística de Venezuela'
  },
  en: {
    // Navigation
    'nav.game': 'Game',
    'nav.features': 'Features',
    'nav.howItWorks': 'How It Works',
    'nav.faq': 'FAQ',
    'nav.dictionary': 'Dictionary',
    'nav.blog': 'Blog',
    
    // Hero Section
    'hero.title': 'Venezolario',
    'hero.subtitle': 'Learn Venezuelan Slang',
    'hero.description': 'Discover Venezuela\'s rich linguistic culture through an interactive guessing game. Learn authentic words, their pronunciation, and cultural context.',
    'hero.playGame': '🎮 Play Now',
    'hero.dictionary': '📖 View Complete Dictionary',
    'hero.cards': '🎴 Card Collection',
    'hero.gameDemo': 'Try the Game Now!',
    'hero.score': 'Score',
    'hero.standardWord': 'Standard Spanish word:',
    'hero.guess': 'Guess',
    'hero.hint': '💡 Hint',
    'hero.correct': 'Correct! 🎉',
    'hero.tryAgain': 'Try again! 😊',
    'hero.answer': 'The answer is:',
    'hero.pronunciation': 'Pronunciation:',
    'hero.nextWord': 'Next Word',
    'hero.loading': 'Loading game...',
    'hero.inputPlaceholder': 'Type the Venezuelan slang...',
    
    // Features
    'features.title': 'Why Choose Venezolario?',
    'features.subtitle': 'Discover the features that make Venezolario the best way to learn rich Venezuelan slang in a fun and interactive way.',
    'features.interactive.title': 'Interactive Learning',
    'features.interactive.desc': 'Learn authentic Venezuelan slang through guessing games that keep you engaged and motivated.',
    'features.cultural.title': 'Rich Cultural Context',
    'features.cultural.desc': 'Each word comes with its cultural history, correct pronunciation, and usage examples in real situations.',
    'features.cards.title': 'Collectible Cards',
    'features.cards.desc': 'Unlock beautiful cultural cards with different rarity levels as you progress in your learning.',
    'features.pronunciation.title': 'Correct Pronunciation',
    'features.pronunciation.desc': 'Learn the exact pronunciation of each Venezuelan expression with detailed phonetic guides.',
    'features.dictionary.title': 'Complete Dictionary',
    'features.dictionary.desc': 'Access a complete dictionary of Venezuelan slang organized by categories and difficulty levels.',
    'features.gamified.title': 'Gamified Progress',
    'features.gamified.desc': 'Scoring system, smart hints, and progressive challenges that make learning fun.',
    'features.cta.title': 'Start Your Cultural Adventure Now!',
    'features.cta.subtitle': 'Join thousands of people already discovering the richness of Venezuelan Spanish.',
    'features.cta.button': 'Play Now Free',
    
    // How It Works
    'howItWorks.title': 'How Does Venezolario Work?',
    'howItWorks.subtitle': 'Learning Venezuelan slang has never been so easy and fun. Follow these simple steps to immerse yourself in Venezuela\'s linguistic culture.',
    'howItWorks.step1.title': 'Choose a Word',
    'howItWorks.step1.desc': 'The game presents you with a standard Spanish word with its definition so you understand the context.',
    'howItWorks.step2.title': 'Guess the Slang',
    'howItWorks.step2.desc': 'Try to guess how that word is said in Venezuelan slang. Use your cultural intuition!',
    'howItWorks.step3.title': 'Use Hints if Needed',
    'howItWorks.step3.desc': 'If you get stuck, you can use hints like the first letter, pronunciation, or usage examples.',
    'howItWorks.step4.title': 'Learn and Collect',
    'howItWorks.step4.desc': 'Discover the correct answer, learn about its cultural origin, and unlock collectible cards.',
    'howItWorks.example': 'Game Example',
    'howItWorks.example.spanish': 'Spanish word:',
    'howItWorks.example.definition': 'Definition: Young person',
    'howItWorks.example.hint': '💡 Hint available:',
    'howItWorks.example.hintText': 'First letter: C',
    'howItWorks.example.correct': '✅ Correct answer:',
    'howItWorks.example.pronunciation': 'Pronunciation: CHAH-moh',
    'howItWorks.example.card': '🎴 Card unlocked:',
    'howItWorks.example.cardText': '"Chamo" - Iconic Venezuelan expression',
    'howItWorks.button': 'Start Playing Now!',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Find answers to the most common questions about Venezolario',
    'faq.contact.title': 'Have More Questions?',
    'faq.contact.subtitle': 'If you didn\'t find the answer you were looking for, don\'t hesitate to contact us.',
    'faq.contact.button': 'Contact Support',
    
    // FAQ Items
    'faq.q1': 'What is Venezolario?',
    'faq.a1': 'Venezolario is an interactive educational game designed to teach authentic Venezuelan slang and expressions. Through guessing games, cultural context, and collectible cards, users learn Venezuela\'s rich vocabulary in a fun way.',
    'faq.q2': 'How does the scoring system work?',
    'faq.a2': 'You earn points for each correct answer. You start with 10 points per word, but each hint used reduces your score by 2 points. Try to guess without hints to get the maximum score!',
    'faq.q3': 'What are the collectible cards?',
    'faq.a3': 'Cards are unlockable elements that provide deep cultural information about each Venezuelan expression. They have different rarity levels (common, rare, epic, legendary) and tell fascinating stories about the origin and use of each word.',
    'faq.q4': 'Can I use Venezolario without internet connection?',
    'faq.a4': 'Currently, Venezolario requires an internet connection to load content and updates. We are working on an offline version for future updates.',
    'faq.q5': 'Are the expressions really used in Venezuela?',
    'faq.a5': 'Absolutely. All expressions in Venezolario have been carefully selected and verified by native Venezuelan speakers to ensure their authenticity and current use in the country.',
    'faq.q6': 'Are there different difficulty levels?',
    'faq.a6': 'Yes, words are organized into 5 difficulty levels, from basic and common expressions to more specific and regional slang. The game progressively adapts to your level.',
    'faq.q7': 'Can I share my achievements on social media?',
    'faq.a7': 'Of course! Venezolario includes sharing features for X (Twitter), Facebook, and WhatsApp so you can show your scores and challenge your friends.',
    'faq.q8': 'Is Venezolario free?',
    'faq.a8': 'Yes, Venezolario is completely free. Our goal is to promote and preserve Venezuela\'s rich linguistic culture, making it accessible to everyone.',
    
    // Footer
    'footer.description': 'Discover and learn rich Venezuelan slang through interactive games and authentic cultural content. A unique educational experience that celebrates Venezuela\'s linguistic diversity.',
    'footer.navigation': 'Navigation',
    'footer.resources': 'Resources',
    'footer.pronunciation': 'Pronunciation Guide',
    'footer.cultural': 'Cultural History',
    'footer.contact': 'Contact',
    'footer.blog': 'Blog',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.cookies': 'Cookies',
    'footer.copyright': 'Made with ❤️ to preserve Venezuelan culture.',
    
    // Social Share
    'share.text': 'Discover Venezolario! Learn Venezuelan slang by playing',
    'share.description': 'An interactive game to learn Venezuela\'s rich linguistic culture'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('venezolario-language') as Language
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('venezolario-language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}