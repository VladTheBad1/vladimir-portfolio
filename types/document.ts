export interface Document {
  id: string
  title: string
  description?: string
  type: 'contract' | 'financial' | 'legal' | 'strategic' | 'operational' | 'presentation' | 'report'
  category: string
  ventureId?: string
  ventureName?: string
  filePath: string
  fileSize: number
  fileType: string
  version: number
  status: 'draft' | 'review' | 'approved' | 'archived'
  confidentiality: 'public' | 'internal' | 'confidential' | 'restricted'
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
  tags: string[]
  metadata: DocumentMetadata
  versions: DocumentVersion[]
  accessLog: DocumentAccess[]
}

export interface DocumentMetadata {
  author?: string
  reviewer?: string
  approver?: string
  expiryDate?: string
  renewalDate?: string
  jurisdiction?: string
  counterparty?: string
  dealValue?: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  complianceStatus: 'compliant' | 'pending' | 'non-compliant'
  relatedDocuments?: string[]
}

export interface DocumentVersion {
  id: string
  version: number
  filePath: string
  changeDescription: string
  createdBy: string
  createdAt: string
  fileSize: number
  checksum: string
}

export interface DocumentAccess {
  id: string
  userId: string
  userName: string
  action: 'view' | 'download' | 'edit' | 'share' | 'delete'
  timestamp: string
  ipAddress?: string
  device?: string
}

export interface DocumentFolder {
  id: string
  name: string
  path: string
  parentId?: string
  ventureId?: string
  documentCount: number
  totalSize: number
  permissions: FolderPermission[]
  createdAt: string
  updatedAt: string
}

export interface FolderPermission {
  userId: string
  userName: string
  role: string
  permission: 'read' | 'write' | 'admin'
  grantedBy: string
  grantedAt: string
}

export interface DocumentAnalytics {
  totalDocuments: number
  documentsByType: { type: string; count: number }[]
  documentsByVenture: { venture: string; count: number }[]
  storageUsed: number
  storageLimit: number
  recentActivity: DocumentAccess[]
  pendingReviews: Document[]
  expiringDocuments: Document[]
  complianceAlerts: {
    type: 'expiry' | 'compliance' | 'security'
    message: string
    documents: Document[]
  }[]
}

export interface DocumentSearch {
  query: string
  filters: {
    types: string[]
    ventures: string[]
    confidentiality: string[]
    status: string[]
    dateRange: {
      start: string
      end: string
    }
    tags: string[]
  }
  results: Document[]
  totalResults: number
}

export interface AIDocumentInsight {
  id: string
  documentId: string
  type: 'summary' | 'key-terms' | 'risk-analysis' | 'compliance-check' | 'similar-docs'
  title: string
  content: string
  confidence: number
  generatedAt: string
}