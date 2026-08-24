import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import styles from '../assets/analytics.module.css';

export default function Analytics() {
  const [timePeriod, setTimePeriod] = useState<number>(6);

  const getChartData = (period: number) => {
    if (period === 1) {
      return {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', '', ''],
        areaChart: {
          d: 'M 0 80 C 40 70, 80 60, 160 50 C 200 65, 220 40, 240 30 C 300 25, 360 20, 400 15 L 400 150 L 0 150 Z',
          lineD: 'M 0 80 C 40 70, 80 60, 160 50 C 200 65, 220 40, 240 30 C 300 25, 360 20, 400 15',
          value: '4.2 d',
          trend: '-12%',
        },
        lineChart: {
          d: 'M 0 80 L 80 70 L 160 60 L 240 40 L 320 30 L 400 25',
          dots: [80, 70, 60, 40, 30, 25],
          value: '22%',
          trend: '-5 pts',
        },
      };
    }
    if (period === 3) {
      return {
        labels: ['Fev', 'Mar', 'Abr', 'Mai', '', ''],
        areaChart: {
          d: 'M 0 60 C 40 50, 80 65, 160 45 C 200 35, 220 50, 240 40 C 300 30, 360 25, 400 20 L 400 150 L 0 150 Z',
          lineD: 'M 0 60 C 40 50, 80 65, 160 45 C 200 35, 220 50, 240 40 C 300 30, 360 25, 400 20',
          value: '3.6 d',
          trend: '-25%',
        },
        lineChart: {
          d: 'M 0 50 L 80 40 L 160 55 L 240 35 L 320 45 L 400 30',
          dots: [50, 40, 55, 35, 45, 30],
          value: '18%',
          trend: '-10 pts',
        },
      };
    }
    // period === 6
    return {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      areaChart: {
        d: 'M 0 30 C 40 45, 80 40, 160 38 C 200 38, 220 70, 240 75 C 300 85, 360 95, 400 100 L 400 150 L 0 150 Z',
        lineD: 'M 0 30 C 40 45, 80 40, 160 38 C 200 38, 220 70, 240 75 C 300 85, 360 95, 400 100',
        value: '3.1 d',
        trend: '-50%',
      },
      lineChart: {
        d: 'M 0 10 L 80 30 L 160 20 L 240 70 L 320 90 L 400 110',
        dots: [10, 30, 20, 70, 90, 110],
        value: '15%',
        trend: '-17 pts',
      },
    };
  };

  const chartData = getChartData(timePeriod);
  const customTopbar = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <select
        value={timePeriod}
        onChange={(e) => setTimePeriod(Number(e.target.value))}
        style={{
          background: 'transparent',
          border: '1px solid var(--border)',
          padding: '6px 24px 6px 12px',
          borderRadius: '8px',
          fontSize: '13px',
          color: 'var(--ed-text-dark)',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage:
            'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
          backgroundSize: '8px auto',
        }}
      >
        <option value={1}>Último 1 mês</option>
        <option value={3}>Últimos 3 meses</option>
        <option value={6}>Últimos 6 meses</option>
      </select>
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
              <span className={styles.kpiValue}>{chartData.areaChart.value}</span>
              <span className={`${styles.kpiTrend} ${styles.positive}`}>
                {chartData.areaChart.trend}
              </span>
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Taxa de retrabalho</span>
              <i
                className="bi bi-arrow-repeat kpiIcon"
                style={{ color: 'var(--ed-status-success)' }}
              ></i>
            </div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiValue}>{chartData.lineChart.value}</span>
              <span className={`${styles.kpiTrend} ${styles.positive}`}>
                {chartData.lineChart.trend}
              </span>
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Pesquisadores ativos</span>
              <i className="bi bi-people kpiIcon" style={{ color: 'var(--ed-status-info)' }}></i>
            </div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiValue}>42</span>
              <span
                className={`${styles.kpiTrend} ${styles.positive}`}
                style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--ed-status-info)' }}
              >
                +6
              </span>
            </div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span>Gargalo crítico</span>
              <i
                className="bi bi-exclamation-triangle kpiIcon"
                style={{ color: 'var(--ed-orange)' }}
              ></i>
            </div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiValue} style={{ fontSize: '24px' }}>
                Revisão
              </span>
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
              <line
                x1="0"
                y1="0"
                x2="400"
                y2="0"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1="37.5"
                x2="400"
                y2="37.5"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1="75"
                x2="400"
                y2="75"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1="112.5"
                x2="400"
                y2="112.5"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1="150"
                x2="400"
                y2="150"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Y Axis Labels */}
              <text x="-15" y="5" className={styles.svgAxisText}>
                8
              </text>
              <text x="-15" y="42.5" className={styles.svgAxisText}>
                6
              </text>
              <text x="-15" y="80" className={styles.svgAxisText}>
                4
              </text>
              <text x="-15" y="117.5" className={styles.svgAxisText}>
                2
              </text>
              <text x="-15" y="155" className={styles.svgAxisText}>
                0
              </text>

              {/* X Axis Labels */}
              <text x="0" y="170" className={styles.svgAxisText}>
                {chartData.labels[0]}
              </text>
              <text x="80" y="170" className={styles.svgAxisText}>
                {chartData.labels[1]}
              </text>
              <text x="160" y="170" className={styles.svgAxisText}>
                {chartData.labels[2]}
              </text>
              <text x="240" y="170" className={styles.svgAxisText}>
                {chartData.labels[3]}
              </text>
              <text x="320" y="170" className={styles.svgAxisText}>
                {chartData.labels[4]}
              </text>
              <text x="385" y="170" className={styles.svgAxisText}>
                {chartData.labels[5]}
              </text>

              {/* Area Path */}
              <path
                d={chartData.areaChart.d}
                fill="url(#purpleGradient)"
                style={{ transition: 'd 0.5s ease-in-out' }}
              />
              {/* Line Path */}
              <path
                d={chartData.areaChart.lineD}
                fill="none"
                stroke="var(--ed-purple-main)"
                strokeWidth="2"
                className={styles.animateDraw}
                style={{ transition: 'd 0.5s ease-in-out' }}
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
                <i className="bi bi-graph-down-arrow"></i> {chartData.lineChart.trend}
              </div>
            </div>
            <svg className={styles.svgChart} viewBox="0 0 400 150" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line
                x1="0"
                y1="0"
                x2="400"
                y2="0"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1="37.5"
                x2="400"
                y2="37.5"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1="75"
                x2="400"
                y2="75"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1="112.5"
                x2="400"
                y2="112.5"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1="150"
                x2="400"
                y2="150"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Y Axis Labels */}
              <text x="-20" y="5" className={styles.svgAxisText}>
                32
              </text>
              <text x="-20" y="42.5" className={styles.svgAxisText}>
                24
              </text>
              <text x="-20" y="80" className={styles.svgAxisText}>
                16
              </text>
              <text x="-15" y="117.5" className={styles.svgAxisText}>
                8
              </text>
              <text x="-15" y="155" className={styles.svgAxisText}>
                0
              </text>

              {/* X Axis Labels */}
              <text x="0" y="170" className={styles.svgAxisText}>
                {chartData.labels[0]}
              </text>
              <text x="80" y="170" className={styles.svgAxisText}>
                {chartData.labels[1]}
              </text>
              <text x="160" y="170" className={styles.svgAxisText}>
                {chartData.labels[2]}
              </text>
              <text x="240" y="170" className={styles.svgAxisText}>
                {chartData.labels[3]}
              </text>
              <text x="320" y="170" className={styles.svgAxisText}>
                {chartData.labels[4]}
              </text>
              <text x="385" y="170" className={styles.svgAxisText}>
                {chartData.labels[5]}
              </text>

              {/* Line Path */}
              <path
                d={chartData.lineChart.d}
                fill="none"
                stroke="var(--ed-orange)"
                strokeWidth="2"
                className={styles.animateDraw}
                style={{ transition: 'd 0.5s ease-in-out' }}
              />
              {/* Dots */}
              <g className={styles.animateDrawDots}>
                {chartData.labels[0] && (
                  <circle
                    cx="0"
                    cy={chartData.lineChart.dots[0]}
                    r="4"
                    fill="var(--ed-orange)"
                    style={{ transition: 'cy 0.5s ease' }}
                  />
                )}
                {chartData.labels[1] && (
                  <circle
                    cx="80"
                    cy={chartData.lineChart.dots[1]}
                    r="4"
                    fill="var(--ed-orange)"
                    style={{ transition: 'cy 0.5s ease' }}
                  />
                )}
                {chartData.labels[2] && (
                  <circle
                    cx="160"
                    cy={chartData.lineChart.dots[2]}
                    r="4"
                    fill="var(--ed-orange)"
                    style={{ transition: 'cy 0.5s ease' }}
                  />
                )}
                {chartData.labels[3] && (
                  <circle
                    cx="240"
                    cy={chartData.lineChart.dots[3]}
                    r="4"
                    fill="var(--ed-orange)"
                    style={{ transition: 'cy 0.5s ease' }}
                  />
                )}
                {chartData.labels[4] && (
                  <circle
                    cx="320"
                    cy={chartData.lineChart.dots[4]}
                    r="4"
                    fill="var(--ed-orange)"
                    style={{ transition: 'cy 0.5s ease' }}
                  />
                )}
                {chartData.labels[5] && (
                  <circle
                    cx="400"
                    cy={chartData.lineChart.dots[5]}
                    r="4"
                    fill="var(--ed-orange)"
                    style={{ transition: 'cy 0.5s ease' }}
                  />
                )}
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
                  <div
                    className={`${styles.barFill} ${styles.fillPurple}`}
                    style={{ width: '90%' }}
                  ></div>
                </div>
              </div>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>J. Mendes</span>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${styles.fillPurpleLight}`}
                    style={{ width: '70%' }}
                  ></div>
                </div>
              </div>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>A. Costa</span>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${styles.fillPurpleLight}`}
                    style={{ width: '55%' }}
                  ></div>
                </div>
              </div>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>L. Rocha</span>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${styles.fillPurpleLight}`}
                    style={{ width: '45%' }}
                  ></div>
                </div>
              </div>
              <div className={styles.barRow}>
                <span className={styles.barLabel}>P. Dias</span>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${styles.fillPurpleLight}`}
                    style={{ width: '35%' }}
                  ></div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingLeft: '96px',
                  marginTop: '10px',
                }}
              >
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
                <span
                  className={styles.barLabel}
                  style={{ width: '130px', textAlign: 'left', fontWeight: '500' }}
                >
                  Rascunho → Submissão
                </span>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${styles.fillPurpleLight}`}
                    style={{ width: '20%' }}
                  ></div>
                </div>
                <span className={styles.svgAxisText} style={{ width: '40px' }}>
                  1.2 dias
                </span>
              </div>

              <div className={styles.barRow}>
                <span
                  className={styles.barLabel}
                  style={{ width: '130px', textAlign: 'left', fontWeight: '500' }}
                >
                  Submissão → Revisão
                </span>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${styles.fillOrange}`}
                    style={{ width: '80%' }}
                  ></div>
                </div>
                <span className={styles.svgAxisText} style={{ width: '40px' }}>
                  3.5 dias
                </span>
              </div>

              <div className={styles.barRow}>
                <span
                  className={styles.barLabel}
                  style={{ width: '130px', textAlign: 'left', fontWeight: '500' }}
                >
                  Revisão → Aprovação
                </span>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${styles.fillOrange}`}
                    style={{ width: '50%' }}
                  ></div>
                </div>
                <span className={styles.svgAxisText} style={{ width: '40px' }}>
                  2.1 dias
                </span>
              </div>

              <div className={styles.barRow}>
                <span
                  className={styles.barLabel}
                  style={{ width: '130px', textAlign: 'left', fontWeight: '500' }}
                >
                  Aprovação → Arquivo
                </span>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${styles.fillPurpleLight}`}
                    style={{ width: '10%' }}
                  ></div>
                </div>
                <span className={styles.svgAxisText} style={{ width: '40px' }}>
                  0.4 dias
                </span>
              </div>
            </div>

            <div className={styles.alertBox}>
              <i className="bi bi-exclamation-triangle alertIcon"></i>
              <span>
                A etapa <strong>Submissão → Revisão</strong> concentra 78% da fila. Considere
                distribuir revisores ou habilitar pré-triagem por IA.
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
