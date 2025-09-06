import { BlogPost } from '@/types/blog'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getSortedPostsData(): BlogPost[] {
  // Check if directory exists, if not return empty array
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      // Remove ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)
      const stats = readingTime(matterResult.content)

      // Combine the data with the slug
      return {
        slug,
        content: matterResult.content,
        readingTime: stats.text,
        ...matterResult.data,
      } as BlogPost
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostData(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const stats = readingTime(matterResult.content)

  return {
    slug,
    content: matterResult.content,
    readingTime: stats.text,
    ...matterResult.data,
  } as BlogPost
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.mdx$/, ''),
        },
      }
    })
}