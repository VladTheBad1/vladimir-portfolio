'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive"
  size?: "sm" | "md" | "lg" | "icon"
  loading?: boolean
  error?: boolean
  success?: boolean
  fullWidth?: boolean
  ariaLabel?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    loading = false,
    error = false,
    success = false,
    fullWidth = false,
    ariaLabel,
    icon,
    iconPosition = "left",
    children, 
    disabled,
    onClick,
    ...props 
  }, ref) => {
    // Comprehensive base styles with all states
    const baseStyles = cn(
      "inline-flex items-center justify-center",
      "font-bold rounded-lg",
      "transition-all duration-[var(--duration-normal)]",
      "transform-gpu",
      // Focus state with design tokens
      "focus-visible:outline-none",
      "focus-visible:ring-[var(--focus-ring-width)]",
      "focus-visible:ring-[var(--focus-ring-color)]",
      "focus-visible:ring-offset-[var(--focus-ring-offset)]",
      "focus-visible:ring-offset-[var(--color-neutral-950)]",
      // Active state
      "active:scale-[0.99]",
      "active:transition-none",
      // Disabled state
      "disabled:pointer-events-none",
      "disabled:opacity-60",
      "disabled:scale-100",
      // Loading state
      loading && "opacity-[var(--state-loading-opacity)] cursor-wait",
      // Full width
      fullWidth && "w-full"
    )
    
    // Variant styles using design tokens
    const variants = {
      primary: cn(
        "bg-primary-600",
        "text-white",
        "hover:bg-primary-700",
        "active:bg-primary-800",
        "transition-all duration-300",
        "font-semibold",
        "shadow-md hover:shadow-lg",
        error && "bg-[var(--color-error-main)] hover:bg-[var(--color-error-light)]",
        success && "bg-[var(--color-success-main)] hover:bg-[var(--color-success-light)]"
      ),
      secondary: cn(
        "bg-[var(--color-neutral-800)]",
        "text-[var(--color-neutral-100)]",
        "hover:bg-[var(--color-neutral-700)]",
        "active:bg-[var(--color-neutral-900)]",
        "border border-[var(--color-neutral-700)]",
        "hover:border-[var(--color-neutral-600)]"
      ),
      ghost: cn(
        "text-[var(--color-neutral-300)]",
        "hover:bg-[var(--color-neutral-800)]/50",
        "hover:text-[var(--color-neutral-100)]",
        "active:bg-[var(--color-neutral-800)]"
      ),
      outline: cn(
        "border border-transparent",
        "text-gray-700",
        "hover:border-gray-600",
        "hover:text-gray-900",
        "active:bg-gray-50",
        "transition-all duration-300"
      ),
      destructive: cn(
        "bg-[var(--color-error-main)]",
        "text-white",
        "hover:bg-[var(--color-error-light)]",
        "active:bg-[var(--color-error-dark)]",
        "shadow-[var(--shadow-md)]",
        "hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
      ),
    }
    
    // Size styles using design tokens
    const sizes = {
      sm: cn(
        "h-9 px-[var(--spacing-4)] gap-[var(--spacing-2)]",
        "text-[var(--font-size-sm)]"
      ),
      md: cn(
        "h-11 px-[var(--spacing-6)] gap-[var(--spacing-2)]",
        "text-[var(--font-size-base)]"
      ),
      lg: cn(
        "h-12 px-[var(--spacing-8)] gap-[var(--spacing-3)]",
        "text-[var(--font-size-lg)]"
      ),
      icon: cn(
        "h-10 w-10 p-0",
        "text-[var(--font-size-base)]"
      ),
    }
    
    // Enhanced keyboard handling
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled && !loading) {
        e.preventDefault()
        onClick?.(e as React.MouseEvent<HTMLButtonElement>)
      }
      props.onKeyDown?.(e)
    }
    
    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className={cn(
          "animate-spin h-4 w-4",
          size === "lg" && "h-5 w-5"
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )
    
    // Success icon component
    const SuccessIcon = () => (
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    )
    
    // Error icon component
    const ErrorIcon = () => (
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    )
    
    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        role="button"
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        {/* Left icon or status icon */}
        {iconPosition === "left" && (icon || loading || success || error) && (
          <>
            {loading && <LoadingSpinner />}
            {!loading && success && <SuccessIcon />}
            {!loading && error && <ErrorIcon />}
            {!loading && !success && !error && icon}
          </>
        )}
        
        {/* Button text */}
        {size !== "icon" && (
          <span className={cn(
            loading && "opacity-80"
          )}>
            {children}
          </span>
        )}
        
        {/* Icon only button */}
        {size === "icon" && !loading && !success && !error && children}
        
        {/* Right icon */}
        {iconPosition === "right" && icon && !loading && !success && !error && (
          <>{icon}</>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }