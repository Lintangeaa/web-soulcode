import React from 'react'

interface CardProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export function Card({
  children,
  title,
  subtitle,
  variant = 'default',
  padding = 'md',
  className = ''
}: CardProps) {
  const baseClasses = 'rounded-lg'
  
  const variantClasses = {
    default: 'bg-white shadow',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border border-gray-200',
  }
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    className
  ].join(' ')
  
  return (
    <div className={classes}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  )
} 