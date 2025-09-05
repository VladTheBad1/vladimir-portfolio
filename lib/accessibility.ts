/**
 * Accessibility utilities for WCAG compliance
 * Based on claude-code-workflows patterns
 */

import { KeyboardEvent } from 'react'

/**
 * Screen reader only styles
 * Use this to hide content visually but keep it accessible to screen readers
 */
export const srOnly = 
  "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"

/**
 * Focus trap hook for modal/dialog components
 */
export const useFocusTrap = (isOpen: boolean, containerRef: React.RefObject<HTMLElement>) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen || !containerRef.current) return

    if (e.key === 'Tab') {
      const focusableElements = containerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    if (e.key === 'Escape') {
      // Close modal/dialog
      return false
    }
  }

  return { handleKeyDown }
}

/**
 * Announce message to screen readers
 */
export const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.setAttribute('class', srOnly)
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Generate unique IDs for form elements
 */
export const useId = (prefix: string = 'id') => {
  const id = Math.random().toString(36).substring(2, 9)
  return `${prefix}-${id}`
}

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get contrast ratio between two colors
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  // Convert hex to RGB
  const getRGB = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  // Calculate relative luminance
  const getLuminance = (rgb: { r: number, g: number, b: number }) => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
      val = val / 255
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  const rgb1 = getRGB(color1)
  const rgb2 = getRGB(color2)
  
  if (!rgb1 || !rgb2) return 0

  const lum1 = getLuminance(rgb1)
  const lum2 = getLuminance(rgb2)
  
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  
  return (brightest + 0.05) / (darkest + 0.05)
}

/**
 * Check if contrast meets WCAG requirements
 */
export const meetsWCAGContrast = (
  ratio: number,
  level: 'AA' | 'AAA' = 'AA',
  largeText: boolean = false
): boolean => {
  if (level === 'AA') {
    return largeText ? ratio >= 3 : ratio >= 4.5
  } else {
    return largeText ? ratio >= 4.5 : ratio >= 7
  }
}

/**
 * Keyboard navigation helpers
 */
export const handleArrowNavigation = (
  e: KeyboardEvent,
  currentIndex: number,
  totalItems: number,
  onNavigate: (index: number) => void
) => {
  let nextIndex = currentIndex

  switch (e.key) {
    case 'ArrowUp':
    case 'ArrowLeft':
      e.preventDefault()
      nextIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - 1
      break
    case 'ArrowDown':
    case 'ArrowRight':
      e.preventDefault()
      nextIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : 0
      break
    case 'Home':
      e.preventDefault()
      nextIndex = 0
      break
    case 'End':
      e.preventDefault()
      nextIndex = totalItems - 1
      break
  }

  if (nextIndex !== currentIndex) {
    onNavigate(nextIndex)
  }
}

/**
 * Skip to main content link helper
 */
export const SkipToMainContent = () => {
  return `
    <a 
      href="#main-content"
      className="absolute left-0 top-0 z-[var(--z-top)] bg-[var(--color-brand-primary)] text-[var(--color-neutral-950)] px-4 py-2 transform -translate-y-full focus:translate-y-0 transition-transform duration-200"
    >
      Skip to main content
    </a>
  `
}

/**
 * ARIA labels for common UI elements
 */
export const ariaLabels = {
  // Navigation
  mainNavigation: 'Main navigation',
  breadcrumbs: 'Breadcrumb navigation',
  pagination: 'Pagination navigation',
  
  // Actions
  close: 'Close',
  minimize: 'Minimize',
  maximize: 'Maximize',
  search: 'Search',
  menu: 'Menu',
  settings: 'Settings',
  
  // Status
  loading: 'Loading',
  error: 'Error',
  success: 'Success',
  warning: 'Warning',
  info: 'Information',
  
  // Form
  required: 'Required field',
  optional: 'Optional field',
  helpText: 'Help text',
  errorMessage: 'Error message',
  
  // Social
  share: 'Share',
  like: 'Like',
  comment: 'Comment',
  follow: 'Follow',
}

/**
 * Focus visible styles for consistency
 */
export const focusRing = {
  default: 'focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-neutral-950)]',
  inset: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-brand-primary)]',
  none: 'focus-visible:outline-none',
}

/**
 * Semantic HTML helpers
 */
export const semanticTags = {
  navigation: 'nav',
  header: 'header',
  main: 'main',
  footer: 'footer',
  article: 'article',
  section: 'section',
  aside: 'aside',
  form: 'form',
  search: 'search',
}

/**
 * WCAG compliant color combinations
 */
export const accessibleColors = {
  // High contrast combinations (7:1 or higher)
  highContrast: {
    dark: {
      background: 'var(--color-neutral-950)',
      text: 'var(--color-neutral-100)',
      link: 'var(--color-brand-accent)',
    },
    light: {
      background: 'var(--color-neutral-0)',
      text: 'var(--color-neutral-950)',
      link: 'var(--color-brand-primary)',
    }
  },
  
  // Medium contrast combinations (4.5:1 or higher)
  mediumContrast: {
    dark: {
      background: 'var(--color-neutral-900)',
      text: 'var(--color-neutral-200)',
      link: 'var(--color-brand-secondary)',
    },
    light: {
      background: 'var(--color-neutral-50)',
      text: 'var(--color-neutral-800)',
      link: 'var(--color-brand-dark)',
    }
  }
}

/**
 * Role attributes for complex components
 */
export const roles = {
  // Landmarks
  banner: 'banner',
  navigation: 'navigation',
  main: 'main',
  complementary: 'complementary',
  contentinfo: 'contentinfo',
  search: 'search',
  
  // Structure
  article: 'article',
  region: 'region',
  group: 'group',
  
  // Interactive
  button: 'button',
  link: 'link',
  tab: 'tab',
  tablist: 'tablist',
  tabpanel: 'tabpanel',
  
  // Forms
  form: 'form',
  textbox: 'textbox',
  searchbox: 'searchbox',
  combobox: 'combobox',
  
  // Feedback
  alert: 'alert',
  alertdialog: 'alertdialog',
  status: 'status',
  progressbar: 'progressbar',
}

/**
 * Accessible loading states
 */
export const loadingStates = {
  skeleton: 'aria-busy="true" aria-label="Loading content"',
  spinner: 'role="status" aria-label="Loading"',
  progress: (value: number, max: number = 100) => 
    `role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${max}"`,
}

/**
 * Validation messages for forms
 */
export const validationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  url: 'Please enter a valid URL',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  pattern: 'Please match the requested format',
  min: (min: number) => `Must be at least ${min}`,
  max: (max: number) => `Must be no more than ${max}`,
}

export default {
  srOnly,
  useFocusTrap,
  announce,
  useId,
  prefersReducedMotion,
  getContrastRatio,
  meetsWCAGContrast,
  handleArrowNavigation,
  SkipToMainContent,
  ariaLabels,
  focusRing,
  semanticTags,
  accessibleColors,
  roles,
  loadingStates,
  validationMessages,
}