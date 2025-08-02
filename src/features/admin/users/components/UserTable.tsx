import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useUserStore } from '@/stores'
import { Card, Button, DangerButton, Table, Badge } from '@/shared/components'

const getStatusBadge = (status: string) => {
  const statusVariantMap = {
    active: 'success' as const,
    inactive: 'secondary' as const,
    pending: 'warning' as const
  }
  return (
    <Badge variant={statusVariantMap[status as keyof typeof statusVariantMap] || 'secondary'} size="sm">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export function UserTable() {
  const { getFilteredUsers, deleteUser, statusFilter, setStatusFilter } = useUserStore()
  const users = getFilteredUsers()

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
  ]

  const tableColumns = [
    {
      key: 'user',
      header: 'User',
      sortable: true,
      render: (_value: unknown, row: Record<string, unknown>) => (
        <div className="flex items-center">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src={row.avatar as string}
            alt={row.name as string}
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.name as string}</div>
            <div className="text-sm text-gray-500">{row.email as string}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (value: unknown) => (
        <div className="text-sm text-gray-900 capitalize">{String(value)}</div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value: unknown) => getStatusBadge(String(value))
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      sortable: true,
      render: (value: unknown) => (
        <div className="text-sm text-gray-500">{String(value)}</div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '200px',
      render: (_value: unknown, row: Record<string, unknown>) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<FiEdit className="w-4 h-4" />}
            className="text-blue-600 hover:text-blue-900"
          >
            Edit
          </Button>
          <DangerButton
            size="sm"
            icon={<FiTrash2 className="w-4 h-4" />}
            onConfirm={() => deleteUser(row.id as string)}
            confirmTitle="Delete User"
            confirmMessage={`Are you sure you want to delete ${row.name as string}? This action cannot be undone.`}
            confirmButtonText="Delete User"
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </DangerButton>
        </div>
      )
    }
  ]

  return (
    <Card variant="elevated">
      <Table
        data={users}
        columns={tableColumns}
        searchable={true}
        searchPlaceholder="Search users..."
        searchKeys={['name', 'email', 'role']}
        pagination={true}
        pageSize={5}
        pageSizeOptions={[5, 10, 20, 50]}
        onRowClick={(user) => console.log('Clicked user:', user)}
        filters={[
          {
            key: 'status',
            label: 'Status Filter',
            options: statusOptions,
            value: statusFilter,
            onChange: setStatusFilter
          }
        ]}
      />
    </Card>
  )
} 