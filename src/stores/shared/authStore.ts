import { create } from 'zustand'
import type { User, LoginCredentials, AuthState } from '@/features/auth/types'

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
  }
]

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (credentials: LoginCredentials): Promise<boolean> => {
    set({ isLoading: true })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Find user by email
    const user = mockUsers.find(u => u.email === credentials.email)
    
    if (user && credentials.password === 'password') {
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      })
      
      // Store in localStorage
      localStorage.setItem('auth_user', JSON.stringify(user))
      return true
    } else {
      set({ isLoading: false })
      return false
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
    localStorage.removeItem('auth_user')
    // Redirect to login page
    window.location.href = '/login'
  },

  checkAuth: () => {
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User
        set({ user, isAuthenticated: true })
      } catch {
        localStorage.removeItem('auth_user')
      }
    }
  }
})) 