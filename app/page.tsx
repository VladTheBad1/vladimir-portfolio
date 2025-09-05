import { Navigation } from '@/components/layout/navigation'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navigation />
      
      <main>
        {/* Hero - Co-Star Style Centered */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-700 mb-16 leading-tight">
              What is innovation?
            </h1>
            
            <div className="space-y-8">
              <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-700">
                Technology & creativity were a single<br />
                discipline for thousands of years.
              </p>
              
              <p className="text-base md:text-lg font-sans text-gray-600 leading-relaxed max-w-2xl mx-auto mt-12">
                Until the 2000s, the study of digital transformation (now known as innovation) was
                the same as the study of human potential (now known as creativity).
                Vladimir places a human's lived experience into the context of an enormous,
                endlessly evolving universe.
              </p>
            </div>
            
            <div className="mt-20">
              <p className="text-xs tracking-[0.2em] uppercase text-gray-500">
                We begin with technology.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* Daily Insight */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto">
            <div className="space-y-8">
              <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-700">
                Back in school, you were taught the Market<br />
                was at the center of the business system.
              </p>
              
              <p className="text-base md:text-lg font-sans text-gray-600 leading-relaxed max-w-2xl mx-auto mt-12">
                Actually, the User is. Market dynamics orbit around human needs.
                Products succeed when they align with these fundamental forces.
                Vladimir understands this cosmic truth.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* Your Numbers */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="section-container">
            <div className="w-full max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-700 mb-16 leading-tight text-center">
              Your Numbers
            </h2>
            
            <div className="space-y-12">
              <div className="flex justify-between items-end border-b border-gray-200 pb-6 group">
                <span className="text-sm font-sans uppercase tracking-wider text-gray-500">Active Ventures</span>
                <span className="text-5xl md:text-6xl font-serif font-light text-gray-700">7</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-gray-200 pb-6 group">
                <span className="text-sm font-sans uppercase tracking-wider text-gray-500">Ideas Manifested</span>
                <span className="text-5xl md:text-6xl font-serif font-light text-gray-700">365</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-gray-200 pb-6 group">
                <span className="text-sm font-sans uppercase tracking-wider text-gray-500">Quantum Potential</span>
                <span className="text-5xl md:text-6xl font-serif font-light text-gray-700">∞</span>
              </div>
              
              <div className="flex justify-between items-end border-b border-gray-200 pb-6 group">
                <span className="text-sm font-sans uppercase tracking-wider text-gray-500">Success Probability</span>
                <span className="text-5xl md:text-6xl font-serif font-light text-gray-700">98.2%</span>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Current Focus */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-700 mb-16 leading-tight">
              Current Ventures
            </h2>
            
            <div className="space-y-16 text-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif mb-4 text-gray-700">MedTech Revolution</h3>
                <p className="text-base md:text-lg font-sans text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  AI-powered diagnostics that reveal patterns invisible to human perception.
                  Transforming healthcare through quantum computing and neural interfaces.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-serif mb-4 text-gray-700">Conscious Computing</h3>
                <p className="text-base md:text-lg font-sans text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  Building artificial consciousness from first principles.
                  Neural networks that dream, create, and transcend their programming.
                </p>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="section-container">
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
          </div>
        </section>

        {/* Connection */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-700 mb-12 leading-tight">
              Ready to transcend?
            </h2>
            
            <p className="text-base md:text-lg font-sans text-gray-600 leading-relaxed max-w-2xl mx-auto mb-16">
              The future is not predetermined. It's a canvas waiting for bold strokes.
              Let's paint it together.
            </p>
            
            <div className="space-y-8">
              <div>
                <button className="text-sm font-sans uppercase tracking-wider text-gray-600 border border-gray-300 px-8 py-3 hover:bg-gray-100 transition-colors duration-200">
                  Begin Conversation
                </button>
              </div>
              
              <div className="flex justify-center gap-10 pt-8">
                <a href="#" className="text-sm font-sans text-gray-500 hover:text-gray-700 transition-colors">
                  GitHub
                </a>
                <a href="#" className="text-sm font-sans text-gray-500 hover:text-gray-700 transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-sm font-sans text-gray-500 hover:text-gray-700 transition-colors">
                  hello@vladimir.tech
                </a>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-12">
          <div className="section-container">
            <div className="text-center">
            <p className="text-xs font-sans uppercase tracking-wider text-gray-400">
              © 2024 Vladimir Proskurov • Serial Innovator
            </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}