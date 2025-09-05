import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "success" | "warning" | "error" | "outline" | "ideation" | "mvp" | "growth" | "scale" | "exit"
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-700 border-gray-300",
    primary: "bg-primary-500/20 text-primary-600 border-primary-500/30",
    success: "bg-green-500/20 text-green-700 border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
    error: "bg-red-500/20 text-red-700 border-red-500/30",
    outline: "border-gray-300 text-gray-600",
    // Stage-specific variants with consistent styling
    ideation: "bg-gray-100 text-gray-800 border-gray-400",
    mvp: "bg-blue-100 text-blue-800 border-blue-400", 
    growth: "bg-green-100 text-green-800 border-green-400",
    scale: "bg-amber-100 text-amber-800 border-amber-400",
    exit: "bg-purple-100 text-purple-800 border-purple-400"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}