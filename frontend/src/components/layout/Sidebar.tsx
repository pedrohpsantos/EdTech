import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

import '../../assets/dashboard.css';

const Sidebar: React.FC = () => {
  const { user, handleLogout } = useAuth();
  const [clickCount, setClickCount] = useState(0);
  // Estado para controlar a abertura do menu no mobile
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 7) {
      alert('🎉 Easter Egg Encontrado! Bem-vindo ao laboratório secreto da EdTech AILAB Makers!');
      setClickCount(0);
    }
  };

  // Função auxiliar para fechar a barra ao clicar em uma rota (experiência Mobile fluida)
  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Botão Hambúrguer flutuante: Visível APENAS em telas menores (Mobile/Tablet) */}
      <button 
        className={`sidebar-mobile-toggle d-md-none ${isMobileOpen ? 'open' : ''}`}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle Navigation"
      >
        <i className={`bi ${isMobileOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
      </button>

      {/* Backdrop (Fundo escurecido) para fechar o menu ao clicar fora dele no mobile */}
      {isMobileOpen && (
        <div className="sidebar-backdrop d-md-none" onClick={closeMobileSidebar} />
      )}

      {/* Aside com a classe condicional 'active-mobile' se o estado for true */}
      <aside className={`sidebar-container ${isMobileOpen ? 'active-mobile' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-section" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <svg width="32" height="32" viewBox="0 0 100 100" style={{ marginRight: '8px' }}>
              <line x1="20" y1="25" x2="80" y2="25" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
              <line x1="20" y1="50" x2="55" y2="50" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
              <line x1="20" y1="75" x2="80" y2="75" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
              <line x1="20" y1="25" x2="20" y2="75" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
              <circle cx="20" cy="25" r="8" fill="#FFFFFF" />
              <circle cx="80" cy="25" r="8" fill="#FFFFFF" />
              <circle cx="20" cy="50" r="8" fill="#FFFFFF" />
              <circle cx="55" cy="50" r="8" fill="#FF9100" />
              <circle cx="20" cy="75" r="8" fill="#FFFFFF" />
              <circle cx="80" cy="75" r="8" fill="#FFFFFF" />
            </svg>
            <span className="logo-text">EdTech</span>
          </div>
          <div className="role-badge">
            <span className="badge-dot"></span>
            {user?.role === 'ADVISOR' ? 'ORIENTADOR' : user?.role === 'AUDITOR' ? 'AUDITOR' : 'PESQUISADOR'}
          </div>
        </div>

        <div className="sidebar-scrollable">
          <div className="nav-section">
            <span className="nav-section-title">GERAL</span>
            <div className="nav-links">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                onClick={closeMobileSidebar}
              >
                <i className="bi bi-grid-1x2"></i> Visão Geral
                <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
              </NavLink>
              {user?.role === 'RESEARCHER' && (
                <>
                  <NavLink
                    to="/documentos"
                    className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                    onClick={closeMobileSidebar}
                  >
                    <i className="bi bi-folder2-open"></i> Área de Pesquisa
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                  <NavLink
                    to="/projects"
                    className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                    onClick={closeMobileSidebar}
                  >
                    <i className="bi bi-briefcase"></i> Projetos
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                </>
              )}
              {user?.role === 'ADVISOR' && (
                <NavLink
                  to="/submissions"
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                  onClick={closeMobileSidebar}
                >
                  <i className="bi bi-play-circle"></i> Submissões
                  <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                </NavLink>
              )}
            </div>
          </div>

          {user?.role !== 'AUDITOR' && (
            <div className="nav-section">
              <span className="nav-section-title">INTELIGÊNCIA</span>
              <div className="nav-links">
                <NavLink
                  to="/trail"
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                  onClick={closeMobileSidebar}
                >
                  <i className="bi bi-diagram-3"></i> Trilha de Pesquisa
                  <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                </NavLink>
                {user?.role === 'ADVISOR' && (
                  <NavLink
                    to="/analytics"
                    className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                    onClick={closeMobileSidebar}
                  >
                    <i className="bi bi-graph-up-arrow"></i> Análises
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                )}
              </div>
            </div>
          )}

          <div className="nav-section">
            <span className="nav-section-title">GOVERNANÇA</span>
            <div className="nav-links">
              {user?.role === 'AUDITOR' && (
                <>
                  <NavLink
                    to="/compliance-center"
                    className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                    onClick={closeMobileSidebar}
                  >
                    <i className="bi bi-shield-check"></i> Centro de Conformidade
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                  <NavLink
                    to="/audit-logs"
                    className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                    onClick={closeMobileSidebar}
                  >
                    <i className="bi bi-journal-text"></i> Logs de Auditoria
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                </>
              )}
              <NavLink
                to="/settings"
                className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                onClick={closeMobileSidebar}
              >
                <i className="bi bi-gear"></i> Configurações
              </NavLink>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">{user?.name?.substring(0, 2).toUpperCase() || 'RS'}</div>
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
    </>
  );
};

export default Sidebar;