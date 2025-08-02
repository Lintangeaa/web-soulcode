import { FiMenu, FiChevronDown, FiLogOut } from 'react-icons/fi'
import { useLayoutStore, useAuthStore } from '@/stores'
import { Button, Avatar } from '@/shared/components'

export function TopBar() {
  const { openSidebar } = useLayoutStore()
  const { user, logout } = useAuthStore()

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm lg:left-64">
      <div className="flex justify-between items-center px-4 h-16 lg:px-6">
        <button
          onClick={openSidebar}
          className="p-2 text-gray-400 rounded-md lg:hidden hover:text-gray-600"
        >
          <FiMenu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <Avatar src={user?.avatar} alt={user?.name} size="sm" />
              <span className="hidden md:block font-medium">{user?.name || 'User'}</span>
              <FiChevronDown className="w-4 h-4 transition-transform duration-200" />
            </button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            icon={<FiLogOut className="w-4 h-4" />}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  )
} 