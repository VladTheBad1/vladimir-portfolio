export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="section-container py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Vladimir Proskurov</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
            Serial Innovator Command Center
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Where vision meets velocity. Creating tomorrow&apos;s companies today.
          </p>
          
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-primary-400">
              Platform Under Construction
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="venture-card">
                <h4 className="text-lg font-semibold mb-2 text-primary-300">
                  7+ Active Ventures
                </h4>
                <p className="text-gray-400 text-sm">
                  Health MedTech, AI Solutions, NanoTech, and more
                </p>
              </div>
              <div className="venture-card">
                <h4 className="text-lg font-semibold mb-2 text-primary-300">
                  Global Experience
                </h4>
                <p className="text-gray-400 text-sm">
                  Operating across Europe, Asia, Africa, and Americas
                </p>
              </div>
              <div className="venture-card">
                <h4 className="text-lg font-semibold mb-2 text-primary-300">
                  AI-Powered Creation
                </h4>
                <p className="text-gray-400 text-sm">
                  Building a company a day with AI capabilities
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-gray-500 text-sm">
              Full platform launching soon. Stay tuned for the complete experience.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
