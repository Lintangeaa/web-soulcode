import { FiMenu, FiChevronDown, FiLogOut } from 'react-icons/fi'
import { useLayoutStore, useAuthStore } from '@/stores'
import { Button } from '@/shared/components'

export function TopBar() {
  const { openSidebar } = useLayoutStore()
  const { user, logout } = useAuthStore()

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-4 h-16 lg:px-6">
        <button
          onClick={openSidebar}
          className="p-2 text-gray-400 rounded-md lg:hidden hover:text-gray-600"
        >
          <FiMenu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <div className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-full">
                <img
                  src={user?.avatar || 'https://via.placeholder.com/32'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <span className="hidden md:block">{user?.name || 'User'}</span>
              <FiChevronDown className="w-4 h-4" />
            </button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            icon={<FiLogOut className="w-4 h-4" />}
            className="text-gray-600 hover:text-gray-900"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
} 