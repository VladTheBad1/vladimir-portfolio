'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  success?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = "text",
    error = false,
    success = false,
    fullWidth = false,
    icon,
    iconPosition = "left",
    disabled,
    ...props 
  }, ref) => {
    // Base styles using design tokens
    const baseStyles = cn(
      "flex h-11 w-full rounded-lg",
      "bg-[var(--color-neutral-900)]",
      "border border-[var(--color-neutral-700)]",
      "px-[var(--spacing-4)]",
      "text-[var(--font-size-base)]",
      "text-[var(--color-neutral-100)]",
      "placeholder:text-[var(--color-neutral-500)]",
      "transition-all duration-[var(--duration-normal)]",
      // Focus state
      "focus:outline-none",
      "focus:ring-[var(--focus-ring-width)]",
      "focus:ring-[var(--focus-ring-color)]",
      "focus:ring-offset-[var(--focus-ring-offset)]",
      "focus:ring-offset-[var(--color-neutral-950)]",
      "focus:border-[var(--color-primary-main)]",
      // Hover state
      "hover:border-[var(--color-neutral-600)]",
      // Disabled state
      "disabled:cursor-not-allowed",
      "disabled:opacity-60",
      "disabled:hover:border-[var(--color-neutral-700)]",
      // Error state
      error && "border-[var(--color-error-main)] focus:border-[var(--color-error-main)] focus:ring-[var(--color-error-main)]",
      // Success state
      success && "border-[var(--color-success-main)] focus:border-[var(--color-success-main)] focus:ring-[var(--color-success-main)]",
      // Full width
      fullWidth && "w-full"
    )
    
    // If there's an icon, wrap in a container
    if (icon) {
      return (
        <div className={cn(
          "relative flex items-center",
          fullWidth && "w-full"
        )}>
          {iconPosition === "left" && (
            <div className="absolute left-3 flex items-center pointer-events-none">
              <span className="text-[var(--color-neutral-500)]">
                {icon}
              </span>
            </div>
          )}
          <input
            type={type}
            className={cn(
              baseStyles,
              iconPosition === "left" && "pl-10",
              iconPosition === "right" && "pr-10",
              className
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={error ? "error-message" : undefined}
            {...props}
          />
          {iconPosition === "right" && (
            <div className="absolute right-3 flex items-center pointer-events-none">
              <span className="text-[var(--color-neutral-500)]">
                {icon}
              </span>
            </div>
          )}
        </div>
      )
    }
    
    // Simple input without icon
    return (
      <input
        type={type}
        className={cn(
          baseStyles,
          className
        )}
        ref={ref}
        disabled={disabled}
        aria-invalid={error}
        aria-describedby={error ? "error-message" : undefined}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }