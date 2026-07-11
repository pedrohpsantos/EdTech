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
import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import styles from '../assets/analytics.module.css';
export default function Analytics() {
  if (stryMutAct_9fa48("937")) {
    {}
  } else {
    stryCov_9fa48("937");
    const customTopbar = <div style={stryMutAct_9fa48("938") ? {} : (stryCov_9fa48("938"), {
      display: stryMutAct_9fa48("939") ? "" : (stryCov_9fa48("939"), 'flex'),
      alignItems: stryMutAct_9fa48("940") ? "" : (stryCov_9fa48("940"), 'center'),
      gap: stryMutAct_9fa48("941") ? "" : (stryCov_9fa48("941"), '8px')
    })}>
      <button style={stryMutAct_9fa48("942") ? {} : (stryCov_9fa48("942"), {
        background: stryMutAct_9fa48("943") ? "" : (stryCov_9fa48("943"), 'transparent'),
        border: stryMutAct_9fa48("944") ? "" : (stryCov_9fa48("944"), '1px solid var(--border)'),
        padding: stryMutAct_9fa48("945") ? "" : (stryCov_9fa48("945"), '6px 12px'),
        borderRadius: stryMutAct_9fa48("946") ? "" : (stryCov_9fa48("946"), '8px'),
        fontSize: stryMutAct_9fa48("947") ? "" : (stryCov_9fa48("947"), '13px'),
        color: stryMutAct_9fa48("948") ? "" : (stryCov_9fa48("948"), 'var(--ed-text-dark)'),
        display: stryMutAct_9fa48("949") ? "" : (stryCov_9fa48("949"), 'flex'),
        alignItems: stryMutAct_9fa48("950") ? "" : (stryCov_9fa48("950"), 'center'),
        gap: stryMutAct_9fa48("951") ? "" : (stryCov_9fa48("951"), '8px'),
        cursor: stryMutAct_9fa48("952") ? "" : (stryCov_9fa48("952"), 'pointer')
      })}>
        Últimos 6 meses <i className="bi bi-chevron-down" style={stryMutAct_9fa48("953") ? {} : (stryCov_9fa48("953"), {
          fontSize: stryMutAct_9fa48("954") ? "" : (stryCov_9fa48("954"), '10px')
        })}></i>
      </button>
    </div>;
    return <DashboardLayout title="Análises" subtitle="Métricas de fluxo, produtividade e gargalos do processo de pesquisa" breadcrumbs={stryMutAct_9fa48("955") ? [] : (stryCov_9fa48("955"), [stryMutAct_9fa48("956") ? "" : (stryCov_9fa48("956"), 'EdTech'), stryMutAct_9fa48("957") ? "" : (stryCov_9fa48("957"), 'Análises')])} customTopbarElement={customTopbar}>
      <div className={styles.container}>
        
        {/* KPI Grid */}
        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Tempo médio de aprovação</span>
              <i className="bi bi-clock kpiIcon"></i>
            </div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiValue}>3.1 d</span>
              <span className={stryMutAct_9fa48("958") ? `` : (stryCov_9fa48("958"), `${styles.kpiTrend} ${styles.positive}`)}>-50%</span>
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Taxa de retrabalho</span>
              <i className="bi bi-arrow-repeat kpiIcon" style={stryMutAct_9fa48("959") ? {} : (stryCov_9fa48("959"), {
                color: stryMutAct_9fa48("960") ? "" : (stryCov_9fa48("960"), 'var(--ed-status-success)')
              })}></i>
            </div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiValue}>15%</span>
              <span className={stryMutAct_9fa48("961") ? `` : (stryCov_9fa48("961"), `${styles.kpiTrend} ${styles.positive}`)}>-17 pts</span>
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Pesquisadores ativos</span>
              <i className="bi bi-people kpiIcon" style={stryMutAct_9fa48("962") ? {} : (stryCov_9fa48("962"), {
                color: stryMutAct_9fa48("963") ? "" : (stryCov_9fa48("963"), 'var(--ed-status-info)')
              })}></i>
            </div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiValue}>42</span>
              <span className={stryMutAct_9fa48("964") ? `` : (stryCov_9fa48("964"), `${styles.kpiTrend} ${styles.positive}`)} style={stryMutAct_9fa48("965") ? {} : (stryCov_9fa48("965"), {
                background: stryMutAct_9fa48("966") ? "" : (stryCov_9fa48("966"), 'rgba(59, 130, 246, 0.1)'),
                color: stryMutAct_9fa48("967") ? "" : (stryCov_9fa48("967"), 'var(--ed-status-info)')
              })}>+6</span>
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Gargalo crítico</span>
              <i className="bi bi-exclamation-triangle kpiIcon" style={stryMutAct_9fa48("968") ? {} : (stryCov_9fa48("968"), {
                color: stryMutAct_9fa48("969") ? "" : (stryCov_9fa48("969"), 'var(--ed-orange)')
              })}></i>
            </div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiValue} style={stryMutAct_9fa48("970") ? {} : (stryCov_9fa48("970"), {
                fontSize: stryMutAct_9fa48("971") ? "" : (stryCov_9fa48("971"), '24px')
              })}>Revisão</span>
              <span className={stryMutAct_9fa48("972") ? `` : (stryCov_9fa48("972"), `${styles.kpiTrend} ${styles.warning}`)}>78% carga</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className={styles.chartsGrid}>
          {/* Area Chart: Tempo médio */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div>
                <h3 className={styles.chartTitle}>Tempo médio de aprovação (dias)</h3>
              </div>
              <div className={styles.chartTrend}>
                <i className="bi bi-graph-down-arrow"></i> Melhorando
              </div>
            </div>
            <svg className={styles.svgChart} viewBox="0 0 400 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--ed-purple-main)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--ed-purple-main)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="0" x2="400" y2="0" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="37.5" x2="400" y2="37.5" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="112.5" x2="400" y2="112.5" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Y Axis Labels */}
              <text x="-15" y="5" className={styles.svgAxisText}>8</text>
              <text x="-15" y="42.5" className={styles.svgAxisText}>6</text>
              <text x="-15" y="80" className={styles.svgAxisText}>4</text>
              <text x="-15" y="117.5" className={styles.svgAxisText}>2</text>
              <text x="-15" y="155" className={styles.svgAxisText}>0</text>
              
              {/* X Axis Labels */}
              <text x="0" y="170" className={styles.svgAxisText}>Jan</text>
              <text x="80" y="170" className={styles.svgAxisText}>Fev</text>
              <text x="160" y="170" className={styles.svgAxisText}>Mar</text>
              <text x="240" y="170" className={styles.svgAxisText}>Abr</text>
              <text x="320" y="170" className={styles.svgAxisText}>Mai</text>
              <text x="385" y="170" className={styles.svgAxisText}>Jun</text>

              {/* Area Path */}
              <path d="M 0 30 C 40 45, 80 40, 160 38 C 200 38, 220 70, 240 75 C 300 85, 360 95, 400 100 L 400 150 L 0 150 Z" fill="url(#purpleGradient)" />
              {/* Line Path */}
              <path d="M 0 30 C 40 45, 80 40, 160 38 C 200 38, 220 70, 240 75 C 300 85, 360 95, 400 100" fill="none" stroke="var(--ed-purple-main)" strokeWidth="2" className={styles.animateDraw} />
            </svg>
          </div>

          {/* Line Chart: Taxa de retrabalho */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div>
                <h3 className={styles.chartTitle}>Taxa de retrabalho (%)</h3>
              </div>
              <div className={styles.chartTrend}>
                <i className="bi bi-graph-down-arrow"></i> -17 pts
              </div>
            </div>
            <svg className={styles.svgChart} viewBox="0 0 400 150" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="0" x2="400" y2="0" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="37.5" x2="400" y2="37.5" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="112.5" x2="400" y2="112.5" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Y Axis Labels */}
              <text x="-20" y="5" className={styles.svgAxisText}>32</text>
              <text x="-20" y="42.5" className={styles.svgAxisText}>24</text>
              <text x="-20" y="80" className={styles.svgAxisText}>16</text>
              <text x="-15" y="117.5" className={styles.svgAxisText}>8</text>
              <text x="-15" y="155" className={styles.svgAxisText}>0</text>
              
              {/* X Axis Labels */}
              <text x="0" y="170" className={styles.svgAxisText}>Jan</text>
              <text x="80" y="170" className={styles.svgAxisText}>Fev</text>
              <text x="160" y="170" className={styles.svgAxisText}>Mar</text>
              <text x="240" y="170" className={styles.svgAxisText}>Abr</text>
              <text x="320" y="170" className={styles.svgAxisText}>Mai</text>
              <text x="385" y="170" className={styles.svgAxisText}>Jun</text>

              {/* Line Path */}
              <path d="M 0 10 L 80 30 L 160 20 L 240 70 L 320 90 L 400 110" fill="none" stroke="var(--ed-orange)" strokeWidth="2" className={styles.animateDraw} />
              {/* Dots */}
              <g className={styles.animateDrawDots}>
                <circle cx="0" cy="10" r="4" fill="var(--ed-orange)" />
                <circle cx="80" cy="30" r="4" fill="var(--ed-orange)" />
                <circle cx="160" cy="20" r="4" fill="var(--ed-orange)" />
                <circle cx="240" cy="70" r="4" fill="var(--ed-orange)" />
                <circle cx="320" cy="90" r="4" fill="var(--ed-orange)" />
                <circle cx="400" cy="110" r="4" fill="var(--ed-orange)" />
              </g>
            </svg>
          </div>

          {/* Bar Chart: Produtividade */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div>
                <h3 className={styles.chartTitle}>Produtividade por pesquisador</h3>
                <p className={styles.chartSubtitle}>Documentos aprovados por pesquisador</p>
              </div>
            </div>
            
            <div className={styles.barChartContainer}>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>R. Silva</span>
                <div className={styles.barTrack}>
                  <div className={stryMutAct_9fa48("973") ? `` : (stryCov_9fa48("973"), `${styles.barFill} ${styles.fillPurple}`)} style={stryMutAct_9fa48("974") ? {} : (stryCov_9fa48("974"), {
                    width: stryMutAct_9fa48("975") ? "" : (stryCov_9fa48("975"), '90%')
                  })}></div>
                </div>
              </div>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>J. Mendes</span>
                <div className={styles.barTrack}>
                  <div className={stryMutAct_9fa48("976") ? `` : (stryCov_9fa48("976"), `${styles.barFill} ${styles.fillPurpleLight}`)} style={stryMutAct_9fa48("977") ? {} : (stryCov_9fa48("977"), {
                    width: stryMutAct_9fa48("978") ? "" : (stryCov_9fa48("978"), '70%')
                  })}></div>
                </div>
              </div>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>A. Costa</span>
                <div className={styles.barTrack}>
                  <div className={stryMutAct_9fa48("979") ? `` : (stryCov_9fa48("979"), `${styles.barFill} ${styles.fillPurpleLight}`)} style={stryMutAct_9fa48("980") ? {} : (stryCov_9fa48("980"), {
                    width: stryMutAct_9fa48("981") ? "" : (stryCov_9fa48("981"), '55%')
                  })}></div>
                </div>
              </div>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>L. Rocha</span>
                <div className={styles.barTrack}>
                  <div className={stryMutAct_9fa48("982") ? `` : (stryCov_9fa48("982"), `${styles.barFill} ${styles.fillPurpleLight}`)} style={stryMutAct_9fa48("983") ? {} : (stryCov_9fa48("983"), {
                    width: stryMutAct_9fa48("984") ? "" : (stryCov_9fa48("984"), '45%')
                  })}></div>
                </div>
              </div>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>P. Dias</span>
                <div className={styles.barTrack}>
                  <div className={stryMutAct_9fa48("985") ? `` : (stryCov_9fa48("985"), `${styles.barFill} ${styles.fillPurpleLight}`)} style={stryMutAct_9fa48("986") ? {} : (stryCov_9fa48("986"), {
                    width: stryMutAct_9fa48("987") ? "" : (stryCov_9fa48("987"), '35%')
                  })}></div>
                </div>
              </div>
              
              <div style={stryMutAct_9fa48("988") ? {} : (stryCov_9fa48("988"), {
                display: stryMutAct_9fa48("989") ? "" : (stryCov_9fa48("989"), 'flex'),
                justifyContent: stryMutAct_9fa48("990") ? "" : (stryCov_9fa48("990"), 'space-between'),
                paddingLeft: stryMutAct_9fa48("991") ? "" : (stryCov_9fa48("991"), '96px'),
                marginTop: stryMutAct_9fa48("992") ? "" : (stryCov_9fa48("992"), '10px')
              })}>
                <span className={styles.svgAxisText}>0</span>
                <span className={styles.svgAxisText}>5</span>
                <span className={styles.svgAxisText}>10</span>
                <span className={styles.svgAxisText}>15</span>
                <span className={styles.svgAxisText}>20</span>
              </div>
            </div>
          </div>

          {/* Bar Chart: Gargalos */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div>
                <h3 className={styles.chartTitle}>Gargalos do fluxo</h3>
                <p className={styles.chartSubtitle}>Carga e tempo médio por etapa do fluxo</p>
              </div>
            </div>
            
            <div className={styles.barChartContainer}>
              <div className={styles.barRow}>
                <span className={styles.barLabel} style={stryMutAct_9fa48("993") ? {} : (stryCov_9fa48("993"), {
                  width: stryMutAct_9fa48("994") ? "" : (stryCov_9fa48("994"), '130px'),
                  textAlign: stryMutAct_9fa48("995") ? "" : (stryCov_9fa48("995"), 'left'),
                  fontWeight: stryMutAct_9fa48("996") ? "" : (stryCov_9fa48("996"), '500')
                })}>Rascunho → Submissão</span>
                <div className={styles.barTrack}>
                  <div className={stryMutAct_9fa48("997") ? `` : (stryCov_9fa48("997"), `${styles.barFill} ${styles.fillPurpleLight}`)} style={stryMutAct_9fa48("998") ? {} : (stryCov_9fa48("998"), {
                    width: stryMutAct_9fa48("999") ? "" : (stryCov_9fa48("999"), '20%')
                  })}></div>
                </div>
                <span className={styles.svgAxisText} style={stryMutAct_9fa48("1000") ? {} : (stryCov_9fa48("1000"), {
                  width: stryMutAct_9fa48("1001") ? "" : (stryCov_9fa48("1001"), '40px')
                })}>1.2 dias</span>
              </div>
              
              <div className={styles.barRow}>
                <span className={styles.barLabel} style={stryMutAct_9fa48("1002") ? {} : (stryCov_9fa48("1002"), {
                  width: stryMutAct_9fa48("1003") ? "" : (stryCov_9fa48("1003"), '130px'),
                  textAlign: stryMutAct_9fa48("1004") ? "" : (stryCov_9fa48("1004"), 'left'),
                  fontWeight: stryMutAct_9fa48("1005") ? "" : (stryCov_9fa48("1005"), '500')
                })}>Submissão → Revisão</span>
                <div className={styles.barTrack}>
                  <div className={stryMutAct_9fa48("1006") ? `` : (stryCov_9fa48("1006"), `${styles.barFill} ${styles.fillOrange}`)} style={stryMutAct_9fa48("1007") ? {} : (stryCov_9fa48("1007"), {
                    width: stryMutAct_9fa48("1008") ? "" : (stryCov_9fa48("1008"), '80%')
                  })}></div>
                </div>
                <span className={styles.svgAxisText} style={stryMutAct_9fa48("1009") ? {} : (stryCov_9fa48("1009"), {
                  width: stryMutAct_9fa48("1010") ? "" : (stryCov_9fa48("1010"), '40px')
                })}>3.5 dias</span>
              </div>
              
              <div className={styles.barRow}>
                <span className={styles.barLabel} style={stryMutAct_9fa48("1011") ? {} : (stryCov_9fa48("1011"), {
                  width: stryMutAct_9fa48("1012") ? "" : (stryCov_9fa48("1012"), '130px'),
                  textAlign: stryMutAct_9fa48("1013") ? "" : (stryCov_9fa48("1013"), 'left'),
                  fontWeight: stryMutAct_9fa48("1014") ? "" : (stryCov_9fa48("1014"), '500')
                })}>Revisão → Aprovação</span>
                <div className={styles.barTrack}>
                  <div className={stryMutAct_9fa48("1015") ? `` : (stryCov_9fa48("1015"), `${styles.barFill} ${styles.fillOrange}`)} style={stryMutAct_9fa48("1016") ? {} : (stryCov_9fa48("1016"), {
                    width: stryMutAct_9fa48("1017") ? "" : (stryCov_9fa48("1017"), '50%')
                  })}></div>
                </div>
                <span className={styles.svgAxisText} style={stryMutAct_9fa48("1018") ? {} : (stryCov_9fa48("1018"), {
                  width: stryMutAct_9fa48("1019") ? "" : (stryCov_9fa48("1019"), '40px')
                })}>2.1 dias</span>
              </div>
              
              <div className={styles.barRow}>
                <span className={styles.barLabel} style={stryMutAct_9fa48("1020") ? {} : (stryCov_9fa48("1020"), {
                  width: stryMutAct_9fa48("1021") ? "" : (stryCov_9fa48("1021"), '130px'),
                  textAlign: stryMutAct_9fa48("1022") ? "" : (stryCov_9fa48("1022"), 'left'),
                  fontWeight: stryMutAct_9fa48("1023") ? "" : (stryCov_9fa48("1023"), '500')
                })}>Aprovação → Arquivo</span>
                <div className={styles.barTrack}>
                  <div className={stryMutAct_9fa48("1024") ? `` : (stryCov_9fa48("1024"), `${styles.barFill} ${styles.fillPurpleLight}`)} style={stryMutAct_9fa48("1025") ? {} : (stryCov_9fa48("1025"), {
                    width: stryMutAct_9fa48("1026") ? "" : (stryCov_9fa48("1026"), '10%')
                  })}></div>
                </div>
                <span className={styles.svgAxisText} style={stryMutAct_9fa48("1027") ? {} : (stryCov_9fa48("1027"), {
                  width: stryMutAct_9fa48("1028") ? "" : (stryCov_9fa48("1028"), '40px')
                })}>0.4 dias</span>
              </div>
            </div>

            <div className={styles.alertBox}>
              <i className="bi bi-exclamation-triangle alertIcon"></i>
              <span>
                A etapa <strong>Submissão → Revisão</strong> concentra 78% da fila. Considere distribuir revisores ou habilitar pré-triagem por IA.
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </DashboardLayout>;
  }
}