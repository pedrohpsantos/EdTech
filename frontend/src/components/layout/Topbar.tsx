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
    const firstName = user?.name?.split(' ')[0] || 'Usuário';

    return (
        <header className="topbar-container">
            <div className="topbar-left">
                <div className="breadcrumbs">
                    {breadcrumbs.map((crumb, idx) => (
                        <span key={idx}>
                            {crumb}
                            {idx < breadcrumbs.length - 1 && <span className="breadcrumb-separator"><i className="bi bi-chevron-right"></i></span>}
                        </span>
                    ))}
                </div>
                <h1 className="topbar-title">Bom dia, {firstName}</h1>
                <p className="topbar-subtitle">{subtitle}</p>
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
