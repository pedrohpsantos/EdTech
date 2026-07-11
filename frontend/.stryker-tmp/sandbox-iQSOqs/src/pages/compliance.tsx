// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getComplianceStats } from '../services/api';
import '../assets/auditor.css';
const ComplianceCenter: React.FC = () => {
  if (stryMutAct_9fa48("1181")) {
    {}
  } else {
    stryCov_9fa48("1181");
    const [stats, setStats] = useState<any>(null);
    useEffect(() => {
      if (stryMutAct_9fa48("1182")) {
        {}
      } else {
        stryCov_9fa48("1182");
        const fetchStats = async () => {
          if (stryMutAct_9fa48("1183")) {
            {}
          } else {
            stryCov_9fa48("1183");
            const data = await getComplianceStats();
            if (stryMutAct_9fa48("1185") ? false : stryMutAct_9fa48("1184") ? true : (stryCov_9fa48("1184", "1185"), data)) setStats(data);
          }
        };
        fetchStats();
      }
    }, stryMutAct_9fa48("1186") ? ["Stryker was here"] : (stryCov_9fa48("1186"), []));
    if (stryMutAct_9fa48("1189") ? false : stryMutAct_9fa48("1188") ? true : stryMutAct_9fa48("1187") ? stats : (stryCov_9fa48("1187", "1188", "1189"), !stats)) return null; // or a loader

    return <DashboardLayout title="Centro de Conformidade" subtitle="Conformidade institucional, LGPD e ética em pesquisa" breadcrumbs={stryMutAct_9fa48("1190") ? [] : (stryCov_9fa48("1190"), [stryMutAct_9fa48("1191") ? "" : (stryCov_9fa48("1191"), 'EdTech'), stryMutAct_9fa48("1192") ? "" : (stryCov_9fa48("1192"), 'Centro de Conformidade')])} customTopbarElement={<div style={stryMutAct_9fa48("1193") ? {} : (stryCov_9fa48("1193"), {
      display: stryMutAct_9fa48("1194") ? "" : (stryCov_9fa48("1194"), 'flex'),
      alignItems: stryMutAct_9fa48("1195") ? "" : (stryCov_9fa48("1195"), 'center'),
      gap: stryMutAct_9fa48("1196") ? "" : (stryCov_9fa48("1196"), '16px')
    })}>
          <button className="audit-btn audit-btn-outline">
            <i className="bi bi-download"></i> Relatório de conformidade
          </button>
          <button className="audit-btn audit-btn-outline" style={stryMutAct_9fa48("1197") ? {} : (stryCov_9fa48("1197"), {
        padding: stryMutAct_9fa48("1198") ? "" : (stryCov_9fa48("1198"), '8px 12px')
      })}>
            <i className="bi bi-moon"></i>
          </button>
          <button className="audit-btn audit-btn-outline" style={stryMutAct_9fa48("1199") ? {} : (stryCov_9fa48("1199"), {
        padding: stryMutAct_9fa48("1200") ? "" : (stryCov_9fa48("1200"), '8px 12px')
      })}>
            <i className="bi bi-bell"></i>
          </button>
        </div>}>
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
          {stats.policies.map(stryMutAct_9fa48("1201") ? () => undefined : (stryCov_9fa48("1201"), (policy: any, index: number) => <div className="policy-item" key={index}>
              <div className="policy-header">
                <div className="policy-name-wrapper">
                  <span className="policy-name">{policy.name}</span>
                  <span className={stryMutAct_9fa48("1202") ? `` : (stryCov_9fa48("1202"), `policy-badge ${policy.status}`)}>
                    {stryMutAct_9fa48("1205") ? policy.status === 'conforme' || <i className="bi bi-check-circle"></i> : stryMutAct_9fa48("1204") ? false : stryMutAct_9fa48("1203") ? true : (stryCov_9fa48("1203", "1204", "1205"), (stryMutAct_9fa48("1207") ? policy.status !== 'conforme' : stryMutAct_9fa48("1206") ? true : (stryCov_9fa48("1206", "1207"), policy.status === (stryMutAct_9fa48("1208") ? "" : (stryCov_9fa48("1208"), 'conforme')))) && <i className="bi bi-check-circle"></i>)}
                    {stryMutAct_9fa48("1211") ? policy.status === 'parcial' || <i className="bi bi-exclamation-circle"></i> : stryMutAct_9fa48("1210") ? false : stryMutAct_9fa48("1209") ? true : (stryCov_9fa48("1209", "1210", "1211"), (stryMutAct_9fa48("1213") ? policy.status !== 'parcial' : stryMutAct_9fa48("1212") ? true : (stryCov_9fa48("1212", "1213"), policy.status === (stryMutAct_9fa48("1214") ? "" : (stryCov_9fa48("1214"), 'parcial')))) && <i className="bi bi-exclamation-circle"></i>)}
                    {stryMutAct_9fa48("1217") ? policy.status === 'pendente' || <i className="bi bi-x-circle"></i> : stryMutAct_9fa48("1216") ? false : stryMutAct_9fa48("1215") ? true : (stryCov_9fa48("1215", "1216", "1217"), (stryMutAct_9fa48("1219") ? policy.status !== 'pendente' : stryMutAct_9fa48("1218") ? true : (stryCov_9fa48("1218", "1219"), policy.status === (stryMutAct_9fa48("1220") ? "" : (stryCov_9fa48("1220"), 'pendente')))) && <i className="bi bi-x-circle"></i>)}
                    {stryMutAct_9fa48("1221") ? "" : (stryCov_9fa48("1221"), ' ')}{stryMutAct_9fa48("1222") ? policy.status.charAt(0).toUpperCase() - policy.status.slice(1) : (stryCov_9fa48("1222"), (stryMutAct_9fa48("1224") ? policy.status.toUpperCase() : stryMutAct_9fa48("1223") ? policy.status.charAt(0).toLowerCase() : (stryCov_9fa48("1223", "1224"), policy.status.charAt(0).toUpperCase())) + (stryMutAct_9fa48("1225") ? policy.status : (stryCov_9fa48("1225"), policy.status.slice(1))))}
                  </span>
                </div>
                <div className="policy-stats">
                  <span className="percent">{policy.percentage}%</span>
                  <span className="subtext">{policy.text}</span>
                </div>
              </div>
              <div className="policy-progress-bar-bg">
                <div className={stryMutAct_9fa48("1226") ? `` : (stryCov_9fa48("1226"), `policy-progress-bar-fill ${policy.status}`)} style={stryMutAct_9fa48("1227") ? {} : (stryCov_9fa48("1227"), {
                width: stryMutAct_9fa48("1228") ? `` : (stryCov_9fa48("1228"), `${policy.percentage}%`)
              })}></div>
              </div>
            </div>))}
        </div>
      </div>
    </DashboardLayout>;
  }
};
export default ComplianceCenter;