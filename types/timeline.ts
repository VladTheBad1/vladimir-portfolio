export interface TimelineEvent {
  id: string
  ventureId: string
  ventureName: string
  title: string
  description: string
  date: string
  type: 'milestone' | 'launch' | 'funding' | 'partnership' | 'product' | 'team' | 'achievement'
  status: 'completed' | 'in-progress' | 'upcoming' | 'delayed'
  impact: 'high' | 'medium' | 'low'
  icon?: string
  metrics?: {
    value: string
    label: string
  }[]
  linkedEvents?: string[] // IDs of related events
}

export interface VentureRoadmap {
  ventureId: string
  ventureName: string
  startDate: string
  events: TimelineEvent[]
  currentPhase: string
  completion: number // 0-100
  nextMilestone: TimelineEvent | null
}

export interface TimelineFilter {
  ventures: string[]
  types: string[]
  statuses: string[]
  dateRange: {
    start: string
    end: string
  }
}

export type TimelineView = 'timeline' | 'calendar' | 'gantt' | 'kanban'