import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/authContext';
import '../assets/trail.css';

const ResearchTrail: React.FC = () => {
  const { user } = useAuth();
  // For demo purposes, we'll use local state to switch between "list mode" and "detail mode"
  const [selectedDocId, setSelectedDocId] = useState<string>('1');
  const [isComparingVersions, setIsComparingVersions] = useState(false);

  const advisorDocuments = [
    {
      id: '1',
      title: 'Metodologia_Qualitativa_v3.pdf',
      project: 'R. Silva - Análise LGPD',
      status: 'Aprovado',
      type: 'pdf',
    },
    {
      id: '2',
      title: 'Resultados_Parciais_Q2.pdf',
      project: 'J. Mendes - Bioinformática',
      status: 'Em revisão',
      type: 'pdf',
    },
    {
      id: '3',
      title: 'analise_estatistica_q2.json',
      project: 'A. Costa - Sistemas de IA',
      status: 'Submetido',
      type: 'csv', // using csv style for json
    },
    {
      id: '4',
      title: 'Dataset_Experimento_B.csv',
      project: 'J. Ferreira - Análise LGPD',
      status: 'Rascunho',
      type: 'csv',
    },
  ];

  const researcherDocuments = [
    {
      id: '1',
      title: 'Referencial_Teorico_Final.pdf',
      project: 'Projeto - Análise LGPD',
      status: 'Aprovado',
      type: 'pdf',
    },
    {
      id: '4',
      title: 'Dataset_Experimento_B.csv',
      project: 'Projeto - Análise LGPD',
      status: 'Rascunho',
      type: 'csv',
    },
  ];

  const documents = user?.role === 'RESEARCHER' ? researcherDocuments : advisorDocuments;
  const selectedDocument =
    documents.find((document) => document.id === selectedDocId) || documents[0];

  const handleExportTrail = () => {
    const lines = [
      'EDTECH - TRILHA DE PESQUISA',
      `Documento: ${selectedDocument.title}`,
      `Projeto: ${selectedDocument.project}`,
      `Status: ${selectedDocument.status}`,
      'v4 - Documento aprovado - Hoje, 14:32',
      'v4 - Verificacao LGPD aprovada - Hoje, 14:10',
      'v4 - Nova versao criada - Hoje, 11:48',
      'v3 - Comentario do orientador - Ontem, 16:20',
      'v1 - Documento criado - 10 Jun, 09:00',
    ];
    const escapePdf = (value: string) => value.replace(/[\\()]/g, '\\$&');
    const stream = `BT /F1 15 Tf 52 790 Td ${lines.map((line, index) => `${index ? '0 -26 Td ' : ''}(${escapePdf(line)}) Tj`).join(' ')} ET`;
    const objects = [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    ];
    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    objects.forEach((object, index) => {
      offsets.push(pdf.length);
      pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });
    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets
      .slice(1)
      .map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`)
      .join(
        '',
      )}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    const url = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `trilha_${selectedDocument.title.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
      {/* List Section */}
      <div className="trail-doc-list">
        <div className="trail-doc-list-header">
          <div className="trail-doc-list-icon">
            <i className="bi bi-person-badge"></i>
          </div>
          <div className="trail-doc-list-title">
            {user?.role === 'RESEARCHER' ? (
              <>
                <h3>Meus Documentos</h3>
                <p>Trilha das suas submissões e evidências</p>
              </>
            ) : (
              <>
                <h3>Documentos dos orientandos</h3>
                <p>Trilha dos documentos sob sua orientação</p>
              </>
            )}
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
      {selectedDocument && (
        <div className="trail-details-section">
          <div className="trail-details-banner">
            <div className="trail-doc-info">
              <div className="trail-file-icon type-pdf-bg type-pdf-text">
                <i className="bi bi-file-earmark-text"></i>
              </div>
              <div>
                <span className="trail-doc-name" style={{ fontSize: '16px' }}>
                  {selectedDocument.title}
                </span>
                <span className="trail-doc-project">
                  {selectedDocument.project} · 7 eventos · 4 versões
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="doc-status status-approved">
                <i className="bi bi-check-circle me-1"></i> Aprovado
              </span>
              <button className="btn-export-trail" onClick={handleExportTrail}>
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
                <button
                  className="btn-compare-versions"
                  onClick={() => setIsComparingVersions(true)}
                >
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

      {isComparingVersions && (
        <div
          className="version-compare-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Comparar versões"
        >
          <div className="version-compare-dialog">
            <div className="version-compare-header">
              <div>
                <h3>Comparar versões</h3>
                <p>{selectedDocument.title}</p>
              </div>
              <button aria-label="Fechar" onClick={() => setIsComparingVersions(false)}>
                ×
              </button>
            </div>
            <div className="version-compare-grid">
              <section>
                <strong>v3 · 10 Jun</strong>
                <p>Metodologia, referências e escopo inicial.</p>
              </section>
              <section>
                <strong>v4 · Hoje</strong>
                <p>Inclui revisão LGPD, evidências e aprovação do orientador.</p>
              </section>
            </div>
            <p className="version-compare-summary">
              <i className="bi bi-check-circle"></i> 3 alterações de conteúdo e 1 validação de
              conformidade registradas.
            </p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ResearchTrail;
