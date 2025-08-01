export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
} 