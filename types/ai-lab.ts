export interface VentureIdea {
  id: string
  name: string
  tagline: string
  problem: string
  solution: string
  targetMarket: string
  marketSize: string
  competitiveAdvantage: string
  revenueModel: string
  mvpFeatures: string[]
  techStack: string[]
  timeline: {
    phase: string
    duration: string
    deliverables: string[]
  }[]
  investmentNeeded: string
  potentialROI: string
  riskFactors: string[]
  validationScore: number
  createdAt: string
}

export interface BusinessModelCanvas {
  keyPartners: string[]
  keyActivities: string[]
  keyResources: string[]
  valuePropositions: string[]
  customerRelationships: string[]
  channels: string[]
  customerSegments: string[]
  costStructure: string[]
  revenueStreams: string[]
}

export interface VenturePrompt {
  industry: string
  technology: string
  problemSpace: string
  targetAudience: string
  budget: string
  timeline: string
}

export interface ValidationCriteria {
  marketDemand: number // 0-100
  technicalFeasibility: number
  competitiveAdvantage: number
  scalability: number
  profitability: number
  teamCapability: number
}

export type VentureStage = 'ideation' | 'validation' | 'planning' | 'building' | 'launching'