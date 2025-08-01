
import { Card, Button } from '@/shared/components'
import { useAuthStore } from '@/stores'
import { FiUser, FiLogOut, FiFileText, FiCalendar } from 'react-icons/fi'

export function UserDashboard() {
  const { user, logout } = useAuthStore()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Dashboard</h2>
          <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        <Button
          variant="outline"
          onClick={logout}
          icon={<FiLogOut className="w-4 h-4" />}
        >
          Logout
        </Button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <div className="flex items-center">
            <div className="p-3 text-blue-600 bg-blue-100 rounded-full">
              <FiFileText className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">My Documents</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 text-green-600 bg-green-100 rounded-full">
              <FiCalendar className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Tasks</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 text-purple-600 bg-purple-100 rounded-full">
              <FiUser className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Profile Status</p>
              <p className="text-2xl font-semibold text-gray-900">Complete</p>
            </div>
          </div>
        </Card>
      </div>

      {/* User Actions */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card title="My Profile" subtitle="Manage your account">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Update your profile information, change password, and manage preferences.
            </p>
            <div className="flex space-x-2">
              <Button variant="primary" icon={<FiUser className="w-4 h-4" />}>
                Edit Profile
              </Button>
              <Button variant="outline">
                Change Password
              </Button>
            </div>
          </div>
        </Card>

        <Card title="My Documents" subtitle="Manage your files">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              View and manage your documents, upload new files, and organize your content.
            </p>
            <div className="flex space-x-2">
              <Button variant="primary" icon={<FiFileText className="w-4 h-4" />}>
                View Documents
              </Button>
              <Button variant="outline">
                Upload File
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity" subtitle="Your latest actions">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Profile updated</span>
            <span className="ml-auto text-xs text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Document uploaded: report.pdf</span>
            <span className="ml-auto text-xs text-gray-400">1 day ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Task completed: Review documents</span>
            <span className="ml-auto text-xs text-gray-400">2 days ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Password changed</span>
            <span className="ml-auto text-xs text-gray-400">1 week ago</span>
          </div>
        </div>
      </Card>

      {/* User Info */}
      <Card title="Account Information" subtitle="Your account details">
        <div className="flex items-center space-x-4">
          <img
            className="w-16 h-16 rounded-full"
            src={user?.avatar || 'https://via.placeholder.com/64'}
            alt={user?.name}
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {user?.role}
            </span>
          </div>
        </div>
      </Card>

      {/* Limited Access Notice */}
      <Card title="Access Information" subtitle="Your current permissions">
        <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiUser className="w-5 h-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                User Account
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  You have access to basic user features. Contact an administrator 
                  if you need elevated permissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 