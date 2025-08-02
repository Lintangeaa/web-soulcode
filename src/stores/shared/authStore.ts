import { create } from 'zustand'
import type { LoginCredentials, RegisterCredentials, AuthState } from '@/features/auth/types'
import { authApi } from '@/api/auth'

// Initialize auth state from JWT token (for initial load)
const getInitialAuthState = () => {
  const token = localStorage.getItem('auth_token')
  
  if (token) {
    // Check if token is expired
    if (authApi.isTokenExpired(token)) {
      localStorage.removeItem('auth_token')
      return { user: null, isAuthenticated: false }
    }
    
    // Get user info from JWT token for initial load
    const user = authApi.getUserFromToken(token)
    if (user) {
      return { user, isAuthenticated: true }
    }
  }
  
  return { user: null, isAuthenticated: false }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  ...getInitialAuthState(),
  isLoading: false,
  message: '',

  login: async (credentials: LoginCredentials): Promise<{ success: boolean, message: string }> => {
    set({ isLoading: true, message: '' }) // Reset message on new login attempt
    
    try {
      const response = await authApi.login(credentials)

      if(response.status !== 200) {
        set({ isLoading: false, message: response.message })
        return {
          success: false,
          message: response.message
        }
      }
      
      localStorage.setItem('auth_token', response.result.token)
      
      set({ 
        user: response.result.user, 
        isAuthenticated: true, 
        isLoading: false,
        message: response.message
      })
      
      return {
        success: true,
        message: response.message
      }
    } catch (error: unknown) {
      set({ isLoading: false, message: error instanceof Error ? error.message : 'Internal server error' })
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error'
      }
    }
  },

  register: async (credentials: RegisterCredentials): Promise<{ success: boolean, message: string }> => {
    set({ isLoading: true, message: '' }) // Reset message on new register attempt
    
    try {
      const response = await authApi.register(credentials)
      
      if(response.status !== 201) {
        set({ isLoading: false, message: response.message })
        return {
          success: false,
          message: response.message
        }
      }
      
      localStorage.setItem('auth_token', response.result.token)
      
      set({ 
        message: response.message,
        user: response.result.user, 
        isAuthenticated: true, 
        isLoading: false 
      })
      
      return {
        success: true,
        message: response.message
      }
    } catch (error) {
      set({ isLoading: false, message: error instanceof Error ? error.message : 'Internal server error' })
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error'
      }
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, message: '' })
    localStorage.removeItem('auth_token')
    // Redirect to login page
    window.location.href = '/login'
  },

  checkAuth: async () => {
    const { isAuthenticated } = get()
    
    // If already authenticated, don't check again
    if (isAuthenticated) {
      return
    }

    const token = localStorage.getItem('auth_token')
    
    if (!token) {
      set({ user: null, isAuthenticated: false, message: '' })
      return
    }
    
    try {
      // Always verify with server to get fresh user data
      const response = await authApi.authMe()
      const user = response.result
      
      // Set authenticated state with fresh user data from server
      set({ user, isAuthenticated: true, message: response.message })
    } catch (error) {
      localStorage.removeItem('auth_token')
      set({ user: null, isAuthenticated: false, message: error instanceof Error ? error.message : 'Internal server error' })
    }
  },

  // Initialize auth state from JWT token
  initAuth: () => {
    const token = localStorage.getItem('auth_token')
    
    if (token) {
      // Check if token is expired
      if (authApi.isTokenExpired(token)) {
        localStorage.removeItem('auth_token')
        set({ user: null, isAuthenticated: false, message: '' })
        return
      }
      
      // Get user info from JWT token for initial load
      const user = authApi.getUserFromToken(token)
      if (user) {
        set({ user, isAuthenticated: true, message: '' })
      }
    }
  }
})) 