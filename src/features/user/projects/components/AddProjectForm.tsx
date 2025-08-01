import { useEffect } from 'react'
import { Modal, Button, BaseForm, FormField } from '@/shared/components'
import { useProjectsStore } from '@/stores/user/projectsStore'
import { useServicesStore } from '@/stores/user/servicesStore'
import { FiDollarSign, FiCalendar } from 'react-icons/fi'

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

export function AddProjectForm() {
  const { showAddProject, setShowAddProject, addProject } = useProjectsStore()
  const { services, isInitialized, fetchServices } = useServicesStore()

  useEffect(() => {
    if (!isInitialized) {
      fetchServices()
    }
  }, [isInitialized, fetchServices])

  const serviceOptions = services.map(service => ({
    value: service.name,
    label: `${service.name} - ${formatRupiah(service.price)}`
  }))

  const handleSubmit = (values: Record<string, unknown>) => {
    const newProject = {
      ...values,
      budget: parseInt(values.budget as string),
      status: 'planning' as const,
      progress: 0,
      repository: '',
      liveUrl: ''
    }
    addProject(newProject)
    setShowAddProject(false)
  }

  const handleClose = () => {
    setShowAddProject(false)
  }

  const formConfig = {
    name: {
      initialValue: '',
      required: true,
      validation: (value: unknown) => {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Project name is required'
        }
        return undefined
      }
    },
    description: {
      initialValue: '',
      required: true,
      validation: (value: unknown) => {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Description is required'
        }
        return undefined
      }
    },
    service: {
      initialValue: '',
      required: true,
      validation: (value: unknown) => {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Service is required'
        }
        return undefined
      }
    },
    clientName: {
      initialValue: '',
      required: true,
      validation: (value: unknown) => {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Client name is required'
        }
        return undefined
      }
    },
    budget: {
      initialValue: '',
      required: true,
      validation: (value: unknown) => {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Budget is required'
        }
        const numValue = parseInt(value as string)
        if (isNaN(numValue) || numValue <= 0) {
          return 'Budget must be a positive number'
        }
        return undefined
      }
    },
    startDate: {
      initialValue: '',
      required: true,
      validation: (value: unknown) => {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'Start date is required'
        }
        return undefined
      }
    },
    endDate: {
      initialValue: '',
      required: true,
      validation: (value: unknown) => {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          return 'End date is required'
        }
        return undefined
      }
    },
    priority: {
      initialValue: 'medium',
      required: true
    }
  }

  return (
    <Modal
      isOpen={showAddProject}
      onClose={handleClose}
      title="Add New Project"
      size="lg"
    >
      <BaseForm
        initialValues={formConfig}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                name="name"
                label="Project Name"
                type="text"
                placeholder="Enter project name"
                value={values.name}
                error={errors.name}
                touched={touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <FormField
                name="clientName"
                label="Client Name"
                type="text"
                placeholder="Enter client name"
                value={values.clientName}
                error={errors.clientName}
                touched={touched.clientName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <div className="md:col-span-2">
                <FormField
                  name="description"
                  label="Description"
                  type="textarea"
                  placeholder="Enter project description"
                  value={values.description}
                  error={errors.description}
                  touched={touched.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <FormField
                name="service"
                label="Service"
                type="dropdown"
                placeholder="Select service"
                value={values.service}
                error={errors.service}
                touched={touched.service}
                onChange={handleChange}
                onBlur={handleBlur}
                options={serviceOptions}
                required
              />
              <FormField
                name="budget"
                label="Budget (IDR)"
                type="number"
                placeholder="Enter budget amount"
                value={values.budget}
                error={errors.budget}
                touched={touched.budget}
                onChange={handleChange}
                onBlur={handleBlur}
                leftIcon={<FiDollarSign className="w-4 h-4" />}
                required
              />
              <FormField
                name="startDate"
                label="Start Date"
                type="date"
                value={values.startDate}
                error={errors.startDate}
                touched={touched.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                leftIcon={<FiCalendar className="w-4 h-4" />}
                required
              />
              <FormField
                name="endDate"
                label="End Date"
                type="date"
                value={values.endDate}
                error={errors.endDate}
                touched={touched.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
                leftIcon={<FiCalendar className="w-4 h-4" />}
                required
              />
              <FormField
                name="priority"
                label="Priority"
                type="dropdown"
                placeholder="Select priority"
                value={values.priority}
                error={errors.priority}
                touched={touched.priority}
                onChange={handleChange}
                onBlur={handleBlur}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' }
                ]}
                required
              />
            </div>
            
            <div className="flex justify-end pt-4 space-x-3">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Project'}
              </Button>
            </div>
          </div>
        )}
      </BaseForm>
    </Modal>
  )
} 