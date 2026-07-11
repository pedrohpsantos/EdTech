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
import { requestPasswordRecovery, verifyRecoveryCode, resetPassword } from '../services/api';
import { motion } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';
import styles from './auth.module.css';
function Recovery() {
  if (stryMutAct_9fa48("2175")) {
    {}
  } else {
    stryCov_9fa48("2175");
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState(stryMutAct_9fa48("2176") ? "Stryker was here!" : (stryCov_9fa48("2176"), ''));
    const [code, setCode] = useState(stryMutAct_9fa48("2177") ? "Stryker was here!" : (stryCov_9fa48("2177"), ''));
    const [senha, setSenha] = useState(stryMutAct_9fa48("2178") ? "Stryker was here!" : (stryCov_9fa48("2178"), ''));
    const [confirmarSenha, setConfirmarSenha] = useState(stryMutAct_9fa48("2179") ? "Stryker was here!" : (stryCov_9fa48("2179"), ''));
    const [showPassword, setShowPassword] = useState(stryMutAct_9fa48("2180") ? true : (stryCov_9fa48("2180"), false));
    const [showConfirmPassword, setShowConfirmPassword] = useState(stryMutAct_9fa48("2181") ? true : (stryCov_9fa48("2181"), false));
    const [erro, setErro] = useState(stryMutAct_9fa48("2182") ? "Stryker was here!" : (stryCov_9fa48("2182"), ''));
    const [sucesso, setSucesso] = useState(stryMutAct_9fa48("2183") ? "Stryker was here!" : (stryCov_9fa48("2183"), ''));
    const [loading, setLoading] = useState(stryMutAct_9fa48("2184") ? true : (stryCov_9fa48("2184"), false));
    const [isShaking, setIsShaking] = useState(stryMutAct_9fa48("2185") ? true : (stryCov_9fa48("2185"), false));
    const navigate = useNavigate();
    const triggerShake = () => {
      if (stryMutAct_9fa48("2186")) {
        {}
      } else {
        stryCov_9fa48("2186");
        setIsShaking(stryMutAct_9fa48("2187") ? false : (stryCov_9fa48("2187"), true));
        setTimeout(stryMutAct_9fa48("2188") ? () => undefined : (stryCov_9fa48("2188"), () => setIsShaking(stryMutAct_9fa48("2189") ? true : (stryCov_9fa48("2189"), false))), 500);
      }
    };
    const handleRequestCode = async (e: React.FormEvent) => {
      if (stryMutAct_9fa48("2190")) {
        {}
      } else {
        stryCov_9fa48("2190");
        if (stryMutAct_9fa48("2192") ? false : stryMutAct_9fa48("2191") ? true : (stryCov_9fa48("2191", "2192"), e)) e.preventDefault();
        setErro(stryMutAct_9fa48("2193") ? "Stryker was here!" : (stryCov_9fa48("2193"), ''));
        setLoading(stryMutAct_9fa48("2194") ? false : (stryCov_9fa48("2194"), true));
        try {
          if (stryMutAct_9fa48("2195")) {
            {}
          } else {
            stryCov_9fa48("2195");
            const res = await requestPasswordRecovery(email);
            if (stryMutAct_9fa48("2197") ? false : stryMutAct_9fa48("2196") ? true : (stryCov_9fa48("2196", "2197"), res.sucesso)) {
              if (stryMutAct_9fa48("2198")) {
                {}
              } else {
                stryCov_9fa48("2198");
                setSucesso(res.mensagem);
                setStep(2);
                setTimeout(stryMutAct_9fa48("2199") ? () => undefined : (stryCov_9fa48("2199"), () => setSucesso(stryMutAct_9fa48("2200") ? "Stryker was here!" : (stryCov_9fa48("2200"), ''))), 3000);
              }
            } else {
              if (stryMutAct_9fa48("2201")) {
                {}
              } else {
                stryCov_9fa48("2201");
                setErro(stryMutAct_9fa48("2204") ? res.mensagem && 'Erro ao solicitar código' : stryMutAct_9fa48("2203") ? false : stryMutAct_9fa48("2202") ? true : (stryCov_9fa48("2202", "2203", "2204"), res.mensagem || (stryMutAct_9fa48("2205") ? "" : (stryCov_9fa48("2205"), 'Erro ao solicitar código'))));
                triggerShake();
              }
            }
          }
        } catch {
          if (stryMutAct_9fa48("2206")) {
            {}
          } else {
            stryCov_9fa48("2206");
            setErro(stryMutAct_9fa48("2207") ? "" : (stryCov_9fa48("2207"), 'Erro no servidor'));
            triggerShake();
          }
        } finally {
          if (stryMutAct_9fa48("2208")) {
            {}
          } else {
            stryCov_9fa48("2208");
            setLoading(stryMutAct_9fa48("2209") ? true : (stryCov_9fa48("2209"), false));
          }
        }
      }
    };
    const handleVerifyCode = async (e: React.FormEvent) => {
      if (stryMutAct_9fa48("2210")) {
        {}
      } else {
        stryCov_9fa48("2210");
        if (stryMutAct_9fa48("2212") ? false : stryMutAct_9fa48("2211") ? true : (stryCov_9fa48("2211", "2212"), e)) e.preventDefault();
        setErro(stryMutAct_9fa48("2213") ? "Stryker was here!" : (stryCov_9fa48("2213"), ''));
        setLoading(stryMutAct_9fa48("2214") ? false : (stryCov_9fa48("2214"), true));
        try {
          if (stryMutAct_9fa48("2215")) {
            {}
          } else {
            stryCov_9fa48("2215");
            const res = await verifyRecoveryCode(email, code);
            if (stryMutAct_9fa48("2217") ? false : stryMutAct_9fa48("2216") ? true : (stryCov_9fa48("2216", "2217"), res.sucesso)) {
              if (stryMutAct_9fa48("2218")) {
                {}
              } else {
                stryCov_9fa48("2218");
                setSucesso(res.mensagem);
                setStep(3);
                setTimeout(stryMutAct_9fa48("2219") ? () => undefined : (stryCov_9fa48("2219"), () => setSucesso(stryMutAct_9fa48("2220") ? "Stryker was here!" : (stryCov_9fa48("2220"), ''))), 3000);
              }
            } else {
              if (stryMutAct_9fa48("2221")) {
                {}
              } else {
                stryCov_9fa48("2221");
                setErro(stryMutAct_9fa48("2224") ? res.mensagem && 'Código inválido' : stryMutAct_9fa48("2223") ? false : stryMutAct_9fa48("2222") ? true : (stryCov_9fa48("2222", "2223", "2224"), res.mensagem || (stryMutAct_9fa48("2225") ? "" : (stryCov_9fa48("2225"), 'Código inválido'))));
                triggerShake();
              }
            }
          }
        } catch {
          if (stryMutAct_9fa48("2226")) {
            {}
          } else {
            stryCov_9fa48("2226");
            setErro(stryMutAct_9fa48("2227") ? "" : (stryCov_9fa48("2227"), 'Erro no servidor'));
            triggerShake();
          }
        } finally {
          if (stryMutAct_9fa48("2228")) {
            {}
          } else {
            stryCov_9fa48("2228");
            setLoading(stryMutAct_9fa48("2229") ? true : (stryCov_9fa48("2229"), false));
          }
        }
      }
    };
    const handleResetPassword = async (e: React.FormEvent) => {
      if (stryMutAct_9fa48("2230")) {
        {}
      } else {
        stryCov_9fa48("2230");
        if (stryMutAct_9fa48("2232") ? false : stryMutAct_9fa48("2231") ? true : (stryCov_9fa48("2231", "2232"), e)) e.preventDefault();
        setErro(stryMutAct_9fa48("2233") ? "Stryker was here!" : (stryCov_9fa48("2233"), ''));
        if (stryMutAct_9fa48("2236") ? senha === confirmarSenha : stryMutAct_9fa48("2235") ? false : stryMutAct_9fa48("2234") ? true : (stryCov_9fa48("2234", "2235", "2236"), senha !== confirmarSenha)) {
          if (stryMutAct_9fa48("2237")) {
            {}
          } else {
            stryCov_9fa48("2237");
            setErro(stryMutAct_9fa48("2238") ? "" : (stryCov_9fa48("2238"), 'As senhas não coincidem.'));
            triggerShake();
            return;
          }
        }
        setLoading(stryMutAct_9fa48("2239") ? false : (stryCov_9fa48("2239"), true));
        try {
          if (stryMutAct_9fa48("2240")) {
            {}
          } else {
            stryCov_9fa48("2240");
            const res = await resetPassword(email, code, senha);
            if (stryMutAct_9fa48("2242") ? false : stryMutAct_9fa48("2241") ? true : (stryCov_9fa48("2241", "2242"), res.sucesso)) {
              if (stryMutAct_9fa48("2243")) {
                {}
              } else {
                stryCov_9fa48("2243");
                setSucesso(stryMutAct_9fa48("2244") ? "" : (stryCov_9fa48("2244"), 'Senha redefinida com sucesso! Redirecionando...'));
                setTimeout(stryMutAct_9fa48("2245") ? () => undefined : (stryCov_9fa48("2245"), () => navigate(stryMutAct_9fa48("2246") ? "" : (stryCov_9fa48("2246"), '/login'))), 2000);
              }
            } else {
              if (stryMutAct_9fa48("2247")) {
                {}
              } else {
                stryCov_9fa48("2247");
                setErro(stryMutAct_9fa48("2250") ? res.mensagem && 'Erro ao redefinir senha' : stryMutAct_9fa48("2249") ? false : stryMutAct_9fa48("2248") ? true : (stryCov_9fa48("2248", "2249", "2250"), res.mensagem || (stryMutAct_9fa48("2251") ? "" : (stryCov_9fa48("2251"), 'Erro ao redefinir senha'))));
                triggerShake();
              }
            }
          }
        } catch {
          if (stryMutAct_9fa48("2252")) {
            {}
          } else {
            stryCov_9fa48("2252");
            setErro(stryMutAct_9fa48("2253") ? "" : (stryCov_9fa48("2253"), 'Erro no servidor'));
            triggerShake();
          }
        } finally {
          if (stryMutAct_9fa48("2254")) {
            {}
          } else {
            stryCov_9fa48("2254");
            setLoading(stryMutAct_9fa48("2255") ? true : (stryCov_9fa48("2255"), false));
          }
        }
      }
    };
    const itemVariants = stryMutAct_9fa48("2256") ? {} : (stryCov_9fa48("2256"), {
      hidden: stryMutAct_9fa48("2257") ? {} : (stryCov_9fa48("2257"), {
        opacity: 0,
        y: 15
      }),
      visible: stryMutAct_9fa48("2258") ? {} : (stryCov_9fa48("2258"), {
        opacity: 1,
        y: 0
      })
    });
    const shakeVariants = stryMutAct_9fa48("2259") ? {} : (stryCov_9fa48("2259"), {
      shake: stryMutAct_9fa48("2260") ? {} : (stryCov_9fa48("2260"), {
        x: stryMutAct_9fa48("2261") ? [] : (stryCov_9fa48("2261"), [stryMutAct_9fa48("2262") ? +10 : (stryCov_9fa48("2262"), -10), 10, stryMutAct_9fa48("2263") ? +10 : (stryCov_9fa48("2263"), -10), 10, stryMutAct_9fa48("2264") ? +5 : (stryCov_9fa48("2264"), -5), 5, 0]),
        transition: stryMutAct_9fa48("2265") ? {} : (stryCov_9fa48("2265"), {
          duration: 0.4
        })
      })
    });
    const title = (stryMutAct_9fa48("2268") ? step !== 1 : stryMutAct_9fa48("2267") ? false : stryMutAct_9fa48("2266") ? true : (stryCov_9fa48("2266", "2267", "2268"), step === 1)) ? stryMutAct_9fa48("2269") ? "" : (stryCov_9fa48("2269"), 'Esqueceu a senha?') : (stryMutAct_9fa48("2272") ? step !== 2 : stryMutAct_9fa48("2271") ? false : stryMutAct_9fa48("2270") ? true : (stryCov_9fa48("2270", "2271", "2272"), step === 2)) ? stryMutAct_9fa48("2273") ? "" : (stryCov_9fa48("2273"), 'Verificação de Código') : stryMutAct_9fa48("2274") ? "" : (stryCov_9fa48("2274"), 'Nova Senha');
    const subtitle = (stryMutAct_9fa48("2277") ? step !== 1 : stryMutAct_9fa48("2276") ? false : stryMutAct_9fa48("2275") ? true : (stryCov_9fa48("2275", "2276", "2277"), step === 1)) ? stryMutAct_9fa48("2278") ? "" : (stryCov_9fa48("2278"), 'Informe seu e-mail para receber um código de segurança.') : (stryMutAct_9fa48("2281") ? step !== 2 : stryMutAct_9fa48("2280") ? false : stryMutAct_9fa48("2279") ? true : (stryCov_9fa48("2279", "2280", "2281"), step === 2)) ? stryMutAct_9fa48("2282") ? `` : (stryCov_9fa48("2282"), `Enviamos um código de 6 dígitos para ${email}`) : stryMutAct_9fa48("2283") ? "" : (stryCov_9fa48("2283"), 'Crie uma nova senha forte para sua conta.');
    return <AuthLayout title={title} subtitle={subtitle}>
      <div style={stryMutAct_9fa48("2284") ? {} : (stryCov_9fa48("2284"), {
        width: stryMutAct_9fa48("2285") ? "" : (stryCov_9fa48("2285"), '100%')
      })} key={step}>
        <form onSubmit={(stryMutAct_9fa48("2288") ? step !== 1 : stryMutAct_9fa48("2287") ? false : stryMutAct_9fa48("2286") ? true : (stryCov_9fa48("2286", "2287", "2288"), step === 1)) ? handleRequestCode : (stryMutAct_9fa48("2291") ? step !== 2 : stryMutAct_9fa48("2290") ? false : stryMutAct_9fa48("2289") ? true : (stryCov_9fa48("2289", "2290", "2291"), step === 2)) ? handleVerifyCode : handleResetPassword} onInvalid={e => {
          if (stryMutAct_9fa48("2292")) {
            {}
          } else {
            stryCov_9fa48("2292");
            e.preventDefault();
            triggerShake();
          }
        }}>
          {stryMutAct_9fa48("2295") ? erro || <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} className={styles.errorAlert}>
              <span style={{
              marginRight: '8px'
            }}>⚠️</span> {erro}
            </motion.div> : stryMutAct_9fa48("2294") ? false : stryMutAct_9fa48("2293") ? true : (stryCov_9fa48("2293", "2294", "2295"), erro && <motion.div initial={stryMutAct_9fa48("2296") ? {} : (stryCov_9fa48("2296"), {
            opacity: 0,
            height: 0
          })} animate={stryMutAct_9fa48("2297") ? {} : (stryCov_9fa48("2297"), {
            opacity: 1,
            height: stryMutAct_9fa48("2298") ? "" : (stryCov_9fa48("2298"), 'auto')
          })} className={styles.errorAlert}>
              <span style={stryMutAct_9fa48("2299") ? {} : (stryCov_9fa48("2299"), {
              marginRight: stryMutAct_9fa48("2300") ? "" : (stryCov_9fa48("2300"), '8px')
            })}>⚠️</span> {erro}
            </motion.div>)}
          {stryMutAct_9fa48("2303") ? sucesso || <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} className={styles.successAlert} style={{
            background: 'rgba(0,255,0,0.1)',
            color: '#00cc00',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid rgba(0,255,0,0.2)'
          }}>
              <span style={{
              marginRight: '8px'
            }}>✅</span> {sucesso}
            </motion.div> : stryMutAct_9fa48("2302") ? false : stryMutAct_9fa48("2301") ? true : (stryCov_9fa48("2301", "2302", "2303"), sucesso && <motion.div initial={stryMutAct_9fa48("2304") ? {} : (stryCov_9fa48("2304"), {
            opacity: 0,
            height: 0
          })} animate={stryMutAct_9fa48("2305") ? {} : (stryCov_9fa48("2305"), {
            opacity: 1,
            height: stryMutAct_9fa48("2306") ? "" : (stryCov_9fa48("2306"), 'auto')
          })} className={styles.successAlert} style={stryMutAct_9fa48("2307") ? {} : (stryCov_9fa48("2307"), {
            background: stryMutAct_9fa48("2308") ? "" : (stryCov_9fa48("2308"), 'rgba(0,255,0,0.1)'),
            color: stryMutAct_9fa48("2309") ? "" : (stryCov_9fa48("2309"), '#00cc00'),
            padding: stryMutAct_9fa48("2310") ? "" : (stryCov_9fa48("2310"), '1rem'),
            borderRadius: stryMutAct_9fa48("2311") ? "" : (stryCov_9fa48("2311"), '8px'),
            marginBottom: stryMutAct_9fa48("2312") ? "" : (stryCov_9fa48("2312"), '1.5rem'),
            border: stryMutAct_9fa48("2313") ? "" : (stryCov_9fa48("2313"), '1px solid rgba(0,255,0,0.2)')
          })}>
              <span style={stryMutAct_9fa48("2314") ? {} : (stryCov_9fa48("2314"), {
              marginRight: stryMutAct_9fa48("2315") ? "" : (stryCov_9fa48("2315"), '8px')
            })}>✅</span> {sucesso}
            </motion.div>)}

          {stryMutAct_9fa48("2318") ? step === 1 || <motion.div variants={itemVariants} className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label className={styles.inputLabel}>E-mail Institucional</label>
              </div>
              <div className={styles.inputWrapper}>
                <input className={styles.inputField} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu.nome@universidade.br" required />
              </div>
            </motion.div> : stryMutAct_9fa48("2317") ? false : stryMutAct_9fa48("2316") ? true : (stryCov_9fa48("2316", "2317", "2318"), (stryMutAct_9fa48("2320") ? step !== 1 : stryMutAct_9fa48("2319") ? true : (stryCov_9fa48("2319", "2320"), step === 1)) && <motion.div variants={itemVariants} className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label className={styles.inputLabel}>E-mail Institucional</label>
              </div>
              <div className={styles.inputWrapper}>
                <input className={styles.inputField} type="email" value={email} onChange={stryMutAct_9fa48("2321") ? () => undefined : (stryCov_9fa48("2321"), e => setEmail(e.target.value))} placeholder="seu.nome@universidade.br" required />
              </div>
            </motion.div>)}

          {stryMutAct_9fa48("2324") ? step === 2 || <motion.div variants={itemVariants} className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label className={styles.inputLabel}>Código OTP</label>
                <button type="button" className={styles.forgotLink} onClick={() => setStep(1)} style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}>
                  Alterar e-mail
                </button>
              </div>
              <div className={styles.inputWrapper}>
                <input className={styles.inputField} type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="123456" maxLength={6} required />
              </div>
            </motion.div> : stryMutAct_9fa48("2323") ? false : stryMutAct_9fa48("2322") ? true : (stryCov_9fa48("2322", "2323", "2324"), (stryMutAct_9fa48("2326") ? step !== 2 : stryMutAct_9fa48("2325") ? true : (stryCov_9fa48("2325", "2326"), step === 2)) && <motion.div variants={itemVariants} className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label className={styles.inputLabel}>Código OTP</label>
                <button type="button" className={styles.forgotLink} onClick={stryMutAct_9fa48("2327") ? () => undefined : (stryCov_9fa48("2327"), () => setStep(1))} style={stryMutAct_9fa48("2328") ? {} : (stryCov_9fa48("2328"), {
                background: stryMutAct_9fa48("2329") ? "" : (stryCov_9fa48("2329"), 'none'),
                border: stryMutAct_9fa48("2330") ? "" : (stryCov_9fa48("2330"), 'none'),
                cursor: stryMutAct_9fa48("2331") ? "" : (stryCov_9fa48("2331"), 'pointer'),
                padding: 0
              })}>
                  Alterar e-mail
                </button>
              </div>
              <div className={styles.inputWrapper}>
                <input className={styles.inputField} type="text" value={code} onChange={stryMutAct_9fa48("2332") ? () => undefined : (stryCov_9fa48("2332"), e => setCode(e.target.value))} placeholder="123456" maxLength={6} required />
              </div>
            </motion.div>)}

          {stryMutAct_9fa48("2335") ? step === 3 || <>
              <motion.div variants={itemVariants} className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.inputLabel}>Nova Senha</label>
                </div>
                <div className={styles.inputWrapper}>
                  <input className={styles.inputField} type={showPassword ? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)} placeholder="••••••••" required />
                  <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)} aria-label="Mostrar senha">
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
                  <label className={styles.inputLabel}>Confirmar Nova Senha</label>
                </div>
                <div className={styles.inputWrapper}>
                  <input className={styles.inputField} type={showConfirmPassword ? 'text' : 'password'} value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} placeholder="••••••••" required />
                  <button type="button" className={styles.passwordToggle} onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label="Mostrar confirmação de senha">
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
            </> : stryMutAct_9fa48("2334") ? false : stryMutAct_9fa48("2333") ? true : (stryCov_9fa48("2333", "2334", "2335"), (stryMutAct_9fa48("2337") ? step !== 3 : stryMutAct_9fa48("2336") ? true : (stryCov_9fa48("2336", "2337"), step === 3)) && <>
              <motion.div variants={itemVariants} className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.inputLabel}>Nova Senha</label>
                </div>
                <div className={styles.inputWrapper}>
                  <input className={styles.inputField} type={showPassword ? stryMutAct_9fa48("2338") ? "" : (stryCov_9fa48("2338"), 'text') : stryMutAct_9fa48("2339") ? "" : (stryCov_9fa48("2339"), 'password')} value={senha} onChange={stryMutAct_9fa48("2340") ? () => undefined : (stryCov_9fa48("2340"), e => setSenha(e.target.value))} placeholder="••••••••" required />
                  <button type="button" className={styles.passwordToggle} onClick={stryMutAct_9fa48("2341") ? () => undefined : (stryCov_9fa48("2341"), () => setShowPassword(stryMutAct_9fa48("2342") ? showPassword : (stryCov_9fa48("2342"), !showPassword)))} aria-label="Mostrar senha">
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
                  <label className={styles.inputLabel}>Confirmar Nova Senha</label>
                </div>
                <div className={styles.inputWrapper}>
                  <input className={styles.inputField} type={showConfirmPassword ? stryMutAct_9fa48("2343") ? "" : (stryCov_9fa48("2343"), 'text') : stryMutAct_9fa48("2344") ? "" : (stryCov_9fa48("2344"), 'password')} value={confirmarSenha} onChange={stryMutAct_9fa48("2345") ? () => undefined : (stryCov_9fa48("2345"), e => setConfirmarSenha(e.target.value))} placeholder="••••••••" required />
                  <button type="button" className={styles.passwordToggle} onClick={stryMutAct_9fa48("2346") ? () => undefined : (stryCov_9fa48("2346"), () => setShowConfirmPassword(stryMutAct_9fa48("2347") ? showConfirmPassword : (stryCov_9fa48("2347"), !showConfirmPassword)))} aria-label="Mostrar confirmação de senha">
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
            </>)}

          <motion.button variants={Object.assign({}, itemVariants, shakeVariants)} animate={isShaking ? stryMutAct_9fa48("2348") ? "" : (stryCov_9fa48("2348"), 'shake') : stryMutAct_9fa48("2349") ? "" : (stryCov_9fa48("2349"), 'visible')} whileHover={stryMutAct_9fa48("2350") ? {} : (stryCov_9fa48("2350"), {
            scale: 1.02
          })} whileTap={stryMutAct_9fa48("2351") ? {} : (stryCov_9fa48("2351"), {
            scale: 0.98
          })} type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? stryMutAct_9fa48("2352") ? "" : (stryCov_9fa48("2352"), 'Processando...') : (stryMutAct_9fa48("2355") ? step !== 3 : stryMutAct_9fa48("2354") ? false : stryMutAct_9fa48("2353") ? true : (stryCov_9fa48("2353", "2354", "2355"), step === 3)) ? stryMutAct_9fa48("2356") ? "" : (stryCov_9fa48("2356"), 'Redefinir Senha') : stryMutAct_9fa48("2357") ? "" : (stryCov_9fa48("2357"), 'Continuar')}{stryMutAct_9fa48("2358") ? "" : (stryCov_9fa48("2358"), ' ')}
            <span>→</span>
          </motion.button>
        </form>

        <motion.p variants={itemVariants} style={stryMutAct_9fa48("2359") ? {} : (stryCov_9fa48("2359"), {
          textAlign: stryMutAct_9fa48("2360") ? "" : (stryCov_9fa48("2360"), 'center'),
          margin: stryMutAct_9fa48("2361") ? "" : (stryCov_9fa48("2361"), '1.5rem 0 0 0'),
          fontSize: stryMutAct_9fa48("2362") ? "" : (stryCov_9fa48("2362"), '0.875rem')
        })}>
          Lembrou a senha?{stryMutAct_9fa48("2363") ? "" : (stryCov_9fa48("2363"), ' ')}
          <Link to="/login" className={styles.forgotLink}>
            Voltar para o Login
          </Link>
        </motion.p>
      </div>
    </AuthLayout>;
  }
}
export default Recovery;