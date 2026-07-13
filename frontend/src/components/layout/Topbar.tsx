import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import ThemeToggle from '../themeToggle';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

interface TopbarProps {
  title: string;
  subtitle: string;
  breadcrumbs: string[];
  customTopbarElement?: React.ReactNode;
}

const Topbar: React.FC<TopbarProps> = ({ title, subtitle, breadcrumbs, customTopbarElement }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    if (!user) return;

    const socket = new SockJS((import.meta.env.VITE_API_URL || '') + '/ws-edtech');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        // Inscricao para o topico global
        stompClient.subscribe('/topic/global', (msg) => {
          if (msg.body) {
            const payload = JSON.parse(msg.body);
            setNotifications((prev) => [payload, ...prev]);
            setHasUnread(true);
          }
        });

        // Opcional: Se for possivel descobrir o project_id, poderia se inscrever aqui tambem.
        // Simulando a inscricao para o usuario logado
        stompClient.subscribe(`/user/${user.id}/queue/notifications`, (msg) => {
          if (msg.body) {
            const payload = JSON.parse(msg.body);
            setNotifications((prev) => [payload, ...prev]);
            setHasUnread(true);
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [user]);

  return (
    <header className="topbar-container">
      <div className="topbar-left">
        {breadcrumbs && (
          <div className="breadcrumbs">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {index > 0 && (
                  <span className="breadcrumb-separator">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                )}
                {index === 0 ? (
                  <span
                    className="breadcrumb-item"
                    onClick={() => navigate('/dashboard')}
                    style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                  >
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
        {customTopbarElement ? (
          customTopbarElement
        ) : user?.role === 'RESEARCHER' ? (
          <button className="btn-upload" onClick={() => navigate('/upload')}>
            <i className="bi bi-upload"></i> Enviar documento
          </button>
        ) : null}
        <div className="topbar-actions">
          <div className="action-icon-wrapper">
            <ThemeToggle />
          </div>
          <div
            className="action-icon-wrapper notification-icon"
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) setHasUnread(false);
            }}
          >
            <i className="bi bi-bell"></i>
            {hasUnread && notifications.length > 0 && <span className="notification-dot"></span>}

            {showNotifications && (
              <div className="notifications-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="dropdown-header">
                  <h4>Notificações</h4>
                </div>
                <div className="dropdown-body">
                  {notifications.length === 0 ? (
                    <div className="notification-item">
                      <div className="notification-text">
                        <p>Nenhuma notificação nova.</p>
                      </div>
                    </div>
                  ) : (
                    notifications.map((notif, idx) => (
                      <div className="notification-item" key={idx}>
                        <div className="notification-icon-circle bg-purple-light">
                          <i className="bi bi-info-circle"></i>
                        </div>
                        <div className="notification-text">
                          <p>
                            {notif.type === 'DOCUMENT_REVIEWED' && (
                              <span>Documento <b>{notif.document?.title}</b> foi revisado.</span>
                            )}
                            {notif.type === 'NEW_COMMENT' && (
                              <span>Novo comentário de <b>{notif.comment?.authorName}</b>.</span>
                            )}
                            {notif.type === 'DOCUMENT_UPLOADED' && (
                              <span>Documento <b>{notif.document?.title}</b> foi enviado.</span>
                            )}
                            {!notif.type && <span>Nova notificação recebida.</span>}
                          </p>
                          <span>agora</span>
                        </div>
                      </div>
                    ))
                  )}
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
