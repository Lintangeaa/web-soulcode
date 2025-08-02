import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores'

export function RoleRedirect() {
  const { user, isAuthenticated } = useAuthStore()

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