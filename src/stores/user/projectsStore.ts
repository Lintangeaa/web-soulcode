import { create } from 'zustand'

export interface Project extends Record<string, unknown> {
  id: string
  name: string
  description: string
  service: string
  clientName: string
  budget: number
  startDate: string
  endDate: string
  priority: 'low' | 'medium' | 'high'
  team: string[]
  status: 'planning' | 'active' | 'completed' | 'on-hold'
  progress: number
  repository: string
  liveUrl: string
}

interface ProjectsState {
  projects: Project[]
  isLoading: boolean
  isInitialized: boolean
  showAddProject: boolean
  setShowAddProject: (show: boolean) => void
  addProject: (projectData: Omit<Project, 'id'>) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  fetchProjects: () => Promise<void>
}

const dummyProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Website',
    description: 'Website toko online untuk bisnis fashion',
    service: 'E-commerce Website',
    clientName: 'Fashion Store',
    budget: 25000000,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    priority: 'high',
    team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    status: 'active',
    progress: 75,
    repository: 'https://github.com/soulcode/ecommerce-fashion',
    liveUrl: 'https://fashion-store.com'
  },
  {
    id: '2',
    name: 'Chatbot Support',
    description: 'AI chatbot untuk customer service',
    service: 'Chatbot Development',
    clientName: 'Tech Company',
    budget: 8000000,
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    priority: 'medium',
    team: ['Sarah Wilson', 'David Brown'],
    status: 'completed',
    progress: 100,
    repository: 'https://github.com/soulcode/chatbot-support',
    liveUrl: 'https://support.techcompany.com'
  },
  {
    id: '3',
    name: 'Mobile Banking App',
    description: 'Aplikasi mobile banking untuk bank lokal',
    service: 'Mobile App Development',
    clientName: 'Local Bank',
    budget: 35000000,
    startDate: '2024-01-01',
    endDate: '2024-04-30',
    priority: 'high',
    team: ['Emily Davis', 'Robert Wilson', 'Lisa Anderson', 'Michael Chen'],
    status: 'active',
    progress: 45,
    repository: 'https://github.com/soulcode/mobile-banking',
    liveUrl: ''
  },
  {
    id: '4',
    name: 'API Integration',
    description: 'RESTful API untuk sistem payment gateway',
    service: 'API Development',
    clientName: 'Payment Gateway',
    budget: 12000000,
    startDate: '2024-02-15',
    endDate: '2024-03-15',
    priority: 'medium',
    team: ['Amanda Taylor', 'James Rodriguez'],
    status: 'planning',
    progress: 0,
    repository: '',
    liveUrl: ''
  }
]

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  isLoading: false,
  isInitialized: false,
  showAddProject: false,

  setShowAddProject: (show) => set({ showAddProject: show }),

  addProject: (projectData) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString()
    } as Project
    set((state) => ({
      projects: [...state.projects, newProject]
    }))
  },

  updateProject: (id, updates) => {
    set((state) => ({
      projects: state.projects.map(project =>
        project.id === id ? { ...project, ...updates } : project
      )
    }))
  },

  deleteProject: (id) => {
    set((state) => ({
      projects: state.projects.filter(project => project.id !== id)
    }))
  },

  fetchProjects: async () => {
    set({ isLoading: true })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    set({ 
      projects: dummyProjects, 
      isLoading: false, 
      isInitialized: true 
    })
  }
})) 