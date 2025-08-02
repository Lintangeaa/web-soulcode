import { useEffect, useRef } from 'react'
import { AppRoutes } from "./routes/AppRoutes"
import { useAuthStore } from './stores'
import { ToastContainer } from '@/shared/components'

function App() {
  const { checkAuth, initAuth } = useAuthStore()
  const hasCheckedRef = useRef(false)

  useEffect(() => {
    // Initialize auth from JWT token first (fast)
    if (!hasCheckedRef.current) {
      hasCheckedRef.current = true
      
      // First, initialize from JWT token (fast)
      initAuth()
      
      // Then verify with server in background
      const token = localStorage.getItem('auth_token')
      if (token) {
        checkAuth()
      }
    }
  }, [checkAuth, initAuth])

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" maxToasts={3} />
    </>
  )
}

export default App
