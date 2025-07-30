import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { BlogPost } from '@/types'

const BLOG_DIR = join(process.cwd(), 'src/data/blog')

// 计算阅读时间（基于平均阅读速度 200 字/分钟）
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// 获取所有博客文章
export async function getAllBlogPosts(language?: 'es' | 'en'): Promise<BlogPost[]> {
  try {
    const files = readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'))
    
    const posts = files.map(filename => {
      const filePath = join(BLOG_DIR, filename)
      const fileContent = readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      
      return {
        ...data,
        content,
        language: data.language || 'es', // 默认为西班牙语
        readingTime: data.readingTime || calculateReadingTime(content),
      } as BlogPost
    })
    
    // 如果指定了语言，则过滤
    const filteredPosts = language ? posts.filter(post => post.language === language) : posts
    
    // 按发布日期排序（最新的在前）
    return filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

// 根据 slug 获取特定文章
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getAllBlogPosts()
    return posts.find(post => post.slug === slug) || null
  } catch (error) {
    console.error('Error loading blog post:', error)
    return null
  }
}

// 获取精选文章
export async function getFeaturedBlogPosts(language?: 'es' | 'en'): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts(language)
  return posts.filter(post => post.featured)
}

// 获取相关文章
export async function getRelatedBlogPosts(currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  const currentPost = posts.find(post => post.slug === currentSlug)
  
  if (!currentPost) return []
  
  // 基于标签和分类找相关文章
  const related = posts
    .filter(post => post.slug !== currentSlug)
    .filter(post => 
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit)
  
  return related
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts()
  const categories = new Set(posts.map(post => post.category))
  return Array.from(categories)
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts()
  const tags = new Set(posts.flatMap(post => post.tags))
  return Array.from(tags)
}

// 根据分类筛选文章
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  return posts.filter(post => post.category === category)
}

// 根据标签筛选文章
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  return posts.filter(post => post.tags.includes(tag))
}

// 搜索文章
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  const lowercaseQuery = query.toLowerCase()
  
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}