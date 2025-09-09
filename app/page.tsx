'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [hoveredVenture, setHoveredVenture] = useState<string | null>(null)

  const ventures = [
    {
      id: 'vctronics',
      name: 'VCTRONICS CORP',
      description: 'PEMF cancer research technology. 550+ customers in 35 countries.',
      founded: '2020'
    },
    {
      id: 'perfect-liquid',
      name: 'Perfect Liquid',
      description: 'Revolutionary nano-material coatings. 180% YoY growth.',
      founded: '2021'
    },
    {
      id: 'mpi-suppliers',
      name: 'MPI Suppliers Group',
      description: 'Military & industrial supply chain across Africa.',
      founded: '2018'
    }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navigation - Portfolio Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-lg font-serif text-gray-900">VP</Link>
            <div className="flex gap-8">
              <Link href="/portfolio" className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors">
                Portfolio
              </Link>
              <Link href="/blog" className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero - Genesis Style */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-700 mb-16 leading-tight">
              Serial Entrepreneur & AI Innovator
            </h1>
            
            <div className="space-y-8">
              <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-700">
                Building 9 ventures across<br />
                AI, healthcare, and global markets.
              </p>
              
              <p className="text-base md:text-lg font-sans text-gray-600 leading-relaxed max-w-2xl mx-auto mt-12">
                From PEMF cancer research to military supply chains.
                Operating in 35+ countries with a focus on transformative technology
                that solves real-world problems.
              </p>
            </div>
            
            <div className="mt-20">
              <p className="text-xs tracking-[0.2em] uppercase text-gray-500">
                Scroll to explore
              </p>
            </div>
          </div>
        </section>

        {/* Track Record - Clean Numbers */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="w-full max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-700 mb-16 leading-tight text-center">
              Track Record
            </h2>
            
            <div className="space-y-12">
              <div className="flex justify-between items-end border-b border-transparent hover:border-gray-200 pb-6 transition-all duration-300">
                <span className="text-sm font-sans uppercase tracking-wider text-gray-500">Active Ventures</span>
                <span className="text-5xl md:text-6xl font-serif font-light text-gray-700">9</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-transparent hover:border-gray-200 pb-6 transition-all duration-300">
                <span className="text-sm font-sans uppercase tracking-wider text-gray-500">Global Reach</span>
                <span className="text-5xl md:text-6xl font-serif font-light text-gray-700">35+</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-transparent hover:border-gray-200 pb-6 transition-all duration-300">
                <span className="text-sm font-sans uppercase tracking-wider text-gray-500">Years Building</span>
                <span className="text-5xl md:text-6xl font-serif font-light text-gray-700">7</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-transparent hover:border-gray-200 pb-6 transition-all duration-300">
                <span className="text-sm font-sans uppercase tracking-wider text-gray-500">Industries</span>
                <span className="text-5xl md:text-6xl font-serif font-light text-gray-700">8</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Ventures - Minimal Cards */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-700 mb-16 leading-tight">
              Featured Ventures
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {ventures.map((venture) => (
                <div
                  key={venture.id}
                  className="group p-8 border border-transparent hover:border-gray-200 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredVenture(venture.id)}
                  onMouseLeave={() => setHoveredVenture(null)}
                >
                  <h3 className="text-xl font-serif mb-4 text-gray-700">{venture.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {venture.description}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Founded {venture.founded}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-16">
              <Link 
                href="/portfolio" 
                className="text-sm font-sans uppercase tracking-wider text-gray-600 border-b border-transparent hover:border-gray-600 pb-1 transition-all duration-300"
              >
                View All Ventures
              </Link>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-700 mb-16 leading-tight">
              Philosophy
            </h2>
            
            <div className="space-y-20">
              <div>
                <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-700">
                  "Innovation is not about predicting the future—<br />
                  it's about creating it."
                </p>
                <p className="text-sm font-sans uppercase tracking-wider text-gray-500 mt-4">On Vision</p>
              </div>
              
              <div>
                <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-700">
                  "Every impossible idea is just waiting<br />
                  for the right algorithm."
                </p>
                <p className="text-sm font-sans uppercase tracking-wider text-gray-500 mt-4">On Technology</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-700 mb-12 leading-tight">
              Let's Build Something Together
            </h2>
            
            <p className="text-base md:text-lg font-sans text-gray-600 leading-relaxed max-w-2xl mx-auto mb-16">
              I'm always open to discussing new ventures and strategic partnerships.
              The future is not predetermined—it's a canvas waiting for bold strokes.
            </p>
            
            <div className="space-y-8">
              <div>
                <Link 
                  href="/contact"
                  className="inline-block text-sm font-sans uppercase tracking-wider text-gray-600 border border-gray-300 px-8 py-3 hover:bg-gray-100 transition-all duration-200"
                >
                  Get in Touch
                </Link>
              </div>
              
              <div className="flex justify-center gap-10 pt-8">
                <a href="https://github.com/vladimirproskurov" className="text-sm font-sans text-gray-500 hover:text-gray-700 transition-colors">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/vladimirproskurov" className="text-sm font-sans text-gray-500 hover:text-gray-700 transition-colors">
                  LinkedIn
                </a>
                <a href="mailto:vladimir@proskurov.ventures" className="text-sm font-sans text-gray-500 hover:text-gray-700 transition-colors">
                  hello@vladimir.tech
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="text-center">
          <p className="text-xs font-sans uppercase tracking-wider text-gray-400">
            © 2025 Vladimir Proskurov • Serial Innovator
          </p>
          <Link href="/login" className="text-xs text-gray-300 hover:text-gray-500 mt-2 inline-block transition-colors">
            Admin
          </Link>
        </div>
      </footer>
    </div>
  )
}