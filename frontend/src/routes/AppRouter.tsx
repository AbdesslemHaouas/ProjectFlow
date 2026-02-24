import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import DashboardPage from '@/pages/Dashboard';
import { useAuthStore } from '@/store/auth.store';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRouter = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          isAuthenticated 
            ? <Navigate to="/dashboard" /> 
            : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;