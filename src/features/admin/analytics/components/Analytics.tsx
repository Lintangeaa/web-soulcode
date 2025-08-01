import { useEffect } from 'react'
import { MetricCard } from './MetricCard'
import { AnalyticsChart } from './AnalyticsChart'
import { useAnalyticsStore } from '@/stores'
import { Button, Card } from '@/shared/components'

export function Analytics() {
  const {
    analyticsData,
    userGrowthData,
    revenueData,
    pageViewsData,
    isLoading,
    fetchAnalyticsData,
    fetchUserGrowthData,
    fetchRevenueData,
    fetchPageViewsData,
  } = useAnalyticsStore()

  useEffect(() => {
    fetchAnalyticsData()
    fetchUserGrowthData()
    fetchRevenueData()
    fetchPageViewsData()
  }, [fetchAnalyticsData, fetchUserGrowthData, fetchRevenueData, fetchPageViewsData])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex justify-center items-center h-32">
            <div className="w-8 h-8 rounded-full border-b-2 border-blue-600 animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Export Data
          </Button>
          <Button variant="primary" size="sm">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={analyticsData.totalUsers}
          change={12.5}
          changeType="increase"
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <MetricCard
          title="Active Users"
          value={analyticsData.activeUsers}
          change={8.2}
          changeType="increase"
          color="green"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          }
        />
        <MetricCard
          title="Total Revenue"
          value={analyticsData.totalRevenue}
          change={15.3}
          changeType="increase"
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          }
        />
        <MetricCard
          title="Conversion Rate"
          value={`${analyticsData.conversionRate}%`}
          change={-2.1}
          changeType="decrease"
          color="orange"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          }
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsChart
          title="User Growth"
          data={userGrowthData}
          color="blue"
          height={250}
        />
        <AnalyticsChart
          title="Revenue Trend"
          data={revenueData}
          color="green"
          height={250}
        />
      </div>

      <AnalyticsChart
        title="Page Views"
        data={pageViewsData}
        color="purple"
        height={250}
      />

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* User Engagement */}
        <Card title="User Engagement" subtitle="Key engagement metrics">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Daily Active Users</span>
              <span className="text-sm font-medium text-gray-900">6,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Weekly Active Users</span>
              <span className="text-sm font-medium text-gray-900">18,456</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Monthly Active Users</span>
              <span className="text-sm font-medium text-gray-900">45,678</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Session Duration</span>
              <span className="text-sm font-medium text-gray-900">12m 34s</span>
            </div>
          </div>
        </Card>

        {/* Top Pages */}
        <Card title="Top Pages" subtitle="Most visited pages">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Dashboard</span>
              <span className="text-sm font-medium text-gray-900">12,456 views</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">User Profile</span>
              <span className="text-sm font-medium text-gray-900">8,234 views</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Settings</span>
              <span className="text-sm font-medium text-gray-900">5,678 views</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Analytics</span>
              <span className="text-sm font-medium text-gray-900">4,567 views</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity" subtitle="Latest system activities">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">New user registration: john.doe@example.com</span>
            <span className="ml-auto text-xs text-gray-400">2 minutes ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Payment received: $299.99</span>
            <span className="ml-auto text-xs text-gray-400">15 minutes ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">New feature accessed: Advanced Analytics</span>
            <span className="ml-auto text-xs text-gray-400">1 hour ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Support ticket created: #12345</span>
            <span className="ml-auto text-xs text-gray-400">2 hours ago</span>
          </div>
        </div>
      </Card>
    </div>
  )
} 