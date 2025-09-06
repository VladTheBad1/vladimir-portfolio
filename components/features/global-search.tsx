'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, X, FileText, Users, Briefcase, Brain, TrendingUp, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  url: string
  icon: React.ReactNode
}

const mockSearchData: SearchResult[] = [
  {
    id: '1',
    title: 'VCTRONICS CORP',
    description: 'PEMF patented technology for cancer research',
    category: 'Portfolio',
    url: '/portfolio',
    icon: <Briefcase className="h-4 w-4" />
  },
  {
    id: '2',
    title: 'AI Venture Lab',
    description: 'Generate and validate venture ideas using AI',
    category: 'AI Lab',
    url: '/ai-lab',
    icon: <Brain className="h-4 w-4" />
  },
  {
    id: '3',
    title: 'Analytics Dashboard',
    description: 'Real-time insights into venture performance',
    category: 'Analytics',
    url: '/analytics',
    icon: <TrendingUp className="h-4 w-4" />
  },
  {
    id: '4',
    title: 'Global Intelligence',
    description: 'Market opportunities across regions',
    category: 'Global Intel',
    url: '/global-intelligence',
    icon: <Globe className="h-4 w-4" />
  },
  {
    id: '5',
    title: 'Leadership Team',
    description: 'Meet our executive team and advisors',
    category: 'Leadership',
    url: '/leadership',
    icon: <Users className="h-4 w-4" />
  },
  {
    id: '6',
    title: 'Scaling Ventures with AI',
    description: 'Blog post about AI in entrepreneurship',
    category: 'Insights',
    url: '/insights/scaling-ventures-with-ai',
    icon: <FileText className="h-4 w-4" />
  }
]

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockSearchData.filter(
        item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  const handleSelect = (url: string) => {
    router.push(url)
    setIsOpen(false)
    setQuery('')
  }

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-white rounded border border-gray-300">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search ventures, features, insights..."
                  className="flex-1 text-lg outline-none placeholder-gray-400"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {query.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-sm">Type to search across the entire platform</p>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border border-gray-300">ESC</kbd>
                      <span className="text-xs">to close</span>
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-sm">No results found for "{query}"</p>
                    <p className="text-xs mt-2">Try searching for ventures, features, or content</p>
                  </div>
                ) : (
                  <div className="py-2">
                    {results.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleSelect(result.url)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                          {result.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{result.title}</div>
                          <div className="text-sm text-gray-600">{result.description}</div>
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {result.category}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {results.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{results.length} results</span>
                    <div className="flex items-center gap-2">
                      <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">↑↓</kbd>
                      <span>Navigate</span>
                      <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">↵</kbd>
                      <span>Select</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}