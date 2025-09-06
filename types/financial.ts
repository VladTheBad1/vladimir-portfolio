export interface FinancialMetrics {
  ventureId: string
  ventureName: string
  period: string
  revenue: RevenueData
  expenses: ExpenseData
  profitability: ProfitabilityData
  cashFlow: CashFlowData
  funding: FundingData
  valuation: ValuationData
  kpis: FinancialKPI[]
  projections: FinancialProjection[]
}

export interface RevenueData {
  total: number
  recurring: number
  oneTime: number
  growth: number // percentage
  segments: RevenueSegment[]
  monthlyData: MonthlyData[]
}

export interface RevenueSegment {
  name: string
  amount: number
  percentage: number
  growth: number
}

export interface ExpenseData {
  total: number
  operational: number
  marketing: number
  personnel: number
  technology: number
  legal: number
  other: number
  burnRate: number // monthly
  growth: number // percentage
  categories: ExpenseCategory[]
}

export interface ExpenseCategory {
  category: string
  amount: number
  percentage: number
  trend: 'increasing' | 'stable' | 'decreasing'
}

export interface ProfitabilityData {
  grossProfit: number
  grossMargin: number // percentage
  netProfit: number
  netMargin: number // percentage
  ebitda: number
  ebitdaMargin: number // percentage
  breakEvenDate?: string
  profitabilityTrend: 'improving' | 'stable' | 'declining'
}

export interface CashFlowData {
  operating: number
  investing: number
  financing: number
  net: number
  currentBalance: number
  runway: number // months
  burnRate: number // monthly
  projectedRunout?: string
}

export interface FundingData {
  totalRaised: number
  currentRound?: FundingRound
  previousRounds: FundingRound[]
  investors: Investor[]
  equityDilution: number // percentage
  postMoneyValuation: number
  nextFundingTarget?: number
  nextFundingDate?: string
}

export interface FundingRound {
  id: string
  type: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'bridge' | 'convertible'
  amount: number
  date: string
  status: 'planned' | 'in-progress' | 'closed' | 'cancelled'
  leadInvestor?: string
  preMoneyValuation: number
  postMoneyValuation: number
  equityPercentage: number
  investors: string[]
  useOfFunds: UseOfFunds[]
}

export interface UseOfFunds {
  category: string
  amount: number
  percentage: number
  description?: string
}

export interface Investor {
  id: string
  name: string
  type: 'angel' | 'vc' | 'pe' | 'strategic' | 'family-office' | 'crowdfunding'
  tier: 'tier-1' | 'tier-2' | 'tier-3'
  investmentAmount: number
  equityPercentage: number
  investmentDate: string
  status: 'active' | 'exited' | 'inactive'
  boardSeat: boolean
  contact?: {
    email: string
    phone?: string
    linkedin?: string
  }
}

export interface ValuationData {
  current: number
  method: 'dcf' | 'comparable' | 'revenue-multiple' | 'user-multiple' | 'asset-based'
  lastUpdated: string
  history: ValuationHistory[]
  drivers: ValuationDriver[]
}

export interface ValuationHistory {
  date: string
  valuation: number
  method: string
  event: string // funding round, acquisition offer, etc.
}

export interface ValuationDriver {
  metric: string
  value: number
  multiple: number
  weight: number // percentage influence on valuation
}

export interface FinancialKPI {
  name: string
  value: number
  unit: string
  target?: number
  benchmark?: number
  trend: 'up' | 'down' | 'stable'
  period: string
  category: 'revenue' | 'efficiency' | 'growth' | 'profitability'
}

export interface FinancialProjection {
  period: string
  revenue: number
  expenses: number
  netIncome: number
  cashFlow: number
  confidence: number // 0-1
  scenario: 'conservative' | 'base' | 'optimistic'
}

export interface MonthlyData {
  month: string
  value: number
  target?: number
  growth?: number
}

export interface PortfolioFinancials {
  totalValuation: number
  totalRevenue: number
  totalFunding: number
  averageBurnRate: number
  averageRunway: number
  profitableVentures: number
  totalVentures: number
  performanceMetrics: PortfolioKPI[]
  concentrationRisk: ConcentrationRisk[]
  diversification: DiversificationMetrics
}

export interface PortfolioKPI {
  name: string
  value: number
  unit: string
  benchmark?: number
  trend: 'up' | 'down' | 'stable'
}

export interface ConcentrationRisk {
  type: 'venture' | 'industry' | 'geography' | 'stage'
  name: string
  percentage: number
  risk: 'low' | 'medium' | 'high'
}

export interface DiversificationMetrics {
  byStage: { stage: string; count: number; percentage: number }[]
  byIndustry: { industry: string; count: number; percentage: number }[]
  byRevenueStage: { stage: string; count: number; percentage: number }[]
  herfindahlIndex: number // concentration measure
}

export interface FinancialAlert {
  id: string
  ventureId: string
  ventureName: string
  type: 'burn-rate' | 'runway' | 'revenue-decline' | 'missed-target' | 'funding-needed'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  recommendation: string
  dueDate?: string
  resolved: boolean
  createdAt: string
}

export interface BenchmarkData {
  industry: string
  stage: string
  metrics: {
    revenueGrowth: { median: number; p75: number; p90: number }
    grossMargin: { median: number; p75: number; p90: number }
    burnRate: { median: number; p75: number; p90: number }
    runway: { median: number; p75: number; p90: number }
    cac: { median: number; p75: number; p90: number }
    ltv: { median: number; p75: number; p90: number }
    ltvCacRatio: { median: number; p75: number; p90: number }
  }
}