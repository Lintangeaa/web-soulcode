import type { User } from '@/types/User'
import { create } from 'zustand'

interface UserState {
  users: User[]
  searchTerm: string
  statusFilter: string
  showAddUser: boolean
  setSearchTerm: (term: string) => void
  setStatusFilter: (status: string) => void
  setShowAddUser: (show: boolean) => void
  addUser: (user: User) => void
  deleteUser: (userId: string) => void
  getFilteredUsers: () => User[]
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15 10:30',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-15 09:15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'Moderator',
    status: 'inactive',
    lastLogin: '2024-01-14 16:45',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'User',
    status: 'pending',
    lastLogin: '2024-01-13 14:20',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-15 11:00',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2024-01-15 08:45',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '7',
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2024-01-12 15:30',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15 12:15',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '9',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'User',
    status: 'pending',
    lastLogin: '2024-01-14 09:20',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '10',
    name: 'Amanda Taylor',
    email: 'amanda.taylor@example.com',
    role: 'Moderator',
    status: 'active',
    lastLogin: '2024-01-15 14:30',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '11',
    name: 'James Rodriguez',
    email: 'james.rodriguez@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-15 13:45',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '12',
    name: 'Sophia Lee',
    email: 'sophia.lee@example.com',
    role: 'Editor',
    status: 'inactive',
    lastLogin: '2024-01-13 11:10',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '13',
    name: 'Daniel Martinez',
    email: 'daniel.martinez@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-15 16:20',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '14',
    name: 'Olivia Garcia',
    email: 'olivia.garcia@example.com',
    role: 'Admin',
    status: 'pending',
    lastLogin: '2024-01-14 17:35',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '15',
    name: 'Christopher Thompson',
    email: 'christopher.thompson@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-15 15:50',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  }
]

export const useUserStore = create<UserState>((set, get) => ({
  users: mockUsers,
  searchTerm: '',
  statusFilter: 'all',
  showAddUser: false,
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setShowAddUser: (show) => set({ showAddUser: show }),
  
  addUser: (user) => set((state) => ({ 
    users: [...state.users, { ...user, id: Date.now().toString() }] 
  })),
  
  deleteUser: (userId) => set((state) => ({ 
    users: state.users.filter(user => user.id !== userId) 
  })),
  
  getFilteredUsers: () => {
    const { users, searchTerm, statusFilter } = get()
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      return matchesSearch && matchesStatus
    })
  },
})) 