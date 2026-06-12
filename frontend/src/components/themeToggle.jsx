import useTheme from "../hooks/useTheme"
function ThemeToggle(){
    const {tema, toggleTheme} = useTheme()
    return(
        <button onClick={toggleTheme}>
            {tema === 'dark' ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
        </button>
    )
}
export default ThemeToggle