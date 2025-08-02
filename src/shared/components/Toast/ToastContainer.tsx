import React, { useState, useCallback } from 'react'
import { Toast } from './Toast'
import type { ToastProps } from './Toast'

export interface ToastItem extends Omit<ToastProps, 'id' | 'onClose'> {
  id: string
}

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxToasts?: number
}

// Extend Window interface for global toast function
declare global {
  interface Window {
    showToast?: (toast: Omit<ToastItem, 'id'>) => void
  }
}

export function ToastContainer({ 
  position = 'top-right', 
  maxToasts = 5 
}: ToastContainerProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newToast: ToastItem = { ...toast, id }
    
    setToasts(prev => {
      const updated = [newToast, ...prev]
      return updated.slice(0, maxToasts)
    })
  }, [maxToasts])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  // Expose addToast method globally
  React.useEffect(() => {
    window.showToast = addToast
    return () => {
      delete window.showToast
    }
  }, [addToast])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          position={position}
          onClose={removeToast}
        />
      ))}
    </div>
  )
} 