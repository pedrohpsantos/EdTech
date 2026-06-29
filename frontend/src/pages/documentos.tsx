import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { useDocuments, useUploadDocument, useDownloadUrl } from "../hooks/useDocuments";
import ThemeToggle from "../components/themeToggle";
import { Document, Project } from "../types";

function Documentos() {
    const navigate = useNavigate();
    
    // Filtros e Paginação (no RQ)
    const [filterTitle, setFilterTitle] = useState("");
    const [filterProjectId, setFilterProjectId] = useState("");
    
    // React Query Hooks
    const { data: projects = [], isLoading: loadingProjects } = useProjects();
    const { data: documents = [], isLoading: loadingDocs, refetch } = useDocuments(filterProjectId, filterTitle);
    const { mutateAsync: uploadDoc } = useUploadDocument();
    const { mutateAsync: getUrl } = useDownloadUrl();
    
    // Upload state local (UI)
    const [uploadTitle, setUploadTitle] = useState("");
    const [uploadProjectId, setUploadProjectId] = useState("");
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const handleDownload = async (docId: string) => {
        try {
            const url = await getUrl(docId);
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                alert("URL de download não encontrada na resposta.");
            }
        } catch (error: any) {
            alert(error.message || "Erro ao obter link de download.");
        }
    };

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        refetch();
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

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploadError("");
        setUploadSuccess("");
        setUploadProgress(0);
        
        if (!uploadFile || !uploadTitle || !uploadProjectId) {
            setUploadError("Por favor, preencha todos os campos do upload.");
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

            setUploadSuccess("Documento enviado com sucesso!");
            setUploadTitle("");
            setUploadFile(null);
            setTimeout(() => setUploadProgress(0), 3000);
        } catch (error: any) {
            setUploadError(error.message);
            setUploadProgress(0);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 style={{ color: '#220c46' }}>Documentos</h1>
                <div>
                    <button className="btn btn-secondary me-2" onClick={() => navigate('/dashboard')}>Voltar</button>
                    <ThemeToggle />
                </div>
            </div>

            {/* Filter Section */}
            <div className="card mb-4">
                <div className="card-header">Filtrar Documentos</div>
                <div className="card-body">
                    <form onSubmit={handleFilter} className="row g-3">
                        <div className="col-md-5">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Buscar por título" 
                                value={filterTitle}
                                onChange={(e) => setFilterTitle(e.target.value)}
                            />
                        </div>
                        <div className="col-md-5">
                            <select 
                                className="form-select" 
                                value={filterProjectId}
                                onChange={(e) => setFilterProjectId(e.target.value)}
                            >
                                <option value="">Todos os Projetos</option>
                                {projects.map((p: Project) => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#3b1b6d', borderColor: '#3b1b6d' }}>
                                Filtrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Upload Section */}
            <div className="card mb-4">
                <div className="card-header">Enviar Novo Documento</div>
                <div className="card-body">
                    {uploadError && <div className="alert alert-danger">{uploadError}</div>}
                    {uploadSuccess && <div className="alert alert-success">{uploadSuccess}</div>}
                    <form onSubmit={handleUpload} className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label fw-bold">1. Título e Projeto</label>
                            <input 
                                type="text" 
                                className="form-control mb-3" 
                                placeholder="Título do Documento" 
                                value={uploadTitle}
                                onChange={(e) => setUploadTitle(e.target.value)}
                            />
                            <select 
                                className="form-select mb-3" 
                                value={uploadProjectId}
                                onChange={(e) => setUploadProjectId(e.target.value)}
                            >
                                <option value="">Selecione o Projeto</option>
                                {projects.map((p: Project) => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-8">
                            <label className="form-label fw-bold">2. Arquivo (Drag & Drop)</label>
                            <div 
                                className={`border rounded p-4 text-center ${isDragging ? 'border-primary bg-light' : 'border-secondary'}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                style={{ borderStyle: 'dashed !important', borderWidth: '2px', cursor: 'pointer', transition: 'all 0.3s' }}
                                onClick={() => document.getElementById('fileInput')?.click()}
                            >
                                {uploadFile ? (
                                    <div>
                                        <p className="mb-1 fw-bold text-success">Arquivo selecionado: {uploadFile.name}</p>
                                        <small className="text-muted">Clique ou arraste outro para alterar</small>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="mb-1">Arraste e solte o PDF aqui ou clique para selecionar</p>
                                    </div>
                                )}
                                <input 
                                    id="fileInput"
                                    type="file" 
                                    className="d-none" 
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setUploadFile(e.target.files[0])
                                        }
                                    }}
                                    accept=".pdf,.json,.csv"
                                />
                            </div>
                        </div>
                        {uploadProgress > 0 && (
                            <div className="col-12 mt-3">
                                <div className="progress" style={{ height: '20px' }}>
                                    <div 
                                        className="progress-bar progress-bar-striped progress-bar-animated bg-success" 
                                        role="progressbar" 
                                        style={{ width: `${uploadProgress}%` }}
                                        aria-valuenow={uploadProgress} 
                                        aria-valuemin={0} 
                                        aria-valuemax={100}
                                    >
                                        {uploadProgress}%
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="col-12 text-end mt-3">
                            <button type="submit" className="btn btn-success" disabled={uploadProgress > 0 && uploadProgress < 100} style={{ backgroundColor: '#3b1b6d', borderColor: '#3b1b6d' }}>
                                {uploadProgress > 0 && uploadProgress < 100 ? 'Enviando...' : 'Fazer Upload'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Document List */}
            <div className="row">
                {loadingDocs ? (
                     <div className="col-12 text-center text-muted">Carregando documentos...</div>
                ) : documents.length === 0 ? (
                    <div className="col-12 text-center text-muted">Nenhum documento encontrado.</div>
                ) : (
                    documents.map((doc: Document) => (
                        <div className="col-md-4 mb-3" key={doc.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{doc.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Status: {doc.status}</h6>
                                    <p className="card-text">
                                        Data: {new Date(doc.createdAt).toLocaleDateString()}
                                    </p>
                                    <button onClick={() => handleDownload(doc.id)} className="btn btn-outline-primary btn-sm">
                                        Baixar / Visualizar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Documentos;
