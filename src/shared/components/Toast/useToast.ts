import { useCallback } from 'react'

export interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
}

export function useToast() {
  const showToast = useCallback((options: ToastOptions) => {
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast(options)
    }
  }, [])

  const showSuccess = useCallback((message: string, title?: string) => {
    showToast({ type: 'success', message, title: title || 'Success' })
  }, [showToast])

  const showError = useCallback((message: string, title?: string) => {
    showToast({ type: 'error', message, title: title || 'Error' })
  }, [showToast])

  const showWarning = useCallback((message: string, title?: string) => {
    showToast({ type: 'warning', message, title: title || 'Warning' })
  }, [showToast])

  const showInfo = useCallback((message: string, title?: string) => {
    showToast({ type: 'info', message, title: title || 'Info' })
  }, [showToast])

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
} 