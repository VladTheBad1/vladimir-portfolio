export interface Investor {
  id: string
  name: string
  firm: string
  type: 'VC' | 'Angel' | 'PE' | 'Strategic' | 'Family Office' | 'Crowdfunding'
  status: 'prospect' | 'contacted' | 'meeting' | 'due-diligence' | 'term-sheet' | 'closed' | 'passed'
  email: string
  phone?: string
  linkedIn?: string
  checkSize: {
    min: number
    max: number
  }
  sweetSpot: number
  stages: string[] // seed, series-a, series-b, etc
  sectors: string[] // healthcare, ai, fintech, etc
  portfolio?: string[] // portfolio companies
  lastContact?: string
  nextFollowUp?: string
  notes?: string
  ventureId?: string
  leadPartner?: string
  temperature: 'hot' | 'warm' | 'cold'
}

export interface FundraisingRound {
  id: string
  ventureId: string
  ventureName: string
  roundType: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Series D+' | 'Bridge'
  status: 'planning' | 'active' | 'closing' | 'closed'
  targetAmount: number
  amountRaised: number
  preMoneyValuation: number
  postMoneyValuation?: number
  startDate: string
  targetCloseDate: string
  actualCloseDate?: string
  leadInvestor?: Investor
  investors: InvestorCommitment[]
  documents: Document[]
  milestones: FundraisingMilestone[]
}

export interface InvestorCommitment {
  investorId: string
  investorName: string
  amount: number
  status: 'verbal' | 'committed' | 'signed' | 'wired'
  dateCommitted?: string
  dateWired?: string
  ownership?: number // percentage
}

export interface Document {
  id: string
  name: string
  type: 'pitch-deck' | 'financials' | 'term-sheet' | 'legal' | 'due-diligence' | 'other'
  url: string
  uploadedDate: string
  version?: string
  confidential: boolean
}

export interface FundraisingMilestone {
  id: string
  title: string
  date: string
  completed: boolean
  description?: string
}

export interface CapTable {
  ventureId: string
  ventureName: string
  totalShares: number
  shareholders: Shareholder[]
  rounds: FundraisingRound[]
  fullyDilutedShares?: number
  optionPool?: number
}

export interface Shareholder {
  id: string
  name: string
  type: 'founder' | 'investor' | 'employee' | 'advisor'
  shares: number
  percentage: number
  class: 'common' | 'preferred-a' | 'preferred-b' | 'preferred-c'
  vestingSchedule?: {
    total: number
    vested: number
    cliff: string
    vestingPeriod: number // months
  }
}

export interface InvestorUpdate {
  id: string
  ventureId: string
  ventureName: string
  date: string
  subject: string
  content: string
  metrics: {
    revenue?: number
    users?: number
    growth?: number
    runway?: number // months
    burn?: number
  }
  highlights: string[]
  challenges: string[]
  asks: string[]
  recipients: string[]
  status: 'draft' | 'sent'
}