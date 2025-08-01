import React from 'react'
import { BaseInput } from './BaseInput'

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  error?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  onSearch?: (value: string) => void
  placeholder?: string
}

export function SearchInput({
  label = 'Search',
  error,
  helperText,
  size = 'md',
  onSearch,
  placeholder = 'Search...',
  onChange,
  ...props
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onSearch?.(e.target.value)
  }

  return (
    <BaseInput
      type="search"
      label={label}
      error={error}
      helperText={helperText}
      size={size}
      placeholder={placeholder}
      onChange={handleChange}
      leftIcon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      }
      {...props}
    />
  )
} 