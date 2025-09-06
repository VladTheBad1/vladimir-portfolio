'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Users, 
  Package,
  Rocket,
  Trophy,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid,
  List,
  BarChart3,
  Briefcase
} from 'lucide-react'
import { timelineEvents, ventureRoadmaps, getUpcomingEvents } from '@/data/timeline'
import { TimelineEvent, TimelineView } from '@/types/timeline'
import { motion, AnimatePresence } from 'framer-motion'

export default function TimelinePage() {
  const [selectedView, setSelectedView] = useState<TimelineView>('timeline')
  const [selectedVenture, setSelectedVenture] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const upcomingEvents = getUpcomingEvents(30)

  const getEventIcon = (type: TimelineEvent['type']) => {
    const icons = {
      milestone: Target,
      launch: Rocket,
      funding: TrendingUp,
      partnership: Users,
      product: Package,
      team: Users,
      achievement: Trophy
    }
    const Icon = icons[type]
    return <Icon className="h-4 w-4" />
  }

  const getStatusColor = (status: TimelineEvent['status']) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      upcoming: 'bg-gray-100 text-gray-800 border-gray-200',
      delayed: 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[status]
  }

  const getImpactColor = (impact: TimelineEvent['impact']) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-gray-400'
    }
    return colors[impact]
  }

  const filteredEvents = useMemo(() => {
    let events = [...timelineEvents]
    
    if (selectedVenture !== 'all') {
      events = events.filter(e => e.ventureId === selectedVenture)
    }
    
    if (selectedTypes.length > 0) {
      events = events.filter(e => selectedTypes.includes(e.type))
    }
    
    if (selectedStatuses.length > 0) {
      events = events.filter(e => selectedStatuses.includes(e.status))
    }
    
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [selectedVenture, selectedTypes, selectedStatuses])

  const groupedByMonth = useMemo(() => {
    const grouped: { [key: string]: TimelineEvent[] } = {}
    
    filteredEvents.forEach(event => {
      const date = new Date(event.date)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(event)
    })
    
    return grouped
  }, [filteredEvents])

  const renderTimelineView = () => (
    <div className="space-y-8">
      {Object.entries(groupedByMonth).map(([month, events]) => {
        const [year, monthNum] = month.split('-')
        const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        
        return (
          <div key={month}>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-gray-200" />
              <h3 className="text-sm font-semibold text-gray-700">{monthName}</h3>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            
            <div className="space-y-4">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${getImpactColor(event.impact)}`} />
                      {index < events.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2" />
                      )}
                    </div>
                    
                    <Card className="flex-1 hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-gray-100 rounded">
                              {getEventIcon(event.type)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{event.title}</h4>
                              <p className="text-sm text-gray-600">{event.ventureName}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                        
                        {event.metrics && event.metrics.length > 0 && (
                          <div className="flex gap-4">
                            {event.metrics.map((metric, i) => (
                              <div key={i} className="text-sm">
                                <span className="font-semibold text-gray-900">{metric.value}</span>
                                <span className="text-gray-600 ml-1">{metric.label}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )

  const renderKanbanView = () => {
    const columns = ['upcoming', 'in-progress', 'completed', 'delayed']
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(status => {
          const columnEvents = filteredEvents.filter(e => e.status === status)
          
          return (
            <div key={status} className="space-y-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 capitalize">{status.replace('-', ' ')}</h3>
                <Badge variant="outline">{columnEvents.length}</Badge>
              </div>
              
              <div className="space-y-3">
                {columnEvents.map(event => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="p-1 bg-gray-100 rounded">
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900">{event.title}</h4>
                          <p className="text-xs text-gray-600">{event.ventureName}</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-700 mb-2 line-clamp-2">{event.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant={event.impact === 'high' ? 'primary' : 'outline'} className="text-xs">
                          {event.impact}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderGanttView = () => (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Gantt Header */}
            <div className="flex border-b border-gray-200 pb-2 mb-4">
              <div className="w-48 font-semibold text-sm text-gray-700">Venture</div>
              <div className="flex-1 grid grid-cols-12 gap-2 text-xs text-gray-600">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                  <div key={month} className="text-center">{month}</div>
                ))}
              </div>
            </div>
            
            {/* Gantt Rows */}
            <div className="space-y-3">
              {ventureRoadmaps.map(roadmap => (
                <div key={roadmap.ventureId} className="flex items-center">
                  <div className="w-48">
                    <div className="font-medium text-sm text-gray-900">{roadmap.ventureName}</div>
                    <div className="text-xs text-gray-600">{roadmap.currentPhase}</div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-12 gap-2 relative h-8">
                    {/* Progress Bar */}
                    <div 
                      className="absolute top-2 left-0 h-4 bg-primary-200 rounded"
                      style={{ width: `${(roadmap.completion / 100) * 100}%` }}
                    />
                    
                    {/* Event Markers */}
                    {roadmap.events.map(event => {
                      const eventMonth = new Date(event.date).getMonth()
                      const leftPosition = (eventMonth / 12) * 100
                      
                      return (
                        <div
                          key={event.id}
                          className="absolute top-1 w-6 h-6 bg-white border-2 border-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                          style={{ left: `${leftPosition}%` }}
                          title={event.title}
                        >
                          <div className="w-2 h-2 bg-primary-600 rounded-full" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Venture Timeline
          </h1>
          <p className="text-lg text-gray-700">
            Track milestones, launches, and achievements across all ventures
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming Events</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
                  <p className="text-xs text-gray-500">Next 30 days</p>
                </div>
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Ventures</p>
                  <p className="text-2xl font-bold text-gray-900">{ventureRoadmaps.length}</p>
                  <p className="text-xs text-gray-500">In progress</p>
                </div>
                <Briefcase className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredEvents.filter(e => e.status === 'completed').length}
                  </p>
                  <p className="text-xs text-gray-500">Milestones</p>
                </div>
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">High Impact</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredEvents.filter(e => e.impact === 'high').length}
                  </p>
                  <p className="text-xs text-gray-500">Events</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant={selectedView === 'timeline' ? 'primary' : 'outline'}
              onClick={() => setSelectedView('timeline')}
              className="text-sm"
            >
              <List className="h-4 w-4 mr-2" />
              Timeline
            </Button>
            <Button
              variant={selectedView === 'kanban' ? 'primary' : 'outline'}
              onClick={() => setSelectedView('kanban')}
              className="text-sm"
            >
              <Grid className="h-4 w-4 mr-2" />
              Kanban
            </Button>
            <Button
              variant={selectedView === 'gantt' ? 'primary' : 'outline'}
              onClick={() => setSelectedView('gantt')}
              className="text-sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Gantt
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={selectedVenture}
              onChange={(e) => setSelectedVenture(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Ventures</option>
              {ventureRoadmaps.map(roadmap => (
                <option key={roadmap.ventureId} value={roadmap.ventureId}>
                  {roadmap.ventureName}
                </option>
              ))}
            </select>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="text-sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="bg-white mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <div className="flex flex-wrap gap-2">
                    {['milestone', 'launch', 'funding', 'partnership', 'product', 'achievement'].map(type => (
                      <Badge
                        key={type}
                        variant={selectedTypes.includes(type) ? 'primary' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => {
                          if (selectedTypes.includes(type)) {
                            setSelectedTypes(selectedTypes.filter(t => t !== type))
                          } else {
                            setSelectedTypes([...selectedTypes, type])
                          }
                        }}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {['upcoming', 'in-progress', 'completed', 'delayed'].map(status => (
                      <Badge
                        key={status}
                        variant={selectedStatuses.includes(status) ? 'primary' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => {
                          if (selectedStatuses.includes(status)) {
                            setSelectedStatuses(selectedStatuses.filter(s => s !== status))
                          } else {
                            setSelectedStatuses([...selectedStatuses, status])
                          }
                        }}
                      >
                        {status}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content */}
        <div>
          {selectedView === 'timeline' && renderTimelineView()}
          {selectedView === 'kanban' && renderKanbanView()}
          {selectedView === 'gantt' && renderGanttView()}
        </div>
      </div>
    </main>
  )
}