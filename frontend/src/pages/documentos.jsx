import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { getDocuments, getProjects, uploadDocument } from "../services/api"
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

    const loadProjects = async () => {
        const res = await getProjects()
        if (res.sucesso) {
            setProjects(res.dados)
        }
    }

    const loadDocuments = async () => {
        const res = await getDocuments(filterProjectId, filterTitle)
        if (res.sucesso) {
            setDocuments(res.dados)
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

    const handleUpload = async (e) => {
        e.preventDefault()
        setUploadError("")
        setUploadSuccess("")
        
        if (!uploadFile || !uploadTitle || !uploadProjectId) {
            setUploadError("Por favor, preencha todos os campos do upload.")
            return
        }

        const res = await uploadDocument(uploadFile, uploadTitle, uploadProjectId)
        if (res.sucesso) {
            setUploadSuccess("Documento enviado com sucesso!")
            setUploadTitle("")
            setUploadFile(null)
            loadDocuments()
        } else {
            setUploadError(res.mensagem)
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
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Título do Documento" 
                                value={uploadTitle}
                                onChange={(e) => setUploadTitle(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <select 
                                className="form-select" 
                                value={uploadProjectId}
                                onChange={(e) => setUploadProjectId(e.target.value)}
                            >
                                <option value="">Selecione o Projeto</option>
                                {projects.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <input 
                                type="file" 
                                className="form-control" 
                                onChange={(e) => setUploadFile(e.target.files[0])}
                            />
                        </div>
                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-success" style={{ backgroundColor: '#3b1b6d', borderColor: '#3b1b6d' }}>
                                Fazer Upload
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
                                    <a href={`http://localhost:8080${doc.fileUrl}`} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                                        Baixar / Visualizar
                                    </a>
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
