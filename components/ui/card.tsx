'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "venture" | "highlight"
  hover?: boolean
  interactive?: boolean
  loading?: boolean
  error?: boolean
  success?: boolean
  disabled?: boolean
  selected?: boolean
  elevation?: "none" | "sm" | "md" | "lg" | "xl"
  glow?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = "default", 
    hover = true,
    interactive = false,
    loading = false,
    error = false,
    success = false,
    disabled = false,
    selected = false,
    elevation = "sm",
    glow = false,
    onClick,
    children,
    ...props 
  }, ref) => {
    // Base styles with comprehensive states
    const baseStyles = cn(
      "rounded-[var(--radius-xl)] p-[var(--spacing-6)]",
      "transition-all duration-[var(--duration-normal)]",
      "transform-gpu",
      // Focus state for interactive cards
      interactive && [
        "cursor-pointer",
        "focus-visible:outline-none",
        "focus-visible:ring-[var(--focus-ring-width)]",
        "focus-visible:ring-[var(--focus-ring-color)]",
        "focus-visible:ring-offset-[var(--focus-ring-offset)]",
        "focus-visible:ring-offset-[var(--color-neutral-950)]",
      ],
      // Disabled state
      disabled && [
        "opacity-[var(--state-disabled-opacity)]",
        "pointer-events-none",
        "cursor-not-allowed"
      ],
      // Loading state
      loading && [
        "opacity-[var(--state-loading-opacity)]",
        "cursor-wait",
        "pointer-events-none"
      ],
      // Selected state
      selected && [
        "ring-2",
        "ring-[var(--color-brand-primary)]",
        "ring-offset-2",
        "ring-offset-[var(--color-neutral-950)]"
      ]
    )
    
    // Variant styles using design tokens
    const variants = {
      default: cn(
        "bg-white",
        hover && !disabled ? "border border-transparent hover:border-gray-600" : "",
        "transition-all duration-300"
      ),
      glass: cn(
        "bg-[var(--glass-bg)]",
        "backdrop-blur-[var(--glass-blur)]",
        "border border-[var(--glass-border)]",
        hover && !disabled && [
          "hover:bg-[var(--glass-bg-heavy)]",
          "hover:border-[var(--color-neutral-600)]",
        ]
      ),
      venture: cn(
        "bg-white",
        hover && !disabled ? "border border-transparent hover:border-gray-600" : "",
        "transition-all duration-300"
      ),
      highlight: cn(
        "bg-gradient-to-br from-[var(--color-neutral-800)] to-[var(--color-neutral-900)]",
        "border border-[var(--color-brand-primary)]/20",
        "shadow-[var(--shadow-glow-sm)]",
        hover && !disabled && [
          "hover:border-[var(--color-brand-primary)]/40",
          "hover:shadow-[var(--shadow-glow-md)]",
        ]
      )
    }
    
    // Hover effects based on settings
    const hoverStyles = hover && !disabled && cn(
      "active:scale-[0.99]",
      "active:transition-none"
    )
    
    // Elevation styles
    const elevations = {
      none: "",
      sm: "shadow-[var(--shadow-sm)]",
      md: "shadow-[var(--shadow-md)]",
      lg: "shadow-[var(--shadow-lg)]",
      xl: "shadow-[var(--shadow-xl)]",
    }
    
    // Glow effect
    const glowStyles = glow && cn(
      "shadow-[var(--shadow-glow-md)]",
      hover && !disabled && "hover:shadow-[var(--shadow-glow-lg)]"
    )
    
    // State indicator styles
    const stateStyles = cn(
      error && "border-[var(--color-error-main)] bg-[var(--color-error-main)]/10",
      success && "border-[var(--color-success-main)] bg-[var(--color-success-main)]/10"
    )
    
    // Handle keyboard interaction
    const handleKeyDown = interactive ? (e: React.KeyboardEvent<HTMLDivElement>) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled && !loading) {
        e.preventDefault()
        onClick?.(e as React.MouseEvent<HTMLDivElement>)
      }
    } : undefined
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hoverStyles,
          elevations[elevation],
          glowStyles,
          stateStyles,
          className
        )}
        onClick={interactive && !disabled && !loading ? onClick : undefined}
        onKeyDown={handleKeyDown}
        role={interactive ? "button" : undefined}
        tabIndex={interactive && !disabled ? 0 : undefined}
        aria-disabled={disabled || loading}
        aria-selected={selected}
        aria-busy={loading}
        {...props}
      >
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-neutral-950)]/50 backdrop-blur-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-brand-primary)] border-t-transparent" />
          </div>
        )}
        
        {/* Content with loading state */}
        <div className={cn(loading && "opacity-50")}>
          {children}
        </div>
        
        {/* State indicators */}
        {(error || success) && (
          <div className="absolute top-2 right-2">
            {error && (
              <div className="h-2 w-2 rounded-full bg-[var(--color-error-main)] animate-pulse" />
            )}
            {success && (
              <div className="h-2 w-2 rounded-full bg-[var(--color-success-main)]" />
            )}
          </div>
        )}
      </div>
    )
  }
)

Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-[var(--spacing-2)]", className)}
      {...props}
    />
  )
)

CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-[var(--font-size-xl)] font-[var(--font-weight-semibold)]",
        "leading-[var(--line-height-snug)] tracking-[var(--letter-spacing-tight)]",
        "text-gray-900",
        className
      )}
      {...props}
    />
  )
)

CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-[var(--font-size-sm)] text-gray-600",
        "leading-[var(--line-height-relaxed)]",
        className
      )}
      {...props}
    />
  )
)

CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn(
        "pt-[var(--spacing-4)]",
        // Responsive padding for different screen sizes
        "sm:pt-[var(--spacing-6)]",
        "lg:pt-[var(--spacing-8)]",
        className
      )} 
      {...props} 
    />
  )
)

CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center pt-[var(--spacing-4)]",
        "border-t border-[var(--color-neutral-700)]/50",
        "mt-[var(--spacing-4)]",
        // Responsive spacing
        "sm:pt-[var(--spacing-6)] sm:mt-[var(--spacing-6)]",
        className
      )}
      {...props}
    />
  )
)

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }