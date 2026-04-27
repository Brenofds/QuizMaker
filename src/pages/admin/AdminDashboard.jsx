// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { Users, FileQuestion, BookOpen } from 'lucide-react';
import AppLayout, { PageHeader, StatCard } from '../../components/layout/AppLayout';
import { listTeachers, listAllQuizzes } from '../../services/users.service';
import { Spinner } from '../../components/ui';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [teachers, quizzes] = await Promise.all([listTeachers(), listAllQuizzes()]);
        setStats({
          teachers: teachers.length,
          activeTeachers: teachers.filter(t => t.active).length,
          quizzes: quizzes.length,
          published: quizzes.filter(q => q.isPublished).length,
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <AppLayout>
      <PageHeader title="Dashboard" subtitle="Visão geral da plataforma" />

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 64 }}><Spinner size={32} /></div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }} className="animate-fade-up">
            <StatCard label="Total de Professores" value={stats.teachers} icon={Users} color="var(--navy-500)" />
            <StatCard label="Professores Ativos" value={stats.activeTeachers} icon={Users} color="var(--green)" />
            <StatCard label="Total de Quizzes" value={stats.quizzes} icon={FileQuestion} color="var(--amber-dark)" />
            <StatCard label="Quizzes Publicados" value={stats.published} icon={BookOpen} color="var(--navy)" />
          </div>

          <div className="card animate-fade-up animate-delay-1" style={{ padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>👋</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>
              Bem-vindo ao QuizMaker
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, maxWidth: 420, margin: '0 auto' }}>
              Use o menu lateral para gerenciar professores e visualizar todos os quizzes da plataforma.
            </p>
          </div>
        </>
      )}
    </AppLayout>
  );
}
