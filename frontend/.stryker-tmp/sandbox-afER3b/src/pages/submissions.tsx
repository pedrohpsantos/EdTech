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
import { getDocuments, reviewDocument, getDashboardStats } from '../services/api';
import DatasetPreview from '../components/DatasetPreview';
import styles from '../assets/submissions.module.css';
export default function Submissions() {
  if (stryMutAct_9fa48("2591")) {
    {}
  } else {
    stryCov_9fa48("2591");
    const {
      user: _user
    } = useAuth();
    const [documents, setDocuments] = useState<any[]>(stryMutAct_9fa48("2592") ? ["Stryker was here"] : (stryCov_9fa48("2592"), []));
    const [_stats, setStats] = useState<any>(null);

    // Modals state
    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(stryMutAct_9fa48("2593") ? "Stryker was here!" : (stryCov_9fa48("2593"), ''));
    const [showAnalysisModal, setShowAnalysisModal] = useState(stryMutAct_9fa48("2594") ? true : (stryCov_9fa48("2594"), false));
    const [showRejectionModal, setShowRejectionModal] = useState(stryMutAct_9fa48("2595") ? true : (stryCov_9fa48("2595"), false));
    const [rejectionFeedback, setRejectionFeedback] = useState(stryMutAct_9fa48("2596") ? "Stryker was here!" : (stryCov_9fa48("2596"), ''));
    const loadData = async () => {
      if (stryMutAct_9fa48("2597")) {
        {}
      } else {
        stryCov_9fa48("2597");
        try {
          if (stryMutAct_9fa48("2598")) {
            {}
          } else {
            stryCov_9fa48("2598");
            const statsResponse = await getDashboardStats();
            setStats(statsResponse);

            // Fetch pending documents (we pass status='PENDING_REVIEW' directly if API supports it, 
            // or we just fetch and filter locally depending on the implementation)
            const docsResponse = await getDocuments(undefined, undefined, stryMutAct_9fa48("2599") ? "" : (stryCov_9fa48("2599"), 'PENDING_REVIEW'));
            if (stryMutAct_9fa48("2601") ? false : stryMutAct_9fa48("2600") ? true : (stryCov_9fa48("2600", "2601"), docsResponse.sucesso)) {
              if (stryMutAct_9fa48("2602")) {
                {}
              } else {
                stryCov_9fa48("2602");
                setDocuments(stryMutAct_9fa48("2605") ? docsResponse.dados.content && [] : stryMutAct_9fa48("2604") ? false : stryMutAct_9fa48("2603") ? true : (stryCov_9fa48("2603", "2604", "2605"), docsResponse.dados.content || (stryMutAct_9fa48("2606") ? ["Stryker was here"] : (stryCov_9fa48("2606"), []))));
              }
            }
          }
        } catch (error) {
          if (stryMutAct_9fa48("2607")) {
            {}
          } else {
            stryCov_9fa48("2607");
            console.error(stryMutAct_9fa48("2608") ? "" : (stryCov_9fa48("2608"), 'Failed to load data'), error);
          }
        }
      }
    };
    useEffect(() => {
      if (stryMutAct_9fa48("2609")) {
        {}
      } else {
        stryCov_9fa48("2609");
        loadData();
      }
    }, stryMutAct_9fa48("2610") ? ["Stryker was here"] : (stryCov_9fa48("2610"), []));
    const handleApprove = async (docParam?: any) => {
      if (stryMutAct_9fa48("2611")) {
        {}
      } else {
        stryCov_9fa48("2611");
        const targetDoc = (stryMutAct_9fa48("2612") ? docParam.id : (stryCov_9fa48("2612"), docParam?.id)) ? docParam : selectedDoc;
        if (stryMutAct_9fa48("2615") ? false : stryMutAct_9fa48("2614") ? true : stryMutAct_9fa48("2613") ? targetDoc : (stryCov_9fa48("2613", "2614", "2615"), !targetDoc)) return;
        const response = await reviewDocument(targetDoc.id, stryMutAct_9fa48("2616") ? "" : (stryCov_9fa48("2616"), 'APPROVED'));
        if (stryMutAct_9fa48("2618") ? false : stryMutAct_9fa48("2617") ? true : (stryCov_9fa48("2617", "2618"), response.sucesso)) {
          if (stryMutAct_9fa48("2619")) {
            {}
          } else {
            stryCov_9fa48("2619");
            setShowAnalysisModal(stryMutAct_9fa48("2620") ? true : (stryCov_9fa48("2620"), false));
            setSelectedDoc(null);
            loadData();
          }
        } else {
          if (stryMutAct_9fa48("2621")) {
            {}
          } else {
            stryCov_9fa48("2621");
            alert((stryMutAct_9fa48("2622") ? "" : (stryCov_9fa48("2622"), 'Erro ao aprovar documento: ')) + response.mensagem);
          }
        }
      }
    };
    const handleReject = async () => {
      if (stryMutAct_9fa48("2623")) {
        {}
      } else {
        stryCov_9fa48("2623");
        if (stryMutAct_9fa48("2626") ? !selectedDoc && !rejectionFeedback.trim() : stryMutAct_9fa48("2625") ? false : stryMutAct_9fa48("2624") ? true : (stryCov_9fa48("2624", "2625", "2626"), (stryMutAct_9fa48("2627") ? selectedDoc : (stryCov_9fa48("2627"), !selectedDoc)) || (stryMutAct_9fa48("2628") ? rejectionFeedback.trim() : (stryCov_9fa48("2628"), !(stryMutAct_9fa48("2629") ? rejectionFeedback : (stryCov_9fa48("2629"), rejectionFeedback.trim())))))) return;
        const response = await reviewDocument(selectedDoc.id, stryMutAct_9fa48("2630") ? "" : (stryCov_9fa48("2630"), 'REJECTED'), rejectionFeedback);
        if (stryMutAct_9fa48("2632") ? false : stryMutAct_9fa48("2631") ? true : (stryCov_9fa48("2631", "2632"), response.sucesso)) {
          if (stryMutAct_9fa48("2633")) {
            {}
          } else {
            stryCov_9fa48("2633");
            setShowRejectionModal(stryMutAct_9fa48("2634") ? true : (stryCov_9fa48("2634"), false));
            setRejectionFeedback(stryMutAct_9fa48("2635") ? "Stryker was here!" : (stryCov_9fa48("2635"), ''));
            setSelectedDoc(null);
            loadData();
          }
        } else {
          if (stryMutAct_9fa48("2636")) {
            {}
          } else {
            stryCov_9fa48("2636");
            alert((stryMutAct_9fa48("2637") ? "" : (stryCov_9fa48("2637"), 'Erro ao rejeitar documento: ')) + response.mensagem);
          }
        }
      }
    };
    const openRejectionModal = (doc: any) => {
      if (stryMutAct_9fa48("2638")) {
        {}
      } else {
        stryCov_9fa48("2638");
        setSelectedDoc(doc);
        setShowAnalysisModal(stryMutAct_9fa48("2639") ? true : (stryCov_9fa48("2639"), false));
        setShowRejectionModal(stryMutAct_9fa48("2640") ? false : (stryCov_9fa48("2640"), true));
      }
    };
    const handleAnalyze = async (doc: any) => {
      if (stryMutAct_9fa48("2641")) {
        {}
      } else {
        stryCov_9fa48("2641");
        setSelectedDoc(doc);
        setPreviewUrl(stryMutAct_9fa48("2642") ? "Stryker was here!" : (stryCov_9fa48("2642"), ''));
        setShowAnalysisModal(stryMutAct_9fa48("2643") ? false : (stryCov_9fa48("2643"), true));

        // Fetch the download URL (presigned GCS URL) to preview
        import('../services/api').then(async ({
          getDownloadUrl
        }) => {
          if (stryMutAct_9fa48("2644")) {
            {}
          } else {
            stryCov_9fa48("2644");
            const resp = await getDownloadUrl(doc.id);
            if (stryMutAct_9fa48("2646") ? false : stryMutAct_9fa48("2645") ? true : (stryCov_9fa48("2645", "2646"), resp.sucesso)) {
              if (stryMutAct_9fa48("2647")) {
                {}
              } else {
                stryCov_9fa48("2647");
                setPreviewUrl(resp.dados.downloadUrl);
              }
            }
          }
        });
      }
    };
    const formatSize = (_url: string) => {
      if (stryMutAct_9fa48("2648")) {
        {}
      } else {
        stryCov_9fa48("2648");
        return stryMutAct_9fa48("2649") ? "" : (stryCov_9fa48("2649"), '2.4 MB'); // Mock placeholder, since we don't return size from backend yet
      }
    };
    const getInitials = (name: string) => {
      if (stryMutAct_9fa48("2650")) {
        {}
      } else {
        stryCov_9fa48("2650");
        if (stryMutAct_9fa48("2653") ? false : stryMutAct_9fa48("2652") ? true : stryMutAct_9fa48("2651") ? name : (stryCov_9fa48("2651", "2652", "2653"), !name)) return stryMutAct_9fa48("2654") ? "" : (stryCov_9fa48("2654"), '??');
        return stryMutAct_9fa48("2656") ? name.split(' ').map(n => n[0]).join('').toUpperCase() : stryMutAct_9fa48("2655") ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toLowerCase() : (stryCov_9fa48("2655", "2656"), name.split(stryMutAct_9fa48("2657") ? "" : (stryCov_9fa48("2657"), ' ')).map(stryMutAct_9fa48("2658") ? () => undefined : (stryCov_9fa48("2658"), n => n[0])).join(stryMutAct_9fa48("2659") ? "Stryker was here!" : (stryCov_9fa48("2659"), '')).substring(0, 2).toUpperCase());
      }
    };
    return <DashboardLayout title="Painel do Orientador" subtitle="" breadcrumbs={stryMutAct_9fa48("2660") ? [] : (stryCov_9fa48("2660"), [stryMutAct_9fa48("2661") ? "" : (stryCov_9fa48("2661"), 'EdTech'), stryMutAct_9fa48("2662") ? "" : (stryCov_9fa48("2662"), 'Painel do Orientador')])}>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Projetos Ativos</span>
            <div className={stryMutAct_9fa48("2663") ? `` : (stryCov_9fa48("2663"), `${styles.statIcon} ${styles.purple}`)}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <span className={styles.statValue}>8</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Pendentes de Revisão</span>
            <div className={stryMutAct_9fa48("2664") ? `` : (stryCov_9fa48("2664"), `${styles.statIcon} ${styles.orange}`)}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <span className={styles.statValue}>{documents.length}</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Pesquisadores Orientados</span>
            <div className={stryMutAct_9fa48("2665") ? `` : (stryCov_9fa48("2665"), `${styles.statIcon} ${styles.blue}`)}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <span className={styles.statValue}>14</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Aprovados este mês</span>
            <div className={stryMutAct_9fa48("2666") ? `` : (stryCov_9fa48("2666"), `${styles.statIcon} ${styles.green}`)}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <span className={styles.statValue}>23</span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>
            Submissões Pendentes
            <span className={styles.badgePending}>{documents.length} pendentes</span>
          </div>
          <input type="text" className={styles.searchInput} placeholder="Buscar pesquisador ou arquivo..." />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>PESQUISADOR</th>
              <th>ARQUIVO</th>
              <th>PROJETO</th>
              <th>ENVIADO EM</th>
              <th>PRIORIDADE</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(stryMutAct_9fa48("2667") ? () => undefined : (stryCov_9fa48("2667"), doc => <tr key={doc.id}>
                <td>
                  <div className={styles.researcherCell}>
                    <div className={stryMutAct_9fa48("2668") ? `` : (stryCov_9fa48("2668"), `${styles.avatar} ${styles.purple}`)}>{getInitials(stryMutAct_9fa48("2671") ? doc.author?.name && 'User' : stryMutAct_9fa48("2670") ? false : stryMutAct_9fa48("2669") ? true : (stryCov_9fa48("2669", "2670", "2671"), (stryMutAct_9fa48("2672") ? doc.author.name : (stryCov_9fa48("2672"), doc.author?.name)) || (stryMutAct_9fa48("2673") ? "" : (stryCov_9fa48("2673"), 'User'))))}</div>
                    <div className={styles.researcherInfo}>
                      <span className={styles.researcherName}>{stryMutAct_9fa48("2676") ? doc.author?.name && 'Dr. Pesquisador' : stryMutAct_9fa48("2675") ? false : stryMutAct_9fa48("2674") ? true : (stryCov_9fa48("2674", "2675", "2676"), (stryMutAct_9fa48("2677") ? doc.author.name : (stryCov_9fa48("2677"), doc.author?.name)) || (stryMutAct_9fa48("2678") ? "" : (stryCov_9fa48("2678"), 'Dr. Pesquisador')))}</span>
                      <span className={styles.researcherEmail}>{stryMutAct_9fa48("2681") ? doc.author?.email && 'email@usp.br' : stryMutAct_9fa48("2680") ? false : stryMutAct_9fa48("2679") ? true : (stryCov_9fa48("2679", "2680", "2681"), (stryMutAct_9fa48("2682") ? doc.author.email : (stryCov_9fa48("2682"), doc.author?.email)) || (stryMutAct_9fa48("2683") ? "" : (stryCov_9fa48("2683"), 'email@usp.br')))}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.fileCell}>
                    <div className={styles.fileIcon}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className={styles.fileInfo}>
                      <span className={styles.fileName}>{doc.title}</span>
                      <span className={styles.fileSize}>{formatSize(doc.fileUrl)}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.projectCell}>Análise LGPD</td>
                <td className={styles.dateCell}>{new Date(doc.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={stryMutAct_9fa48("2684") ? `` : (stryCov_9fa48("2684"), `${styles.priorityBadge} ${styles.alta}`)}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Alta
                  </span>
                </td>
                <td>
                  <div className={styles.actionsCell}>
                    <button className={styles.btnAnalisar} onClick={stryMutAct_9fa48("2685") ? () => undefined : (stryCov_9fa48("2685"), () => handleAnalyze(doc))}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Analisar
                    </button>
                    <button className={stryMutAct_9fa48("2686") ? `` : (stryCov_9fa48("2686"), `${styles.btnAction} ${styles.btnApprove}`)} onClick={() => {
                    if (stryMutAct_9fa48("2687")) {
                      {}
                    } else {
                      stryCov_9fa48("2687");
                      handleApprove(doc);
                    }
                  }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button className={stryMutAct_9fa48("2688") ? `` : (stryCov_9fa48("2688"), `${styles.btnAction} ${styles.btnReject}`)} onClick={stryMutAct_9fa48("2689") ? () => undefined : (stryCov_9fa48("2689"), () => openRejectionModal(doc))}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>))}
            {stryMutAct_9fa48("2692") ? documents.length === 0 || <tr>
                <td colSpan={6} style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#64748B'
              }}>
                  Nenhuma submissão pendente no momento.
                </td>
              </tr> : stryMutAct_9fa48("2691") ? false : stryMutAct_9fa48("2690") ? true : (stryCov_9fa48("2690", "2691", "2692"), (stryMutAct_9fa48("2694") ? documents.length !== 0 : stryMutAct_9fa48("2693") ? true : (stryCov_9fa48("2693", "2694"), documents.length === 0)) && <tr>
                <td colSpan={6} style={stryMutAct_9fa48("2695") ? {} : (stryCov_9fa48("2695"), {
                textAlign: stryMutAct_9fa48("2696") ? "" : (stryCov_9fa48("2696"), 'center'),
                padding: stryMutAct_9fa48("2697") ? "" : (stryCov_9fa48("2697"), '2rem'),
                color: stryMutAct_9fa48("2698") ? "" : (stryCov_9fa48("2698"), '#64748B')
              })}>
                  Nenhuma submissão pendente no momento.
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>

      {/* Analysis Modal */}
      {stryMutAct_9fa48("2701") ? showAnalysisModal && selectedDoc || <div className={styles.modalOverlay}>
          <div className={`${styles.modalContent} ${styles.large}`}>
            <div className={styles.modalHeader}>
              <div className={styles.fileIcon} style={{
              width: '48px',
              height: '48px'
            }}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div style={{
              flex: 1
            }}>
                <h3 className={styles.modalTitle}>{selectedDoc.title}</h3>
                <div className={styles.modalSubtitle}>
                  {selectedDoc.author?.name || 'Dr. Renata Silva'} • Análise LGPD • 2.4 MB • enviado Hoje
                </div>
              </div>
              <button className={styles.modalClose} onClick={() => setShowAnalysisModal(false)}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className={styles.documentPreview} style={{
            padding: '0',
            height: '60vh',
            background: '#e2e8f0',
            display: 'flex',
            flexDirection: 'column'
          }}>
              {previewUrl ? selectedDoc.type === 'CSV' || selectedDoc.type === 'JSON' ? <DatasetPreview url={previewUrl} type={selectedDoc.type} /> : <object data={previewUrl} type="application/pdf" width="100%" height="100%" style={{
              border: 'none',
              flex: 1
            }}>
                    <div style={{
                padding: '2rem',
                textAlign: 'center'
              }}>
                      Seu navegador não suporta a visualização nativa de PDFs. <br /><br />
                      <a href={previewUrl} target="_blank" rel="noopener noreferrer" style={{
                  color: 'var(--ed-purple)'
                }}>Clique aqui para baixar</a>
                    </div>
                  </object> : <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
                  Carregando visualização do documento...
                </div>}
            </div>

            <div className={styles.modalFooter}>
              <span className={styles.modalFooterText}>Revise o conteúdo antes de decidir.</span>
              <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
                <button className={styles.btnRejectOutline} onClick={() => openRejectionModal(selectedDoc)}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{
                  display: 'inline',
                  marginRight: '0.25rem',
                  verticalAlign: 'text-top'
                }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Rejeitar
                </button>
                <button className={styles.btnConfirmApprove} onClick={handleApprove}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{
                  display: 'inline',
                  marginRight: '0.25rem',
                  verticalAlign: 'text-top'
                }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Aprovar documento
                </button>
              </div>
            </div>
          </div>
        </div> : stryMutAct_9fa48("2700") ? false : stryMutAct_9fa48("2699") ? true : (stryCov_9fa48("2699", "2700", "2701"), (stryMutAct_9fa48("2703") ? showAnalysisModal || selectedDoc : stryMutAct_9fa48("2702") ? true : (stryCov_9fa48("2702", "2703"), showAnalysisModal && selectedDoc)) && <div className={styles.modalOverlay}>
          <div className={stryMutAct_9fa48("2704") ? `` : (stryCov_9fa48("2704"), `${styles.modalContent} ${styles.large}`)}>
            <div className={styles.modalHeader}>
              <div className={styles.fileIcon} style={stryMutAct_9fa48("2705") ? {} : (stryCov_9fa48("2705"), {
              width: stryMutAct_9fa48("2706") ? "" : (stryCov_9fa48("2706"), '48px'),
              height: stryMutAct_9fa48("2707") ? "" : (stryCov_9fa48("2707"), '48px')
            })}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div style={stryMutAct_9fa48("2708") ? {} : (stryCov_9fa48("2708"), {
              flex: 1
            })}>
                <h3 className={styles.modalTitle}>{selectedDoc.title}</h3>
                <div className={styles.modalSubtitle}>
                  {stryMutAct_9fa48("2711") ? selectedDoc.author?.name && 'Dr. Renata Silva' : stryMutAct_9fa48("2710") ? false : stryMutAct_9fa48("2709") ? true : (stryCov_9fa48("2709", "2710", "2711"), (stryMutAct_9fa48("2712") ? selectedDoc.author.name : (stryCov_9fa48("2712"), selectedDoc.author?.name)) || (stryMutAct_9fa48("2713") ? "" : (stryCov_9fa48("2713"), 'Dr. Renata Silva')))} • Análise LGPD • 2.4 MB • enviado Hoje
                </div>
              </div>
              <button className={styles.modalClose} onClick={stryMutAct_9fa48("2714") ? () => undefined : (stryCov_9fa48("2714"), () => setShowAnalysisModal(stryMutAct_9fa48("2715") ? true : (stryCov_9fa48("2715"), false)))}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className={styles.documentPreview} style={stryMutAct_9fa48("2716") ? {} : (stryCov_9fa48("2716"), {
            padding: stryMutAct_9fa48("2717") ? "" : (stryCov_9fa48("2717"), '0'),
            height: stryMutAct_9fa48("2718") ? "" : (stryCov_9fa48("2718"), '60vh'),
            background: stryMutAct_9fa48("2719") ? "" : (stryCov_9fa48("2719"), '#e2e8f0'),
            display: stryMutAct_9fa48("2720") ? "" : (stryCov_9fa48("2720"), 'flex'),
            flexDirection: stryMutAct_9fa48("2721") ? "" : (stryCov_9fa48("2721"), 'column')
          })}>
              {previewUrl ? (stryMutAct_9fa48("2724") ? selectedDoc.type === 'CSV' && selectedDoc.type === 'JSON' : stryMutAct_9fa48("2723") ? false : stryMutAct_9fa48("2722") ? true : (stryCov_9fa48("2722", "2723", "2724"), (stryMutAct_9fa48("2726") ? selectedDoc.type !== 'CSV' : stryMutAct_9fa48("2725") ? false : (stryCov_9fa48("2725", "2726"), selectedDoc.type === (stryMutAct_9fa48("2727") ? "" : (stryCov_9fa48("2727"), 'CSV')))) || (stryMutAct_9fa48("2729") ? selectedDoc.type !== 'JSON' : stryMutAct_9fa48("2728") ? false : (stryCov_9fa48("2728", "2729"), selectedDoc.type === (stryMutAct_9fa48("2730") ? "" : (stryCov_9fa48("2730"), 'JSON')))))) ? <DatasetPreview url={previewUrl} type={selectedDoc.type} /> : <object data={previewUrl} type="application/pdf" width="100%" height="100%" style={stryMutAct_9fa48("2731") ? {} : (stryCov_9fa48("2731"), {
              border: stryMutAct_9fa48("2732") ? "" : (stryCov_9fa48("2732"), 'none'),
              flex: 1
            })}>
                    <div style={stryMutAct_9fa48("2733") ? {} : (stryCov_9fa48("2733"), {
                padding: stryMutAct_9fa48("2734") ? "" : (stryCov_9fa48("2734"), '2rem'),
                textAlign: stryMutAct_9fa48("2735") ? "" : (stryCov_9fa48("2735"), 'center')
              })}>
                      Seu navegador não suporta a visualização nativa de PDFs. <br /><br />
                      <a href={previewUrl} target="_blank" rel="noopener noreferrer" style={stryMutAct_9fa48("2736") ? {} : (stryCov_9fa48("2736"), {
                  color: stryMutAct_9fa48("2737") ? "" : (stryCov_9fa48("2737"), 'var(--ed-purple)')
                })}>Clique aqui para baixar</a>
                    </div>
                  </object> : <div style={stryMutAct_9fa48("2738") ? {} : (stryCov_9fa48("2738"), {
              padding: stryMutAct_9fa48("2739") ? "" : (stryCov_9fa48("2739"), '2rem'),
              textAlign: stryMutAct_9fa48("2740") ? "" : (stryCov_9fa48("2740"), 'center'),
              color: stryMutAct_9fa48("2741") ? "" : (stryCov_9fa48("2741"), '#64748B'),
              display: stryMutAct_9fa48("2742") ? "" : (stryCov_9fa48("2742"), 'flex'),
              alignItems: stryMutAct_9fa48("2743") ? "" : (stryCov_9fa48("2743"), 'center'),
              justifyContent: stryMutAct_9fa48("2744") ? "" : (stryCov_9fa48("2744"), 'center'),
              height: stryMutAct_9fa48("2745") ? "" : (stryCov_9fa48("2745"), '100%')
            })}>
                  Carregando visualização do documento...
                </div>}
            </div>

            <div className={styles.modalFooter}>
              <span className={styles.modalFooterText}>Revise o conteúdo antes de decidir.</span>
              <div style={stryMutAct_9fa48("2746") ? {} : (stryCov_9fa48("2746"), {
              display: stryMutAct_9fa48("2747") ? "" : (stryCov_9fa48("2747"), 'flex'),
              gap: stryMutAct_9fa48("2748") ? "" : (stryCov_9fa48("2748"), '1rem')
            })}>
                <button className={styles.btnRejectOutline} onClick={stryMutAct_9fa48("2749") ? () => undefined : (stryCov_9fa48("2749"), () => openRejectionModal(selectedDoc))}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={stryMutAct_9fa48("2750") ? {} : (stryCov_9fa48("2750"), {
                  display: stryMutAct_9fa48("2751") ? "" : (stryCov_9fa48("2751"), 'inline'),
                  marginRight: stryMutAct_9fa48("2752") ? "" : (stryCov_9fa48("2752"), '0.25rem'),
                  verticalAlign: stryMutAct_9fa48("2753") ? "" : (stryCov_9fa48("2753"), 'text-top')
                })}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Rejeitar
                </button>
                <button className={styles.btnConfirmApprove} onClick={handleApprove}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={stryMutAct_9fa48("2754") ? {} : (stryCov_9fa48("2754"), {
                  display: stryMutAct_9fa48("2755") ? "" : (stryCov_9fa48("2755"), 'inline'),
                  marginRight: stryMutAct_9fa48("2756") ? "" : (stryCov_9fa48("2756"), '0.25rem'),
                  verticalAlign: stryMutAct_9fa48("2757") ? "" : (stryCov_9fa48("2757"), 'text-top')
                })}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Aprovar documento
                </button>
              </div>
            </div>
          </div>
        </div>)}

      {/* Rejection Modal */}
      {stryMutAct_9fa48("2760") ? showRejectionModal && selectedDoc || <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={`${styles.modalIcon} ${styles.reject}`}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className={styles.modalTitle}>Rejeitar Submissão</h3>
                <div className={styles.modalSubtitle}>{selectedDoc.title}</div>
              </div>
            </div>
            
            <textarea className={styles.textarea} placeholder="Descreva os ajustes necessários ao pesquisador..." value={rejectionFeedback} onChange={e => setRejectionFeedback(e.target.value)} />
            
            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setShowRejectionModal(false)}>
                Cancelar
              </button>
              <button className={styles.btnConfirmReject} onClick={handleReject}>
                Confirmar Rejeição
              </button>
            </div>
          </div>
        </div> : stryMutAct_9fa48("2759") ? false : stryMutAct_9fa48("2758") ? true : (stryCov_9fa48("2758", "2759", "2760"), (stryMutAct_9fa48("2762") ? showRejectionModal || selectedDoc : stryMutAct_9fa48("2761") ? true : (stryCov_9fa48("2761", "2762"), showRejectionModal && selectedDoc)) && <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={stryMutAct_9fa48("2763") ? `` : (stryCov_9fa48("2763"), `${styles.modalIcon} ${styles.reject}`)}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className={styles.modalTitle}>Rejeitar Submissão</h3>
                <div className={styles.modalSubtitle}>{selectedDoc.title}</div>
              </div>
            </div>
            
            <textarea className={styles.textarea} placeholder="Descreva os ajustes necessários ao pesquisador..." value={rejectionFeedback} onChange={stryMutAct_9fa48("2764") ? () => undefined : (stryCov_9fa48("2764"), e => setRejectionFeedback(e.target.value))} />
            
            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={stryMutAct_9fa48("2765") ? () => undefined : (stryCov_9fa48("2765"), () => setShowRejectionModal(stryMutAct_9fa48("2766") ? true : (stryCov_9fa48("2766"), false)))}>
                Cancelar
              </button>
              <button className={styles.btnConfirmReject} onClick={handleReject}>
                Confirmar Rejeição
              </button>
            </div>
          </div>
        </div>)}
    </DashboardLayout>;
  }
}