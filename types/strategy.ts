export interface StrategicPlan {
  id: string
  ventureId: string
  ventureName: string
  title: string
  description?: string
  type: 'business-model-canvas' | 'okr-planning' | 'competitive-analysis' | 'scenario-planning' | 'roadmap' | 'pivot-analysis'
  status: 'draft' | 'active' | 'completed' | 'archived'
  timeline: PlanTimeline
  participants: Participant[]
  frameworks: StrategicFramework[]
  outcomes: StrategicOutcome[]
  createdBy: string
  createdAt: string
  updatedAt: string
  version: number
  tags: string[]
}

export interface PlanTimeline {
  startDate: string
  endDate?: string
  milestones: PlanMilestone[]
  reviewCycle: 'weekly' | 'monthly' | 'quarterly' | 'annual'
  nextReview: string
}

export interface PlanMilestone {
  id: string
  title: string
  description?: string
  targetDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'delayed'
  owner: string
  dependencies: string[]
  metrics: MilestoneMetric[]
}

export interface MilestoneMetric {
  name: string
  target: number
  current: number
  unit: string
  status: 'on-track' | 'at-risk' | 'behind'
}

export interface Participant {
  id: string
  name: string
  role: string
  email: string
  responsibility: 'owner' | 'contributor' | 'reviewer' | 'stakeholder'
  lastActive?: string
  contributionScore: number
}

export interface StrategicFramework {
  id: string
  name: string
  type: 'business-model-canvas' | 'lean-canvas' | 'value-proposition-canvas' | 'okr' | 'swot' | 'porter-five-forces' | 'ansoff-matrix'
  data: any // Framework-specific data structure
  completedAt?: string
  confidence: number // 0-1
  insights: FrameworkInsight[]
}

export interface FrameworkInsight {
  id: string
  type: 'strength' | 'weakness' | 'opportunity' | 'threat' | 'recommendation' | 'risk'
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  actionable: boolean
  relatedElements: string[]
}

export interface StrategicOutcome {
  id: string
  type: 'decision' | 'hypothesis' | 'action-item' | 'learning' | 'pivot'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high'
  confidence: number
  targetDate?: string
  owner?: string
  status: 'proposed' | 'approved' | 'in-progress' | 'completed' | 'cancelled'
  metrics: OutcomeMetric[]
}

export interface OutcomeMetric {
  name: string
  baseline: number
  target: number
  current?: number
  unit: string
  measurementFreq: 'daily' | 'weekly' | 'monthly' | 'quarterly'
}

// Business Model Canvas specific types
export interface BusinessModelCanvas {
  id: string
  ventureId: string
  ventureName: string
  version: number
  lastUpdated: string
  elements: {
    keyPartners: CanvasElement[]
    keyActivities: CanvasElement[]
    keyResources: CanvasElement[]
    valuePropositions: CanvasElement[]
    customerRelationships: CanvasElement[]
    channels: CanvasElement[]
    customerSegments: CanvasElement[]
    costStructure: CanvasElement[]
    revenueStreams: CanvasElement[]
  }
  assumptions: BusinessAssumption[]
  validationStatus: ValidationStatus
  risks: CanvasRisk[]
}

export interface CanvasElement {
  id: string
  text: string
  priority: 'low' | 'medium' | 'high'
  validated: boolean
  confidence: number
  evidence: string[]
  relatedElements: string[]
  createdAt: string
  updatedAt: string
}

export interface BusinessAssumption {
  id: string
  element: string // which canvas element this relates to
  assumption: string
  criticality: 'low' | 'medium' | 'high'
  testable: boolean
  validationMethod?: string
  status: 'untested' | 'testing' | 'validated' | 'invalidated'
  evidence: string[]
  impact: string
}

export interface ValidationStatus {
  overall: number // 0-100 percentage validated
  byElement: {
    element: string
    validated: number
    total: number
    percentage: number
  }[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  recommendations: string[]
}

export interface CanvasRisk {
  id: string
  element: string
  risk: string
  probability: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  severity: 'low' | 'medium' | 'high' | 'critical'
  mitigation: string[]
  owner?: string
  status: 'identified' | 'monitoring' | 'mitigating' | 'resolved'
}

// OKR Planning specific types
export interface ObjectivesKeyResults {
  id: string
  ventureId: string
  ventureName: string
  quarter: string
  year: number
  objectives: Objective[]
  alignment: OKRAlignment
  progress: OKRProgress
  reviews: OKRReview[]
}

export interface Objective {
  id: string
  title: string
  description?: string
  category: 'growth' | 'efficiency' | 'innovation' | 'quality' | 'people' | 'financial'
  owner: string
  priority: 'p0' | 'p1' | 'p2'
  keyResults: KeyResult[]
  progress: number // 0-100
  status: 'on-track' | 'at-risk' | 'behind' | 'completed'
  startDate: string
  targetDate: string
  dependencies: string[]
  tags: string[]
}

export interface KeyResult {
  id: string
  title: string
  description?: string
  type: 'number' | 'percentage' | 'boolean' | 'milestone'
  baseline: number
  target: number
  current: number
  unit: string
  measurementMethod: string
  updateFrequency: 'daily' | 'weekly' | 'monthly'
  progress: number // 0-100
  status: 'on-track' | 'at-risk' | 'behind' | 'completed'
  owner: string
  checkIns: KRCheckIn[]
}

export interface KRCheckIn {
  id: string
  date: string
  value: number
  confidence: number // 0-1
  notes?: string
  blockers: string[]
  owner: string
}

export interface OKRAlignment {
  parentObjectives: string[]
  childObjectives: string[]
  crossFunctional: string[]
  alignmentScore: number // 0-100
}

export interface OKRProgress {
  overall: number // 0-100
  byObjective: { objectiveId: string; progress: number }[]
  trend: 'improving' | 'stable' | 'declining'
  velocity: number // progress per week
  forecast: {
    projectedCompletion: number
    confidenceInterval: [number, number]
    atRiskCount: number
  }
}

export interface OKRReview {
  id: string
  date: string
  type: 'weekly' | 'monthly' | 'quarterly'
  conductor: string
  participants: string[]
  decisions: ReviewDecision[]
  actionItems: ReviewActionItem[]
  nextReviewDate: string
}

export interface ReviewDecision {
  id: string
  decision: string
  rationale: string
  impact: string[]
  owner: string
}

export interface ReviewActionItem {
  id: string
  action: string
  owner: string
  dueDate: string
  status: 'open' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
}

// Competitive Analysis types
export interface CompetitiveAnalysis {
  id: string
  ventureId: string
  ventureName: string
  title: string
  analysisDate: string
  competitors: Competitor[]
  positioningMap: PositioningMap
  marketShare: MarketShareData
  featureComparison: FeatureComparison
  pricing: PricingAnalysis
  swotAnalysis: SWOTAnalysis
  strategicRecommendations: string[]
}

export interface Competitor {
  id: string
  name: string
  type: 'direct' | 'indirect' | 'substitute'
  tier: 'tier-1' | 'tier-2' | 'tier-3'
  marketCap?: number
  employees?: number
  funding?: number
  stage: 'startup' | 'growth' | 'mature' | 'enterprise'
  strengths: string[]
  weaknesses: string[]
  keyProducts: string[]
  targetMarket: string[]
  businessModel: string
  recentNews: CompetitorNews[]
  threatLevel: 'low' | 'medium' | 'high' | 'critical'
}

export interface CompetitorNews {
  id: string
  title: string
  description: string
  date: string
  source: string
  significance: 'low' | 'medium' | 'high'
  category: 'funding' | 'product' | 'partnership' | 'hiring' | 'expansion' | 'other'
}

export interface PositioningMap {
  axes: {
    x: { label: string; min: number; max: number }
    y: { label: string; min: number; max: number }
  }
  positions: {
    competitor: string
    x: number
    y: number
    marketShare?: number
    color: string
  }[]
  insights: string[]
}

export interface MarketShareData {
  total: number
  byCompetitor: { competitor: string; share: number; trend: 'up' | 'down' | 'stable' }[]
  methodology: string
  dataSource: string
  lastUpdated: string
}

export interface FeatureComparison {
  features: string[]
  comparison: {
    competitor: string
    features: {
      feature: string
      hasFeature: boolean
      quality: 'poor' | 'average' | 'good' | 'excellent'
      notes?: string
    }[]
  }[]
  gaps: {
    feature: string
    impact: 'low' | 'medium' | 'high'
    effort: 'low' | 'medium' | 'high'
    recommendation: string
  }[]
}

export interface PricingAnalysis {
  pricingModels: {
    competitor: string
    model: 'freemium' | 'subscription' | 'usage-based' | 'one-time' | 'enterprise'
    tiers: PricingTier[]
  }[]
  insights: string[]
  opportunities: string[]
}

export interface PricingTier {
  name: string
  price: number
  billingCycle: 'monthly' | 'annual' | 'one-time'
  features: string[]
  limitations?: string[]
}

export interface SWOTAnalysis {
  strengths: SWOTItem[]
  weaknesses: SWOTItem[]
  opportunities: SWOTItem[]
  threats: SWOTItem[]
  strategicQuadrants: {
    soStrategies: string[] // Strengths-Opportunities
    woStrategies: string[] // Weaknesses-Opportunities
    stStrategies: string[] // Strengths-Threats
    wtStrategies: string[] // Weaknesses-Threats
  }
}

export interface SWOTItem {
  id: string
  item: string
  impact: 'low' | 'medium' | 'high'
  evidence: string[]
  relatedCompetitors?: string[]
  actionable: boolean
}

// Scenario Planning types
export interface ScenarioPlanning {
  id: string
  ventureId: string
  ventureName: string
  title: string
  timeHorizon: string
  scenarios: Scenario[]
  variables: ScenarioVariable[]
  outcomes: ScenarioOutcome[]
  recommendations: ScenarioRecommendation[]
  createdAt: string
  updatedAt: string
}

export interface Scenario {
  id: string
  name: string
  description: string
  probability: number // 0-1
  type: 'base' | 'optimistic' | 'pessimistic' | 'black-swan'
  assumptions: string[]
  keyEvents: ScenarioEvent[]
  metrics: ScenarioMetric[]
  implications: string[]
}

export interface ScenarioEvent {
  id: string
  event: string
  probability: number
  impact: 'low' | 'medium' | 'high'
  timeline: string
  triggers: string[]
  consequences: string[]
}

export interface ScenarioVariable {
  id: string
  name: string
  type: 'market-size' | 'competition' | 'technology' | 'regulation' | 'economic' | 'social'
  currentValue: number
  scenarios: {
    scenarioId: string
    value: number
    rationale: string
  }[]
  sensitivity: 'low' | 'medium' | 'high'
  controllable: boolean
}

export interface ScenarioMetric {
  name: string
  unit: string
  scenarios: {
    scenarioId: string
    value: number
    confidence: number
  }[]
}

export interface ScenarioOutcome {
  scenarioId: string
  revenue: number
  profitability: number
  marketShare: number
  employeeCount: number
  fundingNeeded: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  strategicOptions: string[]
}

export interface ScenarioRecommendation {
  id: string
  type: 'hedge' | 'option' | 'pivot' | 'accelerate' | 'exit'
  recommendation: string
  triggerConditions: string[]
  cost: number
  benefit: number
  timeline: string
  owner?: string
  status: 'proposed' | 'approved' | 'implemented' | 'cancelled'
}