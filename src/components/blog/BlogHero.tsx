'use client'

import Link from 'next/link'
import { BlogPost } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

interface BlogHeroProps {
  featuredPosts: BlogPost[]
}

export default function BlogHero({ featuredPosts }: BlogHeroProps) {
  const { language } = useLanguage()
  const mainPost = featuredPosts[0]
  const sidebarPosts = featuredPosts.slice(1, 3)

  const formatDate = (dateString: string) => {
    const locale = language === 'es' ? 'es-ES' : 'en-US'
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!mainPost) {
    return (
      <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Venezolario
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'es' 
              ? 'Descubre las historias fascinantes detrás de la jerga venezolana'
              : 'Discover the fascinating stories behind Venezuelan slang'
            }
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Venezolario
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'es' 
              ? 'Descubre las historias fascinantes detrás de la jerga venezolana'
              : 'Discover the fascinating stories behind Venezuelan slang'
            }
          </p>
        </div>

        {/* Featured Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Featured Post */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                    {language === 'es' ? 'Destacado' : 'Featured'}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {mainPost.category}
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  <Link 
                    href={`/blog/${mainPost.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {mainPost.title}
                  </Link>
                </h2>

                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {mainPost.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {mainPost.tags.slice(0, 4).map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary-100 text-secondary-800 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500">
                    <span className="text-sm">{language === 'es' ? 'Por' : 'By'} {mainPost.author}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm">{formatDate(mainPost.publishedAt)}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {mainPost.readingTime} min {language === 'es' ? 'lectura' : 'read'}
                  </span>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar Posts */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              {language === 'es' ? 'También te puede interesar' : 'You might also like'}
            </h3>
            
            {sidebarPosts.length > 0 ? (
              sidebarPosts.map(post => (
                <article 
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full mb-3">
                    {post.category}
                  </span>

                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h4>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>{post.readingTime} min</span>
                  </div>
                </article>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <p className="text-gray-500">
                  {language === 'es' ? 'Más artículos próximamente...' : 'More articles coming soon...'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}