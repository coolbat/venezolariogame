import { getBlogPostBySlug, getRelatedBlogPosts, getAllBlogPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BlogContent from '@/components/blog/BlogContent'
import RelatedPosts from '@/components/blog/RelatedPosts'
import SocialShare from '@/components/ui/SocialShare'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Artículo no encontrado - Venezolario Blog',
    }
  }

  return {
    title: `${post.title} - Venezolario Blog`,
    description: post.excerpt,
    keywords: `${post.tags.join(', ')}, venezolario, blog, cultura venezolana`,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedBlogPosts(slug)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "publisher": {
      "@type": "Organization",
      "name": "Venezolario",
      "logo": {
        "@type": "ImageObject",
        "url": "https://venezolario.app/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://venezolario.app/blog/${slug}`
    },
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "timeRequired": `PT${post.readingTime}M`
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Navbar />
      
      <div className="min-h-screen bg-white pt-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Article Header */}
          <header className="mb-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="px-4 py-2 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">
                  {post.readingTime} minutos de lectura
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="flex items-center text-gray-500">
                  <span>Por <strong className="text-gray-700">{post.author}</strong></span>
                  <span className="mx-3">•</span>
                  <time>{formatDate(post.publishedAt)}</time>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary-100 text-secondary-800 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Social Share */}
              <SocialShare
                url={`https://venezolario.app/blog/${slug}`}
                title={post.title}
                description={post.excerpt}
              />
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg prose-gray max-w-none mb-12">
            <BlogContent content={post.content} />
          </div>

          {/* Article Footer */}
          <footer className="border-t border-gray-200 pt-8">
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ¿Te gustó este artículo?
              </h3>
              <p className="text-gray-600 mb-6">
                Compártelo con tus amigos y ayúdanos a difundir la cultura venezolana
              </p>
              <SocialShare
                url={`https://venezolario.app/blog/${slug}`}
                title={`Me encantó este artículo: ${post.title}`}
                description={post.excerpt}
              />
            </div>

            {/* Author Info */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{post.author}</h4>
                  <p className="text-gray-600">
                    Apasionado por la cultura y lingüística venezolana
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}
      </div>

      <Footer />
    </>
  )
}