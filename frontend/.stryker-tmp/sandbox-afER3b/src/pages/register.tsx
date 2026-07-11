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
import { register, verifyRegistration } from '../services/api';
import { motion } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';
import styles from './auth.module.css';
function Register() {
  if (stryMutAct_9fa48("2364")) {
    {}
  } else {
    stryCov_9fa48("2364");
    const [nome, setNome] = useState(stryMutAct_9fa48("2365") ? "Stryker was here!" : (stryCov_9fa48("2365"), ''));
    const [email, setEmail] = useState(stryMutAct_9fa48("2366") ? "Stryker was here!" : (stryCov_9fa48("2366"), ''));
    const [senha, setSenha] = useState(stryMutAct_9fa48("2367") ? "Stryker was here!" : (stryCov_9fa48("2367"), ''));
    const [confirmarSenha, setConfirmarSenha] = useState(stryMutAct_9fa48("2368") ? "Stryker was here!" : (stryCov_9fa48("2368"), ''));
    const [erro, setErro] = useState(stryMutAct_9fa48("2369") ? "Stryker was here!" : (stryCov_9fa48("2369"), ''));
    const [showPassword, setShowPassword] = useState(stryMutAct_9fa48("2370") ? true : (stryCov_9fa48("2370"), false));
    const [showConfirmPassword, setShowConfirmPassword] = useState(stryMutAct_9fa48("2371") ? true : (stryCov_9fa48("2371"), false));
    const [isShaking, setIsShaking] = useState(stryMutAct_9fa48("2372") ? true : (stryCov_9fa48("2372"), false));
    const [role, setRole] = useState(stryMutAct_9fa48("2373") ? "" : (stryCov_9fa48("2373"), 'RESEARCHER'));
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState(stryMutAct_9fa48("2374") ? "Stryker was here!" : (stryCov_9fa48("2374"), ''));
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
      if (stryMutAct_9fa48("2375")) {
        {}
      } else {
        stryCov_9fa48("2375");
        if (stryMutAct_9fa48("2377") ? false : stryMutAct_9fa48("2376") ? true : (stryCov_9fa48("2376", "2377"), e)) e.preventDefault();
        setErro(stryMutAct_9fa48("2378") ? "Stryker was here!" : (stryCov_9fa48("2378"), ''));
        if (stryMutAct_9fa48("2381") ? senha === confirmarSenha : stryMutAct_9fa48("2380") ? false : stryMutAct_9fa48("2379") ? true : (stryCov_9fa48("2379", "2380", "2381"), senha !== confirmarSenha)) {
          if (stryMutAct_9fa48("2382")) {
            {}
          } else {
            stryCov_9fa48("2382");
            setErro(stryMutAct_9fa48("2383") ? "" : (stryCov_9fa48("2383"), 'As senhas não coincidem. Por favor tente novamente'));
            setIsShaking(stryMutAct_9fa48("2384") ? false : (stryCov_9fa48("2384"), true));
            setTimeout(stryMutAct_9fa48("2385") ? () => undefined : (stryCov_9fa48("2385"), () => setIsShaking(stryMutAct_9fa48("2386") ? true : (stryCov_9fa48("2386"), false))), 500);
            return;
          }
        }
        try {
          if (stryMutAct_9fa48("2387")) {
            {}
          } else {
            stryCov_9fa48("2387");
            const resultado = await register(nome, email, senha, role);
            if (stryMutAct_9fa48("2390") ? resultado.sucesso !== true : stryMutAct_9fa48("2389") ? false : stryMutAct_9fa48("2388") ? true : (stryCov_9fa48("2388", "2389", "2390"), resultado.sucesso === (stryMutAct_9fa48("2391") ? false : (stryCov_9fa48("2391"), true)))) {
              if (stryMutAct_9fa48("2392")) {
                {}
              } else {
                stryCov_9fa48("2392");
                setStep(2);
              }
            } else {
              if (stryMutAct_9fa48("2393")) {
                {}
              } else {
                stryCov_9fa48("2393");
                setErro(resultado.mensagem);
              }
            }
          }
        } catch (erro) {
          if (stryMutAct_9fa48("2394")) {
            {}
          } else {
            stryCov_9fa48("2394");
            setErro(erro.message);
          }
        }
      }
    };
    const handleVerify = async (e: React.FormEvent) => {
      if (stryMutAct_9fa48("2395")) {
        {}
      } else {
        stryCov_9fa48("2395");
        if (stryMutAct_9fa48("2397") ? false : stryMutAct_9fa48("2396") ? true : (stryCov_9fa48("2396", "2397"), e)) e.preventDefault();
        setErro(stryMutAct_9fa48("2398") ? "Stryker was here!" : (stryCov_9fa48("2398"), ''));
        if (stryMutAct_9fa48("2402") ? otp.length >= 6 : stryMutAct_9fa48("2401") ? otp.length <= 6 : stryMutAct_9fa48("2400") ? false : stryMutAct_9fa48("2399") ? true : (stryCov_9fa48("2399", "2400", "2401", "2402"), otp.length < 6)) {
          if (stryMutAct_9fa48("2403")) {
            {}
          } else {
            stryCov_9fa48("2403");
            setErro(stryMutAct_9fa48("2404") ? "" : (stryCov_9fa48("2404"), 'Por favor, insira o código de 6 dígitos.'));
            setIsShaking(stryMutAct_9fa48("2405") ? false : (stryCov_9fa48("2405"), true));
            setTimeout(stryMutAct_9fa48("2406") ? () => undefined : (stryCov_9fa48("2406"), () => setIsShaking(stryMutAct_9fa48("2407") ? true : (stryCov_9fa48("2407"), false))), 500);
            return;
          }
        }
        try {
          if (stryMutAct_9fa48("2408")) {
            {}
          } else {
            stryCov_9fa48("2408");
            const resultado = await verifyRegistration(email, otp);
            if (stryMutAct_9fa48("2411") ? resultado.sucesso !== true : stryMutAct_9fa48("2410") ? false : stryMutAct_9fa48("2409") ? true : (stryCov_9fa48("2409", "2410", "2411"), resultado.sucesso === (stryMutAct_9fa48("2412") ? false : (stryCov_9fa48("2412"), true)))) {
              if (stryMutAct_9fa48("2413")) {
                {}
              } else {
                stryCov_9fa48("2413");
                navigate(stryMutAct_9fa48("2414") ? "" : (stryCov_9fa48("2414"), '/login'));
              }
            } else {
              if (stryMutAct_9fa48("2415")) {
                {}
              } else {
                stryCov_9fa48("2415");
                setErro(resultado.mensagem);
              }
            }
          }
        } catch (erro) {
          if (stryMutAct_9fa48("2416")) {
            {}
          } else {
            stryCov_9fa48("2416");
            setErro(erro.message);
          }
        }
      }
    };
    const itemVariants = stryMutAct_9fa48("2417") ? {} : (stryCov_9fa48("2417"), {
      hidden: stryMutAct_9fa48("2418") ? {} : (stryCov_9fa48("2418"), {
        opacity: 0,
        y: 15
      }),
      visible: stryMutAct_9fa48("2419") ? {} : (stryCov_9fa48("2419"), {
        opacity: 1,
        y: 0
      })
    });
    const shakeVariants = stryMutAct_9fa48("2420") ? {} : (stryCov_9fa48("2420"), {
      shake: stryMutAct_9fa48("2421") ? {} : (stryCov_9fa48("2421"), {
        x: stryMutAct_9fa48("2422") ? [] : (stryCov_9fa48("2422"), [stryMutAct_9fa48("2423") ? +10 : (stryCov_9fa48("2423"), -10), 10, stryMutAct_9fa48("2424") ? +10 : (stryCov_9fa48("2424"), -10), 10, stryMutAct_9fa48("2425") ? +5 : (stryCov_9fa48("2425"), -5), 5, 0]),
        transition: stryMutAct_9fa48("2426") ? {} : (stryCov_9fa48("2426"), {
          duration: 0.4
        })
      })
    });
    return <AuthLayout title="Crie sua conta" subtitle="Junte-se à principal plataforma de governança acadêmica.">
      <form onSubmit={(stryMutAct_9fa48("2429") ? step !== 1 : stryMutAct_9fa48("2428") ? false : stryMutAct_9fa48("2427") ? true : (stryCov_9fa48("2427", "2428", "2429"), step === 1)) ? handleSubmit : handleVerify} onInvalid={e => {
        if (stryMutAct_9fa48("2430")) {
          {}
        } else {
          stryCov_9fa48("2430");
          e.preventDefault();
          setIsShaking(stryMutAct_9fa48("2431") ? false : (stryCov_9fa48("2431"), true));
          setTimeout(stryMutAct_9fa48("2432") ? () => undefined : (stryCov_9fa48("2432"), () => setIsShaking(stryMutAct_9fa48("2433") ? true : (stryCov_9fa48("2433"), false))), 500);
        }
      }}>
        {stryMutAct_9fa48("2436") ? erro || <motion.div initial={{
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
          </motion.div> : stryMutAct_9fa48("2435") ? false : stryMutAct_9fa48("2434") ? true : (stryCov_9fa48("2434", "2435", "2436"), erro && <motion.div initial={stryMutAct_9fa48("2437") ? {} : (stryCov_9fa48("2437"), {
          opacity: 0,
          height: 0
        })} animate={stryMutAct_9fa48("2438") ? {} : (stryCov_9fa48("2438"), {
          opacity: 1,
          height: stryMutAct_9fa48("2439") ? "" : (stryCov_9fa48("2439"), 'auto')
        })} className={styles.errorAlert}>
            <span style={stryMutAct_9fa48("2440") ? {} : (stryCov_9fa48("2440"), {
            marginRight: stryMutAct_9fa48("2441") ? "" : (stryCov_9fa48("2441"), '8px')
          })}>⚠️</span>
            {erro}
          </motion.div>)}

        {(stryMutAct_9fa48("2444") ? step !== 1 : stryMutAct_9fa48("2443") ? false : stryMutAct_9fa48("2442") ? true : (stryCov_9fa48("2442", "2443", "2444"), step === 1)) ? <>
            <motion.div variants={itemVariants} className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label className={styles.inputLabel}>Perfil de Usuário</label>
              </div>
              <div className={styles.inputWrapper}>
                <select className={styles.inputField} value={role} onChange={stryMutAct_9fa48("2445") ? () => undefined : (stryCov_9fa48("2445"), e => setRole(e.target.value))} aria-label="perfil" required>
                  <option value="RESEARCHER">Pesquisador</option>
                  <option value="ADVISOR">Orientador</option>
                  <option value="AUDITOR">Auditor</option>
                </select>
              </div>
            </motion.div>

        <motion.div variants={itemVariants} className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label className={styles.inputLabel}>Nome Completo</label>
          </div>
          <div className={styles.inputWrapper}>
            <input className={styles.inputField} type="text" value={nome} onChange={stryMutAct_9fa48("2446") ? () => undefined : (stryCov_9fa48("2446"), e => setNome(e.target.value))} placeholder="ex: Chiquinha Silva" aria-label="nome" required />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label className={styles.inputLabel}>E-mail Institucional</label>
          </div>
          <div className={styles.inputWrapper}>
            <input className={styles.inputField} type="email" value={email} onChange={stryMutAct_9fa48("2447") ? () => undefined : (stryCov_9fa48("2447"), e => setEmail(e.target.value))} placeholder="seu.nome@universidade.br" aria-label="email" required />
          </div>
        </motion.div>

        <div className={styles.rowInputs}>
          <motion.div variants={itemVariants} className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label className={styles.inputLabel}>Senha</label>
            </div>
            <div className={styles.inputWrapper}>
              <input className={styles.inputField} type={showPassword ? stryMutAct_9fa48("2448") ? "" : (stryCov_9fa48("2448"), 'text') : stryMutAct_9fa48("2449") ? "" : (stryCov_9fa48("2449"), 'password')} value={senha} onChange={stryMutAct_9fa48("2450") ? () => undefined : (stryCov_9fa48("2450"), e => setSenha(e.target.value))} placeholder="••••••••" aria-label="senha" required />
              <button type="button" className={styles.passwordToggle} onClick={stryMutAct_9fa48("2451") ? () => undefined : (stryCov_9fa48("2451"), () => setShowPassword(stryMutAct_9fa48("2452") ? showPassword : (stryCov_9fa48("2452"), !showPassword)))} aria-label="Mostrar senha">
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

          <motion.div variants={itemVariants} className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label className={styles.inputLabel}>Confirmar Senha</label>
            </div>
            <div className={styles.inputWrapper}>
              <input className={styles.inputField} type={showConfirmPassword ? stryMutAct_9fa48("2453") ? "" : (stryCov_9fa48("2453"), 'text') : stryMutAct_9fa48("2454") ? "" : (stryCov_9fa48("2454"), 'password')} value={confirmarSenha} onChange={stryMutAct_9fa48("2455") ? () => undefined : (stryCov_9fa48("2455"), e => setConfirmarSenha(e.target.value))} placeholder="••••••••" aria-label="confirmar senha" required />
              <button type="button" className={styles.passwordToggle} onClick={stryMutAct_9fa48("2456") ? () => undefined : (stryCov_9fa48("2456"), () => setShowConfirmPassword(stryMutAct_9fa48("2457") ? showConfirmPassword : (stryCov_9fa48("2457"), !showConfirmPassword)))} aria-label="Mostrar confirmação de senha">
                {showConfirmPassword ? <svg className={styles.eyeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg> : <svg className={styles.eyeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.p variants={itemVariants} style={stryMutAct_9fa48("2458") ? {} : (stryCov_9fa48("2458"), {
            fontSize: stryMutAct_9fa48("2459") ? "" : (stryCov_9fa48("2459"), '0.7rem'),
            color: stryMutAct_9fa48("2460") ? "" : (stryCov_9fa48("2460"), 'var(--text)'),
            marginTop: stryMutAct_9fa48("2461") ? "" : (stryCov_9fa48("2461"), '-0.5rem'),
            marginBottom: stryMutAct_9fa48("2462") ? "" : (stryCov_9fa48("2462"), '1rem')
          })}>
          Sua senha deve ter de 8-10 caracteres, contendo pelo menos um carácter especial, letra
          maiúscula e número.
        </motion.p>

        <motion.button variants={Object.assign({}, itemVariants, shakeVariants)} animate={isShaking ? stryMutAct_9fa48("2463") ? "" : (stryCov_9fa48("2463"), 'shake') : stryMutAct_9fa48("2464") ? "" : (stryCov_9fa48("2464"), 'visible')} whileHover={stryMutAct_9fa48("2465") ? {} : (stryCov_9fa48("2465"), {
            scale: 1.02
          })} whileTap={stryMutAct_9fa48("2466") ? {} : (stryCov_9fa48("2466"), {
            scale: 0.98
          })} type="submit" className={styles.submitBtn}>
          Avançar <span>→</span>
        </motion.button>
          </> : <>
            <motion.div variants={itemVariants} className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label className={styles.inputLabel}>Código de Verificação</label>
              </div>
              <motion.p style={stryMutAct_9fa48("2467") ? {} : (stryCov_9fa48("2467"), {
              fontSize: stryMutAct_9fa48("2468") ? "" : (stryCov_9fa48("2468"), '0.85rem'),
              color: stryMutAct_9fa48("2469") ? "" : (stryCov_9fa48("2469"), 'var(--text)'),
              marginBottom: stryMutAct_9fa48("2470") ? "" : (stryCov_9fa48("2470"), '1rem')
            })}>
                Enviamos um código de 6 dígitos para <strong>{email}</strong>.
              </motion.p>
              <div className={styles.inputWrapper}>
                <input className={styles.inputField} type="text" value={otp} onChange={stryMutAct_9fa48("2471") ? () => undefined : (stryCov_9fa48("2471"), e => setOtp(e.target.value))} placeholder="Ex: 123456" aria-label="código de verificação" maxLength={6} required />
              </div>
            </motion.div>

            <motion.button variants={Object.assign({}, itemVariants, shakeVariants)} animate={isShaking ? stryMutAct_9fa48("2472") ? "" : (stryCov_9fa48("2472"), 'shake') : stryMutAct_9fa48("2473") ? "" : (stryCov_9fa48("2473"), 'visible')} whileHover={stryMutAct_9fa48("2474") ? {} : (stryCov_9fa48("2474"), {
            scale: 1.02
          })} whileTap={stryMutAct_9fa48("2475") ? {} : (stryCov_9fa48("2475"), {
            scale: 0.98
          })} type="submit" className={styles.submitBtn}>
              Verificar Conta <span>→</span>
            </motion.button>
            <motion.button variants={itemVariants} whileHover={stryMutAct_9fa48("2476") ? {} : (stryCov_9fa48("2476"), {
            scale: 1.02
          })} whileTap={stryMutAct_9fa48("2477") ? {} : (stryCov_9fa48("2477"), {
            scale: 0.98
          })} type="button" onClick={stryMutAct_9fa48("2478") ? () => undefined : (stryCov_9fa48("2478"), () => setStep(1))} className={styles.submitBtn} style={stryMutAct_9fa48("2479") ? {} : (stryCov_9fa48("2479"), {
            marginTop: stryMutAct_9fa48("2480") ? "" : (stryCov_9fa48("2480"), '1rem'),
            backgroundColor: stryMutAct_9fa48("2481") ? "" : (stryCov_9fa48("2481"), 'transparent'),
            border: stryMutAct_9fa48("2482") ? "" : (stryCov_9fa48("2482"), '1px solid var(--border)'),
            color: stryMutAct_9fa48("2483") ? "" : (stryCov_9fa48("2483"), 'var(--text)')
          })}>
              Voltar
            </motion.button>
          </>}
      </form>

      <motion.p variants={itemVariants} style={stryMutAct_9fa48("2484") ? {} : (stryCov_9fa48("2484"), {
        textAlign: stryMutAct_9fa48("2485") ? "" : (stryCov_9fa48("2485"), 'center'),
        margin: stryMutAct_9fa48("2486") ? "" : (stryCov_9fa48("2486"), '1.5rem 0 0 0'),
        fontSize: stryMutAct_9fa48("2487") ? "" : (stryCov_9fa48("2487"), '0.875rem')
      })}>
        Já tem uma conta?{stryMutAct_9fa48("2488") ? "" : (stryCov_9fa48("2488"), ' ')}
        <Link to="/login" className={styles.forgotLink}>
          Faça login
        </Link>
      </motion.p>
    </AuthLayout>;
  }
}
export default Register;