import { useState } from 'react'
import { FiUser } from 'react-icons/fi'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  if (!src || imageError) {
    return (
      <div className={`flex justify-center items-center bg-gray-300 rounded-full ${sizeClasses[size]} ${className}`}>
        <FiUser className={`text-gray-600 ${iconSizes[size]}`} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt || 'Avatar'}
      className={`object-cover rounded-full ${sizeClasses[size]} ${className}`}
      onError={() => setImageError(true)}
    />
  )
} 