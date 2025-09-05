/**
 * Dynamic import utilities for code splitting and performance optimization
 * Based on claude-code-workflows performance patterns
 */

import dynamic from 'next/dynamic'
import { ComponentType, ReactNode } from 'react'

/**
 * Loading component shown while dynamic component is loading
 */
const DefaultLoadingComponent = (): ReactNode => (
  <div className="flex items-center justify-center p-8">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-brand-primary)] border-t-transparent" />
  </div>
)

/**
 * Error component shown if dynamic import fails
 */
const DefaultErrorComponent = ({ error }: { error?: Error }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <p className="text-[var(--color-error-main)] mb-2">Failed to load component</p>
    {error && (
      <p className="text-[var(--color-neutral-400)] text-sm">{error.message}</p>
    )}
  </div>
)

/**
 * Options for dynamic imports
 */
export interface DynamicImportOptions {
  loading?: ComponentType
  error?: ComponentType<{ error?: Error }>
  ssr?: boolean
  suspense?: boolean
}

/**
 * Create a dynamically imported component with loading and error states
 */
export function createDynamicComponent<P = {}>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  options: DynamicImportOptions = {}
) {
  const {
    loading = DefaultLoadingComponent,
    error = DefaultErrorComponent,
    ssr = true,
    suspense = false,
  } = options

  return dynamic(importFunc, {
    loading: () => <loading />,
    ssr,
    suspense,
  })
}

/**
 * Preload a dynamic component
 */
export async function preloadComponent(
  importFunc: () => Promise<{ default: ComponentType<any> }>
) {
  try {
    await importFunc()
  } catch (error) {
    console.error('Failed to preload component:', error)
  }
}

/**
 * Lazy load images with intersection observer
 */
export function useLazyLoadImages(
  imageSelector: string = 'img[data-lazy]',
  rootMargin: string = '50px'
) {
  if (typeof window === 'undefined') return

  const images = document.querySelectorAll<HTMLImageElement>(imageSelector)
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const src = img.dataset.src
          
          if (src) {
            img.src = src
            img.removeAttribute('data-src')
            img.removeAttribute('data-lazy')
            imageObserver.unobserve(img)
          }
        }
      })
    }, { rootMargin })

    images.forEach((img) => imageObserver.observe(img))
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach((img) => {
      const src = img.dataset.src
      if (src) {
        img.src = src
      }
    })
  }
}

/**
 * Prefetch components based on user interaction
 */
export function prefetchOnInteraction(
  componentMap: Record<string, () => Promise<{ default: ComponentType<any> }>>,
  triggerElement: HTMLElement | null,
  event: 'mouseenter' | 'focus' = 'mouseenter'
) {
  if (!triggerElement) return

  const handleInteraction = () => {
    Object.values(componentMap).forEach(preloadComponent)
    triggerElement.removeEventListener(event, handleInteraction)
  }

  triggerElement.addEventListener(event, handleInteraction)
}

/**
 * Load component based on viewport visibility
 */
export function loadWhenVisible<P = {}>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  options: DynamicImportOptions & { rootMargin?: string } = {}
) {
  const { rootMargin = '100px', ...dynamicOptions } = options
  
  // Create a wrapper component that uses IntersectionObserver
  const Component = createDynamicComponent(importFunc, dynamicOptions)
  
  return Component
}

/**
 * Priority-based component loading
 */
export enum LoadPriority {
  CRITICAL = 'critical',    // Load immediately
  HIGH = 'high',            // Load after critical
  NORMAL = 'normal',        // Load after high priority
  LOW = 'low',              // Load when idle
  LAZY = 'lazy',            // Load on demand
}

interface PriorityLoadConfig {
  component: () => Promise<{ default: ComponentType<any> }>
  priority: LoadPriority
}

export class PriorityLoader {
  private static queue: Map<LoadPriority, PriorityLoadConfig[]> = new Map()
  private static isProcessing = false
  
  static register(config: PriorityLoadConfig) {
    const priorityQueue = this.queue.get(config.priority) || []
    priorityQueue.push(config)
    this.queue.set(config.priority, priorityQueue)
  }
  
  static async processQueue() {
    if (this.isProcessing) return
    this.isProcessing = true
    
    // Process in priority order
    const priorities = [
      LoadPriority.CRITICAL,
      LoadPriority.HIGH,
      LoadPriority.NORMAL,
      LoadPriority.LOW,
      LoadPriority.LAZY,
    ]
    
    for (const priority of priorities) {
      const configs = this.queue.get(priority) || []
      
      if (priority === LoadPriority.LAZY) {
        // Don't preload lazy components
        continue
      }
      
      if (priority === LoadPriority.LOW) {
        // Load low priority components when idle
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => {
            configs.forEach(config => preloadComponent(config.component))
          })
        } else {
          setTimeout(() => {
            configs.forEach(config => preloadComponent(config.component))
          }, 2000)
        }
      } else {
        // Load other priorities immediately in order
        await Promise.all(
          configs.map(config => preloadComponent(config.component))
        )
      }
      
      // Clear processed queue
      this.queue.delete(priority)
    }
    
    this.isProcessing = false
  }
}

/**
 * Route-based code splitting configuration
 */
export const routeComponents = {
  // Pages that should be dynamically imported
  portfolio: () => import('@/app/portfolio/page'),
  aiLab: () => import('@/app/ai-lab/page'),
  globalIntelligence: () => import('@/app/global-intelligence/page'),
  leadership: () => import('@/app/leadership/page'),
  vision: () => import('@/app/vision/page'),
  investor: () => import('@/app/investor/page'),
}

/**
 * Feature components that should be lazy loaded
 */
export const featureComponents = {
  // Heavy components that should be loaded on demand
  ventureCard: createDynamicComponent(
    () => import('@/components/features/venture-card'),
    { ssr: false }
  ),
  modal: createDynamicComponent(
    () => import('@/components/ui/modal'),
    { ssr: false }
  ),
}

/**
 * Initialize performance optimizations
 */
export function initializePerformanceOptimizations() {
  if (typeof window === 'undefined') return
  
  // Start processing priority queue after initial render
  if (document.readyState === 'complete') {
    PriorityLoader.processQueue()
  } else {
    window.addEventListener('load', () => {
      PriorityLoader.processQueue()
    })
  }
  
  // Lazy load images
  useLazyLoadImages()
  
  // Prefetch routes on link hover
  const links = document.querySelectorAll('a[href^="/"]')
  links.forEach(link => {
    const href = link.getAttribute('href')
    if (href && href in routeComponents) {
      prefetchOnInteraction(
        { [href]: routeComponents[href as keyof typeof routeComponents] },
        link as HTMLElement,
        'mouseenter'
      )
    }
  })
}

export default {
  createDynamicComponent,
  preloadComponent,
  useLazyLoadImages,
  prefetchOnInteraction,
  loadWhenVisible,
  PriorityLoader,
  routeComponents,
  featureComponents,
  initializePerformanceOptimizations,
}