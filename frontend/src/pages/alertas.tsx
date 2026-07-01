import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import '../assets/dashboard.css';

const Alertas: React.FC = () => {
    const navigate = useNavigate();

    return (
        <DashboardLayout
            title="Alertas de Governança"
            subtitle="Central de ações e pendências de compliance e qualidade de pesquisa"
            breadcrumbs={['EdTech', 'Overview', 'Alertas']}
        >
            {/* Top Critical Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div className="governance-alert" style={{ background: 'var(--ed-status-danger)', margin: 0 }}>
                    <div className="alert-content">
                        <div className="alert-icon" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}><i className="bi bi-shield-lock"></i></div>
                        <div className="alert-text-container">
                            <span className="alert-title text-white">ALTO RISCO (1)</span>
                            <span className="alert-desc text-white">Anonimização de dados LGPD obrigatória antes do envio para a Nuvem.</span>
                        </div>
                    </div>
                </div>

                <div className="governance-alert" style={{ background: 'var(--ed-orange)', margin: 0 }}>
                    <div className="alert-content">
                        <div className="alert-icon" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}><i className="bi bi-journal-x"></i></div>
                        <div className="alert-text-container">
                            <span className="alert-title text-white">ATENÇÃO (2)</span>
                            <span className="alert-desc text-white">Documentos detectados com seções de metodologia incompletas.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="grid-left" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Metodologias Incompletas */}
                    <div className="dashboard-card">
                        <div className="card-header-flex">
                            <div>
                                <h3 className="card-title">Metodologias Incompletas</h3>
                                <p className="card-title-muted mt-1">É necessário preencher os campos de delineamento do estudo para seguir o checklist institucional.</p>
                            </div>
                        </div>
                        <div className="doc-list">
                            <div className="doc-item">
                                <div className="doc-info">
                                    <div className="doc-icon"><i className="bi bi-file-earmark-pdf"></i></div>
                                    <div className="doc-details">
                                        <span className="doc-name">Metodologia_Qualitativa_v3.pdf</span>
                                        <span className="doc-meta">Projeto: Análise LGPD · Status: <span className="text-warning">Aguardando Preenchimento</span></span>
                                    </div>
                                </div>
                                <div className="doc-actions">
                                    <button className="btn-outline-action" style={{ borderColor: 'var(--ed-orange)', color: 'var(--ed-orange)' }}>Preencher Seções</button>
                                </div>
                            </div>
                            <div className="doc-item">
                                <div className="doc-info">
                                    <div className="doc-icon"><i className="bi bi-file-earmark-pdf"></i></div>
                                    <div className="doc-details">
                                        <span className="doc-name">Coleta_Entrevistas_Jun.pdf</span>
                                        <span className="doc-meta">Projeto: Sistemas de IA · Status: <span className="text-warning">Aguardando Preenchimento</span></span>
                                    </div>
                                </div>
                                <div className="doc-actions">
                                    <button className="btn-outline-action" style={{ borderColor: 'var(--ed-orange)', color: 'var(--ed-orange)' }}>Preencher Seções</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Risco LGPD */}
                    <div className="dashboard-card border-danger">
                        <div className="card-header-flex border-bottom-0 pb-0">
                            <div>
                                <h3 className="card-title text-danger">Risco de Privacidade (LGPD)</h3>
                                <p className="card-title-muted mt-1">Dados pessoais sensíveis (PII) foram detectados nos cabeçalhos dos datasets abaixo.</p>
                            </div>
                        </div>
                        <div className="doc-list mt-3 border-top">
                            <div className="doc-item">
                                <div className="doc-info">
                                    <div className="doc-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--ed-status-danger)' }}>
                                        <i className="bi bi-file-earmark-spreadsheet"></i>
                                    </div>
                                    <div className="doc-details">
                                        <span className="doc-name">Dataset_Pacientes_RAW.csv</span>
                                        <span className="doc-meta">Projeto: Bioinformática · 14.2 MB</span>
                                        <div className="mt-1">
                                            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger rounded-pill px-2 py-1" style={{ fontSize: '10px' }}>CPF Detectado</span>
                                            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger rounded-pill px-2 py-1 ms-1" style={{ fontSize: '10px' }}>E-mail Detectado</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="doc-actions">
                                    <button className="btn-modal-submit" style={{ padding: '8px 16px', fontSize: '13px' }}><i className="bi bi-magic me-2"></i>Aplicar Anonimização Automática</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-right">
                    {/* Histórico Resolvido */}
                    <div className="dashboard-card">
                        <div className="card-header-flex">
                            <span className="card-title">Resolvidos Recentemente</span>
                        </div>
                        <div className="activity-feed-content">
                            <div className="activity-item">
                                <div className="activity-icon bg-green-light"><i className="bi bi-check-circle"></i></div>
                                <div className="activity-details">
                                    <span className="activity-text">Termo de Consentimento inserido em <b>Entrevista_User2.pdf</b></span>
                                    <span className="activity-time">Hoje, 09:15</span>
                                </div>
                            </div>
                            
                            <div className="activity-item">
                                <div className="activity-icon bg-green-light"><i className="bi bi-shield-check"></i></div>
                                <div className="activity-details">
                                    <span className="activity-text">Anonimização LGPD aplicada em <b>Logs_Acesso_2026.csv</b></span>
                                    <span className="activity-time">Ontem, 16:40</span>
                                </div>
                            </div>

                            <div className="activity-item">
                                <div className="activity-icon bg-green-light"><i className="bi bi-file-earmark-check"></i></div>
                                <div className="activity-details">
                                    <span className="activity-text">Metodologia validada no projeto <b>Sistemas de IA</b></span>
                                    <span className="activity-time">10 Jun 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Alertas;
