import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useProjects } from '../hooks/useProjects';
import { useUploadDocument } from '../hooks/useDocuments';
import { Project } from '../types';
import { useAuth } from '../context/authContext';

const Upload: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const firstName = user?.name?.split(' ')[0] || 'Usuário';

    const { data: projects = [] } = useProjects();
    const { mutateAsync: uploadDoc } = useUploadDocument();

    const [uploadTitle, setUploadTitle] = useState("");
    const [uploadProjectId, setUploadProjectId] = useState("");
    const [uploadTags, setUploadTags] = useState("");
    const [uploadCategory, setUploadCategory] = useState("");
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

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

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploadError("");
        setUploadSuccess("");
        setUploadProgress(0);
        
        if (!uploadFile || !uploadTitle || !uploadProjectId) {
            setUploadError("Por favor, preencha todos os campos obrigatórios (Título, Projeto e Arquivo).");
            return;
        }

        try {
            await uploadDoc({
                file: uploadFile, 
                title: uploadTitle, 
                projectId: uploadProjectId, 
                onProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });

            setUploadSuccess("Documento enviado com sucesso! Redirecionando para o Workspace...");
            setTimeout(() => {
                navigate('/documentos');
            }, 2000);
        } catch (error: any) {
            setUploadError(error.message);
            setUploadProgress(0);
        }
    };

    return (
        <DashboardLayout
            title={`Bom dia, ${firstName}`}
            subtitle="Adicione novos metadados e envie arquivos para os seus projetos"
            breadcrumbs={['EdTech', 'Enviar Documento']}
        >
            <div className="dashboard-card" style={{ padding: '32px', backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                {uploadError && (
                    <div className="governance-alert" style={{ background: 'var(--ed-status-danger)', marginBottom: '24px' }}>
                        <div className="alert-content">
                            <div className="alert-icon"><i className="bi bi-exclamation-triangle"></i></div>
                            <div className="alert-text-container">
                                <span className="alert-title">ERRO NO UPLOAD</span>
                                <span className="alert-desc">{uploadError}</span>
                            </div>
                        </div>
                    </div>
                )}

                {uploadSuccess && (
                    <div className="governance-alert" style={{ background: 'var(--ed-status-success)', marginBottom: '24px' }}>
                        <div className="alert-content">
                            <div className="alert-icon"><i className="bi bi-check-circle"></i></div>
                            <div className="alert-text-container">
                                <span className="alert-title">SUCESSO</span>
                                <span className="alert-desc">{uploadSuccess}</span>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleUpload} className="upload-advanced-form">
                    <div className="upload-grid">
                        {/* Coluna 1: Metadados */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ed-purple-light)', opacity: 0.9, marginBottom: '4px' }}>1. Metadados do Documento</h4>
                            
                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--ed-text-dark)' }}>Título do Documento *</label>
                                <input 
                                    type="text" 
                                    placeholder="Ex: Metodologia Qualitativa v3" 
                                    value={uploadTitle}
                                    onChange={(e) => setUploadTitle(e.target.value)}
                                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.1)', color: 'var(--ed-text-dark)', fontSize: '14px', outline: 'none' }}
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--ed-text-dark)' }}>Projeto de Pesquisa *</label>
                                <select 
                                    value={uploadProjectId}
                                    onChange={(e) => setUploadProjectId(e.target.value)}
                                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.1)', color: 'var(--ed-text-dark)', fontSize: '14px', outline: 'none' }}
                                >
                                    <option value="">Selecione o Projeto...</option>
                                    {projects.map((p: Project) => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--ed-text-dark)' }}>Categoria</label>
                                <select 
                                    value={uploadCategory}
                                    onChange={(e) => setUploadCategory(e.target.value)}
                                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.1)', color: 'var(--ed-text-dark)', fontSize: '14px', outline: 'none' }}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Metodologia">Metodologia</option>
                                    <option value="Dataset">Dataset (Conjunto de Dados)</option>
                                    <option value="Referencial Teórico">Referencial Teórico</option>
                                    <option value="Resultados">Resultados</option>
                                    <option value="Configuração/Modelo">Configuração de Modelo</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--ed-text-dark)' }}>Tags (separadas por vírgula)</label>
                                <input 
                                    type="text" 
                                    placeholder="Ex: LGPD, IA, Dados Sensíveis" 
                                    value={uploadTags}
                                    onChange={(e) => setUploadTags(e.target.value)}
                                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.1)', color: 'var(--ed-text-dark)', fontSize: '14px', outline: 'none' }}
                                />
                            </div>
                        </div>

                        {/* Coluna 2: Arquivo */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ed-purple-light)', opacity: 0.9, marginBottom: '4px' }}>2. Arquivo do Documento</h4>
                            
                            <div 
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById('advancedFileInput')?.click()}
                                style={{ flex: 1, minHeight: '250px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: 'transparent', cursor: 'pointer', opacity: isDragging ? 0.7 : 1, transition: 'opacity 0.2s' }}
                            >
                                <div style={{ fontSize: '24px', color: 'var(--ed-text-dark)', marginBottom: '16px' }}>
                                    {uploadFile ? <i className="bi bi-file-earmark-check"></i> : <i className="bi bi-cloud-arrow-up"></i>}
                                </div>
                                <p style={{ fontSize: '15px', color: 'var(--ed-text-dark)', fontWeight: 600, margin: '0 0 8px 0' }}>
                                    {uploadFile ? uploadFile.name : 'Arraste e solte seu arquivo aqui'}
                                </p>
                                <p style={{ fontSize: '13px', color: 'var(--ed-text-muted)', margin: 0 }}>
                                    ou clique para procurar no seu computador
                                </p>
                                <p style={{ fontSize: '12px', marginTop: '24px', color: 'var(--ed-text-muted)', margin: '24px 0 0 0' }}>
                                    Formatos suportados: .pdf, .csv, .json (Máx. 50MB)
                                </p>
                                <input 
                                    id="advancedFileInput"
                                    type="file" 
                                    className="d-none" 
                                    onChange={handleFileInput}
                                    accept=".pdf,.json,.csv"
                                />
                            </div>
                            
                            {uploadProgress > 0 && (
                                <div className="progress-item mt-2">
                                    <div className="progress-header">
                                        <span>Enviando {uploadFile?.name}...</span>
                                        <span>{uploadProgress}%</span>
                                    </div>
                                    <div className="progress-bar-bg">
                                        <div className="progress-bar-fill fill-purple" style={{ width: `${uploadProgress}%`, transition: 'width 0.3s' }}></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
                        <button type="button" onClick={() => navigate(-1)} style={{ padding: '12px 32px', background: 'transparent', border: '1px solid var(--ed-text-muted)', color: 'var(--ed-text-dark)', borderRadius: '6px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
                            Cancelar
                        </button>
                        <button type="submit" disabled={!uploadFile || uploadProgress > 0} style={{ padding: '12px 48px', backgroundColor: uploadFile ? 'var(--ed-purple-main)' : 'rgba(255,255,255,0.03)', color: uploadFile ? 'white' : 'rgba(255,255,255,0.3)', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 500, cursor: uploadFile ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
                            {uploadProgress > 0 && uploadProgress < 100 ? 'Enviando...' : 'Confirmar Envio'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default Upload;
