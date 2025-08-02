export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  message: string
  login: (credentials: LoginCredentials) => Promise<{ success: boolean, message: string }>
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean, message: string }>
  logout: () => void
  checkAuth: () => void
  initAuth: () => void
} 