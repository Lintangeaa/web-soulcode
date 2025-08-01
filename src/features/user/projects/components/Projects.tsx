import { useEffect, useState } from 'react'
import { Card, Badge, Table, Button } from '@/shared/components'
import { useProjectsStore, type Project } from '@/stores/user/projectsStore'
import { AddProjectForm } from './AddProjectForm'
import { ProjectDetailsModal } from './ProjectDetailsModal'
import { 
  FiFolder, 
  FiExternalLink, 
  FiGitBranch,
  FiEye,
  FiPlus
} from 'react-icons/fi'

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

export function Projects() {
  const { 
    projects,
    isLoading, 
    isInitialized,
    fetchProjects 
  } = useProjectsStore()
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!isInitialized) {
      fetchProjects()
    }
  }, [isInitialized, fetchProjects])

  const tableColumns = [
    {
      key: 'name',
      header: 'Project Name',
      sortable: true,
      render: (value: unknown, row: Project) => (
        <div className="flex items-center space-x-3">
          <div className="p-2 text-blue-600 bg-blue-100 rounded-lg">
            <FiFolder className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{String(value)}</div>
            <div className="text-sm text-gray-500">{row.description}</div>
          </div>
        </div>
      )
    },
    {
      key: 'service',
      header: 'Service',
      sortable: true,
      render: (value: unknown) => (
        <span className="text-sm text-gray-900">{value as string}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value: unknown) => getStatusBadge(value as string)
    },
    {
      key: 'progress',
      header: 'Progress',
      sortable: true,
      render: (value: unknown) => (
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">{String(value)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${value}%` }}
            ></div>
          </div>
        </div>
      )
    },
    {
      key: 'budget',
      header: 'Budget',
      sortable: true,
      render: (value: unknown) => (
        <span className="text-sm font-medium text-green-600">
          {formatRupiah(value as number)}
        </span>
      )
    },
    {
      key: 'team',
      header: 'Team',
      sortable: false,
      render: (value: unknown) => (
        <div className="flex -space-x-2">
          {(value as string[]).slice(0, 3).map((member, index) => (
            <div
              key={index}
              className="flex justify-center items-center w-6 h-6 text-xs text-gray-600 bg-gray-300 rounded-full"
              title={member}
            >
              {member.charAt(0)}
            </div>
          ))}
          {(value as string[]).length > 3 && (
            <div className="flex justify-center items-center w-6 h-6 text-xs text-gray-500 bg-gray-200 rounded-full">
              +{(value as string[]).length - 3}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '120px',
      render: (_value: unknown, row: Project) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedProject(row)}
            className="p-1 text-gray-400 hover:text-gray-600"
            title="View Details"
          >
            <FiEye className="w-4 h-4" />
          </button>
          {row.repository && (
            <a
              href={row.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-gray-400 hover:text-gray-600"
              title="View Repository"
            >
              <FiGitBranch className="w-4 h-4" />
            </a>
          )}
          {row.liveUrl && (
            <a
              href={row.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-gray-400 hover:text-gray-600"
              title="View Live"
            >
              <FiExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
          <p className="text-sm text-gray-600">Track your Soulcode projects and development progress</p>
        </div>
        <Button
          onClick={() => useProjectsStore.getState().setShowAddProject(true)}
          icon={<FiPlus className="w-4 h-4" />}
        >
          Add Project
        </Button>
      </div>

      {/* Projects Table */}
      <Card>
        <Table
          data={projects}
          columns={tableColumns}
          searchable={true}
          searchPlaceholder="Search projects..."
          searchKeys={['name', 'description', 'service', 'clientName']}
          pagination={true}
          pageSize={5}
          loading={isLoading}
          onRowClick={(project) => setSelectedProject(project)}
        />
      </Card>

      {/* Separate Components */}
      <AddProjectForm />
      <ProjectDetailsModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  )
} 