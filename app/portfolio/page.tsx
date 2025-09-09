'use client'

import Link from 'next/link'

const ventures = [
  {
    id: 'vctronics',
    name: 'VCTRONICS CORP',
    tagline: 'PEMF patented technology for cancer research',
    description: 'Revolutionary PEMF (Pulsed Electromagnetic Field) patented technology for research and development, specializing in cancer research applications. Currently in preclinical trials with global reach.',
    year: '2020',
    status: 'Active',
    metrics: {
      customers: '550+ Customers',
      reach: '35 Countries',
      stage: 'Preclinical Trials',
      type: 'Patented Technology'
    },
    technologies: ['PEMF Technology', 'Medical Devices', 'Cancer Research', 'Clinical Trials']
  },
  {
    id: 'verivox-ai',
    name: 'VeriVox AI',
    tagline: 'Legal audio transcription powered by AI',
    description: 'Advanced AI-powered audio transcription platform specifically designed for legal professionals. MVP ready with cutting-edge accuracy for legal terminology and proceedings.',
    year: '2023',
    status: 'Active',
    metrics: {
      stage: 'MVP Ready',
      funding: 'Seed Round',
      focus: 'Legal Tech',
      type: 'AI Platform'
    },
    technologies: ['AI/ML', 'Speech Recognition', 'Legal Tech', 'Cloud Computing']
  },
  {
    id: 'perfect-liquid',
    name: 'Perfect Liquid',
    tagline: 'Revolutionary nano-material coatings',
    description: 'Next-generation nano-material coatings for retail and industrial applications, providing unprecedented durability and protection. Transforming surface protection across multiple industries.',
    year: '2021',
    status: 'Active',
    metrics: {
      clients: '100+ Industrial Clients',
      growth: '180% YoY',
      coverage: 'Multi-Industry',
      type: 'Nanotech'
    },
    technologies: ['Nanotechnology', 'Material Science', 'Industrial Coatings', 'Retail Solutions']
  },
  {
    id: 'atemabio',
    name: 'AtemaBio',
    tagline: 'Natural anti-aging breakthrough',
    description: 'Unique natural anti-aging supplement developed through cutting-edge research. Scientifically formulated for optimal cellular health and longevity with international distribution.',
    year: '2019',
    status: 'Active',
    metrics: {
      clients: '500+ Clients',
      countries: '20+ Countries',
      type: 'Nutraceuticals',
      stage: 'Scale'
    },
    technologies: ['Biotech', 'Nutraceuticals', 'E-commerce', 'Supply Chain']
  },
  {
    id: 'astroforyou',
    name: 'AstroForYou School',
    tagline: 'Professional astrology education',
    description: 'Comprehensive astrology education platform combining ancient wisdom with modern teaching methodologies. Building a global community of professional astrologers.',
    year: '2022',
    status: 'Active',
    metrics: {
      students: '100+ Students',
      growth: '150% YoY',
      type: 'EdTech',
      stage: 'Growth'
    },
    technologies: ['EdTech', 'Online Learning', 'Community Platform', 'Mobile Apps']
  },
  {
    id: 'domain-analyser',
    name: 'Domain Analyser',
    tagline: 'AI-powered domain intelligence platform',
    description: 'Advanced AI platform for analyzing and valuing domain names. Managing a premium portfolio while providing domain intelligence services to investors.',
    year: '2021',
    status: 'Active',
    metrics: {
      portfolio: '80+ Premium Domains',
      growth: '200% Portfolio Growth',
      type: 'SaaS',
      stage: 'Growth'
    },
    technologies: ['AI/ML', 'Domain Analysis', 'SaaS', 'Investment Tech']
  },
  {
    id: 'facility-unlimited',
    name: 'Facility Unlimited',
    tagline: 'Commercial real estate procurement',
    description: 'Comprehensive sourcing and procurement platform for commercial real estate needs. Streamlining facility management with access to exclusive brands and suppliers.',
    year: '2020',
    status: 'Active',
    metrics: {
      clients: '90+ Clients',
      brands: '30+ Unique Brands',
      type: 'PropTech',
      stage: 'Scale'
    },
    technologies: ['PropTech', 'Supply Chain', 'E-commerce', 'B2B Platform']
  },
  {
    id: 'mpi-suppliers',
    name: 'MPI Suppliers Group',
    tagline: 'Military and industrial supply chain solutions',
    description: 'Strategic sourcing and supply chain management for military and industrial complexes across West and East Africa. Providing critical infrastructure and equipment solutions.',
    year: '2018',
    status: 'Active',
    metrics: {
      type: 'Government Contracts',
      coverage: 'West & East Africa',
      stage: 'Scale',
      focus: 'Defense & Industrial'
    },
    technologies: ['Supply Chain', 'Logistics', 'Defense Tech', 'Industrial Solutions']
  },
  {
    id: 'geniex-lab',
    name: 'GenieX Lab',
    tagline: 'AI research laboratory',
    description: 'Cutting-edge AI research laboratory focused on developing next-generation artificial intelligence solutions for enterprise and consumer applications.',
    year: '2024',
    status: 'R&D Phase',
    metrics: {
      stage: 'Research Phase',
      focus: 'Next-Gen AI',
      type: 'R&D Lab',
      status: 'Ideation'
    },
    technologies: ['AI/ML', 'Deep Learning', 'Neural Networks', 'Research']
  }
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Portfolio Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-lg font-serif text-gray-900">
              VP
            </Link>
            <div className="flex gap-8">
              <Link href="/portfolio" className="text-sm uppercase tracking-wider text-gray-900 transition-colors">
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

      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-serif font-light text-gray-900 mb-6">
                Portfolio
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                9 active ventures spanning AI, healthcare, nanotechnology, and global markets.
              </p>
            </div>
          </div>
        </section>

        {/* Ventures Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ventures.map((venture) => (
                <article key={venture.id} className="border border-gray-200 border-opacity-0 hover:border-opacity-100 hover:shadow-lg p-6 transition-all duration-300 cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm text-gray-500">Founded {venture.year}</span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      venture.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {venture.status}
                    </span>
                  </div>

                  <h2 className="text-2xl font-serif mb-2">{venture.name}</h2>
                  <p className="text-gray-600 mb-4">{venture.tagline}</p>
                  
                  <p className="text-gray-600 text-sm mb-6">
                    {venture.description}
                  </p>

                  {/* Metrics */}
                  <div className="space-y-2 mb-6">
                    {Object.entries(venture.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="text-gray-900 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {venture.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif mb-6">Let's Build Something Together</h2>
            <p className="text-xl text-gray-600 mb-8">
              I'm always exploring new opportunities and partnerships.
            </p>
            <a 
              href="mailto:contact@vladimirproskurov.com"
              className="inline-block px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
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