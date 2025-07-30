import { NextRequest, NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/blog'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('lang') as 'es' | 'en' | undefined
    
    const posts = await getAllBlogPosts(language)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to load blog posts' }, { status: 500 })
  }
}