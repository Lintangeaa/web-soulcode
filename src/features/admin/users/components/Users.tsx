import { UsersHeader } from './UsersHeader'
import { UserTable } from './UserTable'
import { AddUserModal } from './AddUserModal'

export function Users() {
  return (
    <div className="space-y-6">
      <UsersHeader />
      <UserTable />
      <AddUserModal />
    </div>
  )
} 