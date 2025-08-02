import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'admin' | 'user'
  fallbackPath?: string
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallbackPath = '/login' 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, checkAuth } = useAuthStore()
  const location = useLocation()
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    // Always check auth with server for security
    if (!hasChecked) {
      const performAuthCheck = async () => {
        try {
          await checkAuth()
        } catch (error) {
          console.error('Auth check failed:', error)
        } finally {
          setHasChecked(true)
        }
      }

      performAuthCheck()
    }
  }, [checkAuth, hasChecked])

  // Show loading while checking authentication
  if (!hasChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-b-2 border-blue-600 animate-spin"></div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />
  }

  // Check role-based access (role comes from server, not localStorage)
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
} 