// src/pages/EntryPage.jsx
import { useState, useEffect } from 'react'; // Adicionado useEffect
import { useNavigate, useSearchParams } from 'react-router-dom'; // Adicionado useSearchParams
import { BookOpen, GraduationCap, ArrowRight, FileQuestion } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Field } from '../components/ui';

const ROLES = [
  {
    key: 'teacher',
    label: 'Professor',
    emoji: '👨‍🏫',
    desc: 'Crie e gerencie seus quizzes',
    icon: BookOpen,
    color: 'var(--navy)',
    bg: 'var(--navy)',
    textColor: '#fff',
    dest: '/teacher',
  },
  {
    key: 'student',
    label: 'Aluno',
    emoji: '🎓',
    desc: 'Responda quizzes publicados',
    icon: GraduationCap,
    color: 'var(--amber-dark)',
    bg: 'var(--amber)',
    textColor: 'var(--navy)',
    dest: '/student',
  },
];

export default function EntryPage() {
  const { enter } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Hook para ler a URL

  const [selectedRole, setSelectedRole] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Lógica para capturar o papel vindo do Portfólio/Landing Page
  useEffect(() => {
    const role = searchParams.get('role');
    if (role === 'teacher' || role === 'student') {
      setSelectedRole(role);
    }
  }, [searchParams]);

  const roleObj = ROLES.find(r => r.key === selectedRole);

  const handleEnter = async () => {
    if (!name.trim()) {
      setError('Digite seu nome para continuar');
      return;
    }
    setLoading(true);
    try {
      await enter(name.trim(), selectedRole);
      navigate(roleObj.dest, { replace: true });
    } catch (err) {
      setError('Erro ao entrar. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-500) 100%)',
      padding: 24,
      fontFamily: 'var(--font-body)',
    }}>
      {/* dot grid pattern */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        opacity: 0.05,
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div style={{ width: '100%', maxWidth: 520, position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: 'var(--amber)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 32px rgba(245,166,35,0.35)',
          }}>
            <FileQuestion size={32} color="var(--navy)" />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800,
            color: '#fff', marginBottom: 6,
          }}>
            QuizMaker
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>
            Plataforma de quizzes educacionais
          </p>
        </div>

        {/* Step 1 — choose role */}
        {!selectedRole && (
          <div className="animate-fade-up animate-delay-1">
            <p style={{
              textAlign: 'center', fontSize: 16, fontWeight: 600,
              color: 'rgba(255,255,255,0.85)', marginBottom: 20,
            }}>
              Quem é você?
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {ROLES.map(role => (
                <button
                  key={role.key}
                  onClick={() => setSelectedRole(role.key)}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1.5px solid rgba(255,255,255,0.12)',
                    borderRadius: 16,
                    padding: '28px 20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                    color: '#fff',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.borderColor = role.key === 'teacher'
                      ? 'rgba(255,255,255,0.4)'
                      : 'var(--amber)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.transform = '';
                  }}
                >
                  <div style={{ fontSize: 44, marginBottom: 12 }}>{role.emoji}</div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 18, marginBottom: 6,
                  }}>
                    {role.label}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
                    {role.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — enter name */}
        {selectedRole && (
          <div className="card animate-fade-up" style={{ padding: 36, background: '#fff', borderRadius: 24 }}>
            {/* Role badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 999,
              background: roleObj.bg,
              color: roleObj.textColor,
              fontSize: 13, fontWeight: 700,
              marginBottom: 24,
            }}>
              <span>{roleObj.emoji}</span> {roleObj.label}
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
              color: 'var(--navy)', marginBottom: 6,
            }}>
              Qual é o seu nome?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
              Será exibido na plataforma.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Field label="Seu nome" error={error}>
                <Input
                  placeholder={roleObj.key === 'teacher' ? 'Ex: Prof. Ana Oliveira' : 'Ex: João Silva'}
                  value={name}
                  onChange={e => { setName(e.target.value); setError(''); }}
                  error={error}
                  onKeyDown={e => e.key === 'Enter' && handleEnter()}
                  autoFocus
                />
              </Field>

              <div style={{ display: 'flex', gap: 10 }}>
                <Button
                  variant="secondary"
                  onClick={() => { setSelectedRole(null); setName(''); setError(''); }}
                >
                  ← Voltar
                </Button>
                <Button
                  fullWidth
                  onClick={handleEnter}
                  loading={loading}
                  style={{ background: roleObj.bg, borderColor: roleObj.bg, color: roleObj.textColor }}
                >
                  Entrar <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}