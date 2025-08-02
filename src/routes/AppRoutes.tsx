import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/layouts'
import { LoginForm, RegisterForm, ProtectedRoute, RoleRedirect } from '@/features/auth'
import { 
  AdminDashboard, 
  Analytics, 
  IconDemo, 
  ComponentDemo, 
  Users 
} from '@/features/admin'
import { Projects, Services, UserDashboard } from '@/features/user'
import { SettingsContent } from '@/features/admin/dashboard/components/SettingsContent'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Protected admin routes */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<SettingsContent />} />
          <Route path="template/icons" element={<IconDemo />} />
          <Route path="template/components" element={<ComponentDemo />} />
        </Route>

        {/* Protected user routes */}
        <Route path="/user" element={
          <ProtectedRoute requiredRole="user">
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
        </Route>

        {/* Catch-all routes with role-based redirect */}
        <Route path="/" element={<RoleRedirect />} />
        <Route path="/dashboard" element={<RoleRedirect />} />
        <Route path="*" element={<RoleRedirect />} />
      </Routes>
    </BrowserRouter>
  )
} 