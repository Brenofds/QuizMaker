// src/contexts/AuthContext.jsx
// Identidade baseada em localStorage — sem Firebase Auth.
// Mantém a mesma API pública (useAuth) para compatibilidade com os demais componentes.

import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

function generateId() {
  return `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export function AuthProvider({ children }) {
  const [identity, setIdentity] = useState(() => {
    try {
      const raw = localStorage.getItem('qm_identity');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const enter = useCallback((name, role) => {
    // Preserve the ID if it already exists (same device = same "teacher")
    let id;
    try {
      const raw = localStorage.getItem('qm_identity');
      id = raw ? JSON.parse(raw).id : generateId();
    } catch {
      id = generateId();
    }
    const newIdentity = { id, name: name.trim(), role };
    localStorage.setItem('qm_identity', JSON.stringify(newIdentity));
    setIdentity(newIdentity);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('qm_identity');
    setIdentity(null);
  }, []);

  // Public API — compatible with the original useAuth shape so existing pages work unchanged
  const value = {
    user:      identity ? { uid: identity.id } : null,
    profile:   identity ? { ...identity, uid: identity.id } : null,
    loading:   false,
    isAdmin:   false,           // no admin role in the simplified model
    isTeacher: identity?.role === 'teacher',
    isStudent: identity?.role === 'student',
    enter,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
