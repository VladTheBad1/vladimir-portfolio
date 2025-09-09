'use client'

import Link from 'next/link'

const blogPosts = [
  {
    id: '1',
    title: 'Building AI-Powered Healthcare Solutions',
    excerpt: 'How VCTRONICS is revolutionizing cancer research with PEMF technology and reaching 550+ customers globally.',
    date: '2024-12-15',
    readTime: '5 min read',
    category: 'Healthcare'
  },
  {
    id: '2',
    title: 'The Future of Nanotechnology in Industry',
    excerpt: 'Perfect Liquid\'s journey to 180% YoY growth through revolutionary nano-material coatings.',
    date: '2024-11-28',
    readTime: '7 min read',
    category: 'Technology'
  },
  {
    id: '3',
    title: 'Scaling Across 35 Countries: Lessons Learned',
    excerpt: 'Building global distribution networks and managing international operations across multiple ventures.',
    date: '2024-11-10',
    readTime: '10 min read',
    category: 'Business'
  },
  {
    id: '4',
    title: 'From Idea to MVP: The VeriVox AI Story',
    excerpt: 'How we built an AI-powered legal transcription platform and got it market-ready.',
    date: '2024-10-22',
    readTime: '6 min read',
    category: 'AI'
  },
  {
    id: '5',
    title: 'Military Supply Chains in Africa',
    excerpt: 'MPI Suppliers Group\'s approach to critical infrastructure and equipment solutions.',
    date: '2024-10-05',
    readTime: '8 min read',
    category: 'Logistics'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Portfolio Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-lg font-serif text-gray-900">VP</Link>
            <div className="flex gap-8">
              <Link href="/portfolio" className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors">
                Portfolio
              </Link>
              <Link href="/blog" className="text-sm uppercase tracking-wider text-gray-900 transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero - Portfolio Style */}
        <section className="py-20 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-serif font-light text-gray-900 mb-6">
                Blog
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Insights from building 9 ventures across AI, healthcare, and global markets.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts - Portfolio Style Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="border border-gray-200 border-opacity-0 hover:border-opacity-100 hover:shadow-lg p-8 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span className="text-gray-700">{post.category}</span>
                  </div>
                  <h2 className="text-2xl font-serif mb-3">
                    <Link href={`/blog/${post.id}`} className="hover:text-gray-700">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800">
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Portfolio Style */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 Vladimir Proskurov • Serial Entrepreneur & AI Innovator
          </p>
        </div>
      </footer>
    </div>
  )
}