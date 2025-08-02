import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores'
import { useEffect } from 'react'

export function RoleRedirect() {
  const { user, isAuthenticated, checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    // Check authentication status on mount
    checkAuth()
  }, [checkAuth])

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-b-2 border-blue-600 animate-spin"></div>
      </div>
    )
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If authenticated, redirect based on role
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  } else {
    return <Navigate to="/user/dashboard" replace />
  }
} 