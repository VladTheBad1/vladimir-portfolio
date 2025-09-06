import React from 'react'
import { notFound } from 'next/navigation'
import { getPostData, getAllPostSlugs } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  return getAllPostSlugs()
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostData(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-24 bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Link 
          href="/insights" 
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">{post.category}</Badge>
            {post.featured && (
              <Badge variant="primary">Featured</Badge>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-700 mb-6">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-700 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div>
              <p className="font-medium text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-700">{post.authorRole}</p>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-600" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="default" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  )
}