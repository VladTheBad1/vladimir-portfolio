import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getSortedPostsData } from '@/lib/blog'
import { Calendar, Clock, Tag, TrendingUp } from 'lucide-react'

export default function InsightsPage() {
  const posts = getSortedPostsData()

  return (
    <main className="min-h-screen pt-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Insights & Perspectives
          </h1>
          <p className="text-lg text-gray-700">
            Thoughts on innovation, entrepreneurship, and building the future
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-700">No posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer bg-white border-gray-200">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {post.featured && (
                        <Badge variant="primary" className="text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl hover:text-primary-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-700">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center gap-2 mt-4">
                        <Tag className="h-4 w-4 text-gray-600" />
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-gray-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{post.author}</p>
                          <p className="text-gray-700">{post.authorRole}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}