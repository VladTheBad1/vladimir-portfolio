export interface AIVenture {
  id: string
  name: string
  tagline: string
  industry: string
  category: string
  problem: string
  solution: string
  uniqueValue: string
  targetMarket: string
  marketSize: number
  businessModel: BusinessModel
  techStack: string[]
  aiGeneratedAt: string
  createdBy: string
  status: 'idea' | 'validating' | 'building' | 'launched' | 'scaling' | 'exited'
  validation: ValidationMetrics
  traction: TractionMetrics
  funding: FundingStatus
  team: TeamMember[]
  milestones: Milestone[]
  risks: Risk[]
  opportunities: Opportunity[]
  competitiveAdvantage: string[]
  moat: string
  exitStrategy: ExitStrategy
  aiConfidence: number // 0-100
  memberInterest: number // count of interested members
  instantFundingEligible: boolean
}

export interface BusinessModel {
  type: 'saas' | 'marketplace' | 'platform' | 'direct-sales' | 'freemium' | 'subscription' | 'transaction'
  revenueStreams: RevenueStream[]
  pricing: PricingModel
  customerAcquisition: CustomerAcquisition
  unitEconomics: UnitEconomics
  scalability: ScalabilityMetrics
}

export interface RevenueStream {
  name: string
  type: string
  projectedMonthly: number
  margin: number
  growthRate: number
}

export interface PricingModel {
  strategy: string
  tiers: PricingTier[]
  averageContractValue: number
  pricingPower: 'low' | 'medium' | 'high'
}

export interface PricingTier {
  name: string
  price: number
  features: string[]
  targetSegment: string
}

export interface CustomerAcquisition {
  channels: string[]
  cac: number
  paybackPeriod: number
  virality: number
  conversionRate: number
}

export interface UnitEconomics {
  ltv: number
  cac: number
  ltvCacRatio: number
  grossMargin: number
  contributionMargin: number
  breakEvenPoint: number // months
}

export interface ScalabilityMetrics {
  automationLevel: number // 0-100
  marginalCost: number
  networkEffects: boolean
  internationalPotential: 'low' | 'medium' | 'high'
  talNeeded: number
}

export interface ValidationMetrics {
  stage: 'idea' | 'problem-validated' | 'solution-validated' | 'market-validated' | 'revenue-validated'
  score: number // 0-100
  signals: ValidationSignal[]
  lastUpdated: string
}

export interface ValidationSignal {
  type: 'customer-interview' | 'survey' | 'landing-page' | 'prototype-test' | 'pilot' | 'paying-customer'
  result: string
  confidence: number
  date: string
  evidence: string
}

export interface TractionMetrics {
  users: number
  revenue: number
  growth: number // percentage monthly
  retention: number // percentage
  nps: number
  activeUsers: number
  conversionRate: number
  churnRate: number
  burnRate: number
  runway: number // months
  realTime: boolean
  lastUpdated: string
}

export interface FundingStatus {
  raised: number
  seeking: number
  valuation: number
  stage: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c'
  investors: VentureInvestor[]
  instantFunding: InstantFunding
  runway: number // months
  useOfFunds: UseOfFunds[]
}

export interface VentureInvestor {
  memberId: string
  name: string
  amount: number
  type: 'angel' | 'vc' | 'syndicate' | 'member'
  committedAt: string
  terms?: string
  board: boolean
}

export interface InstantFunding {
  enabled: boolean
  minTraction: TractionRequirement
  maxAmount: number
  committedAmount: number
  interestedInvestors: string[]
  autoApprove: boolean
  terms: StandardTerms
}

export interface TractionRequirement {
  minRevenue?: number
  minUsers?: number
  minGrowth?: number
  minRetention?: number
}

export interface StandardTerms {
  type: 'safe' | 'convertible' | 'equity'
  valuation: number
  discount?: number
  cap?: number
  equity?: number
}

export interface UseOfFunds {
  category: string
  amount: number
  percentage: number
  timeline: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  expertise: string[]
  linkedinUrl?: string
  isAIMatched: boolean
  equity: number
  joinedAt: string
  commitment: 'full-time' | 'part-time' | 'advisor'
}

export interface Milestone {
  id: string
  title: string
  description: string
  targetDate: string
  completedDate?: string
  status: 'pending' | 'in-progress' | 'completed' | 'delayed'
  critical: boolean
  dependencies: string[]
  impact: 'low' | 'medium' | 'high'
}

export interface Risk {
  id: string
  type: 'market' | 'technical' | 'regulatory' | 'competitive' | 'financial' | 'team'
  description: string
  probability: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  mitigation: string
}

export interface Opportunity {
  id: string
  type: 'partnership' | 'acquisition' | 'expansion' | 'pivot' | 'strategic'
  description: string
  value: number
  probability: number
  timeline: string
}

export interface ExitStrategy {
  type: 'acquisition' | 'ipo' | 'merger' | 'buyout' | 'secondary'
  timeline: string // e.g., "3-5 years"
  targetValuation: number
  potentialAcquirers: string[]
  comparableExits: ComparableExit[]
}

export interface ComparableExit {
  company: string
  valuation: number
  acquirer: string
  date: string
  multiple: number
}

// AI Generation System
export interface VentureGenerationRequest {
  userId: string
  prompt?: string
  industry?: string
  problemSpace?: string
  targetMarket?: string
  budget?: number
  timeline?: string
  preferences: GenerationPreferences
}

export interface GenerationPreferences {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive'
  timeCommitment: 'passive' | 'part-time' | 'full-time'
  fundingPreference: 'bootstrap' | 'angel' | 'vc'
  exitTimeline: '1-2 years' | '3-5 years' | '5-10 years' | '10+ years'
  industries: string[]
  避Industries: string[]
}

// Live Traction Dashboard
export interface LiveDashboard {
  ventureId: string
  metrics: RealtimeMetric[]
  alerts: TractionAlert[]
  forecasts: Forecast[]
  competitors: CompetitorTracking[]
  marketConditions: MarketCondition[]
}

export interface RealtimeMetric {
  name: string
  value: number
  change: number
  changeType: 'percentage' | 'absolute'
  trend: 'up' | 'down' | 'stable'
  timestamp: string
  source: string
}

export interface TractionAlert {
  type: 'milestone' | 'growth-spike' | 'churn-warning' | 'funding-eligible' | 'acquisition-interest'
  severity: 'info' | 'warning' | 'critical' | 'success'
  message: string
  action?: string
  timestamp: string
}

export interface Forecast {
  metric: string
  current: number
  projected30: number
  projected90: number
  projected365: number
  confidence: number
  assumptions: string[]
}

export interface CompetitorTracking {
  name: string
  funding: number
  employees: number
  growth: number
  threat: 'low' | 'medium' | 'high'
  lastUpdate: string
}

export interface MarketCondition {
  factor: string
  impact: 'positive' | 'neutral' | 'negative'
  description: string
  relevance: number // 0-100
}

// Instant Funding Marketplace
export interface FundingOffer {
  id: string
  ventureId: string
  investorId: string
  amount: number
  terms: OfferTerms
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  expiresAt: string
  conditions: string[]
  message?: string
}

export interface OfferTerms {
  type: 'safe' | 'convertible' | 'equity'
  valuation?: number
  discount?: number
  equity?: number
  boardSeat: boolean
  proRata: boolean
  liquidationPreference?: number
}

// Co-founder Matching
export interface CofounderMatch {
  id: string
  candidateId: string
  ventureId: string
  matchScore: number // 0-100
  skills: SkillMatch[]
  availability: string
  expectations: CofounderExpectations
  aiRecommendation: string
}

export interface SkillMatch {
  skill: string
  level: 'beginner' | 'intermediate' | 'expert'
  relevance: number // 0-100
  gap: boolean
}

export interface CofounderExpectations {
  equity: string // range
  role: string
  commitment: string
  location: string
  experience: string
}

// Smart Contract Investment
export interface SmartInvestment {
  id: string
  ventureId: string
  contractAddress: string
  totalRaised: number
  investors: SmartInvestor[]
  milestones: SmartMilestone[]
  escrowAmount: number
  releasedAmount: number
  status: 'active' | 'completed' | 'cancelled'
}

export interface SmartInvestor {
  address: string
  memberId: string
  amount: number
  shares: number
  vestingSchedule: VestingSchedule
}

export interface VestingSchedule {
  cliff: number // months
  duration: number // months
  released: number
  remaining: number
}

export interface SmartMilestone {
  id: string
  description: string
  releaseAmount: number
  achieved: boolean
  achievedAt?: string
  proof?: string
}

// Market Validation Engine
export interface MarketValidation {
  ventureId: string
  score: number // 0-100
  signals: MarketSignal[]
  competitors: CompetitorAnalysis[]
  tam: number
  sam: number
  som: number
  growthRate: number
  recommendations: string[]
}

export interface MarketSignal {
  type: 'search-volume' | 'social-sentiment' | 'news-coverage' | 'competitor-funding' | 'regulatory-change'
  strength: 'weak' | 'moderate' | 'strong'
  sentiment: 'positive' | 'neutral' | 'negative'
  description: string
  source: string
  date: string
}

export interface CompetitorAnalysis {
  name: string
  marketShare: number
  strengths: string[]
  weaknesses: string[]
  differentiation: string[]
}

// Virtual Pitch Room
export interface PitchSession {
  id: string
  ventureId: string
  presenterId: string
  scheduledAt: string
  duration: number // minutes
  attendees: string[]
  recording?: string
  feedback: PitchFeedback[]
  aiCoaching: AICoaching[]
  outcome?: 'funded' | 'passed' | 'follow-up'
}

export interface PitchFeedback {
  investorId: string
  rating: number // 1-10
  strengths: string[]
  concerns: string[]
  questions: string[]
  interest: 'high' | 'medium' | 'low' | 'none'
  followUp: boolean
}

export interface AICoaching {
  area: 'delivery' | 'content' | 'visuals' | 'answers'
  feedback: string
  improvement: string
  examples: string[]
}

// Portfolio Analytics
export interface PortfolioAnalytics {
  totalVentures: number
  totalValue: number
  totalRevenue: number
  averageGrowth: number
  successRate: number
  failures: number
  exits: Exit[]
  performance: PerformanceMetric[]
  concentration: ConcentrationRisk[]
  predictions: ExitPrediction[]
}

export interface Exit {
  ventureId: string
  type: 'acquisition' | 'ipo' | 'secondary' | 'shutdown'
  value: number
  multiple: number
  date: string
  acquirer?: string
}

export interface PerformanceMetric {
  venture: string
  irr: number
  multiple: number
  status: 'active' | 'exited' | 'failed'
  rank: number
}

export interface ConcentrationRisk {
  type: 'industry' | 'stage' | 'geography'
  name: string
  percentage: number
  risk: 'low' | 'medium' | 'high'
}

export interface ExitPrediction {
  ventureId: string
  probability: number
  timeline: string
  estimatedValue: number
  confidence: number
  factors: string[]
}

// Syndicate Management
export interface Syndicate {
  id: string
  name: string
  leadId: string
  ventureId: string
  targetAmount: number
  committedAmount: number
  minimumInvestment: number
  members: SyndicateMember[]
  spv: SPVDetails
  documents: LegalDocument[]
  status: 'forming' | 'active' | 'closed'
  closingDate: string
}

export interface SyndicateMember {
  memberId: string
  amount: number
  committedAt: string
  status: 'committed' | 'paid' | 'withdrawn'
  carry?: number
}

export interface SPVDetails {
  name: string
  jurisdiction: string
  ein?: string
  bankAccount?: string
  legalEntity: string
  formationDate: string
  documents: string[]
}

export interface LegalDocument {
  type: 'operating-agreement' | 'subscription' | 'side-letter' | 'k1' | 'other'
  name: string
  url: string
  signedBy: string[]
  requiredSignatures: string[]
}