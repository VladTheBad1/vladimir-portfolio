export interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  ventureId: string
  ventureName: string
  email: string
  avatar?: string
  startDate: string
  location: string
  reportingTo?: string
  status: 'active' | 'on-leave' | 'inactive'
  performance: PerformanceMetrics
  skills: string[]
  okrs: OKR[]
}

export interface PerformanceMetrics {
  productivity: number // 0-100
  quality: number // 0-100
  collaboration: number // 0-100
  innovation: number // 0-100
  leadership: number // 0-100
  overallScore: number // 0-100
  trend: 'improving' | 'stable' | 'declining'
  lastReview: string
  nextReview: string
}

export interface OKR {
  id: string
  objective: string
  keyResults: KeyResult[]
  quarter: string
  year: number
  status: 'on-track' | 'at-risk' | 'behind' | 'completed'
  progress: number // 0-100
  owner: string
  ventureId?: string
}

export interface KeyResult {
  id: string
  description: string
  target: number
  current: number
  unit: string
  progress: number // 0-100
  status: 'on-track' | 'at-risk' | 'behind' | 'completed'
  dueDate: string
}

export interface TeamInsight {
  totalMembers: number
  averagePerformance: number
  topPerformers: TeamMember[]
  atRiskMembers: TeamMember[]
  skillGaps: string[]
  upcomingReviews: TeamMember[]
  departmentBreakdown: { department: string; count: number }[]
  ventureDistribution: { venture: string; count: number }[]
}

export interface SkillMatrix {
  skills: string[]
  members: {
    name: string
    skills: { skill: string; level: number }[]
  }[]
}

export interface TeamPulse {
  date: string
  engagement: number
  satisfaction: number
  productivity: number
  burnoutRisk: number
  responses: number
  insights: string[]
}