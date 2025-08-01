import { create } from 'zustand'

export interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  newUsers: number
  totalRevenue: number
  monthlyGrowth: number
  userEngagement: number
  pageViews: number
  conversionRate: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string
    borderColor?: string
    borderWidth?: number
  }[]
}

export interface TimeSeriesData {
  date: string
  value: number
}

interface AnalyticsState {
  analyticsData: AnalyticsData
  userGrowthData: TimeSeriesData[]
  revenueData: TimeSeriesData[]
  pageViewsData: TimeSeriesData[]
  isLoading: boolean
  fetchAnalyticsData: () => Promise<void>
  fetchUserGrowthData: () => Promise<void>
  fetchRevenueData: () => Promise<void>
  fetchPageViewsData: () => Promise<void>
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  analyticsData: {
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    userEngagement: 0,
    pageViews: 0,
    conversionRate: 0,
  },
  userGrowthData: [],
  revenueData: [],
  pageViewsData: [],
  isLoading: false,

  fetchAnalyticsData: async () => {
    set({ isLoading: true })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockData: AnalyticsData = {
      totalUsers: 12450,
      activeUsers: 8234,
      newUsers: 456,
      totalRevenue: 125000,
      monthlyGrowth: 12.5,
      userEngagement: 78.3,
      pageViews: 45678,
      conversionRate: 3.2,
    }
    
    set({ analyticsData: mockData, isLoading: false })
  },

  fetchUserGrowthData: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockData: TimeSeriesData[] = [
      { date: '2024-01', value: 8500 },
      { date: '2024-02', value: 9200 },
      { date: '2024-03', value: 9800 },
      { date: '2024-04', value: 10500 },
      { date: '2024-05', value: 11200 },
      { date: '2024-06', value: 11800 },
      { date: '2024-07', value: 12450 },
    ]
    
    set({ userGrowthData: mockData })
  },

  fetchRevenueData: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockData: TimeSeriesData[] = [
      { date: '2024-01', value: 85000 },
      { date: '2024-02', value: 92000 },
      { date: '2024-03', value: 98000 },
      { date: '2024-04', value: 105000 },
      { date: '2024-05', value: 112000 },
      { date: '2024-06', value: 118000 },
      { date: '2024-07', value: 125000 },
    ]
    
    set({ revenueData: mockData })
  },

  fetchPageViewsData: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockData: TimeSeriesData[] = [
      { date: '2024-01', value: 35000 },
      { date: '2024-02', value: 38000 },
      { date: '2024-03', value: 41000 },
      { date: '2024-04', value: 43000 },
      { date: '2024-05', value: 44000 },
      { date: '2024-06', value: 45000 },
      { date: '2024-07', value: 45678 },
    ]
    
    set({ pageViewsData: mockData })
  },
})) 