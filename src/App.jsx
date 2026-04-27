// src/App.jsx
// Roteamento principal da aplicação.
// Todas as rotas protegidas verificam autenticação e role.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeacherManagement from './pages/admin/TeacherManagement';
import AdminQuizzes from './pages/admin/AdminQuizzes';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import QuizList from './pages/teacher/QuizList';
import QuizForm from './pages/teacher/QuizForm';
import { Unauthorized, NotFound } from './pages/Misc';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ── Admin routes ────────────────────────────────────────── */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/teachers" element={
            <ProtectedRoute role="admin"><TeacherManagement /></ProtectedRoute>
          } />
          <Route path="/admin/quizzes" element={
            <ProtectedRoute role="admin"><AdminQuizzes /></ProtectedRoute>
          } />

          {/* ── Teacher routes ──────────────────────────────────────── */}
          <Route path="/teacher" element={
            <ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>
          } />
          <Route path="/teacher/quizzes" element={
            <ProtectedRoute role="teacher"><QuizList /></ProtectedRoute>
          } />
          <Route path="/teacher/quizzes/new" element={
            <ProtectedRoute role="teacher"><QuizForm /></ProtectedRoute>
          } />
          <Route path="/teacher/quizzes/:quizId/edit" element={
            <ProtectedRoute role="teacher"><QuizForm /></ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
