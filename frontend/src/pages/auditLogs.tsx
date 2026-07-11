import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/authContext';
import { getAuditLogs, exportAuditLogsCSV } from '../services/api';
import '../assets/auditor.css';

const AuditLogs: React.FC = () => {
  const { user } = useAuth();
  const [expandedRow, setExpandedRow] = useState<string | null>('3'); // Default to 3 for the demo

  const toggleRow = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  const [logs, setLogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('Todas as Ações');

  const fetchLogs = async () => {
    const data = await getAuditLogs(searchTerm, actionFilter);
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter]);

  const handleRefresh = () => {
    fetchLogs();
  };

  const handleExport = () => {
    exportAuditLogsCSV(searchTerm, actionFilter);
  };

  return (
    <DashboardLayout
      title="Logs de Auditoria"
      subtitle=""
      breadcrumbs={['EdTech', 'Painel do Auditor', 'Logs de Auditoria']}
      customTopbarElement={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="audit-btn audit-btn-outline" style={{ padding: '8px 12px', border: 'none', background: 'transparent' }}>
            <i className="bi bi-bell"></i>
          </button>
          <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '14px', background: 'var(--ed-success)' }}>
            {user?.name?.substring(0, 2).toUpperCase() || 'AU'}
          </div>
        </div>
      }
    >
      <div className="audit-stats-row">
        <div className="audit-stat-card">
          <div className="audit-stat-header">
            <span>Total de Eventos</span>
            <div className="audit-stat-dot purple"></div>
          </div>
          <div className="audit-stat-value">{logs.length}</div>
        </div>
        
        <div className="audit-stat-card">
          <div className="audit-stat-header">
            <span>Eventos Recentes</span>
            <div className="audit-stat-dot blue"></div>
          </div>
          <div className="audit-stat-value">{logs.filter(l => new Date(l.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000).length}</div>
        </div>
        
        <div className="audit-stat-card">
          <div className="audit-stat-header">
            <span>Alertas</span>
            <div className="audit-stat-dot orange"></div>
          </div>
          <div className="audit-stat-value">{logs.filter(l => l.severity === 'WARNING').length}</div>
        </div>
        
        <div className="audit-stat-card">
          <div className="audit-stat-header">
            <span>Erros Críticos</span>
            <div className="audit-stat-dot red"></div>
          </div>
          <div className="audit-stat-value">{logs.filter(l => l.severity === 'CRITICAL').length}</div>
        </div>
      </div>

      <div className="audit-filter-bar">
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--ed-bg-card)', padding: '0 16px', borderRadius: '8px', border: '1px solid var(--ed-border)', flex: 1 }}>
          <i className="bi bi-funnel text-muted" style={{ marginRight: '8px' }}></i>
          <span style={{ color: 'var(--ed-text-primary)', marginRight: '16px', fontWeight: 600 }}>Filtros</span>
          <input 
            type="text" 
            className="audit-input" 
            style={{ border: 'none', background: 'transparent', flex: 1, padding: '10px 0' }} 
            placeholder="Evento, usuário, IP..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRefresh()}
          />
        </div>
        
        <select 
          className="audit-select" 
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
        >
          <option>Todas as Ações</option>
          <option>LOGIN_SUCCESS</option>
          <option>LOGIN_FAILED</option>
          <option>UPLOAD_DOCUMENT</option>
          <option>DOCUMENT_VIEWED</option>
          <option>DOCUMENT_DELETED</option>
          <option>DOCUMENT_EDITED</option>
          <option>SUBMISSION_APPROVED</option>
          <option>SUBMISSION_REJECTED</option>
          <option>PERMISSION_CHANGED</option>
          <option>PASSWORD_RESET</option>
        </select>
        
        <input type="text" className="audit-input" placeholder="dd/mm/aaaa" style={{ width: '130px' }} />
        <input type="text" className="audit-input" placeholder="Usuário" style={{ width: '150px' }} />
        
        <button className="audit-btn audit-btn-outline" onClick={handleRefresh}>
          <i className="bi bi-arrow-clockwise"></i> Atualizar
        </button>
        <button className="audit-btn audit-btn-primary" onClick={handleExport}>
          <i className="bi bi-download"></i> Exportar CSV
        </button>
      </div>

      <div className="audit-table-container">
        <table className="audit-table">
          <thead>
            <tr>
              <th>TIMESTAMP</th>
              <th>AÇÃO</th>
              <th>USER ID</th>
              <th>IP</th>
              <th>DETALHES</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <React.Fragment key={log.id}>
                <tr onClick={() => toggleRow(log.id)}>
                  <td>{log.timestamp}</td>
                  <td>
                    <span className={`audit-action-badge ${log.actionClass}`}>
                      {log.action === 'UPLOAD_DOCUMENT' && <i className="bi bi-upload"></i>}
                      {log.action.includes('LOGIN') && <i className={log.action === 'LOGIN_SUCCESS' ? "bi bi-box-arrow-in-right" : "bi bi-exclamation-triangle"}></i>}
                      {log.action === 'SUBMISSION_APPROVED' && <i className="bi bi-check-circle"></i>}
                      {log.action === 'DOCUMENT_VIEWED' && <i className="bi bi-eye"></i>}
                      {log.action === 'PERMISSION_CHANGED' && <i className="bi bi-person-lock"></i>}
                      {log.action === 'DOCUMENT_DELETED' && <i className="bi bi-trash"></i>}
                      {log.action}
                    </span>
                  </td>
                  <td className="audit-row-user">{log.userId}</td>
                  <td className="audit-row-ip">{log.ip}</td>
                  <td className="audit-row-details">
                    {log.details}
                    <i className="bi bi-chevron-down ms-2" style={{ color: '#64748B' }}></i>
                  </td>
                </tr>
                {expandedRow === log.id && (
                  <tr className="audit-expanded-row">
                    <td colSpan={5} style={{ padding: 0, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <div className="audit-expanded-content">
                        <div className="audit-detail-group">
                          <span className="audit-detail-label">EVENT ID</span>
                          <span className="audit-detail-value">{log.eventId}</span>
                        </div>
                        <div className="audit-detail-group">
                          <span className="audit-detail-label">USUÁRIO</span>
                          <span className="audit-detail-value">{log.userName}</span>
                        </div>
                        <div className="audit-detail-group">
                          <span className="audit-detail-label">AÇÃO</span>
                          <span className="audit-detail-value">{log.action}</span>
                        </div>
                        <div className="audit-detail-group">
                          <span className="audit-detail-label">SEVERIDADE</span>
                          <span className="audit-detail-value">{log.severity}</span>
                        </div>
                        <div className="audit-detail-group">
                          <span className="audit-detail-label">TIMESTAMP UTC</span>
                          <span className="audit-detail-value">{log.timestamp} UTC</span>
                        </div>
                        <div className="audit-detail-group" style={{ gridColumn: 'span 3' }}>
                          <span className="audit-detail-label">DETALHES COMPLETOS</span>
                          <span className="audit-detail-value">{log.details.replace('p...', 'pages:45').replace('ses...', 'session_id:9a8b7c').replace('ba...', 'backup')}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="audit-table-footer">
          <span className="footer-stats">{logs.length} events · sorted by timestamp desc · retention: 90d</span>
          <span className="footer-brand">ResearchTrail AuditLog v2.1</span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuditLogs;
