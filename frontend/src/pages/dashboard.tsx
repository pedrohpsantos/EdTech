import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/authContext';
import { getDashboardStats } from '../services/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Usuário';

  const [stats, setStats] = useState({
    activeDocuments: 0,
    pendingReview: 0,
    complianceScore: 0,
    researchProgress: 0,
  });

  useEffect(() => {
    if (user?.role === 'RESEARCHER') {
      getDashboardStats()
        .then((data) => {
          if (data) setStats(data);
        })
        .catch((err) => console.error('Erro ao carregar estatísticas:', err));
    }
  }, [user]);

  if (user?.role && user.role !== 'RESEARCHER') {
    return (
      <DashboardLayout
        title="Página não encontrada"
        subtitle="A rota que você tentou acessar não existe ou não está disponível para o seu perfil."
        breadcrumbs={['EdTech', '404']}
      >
        <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <i
            className="bi bi-exclamation-triangle"
            style={{ fontSize: '3rem', color: 'var(--ed-orange)' }}
          ></i>
          <h2 style={{ marginTop: '1rem', color: 'var(--text-main)' }}>Painel indisponível</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            O painel para o seu perfil de {user.role === 'ADVISOR' ? 'Orientador' : 'Auditor'} ainda
            está em desenvolvimento.
          </p>
          <button className="btn-primary mt-4" onClick={() => navigate('/')}>
            Voltar para o início
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={`Bom dia, ${firstName}`}
      subtitle="Resumo executivo da sua atividade de pesquisa e governança"
      breadcrumbs={['EdTech', 'Visão Geral']}
    >
      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-header">
            Documentos ativos
            <i className="bi bi-file-earmark-text stat-icon"></i>
          </span>
          <div className="stat-body">
            <span className="stat-value">{stats.activeDocuments}</span>
            <span className="stat-trend trend-neutral">Total</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            Aguardando revisão
            <i className="bi bi-clock stat-icon"></i>
          </div>
          <div className="stat-body">
            <span className="stat-value">{stats.pendingReview}</span>
            <span className="stat-trend trend-neutral">Pendentes</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-header">
            Pontuação de Conformidade
            <i className="bi bi-shield-check stat-icon"></i>
          </span>
          <div className="stat-body">
            <span className="stat-value">{stats.complianceScore}%</span>
            <span className="stat-trend trend-up">Bom</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-header">
            Progresso da pesquisa
            <i className="bi bi-graph-up stat-icon"></i>
          </span>
          <div className="stat-body">
            <span className="stat-value">{stats.researchProgress}%</span>
            <span className="stat-trend trend-neutral">Em andamento</span>
          </div>
        </div>
      </div>

      {/* Governance Alert */}
      <div className="governance-alert">
        <div className="alert-content">
          <div className="alert-icon">
            <i className="bi bi-shield-exclamation"></i>
          </div>
          <div className="alert-text-container">
            <span className="alert-title">ALERTA DE GOVERNANÇA</span>
            <span className="alert-desc">
              2 documentos têm seções de metodologia incompletas e 1 dataset precisa de anonimização
              LGPD antes da submissão.
            </span>
          </div>
        </div>
        <button className="btn-alert" onClick={() => navigate('/trail')}>
          <i className="bi bi-arrow-right-short"></i> Ver detalhes
        </button>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        <div className="grid-left">
          {/* Recent Documents */}
          <div className="dashboard-card">
            <div className="card-header-flex">
              <h3 className="card-title">Documentos Recentes</h3>
              <span className="card-action-link">Workspace</span>
            </div>
            <div className="doc-list">
              <div className="doc-item">
                <div className="doc-info">
                  <i className="bi bi-file-earmark-pdf text-muted ms-2"></i>
                  <span className="doc-name ms-2" style={{ fontWeight: 500 }}>
                    Metodologia_Qualitativa_v3.pdf
                  </span>
                </div>
                <span className="doc-status status-review">Em Revisão</span>
              </div>

              <div className="doc-item">
                <div className="doc-info">
                  <i className="bi bi-file-earmark-spreadsheet text-muted ms-2"></i>
                  <span className="doc-name ms-2" style={{ fontWeight: 500 }}>
                    Dataset_Experimento_A.csv
                  </span>
                </div>
                <span className="doc-status status-approved">Aprovado</span>
              </div>

              <div className="doc-item">
                <div className="doc-info">
                  <i className="bi bi-file-earmark-pdf text-muted ms-2"></i>
                  <span className="doc-name ms-2" style={{ fontWeight: 500 }}>
                    Referencial_Teorico_v2.pdf
                  </span>
                </div>
                <span className="doc-status status-submitted">Submetido</span>
              </div>

              <div className="doc-item">
                <div className="doc-info">
                  <i className="bi bi-file-earmark-code text-muted ms-2"></i>
                  <span className="doc-name ms-2" style={{ fontWeight: 500 }}>
                    config_modelo_final.json
                  </span>
                </div>
                <span className="doc-status status-draft">Rascunho</span>
              </div>
            </div>
          </div>

          {/* Research Progress */}
          <div className="dashboard-card">
            <div className="card-header-flex" style={{ paddingBottom: '10px', border: 'none' }}>
              <div className="card-title">Progresso da Pesquisa</div>
            </div>
            <div className="progress-content">
              <div className="progress-item">
                <div className="progress-header">
                  <span>Análise LGPD</span>
                  <span>82%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill fill-purple" style={{ width: '82%' }}></div>
                </div>
              </div>

              <div className="progress-item">
                <div className="progress-header">
                  <span>Sistemas de IA</span>
                  <span>64%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill fill-orange" style={{ width: '64%' }}></div>
                </div>
              </div>

              <div className="progress-item">
                <div className="progress-header">
                  <span>Bioinformática</span>
                  <span>41%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill fill-blue" style={{ width: '41%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-right">
          {/* Compliance Score */}
          <div className="dashboard-card">
            <div className="card-header-flex" style={{ paddingBottom: '10px', border: 'none' }}>
              <div>
                <div className="card-title">Pontuação de Conformidade</div>
                <div className="card-title-muted mt-1">LGPD · Integridade · Rastreabilidade</div>
              </div>
            </div>
            <div className="score-content">
              <div className="score-circle">
                <span className="score-number">92</span>
                <span className="score-label-small">PONTOS</span>
              </div>
              <div className="score-breakdown">
                <div className="breakdown-item">
                  <span>Anonimização</span>
                  <span className="breakdown-status-ok">OK</span>
                </div>
                <div className="breakdown-item">
                  <span>Consentimento</span>
                  <span className="breakdown-status-ok">OK</span>
                </div>
                <div className="breakdown-item">
                  <span>Versionamento</span>
                  <span className="breakdown-status-warn">Parcial</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="dashboard-card">
            <div className="card-header-flex" style={{ paddingBottom: '10px', border: 'none' }}>
              <div className="card-title">Atividades Recentes</div>
            </div>
            <div className="activity-feed-content">
              <div className="activity-item">
                <div className="activity-icon bg-purple-light">
                  <i className="bi bi-upload"></i>
                </div>
                <div className="activity-details">
                  <span className="activity-text">
                    <b>Você</b> enviou <b>Metodologia_Qualitativa_v3.pdf</b>
                  </span>
                  <span className="activity-time">há 12 min</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon bg-orange-light">
                  <i className="bi bi-chat-left-text"></i>
                </div>
                <div className="activity-details">
                  <span className="activity-text">
                    <b>Prof. Faria</b> comentou em <b>Referencial_Teorico_v2.pdf</b>
                  </span>
                  <span className="activity-time">há 1 h</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon bg-green-light">
                  <i className="bi bi-check-circle"></i>
                </div>
                <div className="activity-details">
                  <span className="activity-text">
                    <b>Prof. Faria</b> aprovou <b>Dataset_Experimento_A.csv</b>
                  </span>
                  <span className="activity-time">há 3 h</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon bg-blue-light">
                  <i className="bi bi-arrow-repeat"></i>
                </div>
                <div className="activity-details">
                  <span className="activity-text">
                    <b>Sistema</b> versionou <b>config_modelo_final.json - v4</b>
                  </span>
                  <span className="activity-time">há 5 h</span>
                </div>
              </div>

              <div className="activity-item">
                <div
                  className="activity-icon"
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}
                >
                  <i className="bi bi-exclamation-circle"></i>
                </div>
                <div className="activity-details">
                  <span className="activity-text">
                    <b>Sistema</b> sinalizou risco em <b>Coleta_Entrevistas_Jun.pdf</b>
                  </span>
                  <span className="activity-time">ontem</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
