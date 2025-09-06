export interface Meeting {
  id: string
  title: string
  type: 'board' | 'investor' | 'team' | 'client' | 'partner' | 'strategy' | 'standup'
  ventureId?: string
  ventureName?: string
  date: string
  time: string
  duration: number // minutes
  attendees: Attendee[]
  agenda: AgendaItem[]
  notes?: string
  actionItems: ActionItem[]
  decisions: Decision[]
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  location?: string
  meetingLink?: string
  recording?: string
  transcript?: string
  summary?: string
  nextSteps?: string[]
}

export interface Attendee {
  id: string
  name: string
  email: string
  role: string
  attendance: 'required' | 'optional' | 'confirmed' | 'declined' | 'tentative'
  ventureId?: string
}

export interface AgendaItem {
  id: string
  title: string
  description?: string
  duration: number // minutes
  presenter?: string
  materials?: string[]
  order: number
}

export interface ActionItem {
  id: string
  title: string
  description?: string
  assignee: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed' | 'blocked'
  ventureId?: string
}

export interface Decision {
  id: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  stakeholders: string[]
  date: string
}

export interface MeetingTemplate {
  id: string
  name: string
  type: Meeting['type']
  defaultDuration: number
  defaultAgenda: Omit<AgendaItem, 'id'>[]
  suggestedAttendees: string[]
}

export interface MeetingInsight {
  totalMeetings: number
  totalHours: number
  averageDuration: number
  completionRate: number
  actionItemsGenerated: number
  decisionsMade: number
  topAttendees: { name: string; count: number }[]
  meetingsByType: { type: string; count: number }[]
}