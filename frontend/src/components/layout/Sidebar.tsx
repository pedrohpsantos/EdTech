import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

import '../../assets/dashboard.css';

type NavigationItem = {
  to: string;
  icon: string;
  label: string;
};

const roleLabel: Record<string, string> = {
  ADVISOR: 'ORIENTADOR',
  AUDITOR: 'AUDITOR',
  RESEARCHER: 'PESQUISADOR',
};

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

  const workspaceItems: NavigationItem[] =
    user?.role === 'RESEARCHER'
      ? [
          { to: '/documentos', icon: 'bi-folder2-open', label: 'Documentos' },
          { to: '/projects', icon: 'bi-briefcase', label: 'Projetos' },
        ]
      : user?.role === 'ADVISOR'
        ? [
            { to: '/submissions', icon: 'bi-inbox', label: 'Submissões' },
            { to: '/projects', icon: 'bi-briefcase', label: 'Projetos' },
          ]
        : [{ to: '/audit-logs', icon: 'bi-journal-text', label: 'Logs de auditoria' }];

  const insightItems: NavigationItem[] =
    user?.role === 'ADVISOR'
      ? [
          { to: '/trail', icon: 'bi-diagram-3', label: 'Trilha de pesquisa' },
          { to: '/analytics', icon: 'bi-graph-up-arrow', label: 'Análises' },
        ]
      : user?.role === 'RESEARCHER'
        ? [{ to: '/trail', icon: 'bi-diagram-3', label: 'Trilha de pesquisa' }]
        : [{ to: '/compliance-center', icon: 'bi-shield-check', label: 'Centro de conformidade' }];

  const renderNavigationItem = (item: NavigationItem) => (
    <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
      onClick={closeMobileSidebar}
    >
      <i className={`bi ${item.icon}`}></i>
      {item.label}
      <i className="bi bi-chevron-right arrow-icon ms-auto" aria-hidden="true"></i>
    </NavLink>
  );

  return (
    <>
      {/* Botão Hambúrguer flutuante: Visível APENAS em telas menores (Mobile/Tablet) */}
      <button
        className={`sidebar-mobile-toggle d-md-none ${isMobileOpen ? 'open' : ''}`}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? 'Fechar navegação' : 'Abrir navegação'}
        aria-expanded={isMobileOpen}
      >
        <i className={`bi ${isMobileOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
      </button>

      {/* Backdrop (Fundo escurecido) para fechar o menu ao clicar fora dele no mobile */}
      {isMobileOpen && <div className="sidebar-backdrop d-md-none" onClick={closeMobileSidebar} />}

      {/* Aside com a classe condicional 'active-mobile' se o estado for true */}
      <aside className={`sidebar-container ${isMobileOpen ? 'active-mobile' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-section" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <svg width="32" height="32" viewBox="0 0 100 100" style={{ marginRight: '8px' }}>
              <line
                x1="20"
                y1="25"
                x2="80"
                y2="25"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <line
                x1="20"
                y1="50"
                x2="55"
                y2="50"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <line
                x1="20"
                y1="75"
                x2="80"
                y2="75"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <line
                x1="20"
                y1="25"
                x2="20"
                y2="75"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeLinecap="round"
              />
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
            {roleLabel[user?.role || 'RESEARCHER']}
          </div>
        </div>

        <div className="sidebar-scrollable">
          <div className="nav-section">
            <span className="nav-section-title">GERAL</span>
            <div className="nav-links">
              {renderNavigationItem({
                to: '/dashboard',
                icon: 'bi-grid-1x2',
                label: 'Visão geral',
              })}
            </div>
          </div>

          <div className="nav-section">
            <span className="nav-section-title">TRABALHO</span>
            <div className="nav-links">{workspaceItems.map(renderNavigationItem)}</div>
          </div>

          <div className="nav-section">
            <span className="nav-section-title">INTELIGÊNCIA</span>
            <div className="nav-links">{insightItems.map(renderNavigationItem)}</div>
          </div>

          <div className="nav-section">
            <span className="nav-section-title">CONTA</span>
            <div className="nav-links">
              {renderNavigationItem({ to: '/settings', icon: 'bi-gear', label: 'Configurações' })}
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
