import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/authContext';
import { getDashboardStats, getAuditLogs, getComplianceStats, getDocuments } from '../services/api';

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
  const [auditorStats, setAuditorStats] = useState<any>(null);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [recentDocs, setRecentDocs] = useState<any[]>([]);

  useEffect(() => {
    if (user?.role === 'RESEARCHER' || user?.role === 'ADVISOR') {
      getDashboardStats().then((data) => {
        if (data) setStats(data);
      });
      getDocuments().then((resp) => {
        if (resp.sucesso) {
          setRecentDocs(resp.dados.content?.slice(0, 3) || []);
        }
      });
    } else if (user?.role === 'AUDITOR') {
      getComplianceStats().then((data) => {
        if (data) setAuditorStats(data);
      });
      getAuditLogs().then((logs) => {
        setRecentLogs(logs.slice(0, 3));
      });
    }
  }, [user]);



  const customTopbar = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {user?.role === 'ADVISOR' ? (
        <button 
          onClick={() => navigate('/submissions')}
          style={{ 
            background: 'var(--ed-purple-main)', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(63, 27, 138, 0.3)'
          }}
        >
          <i className="bi bi-play-circle"></i> Ver submissões
        </button>
      ) : user?.role === 'AUDITOR' ? (
        <button 
          onClick={() => navigate('/audit-logs')}
          style={{ 
            background: 'var(--ed-purple-main)', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(63, 27, 138, 0.3)'
          }}
        >
          <i className="bi bi-journal-text"></i> Ver logs de auditoria
        </button>
      ) : (
        <button 
          onClick={() => navigate('/trail')}
          style={{ 
            background: 'var(--ed-purple-main)', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(63, 27, 138, 0.3)'
          }}
        >
          <i className="bi bi-diagram-3"></i> Ver Trilha de Pesquisa
        </button>
      )}
    </div>
  );

  return (
    <DashboardLayout
      title={`Bom dia, ${firstName}`}
      subtitle="Resumo executivo da sua atividade de pesquisa e governança"
      breadcrumbs={['EdTech', 'Visão Geral']}
      customTopbarElement={customTopbar}
    >
      {/* Stats Row */}
      {user?.role === 'RESEARCHER' ? (
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-header">
              Meus Documentos
              <i className="bi bi-file-earmark-text stat-icon" style={{ color: 'var(--ed-purple-light)' }}></i>
            </span>
            <div className="stat-body">
              <span className="stat-value">{stats.activeDocuments || 12}</span>
              <span className="stat-trend" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--ed-status-success)', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>+1</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              Em Revisão
              <i className="bi bi-clock stat-icon" style={{ color: 'var(--ed-orange)' }}></i>
            </div>
            <div className="stat-body">
              <span className="stat-value">{stats.pendingReview || 2}</span>
              <span className="stat-trend" style={{ background: 'var(--border)', color: 'var(--ed-text-muted)', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>aguardando</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-header">
              Aprovados
              <i className="bi bi-check-circle stat-icon" style={{ color: 'var(--ed-status-success)' }}></i>
            </span>
            <div className="stat-body">
              <span className="stat-value">8</span>
              <span className="stat-trend" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--ed-status-success)', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>+2 este mês</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-header">
              Seu Compliance Score
              <i className="bi bi-shield-check stat-icon" style={{ color: 'var(--ed-status-info)' }}></i>
            </span>
            <div className="stat-body">
              <span className="stat-value">98%</span>
              <span className="stat-trend" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--ed-status-info)', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>ótimo</span>
            </div>
          </div>
        </div>
      ) : user?.role === 'AUDITOR' ? (
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-header">
              Eventos Hoje
              <i className="bi bi-activity stat-icon" style={{ color: 'var(--ed-purple-light)' }}></i>
            </span>
            <div className="stat-body">
              <span className="stat-value">{auditorStats?.totalEvents || 0}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              Alertas Ativos
              <i className="bi bi-exclamation-triangle stat-icon" style={{ color: 'var(--ed-orange)' }}></i>
            </div>
            <div className="stat-body">
              <span className="stat-value">{auditorStats?.pendingItems || 0}</span>
              <span className="stat-trend" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--ed-status-danger)', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>ação</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-header">
              Políticas Conformes
              <i className="bi bi-file-earmark-text stat-icon" style={{ color: 'var(--ed-status-info)' }}></i>
            </span>
            <div className="stat-body">
              <span className="stat-value">{auditorStats?.compliantPolicies || 0}/{auditorStats?.totalPolicies || 5}</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-header">
              Compliance Geral
              <i className="bi bi-shield-check stat-icon" style={{ color: 'var(--ed-status-success)' }}></i>
            </span>
            <div className="stat-body">
              <span className="stat-value">{auditorStats?.score || 0}%</span>
              <span className="stat-trend" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--ed-status-success)', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>+{auditorStats?.scoreTrend || 0} pts</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-header">
              Documentos ativos
              <i className="bi bi-file-earmark-text stat-icon" style={{ color: 'var(--ed-purple-light)' }}></i>
            </span>
            <div className="stat-body">
              <span className="stat-value">{stats.activeDocuments || 24}</span>
              <span className="stat-trend" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--ed-status-success)', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>+3</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              Aguardando revisão
              <i className="bi bi-clock stat-icon" style={{ color: 'var(--ed-orange)' }}></i>
            </div>
            <div className="stat-body">
              <span className="stat-value">{stats.pendingReview || 5}</span>
              <span className="stat-trend" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--ed-status-success)', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>-1</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-header">
              Compliance Score Geral
              <i className="bi bi-shield-check stat-icon" style={{ color: 'var(--ed-status-success)' }}></i>
            </span>
            <div className="stat-body">
              <span className="stat-value">{stats.complianceScore || 92}%</span>
              <span className="stat-trend" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--ed-status-success)', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>+4 pts</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-header">
              Progresso da pesquisa
              <i className="bi bi-graph-up stat-icon" style={{ color: 'var(--ed-status-info)' }}></i>
            </span>
            <div className="stat-body">
              <span className="stat-value">{stats.researchProgress || 68}%</span>
              <span className="stat-trend" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--ed-status-info)', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>no prazo</span>
            </div>
          </div>
        </div>
      )}

      {/* Governance Alert */}
      {user?.role === 'RESEARCHER' ? (
        <div className="governance-alert" style={{ background: 'linear-gradient(90deg, #f58a07 0%, #ffb057 100%)', boxShadow: '0 4px 15px rgba(245, 138, 7, 0.3)' }}>
          <div className="alert-content">
            <div className="alert-icon">
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <div className="alert-text-container">
              <span className="alert-title">AÇÃO REQUERIDA</span>
              <span className="alert-desc">
                Seu documento <strong>Dataset_Experimento_B.csv</strong> foi sinalizado pela verificação de LGPD e precisa de anonimização.
              </span>
            </div>
          </div>
          <button className="btn-alert" style={{ background: 'white', color: 'var(--ed-orange)' }} onClick={() => navigate('/trail')}>
            <i className="bi bi-arrow-right-short"></i> Corrigir agora
          </button>
        </div>
      ) : user?.role === 'AUDITOR' ? (
        <div className="governance-alert" style={{ background: 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)', boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)' }}>
          <div className="alert-content">
            <div className="alert-icon">
              <i className="bi bi-shield-x"></i>
            </div>
            <div className="alert-text-container">
              <span className="alert-title">FALHA CRÍTICA DE RETENÇÃO</span>
              <span className="alert-desc">
                14 documentos passaram do período de retenção legal (5 anos). Ação imediata necessária.
              </span>
            </div>
          </div>
          <button className="btn-alert" style={{ background: 'white', color: '#dc2626' }} onClick={() => navigate('/compliance-center')}>
            <i className="bi bi-arrow-right-short"></i> Investigar
          </button>
        </div>
      ) : (
        <div className="governance-alert">
          <div className="alert-content">
            <div className="alert-icon">
              <i className="bi bi-shield-exclamation"></i>
            </div>
            <div className="alert-text-container">
              <span className="alert-title">ALERTA DE GOVERNANÇA GERAL</span>
              <span className="alert-desc">
                2 documentos do seu laboratório têm seções de metodologia incompletas e 1 dataset precisa de anonimização LGPD antes da publicação.
              </span>
            </div>
          </div>
          <button className="btn-alert" onClick={() => navigate('/trail')}>
            <i className="bi bi-arrow-right-short"></i> Ver detalhes
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="dashboard-grid">
        <div className="grid-left">
          {user?.role === 'RESEARCHER' ? (
            <div className="dashboard-card">
              <div className="card-header-flex">
                <h3 className="card-title">Minhas Submissões Recentes</h3>
                <span className="card-action-link" style={{ color: 'var(--ed-purple-light)', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Ver histórico</span>
              </div>
              <div className="doc-list">
                {recentDocs.length > 0 ? recentDocs.map((doc: any, i) => (
                  <div className="doc-item" key={doc.id} style={i === recentDocs.length - 1 ? { borderBottom: 'none' } : {}}>
                    <div className="doc-info" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ width: '36px', height: '36px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--ed-status-info)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className={doc.title.endsWith('.pdf') ? 'bi bi-file-earmark-pdf' : 'bi bi-file-earmark-text'}></i>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="doc-name" style={{ fontWeight: 600, color: 'var(--ed-text-dark)', fontSize: '14px' }}>
                          {doc.title}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--ed-text-muted)' }}>Atualizado {new Date(doc.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'var(--ed-text-muted)', background: 'var(--border)', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>
                        {doc.status}
                      </span>
                      <button style={{ border: '1px solid var(--border)', background: 'transparent', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, color: 'var(--ed-text-dark)', cursor: 'pointer' }} onClick={() => navigate('/documentos')}>
                        Ver
                      </button>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>Nenhum documento</div>
                )}
              </div>
            </div>
          ) : user?.role === 'AUDITOR' ? (
            <div className="dashboard-card">
              <div className="card-header-flex">
                <h3 className="card-title">Atividades Críticas Recentes</h3>
                <span className="card-action-link" style={{ color: 'var(--ed-purple-light)', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }} onClick={() => navigate('/audit-logs')}>Ver logs</span>
              </div>
              <div className="doc-list">
                {recentLogs.length > 0 ? recentLogs.map((log: any, i) => (
                  <div className="doc-item" key={log.id} style={i === recentLogs.length - 1 ? { borderBottom: 'none' } : {}}>
                    <div className="doc-info" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ width: '36px', height: '36px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--ed-status-danger)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="bi bi-shield-exclamation"></i>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="doc-name" style={{ fontWeight: 600, color: 'var(--ed-text-dark)', fontSize: '14px' }}>
                          {log.action}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--ed-text-muted)' }}>{log.details.substring(0, 30)}...</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'var(--ed-text-muted)' }}>{log.userName}</span>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>Nenhum log crítico</div>
                )}
              </div>
            </div>
          ) : (
            <div className="dashboard-card">
              <div className="card-header-flex">
                <h3 className="card-title">Revisões Pendentes</h3>
                <span className="card-action-link" style={{ color: 'var(--ed-purple-light)', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>Ver todas</span>
              </div>
              <div className="doc-list">
                {recentDocs.length > 0 ? recentDocs.map((doc: any, i) => (
                  <div className="doc-item" key={doc.id} style={i === recentDocs.length - 1 ? { borderBottom: 'none' } : {}}>
                    <div className="doc-info" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ width: '36px', height: '36px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--ed-status-danger)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="bi bi-file-earmark-pdf"></i>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="doc-name" style={{ fontWeight: 600, color: 'var(--ed-text-dark)', fontSize: '14px' }}>
                          {doc.title}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--ed-text-muted)' }}>{doc.author?.name} - {new Date(doc.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'var(--ed-orange)', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>
                        <i className="bi bi-clock"></i> Pendente
                      </span>
                      <button style={{ border: '1px solid var(--border)', background: 'transparent', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, color: 'var(--ed-text-dark)', cursor: 'pointer' }} onClick={() => navigate('/submissions')}>
                        Revisar
                      </button>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>Nenhuma submissão pendente.</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="grid-right">
          {user?.role === 'RESEARCHER' ? (
            <>
              {/* Compliance Score (Personal) */}
              <div className="dashboard-card">
                <div className="card-header-flex" style={{ paddingBottom: '10px', border: 'none' }}>
                  <div>
                    <div className="card-title">Meu Perfil de Conformidade</div>
                    <div className="card-title-muted mt-1">Sua aderência às políticas de dados</div>
                  </div>
                </div>
                <div className="score-content">
                  <div className="score-circle">
                    <span className="score-number">98</span>
                    <span className="score-label-small">PONTOS</span>
                  </div>
                  <div className="score-breakdown">
                    <div className="breakdown-item">
                      <span>Anonimização</span>
                      <span className="breakdown-status-ok">OK</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Metadados</span>
                      <span className="breakdown-status-ok">OK</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Envios Seguros</span>
                      <span className="breakdown-status-ok">OK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Progress (Personal) */}
              <div className="dashboard-card">
                <div className="card-header-flex" style={{ paddingBottom: '10px', border: 'none' }}>
                  <div className="card-title">Progresso da Tese / Artigo</div>
                </div>
                <div className="progress-content">
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Referencial Teórico</span>
                      <span>100%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-purple" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Coleta de Dados</span>
                      <span>85%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-purple" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Análise de Resultados</span>
                      <span>30%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-orange" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : user?.role === 'AUDITOR' ? (
            <>
              {/* Compliance Overview */}
              <div className="dashboard-card">
                <div className="card-header-flex" style={{ paddingBottom: '10px', border: 'none' }}>
                  <div className="card-title">Conformidade Institucional</div>
                </div>
                <div className="progress-content">
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>LGPD</span>
                      <span>100%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-purple" style={{ width: '100%', background: '#4CAF50' }}></div>
                    </div>
                  </div>
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Termos de Consentimento</span>
                      <span>83%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-orange" style={{ width: '83%' }}></div>
                    </div>
                  </div>
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Descarte de Dados</span>
                      <span>58%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-red" style={{ width: '58%', background: '#F44336' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Compliance Score (General) */}
              <div className="dashboard-card">
                <div className="card-header-flex" style={{ paddingBottom: '10px', border: 'none' }}>
                  <div>
                    <div className="card-title">Pontuação de Conformidade (Laboratório)</div>
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

              {/* Research Progress (Projects) */}
              <div className="dashboard-card">
                <div className="card-header-flex" style={{ paddingBottom: '10px', border: 'none' }}>
                  <div className="card-title">Progresso dos Projetos</div>
                </div>
                <div className="progress-content">
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Análise LGPD (R. Silva)</span>
                      <span>82%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-purple" style={{ width: '82%' }}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Sistemas de IA (A. Costa)</span>
                      <span>64%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-orange" style={{ width: '64%' }}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Bioinformática (J. Mendes)</span>
                      <span>41%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-blue" style={{ width: '41%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
