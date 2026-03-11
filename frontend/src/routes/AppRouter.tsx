import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import ProtectedRoute from '@/guards/ProtectedRoute';
import RoleRoute from '@/guards/RoleRoute';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import PendingPage from '@/pages/auth/PendingPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import UsersManagementPage from '@/pages/admin/UsersManagementPage';
import NotificationsPage from '@/pages/notifications/NotificationsPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import ProjectsPage from '@/pages/projects/ProjectsPage';
import TasksPage from '@/pages/tasks/TasksPage';
import SprintsPage from '@/pages/sprints/SprintsPage';
import BacklogPage from '@/pages/backlog/BacklogPage';
import TeamsPage from '@/pages/teams/TeamsPage';
import CongesPage from '@/pages/conges/CongesPage';
import AuraPage from '@/pages/aura/AuraPage';
import ReportsPage from '@/pages/reports/ReportsPage';

const AppRouter = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pending" element={<PendingPage />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />

        {/* Admin only */}
        <Route path="/admin/users" element={
          <RoleRoute allowedRoles={['admin']}><UsersManagementPage /></RoleRoute>
        } />

        {/* Admin + Chef Projet + Client */}
        <Route path="/projects" element={
          <RoleRoute allowedRoles={['admin', 'chef_projet', 'client']}><ProjectsPage /></RoleRoute>
        } />

        {/* Admin + Chef Projet */}
        <Route path="/sprints" element={
          <RoleRoute allowedRoles={['admin', 'chef_projet']}><SprintsPage /></RoleRoute>
        } />
        <Route path="/backlog" element={
          <RoleRoute allowedRoles={['admin', 'chef_projet']}><BacklogPage /></RoleRoute>
        } />
        <Route path="/teams" element={
          <RoleRoute allowedRoles={['admin', 'chef_projet']}><TeamsPage /></RoleRoute>
        } />
        <Route path="/aura" element={
          <RoleRoute allowedRoles={['admin', 'chef_projet']}><AuraPage /></RoleRoute>
        } />

        {/* All logged in users */}
        <Route path="/tasks" element={
          <ProtectedRoute><TasksPage /></ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute><SettingsPage /></ProtectedRoute>
        } />
        <Route path="/conges" element={
          <ProtectedRoute><CongesPage /></ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute><NotificationsPage /></ProtectedRoute>
        } />

        {/* Admin + Chef Projet + Client */}
        <Route path="/reports" element={
          <RoleRoute allowedRoles={['admin', 'chef_projet', 'client']}><ReportsPage /></RoleRoute>
        } />

        {/* Default */}
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/dashboard" />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;