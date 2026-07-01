import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import '../assets/settings.css';
import { useAuth } from '../context/authContext';

const Settings: React.FC = () => {
    const { user } = useAuth();
    const [reviewEmails, setReviewEmails] = useState(true);
    const [strictLgpd, setStrictLgpd] = useState(true);

    return (
        <DashboardLayout
            title="Configurações"
            subtitle="Perfil, preferências de IA e governança"
            breadcrumbs={['EdTech', 'Configurações']}
        >
            <div className="settings-container">
                {/* Perfil */}
                <div className="settings-card">
                    <h3 className="settings-section-title">Perfil</h3>
                    <div className="settings-profile-row">
                        <div className="settings-avatar">RS</div>
                        <div className="settings-profile-info">
                            <span className="profile-name">Dra. Renata Silva</span>
                            <span className="profile-email">renata.silva@usp.br</span>
                        </div>
                        <div className="settings-profile-actions">
                            <span className="settings-badge-role">Pesquisador</span>
                            <button className="btn-outline">Editar perfil</button>
                        </div>
                    </div>
                </div>

                {/* Notificações */}
                <div className="settings-card">
                    <h3 className="settings-section-title">Notificações</h3>
                    
                    <div className="settings-item">
                        <div className="settings-item-icon bg-purple-light">
                            <i className="bi bi-bell"></i>
                        </div>
                        <div className="settings-item-content">
                            <span className="settings-item-title">E-mails de revisão</span>
                            <span className="settings-item-desc">Receber e-mail quando documentos forem revisados ou comentados</span>
                        </div>
                        <div className="settings-item-action">
                            <label className="ed-switch">
                                <input type="checkbox" checked={reviewEmails} onChange={(e) => setReviewEmails(e.target.checked)} />
                                <span className="ed-slider"></span>
                            </label>
                        </div>
                    </div>

                    <div className="settings-item no-border">
                        <div className="settings-item-icon bg-purple-light">
                            <i className="bi bi-person"></i>
                        </div>
                        <div className="settings-item-content">
                            <span className="settings-item-title">Menções e atribuições</span>
                            <span className="settings-item-desc">Notificar quando você for mencionado em uma trilha</span>
                        </div>
                        <div className="settings-item-action">
                            <span className="settings-badge-active">Ativo</span>
                        </div>
                    </div>
                </div>

                {/* Governança */}
                <div className="settings-card">
                    <h3 className="settings-section-title">Governança</h3>
                    
                    <div className="settings-item no-border">
                        <div className="settings-item-icon bg-purple-light">
                            <i className="bi bi-shield-check"></i>
                        </div>
                        <div className="settings-item-content">
                            <span className="settings-item-title">Modo LGPD estrito</span>
                            <span className="settings-item-desc">Bloquear submissões com dados pessoais não anonimizados</span>
                        </div>
                        <div className="settings-item-action">
                            <label className="ed-switch">
                                <input type="checkbox" checked={strictLgpd} onChange={(e) => setStrictLgpd(e.target.checked)} />
                                <span className="ed-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
