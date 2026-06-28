import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext" 
import ThemeToggle from "../components/themeToggle"
import NetworkBackground from "../components/NetworkBackground"
import { motion } from "framer-motion"
import useEasterEggs from "../hooks/useEasterEggs"
import styles from "./auth.module.css"

function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { handleLogin } = useAuth()
    const { konamiActivated, hyperdriveActivated, handleLogoClick } = useEasterEggs()
    const [isShaking, setIsShaking] = useState(false)
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('session_expired') === 'true') {
            setErro('Sua sessão expirou. Por favor, faça login novamente.');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
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

    const formVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
    }

    const shakeVariants = {
        shake: { x: [-10, 10, -10, 10, -5, 5, 0], transition: { duration: 0.4 } }
    }

    return (
        <motion.div 
            className={styles.loginWrapper}
            animate={{ 
                rotate: konamiActivated ? 360 : 0,
                filter: konamiActivated ? "hue-rotate(180deg) saturate(200%)" : "hue-rotate(0deg) saturate(100%)"
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            {/* Left Panel - Branding */}
            <motion.div 
                className={styles.leftPanel}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <NetworkBackground isHyperdrive={hyperdriveActivated} />
                
                <div className={styles.leftContent}>
                    <div className={styles.logo} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleLogoClick}>
                        <svg width="28" height="28" viewBox="0 0 100 100" style={{ marginRight: '8px' }}>
                            <line x1="20" y1="25" x2="80" y2="25" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
                            <line x1="20" y1="50" x2="55" y2="50" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
                            <line x1="20" y1="75" x2="80" y2="75" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
                            <line x1="20" y1="25" x2="20" y2="75" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
                            <circle cx="20" cy="25" r="8" fill="#FFFFFF" />
                            <circle cx="80" cy="25" r="8" fill="#FFFFFF" />
                            <circle cx="20" cy="50" r="8" fill="#FFFFFF" />
                            <circle cx="55" cy="50" r="8" fill="#FF9100" />
                            <circle cx="20" cy="75" r="8" fill="#FFFFFF" />
                            <circle cx="80" cy="75" r="8" fill="#FFFFFF" />
                        </svg>
                        EdTech
                    </div>
                </div>

                <div className={styles.leftContent}>
                    <div className={styles.badge}>
                        <span className={styles.badgeIcon}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                <path d="M9 12l2 2 4-4"></path>
                            </svg>
                        </span> 
                        ISO 27001 · LGPD · SOC 2
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
            </motion.div>

            {/* Right Panel - Form */}
            <motion.div 
                className={styles.rightPanel}
                variants={formVariants}
                initial="hidden"
                animate="visible"
            >
                <div className={styles.formContainer}>
                    <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 className={styles.acessoLabel}>Acesso à Plataforma</h4>
                        <ThemeToggle />
                    </motion.div>

                    <motion.h2 variants={itemVariants} className={styles.welcomeTitle}>Bem-vindo de volta</motion.h2>
                    <motion.p variants={itemVariants} className={styles.welcomeSub}>Entre com suas credenciais institucionais</motion.p>

                    <form 
                        onSubmit={handleSubmit}
                        onInvalid={(e) => {
                            e.preventDefault(); // Prevent default browser tooltip if we want custom shake, or let it stay
                            setIsShaking(true);
                            setTimeout(() => setIsShaking(false), 500);
                        }}
                    >
                        {erro && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }} 
                                animate={{ opacity: 1, height: 'auto' }} 
                                className={styles.errorAlert}
                            >
                                <span style={{ marginRight: '8px' }}>⚠️</span> 
                                {erro}
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants} className={styles.inputGroup}>
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
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className={styles.inputGroup}>
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
                                    required
                                />
                                <button 
                                    type="button"
                                    className={styles.passwordToggle} 
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Mostrar senha"
                                >
                                    {showPassword ? (
                                        <svg className={styles.eyeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    ) : (
                                        <svg className={styles.eyeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        <motion.button 
                            variants={Object.assign({}, itemVariants, shakeVariants)}
                            animate={isShaking ? "shake" : "visible"}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={styles.submitBtn} 
                            type="submit"
                        >
                            Entrar <span>→</span>
                        </motion.button>
                    </form>

                    <motion.div variants={itemVariants} className={styles.divider}>
                        <span>Acesso de Demonstração</span>
                    </motion.div>

                    <motion.div variants={itemVariants} className={styles.demoCard} onClick={() => fillDemo('pesquisador@demo.com', 'demo123')}>
                        <div className={styles.demoInfo}>
                            <div className={`${styles.dot} ${styles.dotPurple}`}></div>
                            <div className={styles.demoText}>
                                <h4>Pesquisador</h4>
                                <p>Dashboard & Upload de documentos</p>
                            </div>
                        </div>
                        <div className={styles.demoArrow}>→</div>
                    </motion.div>

                    <motion.div variants={itemVariants} className={styles.demoCard} onClick={() => fillDemo('orientador@demo.com', 'demo123')}>
                        <div className={styles.demoInfo}>
                            <div className={`${styles.dot} ${styles.dotOrange}`}></div>
                            <div className={styles.demoText}>
                                <h4>Orientador</h4>
                                <p>Aprovação de submissões</p>
                            </div>
                        </div>
                        <div className={styles.demoArrow}>→</div>
                    </motion.div>

                    <motion.div variants={itemVariants} className={styles.demoCard} onClick={() => fillDemo('auditor@demo.com', 'demo123')}>
                        <div className={styles.demoInfo}>
                            <div className={`${styles.dot} ${styles.dotGreen}`}></div>
                            <div className={styles.demoText}>
                                <h4>Auditor</h4>
                                <p>Trilha de auditoria completa</p>
                            </div>
                        </div>
                        <div className={styles.demoArrow}>→</div>
                    </motion.div>

                    <motion.p variants={itemVariants} style={{ textAlign: 'center', margin: '1rem 0 0 0', fontSize: '0.875rem' }}>
                        Não tem conta? <Link to="/register" className={styles.forgotLink}>Cadastre-se</Link>
                    </motion.p>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Login