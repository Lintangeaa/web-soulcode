import { useState } from 'react'
import { useUserStore } from '@/stores'
import { Modal, Input, EmailInput, Dropdown, Button } from '@/shared/components'

const roleOptions = [
  { value: 'user', label: 'User' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'admin', label: 'Admin' },
]

export function AddUserModal() {
  const { showAddUser, setShowAddUser } = useUserStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // TODO: Add user logic here
    console.log('Adding user:', formData)
    setShowAddUser(false)
    setFormData({ name: '', email: '', role: 'user' })
    setErrors({})
  }

  const handleClose = () => {
    setShowAddUser(false)
    setFormData({ name: '', email: '', role: 'user' })
    setErrors({})
  }

  return (
    <Modal
      isOpen={showAddUser}
      onClose={handleClose}
      title="Add New User"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          placeholder="Enter user name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />
        
        <EmailInput
          label="Email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
        
        <Dropdown
          label="Role"
          options={roleOptions}
          value={formData.role}
          onChange={(value) => setFormData({ ...formData, role: value as string })}
          placeholder="Select role"
        />
        
        <div className="flex justify-end pt-4 space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            Add User
          </Button>
        </div>
      </form>
    </Modal>
  )
} 