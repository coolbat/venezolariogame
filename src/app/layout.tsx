import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import AudioControls from '@/components/audio/AudioControls'
import { LanguageProvider } from '@/contexts/LanguageContext'
// import BackgroundMusic from '@/components/audio/BackgroundMusic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Venezolario - Aprende Jerga Venezolana Jugando | Juego Educativo Interactivo',
  description: 'Descubre la rica cultura lingüística de Venezuela con Venezolario. Juego interactivo para aprender jerga venezolana auténtica, pronunciación correcta y contexto cultural. ¡Gratis y divertido!',
  keywords: 'venezolario, jerga venezolana, español venezuela, cultura venezolana, juego educativo, aprender español, vocabulario venezolano, lengua española, palabras venezolanas',
  authors: [{ name: 'Venezolario Team' }],
  creator: 'Venezolario',
  publisher: 'Venezolario',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://venezolario.app'),
  alternates: {
    canonical: '/',
    languages: {
      'es': '/',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://venezolario.app',
    title: 'Venezolario - Aprende Jerga Venezolana Jugando',
    description: 'Descubre la rica cultura lingüística de Venezuela con nuestro juego interactivo. Aprende jerga venezolana auténtica, pronunciación correcta y contexto cultural de manera divertida.',
    siteName: 'Venezolario',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Venezolario - Juego de Jerga Venezolana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Venezolario - Aprende Jerga Venezolana Jugando',
    description: 'Descubre la rica cultura lingüística de Venezuela con nuestro juego interactivo.',
    images: ['/og-image.jpg'],
    creator: '@venezolario',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Favicons and Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16x16.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32x32.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="192x192" href="/icon.svg" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Colors */}
        <meta name="theme-color" content="#FFD700" />
        <meta name="msapplication-TileColor" content="#FFD700" />
        
        {/* Additional Meta Tags */}
        <meta name="application-name" content="Venezolario" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Venezolario" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JFPCT301DX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JFPCT301DX');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <AudioControls />
          {/* BackgroundMusic disabled to prevent file not found errors in iframe */}
          {/* <BackgroundMusic src="/sounds/background-music.mp3" /> */}
        </LanguageProvider>
      </body>
    </html>
  )
}