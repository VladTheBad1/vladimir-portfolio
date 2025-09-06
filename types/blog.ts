export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  authorRole: string
  authorImage?: string
  date: string
  readingTime: string
  category: string
  tags: string[]
  image?: string
  featured: boolean
}

export interface BlogCategory {
  name: string
  slug: string
  description: string
  count: number
}

export type BlogSortOption = 'latest' | 'oldest' | 'popular' | 'featured'