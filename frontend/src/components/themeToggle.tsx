import useTheme from "../hooks/useTheme"
import styles from "./themeToggle.module.css"

function ThemeToggle() {
    const { tema, toggleTheme } = useTheme()
    return (
        <button 
            onClick={toggleTheme} 
            className={styles.toggleBtn}
            aria-label="Alternar Tema"
            title="Alternar Tema"
        >
            {tema === 'dark' ? <i className="bi bi-sun-fill" style={{ fontSize: '1.25rem' }}></i> : <i className="bi bi-moon-stars-fill" style={{ fontSize: '1.25rem' }}></i>}
        </button>
    )
}

export default ThemeToggle