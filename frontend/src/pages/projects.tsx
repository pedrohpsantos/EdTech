import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getProjects, joinProject } from '../services/api';
import { Project } from '../types';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [toastMessage, setToastMessage] = useState('');

  const loadProjects = async () => {
    setLoading(true);
    const resp = await getProjects(page, 20);
    if (resp.sucesso) {
      if (resp.dados && resp.dados.content) {
        setProjects(resp.dados.content);
        setTotalPages(resp.dados.totalPages || 1);
      } else if (Array.isArray(resp.dados)) {
        setProjects(resp.dados);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, [page]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleJoin = async (projectId: string) => {
    const resp = await joinProject(projectId);
    if (resp.sucesso) {
      showToast('Associado ao projeto com sucesso!');
      loadProjects();
    } else {
      showToast('Erro: ' + resp.mensagem);
    }
  };

  return (
    <DashboardLayout
      title="Projetos"
      subtitle="Descubra e associe-se a projetos de pesquisa ativos"
      breadcrumbs={['EdTech', 'Projetos']}
    >
      <div className="dashboard-card p-4">
        <h3 style={{ color: 'var(--ed-text-dark)', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
          Projetos Disponíveis
        </h3>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--ed-text-muted)' }}>Carregando projetos...</div>
        ) : projects.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--ed-text-muted)' }}>Nenhum projeto encontrado.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {projects.map((project) => (
              <div key={project.id} style={{
                background: 'var(--ed-white)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--ed-purple-main)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                      <i className="bi bi-briefcase"></i>
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--ed-text-dark)' }}>{project.name}</h4>
                      <span style={{ fontSize: '12px', color: 'var(--ed-text-muted)' }}>Criado em {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--ed-text-muted)', lineHeight: '1.5' }}>
                  {project.description}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <button 
                    onClick={() => handleJoin(project.id)}
                    style={{
                      width: '100%',
                      background: 'var(--ed-purple-main)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'var(--ed-purple-dark)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'var(--ed-purple-main)'}
                  >
                    <i className="bi bi-person-plus"></i>
                    Associar-se
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="btn btn-outline"
            >
              Anterior
            </button>
            <span style={{ color: 'var(--ed-text-dark)' }}>Página {page + 1} de {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="btn btn-outline"
            >
              Próxima
            </button>
          </div>
        )}
      </div>

      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'var(--ed-text-dark)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease'
        }}>
          <i className="bi bi-info-circle"></i>
          <span>{toastMessage}</span>
        </div>
      )}
    </DashboardLayout>
  );
}
