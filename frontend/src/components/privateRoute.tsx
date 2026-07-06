import { ReactNode } from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, allowedRoles }: { children: ReactNode; allowedRoles?: string[] }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading == true) {
    return <div className="spinner-border" role="status"></div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}
export default PrivateRoute;
