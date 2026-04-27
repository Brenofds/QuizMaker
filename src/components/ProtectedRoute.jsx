// src/components/ProtectedRoute.jsx
// Protege rotas verificando a identidade armazenada no localStorage.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from './ui';

export default function ProtectedRoute({ children, role }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size={36} />
      </div>
    );
  }

  // Not identified yet → entry page
  if (!user) return <Navigate to="/" replace />;

  // Wrong role → entry page to re-select
  if (role && profile?.role !== role) return <Navigate to="/" replace />;

  return children;
}
