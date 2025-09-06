'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  UserGroupIcon,
  PhoneIcon,
  MegaphoneIcon,
  DocumentIcon,
  PaperAirplaneIcon,
  MicrophoneIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  PlusIcon,
  FaceSmileIcon,
  PaperClipIcon,
  CheckIcon,
  ExclamationCircleIcon,
  ClockIcon,
  SignalIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import { 
  CommunicationChannel, 
  Message, 
  VideoCall, 
  CommunicationAnalytics, 
  PresenceStatus, 
  TeamDirectory 
} from '@/types/communication'

const mockChannels: CommunicationChannel[] = [
  {
    id: 'channel-1',
    name: 'General',
    type: 'general',
    visibility: 'public',
    members: [
      {
        id: 'member-1',
        userId: 'vladimir',
        name: 'Vladimir Proskurov',
        email: 'vladimir@vctronics.com',
        role: 'owner',
        joinedAt: '2024-01-01T00:00:00Z',
        isOnline: true,
        permissions: {
          canSendMessages: true,
          canEditMessages: true,
          canDeleteMessages: true,
          canManageMembers: true,
          canCreateThreads: true,
          canScheduleMeetings: true,
          canShareFiles: true
        }
      }
    ],
    description: 'General company announcements and discussions',
    createdBy: 'Vladimir Proskurov',
    createdAt: '2024-01-01T00:00:00Z',
    lastActivity: '2024-01-22T15:30:00Z',
    messageCount: 1247,
    unreadCount: 0,
    settings: {
      notifications: 'all',
      allowExternalGuests: false,
      requireApprovalForNewMembers: true,
      allowFileSharing: true,
      allowScreenSharing: true,
      retentionPolicy: 'forever',
      threadingEnabled: true,
      reactionEnabled: true
    },
    integrations: []
  },
  {
    id: 'channel-2',
    name: 'VeriVox AI Team',
    type: 'venture-channel',
    visibility: 'private',
    members: [
      {
        id: 'member-2',
        userId: 'sarah',
        name: 'Sarah Johnson',
        email: 'sarah@verivoxai.com',
        role: 'admin',
        joinedAt: '2024-01-05T00:00:00Z',
        isOnline: false,
        lastSeen: '2024-01-22T17:00:00Z',
        permissions: {
          canSendMessages: true,
          canEditMessages: true,
          canDeleteMessages: false,
          canManageMembers: true,
          canCreateThreads: true,
          canScheduleMeetings: true,
          canShareFiles: true
        }
      }
    ],
    ventureId: 'verivox-ai',
    ventureName: 'VeriVox AI',
    description: 'VeriVox AI team collaboration and updates',
    createdBy: 'Vladimir Proskurov',
    createdAt: '2024-01-05T00:00:00Z',
    lastActivity: '2024-01-22T17:00:00Z',
    messageCount: 892,
    unreadCount: 5,
    settings: {
      notifications: 'mentions',
      allowExternalGuests: true,
      requireApprovalForNewMembers: false,
      allowFileSharing: true,
      allowScreenSharing: true,
      retentionPolicy: '1-year',
      threadingEnabled: true,
      reactionEnabled: true
    },
    integrations: [
      {
        id: 'slack-integration',
        type: 'slack',
        name: 'VeriVox AI Slack',
        enabled: true,
        config: { webhookUrl: 'https://hooks.slack.com/...' },
        direction: 'bidirectional'
      }
    ]
  },
  {
    id: 'channel-3',
    name: 'Executive Team',
    type: 'group',
    visibility: 'restricted',
    members: [
      {
        id: 'member-3',
        userId: 'alex',
        name: 'Alex Chen',
        email: 'alex@vctronics.com',
        role: 'member',
        joinedAt: '2024-01-01T00:00:00Z',
        isOnline: true,
        permissions: {
          canSendMessages: true,
          canEditMessages: true,
          canDeleteMessages: false,
          canManageMembers: false,
          canCreateThreads: true,
          canScheduleMeetings: true,
          canShareFiles: true
        }
      }
    ],
    description: 'Executive leadership discussions and decisions',
    createdBy: 'Vladimir Proskurov',
    createdAt: '2024-01-01T00:00:00Z',
    lastActivity: '2024-01-22T14:20:00Z',
    messageCount: 456,
    unreadCount: 2,
    settings: {
      notifications: 'all',
      allowExternalGuests: false,
      requireApprovalForNewMembers: true,
      allowFileSharing: true,
      allowScreenSharing: true,
      retentionPolicy: 'forever',
      threadingEnabled: false,
      reactionEnabled: false
    },
    integrations: []
  }
]

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    channelId: 'channel-1',
    senderId: 'vladimir',
    senderName: 'Vladimir Proskurov',
    type: 'text',
    content: {
      text: 'Great progress on the Q1 portfolio review! Excited to see the momentum across all ventures. 🚀',
      formatted: 'Great progress on the Q1 portfolio review! Excited to see the momentum across all ventures. 🚀'
    },
    timestamp: '2024-01-22T15:30:00Z',
    reactions: [
      { id: 'react-1', emoji: '🎉', count: 5, users: ['sarah', 'alex', 'maria', 'john', 'lisa'], userReacted: false },
      { id: 'react-2', emoji: '💪', count: 3, users: ['sarah', 'alex', 'maria'], userReacted: false }
    ],
    mentions: [],
    attachments: [],
    status: 'sent',
    isPrivate: false
  },
  {
    id: 'msg-2',
    channelId: 'channel-2',
    senderId: 'sarah',
    senderName: 'Sarah Johnson',
    type: 'file',
    content: {
      text: 'Latest product roadmap for VeriVox AI - please review and provide feedback by EOD',
      formatted: 'Latest product roadmap for VeriVox AI - please review and provide feedback by EOD'
    },
    timestamp: '2024-01-22T17:00:00Z',
    reactions: [],
    mentions: [
      {
        id: 'mention-1',
        type: 'user',
        userId: 'vladimir',
        displayText: '@Vladimir',
        position: { start: 69, end: 78 }
      }
    ],
    attachments: [
      {
        id: 'attach-1',
        name: 'VeriVox-AI-Roadmap-Q1-2024.pdf',
        type: 'document',
        size: 2500000,
        url: '/files/verivox-roadmap.pdf',
        thumbnailUrl: '/files/thumbnails/verivox-roadmap.png',
        mimeType: 'application/pdf',
        uploadedAt: '2024-01-22T17:00:00Z',
        isPublic: false
      }
    ],
    status: 'sent',
    isPrivate: false
  },
  {
    id: 'msg-3',
    channelId: 'channel-3',
    senderId: 'alex',
    senderName: 'Alex Chen',
    type: 'meeting-invite',
    content: {
      text: 'Board meeting scheduled for tomorrow at 2 PM EST. Agenda attached.',
      formatted: 'Board meeting scheduled for tomorrow at 2 PM EST. Agenda attached.'
    },
    timestamp: '2024-01-22T14:20:00Z',
    reactions: [],
    mentions: [],
    attachments: [],
    metadata: {
      priority: 'high'
    },
    status: 'sent',
    isPrivate: false
  }
]

const mockCalls: VideoCall[] = [
  {
    id: 'call-1',
    channelId: 'channel-2',
    title: 'VeriVox AI Sprint Planning',
    type: 'scheduled',
    status: 'scheduled',
    host: {
      id: 'host-1',
      userId: 'vladimir',
      name: 'Vladimir Proskurov',
      email: 'vladimir@vctronics.com',
      role: 'host',
      status: 'joined',
      permissions: {
        canSpeak: true,
        canVideo: true,
        canScreenShare: true,
        canRecord: true,
        canMute: true,
        canKick: true
      }
    },
    participants: [],
    invitees: ['sarah', 'alex', 'maria'],
    startTime: '2024-01-23T15:00:00Z',
    settings: {
      isRecorded: true,
      isTranscribed: true,
      allowScreenShare: true,
      autoAdmit: false,
      waitingRoom: true,
      muteOnEntry: true,
      videoOnEntry: false,
      maxParticipants: 10,
      requirePassword: false
    },
    agenda: [
      'Review sprint goals',
      'Discuss blockers',
      'Plan next iteration',
      'Resource allocation'
    ]
  }
]

const mockAnalytics: CommunicationAnalytics = {
  totalMessages: 15420,
  totalChannels: 24,
  activeUsers: 67,
  avgResponseTime: 15.5,
  peakHours: [
    { hour: 9, messageCount: 1250 },
    { hour: 10, messageCount: 1450 },
    { hour: 14, messageCount: 1380 },
    { hour: 15, messageCount: 1200 }
  ],
  topChannels: [
    { channelId: 'channel-1', channelName: 'General', messageCount: 1247 },
    { channelId: 'channel-2', channelName: 'VeriVox AI Team', messageCount: 892 },
    { channelId: 'channel-3', channelName: 'Executive Team', messageCount: 456 }
  ],
  topUsers: [
    { userId: 'vladimir', userName: 'Vladimir Proskurov', messageCount: 567 },
    { userId: 'sarah', userName: 'Sarah Johnson', messageCount: 423 },
    { userId: 'alex', userName: 'Alex Chen', messageCount: 389 }
  ],
  messageTypes: [
    { type: 'text', count: 12850 },
    { type: 'file', count: 1420 },
    { type: 'image', count: 890 },
    { type: 'meeting-invite', count: 260 }
  ],
  engagementMetrics: {
    messagesPerUser: 230,
    threadsCreated: 145,
    reactionsGiven: 2340,
    filesShared: 1420
  },
  meetingMetrics: {
    totalMeetings: 156,
    totalDuration: 7800, // minutes
    avgMeetingDuration: 50,
    avgParticipants: 5.2,
    recordedMeetings: 98
  }
}

const mockPresenceStatus: PresenceStatus[] = [
  {
    userId: 'vladimir',
    status: 'online',
    customMessage: 'Building the future, one venture at a time',
    lastSeen: '2024-01-22T18:00:00Z',
    isInMeeting: false,
    timezone: 'America/New_York',
    workingHours: {
      start: '08:00',
      end: '18:00',
      timezone: 'America/New_York',
      workdays: [1, 2, 3, 4, 5]
    }
  },
  {
    userId: 'sarah',
    status: 'away',
    customMessage: 'In focused work mode',
    lastSeen: '2024-01-22T17:30:00Z',
    isInMeeting: false,
    timezone: 'America/Los_Angeles'
  },
  {
    userId: 'alex',
    status: 'busy',
    customMessage: 'In meeting until 3 PM',
    lastSeen: '2024-01-22T18:00:00Z',
    isInMeeting: true,
    currentMeetingId: 'call-1',
    timezone: 'America/New_York'
  }
]

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState<'channels' | 'calls' | 'directory' | 'analytics'>('channels')
  const [selectedChannel, setSelectedChannel] = useState<CommunicationChannel | null>(mockChannels[0])
  const [messageText, setMessageText] = useState('')

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return `${Math.round(diffInHours * 60)}m ago`
    } else if (diffInHours < 24) {
      return `${Math.round(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getPresenceColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getPresenceStatus = (userId: string) => {
    return mockPresenceStatus.find(p => p.userId === userId)
  }

  const renderChannelsTab = () => (
    <div className="flex h-[calc(100vh-12rem)]">
      {/* Channels Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Channels</h2>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search channels..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {mockChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel)}
                className={`w-full text-left p-3 rounded-lg transition-colors mb-1 ${
                  selectedChannel?.id === channel.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {channel.type === 'direct' ? (
                      <ChatBubbleLeftRightIcon className="h-4 w-4 text-gray-500" />
                    ) : channel.type === 'venture-channel' ? (
                      <UserGroupIcon className="h-4 w-4 text-purple-500" />
                    ) : (
                      <MegaphoneIcon className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="font-medium text-gray-900">{channel.name}</span>
                  </div>
                  {channel.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[1.25rem] text-center">
                      {channel.unreadCount > 99 ? '99+' : channel.unreadCount}
                    </span>
                  )}
                </div>
                
                <div className="text-xs text-gray-500 truncate">
                  {channel.description || `${channel.members.length} members`}
                </div>
                
                <div className="text-xs text-gray-400 mt-1">
                  {formatTimestamp(channel.lastActivity)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      {selectedChannel ? (
        <div className="flex-1 flex flex-col">
          {/* Channel Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedChannel.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedChannel.members.length} members
                    {selectedChannel.ventureName && ` • ${selectedChannel.ventureName}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <VideoCameraIcon className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <PhoneIcon className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Cog6ToothIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages
              .filter(msg => msg.channelId === selectedChannel.id)
              .map((message) => (
                <div key={message.id} className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {message.senderName.charAt(0)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{message.senderName}</span>
                      <span className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
                      {message.metadata?.priority === 'high' && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                          High Priority
                        </span>
                      )}
                    </div>
                    
                    <div className="text-gray-800">
                      {message.content.text}
                    </div>
                    
                    {message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <DocumentIcon className="h-8 w-8 text-blue-500" />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{attachment.name}</div>
                              <div className="text-sm text-gray-500">
                                {(attachment.size / 1024 / 1024).toFixed(1)} MB • {attachment.mimeType}
                              </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {message.reactions.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        {message.reactions.map((reaction) => (
                          <button
                            key={reaction.id}
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-colors ${
                              reaction.userReacted
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <span>{reaction.emoji}</span>
                            <span>{reaction.count}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <div className="border border-gray-300 rounded-lg p-3">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`Message ${selectedChannel.name}...`}
                    className="w-full resize-none border-none outline-none text-gray-800 placeholder-gray-500"
                    rows={1}
                    style={{ minHeight: '20px', maxHeight: '120px' }}
                  />
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <PaperClipIcon className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <FaceSmileIcon className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MicrophoneIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <button 
                      className={`p-2 rounded-lg transition-colors ${
                        messageText.trim() 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                      disabled={!messageText.trim()}
                    >
                      <PaperAirplaneIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a channel</h3>
            <p className="text-gray-600">Choose a channel to start messaging</p>
          </div>
        </div>
      )}
    </div>
  )

  const renderCallsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Video Calls & Meetings</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <VideoCameraIcon className="h-4 w-4" />
          Start Call
        </button>
      </div>

      {/* Active/Upcoming Calls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCalls.map((call) => (
          <motion.div
            key={call.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{call.title}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(call.startTime).toLocaleString()}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                call.status === 'in-progress' ? 'text-green-700 bg-green-100' :
                call.status === 'scheduled' ? 'text-blue-700 bg-blue-100' :
                'text-gray-700 bg-gray-100'
              }`}>
                {call.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <UserGroupIcon className="h-4 w-4" />
                <span>{call.invitees.length} invitees</span>
              </div>
              
              {call.settings.isRecorded && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Recording enabled</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ClockIcon className="h-4 w-4" />
                <span>Host: {call.host.name}</span>
              </div>
            </div>

            {call.agenda && call.agenda.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Agenda</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {call.agenda.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                  {call.agenda.length > 3 && (
                    <li className="text-gray-400">+{call.agenda.length - 3} more items</li>
                  )}
                </ul>
              </div>
            )}

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Join Call
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <ShareIcon className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call History */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Calls</h3>
        <div className="space-y-3">
          {[
            {
              title: 'Weekly Portfolio Review',
              date: '2024-01-21T10:00:00Z',
              duration: 45,
              participants: 8,
              recorded: true
            },
            {
              title: 'Perfect Liquid Strategy Session',
              date: '2024-01-20T15:30:00Z',
              duration: 62,
              participants: 5,
              recorded: false
            },
            {
              title: 'Executive Team Standup',
              date: '2024-01-19T09:00:00Z',
              duration: 25,
              participants: 6,
              recorded: true
            }
          ].map((call, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <VideoCameraIcon className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{call.title}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(call.date).toLocaleDateString()} • {call.duration}m • {call.participants} participants
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {call.recorded && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Recorded</span>
                )}
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderDirectoryTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Team Directory</h2>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search team members..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Online Members */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Online Now ({mockPresenceStatus.filter(p => p.status === 'online').length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPresenceStatus
            .filter(presence => presence.status === 'online')
            .map((presence) => (
              <div key={presence.userId} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {presence.userId.charAt(0).toUpperCase()}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getPresenceColor(presence.status)}`}></div>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 capitalize">{presence.userId}</div>
                  {presence.customMessage && (
                    <div className="text-sm text-gray-600 truncate">{presence.customMessage}</div>
                  )}
                  {presence.isInMeeting && (
                    <div className="text-xs text-red-600 flex items-center gap-1">
                      <VideoCameraIcon className="h-3 w-3" />
                      In meeting
                    </div>
                  )}
                </div>
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <ChatBubbleLeftRightIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* All Team Members */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Team Members</h3>
        
        <div className="space-y-3">
          {[
            { name: 'Vladimir Proskurov', title: 'CEO & Founder', email: 'vladimir@vctronics.com', venture: 'VCTRONICS CORP', status: 'online' },
            { name: 'Sarah Johnson', title: 'CTO', email: 'sarah@verivoxai.com', venture: 'VeriVox AI', status: 'away' },
            { name: 'Alex Chen', title: 'Head of Product', email: 'alex@perfectliquid.com', venture: 'Perfect Liquid', status: 'busy' },
            { name: 'Maria Rodriguez', title: 'Lead Scientist', email: 'maria@atemabio.com', venture: 'AtemaBio', status: 'offline' },
            { name: 'John Smith', title: 'VP Engineering', email: 'john@geniexlab.com', venture: 'GenieX Lab', status: 'online' }
          ].map((member, index) => (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                    {member.name.split(' ').map(n => n.charAt(0)).join('')}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getPresenceColor(member.status)}`}></div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-600">{member.title}</div>
                  <div className="text-sm text-gray-500">{member.venture}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-right text-sm text-gray-500">
                  <div>{member.email}</div>
                  <div className="capitalize">{member.status}</div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <VideoCameraIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalyticsTab = () => (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Messages</p>
              <p className="text-3xl font-bold text-gray-900">{mockAnalytics.totalMessages.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Channels</p>
              <p className="text-3xl font-bold text-gray-900">{mockAnalytics.totalChannels}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">{mockAnalytics.activeUsers}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <SignalIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-3xl font-bold text-gray-900">{mockAnalytics.avgResponseTime}min</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Message Activity */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Activity Hours</h3>
          <div className="space-y-3">
            {mockAnalytics.peakHours.map((hour) => (
              <div key={hour.hour} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {hour.hour}:00 - {hour.hour + 1}:00
                </span>
                <div className="flex items-center gap-3 flex-1 ml-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(hour.messageCount / 1500) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{hour.messageCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Channels */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Active Channels</h3>
          <div className="space-y-3">
            {mockAnalytics.topChannels.map((channel) => (
              <div key={channel.channelId} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{channel.channelName}</span>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(channel.messageCount / 1500) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{channel.messageCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement & Meeting Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Messages per User</span>
              <span className="font-medium text-gray-900">{mockAnalytics.engagementMetrics.messagesPerUser}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Threads Created</span>
              <span className="font-medium text-gray-900">{mockAnalytics.engagementMetrics.threadsCreated}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Reactions Given</span>
              <span className="font-medium text-gray-900">{mockAnalytics.engagementMetrics.reactionsGiven}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Files Shared</span>
              <span className="font-medium text-gray-900">{mockAnalytics.engagementMetrics.filesShared}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Meeting Analytics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Meetings</span>
              <span className="font-medium text-gray-900">{mockAnalytics.meetingMetrics.totalMeetings}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Duration</span>
              <span className="font-medium text-gray-900">{Math.round(mockAnalytics.meetingMetrics.totalDuration / 60)}h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Avg Meeting Duration</span>
              <span className="font-medium text-gray-900">{mockAnalytics.meetingMetrics.avgMeetingDuration}min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Avg Participants</span>
              <span className="font-medium text-gray-900">{mockAnalytics.meetingMetrics.avgParticipants}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Recording Rate</span>
              <span className="font-medium text-gray-900">
                {Math.round((mockAnalytics.meetingMetrics.recordedMeetings / mockAnalytics.meetingMetrics.totalMeetings) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Communication Hub</h1>
              <p className="text-sm text-gray-600">Unified team messaging, video calls, and collaboration</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <VideoCameraIcon className="h-4 w-4" />
                Quick Call
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <BellIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Cog6ToothIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('channels')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'channels'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Channels ({mockChannels.length})
          </button>
          <button
            onClick={() => setActiveTab('calls')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'calls'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Calls & Meetings
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'directory'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Team Directory
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'channels' && renderChannelsTab()}
          {activeTab === 'calls' && renderCallsTab()}
          {activeTab === 'directory' && renderDirectoryTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
        </AnimatePresence>
      </div>
    </div>
  )
}