import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useProjects } from '../hooks/useProjects';
import { useDocuments, useUploadDocument, useDownloadUrl } from '../hooks/useDocuments';
import { Document } from '../types';
import '../assets/documentos.css';

const Documentos: React.FC = () => {
    const navigate = useNavigate();
    
    // Filtros
    const [filterTitle, setFilterTitle] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    // Modal State
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [toastMessage, setToastMessage] = useState("");

    // React Query Hooks
    const { data: documents = [], isLoading: loadingDocs } = useDocuments("", filterTitle);
    const { mutateAsync: getUrl } = useDownloadUrl();
    const { mutateAsync: uploadDoc } = useUploadDocument();

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(""), 3000);
    };

    const handleDownload = async (docId: string) => {
        showToast("Iniciando download seguro...");
        
        try {
            const url = await getUrl(docId);
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
                showToast("Download finalizado com sucesso!");
            }
        } catch (error: any) {
            showToast("Aviso: Falha ao baixar documento. " + (error.message || "Erro ao obter link."));
        }
    };

    const handleView = (doc: Document) => {
        setPreviewDoc(doc);
        setIsPreviewLoading(true);
        setTimeout(() => {
            setIsPreviewLoading(false);
        }, 2000);
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
    const mockDocuments = [
        { id: '1', title: 'Metodologia_Qualitativa_v3.pdf', project: 'Análise LGPD', type: 'PDF', size: '2.4 MB', modified: 'Hoje, 14:32', status: 'Em Revisão' },
        { id: '2', title: 'Dataset_Experimento_A.csv', project: 'Sistemas de IA', type: 'CSV', size: '18.7 MB', modified: 'Ontem, 09:15', status: 'Aprovado' },
        { id: '3', title: 'Referencial_Teorico_v2.pdf', project: 'Análise LGPD', type: 'PDF', size: '890 KB', modified: '12 Jun 2026', status: 'Submetido' },
        { id: '4', title: 'config_modelo_final.json', project: 'Sistemas de IA', type: 'JSON', size: '12 KB', modified: '10 Jun 2026', status: 'Rascunho' },
        { id: '5', title: 'Resultados_Parciais_Q2.pdf', project: 'Bioinformática', type: 'PDF', size: '4.1 MB', modified: '08 Jun 2026', status: 'Aprovado' },
    ];

    const getStatusClass = (status: string) => {
        switch(status) {
            case 'Em Revisão': return 'status-review';
            case 'Aprovado': return 'status-approved';
            case 'Submetido': return 'status-submitted';
            case 'Rascunho': return 'status-draft';
            default: return 'status-draft';
        }
    };

    const getTypeColor = (type: string) => {
        switch(type) {
            case 'PDF': return 'type-pdf';
            case 'CSV': return 'type-csv';
            case 'JSON': return 'type-json';
            default: return 'type-default';
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
                    <span className="banner-subtitle"><i className="bi bi-folder2-open me-2"></i> PROJETO ATIVO: ANÁLISE LGPD</span>
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
                                        <span className={`type-badge ${getTypeColor(doc.type)}-text`}>
                                            {doc.type}
                                        </span>
                                    </td>
                                    <td className="text-muted">{doc.size}</td>
                                    <td className="text-muted">
                                        <i className="bi bi-clock me-1"></i> {doc.modified}
                                    </td>
                                    <td>
                                        <span className={`doc-status ${getStatusClass(doc.status)}`}>
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="btn-icon-action" title="Visualizar" onClick={() => handleView(doc)}>
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button className="btn-icon-action" title="Download" onClick={() => handleDownload(doc.id)}>
                                                <i className="bi bi-download"></i>
                                            </button>
                                            <button className="btn-icon-action" title="Opções" onClick={() => handleOptions(doc.name)}>
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
                                <p className="upload-sub-text">
                                    Formatos: .pdf, .csv, .json
                                </p>
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
                                    <h3 className="m-0" style={{ fontSize: '18px', color: 'var(--ed-text-light)' }}>{previewDoc.name}</h3>
                                    <span style={{ fontSize: '12px', color: 'var(--ed-text-muted)' }}>{previewDoc.size} • {previewDoc.project}</span>
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
                        
                        <div className="preview-modal-body">
                            <div className="dummy-document-viewer">
                                {isPreviewLoading ? (
                                    <div className="dummy-page loading-shimmer">
                                        <div className="dummy-line title"></div>
                                        <div className="dummy-line"></div>
                                        <div className="dummy-line"></div>
                                        <div className="dummy-line"></div>
                                        <div className="dummy-line short"></div>
                                        
                                        <div className="dummy-image">
                                            <i className="bi bi-image" style={{ fontSize: '48px', color: 'rgba(255,255,255,0.1)' }}></i>
                                        </div>

                                        <div className="dummy-line"></div>
                                        <div className="dummy-line"></div>
                                        <div className="dummy-line short"></div>
                                    </div>
                                ) : (
                                    <div className="dummy-page document-content">
                                        <h2 style={{ color: 'var(--ed-text-dark)', marginBottom: '24px' }}>{previewDoc.name}</h2>
                                        <p style={{ color: '#4a4a4a', lineHeight: '1.6', marginBottom: '16px' }}>
                                            Este é um documento de visualização fictício para o arquivo selecionado.
                                            Na versão final do sistema conectado ao Storage, aqui será renderizado o conteúdo nativo
                                            do arquivo (PDF Viewer integrado, tabela de dados CSV ou renderizador JSON).
                                        </p>
                                        <p style={{ color: '#4a4a4a', lineHeight: '1.6', marginBottom: '16px' }}>
                                            A plataforma EdTech garante acesso seguro e auditado. Todas as ações de visualização
                                            são registradas nos logs de segurança da <strong>Trilha de Pesquisa</strong>.
                                        </p>
                                        
                                        <div style={{ backgroundColor: 'var(--code-bg)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '32px' }}>
                                            <h4 style={{ color: 'var(--ed-purple-main)', marginTop: 0, marginBottom: '12px' }}>Detalhes do Arquivo</h4>
                                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: 'var(--ed-text-muted)', fontSize: '14px' }}>
                                                <li style={{ marginBottom: '8px' }}><strong>ID do Registro:</strong> {previewDoc.id}</li>
                                                <li style={{ marginBottom: '8px' }}><strong>Projeto / Workpace:</strong> {previewDoc.project}</li>
                                                <li style={{ marginBottom: '8px' }}><strong>Tamanho Identificado:</strong> {previewDoc.size}</li>
                                                <li><strong>Status de Conformidade:</strong> <span style={{ color: 'var(--ed-green-main)' }}>Validado</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
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
