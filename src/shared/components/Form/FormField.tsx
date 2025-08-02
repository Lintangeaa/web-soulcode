import React from 'react'
import { Input, Dropdown, PasswordInput } from '@/shared/components'

export interface FormFieldProps {
  name: string
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea' | 'dropdown'
  placeholder?: string
  required?: boolean
  value: unknown
  error?: string
  touched?: boolean
  onChange: (name: string, value: unknown) => void
  onBlur: (name: string) => void
  options?: Array<{ value: string; label: string }>
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  value,
  error,
  touched,
  onChange,
  onBlur,
  options = [],
  leftIcon,
  rightIcon,
  disabled = false,
  size = 'md'
}: FormFieldProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === 'number' ? Number(e.target.value) : e.target.value
    onChange(name, newValue)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value)
  }

  const handleDropdownChange = (value: string | string[]) => {
    onChange(name, Array.isArray(value) ? value[0] : value)
  }

  const handleBlur = () => {
    onBlur(name)
  }

  const showError = touched && error

  if (type === 'dropdown') {
    return (
      <Dropdown
        label={label}
        options={options}
        value={value as string}
        onChange={handleDropdownChange}
        placeholder={placeholder}
        error={showError ? error : undefined}
        disabled={disabled}
        size={size}
      />
    )
  }

  if (type === 'textarea') {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        <textarea
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${
            showError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
          value={value as string}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={4}
        />
        {showError && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }

  if (type === 'password') {
    return (
      <PasswordInput
        label={label}
        value={value as string}
        onChange={handlePasswordChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        error={showError ? error : undefined}
        disabled={disabled}
        size={size}
      />
    )
  }

  return (
    <Input
      type={type}
      label={label}
      value={value as string}
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      error={showError ? error : undefined}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      disabled={disabled}
      size={size}
    />
  )
} 