import { Meeting, AgendaItem, ActionItem, Decision } from '@/types/meeting'

// AI-powered meeting functions
export async function generateMeetingAgenda(
  title: string,
  type: Meeting['type'],
  context?: string
): Promise<AgendaItem[]> {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 1000))

  const agendaTemplates: Record<Meeting['type'], Omit<AgendaItem, 'id'>[]> = {
    board: [
      { title: 'Opening & Attendance', duration: 5, order: 1 },
      { title: 'Review Previous Minutes', duration: 5, order: 2 },
      { title: 'CEO Report', duration: 15, order: 3 },
      { title: 'Financial Review', duration: 20, order: 4 },
      { title: 'Strategic Initiatives', duration: 20, order: 5 },
      { title: 'Risk & Compliance', duration: 10, order: 6 },
      { title: 'New Business', duration: 10, order: 7 },
      { title: 'Executive Session', duration: 15, order: 8 },
      { title: 'Action Items & Next Steps', duration: 5, order: 9 }
    ],
    investor: [
      { title: 'Company Overview', duration: 10, order: 1 },
      { title: 'Market Opportunity', duration: 10, order: 2 },
      { title: 'Product Demo', duration: 15, order: 3 },
      { title: 'Business Model', duration: 10, order: 4 },
      { title: 'Financial Projections', duration: 15, order: 5 },
      { title: 'Team Introduction', duration: 10, order: 6 },
      { title: 'Funding Ask & Use of Funds', duration: 10, order: 7 },
      { title: 'Q&A', duration: 20, order: 8 }
    ],
    team: [
      { title: 'Team Check-in', duration: 10, order: 1 },
      { title: 'Sprint Review', duration: 15, order: 2 },
      { title: 'Blockers & Issues', duration: 15, order: 3 },
      { title: 'Upcoming Priorities', duration: 10, order: 4 },
      { title: 'Action Items', duration: 5, order: 5 }
    ],
    client: [
      { title: 'Project Status Update', duration: 10, order: 1 },
      { title: 'Deliverables Review', duration: 20, order: 2 },
      { title: 'Feedback & Adjustments', duration: 15, order: 3 },
      { title: 'Next Phase Planning', duration: 10, order: 4 },
      { title: 'Budget & Timeline', duration: 10, order: 5 }
    ],
    partner: [
      { title: 'Partnership Overview', duration: 10, order: 1 },
      { title: 'Integration Points', duration: 15, order: 2 },
      { title: 'Revenue Sharing Model', duration: 15, order: 3 },
      { title: 'Marketing & Go-to-Market', duration: 15, order: 4 },
      { title: 'Legal & Compliance', duration: 10, order: 5 },
      { title: 'Next Steps', duration: 5, order: 6 }
    ],
    strategy: [
      { title: 'Market Analysis', duration: 15, order: 1 },
      { title: 'Competitive Landscape', duration: 15, order: 2 },
      { title: 'Strategic Options', duration: 20, order: 3 },
      { title: 'Resource Allocation', duration: 15, order: 4 },
      { title: 'Risk Assessment', duration: 10, order: 5 },
      { title: 'Decision Framework', duration: 15, order: 6 },
      { title: 'Implementation Plan', duration: 10, order: 7 }
    ],
    standup: [
      { title: 'Yesterday\'s Progress', duration: 5, order: 1 },
      { title: 'Today\'s Focus', duration: 5, order: 2 },
      { title: 'Blockers', duration: 5, order: 3 }
    ]
  }

  const template = agendaTemplates[type] || agendaTemplates.team
  
  return template.map((item, index) => ({
    id: `agenda-${index + 1}`,
    ...item
  }))
}

export async function generateMeetingSummary(
  meeting: Meeting,
  transcript?: string
): Promise<string> {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 1500))

  const attendeeNames = meeting.attendees
    .filter(a => a.attendance === 'confirmed')
    .map(a => a.name)
    .join(', ')

  const keyDecisions = meeting.decisions
    .map(d => `• ${d.title}: ${d.description}`)
    .join('\n')

  const actionItems = meeting.actionItems
    .map(a => `• ${a.title} (${a.assignee}) - Due: ${new Date(a.dueDate).toLocaleDateString()}`)
    .join('\n')

  return `
## Meeting Summary: ${meeting.title}
**Date:** ${new Date(meeting.date).toLocaleDateString()}
**Duration:** ${meeting.duration} minutes
**Attendees:** ${attendeeNames}

### Key Discussion Points
${meeting.agenda.map(item => `• ${item.title}`).join('\n')}

### Decisions Made
${keyDecisions || 'No formal decisions recorded'}

### Action Items
${actionItems || 'No action items assigned'}

### Next Steps
${meeting.nextSteps?.join('\n') || 'To be determined'}

---
*This summary was generated automatically based on meeting notes and discussion points.*
  `.trim()
}

export async function extractActionItems(
  notes: string,
  attendees: string[]
): Promise<ActionItem[]> {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simulate extracting action items from notes
  const actionPhrases = [
    'will follow up on',
    'needs to complete',
    'responsible for',
    'action:',
    'todo:',
    'next step:',
    'will handle',
    'assigned to'
  ]

  const mockActionItems: ActionItem[] = [
    {
      id: 'ai-1',
      title: 'Review and approve Q1 budget projections',
      description: 'Analyze departmental budgets and provide feedback',
      assignee: attendees[0] || 'CEO',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high',
      status: 'pending'
    },
    {
      id: 'ai-2',
      title: 'Schedule follow-up with potential investors',
      description: 'Coordinate calendars and send meeting invites',
      assignee: attendees[1] || 'COO',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium',
      status: 'pending'
    },
    {
      id: 'ai-3',
      title: 'Prepare market analysis report',
      description: 'Compile competitive landscape and market trends',
      assignee: attendees[2] || 'CMO',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium',
      status: 'pending'
    }
  ]

  return mockActionItems
}

export async function generateMeetingInsights(
  meetings: Meeting[]
): Promise<string[]> {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 800))

  const insights: string[] = []

  // Calculate meeting statistics
  const totalHours = meetings.reduce((sum, m) => sum + m.duration, 0) / 60
  const avgDuration = totalHours / meetings.length * 60
  
  // Meeting frequency insights
  if (meetings.length > 20) {
    insights.push(`You're averaging ${(meetings.length / 30).toFixed(1)} meetings per day. Consider consolidating or delegating some meetings.`)
  }

  // Duration insights
  if (avgDuration > 60) {
    insights.push(`Average meeting duration is ${avgDuration.toFixed(0)} minutes. Try to keep meetings under 45 minutes for better focus.`)
  }

  // Action item insights
  const totalActionItems = meetings.reduce((sum, m) => sum + m.actionItems.length, 0)
  const completedActionItems = meetings.reduce(
    (sum, m) => sum + m.actionItems.filter(a => a.status === 'completed').length,
    0
  )
  const completionRate = (completedActionItems / totalActionItems) * 100

  if (completionRate < 70) {
    insights.push(`Action item completion rate is ${completionRate.toFixed(0)}%. Focus on closing out existing items before adding new ones.`)
  }

  // Meeting type balance
  const meetingTypes = meetings.reduce((acc, m) => {
    acc[m.type] = (acc[m.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const mostFrequentType = Object.entries(meetingTypes)
    .sort(([, a], [, b]) => b - a)[0]

  insights.push(`Most frequent meeting type: ${mostFrequentType[0]} (${mostFrequentType[1]} meetings). Ensure balanced time across all areas.`)

  // Time of day insights
  const morningMeetings = meetings.filter(m => {
    const hour = parseInt(m.time.split(':')[0])
    return hour < 12
  }).length

  if (morningMeetings / meetings.length > 0.8) {
    insights.push('80% of meetings are in the morning. Consider spreading them throughout the day for better energy management.')
  }

  return insights
}

export async function suggestOptimalMeetingTime(
  attendees: string[],
  duration: number,
  preferredDays?: string[]
): Promise<{ date: string; time: string; reason: string }[]> {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 500))

  const suggestions = [
    {
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '10:00',
      reason: 'All attendees available, high energy morning slot'
    },
    {
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '14:00',
      reason: 'Post-lunch slot with good availability'
    },
    {
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '09:00',
      reason: 'Early morning before other commitments'
    }
  ]

  return suggestions
}