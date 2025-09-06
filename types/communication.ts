export interface CommunicationChannel {
  id: string
  name: string
  type: 'direct' | 'group' | 'venture-channel' | 'announcement' | 'general'
  visibility: 'public' | 'private' | 'restricted'
  members: ChannelMember[]
  ventureId?: string
  ventureName?: string
  description?: string
  createdBy: string
  createdAt: string
  lastActivity: string
  messageCount: number
  unreadCount: number
  settings: ChannelSettings
  integrations: ChannelIntegration[]
}

export interface ChannelMember {
  id: string
  userId: string
  name: string
  email: string
  avatar?: string
  role: 'owner' | 'admin' | 'member' | 'guest'
  joinedAt: string
  lastSeen?: string
  isOnline: boolean
  permissions: MemberPermissions
}

export interface MemberPermissions {
  canSendMessages: boolean
  canEditMessages: boolean
  canDeleteMessages: boolean
  canManageMembers: boolean
  canCreateThreads: boolean
  canScheduleMeetings: boolean
  canShareFiles: boolean
}

export interface ChannelSettings {
  notifications: 'all' | 'mentions' | 'none'
  allowExternalGuests: boolean
  autoArchiveAfterDays?: number
  requireApprovalForNewMembers: boolean
  allowFileSharing: boolean
  allowScreenSharing: boolean
  retentionPolicy: 'forever' | '1-year' | '6-months' | '3-months' | '1-month'
  threadingEnabled: boolean
  reactionEnabled: boolean
}

export interface ChannelIntegration {
  id: string
  type: 'slack' | 'teams' | 'discord' | 'email' | 'webhook' | 'zapier'
  name: string
  enabled: boolean
  config: Record<string, any>
  lastSync?: string
  direction: 'inbound' | 'outbound' | 'bidirectional'
}

export interface Message {
  id: string
  channelId: string
  threadId?: string
  senderId: string
  senderName: string
  senderAvatar?: string
  type: 'text' | 'file' | 'image' | 'video' | 'audio' | 'system' | 'meeting-invite' | 'document-share'
  content: MessageContent
  timestamp: string
  edited?: boolean
  editedAt?: string
  reactions: MessageReaction[]
  mentions: MessageMention[]
  attachments: MessageAttachment[]
  metadata?: MessageMetadata
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'
  replyTo?: string
  isPrivate: boolean
}

export interface MessageContent {
  text?: string
  formatted?: string // HTML/markdown formatted text
  blocks?: MessageBlock[] // Rich content blocks
}

export interface MessageBlock {
  type: 'text' | 'image' | 'file' | 'code' | 'quote' | 'list' | 'table' | 'embed'
  content: any
  style?: Record<string, any>
}

export interface MessageReaction {
  id: string
  emoji: string
  count: number
  users: string[]
  userReacted: boolean
}

export interface MessageMention {
  id: string
  type: 'user' | 'channel' | 'everyone' | 'here'
  userId?: string
  channelId?: string
  displayText: string
  position: { start: number; end: number }
}

export interface MessageAttachment {
  id: string
  name: string
  type: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other'
  size: number
  url: string
  thumbnailUrl?: string
  mimeType: string
  uploadedAt: string
  isPublic: boolean
}

export interface MessageMetadata {
  source?: string // integration source
  originalId?: string // original message ID from source
  isForwarded?: boolean
  forwardedFrom?: string
  isScheduled?: boolean
  scheduledFor?: string
  priority?: 'low' | 'normal' | 'high' | 'urgent'
  tags?: string[]
}

export interface Thread {
  id: string
  channelId: string
  rootMessageId: string
  title?: string
  participants: string[]
  messageCount: number
  lastActivity: string
  isResolved: boolean
  resolvedBy?: string
  resolvedAt?: string
  createdAt: string
}

export interface VideoCall {
  id: string
  channelId?: string
  title: string
  type: 'instant' | 'scheduled' | 'recurring'
  status: 'scheduled' | 'starting' | 'in-progress' | 'ended' | 'cancelled'
  host: CallParticipant
  participants: CallParticipant[]
  invitees: string[]
  startTime: string
  endTime?: string
  duration?: number // seconds
  meetingUrl?: string
  recordingUrl?: string
  settings: CallSettings
  agenda?: string[]
  notes?: string
  transcription?: CallTranscript[]
}

export interface CallParticipant {
  id: string
  userId: string
  name: string
  email: string
  avatar?: string
  role: 'host' | 'co-host' | 'participant' | 'observer'
  status: 'invited' | 'joined' | 'left' | 'declined'
  joinedAt?: string
  leftAt?: string
  permissions: CallPermissions
}

export interface CallPermissions {
  canSpeak: boolean
  canVideo: boolean
  canScreenShare: boolean
  canRecord: boolean
  canMute: boolean
  canKick: boolean
}

export interface CallSettings {
  isRecorded: boolean
  isTranscribed: boolean
  allowScreenShare: boolean
  autoAdmit: boolean
  waitingRoom: boolean
  muteOnEntry: boolean
  videoOnEntry: boolean
  maxParticipants?: number
  requirePassword: boolean
  password?: string
}

export interface CallTranscript {
  id: string
  speakerId: string
  speakerName: string
  text: string
  timestamp: string
  confidence: number
}

export interface NotificationSettings {
  userId: string
  emailNotifications: {
    directMessages: boolean
    mentions: boolean
    channelMessages: boolean
    meetingInvites: boolean
    summaryDigest: boolean
    digestFrequency: 'immediate' | 'hourly' | 'daily' | 'weekly'
  }
  pushNotifications: {
    directMessages: boolean
    mentions: boolean
    channelMessages: boolean
    meetingInvites: boolean
    whenOnline: boolean
    whenAway: boolean
    whenOffline: boolean
  }
  inAppNotifications: {
    sound: boolean
    desktop: boolean
    badgeCount: boolean
  }
  doNotDisturb: {
    enabled: boolean
    startTime?: string
    endTime?: string
    days?: number[] // 0-6, Sunday-Saturday
    allowUrgent: boolean
    allowDirectMessages: boolean
  }
}

export interface CommunicationAnalytics {
  totalMessages: number
  totalChannels: number
  activeUsers: number
  avgResponseTime: number // minutes
  peakHours: { hour: number; messageCount: number }[]
  topChannels: { channelId: string; channelName: string; messageCount: number }[]
  topUsers: { userId: string; userName: string; messageCount: number }[]
  messageTypes: { type: string; count: number }[]
  engagementMetrics: {
    messagesPerUser: number
    threadsCreated: number
    reactionsGiven: number
    filesShared: number
  }
  meetingMetrics: {
    totalMeetings: number
    totalDuration: number // minutes
    avgMeetingDuration: number
    avgParticipants: number
    recordedMeetings: number
  }
}

export interface PresenceStatus {
  userId: string
  status: 'online' | 'away' | 'busy' | 'offline'
  customMessage?: string
  lastSeen: string
  isInMeeting: boolean
  currentMeetingId?: string
  timezone: string
  workingHours?: {
    start: string
    end: string
    timezone: string
    workdays: number[]
  }
}

export interface CommunicationWorkflow {
  id: string
  name: string
  description: string
  trigger: WorkflowTrigger
  conditions: WorkflowCondition[]
  actions: WorkflowAction[]
  isActive: boolean
  createdBy: string
  createdAt: string
  lastRun?: string
  runCount: number
}

export interface WorkflowTrigger {
  type: 'message-sent' | 'mention' | 'keyword' | 'schedule' | 'user-join' | 'meeting-start' | 'file-upload'
  config: Record<string, any>
}

export interface WorkflowCondition {
  type: 'channel' | 'user' | 'message-content' | 'time' | 'user-role'
  operator: 'equals' | 'contains' | 'starts-with' | 'ends-with' | 'regex'
  value: any
}

export interface WorkflowAction {
  type: 'send-message' | 'create-channel' | 'add-user' | 'remove-user' | 'send-email' | 'create-task' | 'webhook'
  config: Record<string, any>
  delay?: number // seconds
}

export interface CommunicationSearch {
  query: string
  filters: SearchFilters
  results: SearchResult[]
  totalResults: number
  searchTime: number // milliseconds
}

export interface SearchFilters {
  channels?: string[]
  users?: string[]
  dateRange?: {
    start: string
    end: string
  }
  messageTypes?: string[]
  hasAttachments?: boolean
  hasReactions?: boolean
  isThread?: boolean
}

export interface SearchResult {
  type: 'message' | 'file' | 'channel' | 'user'
  id: string
  title: string
  content: string
  context: string
  channelId: string
  channelName: string
  timestamp: string
  relevanceScore: number
  snippet: string
  highlights: { field: string; matches: string[] }[]
}

export interface TeamDirectory {
  users: TeamUser[]
  departments: Department[]
  organizationChart: OrgChartNode[]
}

export interface TeamUser {
  id: string
  name: string
  email: string
  title: string
  department: string
  ventureId?: string
  ventureName?: string
  avatar?: string
  bio?: string
  skills: string[]
  timezone: string
  phoneNumber?: string
  linkedinUrl?: string
  startDate: string
  reportingTo?: string
  directReports: string[]
  status: PresenceStatus
  preferences: UserCommunicationPreferences
}

export interface Department {
  id: string
  name: string
  description?: string
  head: string
  members: string[]
  ventureId?: string
  channels: string[]
}

export interface OrgChartNode {
  id: string
  userId: string
  parentId?: string
  children: string[]
  level: number
}

export interface UserCommunicationPreferences {
  preferredChannels: string[]
  workingHours: {
    start: string
    end: string
    timezone: string
    workdays: number[]
  }
  responseTimeExpectation: string
  communicationStyle: 'formal' | 'casual' | 'direct' | 'collaborative'
  meetingPreferences: {
    preferredDuration: number
    bufferTime: number
    backToBackLimit: number
    preferredTimes: string[]
  }
}