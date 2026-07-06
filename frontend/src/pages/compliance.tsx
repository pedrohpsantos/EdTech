import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getComplianceStats } from '../services/api';
import '../assets/auditor.css';

const ComplianceCenter: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getComplianceStats();
      if (data) setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return null; // or a loader

  return (
    <DashboardLayout
      title="Centro de Conformidade"
      subtitle="Conformidade institucional, LGPD e ética em pesquisa"
      breadcrumbs={['EdTech', 'Centro de Conformidade']}
      customTopbarElement={
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="audit-btn audit-btn-outline">
            <i className="bi bi-download"></i> Relatório de conformidade
          </button>
          <button className="audit-btn audit-btn-outline" style={{ padding: '8px 12px' }}>
            <i className="bi bi-moon"></i>
          </button>
          <button className="audit-btn audit-btn-outline" style={{ padding: '8px 12px' }}>
            <i className="bi bi-bell"></i>
          </button>
        </div>
      }
    >
      <div className="compliance-stats-row">
        <div className="compliance-stat-card">
          <div className="compliance-stat-header">
            <span>Compliance Score</span>
            <i className="bi bi-shield-check text-success"></i>
          </div>
          <div className="compliance-stat-value">
            {stats.score}% <span className="compliance-stat-badge success">+{stats.scoreTrend} pts</span>
          </div>
        </div>
        
        <div className="compliance-stat-card">
          <div className="compliance-stat-header">
            <span>Políticas conformes</span>
            <i className="bi bi-file-earmark-text text-primary"></i>
          </div>
          <div className="compliance-stat-value">
            {stats.compliantPolicies}/{stats.totalPolicies}
          </div>
        </div>
        
        <div className="compliance-stat-card">
          <div className="compliance-stat-header">
            <span>Itens pendentes</span>
            <i className="bi bi-shield-exclamation text-warning"></i>
          </div>
          <div className="compliance-stat-value">
            {stats.pendingItems} <span className="compliance-stat-badge warning">ação</span>
          </div>
        </div>
        
        <div className="compliance-stat-card">
          <div className="compliance-stat-header">
            <span>Eventos auditados</span>
            <i className="bi bi-lock text-info"></i>
          </div>
          <div className="compliance-stat-value">
            {stats.totalEvents} <span className="compliance-stat-badge success">100%</span>
          </div>
        </div>
      </div>

      <div className="compliance-section-card">
        <h2 className="compliance-section-title">Status de conformidade</h2>
        <p className="compliance-section-subtitle">Cobertura por política regulatória</p>
        
        <div className="policy-list">
          {stats.policies.map((policy: any, index: number) => (
            <div className="policy-item" key={index}>
              <div className="policy-header">
                <div className="policy-name-wrapper">
                  <span className="policy-name">{policy.name}</span>
                  <span className={`policy-badge ${policy.status}`}>
                    {policy.status === 'conforme' && <i className="bi bi-check-circle"></i>}
                    {policy.status === 'parcial' && <i className="bi bi-exclamation-circle"></i>}
                    {policy.status === 'pendente' && <i className="bi bi-x-circle"></i>}
                    {' '}{policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                  </span>
                </div>
                <div className="policy-stats">
                  <span className="percent">{policy.percentage}%</span>
                  <span className="subtext">{policy.text}</span>
                </div>
              </div>
              <div className="policy-progress-bar-bg">
                <div className={`policy-progress-bar-fill ${policy.status}`} style={{ width: `${policy.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ComplianceCenter;
