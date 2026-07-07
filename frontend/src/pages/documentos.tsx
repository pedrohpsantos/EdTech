import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useDocuments, useUploadDocument, useDownloadUrl } from '../hooks/useDocuments';
import { Document } from '../types';
import '../assets/documentos.css';

const Documentos: React.FC = () => {
  const _navigate = useNavigate();

  // Filtros
  const [filterTitle, setFilterTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  // React Query Hooks
  const { data: _documents = [], isLoading: _loadingDocs } = useDocuments('', filterTitle);
  const { mutateAsync: getUrl } = useDownloadUrl();
  const { mutateAsync: _uploadDoc } = useUploadDocument();

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDownload = async (docId: string) => {
    showToast('Iniciando download seguro...');

    try {
      const url = await getUrl(docId);
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
        showToast('Download finalizado com sucesso!');
      }
    } catch (error: any) {
      showToast('Aviso: Falha ao baixar documento. ' + (error.message || 'Erro ao obter link.'));
    }
  };

  const handleView = async (doc: Document) => {
    setPreviewDoc(doc);
    setIsPreviewLoading(true);
    setPreviewUrl('');
    
    try {
      const url = await getUrl(doc.id);
      if (url) {
        setPreviewUrl(url);
      }
    } catch {
      showToast('Erro ao carregar preview do documento');
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const closePreviewModal = () => {
    setPreviewDoc(null);
  };

  const handleOptions = (docName: string) => {
    showToast(`Carregando opções para: ${docName}`);
  };

  // Modal Handlers
  const openUploadModal = () => setIsUploadModalOpen(true);

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
    setUploadFile(null);
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };

  // Mocks for prototype UI structure
  const mockDocuments: Document[] = [
    {
      id: '1',
      title: 'Metodologia_Qualitativa_v3.pdf',
      project: 'Análise LGPD',
      type: 'PDF',
      size: '2.4 MB',
      modified: 'Hoje, 14:32',
      status: 'Em Revisão',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Dataset_Experimento_A.csv',
      project: 'Sistemas de IA',
      type: 'CSV',
      size: '18.7 MB',
      modified: 'Ontem, 09:15',
      status: 'Aprovado',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Referencial_Teorico_v2.pdf',
      project: 'Análise LGPD',
      type: 'PDF',
      size: '890 KB',
      modified: '12 Jun 2026',
      status: 'Submetido',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'config_modelo_final.json',
      project: 'Sistemas de IA',
      type: 'JSON',
      size: '12 KB',
      modified: '10 Jun 2026',
      status: 'Rascunho',
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Resultados_Parciais_Q2.pdf',
      project: 'Bioinformática',
      type: 'PDF',
      size: '4.1 MB',
      modified: '08 Jun 2026',
      status: 'Aprovado',
      createdAt: new Date().toISOString(),
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Em Revisão':
        return 'status-review';
      case 'Aprovado':
        return 'status-approved';
      case 'Submetido':
        return 'status-submitted';
      case 'Rascunho':
        return 'status-draft';
      default:
        return 'status-draft';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'type-pdf';
      case 'CSV':
        return 'type-csv';
      case 'JSON':
        return 'type-json';
      default:
        return 'type-default';
    }
  };

  return (
    <DashboardLayout
      title="Meus Documentos"
      subtitle="Gerencie seus arquivos de pesquisa e acompanhe submissões"
      breadcrumbs={['EdTech', 'Área de Pesquisa']}
    >
      {/* Top Stats Cards */}
      <div className="stats-row docs-stats-row mb-4">
        <div className="stat-card">
          <div className="stat-header">
            Total de Documentos
            <div className="dot-indicator dot-purple"></div>
          </div>
          <div className="stat-body">
            <span className="stat-value">7</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            Em Revisão
            <div className="dot-indicator dot-orange"></div>
          </div>
          <div className="stat-body">
            <span className="stat-value">1</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            Aprovados
            <div className="dot-indicator dot-green"></div>
          </div>
          <div className="stat-body">
            <span className="stat-value">2</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            Submetidos
            <div className="dot-indicator dot-blue"></div>
          </div>
          <div className="stat-body">
            <span className="stat-value">2</span>
          </div>
        </div>
      </div>

      {/* Banner Upload */}
      <div className="docs-banner-upload">
        <div className="banner-info">
          <span className="banner-subtitle">
            <i className="bi bi-folder2-open me-2"></i> PROJETO ATIVO: ANÁLISE LGPD
          </span>
          <h2 className="banner-title">Adicionar documento ao projeto</h2>
        </div>
        <button className="btn-upload-banner" onClick={openUploadModal}>
          <i className="bi bi-upload"></i> Novo Upload (PDF / CSV / JSON)
        </button>
      </div>

      {/* Document List Header */}
      <div className="docs-list-container dashboard-card mt-4">
        <div className="docs-list-header">
          <div className="d-flex align-items-center gap-2">
            <h3 className="docs-list-title m-0">Meus Documentos</h3>
            <span className="docs-count-badge">7</span>
          </div>
          <div className="docs-filters">
            <div className="search-input-wrapper">
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                className="docs-search-input"
                placeholder="Buscar documento..."
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
              />
            </div>
            <select
              className="docs-status-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Em Revisão">Em Revisão</option>
              <option value="Submetido">Submetido</option>
              <option value="Rascunho">Rascunho</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="docs-table-wrapper">
          <table className="docs-table">
            <thead>
              <tr>
                <th>DOCUMENTO</th>
                <th>PROJETO</th>
                <th>TIPO</th>
                <th>TAMANHO</th>
                <th>MODIFICADO</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mockDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className={`doc-type-icon ${getTypeColor(doc.type)}-bg`}>
                        <i className={`bi bi-file-earmark-text ${getTypeColor(doc.type)}-text`}></i>
                      </div>
                      <span className="doc-title-cell">{doc.title}</span>
                    </div>
                  </td>
                  <td className="text-muted">{doc.project}</td>
                  <td>
                    <span className={`type-badge ${getTypeColor(doc.type)}-text`}>{doc.type}</span>
                  </td>
                  <td className="text-muted">{doc.size}</td>
                  <td className="text-muted">
                    <i className="bi bi-clock me-1"></i> {doc.modified}
                  </td>
                  <td>
                    <span className={`doc-status ${getStatusClass(doc.status)}`}>{doc.status}</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-icon-action"
                        title="Visualizar"
                        onClick={() => handleView(doc as Document)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        className="btn-icon-action"
                        title="Download"
                        onClick={() => handleDownload(doc.id)}
                      >
                        <i className="bi bi-download"></i>
                      </button>
                      <button
                        className="btn-icon-action"
                        title="Opções"
                        onClick={() => handleOptions(doc.title)}
                      >
                        <i className="bi bi-three-dots"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal Overlay */}
      {isUploadModalOpen && (
        <div className="modal-overlay" onClick={closeUploadModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <h3 className="modal-title">Novo Upload</h3>
                <p className="modal-subtitle">PDF, CSV ou JSON - máx. 50 MB</p>
              </div>
              <button className="btn-close-modal" onClick={closeUploadModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body">
              <div
                className={`upload-area ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('modalFileInput')?.click()}
              >
                <div className="upload-icon-circle">
                  <i className="bi bi-upload"></i>
                </div>
                <p className="upload-main-text">
                  {uploadFile ? uploadFile.name : 'Arraste e solte ou clique para selecionar'}
                </p>
                <p className="upload-sub-text">Formatos: .pdf, .csv, .json</p>
                <input
                  id="modalFileInput"
                  type="file"
                  className="d-none"
                  onChange={handleFileInput}
                  accept=".pdf,.json,.csv"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal-cancel" onClick={closeUploadModal}>
                Cancelar
              </button>
              <button className="btn-modal-submit" disabled={!uploadFile}>
                Enviar Arquivo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="modal-overlay" onClick={closePreviewModal} style={{ zIndex: 1050 }}>
          <div className="preview-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="preview-modal-header">
              <div className="d-flex align-items-center gap-3">
                <span className={`type-badge ${getTypeColor(previewDoc.type)}-text`}>
                  {previewDoc.type}
                </span>
                <div>
                  <h3 className="m-0" style={{ fontSize: '18px', color: 'var(--ed-text-light)' }}>
                    {previewDoc.title}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--ed-text-muted)' }}>
                    {previewDoc.size} • {previewDoc.project}
                  </span>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn-icon-action" onClick={() => handleDownload(previewDoc.id)}>
                  <i className="bi bi-download"></i>
                </button>
                <button className="btn-icon-action" onClick={closePreviewModal}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>

            <div className="preview-modal-body" style={{ padding: '0', height: '65vh', display: 'flex', flexDirection: 'column', background: '#e2e8f0' }}>
              {isPreviewLoading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  Carregando visualização do documento...
                </div>
              ) : previewUrl ? (
                <object data={previewUrl} type="application/pdf" width="100%" height="100%" style={{ border: 'none', flex: 1 }}>
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    Seu navegador não suporta a visualização nativa de PDFs. <br/><br/>
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ed-purple)' }}>Clique aqui para baixar</a>
                  </div>
                </object>
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  Nenhum preview disponível.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Premium Toast Notification */}
      {toastMessage && (
        <div className="premium-toast">
          <i className="bi bi-info-circle"></i>
          <span>{toastMessage}</span>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Documentos;
