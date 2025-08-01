import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores'
import { EmailInput, PasswordInput, Button, Card } from '@/shared/components'

export function LoginForm() {
  const { login, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields')
      return
    }

    try {
      const success = await login(credentials)
      if (success) {
        setSuccess('Login successful! Redirecting...')
        // Navigate based on user role
        const user = JSON.parse(localStorage.getItem('auth_user') || '{}')
        if (user.role === 'admin') {
          navigate('/admin/dashboard')
        } else {
          navigate('/user/dashboard')
        }
      } else {
        setError('Invalid email or password')
      }
    } catch {
      setError('An error occurred during login. Please try again.')
    }
  }

  return (
    <div className="flex justify-center items-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
      <div className="space-y-8 w-full max-w-md">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Demo credentials:
          </p>
          <div className="mt-2 space-y-1 text-xs text-center text-gray-500">
            <p>Admin: admin@example.com / password</p>
            <p>User: user@example.com / password</p>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 rounded-md border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="p-4 bg-green-50 rounded-md border border-green-200">
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}

            <EmailInput
              label="Email Address"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />

            <Button
              type="submit"
              loading={isLoading}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
} 