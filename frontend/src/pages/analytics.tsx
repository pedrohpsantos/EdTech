import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import styles from './analytics.module.css';

export default function Analytics() {
  const customTopbar = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button 
        style={{ 
          background: 'transparent', 
          border: '1px solid var(--border)', 
          padding: '6px 12px', 
          borderRadius: '8px',
          fontSize: '13px',
          color: 'var(--ed-text-dark)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}
      >
        Últimos 6 meses <i className="bi bi-chevron-down" style={{ fontSize: '10px' }}></i>
      </button>
    </div>
  );

  return (
    <DashboardLayout
      title="Análises"
      subtitle="Métricas de fluxo, produtividade e gargalos do processo de pesquisa"
      breadcrumbs={['EdTech', 'Análises']}
      customTopbarElement={customTopbar}
    >
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
              <span className={`${styles.kpiTrend} ${styles.positive}`}>-50%</span>
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Taxa de retrabalho</span>
              <i className="bi bi-arrow-repeat kpiIcon" style={{ color: 'var(--ed-status-success)' }}></i>
            </div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiValue}>15%</span>
              <span className={`${styles.kpiTrend} ${styles.positive}`}>-17 pts</span>
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Pesquisadores ativos</span>
              <i className="bi bi-people kpiIcon" style={{ color: 'var(--ed-status-info)' }}></i>
            </div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiValue}>42</span>
              <span className={`${styles.kpiTrend} ${styles.positive}`} style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--ed-status-info)' }}>+6</span>
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Gargalo crítico</span>
              <i className="bi bi-exclamation-triangle kpiIcon" style={{ color: 'var(--ed-orange)' }}></i>
            </div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiValue} style={{ fontSize: '24px' }}>Revisão</span>
              <span className={`${styles.kpiTrend} ${styles.warning}`}>78% carga</span>
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
              <path 
                d="M 0 30 C 40 45, 80 40, 160 38 C 200 38, 220 70, 240 75 C 300 85, 360 95, 400 100 L 400 150 L 0 150 Z" 
                fill="url(#purpleGradient)" 
              />
              {/* Line Path */}
              <path 
                d="M 0 30 C 40 45, 80 40, 160 38 C 200 38, 220 70, 240 75 C 300 85, 360 95, 400 100" 
                fill="none" 
                stroke="var(--ed-purple-main)" 
                strokeWidth="2" 
                className={styles.animateDraw}
              />
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
              <path 
                d="M 0 10 L 80 30 L 160 20 L 240 70 L 320 90 L 400 110" 
                fill="none" 
                stroke="var(--ed-orange)" 
                strokeWidth="2" 
                className={styles.animateDraw}
              />
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
                  <div className={`${styles.barFill} ${styles.fillPurple}`} style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>J. Mendes</span>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles.fillPurpleLight}`} style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>A. Costa</span>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles.fillPurpleLight}`} style={{ width: '55%' }}></div>
                </div>
              </div>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>L. Rocha</span>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles.fillPurpleLight}`} style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>P. Dias</span>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles.fillPurpleLight}`} style={{ width: '35%' }}></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '96px', marginTop: '10px' }}>
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
                <span className={styles.barLabel} style={{ width: '130px', textAlign: 'left', fontWeight: '500' }}>Rascunho → Submissão</span>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles.fillPurpleLight}`} style={{ width: '20%' }}></div>
                </div>
                <span className={styles.svgAxisText} style={{ width: '40px' }}>1.2 dias</span>
              </div>
              
              <div className={styles.barRow}>
                <span className={styles.barLabel} style={{ width: '130px', textAlign: 'left', fontWeight: '500' }}>Submissão → Revisão</span>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles.fillOrange}`} style={{ width: '80%' }}></div>
                </div>
                <span className={styles.svgAxisText} style={{ width: '40px' }}>3.5 dias</span>
              </div>
              
              <div className={styles.barRow}>
                <span className={styles.barLabel} style={{ width: '130px', textAlign: 'left', fontWeight: '500' }}>Revisão → Aprovação</span>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles.fillOrange}`} style={{ width: '50%' }}></div>
                </div>
                <span className={styles.svgAxisText} style={{ width: '40px' }}>2.1 dias</span>
              </div>
              
              <div className={styles.barRow}>
                <span className={styles.barLabel} style={{ width: '130px', textAlign: 'left', fontWeight: '500' }}>Aprovação → Arquivo</span>
                <div className={styles.barTrack}>
                  <div className={`${styles.barFill} ${styles.fillPurpleLight}`} style={{ width: '10%' }}></div>
                </div>
                <span className={styles.svgAxisText} style={{ width: '40px' }}>0.4 dias</span>
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
    </DashboardLayout>
  );
}
