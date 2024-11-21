import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../auth/AuthForm';
import { useAuthStore } from '../../store/auth';

export function Auth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <AuthForm />
    </div>
  );
}