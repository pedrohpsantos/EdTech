import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getComplianceStats } from '../services/api';
import '../assets/auditor.css';

const ComplianceCenter: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  const exportReport = () => {
    if (!stats) return;
    const lines = [
      'EDTECH ACADEMIC - RELATORIO DE CONFORMIDADE',
      `Gerado em: ${new Date().toLocaleString('pt-BR')}`,
      `Compliance score: ${stats.score}%`,
      `Politicas conformes: ${stats.compliantPolicies}/${stats.totalPolicies}`,
      `Itens pendentes: ${stats.pendingItems}`,
      `Eventos auditados: ${stats.totalEvents}`,
      ...stats.policies.map((policy: any) => `${policy.name}: ${policy.percentage}% - ${policy.status}`),
    ];
    const escapePdf = (value: string) => value.replace(/[\\()]/g, '\\$&').replace(/[^\x20-\x7E]/g, '');
    const stream = `BT /F1 13 Tf 48 790 Td ${lines.map((line: string, index: number) => `${index ? '0 -24 Td ' : ''}(${escapePdf(line)}) Tj`).join(' ')} ET`;
    const objects = [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    ];
    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    const url = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'relatorio_conformidade_edtech.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

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
          <button className="audit-btn audit-btn-outline" onClick={exportReport}>
            <i className="bi bi-download"></i> Relatório de conformidade
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
