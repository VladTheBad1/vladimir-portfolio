'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Calendar,
  Clock,
  Users,
  Video,
  FileText,
  CheckCircle,
  AlertCircle,
  Plus,
  Sparkles,
  Download,
  Mic,
  Play,
  ChevronRight,
  Target,
  Brain,
  BarChart,
  MessageSquare
} from 'lucide-react'
import { 
  generateMeetingAgenda, 
  generateMeetingSummary, 
  extractActionItems,
  generateMeetingInsights,
  suggestOptimalMeetingTime
} from '@/lib/meeting-ai'
import { Meeting, ActionItem, AgendaItem } from '@/types/meeting'
import { motion } from 'framer-motion'

// Mock data for demo
const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Q1 Board Meeting',
    type: 'board',
    ventureName: 'VCTRONICS CORP',
    date: '2025-01-20',
    time: '10:00',
    duration: 90,
    status: 'scheduled',
    location: 'Conference Room A',
    attendees: [
      { id: '1', name: 'Vladimir Proskurov', email: 'vladimir@corp.com', role: 'CEO', attendance: 'confirmed' },
      { id: '2', name: 'Sarah Chen', email: 'sarah@corp.com', role: 'CFO', attendance: 'confirmed' },
      { id: '3', name: 'Michael Roberts', email: 'michael@corp.com', role: 'Board Member', attendance: 'confirmed' }
    ],
    agenda: [],
    actionItems: [],
    decisions: []
  },
  {
    id: '2',
    title: 'Series A Investor Pitch',
    type: 'investor',
    ventureName: 'VeriVox AI',
    date: '2025-01-22',
    time: '14:00',
    duration: 60,
    status: 'scheduled',
    meetingLink: 'https://zoom.us/meeting/123',
    attendees: [
      { id: '1', name: 'Vladimir Proskurov', email: 'vladimir@corp.com', role: 'CEO', attendance: 'confirmed' },
      { id: '4', name: 'Emma Johnson', email: 'emma@vc.com', role: 'Partner', attendance: 'tentative' }
    ],
    agenda: [],
    actionItems: [],
    decisions: []
  },
  {
    id: '3',
    title: 'Product Sprint Review',
    type: 'team',
    ventureName: 'Perfect Liquid',
    date: '2025-01-18',
    time: '15:00',
    duration: 45,
    status: 'completed',
    attendees: [
      { id: '1', name: 'Vladimir Proskurov', email: 'vladimir@corp.com', role: 'CEO', attendance: 'confirmed' },
      { id: '5', name: 'Dev Team', email: 'dev@corp.com', role: 'Engineering', attendance: 'confirmed' }
    ],
    agenda: [
      { id: '1', title: 'Sprint Demo', duration: 20, order: 1 },
      { id: '2', title: 'Retrospective', duration: 15, order: 2 },
      { id: '3', title: 'Next Sprint Planning', duration: 10, order: 3 }
    ],
    actionItems: [
      { id: '1', title: 'Fix performance issues', assignee: 'Dev Team', dueDate: '2025-01-25', priority: 'high', status: 'in-progress' }
    ],
    decisions: [
      { id: '1', title: 'Delay feature X to next sprint', description: 'Focus on stability improvements', impact: 'medium', stakeholders: ['Product', 'Engineering'], date: '2025-01-18' }
    ],
    notes: 'Sprint went well. Team velocity improving. Need to focus on technical debt next sprint.'
  }
]

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings)
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string>('')
  const [showNewMeeting, setShowNewMeeting] = useState(false)
  const [insights, setInsights] = useState<string[]>([])
  const [suggestedTimes, setSuggestedTimes] = useState<any[]>([])
  
  // New meeting form state
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    type: 'team' as Meeting['type'],
    date: '',
    time: '',
    duration: 60,
    venture: ''
  })

  useEffect(() => {
    // Generate insights on load
    generateMeetingInsights(meetings).then(setInsights)
  }, [meetings])

  const handleGenerateAgenda = async () => {
    if (!selectedMeeting) return
    
    setIsGenerating(true)
    const agenda = await generateMeetingAgenda(
      selectedMeeting.title,
      selectedMeeting.type
    )
    
    setSelectedMeeting({
      ...selectedMeeting,
      agenda
    })
    setIsGenerating(false)
  }

  const handleGenerateSummary = async () => {
    if (!selectedMeeting) return
    
    setIsGenerating(true)
    const summary = await generateMeetingSummary(selectedMeeting)
    setGeneratedContent(summary)
    setIsGenerating(false)
  }

  const handleExtractActionItems = async () => {
    if (!selectedMeeting || !selectedMeeting.notes) return
    
    setIsGenerating(true)
    const actionItems = await extractActionItems(
      selectedMeeting.notes,
      selectedMeeting.attendees.map(a => a.name)
    )
    
    setSelectedMeeting({
      ...selectedMeeting,
      actionItems: [...selectedMeeting.actionItems, ...actionItems]
    })
    setIsGenerating(false)
  }

  const handleSuggestTimes = async () => {
    setIsGenerating(true)
    const suggestions = await suggestOptimalMeetingTime(
      ['CEO', 'Team'],
      newMeeting.duration
    )
    setSuggestedTimes(suggestions)
    setIsGenerating(false)
  }

  const getTypeColor = (type: Meeting['type']) => {
    const colors = {
      board: 'bg-purple-100 text-purple-800',
      investor: 'bg-green-100 text-green-800',
      team: 'bg-blue-100 text-blue-800',
      client: 'bg-yellow-100 text-yellow-800',
      partner: 'bg-pink-100 text-pink-800',
      strategy: 'bg-indigo-100 text-indigo-800',
      standup: 'bg-gray-100 text-gray-800'
    }
    return colors[type]
  }

  const upcomingMeetings = meetings.filter(m => m.status === 'scheduled')
  const todayMeetings = meetings.filter(m => {
    const today = new Date().toISOString().split('T')[0]
    return m.date === today
  })

  return (
    <main className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Meeting Assistant
          </h1>
          <p className="text-lg text-gray-700">
            Smart meeting management with AI-powered agendas, summaries, and action tracking
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Meetings</p>
                  <p className="text-2xl font-bold text-gray-900">{todayMeetings.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingMeetings.length}</p>
                </div>
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Action Items</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {meetings.reduce((sum, m) => sum + m.actionItems.length, 0)}
                  </p>
                </div>
                <Target className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hours Saved</p>
                  <p className="text-2xl font-bold text-gray-900">12.5</p>
                </div>
                <Brain className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        {insights.length > 0 && (
          <Card className="bg-gradient-to-r from-primary-50 to-white border-primary-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary-600" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary-600 mt-0.5" />
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Meeting List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Meetings</h2>
              <Button
                variant="primary"
                onClick={() => setShowNewMeeting(true)}
                className="text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Meeting
              </Button>
            </div>
            
            <div className="space-y-3">
              {meetings.map(meeting => (
                <Card
                  key={meeting.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    selectedMeeting?.id === meeting.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setSelectedMeeting(meeting)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                      <Badge className={getTypeColor(meeting.type)} variant="outline">
                        {meeting.type}
                      </Badge>
                    </div>
                    
                    {meeting.ventureName && (
                      <p className="text-sm text-gray-600 mb-2">{meeting.ventureName}</p>
                    )}
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(meeting.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {meeting.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {meeting.attendees.length}
                      </div>
                    </div>
                    
                    {meeting.status === 'completed' && (
                      <div className="mt-2 flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-600">Completed</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Meeting Details */}
          <div className="lg:col-span-2">
            {selectedMeeting ? (
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedMeeting.title}</CardTitle>
                      <CardDescription>
                        {selectedMeeting.ventureName} • {selectedMeeting.duration} minutes
                      </CardDescription>
                    </div>
                    <Badge className={getTypeColor(selectedMeeting.type)}>
                      {selectedMeeting.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Meeting Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Date & Time</p>
                      <p className="font-medium">
                        {new Date(selectedMeeting.date).toLocaleDateString()} at {selectedMeeting.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">
                        {selectedMeeting.location || selectedMeeting.meetingLink || 'TBD'}
                      </p>
                    </div>
                  </div>

                  {/* Attendees */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Attendees</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMeeting.attendees.map(attendee => (
                        <Badge key={attendee.id} variant="outline">
                          {attendee.name} - {attendee.role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* AI Actions */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">AI Assistant</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        onClick={handleGenerateAgenda}
                        disabled={isGenerating}
                        className="text-sm"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Agenda
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleGenerateSummary}
                        disabled={isGenerating || selectedMeeting.status !== 'completed'}
                        className="text-sm"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Summary
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleExtractActionItems}
                        disabled={isGenerating || !selectedMeeting.notes}
                        className="text-sm"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Extract Actions
                      </Button>
                      <Button
                        variant="outline"
                        disabled
                        className="text-sm"
                      >
                        <Mic className="h-4 w-4 mr-2" />
                        Start Recording
                      </Button>
                    </div>
                  </div>

                  {/* Agenda */}
                  {selectedMeeting.agenda.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Agenda</h3>
                      <div className="space-y-2">
                        {selectedMeeting.agenda.map((item, index) => (
                          <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium text-gray-500 w-6">{index + 1}.</span>
                            <span className="flex-1 text-sm text-gray-900">{item.title}</span>
                            <span className="text-xs text-gray-500">{item.duration} min</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Items */}
                  {selectedMeeting.actionItems.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Action Items</h3>
                      <div className="space-y-2">
                        {selectedMeeting.actionItems.map(item => (
                          <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                            <CheckCircle className={`h-4 w-4 mt-0.5 ${
                              item.status === 'completed' ? 'text-green-600' : 'text-gray-400'
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{item.title}</p>
                              <p className="text-xs text-gray-600">
                                {item.assignee} • Due {new Date(item.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant={
                              item.priority === 'high' ? 'primary' : 
                              item.priority === 'medium' ? 'outline' : 'default'
                            } className="text-xs">
                              {item.priority}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {selectedMeeting.notes && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {selectedMeeting.notes}
                      </p>
                    </div>
                  )}

                  {/* Generated Content */}
                  {generatedContent && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Generated Summary</h3>
                      <div className="bg-gray-50 p-4 rounded">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                          {generatedContent}
                        </pre>
                        <Button variant="outline" className="mt-3 text-sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a meeting to view details
                  </h3>
                  <p className="text-sm text-gray-600">
                    Choose a meeting from the list or create a new one
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* New Meeting Modal */}
        {showNewMeeting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Schedule New Meeting</CardTitle>
                <CardDescription>AI will help you plan the perfect meeting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meeting Title
                  </label>
                  <Input
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                    placeholder="Q2 Planning Session"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newMeeting.type}
                    onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value as Meeting['type']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="team">Team Meeting</option>
                    <option value="board">Board Meeting</option>
                    <option value="investor">Investor Meeting</option>
                    <option value="client">Client Meeting</option>
                    <option value="strategy">Strategy Session</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <Input
                    type="number"
                    value={newMeeting.duration}
                    onChange={(e) => setNewMeeting({...newMeeting, duration: parseInt(e.target.value)})}
                  />
                </div>

                <Button
                  variant="outline"
                  onClick={handleSuggestTimes}
                  disabled={isGenerating}
                  className="w-full"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Suggest Optimal Times
                </Button>

                {suggestedTimes.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Suggested Times:</p>
                    {suggestedTimes.map((suggestion, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                        <div className="flex items-center justify-between">
                          <span>{suggestion.date} at {suggestion.time}</span>
                          <Button variant="outline" size="sm">Select</Button>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{suggestion.reason}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="primary" className="flex-1">
                    Create Meeting
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewMeeting(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}