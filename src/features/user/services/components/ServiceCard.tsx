import { Card, Badge, Button } from '@/shared/components'
import type { Service } from '@/stores/user/servicesStore'
import { 
  FiGlobe, 
  FiMessageCircle, 
  FiCode, 
  FiSmartphone,
  FiUsers,
  FiShoppingCart
} from 'react-icons/fi'

interface ServiceCardProps {
  service: Service
  onOrder: (service: Service) => void
}

const getServiceIcon = (category: string) => {
  const iconMap = {
    'website': <FiGlobe className="w-6 h-6" />,
    'chatbot': <FiMessageCircle className="w-6 h-6" />,
    'api': <FiCode className="w-6 h-6" />,
    'mobile': <FiSmartphone className="w-6 h-6" />,
    'consultation': <FiUsers className="w-6 h-6" />
  }
  return iconMap[category as keyof typeof iconMap] || <FiGlobe className="w-6 h-6" />
}

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

export function ServiceCard({ service, onOrder }: ServiceCardProps) {
  return (
    <Card className="transition-shadow duration-200 hover:shadow-lg h-full flex flex-col">
      <div className="flex flex-col h-full space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 text-blue-600 bg-blue-100 rounded-lg">
              {getServiceIcon(service.category)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{service.name}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </div>
          <Badge variant="primary" size="sm">Available</Badge>
        </div>

        {/* Price */}
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {formatRupiah(service.price)}
          </div>
          <div className="text-sm text-gray-500">Duration: {service.duration}</div>
        </div>

        {/* Features */}
        <div className="space-y-2 flex-grow">
          <h4 className="text-sm font-medium text-gray-900">What's included:</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>{feature}</span>
              </li>
            ))}
            {service.features.length > 3 && (
              <li className="text-xs text-gray-500">
                +{service.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>

        {/* Action Button - Fixed at bottom */}
        <div className="mt-auto pt-4">
          <Button
            onClick={() => onOrder(service)}
            className="w-full"
            icon={<FiShoppingCart className="w-4 h-4" />}
          >
            Order Service
          </Button>
        </div>
      </div>
    </Card>
  )
} 