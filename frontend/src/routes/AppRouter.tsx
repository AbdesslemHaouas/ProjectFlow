import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import PendingPage from '@/pages/auth/PendingPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import UsersManagementPage from '@/pages/admin/UsersManagementPage';
import { useAuthStore } from '@/store/auth.store';

// Protects any route that requires login
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.status === 'pending') return <Navigate to="/pending" />;
  if (user?.status === 'suspended') return <Navigate to="/login" />;
  
  return <>{children}</>;
};

// Protects routes that require specific roles
const RoleRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode,
  allowedRoles: string[]
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.status === 'pending') return <Navigate to="/pending" />;
  if (!allowedRoles.includes(user?.role || '')) return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

const AppRouter = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pending" element={<PendingPage />} />

        {/* Protected routes - any logged in active user */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

        {/* Admin only routes */}
        <Route path="/admin/users" element={
          <RoleRoute allowedRoles={['admin']}>
            <UsersManagementPage />
          </RoleRoute>
        } />

        {/* Admin + Chef Projet routes */}
        <Route path="/projects" element={
          <RoleRoute allowedRoles={['admin', 'chef_projet']}>
            <div>Projects Page Coming Soon</div>
          </RoleRoute>
        } />

        <Route path="/sprints" element={
          <RoleRoute allowedRoles={['admin', 'chef_projet']}>
            <div>Sprints Page Coming Soon</div>
          </RoleRoute>
        } />

        <Route path="/backlog" element={
          <RoleRoute allowedRoles={['admin', 'chef_projet']}>
            <div>Backlog Page Coming Soon</div>
          </RoleRoute>
        } />

        {/* All logged in users */}
        <Route path="/tasks" element={
          <ProtectedRoute>
            <div>Tasks Page Coming Soon</div>
          </ProtectedRoute>
        } />

        <Route path="/conges" element={
          <ProtectedRoute>
            <div>Congés Page Coming Soon</div>
          </ProtectedRoute>
        } />

        <Route path="/notifications" element={
          <ProtectedRoute>
            <div>Notifications Page Coming Soon</div>
          </ProtectedRoute>
        } />

        {/* Admin + Chef Projet only */}
        <Route path="/teams" element={
          <RoleRoute allowedRoles={['admin', 'chef_projet']}>
            <div>Teams Page Coming Soon</div>
          </RoleRoute>
        } />

        <Route path="/aura" element={
          <RoleRoute allowedRoles={['admin', 'chef_projet']}>
            <div>Aura AI Page Coming Soon</div>
          </RoleRoute>
        } />

        <Route path="/reports" element={
          <RoleRoute allowedRoles={['admin', 'chef_projet', 'client']}>
            <div>Reports Page Coming Soon</div>
          </RoleRoute>
        } />

        {/* Default */}
        <Route path="/" element={
          isAuthenticated
            ? <Navigate to="/dashboard" />
            : <Navigate to="/login" />
        } />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/dashboard" />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;