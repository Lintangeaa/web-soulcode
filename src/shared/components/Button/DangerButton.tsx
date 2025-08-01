import React, { useState } from 'react'
import { BaseButton } from './BaseButton'
import { Modal } from '../Modal'


interface DangerButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  onConfirm: () => void
  confirmTitle?: string
  confirmMessage?: string
  confirmButtonText?: string
  cancelButtonText?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
}

export function DangerButton({
  onConfirm,
  confirmTitle = 'Confirm Action',
  confirmMessage = 'Are you sure you want to perform this action? This action cannot be undone.',
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  children,
  size = 'md',
  loading = false,
  icon,
  ...props
}: DangerButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setShowConfirm(true)
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
    } finally {
      setIsLoading(false)
      setShowConfirm(false)
    }
  }

  const handleCancel = () => {
    setShowConfirm(false)
  }

  return (
    <>
      <BaseButton
        variant="danger"
        size={size}
        loading={loading}
        icon={icon}
        onClick={handleClick}
        {...props}
      >
        {children}
      </BaseButton>

      <Modal
        isOpen={showConfirm}
        onClose={handleCancel}
        title={confirmTitle}
        size="sm"
        closeOnBackdrop={false}
      >
        <div className="space-y-4">
          <p className="text-gray-600 whitespace-pre-wrap">{confirmMessage}</p>
          <div className="flex justify-end space-x-3">
            <BaseButton
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {cancelButtonText}
            </BaseButton>
            <BaseButton
              variant="danger"
              onClick={handleConfirm}
              loading={isLoading}
            >
              {confirmButtonText}
            </BaseButton>
          </div>
        </div>
      </Modal>
    </>
  )
} 