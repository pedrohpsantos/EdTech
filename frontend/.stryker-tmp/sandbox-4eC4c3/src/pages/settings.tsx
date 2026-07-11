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
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import '../assets/settings.css';
import { useAuth } from '../context/authContext';
import { setup2Fa, enable2Fa } from '../services/api';
const Settings: React.FC = () => {
  if (stryMutAct_9fa48("2489")) {
    {}
  } else {
    stryCov_9fa48("2489");
    const {
      user
    } = useAuth();
    const [reviewEmails, setReviewEmails] = useState(stryMutAct_9fa48("2490") ? false : (stryCov_9fa48("2490"), true));
    const [strictLgpd, setStrictLgpd] = useState(stryMutAct_9fa48("2491") ? false : (stryCov_9fa48("2491"), true));
    const [qrCodeUri, setQrCodeUri] = useState<string | null>(null);
    const [totpCode, setTotpCode] = useState(stryMutAct_9fa48("2492") ? "Stryker was here!" : (stryCov_9fa48("2492"), ''));
    const [is2FaEnabled, setIs2FaEnabled] = useState(stryMutAct_9fa48("2495") ? user?.mfaEnabled && false : stryMutAct_9fa48("2494") ? false : stryMutAct_9fa48("2493") ? true : (stryCov_9fa48("2493", "2494", "2495"), (stryMutAct_9fa48("2496") ? user.mfaEnabled : (stryCov_9fa48("2496"), user?.mfaEnabled)) || (stryMutAct_9fa48("2497") ? true : (stryCov_9fa48("2497"), false))));
    const [setupError, setSetupError] = useState(stryMutAct_9fa48("2498") ? "Stryker was here!" : (stryCov_9fa48("2498"), ''));
    const userName = stryMutAct_9fa48("2501") ? user?.name && 'Usuário' : stryMutAct_9fa48("2500") ? false : stryMutAct_9fa48("2499") ? true : (stryCov_9fa48("2499", "2500", "2501"), (stryMutAct_9fa48("2502") ? user.name : (stryCov_9fa48("2502"), user?.name)) || (stryMutAct_9fa48("2503") ? "" : (stryCov_9fa48("2503"), 'Usuário')));
    const userEmail = stryMutAct_9fa48("2506") ? user?.email && 'usuario@edtech.com' : stryMutAct_9fa48("2505") ? false : stryMutAct_9fa48("2504") ? true : (stryCov_9fa48("2504", "2505", "2506"), (stryMutAct_9fa48("2507") ? user.email : (stryCov_9fa48("2507"), user?.email)) || (stryMutAct_9fa48("2508") ? "" : (stryCov_9fa48("2508"), 'usuario@edtech.com')));
    const userInitials = stryMutAct_9fa48("2510") ? userName.split(' ').map((n: string) => n[0]).join('').toUpperCase() : stryMutAct_9fa48("2509") ? userName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toLowerCase() : (stryCov_9fa48("2509", "2510"), userName.split(stryMutAct_9fa48("2511") ? "" : (stryCov_9fa48("2511"), ' ')).map(stryMutAct_9fa48("2512") ? () => undefined : (stryCov_9fa48("2512"), (n: string) => n[0])).join(stryMutAct_9fa48("2513") ? "Stryker was here!" : (stryCov_9fa48("2513"), '')).substring(0, 2).toUpperCase());
    const handleSetup2Fa = async () => {
      if (stryMutAct_9fa48("2514")) {
        {}
      } else {
        stryCov_9fa48("2514");
        setSetupError(stryMutAct_9fa48("2515") ? "Stryker was here!" : (stryCov_9fa48("2515"), ''));
        const res = await setup2Fa();
        if (stryMutAct_9fa48("2518") ? res.sucesso || res.dados : stryMutAct_9fa48("2517") ? false : stryMutAct_9fa48("2516") ? true : (stryCov_9fa48("2516", "2517", "2518"), res.sucesso && res.dados)) {
          if (stryMutAct_9fa48("2519")) {
            {}
          } else {
            stryCov_9fa48("2519");
            setQrCodeUri(res.dados.qrCodeUri);
          }
        } else {
          if (stryMutAct_9fa48("2520")) {
            {}
          } else {
            stryCov_9fa48("2520");
            setSetupError(stryMutAct_9fa48("2523") ? res.mensagem && 'Erro ao gerar QR Code' : stryMutAct_9fa48("2522") ? false : stryMutAct_9fa48("2521") ? true : (stryCov_9fa48("2521", "2522", "2523"), res.mensagem || (stryMutAct_9fa48("2524") ? "" : (stryCov_9fa48("2524"), 'Erro ao gerar QR Code'))));
          }
        }
      }
    };
    const handleEnable2Fa = async () => {
      if (stryMutAct_9fa48("2525")) {
        {}
      } else {
        stryCov_9fa48("2525");
        setSetupError(stryMutAct_9fa48("2526") ? "Stryker was here!" : (stryCov_9fa48("2526"), ''));
        const res = await enable2Fa(totpCode);
        if (stryMutAct_9fa48("2528") ? false : stryMutAct_9fa48("2527") ? true : (stryCov_9fa48("2527", "2528"), res.sucesso)) {
          if (stryMutAct_9fa48("2529")) {
            {}
          } else {
            stryCov_9fa48("2529");
            setIs2FaEnabled(stryMutAct_9fa48("2530") ? false : (stryCov_9fa48("2530"), true));
            setQrCodeUri(null);
            setTotpCode(stryMutAct_9fa48("2531") ? "Stryker was here!" : (stryCov_9fa48("2531"), ''));
          }
        } else {
          if (stryMutAct_9fa48("2532")) {
            {}
          } else {
            stryCov_9fa48("2532");
            setSetupError(stryMutAct_9fa48("2535") ? res.mensagem && 'Código inválido' : stryMutAct_9fa48("2534") ? false : stryMutAct_9fa48("2533") ? true : (stryCov_9fa48("2533", "2534", "2535"), res.mensagem || (stryMutAct_9fa48("2536") ? "" : (stryCov_9fa48("2536"), 'Código inválido'))));
          }
        }
      }
    };
    return <DashboardLayout title="Configurações" subtitle="Perfil, preferências de IA e governança" breadcrumbs={stryMutAct_9fa48("2537") ? [] : (stryCov_9fa48("2537"), [stryMutAct_9fa48("2538") ? "" : (stryCov_9fa48("2538"), 'EdTech'), stryMutAct_9fa48("2539") ? "" : (stryCov_9fa48("2539"), 'Configurações')])}>
      <div className="settings-container">
        {/* Perfil */}
        <div className="settings-card">
          <h3 className="settings-section-title">Perfil</h3>
          <div className="settings-profile-row">
            <div className="settings-avatar">{userInitials}</div>
            <div className="settings-profile-info">
              <span className="profile-name">{userName}</span>
              <span className="profile-email">{userEmail}</span>
            </div>
            <div className="settings-profile-actions">
              <span className="settings-badge-role">Pesquisador</span>
              <button className="btn-outline">Editar perfil</button>
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="settings-card">
          <h3 className="settings-section-title">Notificações</h3>

          <div className="settings-item">
            <div className="settings-item-icon bg-purple-light">
              <i className="bi bi-bell"></i>
            </div>
            <div className="settings-item-content">
              <span className="settings-item-title">E-mails de revisão</span>
              <span className="settings-item-desc">
                Receber e-mail quando documentos forem revisados ou comentados
              </span>
            </div>
            <div className="settings-item-action">
              <label className="ed-switch">
                <input type="checkbox" checked={reviewEmails} onChange={stryMutAct_9fa48("2540") ? () => undefined : (stryCov_9fa48("2540"), e => setReviewEmails(e.target.checked))} />
                <span className="ed-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-item no-border">
            <div className="settings-item-icon bg-purple-light">
              <i className="bi bi-person"></i>
            </div>
            <div className="settings-item-content">
              <span className="settings-item-title">Menções e atribuições</span>
              <span className="settings-item-desc">
                Notificar quando você for mencionado em uma trilha
              </span>
            </div>
            <div className="settings-item-action">
              <span className="settings-badge-active">Ativo</span>
            </div>
          </div>
        </div>

        {/* Segurança e 2FA */}
        <div className="settings-card">
          <h3 className="settings-section-title">Segurança</h3>
          
          <div className="settings-item">
            <div className="settings-item-icon bg-purple-light">
              <i className="bi bi-shield-lock"></i>
            </div>
            <div className="settings-item-content">
              <span className="settings-item-title">Autenticação de Dois Fatores (2FA)</span>
              <span className="settings-item-desc">
                {is2FaEnabled ? stryMutAct_9fa48("2541") ? "" : (stryCov_9fa48("2541"), "Sua conta está protegida com 2FA.") : stryMutAct_9fa48("2542") ? "" : (stryCov_9fa48("2542"), "Adicione uma camada extra de segurança com o Google Authenticator.")}
              </span>
            </div>
            <div className="settings-item-action">
              {is2FaEnabled ? <span className="settings-badge-active">Ativado</span> : <button className="btn-primary" onClick={handleSetup2Fa} disabled={stryMutAct_9fa48("2545") ? qrCodeUri === null : stryMutAct_9fa48("2544") ? false : stryMutAct_9fa48("2543") ? true : (stryCov_9fa48("2543", "2544", "2545"), qrCodeUri !== null)}>
                  Configurar 2FA
                </button>}
            </div>
          </div>

          {stryMutAct_9fa48("2548") ? qrCodeUri && !is2FaEnabled || <div className="settings-item no-border" style={{
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
              <div style={{
              marginTop: '1rem',
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
                <p style={{
                marginBottom: '1rem',
                fontWeight: 500
              }}>
                  1. Escaneie este QR Code no seu aplicativo Autenticador
                </p>
                <img src={qrCodeUri} alt="QR Code 2FA" style={{
                width: '200px',
                height: '200px',
                marginBottom: '1rem'
              }} />
                
                <p style={{
                marginBottom: '1rem',
                fontWeight: 500
              }}>
                  2. Insira o código de 6 dígitos gerado
                </p>
                <div style={{
                display: 'flex',
                gap: '0.5rem',
                width: '100%',
                maxWidth: '300px'
              }}>
                  <input type="text" className="ed-input" placeholder="000000" maxLength={6} value={totpCode} onChange={e => setTotpCode(e.target.value.replace(/\D/g, ''))} />
                  <button className="btn-primary" onClick={handleEnable2Fa} disabled={totpCode.length !== 6}>
                    Ativar
                  </button>
                </div>
                {setupError && <p style={{
                color: '#d32f2f',
                marginTop: '0.5rem',
                fontSize: '0.875rem'
              }}>{setupError}</p>}
              </div>
            </div> : stryMutAct_9fa48("2547") ? false : stryMutAct_9fa48("2546") ? true : (stryCov_9fa48("2546", "2547", "2548"), (stryMutAct_9fa48("2550") ? qrCodeUri || !is2FaEnabled : stryMutAct_9fa48("2549") ? true : (stryCov_9fa48("2549", "2550"), qrCodeUri && (stryMutAct_9fa48("2551") ? is2FaEnabled : (stryCov_9fa48("2551"), !is2FaEnabled)))) && <div className="settings-item no-border" style={stryMutAct_9fa48("2552") ? {} : (stryCov_9fa48("2552"), {
            flexDirection: stryMutAct_9fa48("2553") ? "" : (stryCov_9fa48("2553"), 'column'),
            alignItems: stryMutAct_9fa48("2554") ? "" : (stryCov_9fa48("2554"), 'flex-start')
          })}>
              <div style={stryMutAct_9fa48("2555") ? {} : (stryCov_9fa48("2555"), {
              marginTop: stryMutAct_9fa48("2556") ? "" : (stryCov_9fa48("2556"), '1rem'),
              padding: stryMutAct_9fa48("2557") ? "" : (stryCov_9fa48("2557"), '1rem'),
              border: stryMutAct_9fa48("2558") ? "" : (stryCov_9fa48("2558"), '1px solid #ddd'),
              borderRadius: stryMutAct_9fa48("2559") ? "" : (stryCov_9fa48("2559"), '8px'),
              width: stryMutAct_9fa48("2560") ? "" : (stryCov_9fa48("2560"), '100%'),
              display: stryMutAct_9fa48("2561") ? "" : (stryCov_9fa48("2561"), 'flex'),
              flexDirection: stryMutAct_9fa48("2562") ? "" : (stryCov_9fa48("2562"), 'column'),
              alignItems: stryMutAct_9fa48("2563") ? "" : (stryCov_9fa48("2563"), 'center')
            })}>
                <p style={stryMutAct_9fa48("2564") ? {} : (stryCov_9fa48("2564"), {
                marginBottom: stryMutAct_9fa48("2565") ? "" : (stryCov_9fa48("2565"), '1rem'),
                fontWeight: 500
              })}>
                  1. Escaneie este QR Code no seu aplicativo Autenticador
                </p>
                <img src={qrCodeUri} alt="QR Code 2FA" style={stryMutAct_9fa48("2566") ? {} : (stryCov_9fa48("2566"), {
                width: stryMutAct_9fa48("2567") ? "" : (stryCov_9fa48("2567"), '200px'),
                height: stryMutAct_9fa48("2568") ? "" : (stryCov_9fa48("2568"), '200px'),
                marginBottom: stryMutAct_9fa48("2569") ? "" : (stryCov_9fa48("2569"), '1rem')
              })} />
                
                <p style={stryMutAct_9fa48("2570") ? {} : (stryCov_9fa48("2570"), {
                marginBottom: stryMutAct_9fa48("2571") ? "" : (stryCov_9fa48("2571"), '1rem'),
                fontWeight: 500
              })}>
                  2. Insira o código de 6 dígitos gerado
                </p>
                <div style={stryMutAct_9fa48("2572") ? {} : (stryCov_9fa48("2572"), {
                display: stryMutAct_9fa48("2573") ? "" : (stryCov_9fa48("2573"), 'flex'),
                gap: stryMutAct_9fa48("2574") ? "" : (stryCov_9fa48("2574"), '0.5rem'),
                width: stryMutAct_9fa48("2575") ? "" : (stryCov_9fa48("2575"), '100%'),
                maxWidth: stryMutAct_9fa48("2576") ? "" : (stryCov_9fa48("2576"), '300px')
              })}>
                  <input type="text" className="ed-input" placeholder="000000" maxLength={6} value={totpCode} onChange={stryMutAct_9fa48("2577") ? () => undefined : (stryCov_9fa48("2577"), e => setTotpCode(e.target.value.replace(stryMutAct_9fa48("2578") ? /\d/g : (stryCov_9fa48("2578"), /\D/g), stryMutAct_9fa48("2579") ? "Stryker was here!" : (stryCov_9fa48("2579"), ''))))} />
                  <button className="btn-primary" onClick={handleEnable2Fa} disabled={stryMutAct_9fa48("2582") ? totpCode.length === 6 : stryMutAct_9fa48("2581") ? false : stryMutAct_9fa48("2580") ? true : (stryCov_9fa48("2580", "2581", "2582"), totpCode.length !== 6)}>
                    Ativar
                  </button>
                </div>
                {stryMutAct_9fa48("2585") ? setupError || <p style={{
                color: '#d32f2f',
                marginTop: '0.5rem',
                fontSize: '0.875rem'
              }}>{setupError}</p> : stryMutAct_9fa48("2584") ? false : stryMutAct_9fa48("2583") ? true : (stryCov_9fa48("2583", "2584", "2585"), setupError && <p style={stryMutAct_9fa48("2586") ? {} : (stryCov_9fa48("2586"), {
                color: stryMutAct_9fa48("2587") ? "" : (stryCov_9fa48("2587"), '#d32f2f'),
                marginTop: stryMutAct_9fa48("2588") ? "" : (stryCov_9fa48("2588"), '0.5rem'),
                fontSize: stryMutAct_9fa48("2589") ? "" : (stryCov_9fa48("2589"), '0.875rem')
              })}>{setupError}</p>)}
              </div>
            </div>)}
        </div>

        {/* Governança */}
        <div className="settings-card">
          <h3 className="settings-section-title">Governança</h3>

          <div className="settings-item no-border">
            <div className="settings-item-icon bg-purple-light">
              <i className="bi bi-shield-check"></i>
            </div>
            <div className="settings-item-content">
              <span className="settings-item-title">Modo LGPD estrito</span>
              <span className="settings-item-desc">
                Bloquear submissões com dados pessoais não anonimizados
              </span>
            </div>
            <div className="settings-item-action">
              <label className="ed-switch">
                <input type="checkbox" checked={strictLgpd} onChange={stryMutAct_9fa48("2590") ? () => undefined : (stryCov_9fa48("2590"), e => setStrictLgpd(e.target.checked))} />
                <span className="ed-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>;
  }
};
export default Settings;