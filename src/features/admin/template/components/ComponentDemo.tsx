import { useState } from 'react'
import { 
  Button, 
  DangerButton, 
  Input, 
  SearchInput, 
  EmailInput, 
  PasswordInput,
  Card,
  Table,
  Dropdown,
  Modal,
  Badge
} from '@/shared/components'
import { 
  FiUser, 
  FiEdit, 
  FiTrash2, 
  FiEye 
} from 'react-icons/fi'

interface User extends Record<string, unknown> {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
}

export function ComponentDemo() {
  const [showModal, setShowModal] = useState(false)
  const [selectedDropdown, setSelectedDropdown] = useState<string>('')
  const [selectedMultiDropdown, setSelectedMultiDropdown] = useState<string[]>([])

  // Sample data for table
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2024-01-13' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-12' },
  ]

  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ]

  const tableColumns = [
    { key: 'id', header: 'ID', sortable: true, width: '80px' },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { 
      key: 'role', 
      header: 'Role', 
      sortable: true,
      render: (value: unknown) => {
        const roleVariantMap = {
          'Admin': 'danger' as const,
          'Editor': 'info' as const,
          'User': 'secondary' as const
        }
        return (
          <Badge variant={roleVariantMap[value as keyof typeof roleVariantMap] || 'secondary'} size="sm">
            {String(value)}
          </Badge>
        )
      }
    },
    { 
      key: 'status', 
      header: 'Status', 
      sortable: true,
      render: (value: unknown) => {
        const statusVariantMap = {
          'active': 'success' as const,
          'inactive': 'secondary' as const
        }
        return (
          <Badge variant={statusVariantMap[value as keyof typeof statusVariantMap] || 'secondary'} size="sm">
            {String(value)}
          </Badge>
        )
      }
    },
    { key: 'lastLogin', header: 'Last Login', sortable: true },
    {
      key: 'actions',
      header: 'Actions',
      width: '150px',
      render: () => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <FiEye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <FiEdit className="w-4 h-4" />
          </Button>
          <DangerButton
            size="sm"
            onConfirm={() => console.log('User deleted')}
            confirmTitle="Delete User"
            confirmMessage="Are you sure you want to delete this user?"
          >
            <FiTrash2 className="w-4 h-4" />
          </DangerButton>
        </div>
      )
    }
  ]

  return (
    <div className="p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Component Library</h1>
        <p className="mt-2 text-gray-600">All available reusable components with examples</p>
      </div>

      {/* Buttons */}
      <Card title="Button Components" subtitle="Different button variants and sizes">
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900">Button Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <DangerButton
                onConfirm={() => console.log('Confirmed')}
                confirmTitle="Confirm Action"
                confirmMessage="Are you sure?"
              >
                Danger
              </DangerButton>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900">Button Sizes</h3>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Inputs */}
      <Card title="Input Components" subtitle="Specialized input variants with built-in functionality">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Basic Input"
            placeholder="Enter text..."
            leftIcon={<FiUser className="w-5 h-5" />}
          />
          <SearchInput
            label="Search Input"
            placeholder="Search..."
            onSearch={(value) => console.log('Searching:', value)}
          />
          <EmailInput
            label="Email Input"
            placeholder="Enter email..."
          />
          <PasswordInput
            label="Password Input"
            placeholder="Enter password..."
          />
        </div>
      </Card>

      {/* Dropdown */}
      <Card title="Dropdown Components" subtitle="Single and multi-select dropdowns">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Dropdown
            label="Single Select"
            options={dropdownOptions}
            value={selectedDropdown}
            onChange={(value) => setSelectedDropdown(value as string)}
            placeholder="Select an option"
          />
          <Dropdown
            label="Multi Select"
            options={dropdownOptions}
            value={selectedMultiDropdown}
            onChange={(value) => setSelectedMultiDropdown(value as string[])}
            multiple={true}
            searchable={true}
            placeholder="Select options"
          />
        </div>
      </Card>

      {/* Badge */}
      <Card title="Badge Components" subtitle="Status indicators and labels with different variants">
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900">Badge Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900">Badge Sizes</h3>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="primary" size="sm">Small</Badge>
              <Badge variant="primary" size="md">Medium</Badge>
              <Badge variant="primary" size="lg">Large</Badge>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900">Usage Examples</h3>
            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge variant="success">Active</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="danger">Inactive</Badge>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-600">Priority:</span>
                <Badge variant="danger" size="sm">High</Badge>
                <Badge variant="warning" size="sm">Medium</Badge>
                <Badge variant="success" size="sm">Low</Badge>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-600">Categories:</span>
                <Badge variant="primary">Technology</Badge>
                <Badge variant="info">Design</Badge>
                <Badge variant="secondary">Marketing</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Modal */}
      <Card title="Modal Component" subtitle="Modal dialogs with different sizes">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button onClick={() => setShowModal(true)}>
              Open Modal
            </Button>
          </div>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Sample Modal"
            size="md"
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                This is a sample modal with some content. You can put any components here.
              </p>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowModal(false)}>
                  Confirm
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </Card>

      {/* Table Demo */}
      <Card title="Table Component" subtitle="Advanced table with search, sort, and pagination">
        <Table
          data={users}
          columns={tableColumns}
          searchable={true}
          searchPlaceholder="Search users..."
          searchKeys={['name', 'email', 'role']}
          pagination={true}
          pageSize={3}
          onRowClick={(user) => console.log('Clicked user:', user)}
        />
      </Card>

      {/* Usage Examples */}
      <Card title="Usage Examples" subtitle="Common patterns and combinations">
        <div className="space-y-6">
          {/* Form Example */}
          <div className="p-6 rounded-lg border border-gray-200">
            <h3 className="mb-4 text-lg font-medium text-gray-900">User Registration Form</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                leftIcon={<FiUser className="w-5 h-5" />}
              />
              <EmailInput
                label="Email Address"
                placeholder="Enter your email"
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
              />
              <Dropdown
                label="Role"
                options={[
                  { value: 'user', label: 'User' },
                  { value: 'admin', label: 'Admin' },
                  { value: 'editor', label: 'Editor' },
                ]}
                value=""
                onChange={() => {}}
                placeholder="Select role"
              />
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <Button variant="outline">Cancel</Button>
              <Button>Create User</Button>
            </div>
          </div>

          {/* Dashboard Card Example */}
          <div className="p-6 rounded-lg border border-gray-200">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Dashboard Card</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-blue-600">Total Users</p>
                    <p className="text-2xl font-bold text-blue-900">1,234</p>
                  </div>
                  <FiUser className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-green-600">Active Users</p>
                    <p className="text-2xl font-bold text-green-900">1,100</p>
                  </div>
                  <FiUser className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-purple-600">New Users</p>
                    <p className="text-2xl font-bold text-purple-900">45</p>
                  </div>
                  <FiUser className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 