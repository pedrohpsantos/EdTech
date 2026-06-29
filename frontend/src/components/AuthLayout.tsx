import { ReactNode } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./themeToggle";
import NetworkBackground from "./NetworkBackground";
import useEasterEggs from "../hooks/useEasterEggs";
import styles from "../pages/auth.module.css";

export default function AuthLayout({ children, title, subtitle }: { children: ReactNode, title: string, subtitle: string }) {
    const { konamiActivated, hyperdriveActivated, handleLogoClick } = useEasterEggs();

    const formVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
    };

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

                    <motion.h2 variants={itemVariants} className={styles.welcomeTitle}>{title}</motion.h2>
                    <motion.p variants={itemVariants} className={styles.welcomeSub}>{subtitle}</motion.p>

                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
}
