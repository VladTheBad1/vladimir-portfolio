import Link from 'next/link'

export default function ContactPage() {
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
              <Link href="/blog" className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-sm uppercase tracking-wider text-gray-900 transition-colors">
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
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                I'm always open to discussing new ventures, partnerships, and opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Grid - Portfolio Style */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Methods */}
              <div>
                <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 border-opacity-0 hover:border-opacity-100 hover:shadow-lg p-6 transition-all duration-300 cursor-pointer">
                    <h3 className="font-bold mb-2">Email</h3>
                    <a href="mailto:vladimir@proskurov.ventures" className="text-blue-600 hover:text-blue-800">
                      vladimir@proskurov.ventures
                    </a>
                  </div>
                  <div className="border border-gray-200 border-opacity-0 hover:border-opacity-100 hover:shadow-lg p-6 transition-all duration-300 cursor-pointer">
                    <h3 className="font-bold mb-2">LinkedIn</h3>
                    <a href="https://linkedin.com/in/vladimirproskurov" className="text-blue-600 hover:text-blue-800">
                      linkedin.com/in/vladimirproskurov
                    </a>
                  </div>
                  <div className="border border-gray-200 border-opacity-0 hover:border-opacity-100 hover:shadow-lg p-6 transition-all duration-300">
                    <h3 className="font-bold mb-2">Location</h3>
                    <p className="text-gray-600">Operating globally across 35+ countries</p>
                  </div>
                </div>
              </div>

              {/* Areas of Interest */}
              <div>
                <h2 className="text-2xl font-serif mb-6">Areas of Interest</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 border-opacity-0 hover:border-opacity-100 hover:shadow-lg p-6 transition-all duration-300 cursor-pointer">
                    <h3 className="font-bold mb-2">Investment Opportunities</h3>
                    <p className="text-gray-600">Seed to Series A ventures in AI, healthcare, and technology</p>
                  </div>
                  <div className="border border-gray-200 border-opacity-0 hover:border-opacity-100 hover:shadow-lg p-6 transition-all duration-300 cursor-pointer">
                    <h3 className="font-bold mb-2">Strategic Partnerships</h3>
                    <p className="text-gray-600">Joint ventures and distribution partnerships globally</p>
                  </div>
                  <div className="border border-gray-200 border-opacity-0 hover:border-opacity-100 hover:shadow-lg p-6 transition-all duration-300 cursor-pointer">
                    <h3 className="font-bold mb-2">Speaking Engagements</h3>
                    <p className="text-gray-600">Entrepreneurship, innovation, and venture building</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Response Time - Portfolio Style */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="border border-gray-200 border-opacity-0 hover:border-opacity-100 hover:shadow-lg p-8 transition-all duration-300">
              <h2 className="text-2xl font-serif mb-4">Response Time</h2>
              <p className="text-gray-600">
                I typically respond to inquiries within 24-48 hours. For urgent matters related to existing ventures, please mention the company name in your subject line.
              </p>
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