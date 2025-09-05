import { Venture } from '@/types/venture'

export const ventures: Venture[] = [
  {
    id: '1',
    name: 'MediCore Solutions',
    tagline: 'Revolutionary diagnostic technology',
    description: 'Advanced medical diagnostics using AI-powered imaging and predictive analytics to detect diseases at early stages.',
    category: 'health',
    stage: 'scale',
    founded: '2021',
    teamSize: 45,
    metrics: {
      revenue: '$12M ARR',
      users: '150+ Hospitals',
      growth: '180% YoY'
    },
    technologies: ['AI/ML', 'Medical Imaging', 'Cloud Computing'],
    featured: true
  },
  {
    id: '2',
    name: 'NeuralForge AI',
    tagline: 'Enterprise AI automation platform',
    description: 'End-to-end AI solutions for enterprise automation, from document processing to predictive maintenance.',
    category: 'ai',
    stage: 'growth',
    founded: '2022',
    teamSize: 28,
    metrics: {
      revenue: '$5M ARR',
      users: '50+ Enterprises',
      growth: '220% YoY'
    },
    technologies: ['GPT-4', 'Computer Vision', 'AutoML'],
    featured: true
  },
  {
    id: '3',
    name: 'NanoShield Technologies',
    tagline: 'Next-gen protective coatings',
    description: 'Revolutionary nano-material coatings for industrial applications, providing unprecedented durability and protection.',
    category: 'nanotech',
    stage: 'growth',
    founded: '2020',
    teamSize: 32,
    metrics: {
      revenue: '$8M ARR',
      users: '200+ Industrial Clients',
      growth: '150% YoY'
    },
    technologies: ['Nanotechnology', 'Material Science', 'IoT Sensors'],
    featured: true
  },
  {
    id: '4',
    name: 'VitalBlend Naturals',
    tagline: 'Science-backed natural supplements',
    description: 'Premium anti-aging supplements developed through cutting-edge research in longevity and cellular health.',
    category: 'consumer',
    stage: 'scale',
    founded: '2019',
    teamSize: 52,
    metrics: {
      revenue: '$18M ARR',
      users: '500K+ Customers',
      growth: '120% YoY'
    },
    technologies: ['Biotech', 'E-commerce', 'Supply Chain Tech'],
    featured: false
  },
  {
    id: '5',
    name: 'Cosmic Academy',
    tagline: 'Astrology meets education',
    description: 'Professional astrology education platform combining ancient wisdom with modern learning technologies.',
    category: 'education',
    stage: 'mvp',
    founded: '2023',
    teamSize: 12,
    metrics: {
      users: '10K+ Students',
      growth: 'Pre-revenue'
    },
    technologies: ['EdTech', 'Mobile Apps', 'Community Platform'],
    featured: false
  },
  {
    id: '6',
    name: 'PetGuard Health',
    tagline: 'Smart health monitoring for pets',
    description: 'IoT-enabled pet health devices providing real-time monitoring and predictive health alerts for pet owners.',
    category: 'consumer',
    stage: 'growth',
    founded: '2022',
    teamSize: 18,
    metrics: {
      revenue: '$3M ARR',
      users: '50K+ Pet Owners',
      growth: '300% YoY'
    },
    technologies: ['IoT', 'Mobile Apps', 'AI/ML'],
    featured: false
  },
  {
    id: '7',
    name: 'OncoGenix Research',
    tagline: 'Breakthrough cancer therapeutics',
    description: 'Developing novel immunotherapy approaches for hard-to-treat cancers using proprietary molecular targeting.',
    category: 'research',
    stage: 'mvp',
    founded: '2023',
    teamSize: 15,
    metrics: {
      users: 'Phase II Trials',
      growth: 'R&D Stage'
    },
    technologies: ['Biotech', 'Immunotherapy', 'Clinical Research'],
    featured: true
  },
  {
    id: '8',
    name: 'Quantum Ledger',
    tagline: 'Blockchain for enterprise',
    description: 'Next-generation blockchain infrastructure for secure, scalable enterprise applications.',
    category: 'saas',
    stage: 'ideation',
    founded: '2024',
    teamSize: 8,
    metrics: {
      growth: 'Prototype Phase'
    },
    technologies: ['Blockchain', 'Cryptography', 'Distributed Systems'],
    featured: false
  }
]