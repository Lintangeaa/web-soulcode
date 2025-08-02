export interface User extends Record<string, unknown> {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  avatar: string
}

export type UserStatus = User['status'] 