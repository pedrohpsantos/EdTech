import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import ThemeToggle from '../themeToggle';

interface TopbarProps {
    title: string;
    subtitle: string;
    breadcrumbs: string[];
}

const Topbar: React.FC<TopbarProps> = ({ title, subtitle, breadcrumbs }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="topbar-container">
            <div className="topbar-left">
                {breadcrumbs && (
                    <div className="breadcrumbs">
                        {breadcrumbs.map((crumb, index) => (
                            <span key={index}>
                                {index > 0 && <span className="breadcrumb-separator">
                                    <i className="bi bi-chevron-right"></i>
                                </span>}
                                {index === 0 ? (
                                    <span className="breadcrumb-item" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>
                                        {crumb}
                                    </span>
                                ) : (
                                    <span className="breadcrumb-item active">{crumb}</span>
                                )}
                            </span>
                        ))}
                    </div>
                )}
                <h1 className="page-title">{title}</h1>
                {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>
            <div className="topbar-right">
                <button className="btn-upload" onClick={() => navigate('/upload')}>
                    <i className="bi bi-upload"></i> Enviar documento
                </button>
                <div className="topbar-actions">
                    <div className="action-icon-wrapper">
                        <ThemeToggle />
                    </div>
                    <div 
                        className="action-icon-wrapper notification-icon" 
                        style={{position: 'relative', cursor: 'pointer'}}
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <i className="bi bi-bell"></i>
                        <span className="notification-dot"></span>
                        
                        {showNotifications && (
                            <div className="notifications-dropdown" onClick={(e) => e.stopPropagation()}>
                                <div className="dropdown-header">
                                    <h4>Notificações</h4>
                                </div>
                                <div className="dropdown-body">
                                    <div className="notification-item">
                                        <div className="notification-icon-circle bg-green-light"><i className="bi bi-check-circle"></i></div>
                                        <div className="notification-text">
                                            <p><b>Prof. Faria</b> aprovou seu documento.</p>
                                            <span>há 3 h</span>
                                        </div>
                                    </div>
                                    <div className="notification-item">
                                        <div className="notification-icon-circle bg-orange-light"><i className="bi bi-chat-left-text"></i></div>
                                        <div className="notification-text">
                                            <p>Novo comentário em <b>Referencial_Teorico_v2.pdf</b>.</p>
                                            <span>há 1 h</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
