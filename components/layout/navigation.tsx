'use client'

import Link from 'next/link'
import { GlobalSearch } from '@/components/features/global-search'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-serif font-bold text-gray-900 hover:text-gray-700 transition-colors">
            VP
          </Link>
          
          <div className="flex gap-8 items-center">
            <Link href="/portfolio" className="text-xs font-sans uppercase tracking-wider text-gray-600 hover:text-gray-800 transition-colors">
              PORTFOLIO
            </Link>
            <Link href="/ai-lab" className="text-xs font-sans uppercase tracking-wider text-gray-600 hover:text-gray-800 transition-colors">
              AI LAB
            </Link>
            <Link href="/analytics" className="text-xs font-sans uppercase tracking-wider text-gray-600 hover:text-gray-800 transition-colors">
              ANALYTICS
            </Link>
            <Link href="/timeline" className="text-xs font-sans uppercase tracking-wider text-gray-600 hover:text-gray-800 transition-colors">
              TIMELINE
            </Link>
            <Link href="/meetings" className="text-xs font-sans uppercase tracking-wider text-gray-600 hover:text-gray-800 transition-colors">
              MEETINGS
            </Link>
            <Link href="/global-intelligence" className="text-xs font-sans uppercase tracking-wider text-gray-600 hover:text-gray-800 transition-colors">
              GLOBAL INTEL
            </Link>
            <Link href="/leadership" className="text-xs font-sans uppercase tracking-wider text-gray-600 hover:text-gray-800 transition-colors">
              LEADERSHIP
            </Link>
            <Link href="/insights" className="text-xs font-sans uppercase tracking-wider text-gray-600 hover:text-gray-800 transition-colors">
              INSIGHTS
            </Link>
            <Link href="/investors" className="text-xs font-sans uppercase tracking-wider text-gray-600 hover:text-gray-800 transition-colors">
              INVESTORS
            </Link>
            <Link href="/investor" className="text-xs font-sans uppercase tracking-wider text-gray-600 hover:text-gray-800 transition-colors">
              INVESTOR
            </Link>
            <Link href="/contact" className="text-xs font-sans uppercase tracking-wider text-gray-600 hover:text-gray-800 transition-colors">
              CONTACT
            </Link>
            <GlobalSearch />
          </div>
        </div>
      </div>
    </nav>
  )
}