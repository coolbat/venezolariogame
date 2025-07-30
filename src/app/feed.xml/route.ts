import { getAllBlogPosts } from '@/lib/blog'

export async function GET() {
  const posts = await getAllBlogPosts()
  const baseUrl = 'https://venezolario.vercel.app'

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Venezolario Blog</title>
    <description>Descubre las historias fascinantes detrás de la jerga venezolana, aprende sobre pronunciación, cultura y tradiciones lingüísticas de Venezuela.</description>
    <link>${baseUrl}/blog</link>
    <language>es</language>
    <copyright>© ${new Date().getFullYear()} Venezolario</copyright>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>noreply@venezolario.com (${post.author})</author>
      <category>${post.category}</category>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}