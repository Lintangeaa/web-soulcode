import { useEffect } from 'react'
import { AppRoutes } from "./routes/AppRoutes"
import { useAuthStore } from './stores'

function App() {
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return <AppRoutes />
}

export default App
