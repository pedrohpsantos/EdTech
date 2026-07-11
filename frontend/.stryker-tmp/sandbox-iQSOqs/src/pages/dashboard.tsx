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
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/authContext';
import { getDashboardStats, getAuditLogs, getComplianceStats, getDocuments } from '../services/api';
const Dashboard: React.FC = () => {
  if (stryMutAct_9fa48("1229")) {
    {}
  } else {
    stryCov_9fa48("1229");
    const navigate = useNavigate();
    const {
      user
    } = useAuth();
    const firstName = stryMutAct_9fa48("1232") ? user?.name?.split(' ')[0] && 'Usuário' : stryMutAct_9fa48("1231") ? false : stryMutAct_9fa48("1230") ? true : (stryCov_9fa48("1230", "1231", "1232"), (stryMutAct_9fa48("1234") ? user.name?.split(' ')[0] : stryMutAct_9fa48("1233") ? user?.name.split(' ')[0] : (stryCov_9fa48("1233", "1234"), user?.name?.split(stryMutAct_9fa48("1235") ? "" : (stryCov_9fa48("1235"), ' '))[0])) || (stryMutAct_9fa48("1236") ? "" : (stryCov_9fa48("1236"), 'Usuário')));
    const [stats, setStats] = useState(stryMutAct_9fa48("1237") ? {} : (stryCov_9fa48("1237"), {
      activeDocuments: 0,
      pendingReview: 0,
      complianceScore: 0,
      researchProgress: 0
    }));
    const [auditorStats, setAuditorStats] = useState<any>(null);
    const [recentLogs, setRecentLogs] = useState<any[]>(stryMutAct_9fa48("1238") ? ["Stryker was here"] : (stryCov_9fa48("1238"), []));
    const [recentDocs, setRecentDocs] = useState<any[]>(stryMutAct_9fa48("1239") ? ["Stryker was here"] : (stryCov_9fa48("1239"), []));
    useEffect(() => {
      if (stryMutAct_9fa48("1240")) {
        {}
      } else {
        stryCov_9fa48("1240");
        if (stryMutAct_9fa48("1243") ? user?.role === 'RESEARCHER' && user?.role === 'ADVISOR' : stryMutAct_9fa48("1242") ? false : stryMutAct_9fa48("1241") ? true : (stryCov_9fa48("1241", "1242", "1243"), (stryMutAct_9fa48("1245") ? user?.role !== 'RESEARCHER' : stryMutAct_9fa48("1244") ? false : (stryCov_9fa48("1244", "1245"), (stryMutAct_9fa48("1246") ? user.role : (stryCov_9fa48("1246"), user?.role)) === (stryMutAct_9fa48("1247") ? "" : (stryCov_9fa48("1247"), 'RESEARCHER')))) || (stryMutAct_9fa48("1249") ? user?.role !== 'ADVISOR' : stryMutAct_9fa48("1248") ? false : (stryCov_9fa48("1248", "1249"), (stryMutAct_9fa48("1250") ? user.role : (stryCov_9fa48("1250"), user?.role)) === (stryMutAct_9fa48("1251") ? "" : (stryCov_9fa48("1251"), 'ADVISOR')))))) {
          if (stryMutAct_9fa48("1252")) {
            {}
          } else {
            stryCov_9fa48("1252");
            getDashboardStats().then(data => {
              if (stryMutAct_9fa48("1253")) {
                {}
              } else {
                stryCov_9fa48("1253");
                if (stryMutAct_9fa48("1255") ? false : stryMutAct_9fa48("1254") ? true : (stryCov_9fa48("1254", "1255"), data)) setStats(data);
              }
            });
            getDocuments().then(resp => {
              if (stryMutAct_9fa48("1256")) {
                {}
              } else {
                stryCov_9fa48("1256");
                if (stryMutAct_9fa48("1258") ? false : stryMutAct_9fa48("1257") ? true : (stryCov_9fa48("1257", "1258"), resp.sucesso)) {
                  if (stryMutAct_9fa48("1259")) {
                    {}
                  } else {
                    stryCov_9fa48("1259");
                    setRecentDocs(stryMutAct_9fa48("1262") ? resp.dados.content?.slice(0, 3) && [] : stryMutAct_9fa48("1261") ? false : stryMutAct_9fa48("1260") ? true : (stryCov_9fa48("1260", "1261", "1262"), (stryMutAct_9fa48("1264") ? resp.dados.content.slice(0, 3) : stryMutAct_9fa48("1263") ? resp.dados.content : (stryCov_9fa48("1263", "1264"), resp.dados.content?.slice(0, 3))) || (stryMutAct_9fa48("1265") ? ["Stryker was here"] : (stryCov_9fa48("1265"), []))));
                  }
                }
              }
            });
          }
        } else if (stryMutAct_9fa48("1268") ? user?.role !== 'AUDITOR' : stryMutAct_9fa48("1267") ? false : stryMutAct_9fa48("1266") ? true : (stryCov_9fa48("1266", "1267", "1268"), (stryMutAct_9fa48("1269") ? user.role : (stryCov_9fa48("1269"), user?.role)) === (stryMutAct_9fa48("1270") ? "" : (stryCov_9fa48("1270"), 'AUDITOR')))) {
          if (stryMutAct_9fa48("1271")) {
            {}
          } else {
            stryCov_9fa48("1271");
            getComplianceStats().then(data => {
              if (stryMutAct_9fa48("1272")) {
                {}
              } else {
                stryCov_9fa48("1272");
                if (stryMutAct_9fa48("1274") ? false : stryMutAct_9fa48("1273") ? true : (stryCov_9fa48("1273", "1274"), data)) setAuditorStats(data);
              }
            });
            getAuditLogs().then(logs => {
              if (stryMutAct_9fa48("1275")) {
                {}
              } else {
                stryCov_9fa48("1275");
                setRecentLogs(stryMutAct_9fa48("1276") ? logs : (stryCov_9fa48("1276"), logs.slice(0, 3)));
              }
            });
          }
        }
      }
    }, stryMutAct_9fa48("1277") ? [] : (stryCov_9fa48("1277"), [user]));
    const customTopbar = <div className="topbar-responsive-container">
      {(stryMutAct_9fa48("1280") ? user?.role !== 'ADVISOR' : stryMutAct_9fa48("1279") ? false : stryMutAct_9fa48("1278") ? true : (stryCov_9fa48("1278", "1279", "1280"), (stryMutAct_9fa48("1281") ? user.role : (stryCov_9fa48("1281"), user?.role)) === (stryMutAct_9fa48("1282") ? "" : (stryCov_9fa48("1282"), 'ADVISOR')))) ? <button onClick={stryMutAct_9fa48("1283") ? () => undefined : (stryCov_9fa48("1283"), () => navigate(stryMutAct_9fa48("1284") ? "" : (stryCov_9fa48("1284"), '/submissions')))} style={stryMutAct_9fa48("1285") ? {} : (stryCov_9fa48("1285"), {
        background: stryMutAct_9fa48("1286") ? "" : (stryCov_9fa48("1286"), 'var(--ed-purple-main)'),
        border: stryMutAct_9fa48("1287") ? "" : (stryCov_9fa48("1287"), 'none'),
        padding: stryMutAct_9fa48("1288") ? "" : (stryCov_9fa48("1288"), '10px 20px'),
        borderRadius: stryMutAct_9fa48("1289") ? "" : (stryCov_9fa48("1289"), '8px'),
        fontSize: stryMutAct_9fa48("1290") ? "" : (stryCov_9fa48("1290"), '14px'),
        fontWeight: 600,
        color: stryMutAct_9fa48("1291") ? "" : (stryCov_9fa48("1291"), 'white'),
        display: stryMutAct_9fa48("1292") ? "" : (stryCov_9fa48("1292"), 'flex'),
        alignItems: stryMutAct_9fa48("1293") ? "" : (stryCov_9fa48("1293"), 'center'),
        gap: stryMutAct_9fa48("1294") ? "" : (stryCov_9fa48("1294"), '8px'),
        cursor: stryMutAct_9fa48("1295") ? "" : (stryCov_9fa48("1295"), 'pointer'),
        boxShadow: stryMutAct_9fa48("1296") ? "" : (stryCov_9fa48("1296"), '0 4px 12px rgba(63, 27, 138, 0.3)')
      })}>
          <i className="bi bi-play-circle"></i> Ver submissões
        </button> : (stryMutAct_9fa48("1299") ? user?.role !== 'AUDITOR' : stryMutAct_9fa48("1298") ? false : stryMutAct_9fa48("1297") ? true : (stryCov_9fa48("1297", "1298", "1299"), (stryMutAct_9fa48("1300") ? user.role : (stryCov_9fa48("1300"), user?.role)) === (stryMutAct_9fa48("1301") ? "" : (stryCov_9fa48("1301"), 'AUDITOR')))) ? <button onClick={stryMutAct_9fa48("1302") ? () => undefined : (stryCov_9fa48("1302"), () => navigate(stryMutAct_9fa48("1303") ? "" : (stryCov_9fa48("1303"), '/audit-logs')))} style={stryMutAct_9fa48("1304") ? {} : (stryCov_9fa48("1304"), {
        background: stryMutAct_9fa48("1305") ? "" : (stryCov_9fa48("1305"), 'var(--ed-purple-main)'),
        border: stryMutAct_9fa48("1306") ? "" : (stryCov_9fa48("1306"), 'none'),
        padding: stryMutAct_9fa48("1307") ? "" : (stryCov_9fa48("1307"), '10px 20px'),
        borderRadius: stryMutAct_9fa48("1308") ? "" : (stryCov_9fa48("1308"), '8px'),
        fontSize: stryMutAct_9fa48("1309") ? "" : (stryCov_9fa48("1309"), '14px'),
        fontWeight: 600,
        color: stryMutAct_9fa48("1310") ? "" : (stryCov_9fa48("1310"), 'white'),
        display: stryMutAct_9fa48("1311") ? "" : (stryCov_9fa48("1311"), 'flex'),
        alignItems: stryMutAct_9fa48("1312") ? "" : (stryCov_9fa48("1312"), 'center'),
        gap: stryMutAct_9fa48("1313") ? "" : (stryCov_9fa48("1313"), '8px'),
        cursor: stryMutAct_9fa48("1314") ? "" : (stryCov_9fa48("1314"), 'pointer'),
        boxShadow: stryMutAct_9fa48("1315") ? "" : (stryCov_9fa48("1315"), '0 4px 12px rgba(63, 27, 138, 0.3)')
      })}>
          <i className="bi bi-journal-text"></i> Ver logs de auditoria
        </button> : <button onClick={stryMutAct_9fa48("1316") ? () => undefined : (stryCov_9fa48("1316"), () => navigate(stryMutAct_9fa48("1317") ? "" : (stryCov_9fa48("1317"), '/trail')))} style={stryMutAct_9fa48("1318") ? {} : (stryCov_9fa48("1318"), {
        background: stryMutAct_9fa48("1319") ? "" : (stryCov_9fa48("1319"), 'var(--ed-purple-main)'),
        border: stryMutAct_9fa48("1320") ? "" : (stryCov_9fa48("1320"), 'none'),
        padding: stryMutAct_9fa48("1321") ? "" : (stryCov_9fa48("1321"), '10px 20px'),
        borderRadius: stryMutAct_9fa48("1322") ? "" : (stryCov_9fa48("1322"), '8px'),
        fontSize: stryMutAct_9fa48("1323") ? "" : (stryCov_9fa48("1323"), '14px'),
        fontWeight: 600,
        color: stryMutAct_9fa48("1324") ? "" : (stryCov_9fa48("1324"), 'white'),
        display: stryMutAct_9fa48("1325") ? "" : (stryCov_9fa48("1325"), 'flex'),
        alignItems: stryMutAct_9fa48("1326") ? "" : (stryCov_9fa48("1326"), 'center'),
        gap: stryMutAct_9fa48("1327") ? "" : (stryCov_9fa48("1327"), '8px'),
        cursor: stryMutAct_9fa48("1328") ? "" : (stryCov_9fa48("1328"), 'pointer'),
        boxShadow: stryMutAct_9fa48("1329") ? "" : (stryCov_9fa48("1329"), '0 4px 12px rgba(63, 27, 138, 0.3)')
      })}>
          <i className="bi bi-diagram-3"></i> Ver Trilha de Pesquisa
        </button>}
    </div>;
    return <DashboardLayout title={stryMutAct_9fa48("1330") ? `` : (stryCov_9fa48("1330"), `Bom dia, ${firstName}`)} subtitle="Resumo executivo da sua atividade de pesquisa e governança" breadcrumbs={stryMutAct_9fa48("1331") ? [] : (stryCov_9fa48("1331"), [stryMutAct_9fa48("1332") ? "" : (stryCov_9fa48("1332"), 'EdTech'), stryMutAct_9fa48("1333") ? "" : (stryCov_9fa48("1333"), 'Visão Geral')])} customTopbarElement={customTopbar}>
      
      {/* 1. SEÇÃO DE CARDS INDICADORES (STATS ROW REFACTORADO) */}
      <div className="row g-3 mb-4">
        {(stryMutAct_9fa48("1336") ? user?.role !== 'RESEARCHER' : stryMutAct_9fa48("1335") ? false : stryMutAct_9fa48("1334") ? true : (stryCov_9fa48("1334", "1335", "1336"), (stryMutAct_9fa48("1337") ? user.role : (stryCov_9fa48("1337"), user?.role)) === (stryMutAct_9fa48("1338") ? "" : (stryCov_9fa48("1338"), 'RESEARCHER')))) ? <>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card h-100 m-0">
                <span className="stat-header">
                  Meus Documentos
                  <i className="bi bi-file-earmark-text stat-icon" style={stryMutAct_9fa48("1339") ? {} : (stryCov_9fa48("1339"), {
                  color: stryMutAct_9fa48("1340") ? "" : (stryCov_9fa48("1340"), 'var(--ed-purple-light)')
                })}></i>
                </span>
                <div className="stat-body">
                  <span className="stat-value">{stryMutAct_9fa48("1343") ? stats.activeDocuments && 12 : stryMutAct_9fa48("1342") ? false : stryMutAct_9fa48("1341") ? true : (stryCov_9fa48("1341", "1342", "1343"), stats.activeDocuments || 12)}</span>
                  <span className="stat-trend" style={stryMutAct_9fa48("1344") ? {} : (stryCov_9fa48("1344"), {
                  background: stryMutAct_9fa48("1345") ? "" : (stryCov_9fa48("1345"), 'rgba(16, 185, 129, 0.1)'),
                  color: stryMutAct_9fa48("1346") ? "" : (stryCov_9fa48("1346"), 'var(--ed-status-success)'),
                  borderRadius: stryMutAct_9fa48("1347") ? "" : (stryCov_9fa48("1347"), '12px'),
                  padding: stryMutAct_9fa48("1348") ? "" : (stryCov_9fa48("1348"), '2px 8px'),
                  fontSize: stryMutAct_9fa48("1349") ? "" : (stryCov_9fa48("1349"), '12px'),
                  fontWeight: stryMutAct_9fa48("1350") ? "" : (stryCov_9fa48("1350"), 'bold')
                })}>+1</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card h-100 m-0">
                <div className="stat-header">
                  Em Revisão
                  <i className="bi bi-clock stat-icon" style={stryMutAct_9fa48("1351") ? {} : (stryCov_9fa48("1351"), {
                  color: stryMutAct_9fa48("1352") ? "" : (stryCov_9fa48("1352"), 'var(--ed-orange)')
                })}></i>
                </div>
                <div className="stat-body">
                  <span className="stat-value">{stryMutAct_9fa48("1355") ? stats.pendingReview && 2 : stryMutAct_9fa48("1354") ? false : stryMutAct_9fa48("1353") ? true : (stryCov_9fa48("1353", "1354", "1355"), stats.pendingReview || 2)}</span>
                  <span className="stat-trend" style={stryMutAct_9fa48("1356") ? {} : (stryCov_9fa48("1356"), {
                  background: stryMutAct_9fa48("1357") ? "" : (stryCov_9fa48("1357"), 'var(--border)'),
                  color: stryMutAct_9fa48("1358") ? "" : (stryCov_9fa48("1358"), 'var(--ed-text-muted)'),
                  borderRadius: stryMutAct_9fa48("1359") ? "" : (stryCov_9fa48("1359"), '12px'),
                  padding: stryMutAct_9fa48("1360") ? "" : (stryCov_9fa48("1360"), '2px 8px'),
                  fontSize: stryMutAct_9fa48("1361") ? "" : (stryCov_9fa48("1361"), '12px'),
                  fontWeight: stryMutAct_9fa48("1362") ? "" : (stryCov_9fa48("1362"), 'bold')
                })}>aguardando</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card h-100 m-0">
                <span className="stat-header">
                  Aprovados
                  <i className="bi bi-check-circle stat-icon" style={stryMutAct_9fa48("1363") ? {} : (stryCov_9fa48("1363"), {
                  color: stryMutAct_9fa48("1364") ? "" : (stryCov_9fa48("1364"), 'var(--ed-status-success)')
                })}></i>
                </span>
                <div className="stat-body">
                  <span className="stat-value">8</span>
                  <span className="stat-trend" style={stryMutAct_9fa48("1365") ? {} : (stryCov_9fa48("1365"), {
                  background: stryMutAct_9fa48("1366") ? "" : (stryCov_9fa48("1366"), 'rgba(16, 185, 129, 0.1)'),
                  color: stryMutAct_9fa48("1367") ? "" : (stryCov_9fa48("1367"), 'var(--ed-status-success)'),
                  borderRadius: stryMutAct_9fa48("1368") ? "" : (stryCov_9fa48("1368"), '12px'),
                  padding: stryMutAct_9fa48("1369") ? "" : (stryCov_9fa48("1369"), '2px 8px'),
                  fontSize: stryMutAct_9fa48("1370") ? "" : (stryCov_9fa48("1370"), '12px'),
                  fontWeight: stryMutAct_9fa48("1371") ? "" : (stryCov_9fa48("1371"), 'bold')
                })}>+2 este mês</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card h-100 m-0">
                <span className="stat-header">
                  Seu Compliance Score
                  <i className="bi bi-shield-check stat-icon" style={stryMutAct_9fa48("1372") ? {} : (stryCov_9fa48("1372"), {
                  color: stryMutAct_9fa48("1373") ? "" : (stryCov_9fa48("1373"), 'var(--ed-status-info)')
                })}></i>
                </span>
                <div className="stat-body">
                  <span className="stat-value">98%</span>
                  <span className="stat-trend" style={stryMutAct_9fa48("1374") ? {} : (stryCov_9fa48("1374"), {
                  background: stryMutAct_9fa48("1375") ? "" : (stryCov_9fa48("1375"), 'rgba(59, 130, 246, 0.1)'),
                  color: stryMutAct_9fa48("1376") ? "" : (stryCov_9fa48("1376"), 'var(--ed-status-info)'),
                  borderRadius: stryMutAct_9fa48("1377") ? "" : (stryCov_9fa48("1377"), '12px'),
                  padding: stryMutAct_9fa48("1378") ? "" : (stryCov_9fa48("1378"), '2px 8px'),
                  fontSize: stryMutAct_9fa48("1379") ? "" : (stryCov_9fa48("1379"), '12px'),
                  fontWeight: stryMutAct_9fa48("1380") ? "" : (stryCov_9fa48("1380"), 'bold')
                })}>ótimo</span>
                </div>
              </div>
            </div>
          </> : (stryMutAct_9fa48("1383") ? user?.role !== 'AUDITOR' : stryMutAct_9fa48("1382") ? false : stryMutAct_9fa48("1381") ? true : (stryCov_9fa48("1381", "1382", "1383"), (stryMutAct_9fa48("1384") ? user.role : (stryCov_9fa48("1384"), user?.role)) === (stryMutAct_9fa48("1385") ? "" : (stryCov_9fa48("1385"), 'AUDITOR')))) ? <>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card h-100 m-0">
                <span className="stat-header">
                  Eventos Hoje
                  <i className="bi bi-activity stat-icon" style={stryMutAct_9fa48("1386") ? {} : (stryCov_9fa48("1386"), {
                  color: stryMutAct_9fa48("1387") ? "" : (stryCov_9fa48("1387"), 'var(--ed-purple-light)')
                })}></i>
                </span>
                <div className="stat-body">
                  <span className="stat-value">{stryMutAct_9fa48("1390") ? auditorStats?.totalEvents && 0 : stryMutAct_9fa48("1389") ? false : stryMutAct_9fa48("1388") ? true : (stryCov_9fa48("1388", "1389", "1390"), (stryMutAct_9fa48("1391") ? auditorStats.totalEvents : (stryCov_9fa48("1391"), auditorStats?.totalEvents)) || 0)}</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card h-100 m-0">
                <div className="stat-header">
                  Alertas Ativos
                  <i className="bi bi-exclamation-triangle stat-icon" style={stryMutAct_9fa48("1392") ? {} : (stryCov_9fa48("1392"), {
                  color: stryMutAct_9fa48("1393") ? "" : (stryCov_9fa48("1393"), 'var(--ed-orange)')
                })}></i>
                </div>
                <div className="stat-body">
                  <span className="stat-value">{stryMutAct_9fa48("1396") ? auditorStats?.pendingItems && 0 : stryMutAct_9fa48("1395") ? false : stryMutAct_9fa48("1394") ? true : (stryCov_9fa48("1394", "1395", "1396"), (stryMutAct_9fa48("1397") ? auditorStats.pendingItems : (stryCov_9fa48("1397"), auditorStats?.pendingItems)) || 0)}</span>
                  <span className="stat-trend" style={stryMutAct_9fa48("1398") ? {} : (stryCov_9fa48("1398"), {
                  background: stryMutAct_9fa48("1399") ? "" : (stryCov_9fa48("1399"), 'rgba(239, 68, 68, 0.1)'),
                  color: stryMutAct_9fa48("1400") ? "" : (stryCov_9fa48("1400"), 'var(--ed-status-danger)'),
                  borderRadius: stryMutAct_9fa48("1401") ? "" : (stryCov_9fa48("1401"), '12px'),
                  padding: stryMutAct_9fa48("1402") ? "" : (stryCov_9fa48("1402"), '2px 8px'),
                  fontSize: stryMutAct_9fa48("1403") ? "" : (stryCov_9fa48("1403"), '12px'),
                  fontWeight: stryMutAct_9fa48("1404") ? "" : (stryCov_9fa48("1404"), 'bold')
                })}>ação</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card h-100 m-0">
                <span className="stat-header">
                  Políticas Conformes
                  <i className="bi bi-file-earmark-text stat-icon" style={stryMutAct_9fa48("1405") ? {} : (stryCov_9fa48("1405"), {
                  color: stryMutAct_9fa48("1406") ? "" : (stryCov_9fa48("1406"), 'var(--ed-status-info)')
                })}></i>
                </span>
                <div className="stat-body">
                  <span className="stat-value">{stryMutAct_9fa48("1409") ? auditorStats?.compliantPolicies && 0 : stryMutAct_9fa48("1408") ? false : stryMutAct_9fa48("1407") ? true : (stryCov_9fa48("1407", "1408", "1409"), (stryMutAct_9fa48("1410") ? auditorStats.compliantPolicies : (stryCov_9fa48("1410"), auditorStats?.compliantPolicies)) || 0)}/{stryMutAct_9fa48("1413") ? auditorStats?.totalPolicies && 5 : stryMutAct_9fa48("1412") ? false : stryMutAct_9fa48("1411") ? true : (stryCov_9fa48("1411", "1412", "1413"), (stryMutAct_9fa48("1414") ? auditorStats.totalPolicies : (stryCov_9fa48("1414"), auditorStats?.totalPolicies)) || 5)}</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card h-100 m-0">
                <span className="stat-header">
                  Compliance Geral
                  <i className="bi bi-shield-check stat-icon" style={stryMutAct_9fa48("1415") ? {} : (stryCov_9fa48("1415"), {
                  color: stryMutAct_9fa48("1416") ? "" : (stryCov_9fa48("1416"), 'var(--ed-status-success)')
                })}></i>
                </span>
                <div className="stat-body">
                  <span className="stat-value">{stryMutAct_9fa48("1419") ? auditorStats?.score && 0 : stryMutAct_9fa48("1418") ? false : stryMutAct_9fa48("1417") ? true : (stryCov_9fa48("1417", "1418", "1419"), (stryMutAct_9fa48("1420") ? auditorStats.score : (stryCov_9fa48("1420"), auditorStats?.score)) || 0)}%</span>
                  <span className="stat-trend" style={stryMutAct_9fa48("1421") ? {} : (stryCov_9fa48("1421"), {
                  background: stryMutAct_9fa48("1422") ? "" : (stryCov_9fa48("1422"), 'rgba(16, 185, 129, 0.1)'),
                  color: stryMutAct_9fa48("1423") ? "" : (stryCov_9fa48("1423"), 'var(--ed-status-success)'),
                  borderRadius: stryMutAct_9fa48("1424") ? "" : (stryCov_9fa48("1424"), '12px'),
                  padding: stryMutAct_9fa48("1425") ? "" : (stryCov_9fa48("1425"), '2px 8px'),
                  fontSize: stryMutAct_9fa48("1426") ? "" : (stryCov_9fa48("1426"), '12px'),
                  fontWeight: stryMutAct_9fa48("1427") ? "" : (stryCov_9fa48("1427"), 'bold')
                })}>+{stryMutAct_9fa48("1430") ? auditorStats?.scoreTrend && 0 : stryMutAct_9fa48("1429") ? false : stryMutAct_9fa48("1428") ? true : (stryCov_9fa48("1428", "1429", "1430"), (stryMutAct_9fa48("1431") ? auditorStats.scoreTrend : (stryCov_9fa48("1431"), auditorStats?.scoreTrend)) || 0)} pts</span>
                </div>
              </div>
            </div>
          </> : <>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card h-100 m-0">
                <span className="stat-header">
                  Documentos ativos
                  <i className="bi bi-file-earmark-text stat-icon" style={stryMutAct_9fa48("1432") ? {} : (stryCov_9fa48("1432"), {
                  color: stryMutAct_9fa48("1433") ? "" : (stryCov_9fa48("1433"), 'var(--ed-purple-light)')
                })}></i>
                </span>
                <div className="stat-body">
                  <span className="stat-value">{stryMutAct_9fa48("1436") ? stats.activeDocuments && 24 : stryMutAct_9fa48("1435") ? false : stryMutAct_9fa48("1434") ? true : (stryCov_9fa48("1434", "1435", "1436"), stats.activeDocuments || 24)}</span>
                  <span className="stat-trend" style={stryMutAct_9fa48("1437") ? {} : (stryCov_9fa48("1437"), {
                  background: stryMutAct_9fa48("1438") ? "" : (stryCov_9fa48("1438"), 'rgba(16, 185, 129, 0.1)'),
                  color: stryMutAct_9fa48("1439") ? "" : (stryCov_9fa48("1439"), 'var(--ed-status-success)'),
                  borderRadius: stryMutAct_9fa48("1440") ? "" : (stryCov_9fa48("1440"), '12px'),
                  padding: stryMutAct_9fa48("1441") ? "" : (stryCov_9fa48("1441"), '2px 8px'),
                  fontSize: stryMutAct_9fa48("1442") ? "" : (stryCov_9fa48("1442"), '12px'),
                  fontWeight: stryMutAct_9fa48("1443") ? "" : (stryCov_9fa48("1443"), 'bold')
                })}>+3</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card h-100 m-0">
                <div className="stat-header">
                  Aguardando revisão
                  <i className="bi bi-clock stat-icon" style={stryMutAct_9fa48("1444") ? {} : (stryCov_9fa48("1444"), {
                  color: stryMutAct_9fa48("1445") ? "" : (stryCov_9fa48("1445"), 'var(--ed-orange)')
                })}></i>
                </div>
                <div className="stat-body">
                  <span className="stat-value">{stryMutAct_9fa48("1448") ? stats.pendingReview && 5 : stryMutAct_9fa48("1447") ? false : stryMutAct_9fa48("1446") ? true : (stryCov_9fa48("1446", "1447", "1448"), stats.pendingReview || 5)}</span>
                  <span className="stat-trend" style={stryMutAct_9fa48("1449") ? {} : (stryCov_9fa48("1449"), {
                  background: stryMutAct_9fa48("1450") ? "" : (stryCov_9fa48("1450"), 'rgba(16, 185, 129, 0.1)'),
                  color: stryMutAct_9fa48("1451") ? "" : (stryCov_9fa48("1451"), 'var(--ed-status-success)'),
                  borderRadius: stryMutAct_9fa48("1452") ? "" : (stryCov_9fa48("1452"), '12px'),
                  padding: stryMutAct_9fa48("1453") ? "" : (stryCov_9fa48("1453"), '2px 8px'),
                  fontSize: stryMutAct_9fa48("1454") ? "" : (stryCov_9fa48("1454"), '12px'),
                  fontWeight: stryMutAct_9fa48("1455") ? "" : (stryCov_9fa48("1455"), 'bold')
                })}>-1</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card h-100 m-0">
                <span className="stat-header">
                  Compliance Score Geral
                  <i className="bi bi-shield-check stat-icon" style={stryMutAct_9fa48("1456") ? {} : (stryCov_9fa48("1456"), {
                  color: stryMutAct_9fa48("1457") ? "" : (stryCov_9fa48("1457"), 'var(--ed-status-success)')
                })}></i>
                </span>
                <div className="stat-body">
                  <span className="stat-value">{stryMutAct_9fa48("1460") ? stats.complianceScore && 92 : stryMutAct_9fa48("1459") ? false : stryMutAct_9fa48("1458") ? true : (stryCov_9fa48("1458", "1459", "1460"), stats.complianceScore || 92)}%</span>
                  <span className="stat-trend" style={stryMutAct_9fa48("1461") ? {} : (stryCov_9fa48("1461"), {
                  background: stryMutAct_9fa48("1462") ? "" : (stryCov_9fa48("1462"), 'rgba(16, 185, 129, 0.1)'),
                  color: stryMutAct_9fa48("1463") ? "" : (stryCov_9fa48("1463"), 'var(--ed-status-success)'),
                  borderRadius: stryMutAct_9fa48("1464") ? "" : (stryCov_9fa48("1464"), '12px'),
                  padding: stryMutAct_9fa48("1465") ? "" : (stryCov_9fa48("1465"), '2px 8px'),
                  fontSize: stryMutAct_9fa48("1466") ? "" : (stryCov_9fa48("1466"), '12px'),
                  fontWeight: stryMutAct_9fa48("1467") ? "" : (stryCov_9fa48("1467"), 'bold')
                })}>+4 pts</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card h-100 m-0">
                <span className="stat-header">
                  Progresso da pesquisa
                  <i className="bi bi-graph-up stat-icon" style={stryMutAct_9fa48("1468") ? {} : (stryCov_9fa48("1468"), {
                  color: stryMutAct_9fa48("1469") ? "" : (stryCov_9fa48("1469"), 'var(--ed-status-info)')
                })}></i>
                </span>
                <div className="stat-body">
                  <span className="stat-value">{stryMutAct_9fa48("1472") ? stats.researchProgress && 68 : stryMutAct_9fa48("1471") ? false : stryMutAct_9fa48("1470") ? true : (stryCov_9fa48("1470", "1471", "1472"), stats.researchProgress || 68)}%</span>
                  <span className="stat-trend" style={stryMutAct_9fa48("1473") ? {} : (stryCov_9fa48("1473"), {
                  background: stryMutAct_9fa48("1474") ? "" : (stryCov_9fa48("1474"), 'rgba(59, 130, 246, 0.1)'),
                  color: stryMutAct_9fa48("1475") ? "" : (stryCov_9fa48("1475"), 'var(--ed-status-info)'),
                  borderRadius: stryMutAct_9fa48("1476") ? "" : (stryCov_9fa48("1476"), '12px'),
                  padding: stryMutAct_9fa48("1477") ? "" : (stryCov_9fa48("1477"), '2px 8px'),
                  fontSize: stryMutAct_9fa48("1478") ? "" : (stryCov_9fa48("1478"), '12px'),
                  fontWeight: stryMutAct_9fa48("1479") ? "" : (stryCov_9fa48("1479"), 'bold')
                })}>no prazo</span>
                </div>
              </div>
            </div>
          </>}
      </div>

      {/* 2. BARRA DE ALERTA DE GOVERNANÇA (FLEXBOX RESPONSIVO) */}
      {(stryMutAct_9fa48("1482") ? user?.role !== 'RESEARCHER' : stryMutAct_9fa48("1481") ? false : stryMutAct_9fa48("1480") ? true : (stryCov_9fa48("1480", "1481", "1482"), (stryMutAct_9fa48("1483") ? user.role : (stryCov_9fa48("1483"), user?.role)) === (stryMutAct_9fa48("1484") ? "" : (stryCov_9fa48("1484"), 'RESEARCHER')))) ? <div className="governance-alert d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4" style={stryMutAct_9fa48("1485") ? {} : (stryCov_9fa48("1485"), {
        background: stryMutAct_9fa48("1486") ? "" : (stryCov_9fa48("1486"), 'linear-gradient(90deg, #f58a07 0%, #ffb057 100%)'),
        boxShadow: stryMutAct_9fa48("1487") ? "" : (stryCov_9fa48("1487"), '0 4px 15px rgba(245, 138, 7, 0.3)')
      })}>
          <div className="alert-content">
            <div className="alert-icon">
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <div className="alert-text-container">
              <span className="alert-title">AÇÃO REQUERIDA</span>
              <span className="alert-desc">
                Seu documento <strong>Dataset_Experimento_B.csv</strong> foi sinalizado pela verificação de LGPD e precisa de anonimização.
              </span>
            </div>
          </div>
          <button className="btn-alert w-100 w-md-auto" style={stryMutAct_9fa48("1488") ? {} : (stryCov_9fa48("1488"), {
          background: stryMutAct_9fa48("1489") ? "" : (stryCov_9fa48("1489"), 'white'),
          color: stryMutAct_9fa48("1490") ? "" : (stryCov_9fa48("1490"), 'var(--ed-orange)')
        })} onClick={stryMutAct_9fa48("1491") ? () => undefined : (stryCov_9fa48("1491"), () => navigate(stryMutAct_9fa48("1492") ? "" : (stryCov_9fa48("1492"), '/trail')))}>
            <i className="bi bi-arrow-right-short"></i> Corrigir agora
          </button>
        </div> : (stryMutAct_9fa48("1495") ? user?.role !== 'AUDITOR' : stryMutAct_9fa48("1494") ? false : stryMutAct_9fa48("1493") ? true : (stryCov_9fa48("1493", "1494", "1495"), (stryMutAct_9fa48("1496") ? user.role : (stryCov_9fa48("1496"), user?.role)) === (stryMutAct_9fa48("1497") ? "" : (stryCov_9fa48("1497"), 'AUDITOR')))) ? <div className="governance-alert d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4" style={stryMutAct_9fa48("1498") ? {} : (stryCov_9fa48("1498"), {
        background: stryMutAct_9fa48("1499") ? "" : (stryCov_9fa48("1499"), 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)'),
        boxShadow: stryMutAct_9fa48("1500") ? "" : (stryCov_9fa48("1500"), '0 4px 15px rgba(220, 38, 38, 0.3)')
      })}>
          <div className="alert-content">
            <div className="alert-icon">
              <i className="bi bi-shield-x"></i>
            </div>
            <div className="alert-text-container">
              <span className="alert-title">FALHA CRÍTICA DE RETENÇÃO</span>
              <span className="alert-desc">
                14 documentos passaram do período de retenção legal (5 anos). Ação imediata necessária.
              </span>
            </div>
          </div>
          <button className="btn-alert w-100 w-md-auto" style={stryMutAct_9fa48("1501") ? {} : (stryCov_9fa48("1501"), {
          background: stryMutAct_9fa48("1502") ? "" : (stryCov_9fa48("1502"), 'white'),
          color: stryMutAct_9fa48("1503") ? "" : (stryCov_9fa48("1503"), '#dc2626')
        })} onClick={stryMutAct_9fa48("1504") ? () => undefined : (stryCov_9fa48("1504"), () => navigate(stryMutAct_9fa48("1505") ? "" : (stryCov_9fa48("1505"), '/compliance-center')))}>
            <i className="bi bi-arrow-right-short"></i> Investigar
          </button>
        </div> : <div className="governance-alert d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
          <div className="alert-content">
            <div className="alert-icon">
              <i className="bi bi-shield-exclamation"></i>
            </div>
            <div className="alert-text-container">
              <span className="alert-title">ALERTA DE GOVERNANÇA GERAL</span>
              <span className="alert-desc">
                2 documentos do seu laboratório têm seções de metodologia incompletas e 1 dataset precisa de anonimização LGPD antes da publicação.
              </span>
            </div>
          </div>
          <button className="btn-alert w-100 w-md-auto" onClick={stryMutAct_9fa48("1506") ? () => undefined : (stryCov_9fa48("1506"), () => navigate(stryMutAct_9fa48("1507") ? "" : (stryCov_9fa48("1507"), '/trail')))}>
            <i className="bi bi-arrow-right-short"></i> Ver detalhes
          </button>
        </div>}

      {/* 3. GRID PRINCIPAL (DASHBOARD GRID REFACTORADO) */}
      <div className="row g-4">
        {/* COLUNA DA ESQUERDA (Lista de submissões/atividades) */}
        <div className="col-12 col-xl-8">
          {(stryMutAct_9fa48("1510") ? user?.role !== 'RESEARCHER' : stryMutAct_9fa48("1509") ? false : stryMutAct_9fa48("1508") ? true : (stryCov_9fa48("1508", "1509", "1510"), (stryMutAct_9fa48("1511") ? user.role : (stryCov_9fa48("1511"), user?.role)) === (stryMutAct_9fa48("1512") ? "" : (stryCov_9fa48("1512"), 'RESEARCHER')))) ? <div className="dashboard-card h-100 mb-0">
              <div className="card-header-flex">
                <h3 className="card-title">Minhas Submissões Recentes</h3>
                <span className="card-action-link" style={stryMutAct_9fa48("1513") ? {} : (stryCov_9fa48("1513"), {
                color: stryMutAct_9fa48("1514") ? "" : (stryCov_9fa48("1514"), 'var(--ed-purple-light)'),
                cursor: stryMutAct_9fa48("1515") ? "" : (stryCov_9fa48("1515"), 'pointer'),
                fontSize: stryMutAct_9fa48("1516") ? "" : (stryCov_9fa48("1516"), '13px'),
                fontWeight: 500
              })}>Ver histórico</span>
              </div>
              <div className="doc-list">
                {(stryMutAct_9fa48("1520") ? recentDocs.length <= 0 : stryMutAct_9fa48("1519") ? recentDocs.length >= 0 : stryMutAct_9fa48("1518") ? false : stryMutAct_9fa48("1517") ? true : (stryCov_9fa48("1517", "1518", "1519", "1520"), recentDocs.length > 0)) ? recentDocs.map(stryMutAct_9fa48("1521") ? () => undefined : (stryCov_9fa48("1521"), (doc: any, i) => <div className="doc-item flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2" key={doc.id} style={(stryMutAct_9fa48("1524") ? i !== recentDocs.length - 1 : stryMutAct_9fa48("1523") ? false : stryMutAct_9fa48("1522") ? true : (stryCov_9fa48("1522", "1523", "1524"), i === (stryMutAct_9fa48("1525") ? recentDocs.length + 1 : (stryCov_9fa48("1525"), recentDocs.length - 1)))) ? stryMutAct_9fa48("1526") ? {} : (stryCov_9fa48("1526"), {
                borderBottom: stryMutAct_9fa48("1527") ? "" : (stryCov_9fa48("1527"), 'none')
              }) : {}}>
                    <div className="doc-info" style={stryMutAct_9fa48("1528") ? {} : (stryCov_9fa48("1528"), {
                  display: stryMutAct_9fa48("1529") ? "" : (stryCov_9fa48("1529"), 'flex'),
                  gap: stryMutAct_9fa48("1530") ? "" : (stryCov_9fa48("1530"), '16px'),
                  alignItems: stryMutAct_9fa48("1531") ? "" : (stryCov_9fa48("1531"), 'center')
                })}>
                      <div style={stryMutAct_9fa48("1532") ? {} : (stryCov_9fa48("1532"), {
                    width: stryMutAct_9fa48("1533") ? "" : (stryCov_9fa48("1533"), '36px'),
                    height: stryMutAct_9fa48("1534") ? "" : (stryCov_9fa48("1534"), '36px'),
                    background: stryMutAct_9fa48("1535") ? "" : (stryCov_9fa48("1535"), 'rgba(59, 130, 246, 0.1)'),
                    color: stryMutAct_9fa48("1536") ? "" : (stryCov_9fa48("1536"), 'var(--ed-status-info)'),
                    borderRadius: stryMutAct_9fa48("1537") ? "" : (stryCov_9fa48("1537"), '8px'),
                    display: stryMutAct_9fa48("1538") ? "" : (stryCov_9fa48("1538"), 'flex'),
                    alignItems: stryMutAct_9fa48("1539") ? "" : (stryCov_9fa48("1539"), 'center'),
                    justifyContent: stryMutAct_9fa48("1540") ? "" : (stryCov_9fa48("1540"), 'center')
                  })}>
                        <i className={(stryMutAct_9fa48("1541") ? doc.title.startsWith('.pdf') : (stryCov_9fa48("1541"), doc.title.endsWith(stryMutAct_9fa48("1542") ? "" : (stryCov_9fa48("1542"), '.pdf')))) ? stryMutAct_9fa48("1543") ? "" : (stryCov_9fa48("1543"), 'bi bi-file-earmark-pdf') : stryMutAct_9fa48("1544") ? "" : (stryCov_9fa48("1544"), 'bi bi-file-earmark-text')}></i>
                      </div>
                      <div style={stryMutAct_9fa48("1545") ? {} : (stryCov_9fa48("1545"), {
                    display: stryMutAct_9fa48("1546") ? "" : (stryCov_9fa48("1546"), 'flex'),
                    flexDirection: stryMutAct_9fa48("1547") ? "" : (stryCov_9fa48("1547"), 'column')
                  })}>
                        <span className="doc-name" style={stryMutAct_9fa48("1548") ? {} : (stryCov_9fa48("1548"), {
                      fontWeight: 600,
                      color: stryMutAct_9fa48("1549") ? "" : (stryCov_9fa48("1549"), 'var(--ed-text-dark)'),
                      fontSize: stryMutAct_9fa48("1550") ? "" : (stryCov_9fa48("1550"), '14px')
                    })}>
                          {doc.title}
                        </span>
                        <span style={stryMutAct_9fa48("1551") ? {} : (stryCov_9fa48("1551"), {
                      fontSize: stryMutAct_9fa48("1552") ? "" : (stryCov_9fa48("1552"), '12px'),
                      color: stryMutAct_9fa48("1553") ? "" : (stryCov_9fa48("1553"), 'var(--ed-text-muted)')
                    })}>Atualizado {new Date(doc.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between w-100 w-sm-auto gap-3">
                      <span style={stryMutAct_9fa48("1554") ? {} : (stryCov_9fa48("1554"), {
                    fontSize: stryMutAct_9fa48("1555") ? "" : (stryCov_9fa48("1555"), '12px'),
                    color: stryMutAct_9fa48("1556") ? "" : (stryCov_9fa48("1556"), 'var(--ed-text-muted)'),
                    background: stryMutAct_9fa48("1557") ? "" : (stryCov_9fa48("1557"), 'var(--border)'),
                    padding: stryMutAct_9fa48("1558") ? "" : (stryCov_9fa48("1558"), '4px 10px'),
                    borderRadius: stryMutAct_9fa48("1559") ? "" : (stryCov_9fa48("1559"), '12px'),
                    fontWeight: 600
                  })}>
                        {doc.status}
                      </span>
                      <button style={stryMutAct_9fa48("1560") ? {} : (stryCov_9fa48("1560"), {
                    border: stryMutAct_9fa48("1561") ? "" : (stryCov_9fa48("1561"), '1px solid var(--border)'),
                    background: stryMutAct_9fa48("1562") ? "" : (stryCov_9fa48("1562"), 'transparent'),
                    padding: stryMutAct_9fa48("1563") ? "" : (stryCov_9fa48("1563"), '6px 16px'),
                    borderRadius: stryMutAct_9fa48("1564") ? "" : (stryCov_9fa48("1564"), '6px'),
                    fontSize: stryMutAct_9fa48("1565") ? "" : (stryCov_9fa48("1565"), '13px'),
                    fontWeight: 500,
                    color: stryMutAct_9fa48("1566") ? "" : (stryCov_9fa48("1566"), 'var(--ed-text-dark)'),
                    cursor: stryMutAct_9fa48("1567") ? "" : (stryCov_9fa48("1567"), 'pointer')
                  })} onClick={stryMutAct_9fa48("1568") ? () => undefined : (stryCov_9fa48("1568"), () => navigate(stryMutAct_9fa48("1569") ? "" : (stryCov_9fa48("1569"), '/documentos')))}>
                        Ver
                      </button>
                    </div>
                  </div>)) : <div style={stryMutAct_9fa48("1570") ? {} : (stryCov_9fa48("1570"), {
                padding: stryMutAct_9fa48("1571") ? "" : (stryCov_9fa48("1571"), '2rem'),
                textAlign: stryMutAct_9fa48("1572") ? "" : (stryCov_9fa48("1572"), 'center'),
                color: stryMutAct_9fa48("1573") ? "" : (stryCov_9fa48("1573"), '#64748B')
              })}>Nenhum documento</div>}
              </div>
            </div> : (stryMutAct_9fa48("1576") ? user?.role !== 'AUDITOR' : stryMutAct_9fa48("1575") ? false : stryMutAct_9fa48("1574") ? true : (stryCov_9fa48("1574", "1575", "1576"), (stryMutAct_9fa48("1577") ? user.role : (stryCov_9fa48("1577"), user?.role)) === (stryMutAct_9fa48("1578") ? "" : (stryCov_9fa48("1578"), 'AUDITOR')))) ? <div className="dashboard-card h-100 mb-0">
              <div className="card-header-flex">
                <h3 className="card-title">Atividades Críticas Recentes</h3>
                <span className="card-action-link" style={stryMutAct_9fa48("1579") ? {} : (stryCov_9fa48("1579"), {
                color: stryMutAct_9fa48("1580") ? "" : (stryCov_9fa48("1580"), 'var(--ed-purple-light)'),
                cursor: stryMutAct_9fa48("1581") ? "" : (stryCov_9fa48("1581"), 'pointer'),
                fontSize: stryMutAct_9fa48("1582") ? "" : (stryCov_9fa48("1582"), '13px'),
                fontWeight: 500
              })} onClick={stryMutAct_9fa48("1583") ? () => undefined : (stryCov_9fa48("1583"), () => navigate(stryMutAct_9fa48("1584") ? "" : (stryCov_9fa48("1584"), '/audit-logs')))}>Ver logs</span>
              </div>
              <div className="doc-list">
                {(stryMutAct_9fa48("1588") ? recentLogs.length <= 0 : stryMutAct_9fa48("1587") ? recentLogs.length >= 0 : stryMutAct_9fa48("1586") ? false : stryMutAct_9fa48("1585") ? true : (stryCov_9fa48("1585", "1586", "1587", "1588"), recentLogs.length > 0)) ? recentLogs.map(stryMutAct_9fa48("1589") ? () => undefined : (stryCov_9fa48("1589"), (log: any, i) => <div className="doc-item flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2" key={log.id} style={(stryMutAct_9fa48("1592") ? i !== recentLogs.length - 1 : stryMutAct_9fa48("1591") ? false : stryMutAct_9fa48("1590") ? true : (stryCov_9fa48("1590", "1591", "1592"), i === (stryMutAct_9fa48("1593") ? recentLogs.length + 1 : (stryCov_9fa48("1593"), recentLogs.length - 1)))) ? stryMutAct_9fa48("1594") ? {} : (stryCov_9fa48("1594"), {
                borderBottom: stryMutAct_9fa48("1595") ? "" : (stryCov_9fa48("1595"), 'none')
              }) : {}}>
                    <div className="doc-info" style={stryMutAct_9fa48("1596") ? {} : (stryCov_9fa48("1596"), {
                  display: stryMutAct_9fa48("1597") ? "" : (stryCov_9fa48("1597"), 'flex'),
                  gap: stryMutAct_9fa48("1598") ? "" : (stryCov_9fa48("1598"), '16px'),
                  alignItems: stryMutAct_9fa48("1599") ? "" : (stryCov_9fa48("1599"), 'center')
                })}>
                      <div style={stryMutAct_9fa48("1600") ? {} : (stryCov_9fa48("1600"), {
                    width: stryMutAct_9fa48("1601") ? "" : (stryCov_9fa48("1601"), '36px'),
                    height: stryMutAct_9fa48("1602") ? "" : (stryCov_9fa48("1602"), '36px'),
                    background: stryMutAct_9fa48("1603") ? "" : (stryCov_9fa48("1603"), 'rgba(239, 68, 68, 0.1)'),
                    color: stryMutAct_9fa48("1604") ? "" : (stryCov_9fa48("1604"), 'var(--ed-status-danger)'),
                    borderRadius: stryMutAct_9fa48("1605") ? "" : (stryCov_9fa48("1605"), '8px'),
                    display: stryMutAct_9fa48("1606") ? "" : (stryCov_9fa48("1606"), 'flex'),
                    alignItems: stryMutAct_9fa48("1607") ? "" : (stryCov_9fa48("1607"), 'center'),
                    justifyContent: stryMutAct_9fa48("1608") ? "" : (stryCov_9fa48("1608"), 'center')
                  })}>
                        <i className="bi bi-shield-exclamation"></i>
                      </div>
                      <div style={stryMutAct_9fa48("1609") ? {} : (stryCov_9fa48("1609"), {
                    display: stryMutAct_9fa48("1610") ? "" : (stryCov_9fa48("1610"), 'flex'),
                    flexDirection: stryMutAct_9fa48("1611") ? "" : (stryCov_9fa48("1611"), 'column')
                  })}>
                        <span className="doc-name" style={stryMutAct_9fa48("1612") ? {} : (stryCov_9fa48("1612"), {
                      fontWeight: 600,
                      color: stryMutAct_9fa48("1613") ? "" : (stryCov_9fa48("1613"), 'var(--ed-text-dark)'),
                      fontSize: stryMutAct_9fa48("1614") ? "" : (stryCov_9fa48("1614"), '14px')
                    })}>
                          {log.action}
                        </span>
                        <span style={stryMutAct_9fa48("1615") ? {} : (stryCov_9fa48("1615"), {
                      fontSize: stryMutAct_9fa48("1616") ? "" : (stryCov_9fa48("1616"), '12px'),
                      color: stryMutAct_9fa48("1617") ? "" : (stryCov_9fa48("1617"), 'var(--ed-text-muted)')
                    })}>{stryMutAct_9fa48("1618") ? log.details : (stryCov_9fa48("1618"), log.details.substring(0, 30))}...</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between w-100 w-sm-auto gap-3">
                      <span style={stryMutAct_9fa48("1619") ? {} : (stryCov_9fa48("1619"), {
                    fontSize: stryMutAct_9fa48("1620") ? "" : (stryCov_9fa48("1620"), '12px'),
                    color: stryMutAct_9fa48("1621") ? "" : (stryCov_9fa48("1621"), 'var(--ed-text-muted)')
                  })}>{log.userName}</span>
                    </div>
                  </div>)) : <div style={stryMutAct_9fa48("1622") ? {} : (stryCov_9fa48("1622"), {
                padding: stryMutAct_9fa48("1623") ? "" : (stryCov_9fa48("1623"), '2rem'),
                textAlign: stryMutAct_9fa48("1624") ? "" : (stryCov_9fa48("1624"), 'center'),
                color: stryMutAct_9fa48("1625") ? "" : (stryCov_9fa48("1625"), '#64748B')
              })}>Nenhum log crítico</div>}
              </div>
            </div> : <div className="dashboard-card h-100 mb-0">
              <div className="card-header-flex">
                <h3 className="card-title">Revisões Pendentes</h3>
                <span className="card-action-link" style={stryMutAct_9fa48("1626") ? {} : (stryCov_9fa48("1626"), {
                color: stryMutAct_9fa48("1627") ? "" : (stryCov_9fa48("1627"), 'var(--ed-purple-light)'),
                cursor: stryMutAct_9fa48("1628") ? "" : (stryCov_9fa48("1628"), 'pointer'),
                fontSize: stryMutAct_9fa48("1629") ? "" : (stryCov_9fa48("1629"), '13px'),
                fontWeight: 500
              })}>Ver todas</span>
              </div>
              <div className="doc-list">
                {(stryMutAct_9fa48("1633") ? recentDocs.length <= 0 : stryMutAct_9fa48("1632") ? recentDocs.length >= 0 : stryMutAct_9fa48("1631") ? false : stryMutAct_9fa48("1630") ? true : (stryCov_9fa48("1630", "1631", "1632", "1633"), recentDocs.length > 0)) ? recentDocs.map(stryMutAct_9fa48("1634") ? () => undefined : (stryCov_9fa48("1634"), (doc: any, i) => <div className="doc-item flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2" key={doc.id} style={(stryMutAct_9fa48("1637") ? i !== recentDocs.length - 1 : stryMutAct_9fa48("1636") ? false : stryMutAct_9fa48("1635") ? true : (stryCov_9fa48("1635", "1636", "1637"), i === (stryMutAct_9fa48("1638") ? recentDocs.length + 1 : (stryCov_9fa48("1638"), recentDocs.length - 1)))) ? stryMutAct_9fa48("1639") ? {} : (stryCov_9fa48("1639"), {
                borderBottom: stryMutAct_9fa48("1640") ? "" : (stryCov_9fa48("1640"), 'none')
              }) : {}}>
                    <div className="doc-info" style={stryMutAct_9fa48("1641") ? {} : (stryCov_9fa48("1641"), {
                  display: stryMutAct_9fa48("1642") ? "" : (stryCov_9fa48("1642"), 'flex'),
                  gap: stryMutAct_9fa48("1643") ? "" : (stryCov_9fa48("1643"), '16px'),
                  alignItems: stryMutAct_9fa48("1644") ? "" : (stryCov_9fa48("1644"), 'center')
                })}>
                      <div style={stryMutAct_9fa48("1645") ? {} : (stryCov_9fa48("1645"), {
                    width: stryMutAct_9fa48("1646") ? "" : (stryCov_9fa48("1646"), '36px'),
                    height: stryMutAct_9fa48("1647") ? "" : (stryCov_9fa48("1647"), '36px'),
                    background: stryMutAct_9fa48("1648") ? "" : (stryCov_9fa48("1648"), 'rgba(239, 68, 68, 0.1)'),
                    color: stryMutAct_9fa48("1649") ? "" : (stryCov_9fa48("1649"), 'var(--ed-status-danger)'),
                    borderRadius: stryMutAct_9fa48("1650") ? "" : (stryCov_9fa48("1650"), '8px'),
                    display: stryMutAct_9fa48("1651") ? "" : (stryCov_9fa48("1651"), 'flex'),
                    alignItems: stryMutAct_9fa48("1652") ? "" : (stryCov_9fa48("1652"), 'center'),
                    justifyContent: stryMutAct_9fa48("1653") ? "" : (stryCov_9fa48("1653"), 'center')
                  })}>
                        <i className="bi bi-file-earmark-pdf"></i>
                      </div>
                      <div style={stryMutAct_9fa48("1654") ? {} : (stryCov_9fa48("1654"), {
                    display: stryMutAct_9fa48("1655") ? "" : (stryCov_9fa48("1655"), 'flex'),
                    flexDirection: stryMutAct_9fa48("1656") ? "" : (stryCov_9fa48("1656"), 'column')
                  })}>
                        <span className="doc-name" style={stryMutAct_9fa48("1657") ? {} : (stryCov_9fa48("1657"), {
                      fontWeight: 600,
                      color: stryMutAct_9fa48("1658") ? "" : (stryCov_9fa48("1658"), 'var(--ed-text-dark)'),
                      fontSize: stryMutAct_9fa48("1659") ? "" : (stryCov_9fa48("1659"), '14px')
                    })}>
                          {doc.title}
                        </span>
                        <span style={stryMutAct_9fa48("1660") ? {} : (stryCov_9fa48("1660"), {
                      fontSize: stryMutAct_9fa48("1661") ? "" : (stryCov_9fa48("1661"), '12px'),
                      color: stryMutAct_9fa48("1662") ? "" : (stryCov_9fa48("1662"), 'var(--ed-text-muted)')
                    })}>{stryMutAct_9fa48("1663") ? doc.author.name : (stryCov_9fa48("1663"), doc.author?.name)} - {new Date(doc.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between w-100 w-sm-auto gap-3">
                      <span style={stryMutAct_9fa48("1664") ? {} : (stryCov_9fa48("1664"), {
                    fontSize: stryMutAct_9fa48("1665") ? "" : (stryCov_9fa48("1665"), '12px'),
                    color: stryMutAct_9fa48("1666") ? "" : (stryCov_9fa48("1666"), 'var(--ed-orange)'),
                    background: stryMutAct_9fa48("1667") ? "" : (stryCov_9fa48("1667"), 'rgba(245, 158, 11, 0.1)'),
                    padding: stryMutAct_9fa48("1668") ? "" : (stryCov_9fa48("1668"), '4px 10px'),
                    borderRadius: stryMutAct_9fa48("1669") ? "" : (stryCov_9fa48("1669"), '12px'),
                    fontWeight: 600
                  })}>
                        <i className="bi bi-clock"></i> Pendente
                      </span>
                      <button style={stryMutAct_9fa48("1670") ? {} : (stryCov_9fa48("1670"), {
                    border: stryMutAct_9fa48("1671") ? "" : (stryCov_9fa48("1671"), '1px solid var(--border)'),
                    background: stryMutAct_9fa48("1672") ? "" : (stryCov_9fa48("1672"), 'transparent'),
                    padding: stryMutAct_9fa48("1673") ? "" : (stryCov_9fa48("1673"), '6px 16px'),
                    borderRadius: stryMutAct_9fa48("1674") ? "" : (stryCov_9fa48("1674"), '6px'),
                    fontSize: stryMutAct_9fa48("1675") ? "" : (stryCov_9fa48("1675"), '13px'),
                    fontWeight: 500,
                    color: stryMutAct_9fa48("1676") ? "" : (stryCov_9fa48("1676"), 'var(--ed-text-dark)'),
                    cursor: stryMutAct_9fa48("1677") ? "" : (stryCov_9fa48("1677"), 'pointer')
                  })} onClick={stryMutAct_9fa48("1678") ? () => undefined : (stryCov_9fa48("1678"), () => navigate(stryMutAct_9fa48("1679") ? "" : (stryCov_9fa48("1679"), '/submissions')))}>
                        Revisar
                      </button>
                    </div>
                  </div>)) : <div style={stryMutAct_9fa48("1680") ? {} : (stryCov_9fa48("1680"), {
                padding: stryMutAct_9fa48("1681") ? "" : (stryCov_9fa48("1681"), '2rem'),
                textAlign: stryMutAct_9fa48("1682") ? "" : (stryCov_9fa48("1682"), 'center'),
                color: stryMutAct_9fa48("1683") ? "" : (stryCov_9fa48("1683"), '#64748B')
              })}>Nenhuma submissão pendente.</div>}
              </div>
            </div>}
        </div>

        {/* COLUNA DA DIREITA (Compliance e Gráficos de Progresso) */}
        <div className="col-12 col-xl-4 d-flex flex-column gap-4">
          {(stryMutAct_9fa48("1686") ? user?.role !== 'RESEARCHER' : stryMutAct_9fa48("1685") ? false : stryMutAct_9fa48("1684") ? true : (stryCov_9fa48("1684", "1685", "1686"), (stryMutAct_9fa48("1687") ? user.role : (stryCov_9fa48("1687"), user?.role)) === (stryMutAct_9fa48("1688") ? "" : (stryCov_9fa48("1688"), 'RESEARCHER')))) ? <>
              {/* Compliance Score (Personal) */}
              <div className="dashboard-card mb-0">
                <div className="card-header-flex" style={stryMutAct_9fa48("1689") ? {} : (stryCov_9fa48("1689"), {
                paddingBottom: stryMutAct_9fa48("1690") ? "" : (stryCov_9fa48("1690"), '10px'),
                border: stryMutAct_9fa48("1691") ? "" : (stryCov_9fa48("1691"), 'none')
              })}>
                  <div>
                    <div className="card-title">Meu Perfil de Conformidade</div>
                    <div className="card-title-muted mt-1">Sua aderência às políticas de dados</div>
                  </div>
                </div>
                <div className="score-content">
                  <div className="score-circle">
                    <span className="score-number">98</span>
                    <span className="score-label-small">PONTOS</span>
                  </div>
                  <div className="score-breakdown">
                    <div className="breakdown-item">
                      <span>Anonimização</span>
                      <span className="breakdown-status-ok">OK</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Metadados</span>
                      <span className="breakdown-status-ok">OK</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Envios Seguros</span>
                      <span className="breakdown-status-ok">OK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Progress (Personal) */}
              <div className="dashboard-card mb-0">
                <div className="card-header-flex" style={stryMutAct_9fa48("1692") ? {} : (stryCov_9fa48("1692"), {
                paddingBottom: stryMutAct_9fa48("1693") ? "" : (stryCov_9fa48("1693"), '10px'),
                border: stryMutAct_9fa48("1694") ? "" : (stryCov_9fa48("1694"), 'none')
              })}>
                  <div className="card-title">Progresso da Tese / Artigo</div>
                </div>
                <div className="progress-content">
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Referencial Teórico</span>
                      <span>100%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-purple" style={stryMutAct_9fa48("1695") ? {} : (stryCov_9fa48("1695"), {
                      width: stryMutAct_9fa48("1696") ? "" : (stryCov_9fa48("1696"), '100%')
                    })}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Coleta de Dados</span>
                      <span>85%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-purple" style={stryMutAct_9fa48("1697") ? {} : (stryCov_9fa48("1697"), {
                      width: stryMutAct_9fa48("1698") ? "" : (stryCov_9fa48("1698"), '85%')
                    })}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Análise de Resultados</span>
                      <span>30%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-orange" style={stryMutAct_9fa48("1699") ? {} : (stryCov_9fa48("1699"), {
                      width: stryMutAct_9fa48("1700") ? "" : (stryCov_9fa48("1700"), '30%')
                    })}></div>
                    </div>
                  </div>
                </div>
              </div>
            </> : (stryMutAct_9fa48("1703") ? user?.role !== 'AUDITOR' : stryMutAct_9fa48("1702") ? false : stryMutAct_9fa48("1701") ? true : (stryCov_9fa48("1701", "1702", "1703"), (stryMutAct_9fa48("1704") ? user.role : (stryCov_9fa48("1704"), user?.role)) === (stryMutAct_9fa48("1705") ? "" : (stryCov_9fa48("1705"), 'AUDITOR')))) ? <>
              {/* Compliance Overview */}
              <div className="dashboard-card mb-0">
                <div className="card-header-flex" style={stryMutAct_9fa48("1706") ? {} : (stryCov_9fa48("1706"), {
                paddingBottom: stryMutAct_9fa48("1707") ? "" : (stryCov_9fa48("1707"), '10px'),
                border: stryMutAct_9fa48("1708") ? "" : (stryCov_9fa48("1708"), 'none')
              })}>
                  <div className="card-title">Conformidade Institucional</div>
                </div>
                <div className="progress-content">
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>LGPD</span>
                      <span>100%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-purple" style={stryMutAct_9fa48("1709") ? {} : (stryCov_9fa48("1709"), {
                      width: stryMutAct_9fa48("1710") ? "" : (stryCov_9fa48("1710"), '100%'),
                      background: stryMutAct_9fa48("1711") ? "" : (stryCov_9fa48("1711"), '#4CAF50')
                    })}></div>
                    </div>
                  </div>
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Termos de Consentimento</span>
                      <span>83%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-orange" style={stryMutAct_9fa48("1712") ? {} : (stryCov_9fa48("1712"), {
                      width: stryMutAct_9fa48("1713") ? "" : (stryCov_9fa48("1713"), '83%')
                    })}></div>
                    </div>
                  </div>
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Descarte de Dados</span>
                      <span>58%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-red" style={stryMutAct_9fa48("1714") ? {} : (stryCov_9fa48("1714"), {
                      width: stryMutAct_9fa48("1715") ? "" : (stryCov_9fa48("1715"), '58%'),
                      background: stryMutAct_9fa48("1716") ? "" : (stryCov_9fa48("1716"), '#F44336')
                    })}></div>
                    </div>
                  </div>
                </div>
              </div>
            </> : <>
              {/* Compliance Score (General) */}
              <div className="dashboard-card mb-0">
                <div className="card-header-flex" style={stryMutAct_9fa48("1717") ? {} : (stryCov_9fa48("1717"), {
                paddingBottom: stryMutAct_9fa48("1718") ? "" : (stryCov_9fa48("1718"), '10px'),
                border: stryMutAct_9fa48("1719") ? "" : (stryCov_9fa48("1719"), 'none')
              })}>
                  <div>
                    <div className="card-title">Pontuação de Conformidade (Laboratório)</div>
                    <div className="card-title-muted mt-1">LGPD · Integridade · Rastreabilidade</div>
                  </div>
                </div>
                <div className="score-content">
                  <div className="score-circle">
                    <span className="score-number">92</span>
                    <span className="score-label-small">PONTOS</span>
                  </div>
                  <div className="score-breakdown">
                    <div className="breakdown-item">
                      <span>Anonimização</span>
                      <span className="breakdown-status-ok">OK</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Consentimento</span>
                      <span className="breakdown-status-ok">OK</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Versionamento</span>
                      <span className="breakdown-status-warn">Parcial</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Progress (Projects) */}
              <div className="dashboard-card mb-0">
                <div className="card-header-flex" style={stryMutAct_9fa48("1720") ? {} : (stryCov_9fa48("1720"), {
                paddingBottom: stryMutAct_9fa48("1721") ? "" : (stryCov_9fa48("1721"), '10px'),
                border: stryMutAct_9fa48("1722") ? "" : (stryCov_9fa48("1722"), 'none')
              })}>
                  <div className="card-title">Progresso dos Projetos</div>
                </div>
                <div className="progress-content">
                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Análise LGPD (R. Silva)</span>
                      <span>82%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-purple" style={stryMutAct_9fa48("1723") ? {} : (stryCov_9fa48("1723"), {
                      width: stryMutAct_9fa48("1724") ? "" : (stryCov_9fa48("1724"), '82%')
                    })}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Sistemas de IA (A. Costa)</span>
                      <span>64%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-orange" style={stryMutAct_9fa48("1725") ? {} : (stryCov_9fa48("1725"), {
                      width: stryMutAct_9fa48("1726") ? "" : (stryCov_9fa48("1726"), '64%')
                    })}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-header">
                      <span>Bioinformática (J. Mendes)</span>
                      <span>41%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill fill-blue" style={stryMutAct_9fa48("1727") ? {} : (stryCov_9fa48("1727"), {
                      width: stryMutAct_9fa48("1728") ? "" : (stryCov_9fa48("1728"), '41%')
                    })}></div>
                    </div>
                  </div>
                </div>
              </div>
            </>}
        </div>
      </div>
    </DashboardLayout>;
  }
};
export default Dashboard;