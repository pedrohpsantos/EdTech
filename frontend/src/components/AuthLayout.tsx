import { ReactNode } from 'react';
import ThemeToggle from './themeToggle';
import NetworkBackground from './NetworkBackground';
import useEasterEggs from '../hooks/useEasterEggs';
import styles from '../pages/auth.module.css';

export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  const { konamiActivated, hyperdriveActivated, handleLogoClick } = useEasterEggs();

  return (
    <div className={styles.loginWrapper} data-konami-active={konamiActivated || undefined}>
      {/* Left Panel - Branding */}
      <div className={styles.leftPanel}>
        <NetworkBackground isHyperdrive={hyperdriveActivated} />

        <div className={styles.leftContent}>
          <button
            type="button"
            className={styles.logo}
            onClick={handleLogoClick}
            aria-label="Ativar interação visual EdTech"
          >
            <svg width="28" height="28" viewBox="0 0 100 100" style={{ marginRight: '8px' }}>
              <line
                x1="20"
                y1="25"
                x2="80"
                y2="25"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <line
                x1="20"
                y1="50"
                x2="55"
                y2="50"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <line
                x1="20"
                y1="75"
                x2="80"
                y2="75"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <line
                x1="20"
                y1="25"
                x2="20"
                y2="75"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle cx="20" cy="25" r="8" fill="#FFFFFF" />
              <circle cx="80" cy="25" r="8" fill="#FFFFFF" />
              <circle cx="20" cy="50" r="8" fill="#FFFFFF" />
              <circle cx="55" cy="50" r="8" fill="#FF9100" />
              <circle cx="20" cy="75" r="8" fill="#FFFFFF" />
              <circle cx="80" cy="75" r="8" fill="#FFFFFF" />
            </svg>
            EdTech
          </button>
        </div>

        <div className={styles.leftContent}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: '4px', verticalAlign: 'middle' }}
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </span>
            ISO 27001 · LGPD · SOC 2
          </div>
          <h1 className={styles.headline}>
            Governança de <br />
            <span className={styles.headlineLight}>
              Pesquisa <br />
              Acadêmica
            </span>
          </h1>
          <p className={styles.subheadline}>
            Rastreabilidade e compliance para todo o ciclo de vida dos seus documentos de pesquisa.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <main className={styles.rightPanel} style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
          <ThemeToggle />
        </div>

        <div className={styles.formContainer}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <span className={styles.acessoLabel}>Acesso à Plataforma</span>
          </div>

          <h2 className={styles.welcomeTitle}>{title}</h2>
          <p className={styles.welcomeSub}>{subtitle}</p>

          {children}
        </div>
      </main>
    </div>
  );
}
