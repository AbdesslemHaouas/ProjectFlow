import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.status === 'pending') return <Navigate to="/pending" />;
  if (user?.status === 'suspended') return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;