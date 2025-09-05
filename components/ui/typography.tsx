import React from 'react'
import { cn } from '@/lib/utils'

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'lead' | 'small' | 'muted'
  gradient?: boolean
}

const variantStyles = {
  h1: 'text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight',
  h2: 'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight',
  h3: 'text-2xl sm:text-3xl md:text-4xl font-semibold',
  h4: 'text-xl sm:text-2xl md:text-3xl font-semibold',
  body: 'text-base text-gray-800',
  lead: 'text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed',
  small: 'text-sm text-gray-600',
  muted: 'text-sm text-gray-600',
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as = 'p', variant = 'body', gradient = false, className, children, ...props }, ref) => {
    const Component = as
    
    const styles = cn(
      variantStyles[variant],
      gradient && 'bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent',
      className
    )
    
    return React.createElement(
      Component,
      { ref, className: styles, ...props },
      children
    )
  }
)

Typography.displayName = 'Typography'

// Convenience components
export const H1 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'as' | 'variant'>>(
  (props, ref) => <Typography as="h1" variant="h1" ref={ref as React.Ref<HTMLElement>} {...props} />
)
H1.displayName = 'H1'

export const H2 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'as' | 'variant'>>(
  (props, ref) => <Typography as="h2" variant="h2" ref={ref as React.Ref<HTMLElement>} {...props} />
)
H2.displayName = 'H2'

export const H3 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'as' | 'variant'>>(
  (props, ref) => <Typography as="h3" variant="h3" ref={ref as React.Ref<HTMLElement>} {...props} />
)
H3.displayName = 'H3'

export const H4 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'as' | 'variant'>>(
  (props, ref) => <Typography as="h4" variant="h4" ref={ref as React.Ref<HTMLElement>} {...props} />
)
H4.displayName = 'H4'

export const Lead = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'as' | 'variant'>>(
  (props, ref) => <Typography as="p" variant="lead" ref={ref as React.Ref<HTMLElement>} {...props} />
)
Lead.displayName = 'Lead'

export const Text = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'as' | 'variant'>>(
  (props, ref) => <Typography as="p" variant="body" ref={ref as React.Ref<HTMLElement>} {...props} />
)
Text.displayName = 'Text'

export const Muted = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'as' | 'variant'>>(
  (props, ref) => <Typography as="p" variant="muted" ref={ref as React.Ref<HTMLElement>} {...props} />
)
Muted.displayName = 'Muted'