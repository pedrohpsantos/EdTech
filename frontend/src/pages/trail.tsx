import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import '../assets/trail.css';

const ResearchTrail: React.FC = () => {
  // For demo purposes, we'll use local state to switch between "list mode" and "detail mode"
  const [selectedDocId, setSelectedDocId] = useState<string>('1');

  const documents = [
    {
      id: '1',
      title: 'Metodologia_Qualitativa_v3.pdf',
      project: 'Análise LGPD',
      status: 'Aprovado',
    },
    {
      id: '2',
      title: 'Dataset_Experimento_A.csv',
      project: 'Sistemas de IA',
      status: 'Em revisão',
    },
    { id: '3', title: 'Referencial_Teorico_v2.pdf', project: 'Análise LGPD', status: 'Submetido' },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'status-approved';
      case 'Em revisão':
        return 'status-review';
      case 'Submetido':
        return 'status-submitted';
      default:
        return 'status-draft';
    }
  };

  return (
    <DashboardLayout
      title="Trilha de Pesquisa"
      subtitle="Histórico imutável de decisões, versões e evidências auditáveis"
      breadcrumbs={['EdTech', 'Trilha de Pesquisa']}
      customTopbarElement={
        <div className="trail-topbar-badge">
          <i className="bi bi-shield-check"></i> Trilha assinada
        </div>
      }
    >
      {/* GOVERNANCE ALERTS (Mixed in as requested) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        <div
          className="governance-alert"
          style={{ background: 'var(--ed-status-danger)', margin: 0 }}
        >
          <div className="alert-content">
            <div className="alert-icon" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <i className="bi bi-shield-lock"></i>
            </div>
            <div className="alert-text-container">
              <span className="alert-title text-white">ALTO RISCO (1)</span>
              <span className="alert-desc text-white">
                Anonimização de dados LGPD obrigatória antes do envio para a Nuvem.
              </span>
            </div>
          </div>
        </div>

        <div className="governance-alert" style={{ background: 'var(--ed-orange)', margin: 0 }}>
          <div className="alert-content">
            <div className="alert-icon" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <i className="bi bi-journal-x"></i>
            </div>
            <div className="alert-text-container">
              <span className="alert-title text-white">ATENÇÃO (2)</span>
              <span className="alert-desc text-white">
                Documentos detectados com seções de metodologia incompletas.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* List Section */}
      <div className="trail-doc-list">
        <div className="trail-doc-list-header">
          <div className="trail-doc-list-icon">
            <i className="bi bi-folder2-open"></i>
          </div>
          <div className="trail-doc-list-title">
            <h3>Seus documentos</h3>
            <p>Trilha de auditoria dos documentos que você criou</p>
          </div>
        </div>

        <div>
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`trail-doc-item ${selectedDocId === doc.id ? 'active' : ''}`}
              onClick={() => setSelectedDocId(doc.id)}
            >
              <div className="trail-doc-info">
                <div
                  className={`trail-file-icon ${doc.title.endsWith('.pdf') ? 'type-pdf-bg type-pdf-text' : 'type-csv-bg type-csv-text'}`}
                >
                  <i className="bi bi-file-earmark-text"></i>
                </div>
                <div>
                  <span className="trail-doc-name">{doc.title}</span>
                  <span className="trail-doc-project">{doc.project}</span>
                </div>
              </div>
              <div>
                <span className={`doc-status ${getStatusBadgeClass(doc.status)}`}>
                  {doc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Section for Document 1 (Mocked as per screenshot) */}
      {selectedDocId === '1' && (
        <div className="trail-details-section">
          <div className="trail-details-banner">
            <div className="trail-doc-info">
              <div className="trail-file-icon type-pdf-bg type-pdf-text">
                <i className="bi bi-file-earmark-text"></i>
              </div>
              <div>
                <span className="trail-doc-name" style={{ fontSize: '16px' }}>
                  Metodologia_Qualitativa_v3.pdf
                </span>
                <span className="trail-doc-project">
                  Dra. Renata Silva - Análise LGPD - 7 eventos · 4 versões
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="doc-status status-approved">
                <i className="bi bi-check-circle me-1"></i> Aprovado
              </span>
              <button className="btn-export-trail">
                <i className="bi bi-download"></i> Exportar trilha (PDF)
              </button>
            </div>
          </div>

          <div className="trail-content-grid">
            {/* Timeline */}
            <div className="timeline-card">
              <div className="timeline-header">
                <h3 className="timeline-title">Timeline de decisões</h3>
                <p className="timeline-subtitle">Ordenado do mais recente ao mais antigo</p>
              </div>

              <div className="timeline-container">
                {/* Event 1 */}
                <div className="timeline-event">
                  <div className="timeline-icon success">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Documento aprovado</span>
                      <span className="timeline-event-meta">
                        Prof. Dr. Faria · Hoje · 14:32 ·{' '}
                        <span className="timeline-event-hash">#a34fe9d</span>
                      </span>
                    </div>
                    <div className="timeline-version-tag">
                      <i className="bi bi-diagram-3 me-1"></i> v4
                    </div>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="timeline-event">
                  <div className="timeline-icon success">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Verificação LGPD aprovada</span>
                      <span className="timeline-event-meta">
                        Sistema · Hoje · 14:10 ·{' '}
                        <span className="timeline-event-hash">#7c4dff1</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="timeline-event">
                  <div className="timeline-icon info">
                    <i className="bi bi-dash-circle"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Nova versão criada</span>
                      <span className="timeline-event-meta">
                        Dra. Renata Silva · Hoje · 11:48 ·{' '}
                        <span className="timeline-event-hash">#6a1b9a2</span>
                      </span>
                    </div>
                    <div className="timeline-version-tag">
                      <i className="bi bi-diagram-3 me-1"></i> v4
                    </div>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="timeline-event">
                  <div className="timeline-icon warning">
                    <i className="bi bi-chat-left-text"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Comentário do orientador</span>
                      <span className="timeline-event-meta">
                        Prof. Dr. Faria · Ontem · 16:20 ·{' '}
                        <span className="timeline-event-hash">#ff91003</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event 5 */}
                <div className="timeline-event">
                  <div className="timeline-icon danger">
                    <i className="bi bi-exclamation-circle"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Risco de conformidade sinalizado</span>
                      <span className="timeline-event-meta">
                        Verificação automática · Ontem · 09:15 ·{' '}
                        <span className="timeline-event-hash">#c628284</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event 6 */}
                <div className="timeline-event">
                  <div className="timeline-icon info">
                    <i className="bi bi-dash-circle"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Versão inicial submetida</span>
                      <span className="timeline-event-meta">
                        Dra. Renata Silva · 10 Jun · 09:00 ·{' '}
                        <span className="timeline-event-hash">#1565c05</span>
                      </span>
                    </div>
                    <div className="timeline-version-tag">
                      <i className="bi bi-diagram-3 me-1"></i> v3
                    </div>
                  </div>
                </div>

                {/* Event 7 */}
                <div className="timeline-event">
                  <div className="timeline-icon purple">
                    <i className="bi bi-upload"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Documento criado</span>
                      <span className="timeline-event-meta">
                        Dra. Renata Silva · 05 Jun · 10:30 ·{' '}
                        <span className="timeline-event-hash">#4a148c6</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="trail-sidebar">
              <div className="trail-sidebar-card">
                <h3 className="trail-sidebar-title">Versionamento</h3>
                <div className="version-list mt-3">
                  <div className="version-item">
                    <div className="version-info">
                      <span className="version-tag">v4</span>
                      <span className="version-author">Hoje - R. Silva</span>
                    </div>
                    <span
                      className="doc-status status-approved"
                      style={{ fontSize: '10px', padding: '2px 8px' }}
                    >
                      Aprovado
                    </span>
                  </div>
                  <div className="version-item">
                    <div className="version-info">
                      <span className="version-tag" style={{ color: 'var(--ed-text-muted)' }}>
                        v3
                      </span>
                      <span className="version-author">10 Jun - R. Silva</span>
                    </div>
                    <span
                      className="doc-status status-draft"
                      style={{ fontSize: '10px', padding: '2px 8px' }}
                    >
                      Substituído
                    </span>
                  </div>
                  <div className="version-item">
                    <div className="version-info">
                      <span className="version-tag" style={{ color: 'var(--ed-text-muted)' }}>
                        v2
                      </span>
                      <span className="version-author">01 Jun - R. Silva</span>
                    </div>
                    <span
                      className="doc-status status-draft"
                      style={{ fontSize: '10px', padding: '2px 8px' }}
                    >
                      Substituído
                    </span>
                  </div>
                  <div className="version-item">
                    <div className="version-info">
                      <span className="version-tag" style={{ color: 'var(--ed-text-muted)' }}>
                        v1
                      </span>
                      <span className="version-author">20 Mai - R. Silva</span>
                    </div>
                    <span
                      className="doc-status status-draft"
                      style={{ fontSize: '10px', padding: '2px 8px' }}
                    >
                      Substituído
                    </span>
                  </div>
                </div>
                <button className="btn-compare-versions">
                  <i className="bi bi-arrow-down-up"></i> Comparar versões
                </button>
              </div>

              <div className="trail-sidebar-card">
                <h3 className="trail-sidebar-title">Integridade</h3>
                <p className="trail-sidebar-subtitle">Cadeia de custódia</p>

                <table className="integrity-table">
                  <tbody>
                    <tr>
                      <td className="integrity-label">Hash raiz</td>
                      <td className="integrity-value integrity-hash">a34fe9d...3b1</td>
                    </tr>
                    <tr>
                      <td className="integrity-label">Assinatura</td>
                      <td className="integrity-value text-success">Válida</td>
                    </tr>
                    <tr>
                      <td className="integrity-label">Eventos imutáveis</td>
                      <td className="integrity-value text-success">7 / 7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ResearchTrail;
