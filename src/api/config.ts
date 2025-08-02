// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hono-soulcode-api.vercel.app/api'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    AUTH_ME: '/auth/me'
  }
} as const

const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

const handleApiResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}


export const hitApi = async <T>(endpoint: string, method: string, body: unknown): Promise<ApiResponse<T>> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: getAuthHeaders(),
    body: JSON.stringify(body)
  })

  return handleApiResponse<T>(response)
}


export const isDebugMode = import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true' 