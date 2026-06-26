import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { getDocuments, getProjects, uploadDocument, getDownloadUrl } from "../services/api"
import ThemeToggle from "../components/themeToggle"

function Documentos() {
    const navigate = useNavigate()
    
    const [documents, setDocuments] = useState([])
    const [projects, setProjects] = useState([])
    const [filterTitle, setFilterTitle] = useState("")
    const [filterProjectId, setFilterProjectId] = useState("")
    
    // Upload state
    const [uploadTitle, setUploadTitle] = useState("")
    const [uploadProjectId, setUploadProjectId] = useState("")
    const [uploadFile, setUploadFile] = useState(null)
    const [uploadError, setUploadError] = useState("")
    const [uploadSuccess, setUploadSuccess] = useState("")
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    const loadProjects = async () => {
        const res = await getProjects()
        if (res.sucesso) {
            setProjects(res.dados)
        }
    }

    const loadDocuments = async () => {
        const res = await getDocuments(filterProjectId, filterTitle)
        if (res.sucesso) {
            setDocuments(res.dados.content || res.dados || [])
        }
    }

    const handleDownload = async (docId) => {
        const res = await getDownloadUrl(docId)
        if (res.sucesso) {
            const url = typeof res.dados === 'string' ? res.dados : (res.dados?.url || res.dados?.downloadUrl || res.dados?.fileUrl);
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                alert("URL de download não encontrada na resposta.");
            }
        } else {
            alert(res.mensagem || "Erro ao obter link de download.");
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProjects()
        loadDocuments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFilter = (e) => {
        e.preventDefault()
        loadDocuments()
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setUploadFile(e.dataTransfer.files[0])
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        setUploadError("")
        setUploadSuccess("")
        setUploadProgress(0)
        
        if (!uploadFile || !uploadTitle || !uploadProjectId) {
            setUploadError("Por favor, preencha todos os campos do upload.")
            return
        }

        const res = await uploadDocument(uploadFile, uploadTitle, uploadProjectId, (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(percentCompleted)
        })

        if (res.sucesso) {
            setUploadSuccess("Documento enviado com sucesso!")
            setUploadTitle("")
            setUploadFile(null)
            setTimeout(() => setUploadProgress(0), 3000)
            loadDocuments()
        } else {
            setUploadError(res.mensagem)
            setUploadProgress(0)
        }
    }

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
                                {projects.map(p => (
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
                                {projects.map(p => (
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
                                onClick={() => document.getElementById('fileInput').click()}
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
                                    onChange={(e) => setUploadFile(e.target.files[0])}
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
                                        aria-valuemin="0" 
                                        aria-valuemax="100"
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
                {documents.length === 0 ? (
                    <div className="col-12 text-center text-muted">Nenhum documento encontrado.</div>
                ) : (
                    documents.map(doc => (
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
    )
}

export default Documentos
