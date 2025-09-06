import { TimelineEvent, VentureRoadmap } from '@/types/timeline'

export const timelineEvents: TimelineEvent[] = [
  // VCTRONICS CORP Events
  {
    id: 'vct-1',
    ventureId: '1',
    ventureName: 'VCTRONICS CORP',
    title: 'FDA Breakthrough Designation',
    description: 'Received FDA breakthrough device designation for PEMF cancer therapy',
    date: '2024-12-15',
    type: 'achievement',
    status: 'completed',
    impact: 'high',
    metrics: [
      { value: '6 months', label: 'Faster approval' },
      { value: '$5M', label: 'Grant received' }
    ]
  },
  {
    id: 'vct-2',
    ventureId: '1',
    ventureName: 'VCTRONICS CORP',
    title: 'Phase II Clinical Trial',
    description: 'Launch Phase II clinical trials across 10 hospitals',
    date: '2025-02-01',
    type: 'milestone',
    status: 'upcoming',
    impact: 'high',
    metrics: [
      { value: '500', label: 'Patients' },
      { value: '10', label: 'Hospitals' }
    ]
  },
  {
    id: 'vct-3',
    ventureId: '1',
    ventureName: 'VCTRONICS CORP',
    title: 'Series A Funding',
    description: 'Close $15M Series A round for clinical expansion',
    date: '2025-03-15',
    type: 'funding',
    status: 'upcoming',
    impact: 'high',
    metrics: [
      { value: '$15M', label: 'Target raise' },
      { value: '$75M', label: 'Valuation' }
    ]
  },

  // VeriVox AI Events
  {
    id: 'vv-1',
    ventureId: '2',
    ventureName: 'VeriVox AI',
    title: 'MVP Launch',
    description: 'Launch beta version with 3 law firms',
    date: '2025-01-15',
    type: 'launch',
    status: 'in-progress',
    impact: 'high',
    metrics: [
      { value: '3', label: 'Beta customers' },
      { value: '95%', label: 'Accuracy' }
    ]
  },
  {
    id: 'vv-2',
    ventureId: '2',
    ventureName: 'VeriVox AI',
    title: 'Patent Filing',
    description: 'File patent for AI legal transcription algorithm',
    date: '2025-01-20',
    type: 'achievement',
    status: 'upcoming',
    impact: 'medium',
    metrics: [
      { value: '3', label: 'Patents' }
    ]
  },
  {
    id: 'vv-3',
    ventureId: '2',
    ventureName: 'VeriVox AI',
    title: 'Enterprise Partnership',
    description: 'Sign partnership with major legal software provider',
    date: '2025-04-01',
    type: 'partnership',
    status: 'upcoming',
    impact: 'high',
    metrics: [
      { value: '10K', label: 'Potential users' },
      { value: '$2M', label: 'ARR potential' }
    ]
  },

  // Perfect Liquid Events
  {
    id: 'pl-1',
    ventureId: '3',
    ventureName: 'Perfect Liquid',
    title: 'Manufacturing Scale-up',
    description: 'Open second production facility in Asia',
    date: '2024-11-01',
    type: 'milestone',
    status: 'completed',
    impact: 'high',
    metrics: [
      { value: '10x', label: 'Capacity increase' },
      { value: '50%', label: 'Cost reduction' }
    ]
  },
  {
    id: 'pl-2',
    ventureId: '3',
    ventureName: 'Perfect Liquid',
    title: 'Automotive Contract',
    description: 'Sign multi-year contract with major auto manufacturer',
    date: '2025-01-28',
    type: 'partnership',
    status: 'in-progress',
    impact: 'high',
    metrics: [
      { value: '$25M', label: 'Contract value' },
      { value: '3 years', label: 'Duration' }
    ]
  },
  {
    id: 'pl-3',
    ventureId: '3',
    ventureName: 'Perfect Liquid',
    title: 'New Product Line',
    description: 'Launch consumer-grade nano coatings',
    date: '2025-05-01',
    type: 'product',
    status: 'upcoming',
    impact: 'medium',
    metrics: [
      { value: '5', label: 'Products' },
      { value: '$10M', label: 'Revenue target' }
    ]
  },

  // Domain Analyser Events
  {
    id: 'da-1',
    ventureId: '7',
    ventureName: 'Domain Analyser',
    title: 'AI Model v2.0',
    description: 'Deploy advanced valuation algorithm with 98% accuracy',
    date: '2025-01-10',
    type: 'product',
    status: 'in-progress',
    impact: 'high',
    metrics: [
      { value: '98%', label: 'Accuracy' },
      { value: '0.5s', label: 'Analysis time' }
    ]
  },
  {
    id: 'da-2',
    ventureId: '7',
    ventureName: 'Domain Analyser',
    title: 'Premium Domain Acquisition',
    description: 'Acquire portfolio of 20 premium domains',
    date: '2025-02-15',
    type: 'achievement',
    status: 'upcoming',
    impact: 'medium',
    metrics: [
      { value: '20', label: 'Domains' },
      { value: '$500K', label: 'Investment' }
    ]
  },

  // MPI Suppliers Group Events
  {
    id: 'mpi-1',
    ventureId: '9',
    ventureName: 'MPI Suppliers Group',
    title: 'East Africa Expansion',
    description: 'Establish operations in Kenya and Tanzania',
    date: '2025-03-01',
    type: 'milestone',
    status: 'upcoming',
    impact: 'high',
    metrics: [
      { value: '2', label: 'New countries' },
      { value: '$5M', label: 'Contract pipeline' }
    ]
  },
  {
    id: 'mpi-2',
    ventureId: '9',
    ventureName: 'MPI Suppliers Group',
    title: 'Government Contract',
    description: 'Secure military supply contract with Nigeria',
    date: '2025-01-25',
    type: 'partnership',
    status: 'in-progress',
    impact: 'high',
    metrics: [
      { value: '$8M', label: 'Contract value' },
      { value: '2 years', label: 'Duration' }
    ]
  }
]

export const ventureRoadmaps: VentureRoadmap[] = [
  {
    ventureId: '1',
    ventureName: 'VCTRONICS CORP',
    startDate: '2020-01-01',
    events: timelineEvents.filter(e => e.ventureId === '1'),
    currentPhase: 'Clinical Trials',
    completion: 65,
    nextMilestone: timelineEvents.find(e => e.id === 'vct-2') || null
  },
  {
    ventureId: '2',
    ventureName: 'VeriVox AI',
    startDate: '2023-06-01',
    events: timelineEvents.filter(e => e.ventureId === '2'),
    currentPhase: 'MVP Development',
    completion: 40,
    nextMilestone: timelineEvents.find(e => e.id === 'vv-1') || null
  },
  {
    ventureId: '3',
    ventureName: 'Perfect Liquid',
    startDate: '2021-03-01',
    events: timelineEvents.filter(e => e.ventureId === '3'),
    currentPhase: 'Growth',
    completion: 75,
    nextMilestone: timelineEvents.find(e => e.id === 'pl-2') || null
  },
  {
    ventureId: '7',
    ventureName: 'Domain Analyser',
    startDate: '2021-09-01',
    events: timelineEvents.filter(e => e.ventureId === '7'),
    currentPhase: 'Product Enhancement',
    completion: 60,
    nextMilestone: timelineEvents.find(e => e.id === 'da-1') || null
  },
  {
    ventureId: '9',
    ventureName: 'MPI Suppliers Group',
    startDate: '2018-01-01',
    events: timelineEvents.filter(e => e.ventureId === '9'),
    currentPhase: 'Expansion',
    completion: 80,
    nextMilestone: timelineEvents.find(e => e.id === 'mpi-2') || null
  }
]

export function getUpcomingEvents(days: number = 30): TimelineEvent[] {
  const today = new Date()
  const futureDate = new Date()
  futureDate.setDate(today.getDate() + days)
  
  return timelineEvents.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate >= today && eventDate <= futureDate
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getEventsByVenture(ventureId: string): TimelineEvent[] {
  return timelineEvents.filter(event => event.ventureId === ventureId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getEventsByStatus(status: string): TimelineEvent[] {
  return timelineEvents.filter(event => event.status === status)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}