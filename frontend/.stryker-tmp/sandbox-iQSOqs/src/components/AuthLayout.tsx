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
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './themeToggle';
import NetworkBackground from './NetworkBackground';
import useEasterEggs from '../hooks/useEasterEggs';
import styles from '../pages/auth.module.css';
export default function AuthLayout({
  children,
  title,
  subtitle
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  if (stryMutAct_9fa48("30")) {
    {}
  } else {
    stryCov_9fa48("30");
    const {
      konamiActivated,
      hyperdriveActivated,
      handleLogoClick
    } = useEasterEggs();
    const formVariants = stryMutAct_9fa48("31") ? {} : (stryCov_9fa48("31"), {
      hidden: stryMutAct_9fa48("32") ? {} : (stryCov_9fa48("32"), {
        opacity: 0,
        x: 20
      }),
      visible: stryMutAct_9fa48("33") ? {} : (stryCov_9fa48("33"), {
        opacity: 1,
        x: 0,
        transition: stryMutAct_9fa48("34") ? {} : (stryCov_9fa48("34"), {
          staggerChildren: 0.05,
          delayChildren: 0.1
        })
      })
    });
    const itemVariants = stryMutAct_9fa48("35") ? {} : (stryCov_9fa48("35"), {
      hidden: stryMutAct_9fa48("36") ? {} : (stryCov_9fa48("36"), {
        opacity: 0,
        y: 15
      }),
      visible: stryMutAct_9fa48("37") ? {} : (stryCov_9fa48("37"), {
        opacity: 1,
        y: 0
      })
    });
    return <motion.div className={styles.loginWrapper} animate={stryMutAct_9fa48("38") ? {} : (stryCov_9fa48("38"), {
      rotate: konamiActivated ? 360 : 0,
      filter: konamiActivated ? stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), 'hue-rotate(180deg) saturate(200%)') : stryMutAct_9fa48("40") ? "" : (stryCov_9fa48("40"), 'hue-rotate(0deg) saturate(100%)')
    })} transition={stryMutAct_9fa48("41") ? {} : (stryCov_9fa48("41"), {
      duration: 1,
      ease: stryMutAct_9fa48("42") ? "" : (stryCov_9fa48("42"), 'easeInOut')
    })}>
      {/* Left Panel - Branding */}
      <div className={styles.leftPanel}>
        <NetworkBackground isHyperdrive={hyperdriveActivated} />

        <div className={styles.leftContent}>
          <div className={styles.logo} style={stryMutAct_9fa48("43") ? {} : (stryCov_9fa48("43"), {
            display: stryMutAct_9fa48("44") ? "" : (stryCov_9fa48("44"), 'flex'),
            alignItems: stryMutAct_9fa48("45") ? "" : (stryCov_9fa48("45"), 'center'),
            cursor: stryMutAct_9fa48("46") ? "" : (stryCov_9fa48("46"), 'pointer')
          })} onClick={handleLogoClick}>
            <svg width="28" height="28" viewBox="0 0 100 100" style={stryMutAct_9fa48("47") ? {} : (stryCov_9fa48("47"), {
              marginRight: stryMutAct_9fa48("48") ? "" : (stryCov_9fa48("48"), '8px')
            })}>
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={stryMutAct_9fa48("49") ? {} : (stryCov_9fa48("49"), {
                marginRight: stryMutAct_9fa48("50") ? "" : (stryCov_9fa48("50"), '4px'),
                verticalAlign: stryMutAct_9fa48("51") ? "" : (stryCov_9fa48("51"), 'middle')
              })}>
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
      <motion.div className={styles.rightPanel} variants={formVariants} initial="hidden" animate="visible" style={stryMutAct_9fa48("52") ? {} : (stryCov_9fa48("52"), {
        position: stryMutAct_9fa48("53") ? "" : (stryCov_9fa48("53"), 'relative')
      })}>
        <div style={stryMutAct_9fa48("54") ? {} : (stryCov_9fa48("54"), {
          position: stryMutAct_9fa48("55") ? "" : (stryCov_9fa48("55"), 'absolute'),
          top: stryMutAct_9fa48("56") ? "" : (stryCov_9fa48("56"), '24px'),
          right: stryMutAct_9fa48("57") ? "" : (stryCov_9fa48("57"), '24px')
        })}>
          <ThemeToggle />
        </div>

        <div className={styles.formContainer}>
          <motion.div variants={itemVariants} style={stryMutAct_9fa48("58") ? {} : (stryCov_9fa48("58"), {
            display: stryMutAct_9fa48("59") ? "" : (stryCov_9fa48("59"), 'flex'),
            justifyContent: stryMutAct_9fa48("60") ? "" : (stryCov_9fa48("60"), 'flex-start'),
            alignItems: stryMutAct_9fa48("61") ? "" : (stryCov_9fa48("61"), 'center')
          })}>
            <span className={styles.acessoLabel}>Acesso à Plataforma</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className={styles.welcomeTitle}>
            {title}
          </motion.h2>
          <motion.p variants={itemVariants} className={styles.welcomeSub}>
            {subtitle}
          </motion.p>

          {children}
        </div>
      </motion.div>
    </motion.div>;
  }
}