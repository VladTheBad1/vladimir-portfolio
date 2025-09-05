export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://vladimirproskurov.com/#person",
        "name": "Vladimir Proskurov",
        "alternateName": "VladTheBad1",
        "description": "Serial entrepreneur and CEO building the future one company at a time. Founder of 40+ ventures with a portfolio value of $125M+.",
        "url": "https://vladimirproskurov.com",
        "sameAs": [
          "https://twitter.com/VladTheBad1",
          "https://linkedin.com/in/vladimirproskurov",
          "https://github.com/VladTheBad1"
        ],
        "jobTitle": "CEO & Serial Innovator",
        "worksFor": {
          "@type": "Organization",
          "name": "VP Ventures",
          "description": "Portfolio of 40+ innovative companies"
        },
        "knowsAbout": [
          "Entrepreneurship",
          "Venture Building",
          "Artificial Intelligence",
          "HealthTech",
          "Business Strategy",
          "Innovation Management"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://vladimirproskurov.com/#website",
        "url": "https://vladimirproskurov.com",
        "name": "Vladimir Proskurov - Serial Innovator",
        "description": "Executive platform showcasing multi-venture portfolio and AI-powered company creation",
        "publisher": {
          "@id": "https://vladimirproskurov.com/#person"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://vladimirproskurov.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ProfilePage",
        "@id": "https://vladimirproskurov.com/#webpage",
        "url": "https://vladimirproskurov.com",
        "name": "Vladimir Proskurov - Serial Innovator & CEO",
        "isPartOf": {
          "@id": "https://vladimirproskurov.com/#website"
        },
        "about": {
          "@id": "https://vladimirproskurov.com/#person"
        },
        "description": "Serial entrepreneur with 40+ ventures building the future using AI"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}