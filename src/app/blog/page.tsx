'use client'

import { useEffect, useState } from 'react'
import { BlogPost } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BlogCard from '@/components/blog/BlogCard'
import BlogHero from '@/components/blog/BlogHero'

export default function BlogPage() {
  const { language, t } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const response = await fetch(`/api/blog?lang=${language}`)
        const blogPosts = await response.json()
        setPosts(blogPosts)
        
        const uniqueCategories = Array.from(new Set(blogPosts.map((post: BlogPost) => post.category))) as string[]
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error loading blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogData()
  }, [language])

  const featuredPosts = posts.filter(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-gray-800 text-xl">
            {language === 'es' ? 'Cargando blog...' : 'Loading blog...'}
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <BlogHero featuredPosts={featuredPosts} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Categories Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === 'es' ? 'Explora por Categorías' : 'Explore by Categories'}
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="px-6 py-3 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors">
                {language === 'es' ? 'Todas' : 'All'}
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* All Posts */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {language === 'es' ? 'Todos los Artículos' : 'All Articles'}
            </h2>
            
            {regularPosts.length === 0 ? (
              <div className="text-center text-gray-600 py-12">
                <p className="text-lg">
                  {language === 'es' 
                    ? 'No hay artículos disponibles por el momento.' 
                    : 'No articles available at the moment.'
                  }
                </p>
                <p className="text-sm mt-2">
                  {language === 'es' 
                    ? '¡Pronto tendremos contenido fascinante para ti!' 
                    : 'We\'ll have fascinating content for you soon!'
                  }
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-400 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'es' ? '¡No te Pierdas Nuestras Historias!' : 'Don\'t Miss Our Stories!'}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {language === 'es' 
                ? 'Suscríbete para recibir los últimos artículos sobre cultura y jerga venezolana'
                : 'Subscribe to receive the latest articles about Venezuelan culture and slang'
              }
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder={language === 'es' ? 'Tu correo electrónico' : 'Your email address'}
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                />
                <button className="px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                  {language === 'es' ? 'Suscribirse' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}