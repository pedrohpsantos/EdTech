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
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/authContext';
import '../assets/trail.css';
const ResearchTrail: React.FC = () => {
  if (stryMutAct_9fa48("2766")) {
    {}
  } else {
    stryCov_9fa48("2766");
    const {
      user
    } = useAuth();
    // For demo purposes, we'll use local state to switch between "list mode" and "detail mode"
    const [selectedDocId, setSelectedDocId] = useState<string>(stryMutAct_9fa48("2767") ? "" : (stryCov_9fa48("2767"), '1'));
    const advisorDocuments = stryMutAct_9fa48("2768") ? [] : (stryCov_9fa48("2768"), [stryMutAct_9fa48("2769") ? {} : (stryCov_9fa48("2769"), {
      id: stryMutAct_9fa48("2770") ? "" : (stryCov_9fa48("2770"), '1'),
      title: stryMutAct_9fa48("2771") ? "" : (stryCov_9fa48("2771"), 'Metodologia_Qualitativa_v3.pdf'),
      project: stryMutAct_9fa48("2772") ? "" : (stryCov_9fa48("2772"), 'R. Silva - Análise LGPD'),
      status: stryMutAct_9fa48("2773") ? "" : (stryCov_9fa48("2773"), 'Aprovado'),
      type: stryMutAct_9fa48("2774") ? "" : (stryCov_9fa48("2774"), 'pdf')
    }), stryMutAct_9fa48("2775") ? {} : (stryCov_9fa48("2775"), {
      id: stryMutAct_9fa48("2776") ? "" : (stryCov_9fa48("2776"), '2'),
      title: stryMutAct_9fa48("2777") ? "" : (stryCov_9fa48("2777"), 'Resultados_Parciais_Q2.pdf'),
      project: stryMutAct_9fa48("2778") ? "" : (stryCov_9fa48("2778"), 'J. Mendes - Bioinformática'),
      status: stryMutAct_9fa48("2779") ? "" : (stryCov_9fa48("2779"), 'Em revisão'),
      type: stryMutAct_9fa48("2780") ? "" : (stryCov_9fa48("2780"), 'pdf')
    }), stryMutAct_9fa48("2781") ? {} : (stryCov_9fa48("2781"), {
      id: stryMutAct_9fa48("2782") ? "" : (stryCov_9fa48("2782"), '3'),
      title: stryMutAct_9fa48("2783") ? "" : (stryCov_9fa48("2783"), 'analise_estatistica_q2.json'),
      project: stryMutAct_9fa48("2784") ? "" : (stryCov_9fa48("2784"), 'A. Costa - Sistemas de IA'),
      status: stryMutAct_9fa48("2785") ? "" : (stryCov_9fa48("2785"), 'Submetido'),
      type: stryMutAct_9fa48("2786") ? "" : (stryCov_9fa48("2786"), 'csv') // using csv style for json
    }), stryMutAct_9fa48("2787") ? {} : (stryCov_9fa48("2787"), {
      id: stryMutAct_9fa48("2788") ? "" : (stryCov_9fa48("2788"), '4'),
      title: stryMutAct_9fa48("2789") ? "" : (stryCov_9fa48("2789"), 'Dataset_Experimento_B.csv'),
      project: stryMutAct_9fa48("2790") ? "" : (stryCov_9fa48("2790"), 'J. Ferreira - Análise LGPD'),
      status: stryMutAct_9fa48("2791") ? "" : (stryCov_9fa48("2791"), 'Rascunho'),
      type: stryMutAct_9fa48("2792") ? "" : (stryCov_9fa48("2792"), 'csv')
    })]);
    const researcherDocuments = stryMutAct_9fa48("2793") ? [] : (stryCov_9fa48("2793"), [stryMutAct_9fa48("2794") ? {} : (stryCov_9fa48("2794"), {
      id: stryMutAct_9fa48("2795") ? "" : (stryCov_9fa48("2795"), '1'),
      title: stryMutAct_9fa48("2796") ? "" : (stryCov_9fa48("2796"), 'Referencial_Teorico_Final.pdf'),
      project: stryMutAct_9fa48("2797") ? "" : (stryCov_9fa48("2797"), 'Projeto - Análise LGPD'),
      status: stryMutAct_9fa48("2798") ? "" : (stryCov_9fa48("2798"), 'Aprovado'),
      type: stryMutAct_9fa48("2799") ? "" : (stryCov_9fa48("2799"), 'pdf')
    }), stryMutAct_9fa48("2800") ? {} : (stryCov_9fa48("2800"), {
      id: stryMutAct_9fa48("2801") ? "" : (stryCov_9fa48("2801"), '4'),
      title: stryMutAct_9fa48("2802") ? "" : (stryCov_9fa48("2802"), 'Dataset_Experimento_B.csv'),
      project: stryMutAct_9fa48("2803") ? "" : (stryCov_9fa48("2803"), 'Projeto - Análise LGPD'),
      status: stryMutAct_9fa48("2804") ? "" : (stryCov_9fa48("2804"), 'Rascunho'),
      type: stryMutAct_9fa48("2805") ? "" : (stryCov_9fa48("2805"), 'csv')
    })]);
    const documents = (stryMutAct_9fa48("2808") ? user?.role !== 'RESEARCHER' : stryMutAct_9fa48("2807") ? false : stryMutAct_9fa48("2806") ? true : (stryCov_9fa48("2806", "2807", "2808"), (stryMutAct_9fa48("2809") ? user.role : (stryCov_9fa48("2809"), user?.role)) === (stryMutAct_9fa48("2810") ? "" : (stryCov_9fa48("2810"), 'RESEARCHER')))) ? researcherDocuments : advisorDocuments;
    const getStatusBadgeClass = (status: string) => {
      if (stryMutAct_9fa48("2811")) {
        {}
      } else {
        stryCov_9fa48("2811");
        switch (status) {
          case stryMutAct_9fa48("2813") ? "" : (stryCov_9fa48("2813"), 'Aprovado'):
            if (stryMutAct_9fa48("2812")) {} else {
              stryCov_9fa48("2812");
              return stryMutAct_9fa48("2814") ? "" : (stryCov_9fa48("2814"), 'status-approved');
            }
          case stryMutAct_9fa48("2816") ? "" : (stryCov_9fa48("2816"), 'Em revisão'):
            if (stryMutAct_9fa48("2815")) {} else {
              stryCov_9fa48("2815");
              return stryMutAct_9fa48("2817") ? "" : (stryCov_9fa48("2817"), 'status-review');
            }
          case stryMutAct_9fa48("2819") ? "" : (stryCov_9fa48("2819"), 'Submetido'):
            if (stryMutAct_9fa48("2818")) {} else {
              stryCov_9fa48("2818");
              return stryMutAct_9fa48("2820") ? "" : (stryCov_9fa48("2820"), 'status-submitted');
            }
          default:
            if (stryMutAct_9fa48("2821")) {} else {
              stryCov_9fa48("2821");
              return stryMutAct_9fa48("2822") ? "" : (stryCov_9fa48("2822"), 'status-draft');
            }
        }
      }
    };
    return <DashboardLayout title="Trilha de Pesquisa" subtitle="Histórico imutável de decisões, versões e evidências auditáveis" breadcrumbs={stryMutAct_9fa48("2823") ? [] : (stryCov_9fa48("2823"), [stryMutAct_9fa48("2824") ? "" : (stryCov_9fa48("2824"), 'EdTech'), stryMutAct_9fa48("2825") ? "" : (stryCov_9fa48("2825"), 'Trilha de Pesquisa')])} customTopbarElement={<div className="trail-topbar-badge">
          <i className="bi bi-shield-check"></i> Trilha assinada
        </div>}>
      {/* List Section */}
      <div className="trail-doc-list">
        <div className="trail-doc-list-header">
          <div className="trail-doc-list-icon">
            <i className="bi bi-person-badge"></i>
          </div>
          <div className="trail-doc-list-title">
            {(stryMutAct_9fa48("2828") ? user?.role !== 'RESEARCHER' : stryMutAct_9fa48("2827") ? false : stryMutAct_9fa48("2826") ? true : (stryCov_9fa48("2826", "2827", "2828"), (stryMutAct_9fa48("2829") ? user.role : (stryCov_9fa48("2829"), user?.role)) === (stryMutAct_9fa48("2830") ? "" : (stryCov_9fa48("2830"), 'RESEARCHER')))) ? <>
                <h3>Meus Documentos</h3>
                <p>Trilha das suas submissões e evidências</p>
              </> : <>
                <h3>Documentos dos orientandos</h3>
                <p>Trilha dos documentos sob sua orientação</p>
              </>}
          </div>
        </div>

        <div>
          {documents.map(stryMutAct_9fa48("2831") ? () => undefined : (stryCov_9fa48("2831"), doc => <div key={doc.id} className={stryMutAct_9fa48("2832") ? `` : (stryCov_9fa48("2832"), `trail-doc-item ${(stryMutAct_9fa48("2835") ? selectedDocId !== doc.id : stryMutAct_9fa48("2834") ? false : stryMutAct_9fa48("2833") ? true : (stryCov_9fa48("2833", "2834", "2835"), selectedDocId === doc.id)) ? stryMutAct_9fa48("2836") ? "" : (stryCov_9fa48("2836"), 'active') : stryMutAct_9fa48("2837") ? "Stryker was here!" : (stryCov_9fa48("2837"), '')}`)} onClick={stryMutAct_9fa48("2838") ? () => undefined : (stryCov_9fa48("2838"), () => setSelectedDocId(doc.id))}>
              <div className="trail-doc-info">
                <div className={stryMutAct_9fa48("2839") ? `` : (stryCov_9fa48("2839"), `trail-file-icon ${(stryMutAct_9fa48("2840") ? doc.title.startsWith('.pdf') : (stryCov_9fa48("2840"), doc.title.endsWith(stryMutAct_9fa48("2841") ? "" : (stryCov_9fa48("2841"), '.pdf')))) ? stryMutAct_9fa48("2842") ? "" : (stryCov_9fa48("2842"), 'type-pdf-bg type-pdf-text') : stryMutAct_9fa48("2843") ? "" : (stryCov_9fa48("2843"), 'type-csv-bg type-csv-text')}`)}>
                  <i className="bi bi-file-earmark-text"></i>
                </div>
                <div>
                  <span className="trail-doc-name">{doc.title}</span>
                  <span className="trail-doc-project">{doc.project}</span>
                </div>
              </div>
              <div>
                <span className={stryMutAct_9fa48("2844") ? `` : (stryCov_9fa48("2844"), `doc-status ${getStatusBadgeClass(doc.status)}`)}>
                  {doc.status}
                </span>
              </div>
            </div>))}
        </div>
      </div>

      {/* Details Section for Document 1 (Mocked as per screenshot) */}
      {stryMutAct_9fa48("2847") ? selectedDocId === '1' || <div className="trail-details-section">
          <div className="trail-details-banner">
            <div className="trail-doc-info">
              <div className="trail-file-icon type-pdf-bg type-pdf-text">
                <i className="bi bi-file-earmark-text"></i>
              </div>
              <div>
                <span className="trail-doc-name" style={{
                fontSize: '16px'
              }}>
                  {user?.role === 'RESEARCHER' ? 'Referencial_Teorico_Final.pdf' : 'Metodologia_Qualitativa_v3.pdf'}
                </span>
                <span className="trail-doc-project">
                  {user?.role === 'RESEARCHER' ? 'Seu projeto - Análise LGPD - 7 eventos · 4 versões' : 'Dra. Renata Silva - Análise LGPD - 7 eventos · 4 versões'}
                </span>
              </div>
            </div>
            <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
              <span className="doc-status status-approved">
                <i className="bi bi-check-circle me-1"></i> Aprovado
              </span>
              <button className="btn-export-trail">
                <i className="bi bi-download"></i> Exportar trilha (PDF)
              </button>
            </div>
          </div>

          <div className="trail-content-grid">
            {/* Timeline */}
            <div className="timeline-card">
              <div className="timeline-header">
                <h3 className="timeline-title">Timeline de decisões</h3>
                <p className="timeline-subtitle">Ordenado do mais recente ao mais antigo</p>
              </div>

              <div className="timeline-container">
                {/* Event 1 */}
                <div className="timeline-event">
                  <div className="timeline-icon success">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Documento aprovado</span>
                      <span className="timeline-event-meta">
                        Prof. Dr. Faria · Hoje · 14:32 ·{' '}
                        <span className="timeline-event-hash">#a34fe9d</span>
                      </span>
                    </div>
                    <div className="timeline-version-tag">
                      <i className="bi bi-diagram-3 me-1"></i> v4
                    </div>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="timeline-event">
                  <div className="timeline-icon success">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Verificação LGPD aprovada</span>
                      <span className="timeline-event-meta">
                        Sistema · Hoje · 14:10 ·{' '}
                        <span className="timeline-event-hash">#7c4dff1</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="timeline-event">
                  <div className="timeline-icon info">
                    <i className="bi bi-dash-circle"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Nova versão criada</span>
                      <span className="timeline-event-meta">
                        Dra. Renata Silva · Hoje · 11:48 ·{' '}
                        <span className="timeline-event-hash">#6a1b9a2</span>
                      </span>
                    </div>
                    <div className="timeline-version-tag">
                      <i className="bi bi-diagram-3 me-1"></i> v4
                    </div>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="timeline-event">
                  <div className="timeline-icon warning">
                    <i className="bi bi-chat-left-text"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Comentário do orientador</span>
                      <span className="timeline-event-meta">
                        Prof. Dr. Faria · Ontem · 16:20 ·{' '}
                        <span className="timeline-event-hash">#ff91003</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event 5 */}
                <div className="timeline-event">
                  <div className="timeline-icon danger">
                    <i className="bi bi-exclamation-circle"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Risco de conformidade sinalizado</span>
                      <span className="timeline-event-meta">
                        Verificação automática · Ontem · 09:15 ·{' '}
                        <span className="timeline-event-hash">#c628284</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event 6 */}
                <div className="timeline-event">
                  <div className="timeline-icon info">
                    <i className="bi bi-dash-circle"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Versão inicial submetida</span>
                      <span className="timeline-event-meta">
                        Dra. Renata Silva · 10 Jun · 09:00 ·{' '}
                        <span className="timeline-event-hash">#1565c05</span>
                      </span>
                    </div>
                    <div className="timeline-version-tag">
                      <i className="bi bi-diagram-3 me-1"></i> v3
                    </div>
                  </div>
                </div>

                {/* Event 7 */}
                <div className="timeline-event">
                  <div className="timeline-icon purple">
                    <i className="bi bi-upload"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Documento criado</span>
                      <span className="timeline-event-meta">
                        Dra. Renata Silva · 05 Jun · 10:30 ·{' '}
                        <span className="timeline-event-hash">#4a148c6</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="trail-sidebar">
              <div className="trail-sidebar-card">
                <h3 className="trail-sidebar-title">Versionamento</h3>
                <div className="version-list mt-3">
                  <div className="version-item">
                    <div className="version-info">
                      <span className="version-tag">v4</span>
                      <span className="version-author">Hoje - R. Silva</span>
                    </div>
                    <span className="doc-status status-approved" style={{
                    fontSize: '10px',
                    padding: '2px 8px'
                  }}>
                      Aprovado
                    </span>
                  </div>
                  <div className="version-item">
                    <div className="version-info">
                      <span className="version-tag" style={{
                      color: 'var(--ed-text-muted)'
                    }}>
                        v3
                      </span>
                      <span className="version-author">10 Jun - R. Silva</span>
                    </div>
                    <span className="doc-status status-draft" style={{
                    fontSize: '10px',
                    padding: '2px 8px'
                  }}>
                      Substituído
                    </span>
                  </div>
                  <div className="version-item">
                    <div className="version-info">
                      <span className="version-tag" style={{
                      color: 'var(--ed-text-muted)'
                    }}>
                        v2
                      </span>
                      <span className="version-author">01 Jun - R. Silva</span>
                    </div>
                    <span className="doc-status status-draft" style={{
                    fontSize: '10px',
                    padding: '2px 8px'
                  }}>
                      Substituído
                    </span>
                  </div>
                  <div className="version-item">
                    <div className="version-info">
                      <span className="version-tag" style={{
                      color: 'var(--ed-text-muted)'
                    }}>
                        v1
                      </span>
                      <span className="version-author">20 Mai - R. Silva</span>
                    </div>
                    <span className="doc-status status-draft" style={{
                    fontSize: '10px',
                    padding: '2px 8px'
                  }}>
                      Substituído
                    </span>
                  </div>
                </div>
                <button className="btn-compare-versions">
                  <i className="bi bi-arrow-down-up"></i> Comparar versões
                </button>
              </div>

              <div className="trail-sidebar-card">
                <h3 className="trail-sidebar-title">Integridade</h3>
                <p className="trail-sidebar-subtitle">Cadeia de custódia</p>

                <table className="integrity-table">
                  <tbody>
                    <tr>
                      <td className="integrity-label">Hash raiz</td>
                      <td className="integrity-value integrity-hash">a34fe9d...3b1</td>
                    </tr>
                    <tr>
                      <td className="integrity-label">Assinatura</td>
                      <td className="integrity-value text-success">Válida</td>
                    </tr>
                    <tr>
                      <td className="integrity-label">Eventos imutáveis</td>
                      <td className="integrity-value text-success">7 / 7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> : stryMutAct_9fa48("2846") ? false : stryMutAct_9fa48("2845") ? true : (stryCov_9fa48("2845", "2846", "2847"), (stryMutAct_9fa48("2849") ? selectedDocId !== '1' : stryMutAct_9fa48("2848") ? true : (stryCov_9fa48("2848", "2849"), selectedDocId === (stryMutAct_9fa48("2850") ? "" : (stryCov_9fa48("2850"), '1')))) && <div className="trail-details-section">
          <div className="trail-details-banner">
            <div className="trail-doc-info">
              <div className="trail-file-icon type-pdf-bg type-pdf-text">
                <i className="bi bi-file-earmark-text"></i>
              </div>
              <div>
                <span className="trail-doc-name" style={stryMutAct_9fa48("2851") ? {} : (stryCov_9fa48("2851"), {
                fontSize: stryMutAct_9fa48("2852") ? "" : (stryCov_9fa48("2852"), '16px')
              })}>
                  {(stryMutAct_9fa48("2855") ? user?.role !== 'RESEARCHER' : stryMutAct_9fa48("2854") ? false : stryMutAct_9fa48("2853") ? true : (stryCov_9fa48("2853", "2854", "2855"), (stryMutAct_9fa48("2856") ? user.role : (stryCov_9fa48("2856"), user?.role)) === (stryMutAct_9fa48("2857") ? "" : (stryCov_9fa48("2857"), 'RESEARCHER')))) ? stryMutAct_9fa48("2858") ? "" : (stryCov_9fa48("2858"), 'Referencial_Teorico_Final.pdf') : stryMutAct_9fa48("2859") ? "" : (stryCov_9fa48("2859"), 'Metodologia_Qualitativa_v3.pdf')}
                </span>
                <span className="trail-doc-project">
                  {(stryMutAct_9fa48("2862") ? user?.role !== 'RESEARCHER' : stryMutAct_9fa48("2861") ? false : stryMutAct_9fa48("2860") ? true : (stryCov_9fa48("2860", "2861", "2862"), (stryMutAct_9fa48("2863") ? user.role : (stryCov_9fa48("2863"), user?.role)) === (stryMutAct_9fa48("2864") ? "" : (stryCov_9fa48("2864"), 'RESEARCHER')))) ? stryMutAct_9fa48("2865") ? "" : (stryCov_9fa48("2865"), 'Seu projeto - Análise LGPD - 7 eventos · 4 versões') : stryMutAct_9fa48("2866") ? "" : (stryCov_9fa48("2866"), 'Dra. Renata Silva - Análise LGPD - 7 eventos · 4 versões')}
                </span>
              </div>
            </div>
            <div style={stryMutAct_9fa48("2867") ? {} : (stryCov_9fa48("2867"), {
            display: stryMutAct_9fa48("2868") ? "" : (stryCov_9fa48("2868"), 'flex'),
            alignItems: stryMutAct_9fa48("2869") ? "" : (stryCov_9fa48("2869"), 'center'),
            gap: stryMutAct_9fa48("2870") ? "" : (stryCov_9fa48("2870"), '16px')
          })}>
              <span className="doc-status status-approved">
                <i className="bi bi-check-circle me-1"></i> Aprovado
              </span>
              <button className="btn-export-trail">
                <i className="bi bi-download"></i> Exportar trilha (PDF)
              </button>
            </div>
          </div>

          <div className="trail-content-grid">
            {/* Timeline */}
            <div className="timeline-card">
              <div className="timeline-header">
                <h3 className="timeline-title">Timeline de decisões</h3>
                <p className="timeline-subtitle">Ordenado do mais recente ao mais antigo</p>
              </div>

              <div className="timeline-container">
                {/* Event 1 */}
                <div className="timeline-event">
                  <div className="timeline-icon success">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Documento aprovado</span>
                      <span className="timeline-event-meta">
                        Prof. Dr. Faria · Hoje · 14:32 ·{stryMutAct_9fa48("2871") ? "" : (stryCov_9fa48("2871"), ' ')}
                        <span className="timeline-event-hash">#a34fe9d</span>
                      </span>
                    </div>
                    <div className="timeline-version-tag">
                      <i className="bi bi-diagram-3 me-1"></i> v4
                    </div>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="timeline-event">
                  <div className="timeline-icon success">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Verificação LGPD aprovada</span>
                      <span className="timeline-event-meta">
                        Sistema · Hoje · 14:10 ·{stryMutAct_9fa48("2872") ? "" : (stryCov_9fa48("2872"), ' ')}
                        <span className="timeline-event-hash">#7c4dff1</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="timeline-event">
                  <div className="timeline-icon info">
                    <i className="bi bi-dash-circle"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Nova versão criada</span>
                      <span className="timeline-event-meta">
                        Dra. Renata Silva · Hoje · 11:48 ·{stryMutAct_9fa48("2873") ? "" : (stryCov_9fa48("2873"), ' ')}
                        <span className="timeline-event-hash">#6a1b9a2</span>
                      </span>
                    </div>
                    <div className="timeline-version-tag">
                      <i className="bi bi-diagram-3 me-1"></i> v4
                    </div>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="timeline-event">
                  <div className="timeline-icon warning">
                    <i className="bi bi-chat-left-text"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Comentário do orientador</span>
                      <span className="timeline-event-meta">
                        Prof. Dr. Faria · Ontem · 16:20 ·{stryMutAct_9fa48("2874") ? "" : (stryCov_9fa48("2874"), ' ')}
                        <span className="timeline-event-hash">#ff91003</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event 5 */}
                <div className="timeline-event">
                  <div className="timeline-icon danger">
                    <i className="bi bi-exclamation-circle"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Risco de conformidade sinalizado</span>
                      <span className="timeline-event-meta">
                        Verificação automática · Ontem · 09:15 ·{stryMutAct_9fa48("2875") ? "" : (stryCov_9fa48("2875"), ' ')}
                        <span className="timeline-event-hash">#c628284</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event 6 */}
                <div className="timeline-event">
                  <div className="timeline-icon info">
                    <i className="bi bi-dash-circle"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Versão inicial submetida</span>
                      <span className="timeline-event-meta">
                        Dra. Renata Silva · 10 Jun · 09:00 ·{stryMutAct_9fa48("2876") ? "" : (stryCov_9fa48("2876"), ' ')}
                        <span className="timeline-event-hash">#1565c05</span>
                      </span>
                    </div>
                    <div className="timeline-version-tag">
                      <i className="bi bi-diagram-3 me-1"></i> v3
                    </div>
                  </div>
                </div>

                {/* Event 7 */}
                <div className="timeline-event">
                  <div className="timeline-icon purple">
                    <i className="bi bi-upload"></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <span className="timeline-event-title">Documento criado</span>
                      <span className="timeline-event-meta">
                        Dra. Renata Silva · 05 Jun · 10:30 ·{stryMutAct_9fa48("2877") ? "" : (stryCov_9fa48("2877"), ' ')}
                        <span className="timeline-event-hash">#4a148c6</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="trail-sidebar">
              <div className="trail-sidebar-card">
                <h3 className="trail-sidebar-title">Versionamento</h3>
                <div className="version-list mt-3">
                  <div className="version-item">
                    <div className="version-info">
                      <span className="version-tag">v4</span>
                      <span className="version-author">Hoje - R. Silva</span>
                    </div>
                    <span className="doc-status status-approved" style={stryMutAct_9fa48("2878") ? {} : (stryCov_9fa48("2878"), {
                    fontSize: stryMutAct_9fa48("2879") ? "" : (stryCov_9fa48("2879"), '10px'),
                    padding: stryMutAct_9fa48("2880") ? "" : (stryCov_9fa48("2880"), '2px 8px')
                  })}>
                      Aprovado
                    </span>
                  </div>
                  <div className="version-item">
                    <div className="version-info">
                      <span className="version-tag" style={stryMutAct_9fa48("2881") ? {} : (stryCov_9fa48("2881"), {
                      color: stryMutAct_9fa48("2882") ? "" : (stryCov_9fa48("2882"), 'var(--ed-text-muted)')
                    })}>
                        v3
                      </span>
                      <span className="version-author">10 Jun - R. Silva</span>
                    </div>
                    <span className="doc-status status-draft" style={stryMutAct_9fa48("2883") ? {} : (stryCov_9fa48("2883"), {
                    fontSize: stryMutAct_9fa48("2884") ? "" : (stryCov_9fa48("2884"), '10px'),
                    padding: stryMutAct_9fa48("2885") ? "" : (stryCov_9fa48("2885"), '2px 8px')
                  })}>
                      Substituído
                    </span>
                  </div>
                  <div className="version-item">
                    <div className="version-info">
                      <span className="version-tag" style={stryMutAct_9fa48("2886") ? {} : (stryCov_9fa48("2886"), {
                      color: stryMutAct_9fa48("2887") ? "" : (stryCov_9fa48("2887"), 'var(--ed-text-muted)')
                    })}>
                        v2
                      </span>
                      <span className="version-author">01 Jun - R. Silva</span>
                    </div>
                    <span className="doc-status status-draft" style={stryMutAct_9fa48("2888") ? {} : (stryCov_9fa48("2888"), {
                    fontSize: stryMutAct_9fa48("2889") ? "" : (stryCov_9fa48("2889"), '10px'),
                    padding: stryMutAct_9fa48("2890") ? "" : (stryCov_9fa48("2890"), '2px 8px')
                  })}>
                      Substituído
                    </span>
                  </div>
                  <div className="version-item">
                    <div className="version-info">
                      <span className="version-tag" style={stryMutAct_9fa48("2891") ? {} : (stryCov_9fa48("2891"), {
                      color: stryMutAct_9fa48("2892") ? "" : (stryCov_9fa48("2892"), 'var(--ed-text-muted)')
                    })}>
                        v1
                      </span>
                      <span className="version-author">20 Mai - R. Silva</span>
                    </div>
                    <span className="doc-status status-draft" style={stryMutAct_9fa48("2893") ? {} : (stryCov_9fa48("2893"), {
                    fontSize: stryMutAct_9fa48("2894") ? "" : (stryCov_9fa48("2894"), '10px'),
                    padding: stryMutAct_9fa48("2895") ? "" : (stryCov_9fa48("2895"), '2px 8px')
                  })}>
                      Substituído
                    </span>
                  </div>
                </div>
                <button className="btn-compare-versions">
                  <i className="bi bi-arrow-down-up"></i> Comparar versões
                </button>
              </div>

              <div className="trail-sidebar-card">
                <h3 className="trail-sidebar-title">Integridade</h3>
                <p className="trail-sidebar-subtitle">Cadeia de custódia</p>

                <table className="integrity-table">
                  <tbody>
                    <tr>
                      <td className="integrity-label">Hash raiz</td>
                      <td className="integrity-value integrity-hash">a34fe9d...3b1</td>
                    </tr>
                    <tr>
                      <td className="integrity-label">Assinatura</td>
                      <td className="integrity-value text-success">Válida</td>
                    </tr>
                    <tr>
                      <td className="integrity-label">Eventos imutáveis</td>
                      <td className="integrity-value text-success">7 / 7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>)}
    </DashboardLayout>;
  }
};
export default ResearchTrail;