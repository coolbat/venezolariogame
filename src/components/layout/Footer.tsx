import Link from 'next/link'
import SocialShare from '@/components/ui/SocialShare'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🇻🇪</span>
              <span className="text-2xl font-bold">Venezolario</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Descubre y aprende la rica jerga venezolana a través de juegos interactivos 
              y contenido cultural auténtico. Una experiencia educativa única que celebra 
              la diversidad lingüística de Venezuela.
            </p>
            <SocialShare 
              url={typeof window !== 'undefined' ? window.location.href : ''}
              title="Descubre Venezolario - Aprende jerga venezolana jugando"
              description="Un juego interactivo para aprender la cultura lingüística de Venezuela"
              className="justify-start"
            />
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <a href="#game" className="text-gray-400 hover:text-white transition-colors">
                  Juego
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link href="/dictionary" className="text-gray-400 hover:text-white transition-colors">
                  Diccionario
                </Link>
              </li>
              <li>
                <Link href="/cards" className="text-gray-400 hover:text-white transition-colors">
                  Cartas
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Guía de Pronunciación
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Historia Cultural
                </a>
              </li>
              <li>
                <a href="mailto:hola@venezolario.com" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Venezolario. Hecho con ❤️ para preservar la cultura venezolana.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Términos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}