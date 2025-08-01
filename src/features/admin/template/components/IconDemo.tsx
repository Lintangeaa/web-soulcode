import { 
  FiHome, 
  FiUser, 
  FiSettings, 
  FiMail, 
  FiHeart, 
  FiStar,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiEdit,
  FiTrash2,
  FiEye,
  FiDownload,
  FiUpload,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiClock,
  FiPhone,
  FiGlobe,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiInstagram
} from 'react-icons/fi'
import { Card } from '@/shared/components'

export function IconDemo() {
  return (
    <div className="p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Icon Library</h1>
        <p className="mt-2 text-gray-600">React Icons - Feather Icons collection</p>
      </div>

      {/* Navigation Icons */}
      <Card title="Navigation Icons" subtitle="Common navigation and UI icons">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiHome className="mb-2 w-6 h-6 text-blue-500" />
            <span className="text-xs text-gray-600">Home</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiUser className="mb-2 w-6 h-6 text-green-500" />
            <span className="text-xs text-gray-600">User</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiSettings className="mb-2 w-6 h-6 text-purple-500" />
            <span className="text-xs text-gray-600">Settings</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiMail className="mb-2 w-6 h-6 text-red-500" />
            <span className="text-xs text-gray-600">Mail</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiSearch className="mb-2 w-6 h-6 text-gray-500" />
            <span className="text-xs text-gray-600">Search</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiFilter className="mb-2 w-6 h-6 text-orange-500" />
            <span className="text-xs text-gray-600">Filter</span>
          </div>
        </div>
      </Card>

      {/* Status Icons */}
      <Card title="Status Icons" subtitle="Status and feedback icons">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiCheckCircle className="mb-2 w-6 h-6 text-green-500" />
            <span className="text-xs text-gray-600">Success</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiAlertCircle className="mb-2 w-6 h-6 text-red-500" />
            <span className="text-xs text-gray-600">Error</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiInfo className="mb-2 w-6 h-6 text-blue-500" />
            <span className="text-xs text-gray-600">Info</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiStar className="mb-2 w-6 h-6 text-yellow-500" />
            <span className="text-xs text-gray-600">Star</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiHeart className="mb-2 w-6 h-6 text-pink-500" />
            <span className="text-xs text-gray-600">Heart</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiClock className="mb-2 w-6 h-6 text-gray-500" />
            <span className="text-xs text-gray-600">Clock</span>
          </div>
        </div>
      </Card>

      {/* Action Icons */}
      <Card title="Action Icons" subtitle="Common action and operation icons">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiEdit className="mb-2 w-6 h-6 text-blue-500" />
            <span className="text-xs text-gray-600">Edit</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiTrash2 className="mb-2 w-6 h-6 text-red-500" />
            <span className="text-xs text-gray-600">Delete</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiEye className="mb-2 w-6 h-6 text-green-500" />
            <span className="text-xs text-gray-600">View</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiDownload className="mb-2 w-6 h-6 text-purple-500" />
            <span className="text-xs text-gray-600">Download</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiUpload className="mb-2 w-6 h-6 text-orange-500" />
            <span className="text-xs text-gray-600">Upload</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiCalendar className="mb-2 w-6 h-6 text-indigo-500" />
            <span className="text-xs text-gray-600">Calendar</span>
          </div>
        </div>
      </Card>

      {/* Social Icons */}
      <Card title="Social Icons" subtitle="Social media and communication icons">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiGithub className="mb-2 w-6 h-6 text-gray-700" />
            <span className="text-xs text-gray-600">GitHub</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiTwitter className="mb-2 w-6 h-6 text-blue-400" />
            <span className="text-xs text-gray-600">Twitter</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiLinkedin className="mb-2 w-6 h-6 text-blue-600" />
            <span className="text-xs text-gray-600">LinkedIn</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiInstagram className="mb-2 w-6 h-6 text-pink-500" />
            <span className="text-xs text-gray-600">Instagram</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiGlobe className="mb-2 w-6 h-6 text-green-500" />
            <span className="text-xs text-gray-600">Website</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <FiPhone className="mb-2 w-6 h-6 text-blue-500" />
            <span className="text-xs text-gray-600">Phone</span>
          </div>
        </div>
      </Card>

      {/* Usage Examples */}
      <Card title="Icon Usage Examples" subtitle="How to use icons in your components">
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="mb-2 text-lg font-medium text-blue-900">Button with Icon</h3>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <FiUser className="mr-2 w-4 h-4" />
                Add User
              </button>
              <button className="flex items-center px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50">
                <FiTrash2 className="mr-2 w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="mb-2 text-lg font-medium text-green-900">Status Indicators</h3>
            <div className="flex space-x-4">
              <div className="flex items-center text-green-600">
                <FiCheckCircle className="mr-2 w-5 h-5" />
                <span>Active</span>
              </div>
              <div className="flex items-center text-red-600">
                <FiAlertCircle className="mr-2 w-5 h-5" />
                <span>Error</span>
              </div>
              <div className="flex items-center text-blue-600">
                <FiInfo className="mr-2 w-5 h-5" />
                <span>Info</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="mb-2 text-lg font-medium text-purple-900">Navigation Menu</h3>
            <div className="space-y-2">
              <div className="flex items-center p-2 text-gray-700 rounded-md hover:bg-white">
                <FiHome className="mr-3 w-5 h-5" />
                <span>Dashboard</span>
              </div>
              <div className="flex items-center p-2 text-gray-700 rounded-md hover:bg-white">
                <FiUser className="mr-3 w-5 h-5" />
                <span>Users</span>
              </div>
              <div className="flex items-center p-2 text-gray-700 rounded-md hover:bg-white">
                <FiSettings className="mr-3 w-5 h-5" />
                <span>Settings</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 