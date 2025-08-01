import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <TopBar />
      <div className="pt-16 lg:ml-64">
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
} 