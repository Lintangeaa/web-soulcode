import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@/stores'
import { BaseForm, FormField, Card, useToast } from '@/shared/components'

export function RegisterForm() {
  const { register, user, isAuthenticated, message } = useAuthStore()
  const navigate = useNavigate()
  const { showError, showSuccess } = useToast()

  // Navigate when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/user/dashboard')
      }
    }
  }, [isAuthenticated, user, navigate])

  const handleSubmit = async (values: Record<string, unknown>) => {
    const success = await register({
      name: values.name as string,
      email: values.email as string,
      password: values.password as string
    })

    if (!success) {
      // Use message from store (already reset on new register attempt)
      showError(message || 'Registration failed. Please try again.', 'Registration Failed')
    } else {
      showSuccess(`Welcome to SoulCode, ${values.name}!`, 'Registration Successful')
    }
  }

  const formConfig = {
    name: {
      initialValue: '',
      required: true,
      validation: (value: unknown) => {
        if (!value || String(value).trim() === '') {
          return 'Name is required'
        }
      }
    },
    email: {
      initialValue: '',
      required: true,
      validation: (value: unknown) => {
        if (!value || String(value).trim() === '') {
          return 'Email is required'
        }
        if (!/\S+@\S+\.\S+/.test(String(value))) {
          return 'Please enter a valid email'
        }
      }
    },
    password: {
      initialValue: '',
      required: true,
      validation: (value: unknown) => {
        if (!value || String(value).trim() === '') {
          return 'Password is required'
        }
        if (String(value).length < 6) {
          return 'Password must be at least 6 characters long'
        }
      }
    },
    confirmPassword: {
      initialValue: '',
      required: true,
      validation: (value: unknown, allValues?: Record<string, unknown>) => {
        if (!value || String(value).trim() === '') {
          return 'Please confirm your password'
        }
        if (value !== allValues?.password) {
          return 'Passwords do not match'
        }
      }
    }
  }

  return (
    <div className="flex justify-center items-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
      <div className="space-y-8 w-full max-w-md">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Join our platform today
          </p>
        </div>

        <Card>
          <BaseForm
            initialValues={formConfig}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <div className="space-y-6">
                <FormField
                  name="name"
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />

                <FormField
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />

                <FormField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={values.password}
                  error={errors.password}
                  touched={touched.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />

                <FormField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex justify-center px-4 py-2 w-full text-sm font-medium text-white bg-blue-600 rounded-md border border-transparent shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </BaseForm>
        </Card>
      </div>
    </div>
  )
} 