import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AudioControls from '@/components/audio/AudioControls'
import BackgroundMusic from '@/components/audio/BackgroundMusic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Venezolario - Juego de Jerga Venezolana',
  description: 'Aprende jerga venezolana con este divertido juego de adivinanzas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="w-full h-screen max-h-screen overflow-hidden venezuela-gradient">
          <div className="w-full h-full max-w-6xl mx-auto bg-white/5 backdrop-blur-sm border border-white/20 rounded-none md:rounded-lg shadow-2xl overflow-y-auto">
            {children}
          </div>
          <AudioControls />
          <BackgroundMusic src="/sounds/background-music.mp3" />
        </div>
      </body>
    </html>
  )
}