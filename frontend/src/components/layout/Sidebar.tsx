import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import logo from '../../assets/svgs/logo-white.svg';
import '../../assets/dashboard.css';

const Sidebar: React.FC = () => {
    const { user, handleLogout } = useAuth();

    return (
        <aside className="sidebar-container">
            <div className="sidebar-header">
                <div className="logo-section">
                    <img src={logo} alt="EdTech Logo" style={{ height: '32px' }} />
                    <span className="logo-text">EdTech</span>
                </div>
                <div className="role-badge">
                    <span className="badge-dot"></span>
                    PESQUISADOR
                </div>
            </div>

            <div className="sidebar-scrollable">
                <div className="nav-section">
                    <h6 className="nav-section-title">GERAL</h6>
                    <nav className="nav-links">
                        <NavLink to="/dashboard" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                            <i className="bi bi-grid"></i> Overview
                            <i className="bi bi-chevron-right ms-auto arrow-icon"></i>
                        </NavLink>
                        <NavLink to="/documentos" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                            <i className="bi bi-folder"></i> Research Workspace
                        </NavLink>
                    </nav>
                </div>

                <div className="nav-section">
                    <h6 className="nav-section-title">INTELIGÊNCIA</h6>
                    <nav className="nav-links">
                        <NavLink to="/trail" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                            <i className="bi bi-diagram-3"></i> Research Trail
                        </NavLink>
                    </nav>
                </div>

                <div className="nav-section">
                    <h6 className="nav-section-title">GOVERNANÇA</h6>
                    <nav className="nav-links">
                        <NavLink to="/settings" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                            <i className="bi bi-gear"></i> Settings
                        </NavLink>
                    </nav>
                </div>
            </div>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="avatar">
                        {user?.name?.substring(0, 2).toUpperCase() || 'RS'}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user?.name || 'Dra. Renata Silva'}</span>
                        <span className="user-email">{user?.email || 'renata.silva@usp.br'}</span>
                    </div>
                    <button className="logout-btn" onClick={handleLogout} title="Sair">
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
