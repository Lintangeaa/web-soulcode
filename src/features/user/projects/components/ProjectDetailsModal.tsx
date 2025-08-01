import { Badge } from '@/shared/components'
import { FiFolder, FiGitBranch, FiExternalLink } from 'react-icons/fi'
import type { Project } from '@/stores/user/projectsStore'

interface ProjectDetailsModalProps {
  project: Project | null
  onClose: () => void
}

const getStatusBadge = (status: string) => {
  const statusMap = {
    'active': { variant: 'success' as const, text: 'Active' },
    'completed': { variant: 'primary' as const, text: 'Completed' },
    'on-hold': { variant: 'warning' as const, text: 'On Hold' },
    'planning': { variant: 'info' as const, text: 'Planning' }
  }
  const config = statusMap[status as keyof typeof statusMap]
  return <Badge variant={config.variant} size="sm">{config.text}</Badge>
}

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  if (!project) return null

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 text-blue-600 bg-blue-100 rounded-lg">
              <FiFolder className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.service}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="mb-2 font-medium text-gray-900">Description</h4>
            <p className="text-gray-600">{project.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                {getStatusBadge(project.status)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Budget</span>
                <span className="font-medium text-green-600">
                  {formatRupiah(project.budget)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Client</span>
                <span className="font-medium">{project.clientName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Start Date</span>
                <span className="font-medium">{project.startDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">End Date</span>
                <span className="font-medium">{project.endDate}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium text-gray-900">Team Members</h4>
                <div className="space-y-2">
                  {project.team.map((member: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex justify-center items-center w-6 h-6 text-xs text-gray-600 bg-gray-300 rounded-full">
                        {member.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-900">{member}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {project.repository && (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <FiGitBranch className="w-4 h-4" />
                    <span className="text-sm">View Repository</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    <span className="text-sm">View Live</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 