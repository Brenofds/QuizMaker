// src/App.jsx
// Roteamento principal. Login removido — identidade via seleção de papel + nome.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import EntryPage          from './pages/EntryPage';
import TeacherDashboard   from './pages/teacher/TeacherDashboard';
import QuizList           from './pages/teacher/QuizList';
import QuizForm           from './pages/teacher/QuizForm';
import StudentHome        from './pages/student/StudentHome';
import QuizPlay           from './pages/student/QuizPlay';
import { NotFound }       from './pages/Misc';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Entry — role selector + name */}
          <Route path="/" element={<EntryPage />} />

          {/* Legacy redirect */}
          <Route path="/login" element={<Navigate to="/" replace />} />

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

          {/* ── Student routes ──────────────────────────────────────── */}
          <Route path="/student" element={
            <ProtectedRoute role="student"><StudentHome /></ProtectedRoute>
          } />
          <Route path="/student/quiz/:quizId" element={
            <ProtectedRoute role="student"><QuizPlay /></ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
