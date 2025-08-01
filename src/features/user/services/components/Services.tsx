import { useEffect } from 'react'
import { Card } from '@/shared/components'
import { useServicesStore, type Service } from '@/stores/user/servicesStore'
import { useProjectsStore } from '@/stores/user/projectsStore'
import { ServiceCard } from './ServiceCard'

export function Services() {
  const { services, isLoading, isInitialized, fetchServices } = useServicesStore()
  const { addProject, setShowAddProject } = useProjectsStore()

  useEffect(() => {
    if (!isInitialized) {
      fetchServices()
    }
  }, [isInitialized, fetchServices])

  const handleOrderService = (service: Service) => {
    // Create a new project from the service
    const newProject = {
      name: `${service.name} Project`,
      description: service.description,
      service: service.name,
      clientName: 'Your Company',
      budget: service.price,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'medium' as const,
      team: [],
      status: 'planning' as const,
      progress: 0,
      repository: '',
      liveUrl: ''
    }
    
    addProject(newProject)
    setShowAddProject(false)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Soulcode Services</h2>
            <p className="text-sm text-gray-600">Choose from our professional development services</p>
          </div>
        </div>
        <Card className="py-12 text-center">
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full border-b-2 border-blue-600 animate-spin"></div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Soulcode Services</h2>
          <p className="text-sm text-gray-600">Choose from our professional development services</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onOrder={handleOrderService}
          />
        ))}
      </div>

      {/* Info Section */}
      <Card title="How it works" subtitle="Simple process to get started">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="flex justify-center items-center mx-auto mb-3 w-12 h-12 text-blue-600 bg-blue-100 rounded-full">
              <span className="font-bold">1</span>
            </div>
            <h4 className="font-medium text-gray-900">Choose Service</h4>
            <p className="text-sm text-gray-600">Select the service that fits your needs</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center items-center mx-auto mb-3 w-12 h-12 text-green-600 bg-green-100 rounded-full">
              <span className="font-bold">2</span>
            </div>
            <h4 className="font-medium text-gray-900">Order & Pay</h4>
            <p className="text-sm text-gray-600">Place your order and complete payment</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center items-center mx-auto mb-3 w-12 h-12 text-purple-600 bg-purple-100 rounded-full">
              <span className="font-bold">3</span>
            </div>
            <h4 className="font-medium text-gray-900">Track Progress</h4>
            <p className="text-sm text-gray-600">Monitor your project in the Projects section</p>
          </div>
        </div>
      </Card>
    </div>
  )
} 