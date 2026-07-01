import React from 'react';
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
                    <div className="action-icon-wrapper notification-icon">
                        <i className="bi bi-bell"></i>
                        <span className="notification-dot"></span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
