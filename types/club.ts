export interface ClubMember {
  id: string
  name: string
  email: string
  type: 'founder' | 'investor' | 'both'
  company?: string
  title: string
  linkedinUrl?: string
  twitterHandle?: string
  avatar?: string
  location: string
  timezone: string
  bio: string
  expertise: string[]
  interests: string[]
  memberSince: string
  status: 'pending' | 'active' | 'premium' | 'suspended'
  verificationStatus: 'unverified' | 'verified' | 'vetted'
  referredBy?: string
  achievements: Achievement[]
  investments?: Investment[]
  ventures?: Venture[]
  eventAttendance: EventAttendance[]
  connections: string[] // member IDs
  visibility: 'public' | 'members-only' | 'private'
}

export interface Achievement {
  id: string
  type: 'exit' | 'funding' | 'ipo' | 'acquisition' | 'unicorn' | 'award' | 'milestone'
  title: string
  description: string
  date: string
  value?: number
  verified: boolean
  company?: string
}

export interface Investment {
  id: string
  companyName: string
  industry: string
  stage: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'late-stage' | 'ipo'
  amount?: number
  year: string
  role: 'lead' | 'follow' | 'syndicate'
  outcome?: 'active' | 'exited' | 'acquired' | 'ipo' | 'written-off'
  returns?: number // multiple
}

export interface Venture {
  id: string
  name: string
  website?: string
  industry: string
  stage: 'idea' | 'mvp' | 'product-market-fit' | 'scaling' | 'mature' | 'exit'
  founded: string
  employees: string // range e.g. "10-50"
  revenue: string // range e.g. "$1M-10M ARR"
  fundingRaised?: number
  description: string
  logo?: string
  isActive: boolean
}

export interface ClubEvent {
  id: string
  title: string
  type: 'gathering' | 'summit' | 'workshop' | 'dinner' | 'retreat' | 'demo-day' | 'masterclass'
  description: string
  date: string
  endDate?: string
  location: EventLocation
  format: 'in-person' | 'virtual' | 'hybrid'
  capacity: number
  registeredCount: number
  waitlistCount: number
  tier: 'all-members' | 'premium' | 'invite-only'
  speakers?: Speaker[]
  agenda?: AgendaItem[]
  sponsors?: Sponsor[]
  photos?: string[]
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled'
  registrationDeadline?: string
  price?: number
  currency?: string
}

export interface EventLocation {
  venue: string
  address: string
  city: string
  country: string
  coordinates?: { lat: number; lng: number }
  virtualLink?: string
  timezone: string
}

export interface Speaker {
  id: string
  name: string
  title: string
  company: string
  bio: string
  photo?: string
  topic: string
  linkedinUrl?: string
}

export interface AgendaItem {
  time: string
  duration: number // minutes
  title: string
  description?: string
  speakers?: string[]
  type: 'keynote' | 'panel' | 'workshop' | 'networking' | 'break' | 'social'
}

export interface Sponsor {
  id: string
  name: string
  logo: string
  tier: 'platinum' | 'gold' | 'silver' | 'bronze'
  website?: string
}

export interface EventAttendance {
  eventId: string
  memberId: string
  status: 'registered' | 'attended' | 'no-show' | 'cancelled'
  registeredAt: string
  attendedAt?: string
  feedback?: EventFeedback
}

export interface EventFeedback {
  rating: number // 1-5
  highlights: string
  improvements: string
  wouldRecommend: boolean
  networkingValue: number // 1-5
  contentValue: number // 1-5
}

export interface MembershipApplication {
  id: string
  type: 'founder' | 'investor'
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedinUrl: string
    twitterHandle?: string
  }
  professionalInfo: {
    currentCompany: string
    title: string
    bio: string
    expertise: string[]
    achievements: string
  }
  founderInfo?: {
    ventures: Venture[]
    totalFunding: number
    exits?: Achievement[]
    teamSize: string
  }
  investorInfo?: {
    fundName?: string
    aum?: number
    checkSize: string // range
    stages: string[]
    sectors: string[]
    portfolioHighlights: string
    notableInvestments: Investment[]
  }
  references: Reference[]
  motivation: string
  contribution: string
  status: 'pending' | 'under-review' | 'approved' | 'rejected' | 'waitlisted'
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  notes?: string
}

export interface Reference {
  name: string
  company: string
  title: string
  email: string
  relationship: string
  contacted: boolean
  response?: string
}

export interface ClubBenefit {
  id: string
  title: string
  description: string
  category: 'networking' | 'events' | 'resources' | 'deals' | 'content' | 'perks'
  tier: 'all' | 'premium' | 'exclusive'
  icon?: string
  value?: string // e.g. "$10K+ in perks"
}

export interface DealFlow {
  id: string
  company: string
  industry: string
  stage: string
  askAmount: number
  valuation?: number
  description: string
  deck?: string // URL
  submittedBy: string
  submittedAt: string
  status: 'screening' | 'due-diligence' | 'partner-review' | 'funded' | 'passed'
  interestedInvestors: string[]
  leadInvestor?: string
  visibility: 'all-investors' | 'accredited-only' | 'private'
  metrics?: {
    revenue?: string
    growth?: string
    users?: string
    retention?: string
  }
}

export interface ClubStats {
  totalMembers: number
  totalFounders: number
  totalInvestors: number
  countries: number
  totalFundingDeployed: number
  totalExits: number
  upcomingEvents: number
  activeDeals: number
  successStories: number
  memberGrowth: { month: string; count: number }[]
  topSectors: { sector: string; count: number }[]
  globalReach: { country: string; members: number }[]
}

export interface NetworkConnection {
  id: string
  fromMemberId: string
  toMemberId: string
  status: 'pending' | 'connected' | 'blocked'
  connectedAt?: string
  introducedBy?: string
  context?: string
  tags?: string[]
  lastInteraction?: string
  strength: 'weak' | 'medium' | 'strong'
}

export interface ClubNewsletter {
  id: string
  title: string
  edition: number
  date: string
  sections: NewsletterSection[]
  featuredMembers: string[]
  upcomingEvents: string[]
  dealHighlights: string[]
  sentTo: number
  openRate?: number
  clickRate?: number
}

export interface NewsletterSection {
  title: string
  content: string
  type: 'member-spotlight' | 'deal-flow' | 'event-recap' | 'industry-insights' | 'success-story'
  cta?: {
    text: string
    url: string
  }
}