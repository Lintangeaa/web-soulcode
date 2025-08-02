import React, { useState, useCallback } from 'react'

interface FormFieldConfig<T> {
  initialValue: T
  validation?: (value: T, allValues?: Record<string, unknown>) => string | undefined
  required?: boolean
}

interface FormConfig {
  [key: string]: FormFieldConfig<unknown>
}

interface BaseFormProps {
  initialValues: FormConfig
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>
  children: (props: {
    values: Record<string, unknown>
    errors: Record<string, string>
    touched: Record<string, boolean>
    handleChange: (name: string, value: unknown) => void
    handleBlur: (name: string) => void
    handleSubmit: (e: React.FormEvent) => void
    isSubmitting: boolean
    resetForm: () => void
  }) => React.ReactNode
  validateOnChange?: boolean
  validateOnBlur?: boolean
}

export function BaseForm({
  initialValues,
  onSubmit,
  children,
  validateOnChange = true,
  validateOnBlur = true
}: BaseFormProps) {
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {}
    Object.keys(initialValues).forEach(key => {
      initial[key] = initialValues[key].initialValue
    })
    return initial
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = useCallback((name: string, value: unknown, allValues?: Record<string, unknown>): string | undefined => {
    const fieldConfig = initialValues[name]
    if (!fieldConfig) return undefined

    // Required validation
    if (fieldConfig.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${name} is required`
    }

    // Custom validation
    if (fieldConfig.validation) {
      return fieldConfig.validation(value, allValues || values)
    }

    return undefined
  }, [initialValues, values])

  const validateForm = useCallback((formValues: Record<string, unknown>): Record<string, string> => {
    const newErrors: Record<string, string> = {}
    
    Object.keys(initialValues).forEach(key => {
      const error = validateField(key, formValues[key], formValues)
      if (error) {
        newErrors[key] = error
      }
    })

    return newErrors
  }, [initialValues, validateField])

  const handleChange = useCallback((name: string, value: unknown) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    if (validateOnChange) {
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }))
    }
  }, [validateOnChange, validateField])

  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    
    if (validateOnBlur) {
      const error = validateField(name, values[name])
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }))
    }
  }, [validateOnBlur, validateField, values])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {}
    Object.keys(initialValues).forEach(key => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    // Validate all fields
    const formErrors = validateForm(values)
    setErrors(formErrors)

    // If no errors, submit
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } finally {
        setIsSubmitting(false)
      }
    }
  }, [values, validateForm, onSubmit, initialValues])

  const resetForm = useCallback(() => {
    const initial: Record<string, unknown> = {}
    Object.keys(initialValues).forEach(key => {
      initial[key] = initialValues[key].initialValue
    })
    setValues(initial)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return (
    <form onSubmit={handleSubmit}>
      {children({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        resetForm
      })}
    </form>
  )
} 