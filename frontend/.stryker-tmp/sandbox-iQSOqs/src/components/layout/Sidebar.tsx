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
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import '../../assets/dashboard.css';
const Sidebar: React.FC = () => {
  if (stryMutAct_9fa48("371")) {
    {}
  } else {
    stryCov_9fa48("371");
    const {
      user,
      handleLogout
    } = useAuth();
    const [clickCount, setClickCount] = useState(0);
    // Estado para controlar a abertura do menu no mobile
    const [isMobileOpen, setIsMobileOpen] = useState(stryMutAct_9fa48("372") ? true : (stryCov_9fa48("372"), false));
    const handleLogoClick = () => {
      if (stryMutAct_9fa48("373")) {
        {}
      } else {
        stryCov_9fa48("373");
        const newCount = stryMutAct_9fa48("374") ? clickCount - 1 : (stryCov_9fa48("374"), clickCount + 1);
        setClickCount(newCount);
        if (stryMutAct_9fa48("377") ? newCount !== 7 : stryMutAct_9fa48("376") ? false : stryMutAct_9fa48("375") ? true : (stryCov_9fa48("375", "376", "377"), newCount === 7)) {
          if (stryMutAct_9fa48("378")) {
            {}
          } else {
            stryCov_9fa48("378");
            alert(stryMutAct_9fa48("379") ? "" : (stryCov_9fa48("379"), '🎉 Easter Egg Encontrado! Bem-vindo ao laboratório secreto da EdTech AILAB Makers!'));
            setClickCount(0);
          }
        }
      }
    };

    // Função auxiliar para fechar a barra ao clicar em uma rota (experiência Mobile fluida)
    const closeMobileSidebar = () => {
      if (stryMutAct_9fa48("380")) {
        {}
      } else {
        stryCov_9fa48("380");
        setIsMobileOpen(stryMutAct_9fa48("381") ? true : (stryCov_9fa48("381"), false));
      }
    };
    return <>
      {/* Botão Hambúrguer flutuante: Visível APENAS em telas menores (Mobile/Tablet) */}
      <button className={stryMutAct_9fa48("382") ? `` : (stryCov_9fa48("382"), `sidebar-mobile-toggle d-md-none ${isMobileOpen ? stryMutAct_9fa48("383") ? "" : (stryCov_9fa48("383"), 'open') : stryMutAct_9fa48("384") ? "Stryker was here!" : (stryCov_9fa48("384"), '')}`)} onClick={stryMutAct_9fa48("385") ? () => undefined : (stryCov_9fa48("385"), () => setIsMobileOpen(stryMutAct_9fa48("386") ? isMobileOpen : (stryCov_9fa48("386"), !isMobileOpen)))} aria-label="Toggle Navigation">
        <i className={stryMutAct_9fa48("387") ? `` : (stryCov_9fa48("387"), `bi ${isMobileOpen ? stryMutAct_9fa48("388") ? "" : (stryCov_9fa48("388"), 'bi-x-lg') : stryMutAct_9fa48("389") ? "" : (stryCov_9fa48("389"), 'bi-list')}`)}></i>
      </button>

      {/* Backdrop (Fundo escurecido) para fechar o menu ao clicar fora dele no mobile */}
      {stryMutAct_9fa48("392") ? isMobileOpen || <div className="sidebar-backdrop d-md-none" onClick={closeMobileSidebar} /> : stryMutAct_9fa48("391") ? false : stryMutAct_9fa48("390") ? true : (stryCov_9fa48("390", "391", "392"), isMobileOpen && <div className="sidebar-backdrop d-md-none" onClick={closeMobileSidebar} />)}

      {/* Aside com a classe condicional 'active-mobile' se o estado for true */}
      <aside className={stryMutAct_9fa48("393") ? `` : (stryCov_9fa48("393"), `sidebar-container ${isMobileOpen ? stryMutAct_9fa48("394") ? "" : (stryCov_9fa48("394"), 'active-mobile') : stryMutAct_9fa48("395") ? "Stryker was here!" : (stryCov_9fa48("395"), '')}`)}>
        <div className="sidebar-header">
          <div className="logo-section" onClick={handleLogoClick} style={stryMutAct_9fa48("396") ? {} : (stryCov_9fa48("396"), {
            cursor: stryMutAct_9fa48("397") ? "" : (stryCov_9fa48("397"), 'pointer')
          })}>
            <svg width="32" height="32" viewBox="0 0 100 100" style={stryMutAct_9fa48("398") ? {} : (stryCov_9fa48("398"), {
              marginRight: stryMutAct_9fa48("399") ? "" : (stryCov_9fa48("399"), '8px')
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
            <span className="logo-text">EdTech</span>
          </div>
          <div className="role-badge">
            <span className="badge-dot"></span>
            {(stryMutAct_9fa48("402") ? user?.role !== 'ADVISOR' : stryMutAct_9fa48("401") ? false : stryMutAct_9fa48("400") ? true : (stryCov_9fa48("400", "401", "402"), (stryMutAct_9fa48("403") ? user.role : (stryCov_9fa48("403"), user?.role)) === (stryMutAct_9fa48("404") ? "" : (stryCov_9fa48("404"), 'ADVISOR')))) ? stryMutAct_9fa48("405") ? "" : (stryCov_9fa48("405"), 'ORIENTADOR') : (stryMutAct_9fa48("408") ? user?.role !== 'AUDITOR' : stryMutAct_9fa48("407") ? false : stryMutAct_9fa48("406") ? true : (stryCov_9fa48("406", "407", "408"), (stryMutAct_9fa48("409") ? user.role : (stryCov_9fa48("409"), user?.role)) === (stryMutAct_9fa48("410") ? "" : (stryCov_9fa48("410"), 'AUDITOR')))) ? stryMutAct_9fa48("411") ? "" : (stryCov_9fa48("411"), 'AUDITOR') : stryMutAct_9fa48("412") ? "" : (stryCov_9fa48("412"), 'PESQUISADOR')}
          </div>
        </div>

        <div className="sidebar-scrollable">
          <div className="nav-section">
            <span className="nav-section-title">GERAL</span>
            <div className="nav-links">
              <NavLink to="/dashboard" className={stryMutAct_9fa48("413") ? () => undefined : (stryCov_9fa48("413"), ({
                isActive
              }) => stryMutAct_9fa48("414") ? `` : (stryCov_9fa48("414"), `nav-link-item ${isActive ? stryMutAct_9fa48("415") ? "" : (stryCov_9fa48("415"), 'active') : stryMutAct_9fa48("416") ? "Stryker was here!" : (stryCov_9fa48("416"), '')}`))} onClick={closeMobileSidebar}>
                <i className="bi bi-grid-1x2"></i> Visão Geral
                <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
              </NavLink>
              {stryMutAct_9fa48("419") ? user?.role === 'RESEARCHER' || <>
                  <NavLink to="/documentos" className={({
                  isActive
                }) => `nav-link-item ${isActive ? 'active' : ''}`} onClick={closeMobileSidebar}>
                    <i className="bi bi-folder2-open"></i> Área de Pesquisa
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                  <NavLink to="/projects" className={({
                  isActive
                }) => `nav-link-item ${isActive ? 'active' : ''}`} onClick={closeMobileSidebar}>
                    <i className="bi bi-briefcase"></i> Projetos
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                </> : stryMutAct_9fa48("418") ? false : stryMutAct_9fa48("417") ? true : (stryCov_9fa48("417", "418", "419"), (stryMutAct_9fa48("421") ? user?.role !== 'RESEARCHER' : stryMutAct_9fa48("420") ? true : (stryCov_9fa48("420", "421"), (stryMutAct_9fa48("422") ? user.role : (stryCov_9fa48("422"), user?.role)) === (stryMutAct_9fa48("423") ? "" : (stryCov_9fa48("423"), 'RESEARCHER')))) && <>
                  <NavLink to="/documentos" className={stryMutAct_9fa48("424") ? () => undefined : (stryCov_9fa48("424"), ({
                  isActive
                }) => stryMutAct_9fa48("425") ? `` : (stryCov_9fa48("425"), `nav-link-item ${isActive ? stryMutAct_9fa48("426") ? "" : (stryCov_9fa48("426"), 'active') : stryMutAct_9fa48("427") ? "Stryker was here!" : (stryCov_9fa48("427"), '')}`))} onClick={closeMobileSidebar}>
                    <i className="bi bi-folder2-open"></i> Área de Pesquisa
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                  <NavLink to="/projects" className={stryMutAct_9fa48("428") ? () => undefined : (stryCov_9fa48("428"), ({
                  isActive
                }) => stryMutAct_9fa48("429") ? `` : (stryCov_9fa48("429"), `nav-link-item ${isActive ? stryMutAct_9fa48("430") ? "" : (stryCov_9fa48("430"), 'active') : stryMutAct_9fa48("431") ? "Stryker was here!" : (stryCov_9fa48("431"), '')}`))} onClick={closeMobileSidebar}>
                    <i className="bi bi-briefcase"></i> Projetos
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                </>)}
              {stryMutAct_9fa48("434") ? user?.role === 'ADVISOR' || <NavLink to="/submissions" className={({
                isActive
              }) => `nav-link-item ${isActive ? 'active' : ''}`} onClick={closeMobileSidebar}>
                  <i className="bi bi-play-circle"></i> Submissões
                  <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                </NavLink> : stryMutAct_9fa48("433") ? false : stryMutAct_9fa48("432") ? true : (stryCov_9fa48("432", "433", "434"), (stryMutAct_9fa48("436") ? user?.role !== 'ADVISOR' : stryMutAct_9fa48("435") ? true : (stryCov_9fa48("435", "436"), (stryMutAct_9fa48("437") ? user.role : (stryCov_9fa48("437"), user?.role)) === (stryMutAct_9fa48("438") ? "" : (stryCov_9fa48("438"), 'ADVISOR')))) && <NavLink to="/submissions" className={stryMutAct_9fa48("439") ? () => undefined : (stryCov_9fa48("439"), ({
                isActive
              }) => stryMutAct_9fa48("440") ? `` : (stryCov_9fa48("440"), `nav-link-item ${isActive ? stryMutAct_9fa48("441") ? "" : (stryCov_9fa48("441"), 'active') : stryMutAct_9fa48("442") ? "Stryker was here!" : (stryCov_9fa48("442"), '')}`))} onClick={closeMobileSidebar}>
                  <i className="bi bi-play-circle"></i> Submissões
                  <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                </NavLink>)}
            </div>
          </div>

          {stryMutAct_9fa48("445") ? user?.role !== 'AUDITOR' || <div className="nav-section">
              <span className="nav-section-title">INTELIGÊNCIA</span>
              <div className="nav-links">
                <NavLink to="/trail" className={({
                isActive
              }) => `nav-link-item ${isActive ? 'active' : ''}`} onClick={closeMobileSidebar}>
                  <i className="bi bi-diagram-3"></i> Trilha de Pesquisa
                  <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                </NavLink>
                {user?.role === 'ADVISOR' && <NavLink to="/analytics" className={({
                isActive
              }) => `nav-link-item ${isActive ? 'active' : ''}`} onClick={closeMobileSidebar}>
                    <i className="bi bi-graph-up-arrow"></i> Análises
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>}
              </div>
            </div> : stryMutAct_9fa48("444") ? false : stryMutAct_9fa48("443") ? true : (stryCov_9fa48("443", "444", "445"), (stryMutAct_9fa48("447") ? user?.role === 'AUDITOR' : stryMutAct_9fa48("446") ? true : (stryCov_9fa48("446", "447"), (stryMutAct_9fa48("448") ? user.role : (stryCov_9fa48("448"), user?.role)) !== (stryMutAct_9fa48("449") ? "" : (stryCov_9fa48("449"), 'AUDITOR')))) && <div className="nav-section">
              <span className="nav-section-title">INTELIGÊNCIA</span>
              <div className="nav-links">
                <NavLink to="/trail" className={stryMutAct_9fa48("450") ? () => undefined : (stryCov_9fa48("450"), ({
                isActive
              }) => stryMutAct_9fa48("451") ? `` : (stryCov_9fa48("451"), `nav-link-item ${isActive ? stryMutAct_9fa48("452") ? "" : (stryCov_9fa48("452"), 'active') : stryMutAct_9fa48("453") ? "Stryker was here!" : (stryCov_9fa48("453"), '')}`))} onClick={closeMobileSidebar}>
                  <i className="bi bi-diagram-3"></i> Trilha de Pesquisa
                  <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                </NavLink>
                {stryMutAct_9fa48("456") ? user?.role === 'ADVISOR' || <NavLink to="/analytics" className={({
                isActive
              }) => `nav-link-item ${isActive ? 'active' : ''}`} onClick={closeMobileSidebar}>
                    <i className="bi bi-graph-up-arrow"></i> Análises
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink> : stryMutAct_9fa48("455") ? false : stryMutAct_9fa48("454") ? true : (stryCov_9fa48("454", "455", "456"), (stryMutAct_9fa48("458") ? user?.role !== 'ADVISOR' : stryMutAct_9fa48("457") ? true : (stryCov_9fa48("457", "458"), (stryMutAct_9fa48("459") ? user.role : (stryCov_9fa48("459"), user?.role)) === (stryMutAct_9fa48("460") ? "" : (stryCov_9fa48("460"), 'ADVISOR')))) && <NavLink to="/analytics" className={stryMutAct_9fa48("461") ? () => undefined : (stryCov_9fa48("461"), ({
                isActive
              }) => stryMutAct_9fa48("462") ? `` : (stryCov_9fa48("462"), `nav-link-item ${isActive ? stryMutAct_9fa48("463") ? "" : (stryCov_9fa48("463"), 'active') : stryMutAct_9fa48("464") ? "Stryker was here!" : (stryCov_9fa48("464"), '')}`))} onClick={closeMobileSidebar}>
                    <i className="bi bi-graph-up-arrow"></i> Análises
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>)}
              </div>
            </div>)}

          <div className="nav-section">
            <span className="nav-section-title">GOVERNANÇA</span>
            <div className="nav-links">
              {stryMutAct_9fa48("467") ? user?.role === 'AUDITOR' || <>
                  <NavLink to="/compliance-center" className={({
                  isActive
                }) => `nav-link-item ${isActive ? 'active' : ''}`} onClick={closeMobileSidebar}>
                    <i className="bi bi-shield-check"></i> Centro de Conformidade
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                  <NavLink to="/audit-logs" className={({
                  isActive
                }) => `nav-link-item ${isActive ? 'active' : ''}`} onClick={closeMobileSidebar}>
                    <i className="bi bi-journal-text"></i> Logs de Auditoria
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                </> : stryMutAct_9fa48("466") ? false : stryMutAct_9fa48("465") ? true : (stryCov_9fa48("465", "466", "467"), (stryMutAct_9fa48("469") ? user?.role !== 'AUDITOR' : stryMutAct_9fa48("468") ? true : (stryCov_9fa48("468", "469"), (stryMutAct_9fa48("470") ? user.role : (stryCov_9fa48("470"), user?.role)) === (stryMutAct_9fa48("471") ? "" : (stryCov_9fa48("471"), 'AUDITOR')))) && <>
                  <NavLink to="/compliance-center" className={stryMutAct_9fa48("472") ? () => undefined : (stryCov_9fa48("472"), ({
                  isActive
                }) => stryMutAct_9fa48("473") ? `` : (stryCov_9fa48("473"), `nav-link-item ${isActive ? stryMutAct_9fa48("474") ? "" : (stryCov_9fa48("474"), 'active') : stryMutAct_9fa48("475") ? "Stryker was here!" : (stryCov_9fa48("475"), '')}`))} onClick={closeMobileSidebar}>
                    <i className="bi bi-shield-check"></i> Centro de Conformidade
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                  <NavLink to="/audit-logs" className={stryMutAct_9fa48("476") ? () => undefined : (stryCov_9fa48("476"), ({
                  isActive
                }) => stryMutAct_9fa48("477") ? `` : (stryCov_9fa48("477"), `nav-link-item ${isActive ? stryMutAct_9fa48("478") ? "" : (stryCov_9fa48("478"), 'active') : stryMutAct_9fa48("479") ? "Stryker was here!" : (stryCov_9fa48("479"), '')}`))} onClick={closeMobileSidebar}>
                    <i className="bi bi-journal-text"></i> Logs de Auditoria
                    <i className="bi bi-chevron-right arrow-icon ms-auto"></i>
                  </NavLink>
                </>)}
              <NavLink to="/settings" className={stryMutAct_9fa48("480") ? () => undefined : (stryCov_9fa48("480"), ({
                isActive
              }) => stryMutAct_9fa48("481") ? `` : (stryCov_9fa48("481"), `nav-link-item ${isActive ? stryMutAct_9fa48("482") ? "" : (stryCov_9fa48("482"), 'active') : stryMutAct_9fa48("483") ? "Stryker was here!" : (stryCov_9fa48("483"), '')}`))} onClick={closeMobileSidebar}>
                <i className="bi bi-gear"></i> Configurações
              </NavLink>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">{stryMutAct_9fa48("486") ? user?.name?.substring(0, 2).toUpperCase() && 'RS' : stryMutAct_9fa48("485") ? false : stryMutAct_9fa48("484") ? true : (stryCov_9fa48("484", "485", "486"), (stryMutAct_9fa48("490") ? user.name?.substring(0, 2).toUpperCase() : stryMutAct_9fa48("489") ? user?.name.substring(0, 2).toUpperCase() : stryMutAct_9fa48("488") ? user?.name.toUpperCase() : stryMutAct_9fa48("487") ? user?.name?.substring(0, 2).toLowerCase() : (stryCov_9fa48("487", "488", "489", "490"), user?.name?.substring(0, 2).toUpperCase())) || (stryMutAct_9fa48("491") ? "" : (stryCov_9fa48("491"), 'RS')))}</div>
            <div className="user-info">
              <span className="user-name">{stryMutAct_9fa48("494") ? user?.name && 'Dra. Renata Silva' : stryMutAct_9fa48("493") ? false : stryMutAct_9fa48("492") ? true : (stryCov_9fa48("492", "493", "494"), (stryMutAct_9fa48("495") ? user.name : (stryCov_9fa48("495"), user?.name)) || (stryMutAct_9fa48("496") ? "" : (stryCov_9fa48("496"), 'Dra. Renata Silva')))}</span>
              <span className="user-email">{stryMutAct_9fa48("499") ? user?.email && 'renata.silva@usp.br' : stryMutAct_9fa48("498") ? false : stryMutAct_9fa48("497") ? true : (stryCov_9fa48("497", "498", "499"), (stryMutAct_9fa48("500") ? user.email : (stryCov_9fa48("500"), user?.email)) || (stryMutAct_9fa48("501") ? "" : (stryCov_9fa48("501"), 'renata.silva@usp.br')))}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Sair">
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>
      </aside>
    </>;
  }
};
export default Sidebar;