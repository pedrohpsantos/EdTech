import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext" 
import ThemeToggle from "../components/themeToggle"
import styles from "./auth.module.css"

function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { handleLogin } = useAuth()
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('session_expired') === 'true') {
            setErro('Sua sessão expirou. Por favor, faça login novamente.');
        }
    }, []);

    const handleSubmit = async () => {
        setErro('')
        try {
            const resultado = await handleLogin(email, senha)
            if (resultado.sucesso === true) {
                navigate('/dashboard')
            } else {
                setErro(resultado.mensagem)
            }
        } catch (erro) {
            setErro(erro.message)
        }
    }

    const fillDemo = (demoEmail, demoPass) => {
        setEmail(demoEmail);
        setSenha(demoPass);
    }

    return (
        <div className={styles.loginWrapper}>
            {/* Left Panel - Branding */}
            <div className={styles.leftPanel}>
                <div className={styles.networkPattern}></div>
                
                <div className={styles.leftContent}>
                    <div className={styles.logo}>EdTech</div>
                </div>

                <div className={styles.leftContent}>
                    <div className={styles.badge}>
                        <span className={styles.badgeIcon}>🛡️</span> ISO 27001 · LGPD · SOC 2
                    </div>
                    <h1 className={styles.headline}>
                        Governança de <br />
                        <span className={styles.headlineLight}>Pesquisa <br />Acadêmica</span>
                    </h1>
                    <p className={styles.subheadline}>
                        Rastreabilidade e compliance para todo o ciclo de vida dos seus documentos de pesquisa.
                    </p>
                </div>

                <div className={styles.statsGlass}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>12.4K</span>
                        <span className={styles.statLabel}>Documentos</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>347</span>
                        <span className={styles.statLabel}>Pesquisadores</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>99.9%</span>
                        <span className={styles.statLabel}>Uptime</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className={styles.rightPanel}>
                <div className={styles.formContainer}>
                    <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                        <ThemeToggle />
                    </div>

                    {/* Header exclusively for mobile */}
                    <div className={styles.mobileHeader}>
                        EdTech
                    </div>

                    <div className={styles.acessoLabel}>Acesso Institucional</div>
                    <h2 className={styles.welcomeTitle}>Bem-vindo de volta</h2>
                    <p className={styles.welcomeSub}>Entre com suas credenciais institucionais</p>

                    {erro && (
                        <div className={styles.errorAlert}>
                            <span style={{ marginRight: '8px' }}>⚠️</span> 
                            {erro}
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <div className={styles.labelRow}>
                            <label className={styles.inputLabel}>E-mail Institucional</label>
                        </div>
                        <div className={styles.inputWrapper}>
                            <input 
                                className={styles.inputField} 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="seu.nome@universidade.br" 
                                aria-label="email"
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.labelRow}>
                            <label className={styles.inputLabel}>Senha</label>
                            <Link to="#" className={styles.forgotLink}>Recuperar senha</Link>
                        </div>
                        <div className={styles.inputWrapper}>
                            <input 
                                className={styles.inputField} 
                                type={showPassword ? "text" : "password"} 
                                value={senha} 
                                onChange={(e) => setSenha(e.target.value)} 
                                placeholder="••••••••"
                                aria-label="senha"
                            />
                            <button 
                                type="button"
                                className={styles.passwordToggle} 
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Mostrar senha"
                            >
                                {showPassword ? '👁️‍🗨️' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <button className={styles.submitBtn} onClick={handleSubmit}>
                        Entrar <span>→</span>
                    </button>

                    <div className={styles.divider}>
                        <span>Acesso de Demonstração</span>
                    </div>

                    <div className={styles.demoCard} onClick={() => fillDemo('pesquisador@demo.com', 'demo123')}>
                        <div className={styles.demoInfo}>
                            <div className={`${styles.dot} ${styles.dotPurple}`}></div>
                            <div className={styles.demoText}>
                                <h4>Pesquisador</h4>
                                <p>Dashboard & Upload de documentos</p>
                            </div>
                        </div>
                        <div className={styles.demoArrow}>→</div>
                    </div>

                    <div className={styles.demoCard} onClick={() => fillDemo('orientador@demo.com', 'demo123')}>
                        <div className={styles.demoInfo}>
                            <div className={`${styles.dot} ${styles.dotOrange}`}></div>
                            <div className={styles.demoText}>
                                <h4>Orientador</h4>
                                <p>Aprovação de submissões</p>
                            </div>
                        </div>
                        <div className={styles.demoArrow}>→</div>
                    </div>

                    <div className={styles.demoCard} onClick={() => fillDemo('auditor@demo.com', 'demo123')}>
                        <div className={styles.demoInfo}>
                            <div className={`${styles.dot} ${styles.dotGreen}`}></div>
                            <div className={styles.demoText}>
                                <h4>Auditor</h4>
                                <p>Trilha de auditoria completa</p>
                            </div>
                        </div>
                        <div className={styles.demoArrow}>→</div>
                    </div>

                    <p style={{ textAlign: 'center', margin: '1rem 0 0 0', fontSize: '0.875rem' }}>
                        Não tem conta? <Link to="/register" className={styles.forgotLink}>Cadastre-se</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login