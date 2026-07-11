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
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { motion } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';
import styles from './auth.module.css';
function Login() {
  if (stryMutAct_9fa48("1949")) {
    {}
  } else {
    stryCov_9fa48("1949");
    const [email, setEmail] = useState(stryMutAct_9fa48("1950") ? "Stryker was here!" : (stryCov_9fa48("1950"), ''));
    const [senha, setSenha] = useState(stryMutAct_9fa48("1951") ? "Stryker was here!" : (stryCov_9fa48("1951"), ''));
    const [erro, setErro] = useState(() => {
      if (stryMutAct_9fa48("1952")) {
        {}
      } else {
        stryCov_9fa48("1952");
        const params = new URLSearchParams(window.location.search);
        return (stryMutAct_9fa48("1955") ? params.get('session_expired') !== 'true' : stryMutAct_9fa48("1954") ? false : stryMutAct_9fa48("1953") ? true : (stryCov_9fa48("1953", "1954", "1955"), params.get(stryMutAct_9fa48("1956") ? "" : (stryCov_9fa48("1956"), 'session_expired')) === (stryMutAct_9fa48("1957") ? "" : (stryCov_9fa48("1957"), 'true')))) ? stryMutAct_9fa48("1958") ? "" : (stryCov_9fa48("1958"), 'Sua sessão expirou. Por favor, faça login novamente.') : stryMutAct_9fa48("1959") ? "Stryker was here!" : (stryCov_9fa48("1959"), '');
      }
    });
    const [showPassword, setShowPassword] = useState(stryMutAct_9fa48("1960") ? true : (stryCov_9fa48("1960"), false));
    const navigate = useNavigate();
    const {
      handleLogin
    } = useAuth();
    const [isShaking, setIsShaking] = useState(stryMutAct_9fa48("1961") ? true : (stryCov_9fa48("1961"), false));
    const [step, setStep] = useState<'credentials' | '2fa'>(stryMutAct_9fa48("1962") ? "" : (stryCov_9fa48("1962"), 'credentials'));
    const [totpCode, setTotpCode] = useState(stryMutAct_9fa48("1963") ? "Stryker was here!" : (stryCov_9fa48("1963"), ''));
    const handleSubmit = async (e: React.FormEvent) => {
      if (stryMutAct_9fa48("1964")) {
        {}
      } else {
        stryCov_9fa48("1964");
        e.preventDefault();
        setErro(stryMutAct_9fa48("1965") ? "Stryker was here!" : (stryCov_9fa48("1965"), ''));
        try {
          if (stryMutAct_9fa48("1966")) {
            {}
          } else {
            stryCov_9fa48("1966");
            if (stryMutAct_9fa48("1969") ? step !== 'credentials' : stryMutAct_9fa48("1968") ? false : stryMutAct_9fa48("1967") ? true : (stryCov_9fa48("1967", "1968", "1969"), step === (stryMutAct_9fa48("1970") ? "" : (stryCov_9fa48("1970"), 'credentials')))) {
              if (stryMutAct_9fa48("1971")) {
                {}
              } else {
                stryCov_9fa48("1971");
                const resultado = await handleLogin(email, senha);
                if (stryMutAct_9fa48("1974") ? resultado.sucesso !== true : stryMutAct_9fa48("1973") ? false : stryMutAct_9fa48("1972") ? true : (stryCov_9fa48("1972", "1973", "1974"), resultado.sucesso === (stryMutAct_9fa48("1975") ? false : (stryCov_9fa48("1975"), true)))) {
                  if (stryMutAct_9fa48("1976")) {
                    {}
                  } else {
                    stryCov_9fa48("1976");
                    if (stryMutAct_9fa48("1979") ? resultado.dados.mfaRequired : stryMutAct_9fa48("1978") ? false : stryMutAct_9fa48("1977") ? true : (stryCov_9fa48("1977", "1978", "1979"), resultado.dados?.mfaRequired)) {
                      if (stryMutAct_9fa48("1980")) {
                        {}
                      } else {
                        stryCov_9fa48("1980");
                        setStep(stryMutAct_9fa48("1981") ? "" : (stryCov_9fa48("1981"), '2fa'));
                      }
                    } else {
                      if (stryMutAct_9fa48("1982")) {
                        {}
                      } else {
                        stryCov_9fa48("1982");
                        navigate(stryMutAct_9fa48("1983") ? "" : (stryCov_9fa48("1983"), '/dashboard'));
                      }
                    }
                  }
                } else {
                  if (stryMutAct_9fa48("1984")) {
                    {}
                  } else {
                    stryCov_9fa48("1984");
                    setErro(resultado.mensagem);
                  }
                }
              }
            } else {
              if (stryMutAct_9fa48("1985")) {
                {}
              } else {
                stryCov_9fa48("1985");
                const {
                  verify2FaLogin
                } = await import('../services/api');
                const resultado = await verify2FaLogin(email, senha, totpCode);
                if (stryMutAct_9fa48("1987") ? false : stryMutAct_9fa48("1986") ? true : (stryCov_9fa48("1986", "1987"), resultado.sucesso)) {
                  if (stryMutAct_9fa48("1988")) {
                    {}
                  } else {
                    stryCov_9fa48("1988");
                    navigate(stryMutAct_9fa48("1989") ? "" : (stryCov_9fa48("1989"), '/dashboard'));
                    // Reload to update AuthContext if needed, or update it manually.
                    window.location.reload();
                  }
                } else {
                  if (stryMutAct_9fa48("1990")) {
                    {}
                  } else {
                    stryCov_9fa48("1990");
                    setErro(resultado.mensagem);
                  }
                }
              }
            }
          }
        } catch (erro: any) {
          if (stryMutAct_9fa48("1991")) {
            {}
          } else {
            stryCov_9fa48("1991");
            setErro(stryMutAct_9fa48("1994") ? erro.message && 'Erro ao realizar login' : stryMutAct_9fa48("1993") ? false : stryMutAct_9fa48("1992") ? true : (stryCov_9fa48("1992", "1993", "1994"), erro.message || (stryMutAct_9fa48("1995") ? "" : (stryCov_9fa48("1995"), 'Erro ao realizar login'))));
          }
        }
      }
    };
    const itemVariants = stryMutAct_9fa48("1996") ? {} : (stryCov_9fa48("1996"), {
      hidden: stryMutAct_9fa48("1997") ? {} : (stryCov_9fa48("1997"), {
        opacity: 0,
        y: 15
      }),
      visible: stryMutAct_9fa48("1998") ? {} : (stryCov_9fa48("1998"), {
        opacity: 1,
        y: 0
      })
    });
    const shakeVariants = stryMutAct_9fa48("1999") ? {} : (stryCov_9fa48("1999"), {
      shake: stryMutAct_9fa48("2000") ? {} : (stryCov_9fa48("2000"), {
        x: stryMutAct_9fa48("2001") ? [] : (stryCov_9fa48("2001"), [stryMutAct_9fa48("2002") ? +10 : (stryCov_9fa48("2002"), -10), 10, stryMutAct_9fa48("2003") ? +10 : (stryCov_9fa48("2003"), -10), 10, stryMutAct_9fa48("2004") ? +5 : (stryCov_9fa48("2004"), -5), 5, 0]),
        transition: stryMutAct_9fa48("2005") ? {} : (stryCov_9fa48("2005"), {
          duration: 0.4
        })
      })
    });
    return <AuthLayout title="Bem-vindo de volta" subtitle="Entre com suas credenciais institucionais">
      <form onSubmit={handleSubmit} onInvalid={e => {
        if (stryMutAct_9fa48("2006")) {
          {}
        } else {
          stryCov_9fa48("2006");
          e.preventDefault(); // Prevent default browser tooltip if we want custom shake, or let it stay
          setIsShaking(stryMutAct_9fa48("2007") ? false : (stryCov_9fa48("2007"), true));
          setTimeout(stryMutAct_9fa48("2008") ? () => undefined : (stryCov_9fa48("2008"), () => setIsShaking(stryMutAct_9fa48("2009") ? true : (stryCov_9fa48("2009"), false))), 500);
        }
      }}>
        {stryMutAct_9fa48("2012") ? erro || <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} className={styles.errorAlert}>
            <span style={{
            marginRight: '8px'
          }}>⚠️</span>
            {erro}
          </motion.div> : stryMutAct_9fa48("2011") ? false : stryMutAct_9fa48("2010") ? true : (stryCov_9fa48("2010", "2011", "2012"), erro && <motion.div initial={stryMutAct_9fa48("2013") ? {} : (stryCov_9fa48("2013"), {
          opacity: 0,
          height: 0
        })} animate={stryMutAct_9fa48("2014") ? {} : (stryCov_9fa48("2014"), {
          opacity: 1,
          height: stryMutAct_9fa48("2015") ? "" : (stryCov_9fa48("2015"), 'auto')
        })} className={styles.errorAlert}>
            <span style={stryMutAct_9fa48("2016") ? {} : (stryCov_9fa48("2016"), {
            marginRight: stryMutAct_9fa48("2017") ? "" : (stryCov_9fa48("2017"), '8px')
          })}>⚠️</span>
            {erro}
          </motion.div>)}

        <motion.div variants={itemVariants} className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label className={styles.inputLabel}>E-mail Institucional</label>
          </div>
          <div className={styles.inputWrapper}>
            <input className={styles.inputField} type="email" value={email} onChange={stryMutAct_9fa48("2018") ? () => undefined : (stryCov_9fa48("2018"), e => setEmail(e.target.value))} placeholder="seu.nome@universidade.br" aria-label="email" required />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label className={styles.inputLabel}>Senha</label>
            <Link to="/recover-password" className={styles.forgotLink}>
              Recuperar senha
            </Link>
          </div>
          <div className={styles.inputWrapper}>
            <input className={styles.inputField} type={showPassword ? stryMutAct_9fa48("2019") ? "" : (stryCov_9fa48("2019"), 'text') : stryMutAct_9fa48("2020") ? "" : (stryCov_9fa48("2020"), 'password')} value={senha} onChange={stryMutAct_9fa48("2021") ? () => undefined : (stryCov_9fa48("2021"), e => setSenha(e.target.value))} placeholder="••••••••" aria-label="senha" required />
            <button type="button" className={styles.passwordToggle} onClick={stryMutAct_9fa48("2022") ? () => undefined : (stryCov_9fa48("2022"), () => setShowPassword(stryMutAct_9fa48("2023") ? showPassword : (stryCov_9fa48("2023"), !showPassword)))} aria-label="Mostrar senha">
              {showPassword ? <svg className={styles.eyeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg> : <svg className={styles.eyeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>}
            </button>
          </div>
        </motion.div>

        {stryMutAct_9fa48("2026") ? step === '2fa' || <motion.div variants={itemVariants} className={styles.inputGroup} style={{
          marginTop: '1rem'
        }}>
            <div className={styles.labelRow}>
              <label className={styles.inputLabel}>Código 2FA (Authenticator)</label>
            </div>
            <div className={styles.inputWrapper}>
              <input className={styles.inputField} type="text" value={totpCode} onChange={e => setTotpCode(e.target.value.replace(/\D/g, ''))} placeholder="000000" maxLength={6} required />
            </div>
          </motion.div> : stryMutAct_9fa48("2025") ? false : stryMutAct_9fa48("2024") ? true : (stryCov_9fa48("2024", "2025", "2026"), (stryMutAct_9fa48("2028") ? step !== '2fa' : stryMutAct_9fa48("2027") ? true : (stryCov_9fa48("2027", "2028"), step === (stryMutAct_9fa48("2029") ? "" : (stryCov_9fa48("2029"), '2fa')))) && <motion.div variants={itemVariants} className={styles.inputGroup} style={stryMutAct_9fa48("2030") ? {} : (stryCov_9fa48("2030"), {
          marginTop: stryMutAct_9fa48("2031") ? "" : (stryCov_9fa48("2031"), '1rem')
        })}>
            <div className={styles.labelRow}>
              <label className={styles.inputLabel}>Código 2FA (Authenticator)</label>
            </div>
            <div className={styles.inputWrapper}>
              <input className={styles.inputField} type="text" value={totpCode} onChange={stryMutAct_9fa48("2032") ? () => undefined : (stryCov_9fa48("2032"), e => setTotpCode(e.target.value.replace(stryMutAct_9fa48("2033") ? /\d/g : (stryCov_9fa48("2033"), /\D/g), stryMutAct_9fa48("2034") ? "Stryker was here!" : (stryCov_9fa48("2034"), ''))))} placeholder="000000" maxLength={6} required />
            </div>
          </motion.div>)}

        <motion.button variants={Object.assign({}, itemVariants, shakeVariants)} animate={isShaking ? stryMutAct_9fa48("2035") ? "" : (stryCov_9fa48("2035"), 'shake') : stryMutAct_9fa48("2036") ? "" : (stryCov_9fa48("2036"), 'visible')} whileHover={stryMutAct_9fa48("2037") ? {} : (stryCov_9fa48("2037"), {
          scale: 1.02
        })} whileTap={stryMutAct_9fa48("2038") ? {} : (stryCov_9fa48("2038"), {
          scale: 0.98
        })} className={styles.submitBtn} type="submit">
          {(stryMutAct_9fa48("2041") ? step !== 'credentials' : stryMutAct_9fa48("2040") ? false : stryMutAct_9fa48("2039") ? true : (stryCov_9fa48("2039", "2040", "2041"), step === (stryMutAct_9fa48("2042") ? "" : (stryCov_9fa48("2042"), 'credentials')))) ? stryMutAct_9fa48("2043") ? "" : (stryCov_9fa48("2043"), 'Continuar') : stryMutAct_9fa48("2044") ? "" : (stryCov_9fa48("2044"), 'Verificar e Entrar')} <span>→</span>
        </motion.button>
      </form>

      <motion.p variants={itemVariants} style={stryMutAct_9fa48("2045") ? {} : (stryCov_9fa48("2045"), {
        textAlign: stryMutAct_9fa48("2046") ? "" : (stryCov_9fa48("2046"), 'center'),
        margin: stryMutAct_9fa48("2047") ? "" : (stryCov_9fa48("2047"), '1rem 0 0 0'),
        fontSize: stryMutAct_9fa48("2048") ? "" : (stryCov_9fa48("2048"), '0.875rem')
      })}>
        Não tem conta?{stryMutAct_9fa48("2049") ? "" : (stryCov_9fa48("2049"), ' ')}
        <Link to="/register" className={styles.forgotLink}>
          Cadastre-se
        </Link>
      </motion.p>
    </AuthLayout>;
  }
}
export default Login;