
import { useAuthStore } from '@/stores'
import { Card, Button, Avatar } from '@/shared/components'
import { 
  FiUser, 
  FiFileText, 
  FiBell, 
  FiMail,
  FiCalendar,
  FiTrendingUp
} from 'react-icons/fi'

export function UserDashboard() {
  const { user } = useAuthStore()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="text-sm text-gray-500">Welcome back, {user?.name}!</div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 text-blue-600 bg-blue-100 rounded-full">
              <FiFileText className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 text-green-600 bg-green-100 rounded-full">
              <FiTrendingUp className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Projects</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 text-yellow-600 bg-yellow-100 rounded-full">
              <FiBell className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Notifications</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 text-purple-600 bg-purple-100 rounded-full">
              <FiCalendar className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasks</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Quick Actions" subtitle="Common tasks">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Access frequently used features and perform common tasks.
            </p>
            <div className="flex space-x-2">
              <Button variant="primary" icon={<FiMail className="w-4 h-4" />}>
                Send Message
              </Button>
              <Button variant="outline">
                View Calendar
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Settings" subtitle="Account preferences">
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
          <Avatar src={user?.avatar} alt={user?.name} size="lg" />
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