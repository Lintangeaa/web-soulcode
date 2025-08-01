import { 
  FiBarChart, 
  FiUsers, 
  FiTrendingUp, 
  FiSettings, 
  FiX,
  FiGrid,
  FiEye,
  FiBox,
  FiChevronDown,
  FiChevronRight,
  FiFolder,
  FiServer
} from 'react-icons/fi'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useLayoutStore, useAuthStore } from '@/stores'

interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  path?: string
  children?: MenuItem[]
}

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { sidebarOpen, closeSidebar } = useLayoutStore()
  const { user } = useAuthStore()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  // Admin menu items
  const adminMenuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: FiBarChart, path: '/admin/dashboard' },
    { id: 'users', label: 'User Management', icon: FiUsers, path: '/admin/users' },
    { id: 'analytics', label: 'Analytics', icon: FiTrendingUp, path: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: FiSettings, path: '/admin/settings' },
    { 
      id: 'template', 
      label: 'Template', 
      icon: FiGrid,
      children: [
        { id: 'template-icons', label: 'Icons', icon: FiEye, path: '/admin/template/icons' },
        { id: 'template-components', label: 'Components', icon: FiBox, path: '/admin/template/components' },
      ]
    },
  ]

  // User menu items
  const userMenuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: FiBarChart, path: '/user/dashboard' },
    { id: 'services', label: 'Services', icon: FiServer, path: '/user/services' },
    { id: 'projects', label: 'Projects', icon: FiFolder, path: '/user/projects' },
  ]

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems

  const handleMenuClick = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path)
      // Close sidebar on mobile after navigation
      if (window.innerWidth < 1024) {
        closeSidebar()
      }
    } else if (item.children) {
      // Toggle expansion for items with children
      setExpandedItems(prev => {
        const newSet = new Set(prev)
        if (newSet.has(item.id)) {
          newSet.delete(item.id)
        } else {
          newSet.add(item.id)
        }
        return newSet
      })
    }
  }

  const isActive = (item: MenuItem): boolean => {
    if (item.path) {
      return location.pathname === item.path
    }
    if (item.children) {
      return item.children.some(child => location.pathname === child.path)
    }
    return false
  }

  const isExpanded = (itemId: string): boolean => {
    return expandedItems.has(itemId)
  }

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const IconComponent = item.icon
    const active = isActive(item)
    const expanded = isExpanded(item.id)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id}>
        <button
          onClick={() => handleMenuClick(item)}
          className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
            level > 0 ? 'pl-12' : ''
          } ${
            active
              ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <IconComponent className="mr-3 text-lg" />
          <span className="flex-1 font-medium">{item.label}</span>
          {hasChildren && (
            <div className="ml-auto">
              {expanded ? (
                <FiChevronDown className="w-4 h-4" />
              ) : (
                <FiChevronRight className="w-4 h-4" />
              )}
            </div>
          )}
        </button>
        
        {/* Render children if expanded */}
        {hasChildren && expanded && (
          <div className="bg-gray-50">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex justify-between items-center px-6 h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">{user?.role === 'admin' ? 'Admin Panel' : 'Soulcode'}</h1>
        <button
          onClick={closeSidebar}
          className="p-2 text-gray-400 rounded-md lg:hidden hover:text-gray-600"
        >
          <FiX className="w-6 h-6" />
        </button>
      </div>

      <nav className="mt-6">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>
    </div>
  )
} 