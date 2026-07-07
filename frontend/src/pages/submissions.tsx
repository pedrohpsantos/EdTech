import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/authContext';
import { getDocuments, reviewDocument, getDashboardStats } from '../services/api';
import styles from './submissions.module.css';

export default function Submissions() {
  const { user: _user } = useAuth();
  const [documents, setDocuments] = useState<any[]>([]);
  const [_stats, setStats] = useState<any>(null);
  
  // Modals state
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionFeedback, setRejectionFeedback] = useState('');

  const loadData = async () => {
    try {
      const statsResponse = await getDashboardStats();
      setStats(statsResponse);

      // Fetch pending documents (we pass status='PENDING_REVIEW' directly if API supports it, 
      // or we just fetch and filter locally depending on the implementation)
      const docsResponse = await getDocuments(undefined, undefined, 'PENDING_REVIEW');
      if (docsResponse.sucesso) {
        setDocuments(docsResponse.dados.content || []);
      }
    } catch (error) {
      console.error('Failed to load data', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async () => {
    if (!selectedDoc) return;
    const response = await reviewDocument(selectedDoc.id, 'APPROVED');
    if (response.sucesso) {
      setShowAnalysisModal(false);
      setSelectedDoc(null);
      loadData();
    } else {
      alert('Erro ao aprovar documento: ' + response.mensagem);
    }
  };

  const handleReject = async () => {
    if (!selectedDoc || !rejectionFeedback.trim()) return;
    const response = await reviewDocument(selectedDoc.id, 'REJECTED', rejectionFeedback);
    if (response.sucesso) {
      setShowRejectionModal(false);
      setRejectionFeedback('');
      setSelectedDoc(null);
      loadData();
    } else {
      alert('Erro ao rejeitar documento: ' + response.mensagem);
    }
  };

  const openRejectionModal = (doc: any) => {
    setSelectedDoc(doc);
    setShowAnalysisModal(false);
    setShowRejectionModal(true);
  };

  const handleAnalyze = async (doc: any) => {
    setSelectedDoc(doc);
    setPreviewUrl('');
    setShowAnalysisModal(true);
    
    // Fetch the download URL (presigned GCS URL) to preview
    import('../services/api').then(async ({ getDownloadUrl }) => {
      const resp = await getDownloadUrl(doc.id);
      if (resp.sucesso) {
        setPreviewUrl(resp.dados.downloadUrl);
      }
    });
  };

  const formatSize = (_url: string) => {
    return '2.4 MB'; // Mock placeholder, since we don't return size from backend yet
  };

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <DashboardLayout
      title="Painel do Orientador"
      subtitle=""
      breadcrumbs={['EdTech', 'Painel do Orientador']}
    >

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Projetos Ativos</span>
            <div className={`${styles.statIcon} ${styles.purple}`}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <span className={styles.statValue}>8</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Pendentes de Revisão</span>
            <div className={`${styles.statIcon} ${styles.orange}`}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <span className={styles.statValue}>{documents.length}</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Pesquisadores Orientados</span>
            <div className={`${styles.statIcon} ${styles.blue}`}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <span className={styles.statValue}>14</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Aprovados este mês</span>
            <div className={`${styles.statIcon} ${styles.green}`}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <span className={styles.statValue}>23</span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>
            Submissões Pendentes
            <span className={styles.badgePending}>{documents.length} pendentes</span>
          </div>
          <input type="text" className={styles.searchInput} placeholder="Buscar pesquisador ou arquivo..." />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>PESQUISADOR</th>
              <th>ARQUIVO</th>
              <th>PROJETO</th>
              <th>ENVIADO EM</th>
              <th>PRIORIDADE</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <div className={styles.researcherCell}>
                    <div className={`${styles.avatar} ${styles.purple}`}>{getInitials(doc.author?.name || 'User')}</div>
                    <div className={styles.researcherInfo}>
                      <span className={styles.researcherName}>{doc.author?.name || 'Dr. Pesquisador'}</span>
                      <span className={styles.researcherEmail}>{doc.author?.email || 'email@usp.br'}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.fileCell}>
                    <div className={styles.fileIcon}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className={styles.fileInfo}>
                      <span className={styles.fileName}>{doc.title}</span>
                      <span className={styles.fileSize}>{formatSize(doc.fileUrl)}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.projectCell}>Análise LGPD</td>
                <td className={styles.dateCell}>{new Date(doc.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`${styles.priorityBadge} ${styles.alta}`}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Alta
                  </span>
                </td>
                <td>
                  <div className={styles.actionsCell}>
                    <button 
                      className={styles.btnAnalisar} 
                      onClick={() => handleAnalyze(doc)}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Analisar
                    </button>
                    <button 
                      className={`${styles.btnAction} ${styles.btnApprove}`}
                      onClick={() => { setSelectedDoc(doc); handleApprove(); }}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button 
                      className={`${styles.btnAction} ${styles.btnReject}`}
                      onClick={() => openRejectionModal(doc)}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>
                  Nenhuma submissão pendente no momento.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Analysis Modal */}
      {showAnalysisModal && selectedDoc && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContent} ${styles.large}`}>
            <div className={styles.modalHeader}>
              <div className={styles.fileIcon} style={{ width: '48px', height: '48px' }}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h3 className={styles.modalTitle}>{selectedDoc.title}</h3>
                <div className={styles.modalSubtitle}>
                  {selectedDoc.author?.name || 'Dr. Renata Silva'} • Análise LGPD • 2.4 MB • enviado Hoje
                </div>
              </div>
              <button className={styles.modalClose} onClick={() => setShowAnalysisModal(false)}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className={styles.documentPreview} style={{ padding: '0', height: '60vh', background: '#e2e8f0', display: 'flex', flexDirection: 'column' }}>
              {previewUrl ? (
                <object data={previewUrl} type="application/pdf" width="100%" height="100%" style={{ border: 'none', flex: 1 }}>
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    Seu navegador não suporta a visualização nativa de PDFs. <br/><br/>
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ed-purple)' }}>Clique aqui para baixar</a>
                  </div>
                </object>
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  Carregando visualização do documento...
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <span className={styles.modalFooterText}>Revise o conteúdo antes de decidir.</span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className={styles.btnRejectOutline} onClick={() => openRejectionModal(selectedDoc)}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'text-top' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Rejeitar
                </button>
                <button className={styles.btnConfirmApprove} onClick={handleApprove}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'text-top' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Aprovar documento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && selectedDoc && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={`${styles.modalIcon} ${styles.reject}`}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className={styles.modalTitle}>Rejeitar Submissão</h3>
                <div className={styles.modalSubtitle}>{selectedDoc.title}</div>
              </div>
            </div>
            
            <textarea 
              className={styles.textarea}
              placeholder="Descreva os ajustes necessários ao pesquisador..."
              value={rejectionFeedback}
              onChange={(e) => setRejectionFeedback(e.target.value)}
            />
            
            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setShowRejectionModal(false)}>
                Cancelar
              </button>
              <button className={styles.btnConfirmReject} onClick={handleReject}>
                Confirmar Rejeição
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
