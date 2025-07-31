import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/layout/Hero'
import Features from '@/components/layout/Features'
import HowItWorks from '@/components/layout/HowItWorks'
import FAQ from '@/components/layout/FAQ'
import Footer from '@/components/layout/Footer'

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Venezolario",
  "description": "Juego educativo interactivo para aprender jerga venezolana auténtica con contexto cultural.",
  "url": "https://venezolario.app",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "browserRequirements": "Requires JavaScript enabled",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "Venezolario Team"
  },
  "inLanguage": "es",
  "audience": {
    "@type": "Audience",
    "audienceType": "Spanish learners, Venezuelan culture enthusiasts"
  },
  "featureList": [
    "Juego de adivinanzas interactivo",
    "Diccionario de jerga venezolana",
    "Cartas coleccionables culturales",
    "Pronunciación auténtica",
    "Contexto cultural rico"
  ]
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}