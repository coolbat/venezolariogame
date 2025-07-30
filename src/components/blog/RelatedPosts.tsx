import Link from 'next/link'
import { BlogPost } from '@/types'

interface RelatedPostsProps {
  posts: BlogPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Artículos Relacionados
          </h2>
          <p className="text-lg text-gray-600">
            Continúa explorando la fascinante cultura venezolana
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article 
              key={post.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Category and Reading Time */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {post.readingTime} min
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {formatDate(post.publishedAt)}
                  </span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                  >
                    Leer más →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-block bg-primary-500 text-white font-medium px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Ver Todos los Artículos
          </Link>
        </div>
      </div>
    </section>
  )
}