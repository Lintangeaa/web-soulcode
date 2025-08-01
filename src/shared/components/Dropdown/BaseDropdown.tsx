import { useState, useRef, useEffect } from 'react'

interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string | string[]
  onChange: (value: string | string[]) => void
  placeholder?: string
  label?: string
  error?: string
  multiple?: boolean
  searchable?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  multiple = false,
  searchable = false,
  disabled = false,
  size = 'md'
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  }

  const baseClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500'
  const errorClasses = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''

  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options

  const selectedOptions = multiple 
    ? (Array.isArray(value) ? value : [])
    : (value ? [value as string] : [])

  const displayValue = multiple
    ? selectedOptions.length > 0 
      ? `${selectedOptions.length} selected`
      : placeholder
    : options.find(opt => opt.value === value)?.label || placeholder

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const newValue = selectedOptions.includes(optionValue)
        ? selectedOptions.filter(v => v !== optionValue)
        : [...selectedOptions, optionValue]
      onChange(newValue)
    } else {
      onChange(optionValue)
      setIsOpen(false)
      setSearchTerm('')
    }
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className={`text-left cursor-pointer ${baseClasses} ${sizeClasses[size]} ${errorClasses}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className="block truncate">{displayValue}</span>
          <span className="flex absolute inset-y-0 right-0 items-center pr-2">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-lg">
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <input
                  type="text"
                  className="px-3 py-1 w-full text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
            )}
            <div className="overflow-auto max-h-60">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                      option.disabled ? 'text-gray-400 cursor-not-allowed' : ''
                    } ${
                      selectedOptions.includes(option.value) ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                    onClick={() => !option.disabled && handleOptionClick(option.value)}
                    disabled={option.disabled}
                  >
                    {multiple && (
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.value)}
                        onChange={() => {}}
                        className="mr-2"
                      />
                    )}
                    {option.label}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
} 