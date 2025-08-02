import { API_ENDPOINTS, hitApi } from './config'
import type { LoginCredentials, User } from '@/features/auth/types'
import { jwtDecode } from 'jwt-decode'

export interface LoginResponse {
  user: User
  token: string
}

export interface RegisterResponse {
  user: User
  token: string
}

// JWT payload interface
interface JWTPayload {
  userId: string
  email: string
  role: string
  name?: string
  iat: number
  exp: number
}

// Decode JWT token to get user info (without verification for client-side)
const decodeJWT = (token: string): JWTPayload | null => {
  try {
    return jwtDecode<JWTPayload>(token)
  } catch {
    return null
  }
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    const responseLogin = await hitApi<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, 'POST', credentials)
    
    return responseLogin
  },

  register: async (userData: {
    name: string
    email: string
    password: string
  }): Promise<ApiResponse<RegisterResponse>> => {
    const responseRegister = await hitApi<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, 'POST', userData)
    
    return responseRegister
  },

  authMe: async (): Promise<ApiResponse<User>> => {
    const responseAuthMe = await hitApi<User>(API_ENDPOINTS.AUTH.AUTH_ME, 'GET', {})
    
    return responseAuthMe
  },

  // Get user info from JWT token (for initial load)
  getUserFromToken: (token: string): User | null => {
    const decoded = decodeJWT(token)
    if (decoded && decoded.role) {
      return {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name || 'User',
        role: decoded.role as 'admin' | 'user'
      }
    }
    return null
  },

  // Check if JWT token is expired
  isTokenExpired: (token: string): boolean => {
    const decoded = decodeJWT(token)
    if (!decoded) return true
    
    const currentTime = Date.now() / 1000
    const isExpired = decoded.exp < currentTime
    
    return isExpired
  }
} 