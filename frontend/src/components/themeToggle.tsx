import useTheme from '../hooks/useTheme';
import styles from './themeToggle.module.css';

function ThemeToggle() {
  const { tema, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={styles.toggleBtn}
      aria-label="Alternar Tema"
      title="Alternar Tema"
    >
      {tema === 'dark' ? (
        <svg aria-hidden="true" data-testid="theme-icon-sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg aria-hidden="true" data-testid="theme-icon-moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;
