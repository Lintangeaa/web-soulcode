import { FiPlus } from 'react-icons/fi'
import { useUserStore } from '@/stores'
import { Button } from '@/shared/components/Button'

export function UsersHeader() {
  const { setShowAddUser } = useUserStore()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Users</h2>
        <p className="text-sm text-gray-600">Manage your application users</p>
      </div>
      <Button
        onClick={() => setShowAddUser(true)}
        variant="primary"
        icon={<FiPlus className="w-5 h-5" />}
      >
        Add User
      </Button>
    </div>
  )
} 