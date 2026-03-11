import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

const RoleRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.status === 'pending') return <Navigate to="/pending" />;
  if (!allowedRoles.includes(user?.role || '')) return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

export default RoleRoute;