import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getToken } from '@/lib/api';
import { api } from '@/lib/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (!token) {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate('/login', { replace: true, state: { from: location.pathname } });
        return;
      }
      try {
        await api.getTransactions();
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate('/login', { replace: true, state: { from: location.pathname } });
        return;
      }
      setIsLoading(false);
    };
    checkAuth();
    // Listen for browser navigation (back/forward/direct URL)
    const handlePopState = () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate('/login', { replace: true });
    };
    window.addEventListener('popstate', handlePopState);
    // Listen for direct page load (F5, direct URL)
    if (!getToken()) {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate('/login', { replace: true });
    }
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, location.pathname]);

  useEffect(() => {
    const handleStorage = () => {
      const token = getToken();
      if (!token) {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate('/login', { replace: true });
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};
