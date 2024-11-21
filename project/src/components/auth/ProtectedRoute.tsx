import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}