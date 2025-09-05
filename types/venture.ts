export type VentureStage = 'ideation' | 'mvp' | 'growth' | 'scale' | 'exit'
export type VentureCategory = 'health' | 'ai' | 'nanotech' | 'education' | 'consumer' | 'research' | 'saas'

export interface Venture {
  id: string
  name: string
  tagline: string
  description: string
  category: VentureCategory
  stage: VentureStage
  founded: string
  teamSize: number
  metrics: {
    revenue?: string
    users?: string
    growth?: string
  }
  technologies: string[]
  website?: string
  logo?: string
  featured: boolean
}

export interface VentureFilter {
  categories: VentureCategory[]
  stages: VentureStage[]
  searchQuery: string
}

export const STAGE_LABELS: Record<VentureStage, string> = {
  ideation: 'Ideation',
  mvp: 'MVP',
  growth: 'Growth',
  scale: 'Scale',
  exit: 'Exit'
}

export const CATEGORY_LABELS: Record<VentureCategory, string> = {
  health: 'Health MedTech',
  ai: 'AI Solutions',
  nanotech: 'NanoTech',
  education: 'Education',
  consumer: 'Consumer',
  research: 'Research',
  saas: 'SaaS'
}