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
import { useAuth } from '../context/authContext';
import { getAuditLogs, exportAuditLogsCSV } from '../services/api';
import '../assets/auditor.css';
const AuditLogs: React.FC = () => {
  if (stryMutAct_9fa48("1029")) {
    {}
  } else {
    stryCov_9fa48("1029");
    const {
      user
    } = useAuth();
    const [expandedRow, setExpandedRow] = useState<string | null>(stryMutAct_9fa48("1030") ? "" : (stryCov_9fa48("1030"), '3')); // Default to 3 for the demo

    const toggleRow = (id: string) => {
      if (stryMutAct_9fa48("1031")) {
        {}
      } else {
        stryCov_9fa48("1031");
        if (stryMutAct_9fa48("1034") ? expandedRow !== id : stryMutAct_9fa48("1033") ? false : stryMutAct_9fa48("1032") ? true : (stryCov_9fa48("1032", "1033", "1034"), expandedRow === id)) {
          if (stryMutAct_9fa48("1035")) {
            {}
          } else {
            stryCov_9fa48("1035");
            setExpandedRow(null);
          }
        } else {
          if (stryMutAct_9fa48("1036")) {
            {}
          } else {
            stryCov_9fa48("1036");
            setExpandedRow(id);
          }
        }
      }
    };
    const [logs, setLogs] = useState<any[]>(stryMutAct_9fa48("1037") ? ["Stryker was here"] : (stryCov_9fa48("1037"), []));
    const [searchTerm, setSearchTerm] = useState(stryMutAct_9fa48("1038") ? "Stryker was here!" : (stryCov_9fa48("1038"), ''));
    const [actionFilter, setActionFilter] = useState(stryMutAct_9fa48("1039") ? "" : (stryCov_9fa48("1039"), 'Todas as Ações'));
    const fetchLogs = async () => {
      if (stryMutAct_9fa48("1040")) {
        {}
      } else {
        stryCov_9fa48("1040");
        const data = await getAuditLogs(searchTerm, actionFilter);
        setLogs(data);
      }
    };
    useEffect(() => {
      if (stryMutAct_9fa48("1041")) {
        {}
      } else {
        stryCov_9fa48("1041");
        fetchLogs();
      }
    }, stryMutAct_9fa48("1042") ? [] : (stryCov_9fa48("1042"), [actionFilter]));
    const handleRefresh = () => {
      if (stryMutAct_9fa48("1043")) {
        {}
      } else {
        stryCov_9fa48("1043");
        fetchLogs();
      }
    };
    const handleExport = () => {
      if (stryMutAct_9fa48("1044")) {
        {}
      } else {
        stryCov_9fa48("1044");
        exportAuditLogsCSV(searchTerm, actionFilter);
      }
    };
    return <DashboardLayout title="Logs de Auditoria" subtitle="" breadcrumbs={stryMutAct_9fa48("1045") ? [] : (stryCov_9fa48("1045"), [stryMutAct_9fa48("1046") ? "" : (stryCov_9fa48("1046"), 'EdTech'), stryMutAct_9fa48("1047") ? "" : (stryCov_9fa48("1047"), 'Painel do Auditor'), stryMutAct_9fa48("1048") ? "" : (stryCov_9fa48("1048"), 'Logs de Auditoria')])} customTopbarElement={<div style={stryMutAct_9fa48("1049") ? {} : (stryCov_9fa48("1049"), {
      display: stryMutAct_9fa48("1050") ? "" : (stryCov_9fa48("1050"), 'flex'),
      alignItems: stryMutAct_9fa48("1051") ? "" : (stryCov_9fa48("1051"), 'center'),
      gap: stryMutAct_9fa48("1052") ? "" : (stryCov_9fa48("1052"), '8px')
    })}>
          <button className="audit-btn audit-btn-outline" style={stryMutAct_9fa48("1053") ? {} : (stryCov_9fa48("1053"), {
        padding: stryMutAct_9fa48("1054") ? "" : (stryCov_9fa48("1054"), '8px 12px'),
        border: stryMutAct_9fa48("1055") ? "" : (stryCov_9fa48("1055"), 'none'),
        background: stryMutAct_9fa48("1056") ? "" : (stryCov_9fa48("1056"), 'transparent')
      })}>
            <i className="bi bi-bell"></i>
          </button>
          <div className="avatar" style={stryMutAct_9fa48("1057") ? {} : (stryCov_9fa48("1057"), {
        width: stryMutAct_9fa48("1058") ? "" : (stryCov_9fa48("1058"), '32px'),
        height: stryMutAct_9fa48("1059") ? "" : (stryCov_9fa48("1059"), '32px'),
        fontSize: stryMutAct_9fa48("1060") ? "" : (stryCov_9fa48("1060"), '14px'),
        background: stryMutAct_9fa48("1061") ? "" : (stryCov_9fa48("1061"), 'var(--ed-success)')
      })}>
            {stryMutAct_9fa48("1064") ? user?.name?.substring(0, 2).toUpperCase() && 'AU' : stryMutAct_9fa48("1063") ? false : stryMutAct_9fa48("1062") ? true : (stryCov_9fa48("1062", "1063", "1064"), (stryMutAct_9fa48("1068") ? user.name?.substring(0, 2).toUpperCase() : stryMutAct_9fa48("1067") ? user?.name.substring(0, 2).toUpperCase() : stryMutAct_9fa48("1066") ? user?.name.toUpperCase() : stryMutAct_9fa48("1065") ? user?.name?.substring(0, 2).toLowerCase() : (stryCov_9fa48("1065", "1066", "1067", "1068"), user?.name?.substring(0, 2).toUpperCase())) || (stryMutAct_9fa48("1069") ? "" : (stryCov_9fa48("1069"), 'AU')))}
          </div>
        </div>}>
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
          <div className="audit-stat-value">{stryMutAct_9fa48("1070") ? logs.length : (stryCov_9fa48("1070"), logs.filter(stryMutAct_9fa48("1071") ? () => undefined : (stryCov_9fa48("1071"), l => stryMutAct_9fa48("1075") ? new Date(l.timestamp).getTime() <= Date.now() - 24 * 60 * 60 * 1000 : stryMutAct_9fa48("1074") ? new Date(l.timestamp).getTime() >= Date.now() - 24 * 60 * 60 * 1000 : stryMutAct_9fa48("1073") ? false : stryMutAct_9fa48("1072") ? true : (stryCov_9fa48("1072", "1073", "1074", "1075"), new Date(l.timestamp).getTime() > (stryMutAct_9fa48("1076") ? Date.now() + 24 * 60 * 60 * 1000 : (stryCov_9fa48("1076"), Date.now() - (stryMutAct_9fa48("1077") ? 24 * 60 * 60 / 1000 : (stryCov_9fa48("1077"), (stryMutAct_9fa48("1078") ? 24 * 60 / 60 : (stryCov_9fa48("1078"), (stryMutAct_9fa48("1079") ? 24 / 60 : (stryCov_9fa48("1079"), 24 * 60)) * 60)) * 1000))))))).length)}</div>
        </div>
        
        <div className="audit-stat-card">
          <div className="audit-stat-header">
            <span>Alertas</span>
            <div className="audit-stat-dot orange"></div>
          </div>
          <div className="audit-stat-value">{stryMutAct_9fa48("1080") ? logs.length : (stryCov_9fa48("1080"), logs.filter(stryMutAct_9fa48("1081") ? () => undefined : (stryCov_9fa48("1081"), l => stryMutAct_9fa48("1084") ? l.severity !== 'WARNING' : stryMutAct_9fa48("1083") ? false : stryMutAct_9fa48("1082") ? true : (stryCov_9fa48("1082", "1083", "1084"), l.severity === (stryMutAct_9fa48("1085") ? "" : (stryCov_9fa48("1085"), 'WARNING'))))).length)}</div>
        </div>
        
        <div className="audit-stat-card">
          <div className="audit-stat-header">
            <span>Erros Críticos</span>
            <div className="audit-stat-dot red"></div>
          </div>
          <div className="audit-stat-value">{stryMutAct_9fa48("1086") ? logs.length : (stryCov_9fa48("1086"), logs.filter(stryMutAct_9fa48("1087") ? () => undefined : (stryCov_9fa48("1087"), l => stryMutAct_9fa48("1090") ? l.severity !== 'CRITICAL' : stryMutAct_9fa48("1089") ? false : stryMutAct_9fa48("1088") ? true : (stryCov_9fa48("1088", "1089", "1090"), l.severity === (stryMutAct_9fa48("1091") ? "" : (stryCov_9fa48("1091"), 'CRITICAL'))))).length)}</div>
        </div>
      </div>

      <div className="audit-filter-bar">
        <div style={stryMutAct_9fa48("1092") ? {} : (stryCov_9fa48("1092"), {
          display: stryMutAct_9fa48("1093") ? "" : (stryCov_9fa48("1093"), 'flex'),
          alignItems: stryMutAct_9fa48("1094") ? "" : (stryCov_9fa48("1094"), 'center'),
          background: stryMutAct_9fa48("1095") ? "" : (stryCov_9fa48("1095"), 'var(--ed-bg-card)'),
          padding: stryMutAct_9fa48("1096") ? "" : (stryCov_9fa48("1096"), '0 16px'),
          borderRadius: stryMutAct_9fa48("1097") ? "" : (stryCov_9fa48("1097"), '8px'),
          border: stryMutAct_9fa48("1098") ? "" : (stryCov_9fa48("1098"), '1px solid var(--ed-border)'),
          flex: 1
        })}>
          <i className="bi bi-funnel text-muted" style={stryMutAct_9fa48("1099") ? {} : (stryCov_9fa48("1099"), {
            marginRight: stryMutAct_9fa48("1100") ? "" : (stryCov_9fa48("1100"), '8px')
          })}></i>
          <span style={stryMutAct_9fa48("1101") ? {} : (stryCov_9fa48("1101"), {
            color: stryMutAct_9fa48("1102") ? "" : (stryCov_9fa48("1102"), 'var(--ed-text-primary)'),
            marginRight: stryMutAct_9fa48("1103") ? "" : (stryCov_9fa48("1103"), '16px'),
            fontWeight: 600
          })}>Filtros</span>
          <input type="text" className="audit-input" style={stryMutAct_9fa48("1104") ? {} : (stryCov_9fa48("1104"), {
            border: stryMutAct_9fa48("1105") ? "" : (stryCov_9fa48("1105"), 'none'),
            background: stryMutAct_9fa48("1106") ? "" : (stryCov_9fa48("1106"), 'transparent'),
            flex: 1,
            padding: stryMutAct_9fa48("1107") ? "" : (stryCov_9fa48("1107"), '10px 0')
          })} placeholder="Evento, usuário, IP..." value={searchTerm} onChange={stryMutAct_9fa48("1108") ? () => undefined : (stryCov_9fa48("1108"), e => setSearchTerm(e.target.value))} onKeyDown={stryMutAct_9fa48("1109") ? () => undefined : (stryCov_9fa48("1109"), e => stryMutAct_9fa48("1112") ? e.key === 'Enter' || handleRefresh() : stryMutAct_9fa48("1111") ? false : stryMutAct_9fa48("1110") ? true : (stryCov_9fa48("1110", "1111", "1112"), (stryMutAct_9fa48("1114") ? e.key !== 'Enter' : stryMutAct_9fa48("1113") ? true : (stryCov_9fa48("1113", "1114"), e.key === (stryMutAct_9fa48("1115") ? "" : (stryCov_9fa48("1115"), 'Enter')))) && handleRefresh()))} />
        </div>
        
        <select className="audit-select" value={actionFilter} onChange={stryMutAct_9fa48("1116") ? () => undefined : (stryCov_9fa48("1116"), e => setActionFilter(e.target.value))}>
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
        
        <input type="text" className="audit-input" placeholder="dd/mm/aaaa" style={stryMutAct_9fa48("1117") ? {} : (stryCov_9fa48("1117"), {
          width: stryMutAct_9fa48("1118") ? "" : (stryCov_9fa48("1118"), '130px')
        })} />
        <input type="text" className="audit-input" placeholder="Usuário" style={stryMutAct_9fa48("1119") ? {} : (stryCov_9fa48("1119"), {
          width: stryMutAct_9fa48("1120") ? "" : (stryCov_9fa48("1120"), '150px')
        })} />
        
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
            {logs.map(stryMutAct_9fa48("1121") ? () => undefined : (stryCov_9fa48("1121"), log => <React.Fragment key={log.id}>
                <tr onClick={stryMutAct_9fa48("1122") ? () => undefined : (stryCov_9fa48("1122"), () => toggleRow(log.id))}>
                  <td>{log.timestamp}</td>
                  <td>
                    <span className={stryMutAct_9fa48("1123") ? `` : (stryCov_9fa48("1123"), `audit-action-badge ${log.actionClass}`)}>
                      {stryMutAct_9fa48("1126") ? log.action === 'UPLOAD_DOCUMENT' || <i className="bi bi-upload"></i> : stryMutAct_9fa48("1125") ? false : stryMutAct_9fa48("1124") ? true : (stryCov_9fa48("1124", "1125", "1126"), (stryMutAct_9fa48("1128") ? log.action !== 'UPLOAD_DOCUMENT' : stryMutAct_9fa48("1127") ? true : (stryCov_9fa48("1127", "1128"), log.action === (stryMutAct_9fa48("1129") ? "" : (stryCov_9fa48("1129"), 'UPLOAD_DOCUMENT')))) && <i className="bi bi-upload"></i>)}
                      {stryMutAct_9fa48("1132") ? log.action.includes('LOGIN') || <i className={log.action === 'LOGIN_SUCCESS' ? "bi bi-box-arrow-in-right" : "bi bi-exclamation-triangle"}></i> : stryMutAct_9fa48("1131") ? false : stryMutAct_9fa48("1130") ? true : (stryCov_9fa48("1130", "1131", "1132"), log.action.includes(stryMutAct_9fa48("1133") ? "" : (stryCov_9fa48("1133"), 'LOGIN')) && <i className={(stryMutAct_9fa48("1136") ? log.action !== 'LOGIN_SUCCESS' : stryMutAct_9fa48("1135") ? false : stryMutAct_9fa48("1134") ? true : (stryCov_9fa48("1134", "1135", "1136"), log.action === (stryMutAct_9fa48("1137") ? "" : (stryCov_9fa48("1137"), 'LOGIN_SUCCESS')))) ? stryMutAct_9fa48("1138") ? "" : (stryCov_9fa48("1138"), "bi bi-box-arrow-in-right") : stryMutAct_9fa48("1139") ? "" : (stryCov_9fa48("1139"), "bi bi-exclamation-triangle")}></i>)}
                      {stryMutAct_9fa48("1142") ? log.action === 'SUBMISSION_APPROVED' || <i className="bi bi-check-circle"></i> : stryMutAct_9fa48("1141") ? false : stryMutAct_9fa48("1140") ? true : (stryCov_9fa48("1140", "1141", "1142"), (stryMutAct_9fa48("1144") ? log.action !== 'SUBMISSION_APPROVED' : stryMutAct_9fa48("1143") ? true : (stryCov_9fa48("1143", "1144"), log.action === (stryMutAct_9fa48("1145") ? "" : (stryCov_9fa48("1145"), 'SUBMISSION_APPROVED')))) && <i className="bi bi-check-circle"></i>)}
                      {stryMutAct_9fa48("1148") ? log.action === 'DOCUMENT_VIEWED' || <i className="bi bi-eye"></i> : stryMutAct_9fa48("1147") ? false : stryMutAct_9fa48("1146") ? true : (stryCov_9fa48("1146", "1147", "1148"), (stryMutAct_9fa48("1150") ? log.action !== 'DOCUMENT_VIEWED' : stryMutAct_9fa48("1149") ? true : (stryCov_9fa48("1149", "1150"), log.action === (stryMutAct_9fa48("1151") ? "" : (stryCov_9fa48("1151"), 'DOCUMENT_VIEWED')))) && <i className="bi bi-eye"></i>)}
                      {stryMutAct_9fa48("1154") ? log.action === 'PERMISSION_CHANGED' || <i className="bi bi-person-lock"></i> : stryMutAct_9fa48("1153") ? false : stryMutAct_9fa48("1152") ? true : (stryCov_9fa48("1152", "1153", "1154"), (stryMutAct_9fa48("1156") ? log.action !== 'PERMISSION_CHANGED' : stryMutAct_9fa48("1155") ? true : (stryCov_9fa48("1155", "1156"), log.action === (stryMutAct_9fa48("1157") ? "" : (stryCov_9fa48("1157"), 'PERMISSION_CHANGED')))) && <i className="bi bi-person-lock"></i>)}
                      {stryMutAct_9fa48("1160") ? log.action === 'DOCUMENT_DELETED' || <i className="bi bi-trash"></i> : stryMutAct_9fa48("1159") ? false : stryMutAct_9fa48("1158") ? true : (stryCov_9fa48("1158", "1159", "1160"), (stryMutAct_9fa48("1162") ? log.action !== 'DOCUMENT_DELETED' : stryMutAct_9fa48("1161") ? true : (stryCov_9fa48("1161", "1162"), log.action === (stryMutAct_9fa48("1163") ? "" : (stryCov_9fa48("1163"), 'DOCUMENT_DELETED')))) && <i className="bi bi-trash"></i>)}
                      {log.action}
                    </span>
                  </td>
                  <td className="audit-row-user">{log.userId}</td>
                  <td className="audit-row-ip">{log.ip}</td>
                  <td className="audit-row-details">
                    {log.details}
                    <i className="bi bi-chevron-down ms-2" style={stryMutAct_9fa48("1164") ? {} : (stryCov_9fa48("1164"), {
                    color: stryMutAct_9fa48("1165") ? "" : (stryCov_9fa48("1165"), '#64748B')
                  })}></i>
                  </td>
                </tr>
                {stryMutAct_9fa48("1168") ? expandedRow === log.id || <tr className="audit-expanded-row">
                    <td colSpan={5} style={{
                  padding: 0,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
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
                        <div className="audit-detail-group" style={{
                      gridColumn: 'span 3'
                    }}>
                          <span className="audit-detail-label">DETALHES COMPLETOS</span>
                          <span className="audit-detail-value">{log.details.replace('p...', 'pages:45').replace('ses...', 'session_id:9a8b7c').replace('ba...', 'backup')}</span>
                        </div>
                      </div>
                    </td>
                  </tr> : stryMutAct_9fa48("1167") ? false : stryMutAct_9fa48("1166") ? true : (stryCov_9fa48("1166", "1167", "1168"), (stryMutAct_9fa48("1170") ? expandedRow !== log.id : stryMutAct_9fa48("1169") ? true : (stryCov_9fa48("1169", "1170"), expandedRow === log.id)) && <tr className="audit-expanded-row">
                    <td colSpan={5} style={stryMutAct_9fa48("1171") ? {} : (stryCov_9fa48("1171"), {
                  padding: 0,
                  borderBottom: stryMutAct_9fa48("1172") ? "" : (stryCov_9fa48("1172"), '1px solid rgba(255, 255, 255, 0.05)')
                })}>
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
                        <div className="audit-detail-group" style={stryMutAct_9fa48("1173") ? {} : (stryCov_9fa48("1173"), {
                      gridColumn: stryMutAct_9fa48("1174") ? "" : (stryCov_9fa48("1174"), 'span 3')
                    })}>
                          <span className="audit-detail-label">DETALHES COMPLETOS</span>
                          <span className="audit-detail-value">{log.details.replace(stryMutAct_9fa48("1175") ? "" : (stryCov_9fa48("1175"), 'p...'), stryMutAct_9fa48("1176") ? "" : (stryCov_9fa48("1176"), 'pages:45')).replace(stryMutAct_9fa48("1177") ? "" : (stryCov_9fa48("1177"), 'ses...'), stryMutAct_9fa48("1178") ? "" : (stryCov_9fa48("1178"), 'session_id:9a8b7c')).replace(stryMutAct_9fa48("1179") ? "" : (stryCov_9fa48("1179"), 'ba...'), stryMutAct_9fa48("1180") ? "" : (stryCov_9fa48("1180"), 'backup'))}</span>
                        </div>
                      </div>
                    </td>
                  </tr>)}
              </React.Fragment>))}
          </tbody>
        </table>
        <div className="audit-table-footer">
          <span className="footer-stats">{logs.length} events · sorted by timestamp desc · retention: 90d</span>
          <span className="footer-brand">ResearchTrail AuditLog v2.1</span>
        </div>
      </div>
    </DashboardLayout>;
  }
};
export default AuditLogs;