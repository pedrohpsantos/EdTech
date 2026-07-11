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
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import ThemeToggle from '../themeToggle';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
interface TopbarProps {
  title: string;
  subtitle: string;
  breadcrumbs: string[];
  customTopbarElement?: React.ReactNode;
}
const Topbar: React.FC<TopbarProps> = ({
  title,
  subtitle,
  breadcrumbs,
  customTopbarElement
}) => {
  if (stryMutAct_9fa48("502")) {
    {}
  } else {
    stryCov_9fa48("502");
    const {
      user
    } = useAuth();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(stryMutAct_9fa48("503") ? true : (stryCov_9fa48("503"), false));
    const [notifications, setNotifications] = useState<any[]>(stryMutAct_9fa48("504") ? ["Stryker was here"] : (stryCov_9fa48("504"), []));
    useEffect(() => {
      if (stryMutAct_9fa48("505")) {
        {}
      } else {
        stryCov_9fa48("505");
        if (stryMutAct_9fa48("508") ? false : stryMutAct_9fa48("507") ? true : stryMutAct_9fa48("506") ? user : (stryCov_9fa48("506", "507", "508"), !user)) return;
        const token = localStorage.getItem(stryMutAct_9fa48("509") ? "" : (stryCov_9fa48("509"), 'token'));
        const socket = new SockJS((stryMutAct_9fa48("512") ? import.meta.env.VITE_API_URL && '' : stryMutAct_9fa48("511") ? false : stryMutAct_9fa48("510") ? true : (stryCov_9fa48("510", "511", "512"), import.meta.env.VITE_API_URL || (stryMutAct_9fa48("513") ? "Stryker was here!" : (stryCov_9fa48("513"), '')))) + (stryMutAct_9fa48("514") ? "" : (stryCov_9fa48("514"), '/ws-edtech')));
        const stompClient = new Client(stryMutAct_9fa48("515") ? {} : (stryCov_9fa48("515"), {
          webSocketFactory: stryMutAct_9fa48("516") ? () => undefined : (stryCov_9fa48("516"), () => socket),
          connectHeaders: stryMutAct_9fa48("517") ? {} : (stryCov_9fa48("517"), {
            Authorization: stryMutAct_9fa48("518") ? `` : (stryCov_9fa48("518"), `Bearer ${token}`)
          }),
          onConnect: () => {
            if (stryMutAct_9fa48("519")) {
              {}
            } else {
              stryCov_9fa48("519");
              // Inscricao para o topico global
              stompClient.subscribe(stryMutAct_9fa48("520") ? "" : (stryCov_9fa48("520"), '/topic/global'), msg => {
                if (stryMutAct_9fa48("521")) {
                  {}
                } else {
                  stryCov_9fa48("521");
                  if (stryMutAct_9fa48("523") ? false : stryMutAct_9fa48("522") ? true : (stryCov_9fa48("522", "523"), msg.body)) {
                    if (stryMutAct_9fa48("524")) {
                      {}
                    } else {
                      stryCov_9fa48("524");
                      const payload = JSON.parse(msg.body);
                      setNotifications(stryMutAct_9fa48("525") ? () => undefined : (stryCov_9fa48("525"), prev => stryMutAct_9fa48("526") ? [] : (stryCov_9fa48("526"), [payload, ...prev])));
                    }
                  }
                }
              });

              // Opcional: Se for possivel descobrir o project_id, poderia se inscrever aqui tambem.
              // Simulando a inscricao para o usuario logado
              stompClient.subscribe(stryMutAct_9fa48("527") ? `` : (stryCov_9fa48("527"), `/user/${user.id}/queue/notifications`), msg => {
                if (stryMutAct_9fa48("528")) {
                  {}
                } else {
                  stryCov_9fa48("528");
                  if (stryMutAct_9fa48("530") ? false : stryMutAct_9fa48("529") ? true : (stryCov_9fa48("529", "530"), msg.body)) {
                    if (stryMutAct_9fa48("531")) {
                      {}
                    } else {
                      stryCov_9fa48("531");
                      const payload = JSON.parse(msg.body);
                      setNotifications(stryMutAct_9fa48("532") ? () => undefined : (stryCov_9fa48("532"), prev => stryMutAct_9fa48("533") ? [] : (stryCov_9fa48("533"), [payload, ...prev])));
                    }
                  }
                }
              });
            }
          },
          onStompError: frame => {
            if (stryMutAct_9fa48("534")) {
              {}
            } else {
              stryCov_9fa48("534");
              console.error((stryMutAct_9fa48("535") ? "" : (stryCov_9fa48("535"), 'Broker reported error: ')) + frame.headers[stryMutAct_9fa48("536") ? "" : (stryCov_9fa48("536"), 'message')]);
              console.error((stryMutAct_9fa48("537") ? "" : (stryCov_9fa48("537"), 'Additional details: ')) + frame.body);
            }
          }
        }));
        stompClient.activate();
        return () => {
          if (stryMutAct_9fa48("538")) {
            {}
          } else {
            stryCov_9fa48("538");
            stompClient.deactivate();
          }
        };
      }
    }, stryMutAct_9fa48("539") ? [] : (stryCov_9fa48("539"), [user]));
    return <header className="topbar-container">
      <div className="topbar-left">
        {stryMutAct_9fa48("542") ? breadcrumbs || <div className="breadcrumbs">
            {breadcrumbs.map((crumb, index) => <span key={index}>
                {index > 0 && <span className="breadcrumb-separator">
                    <i className="bi bi-chevron-right"></i>
                  </span>}
                {index === 0 ? <span className="breadcrumb-item" onClick={() => navigate('/dashboard')} style={{
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}>
                    {crumb}
                  </span> : <span className="breadcrumb-item active">{crumb}</span>}
              </span>)}
          </div> : stryMutAct_9fa48("541") ? false : stryMutAct_9fa48("540") ? true : (stryCov_9fa48("540", "541", "542"), breadcrumbs && <div className="breadcrumbs">
            {breadcrumbs.map(stryMutAct_9fa48("543") ? () => undefined : (stryCov_9fa48("543"), (crumb, index) => <span key={index}>
                {stryMutAct_9fa48("546") ? index > 0 || <span className="breadcrumb-separator">
                    <i className="bi bi-chevron-right"></i>
                  </span> : stryMutAct_9fa48("545") ? false : stryMutAct_9fa48("544") ? true : (stryCov_9fa48("544", "545", "546"), (stryMutAct_9fa48("549") ? index <= 0 : stryMutAct_9fa48("548") ? index >= 0 : stryMutAct_9fa48("547") ? true : (stryCov_9fa48("547", "548", "549"), index > 0)) && <span className="breadcrumb-separator">
                    <i className="bi bi-chevron-right"></i>
                  </span>)}
                {(stryMutAct_9fa48("552") ? index !== 0 : stryMutAct_9fa48("551") ? false : stryMutAct_9fa48("550") ? true : (stryCov_9fa48("550", "551", "552"), index === 0)) ? <span className="breadcrumb-item" onClick={stryMutAct_9fa48("553") ? () => undefined : (stryCov_9fa48("553"), () => navigate(stryMutAct_9fa48("554") ? "" : (stryCov_9fa48("554"), '/dashboard')))} style={stryMutAct_9fa48("555") ? {} : (stryCov_9fa48("555"), {
              cursor: stryMutAct_9fa48("556") ? "" : (stryCov_9fa48("556"), 'pointer'),
              transition: stryMutAct_9fa48("557") ? "" : (stryCov_9fa48("557"), 'color 0.2s')
            })}>
                    {crumb}
                  </span> : <span className="breadcrumb-item active">{crumb}</span>}
              </span>))}
          </div>)}
        <h1 className="page-title">{title}</h1>
        {stryMutAct_9fa48("560") ? subtitle || <p className="page-subtitle">{subtitle}</p> : stryMutAct_9fa48("559") ? false : stryMutAct_9fa48("558") ? true : (stryCov_9fa48("558", "559", "560"), subtitle && <p className="page-subtitle">{subtitle}</p>)}
      </div>
      <div className="topbar-right">
        {customTopbarElement ? customTopbarElement : (stryMutAct_9fa48("563") ? user?.role !== 'RESEARCHER' : stryMutAct_9fa48("562") ? false : stryMutAct_9fa48("561") ? true : (stryCov_9fa48("561", "562", "563"), (stryMutAct_9fa48("564") ? user.role : (stryCov_9fa48("564"), user?.role)) === (stryMutAct_9fa48("565") ? "" : (stryCov_9fa48("565"), 'RESEARCHER')))) ? <button className="btn-upload" onClick={stryMutAct_9fa48("566") ? () => undefined : (stryCov_9fa48("566"), () => navigate(stryMutAct_9fa48("567") ? "" : (stryCov_9fa48("567"), '/upload')))}>
            <i className="bi bi-upload"></i> Enviar documento
          </button> : null}
        <div className="topbar-actions">
          <div className="action-icon-wrapper">
            <ThemeToggle />
          </div>
          <div className="action-icon-wrapper notification-icon" style={stryMutAct_9fa48("568") ? {} : (stryCov_9fa48("568"), {
            position: stryMutAct_9fa48("569") ? "" : (stryCov_9fa48("569"), 'relative'),
            cursor: stryMutAct_9fa48("570") ? "" : (stryCov_9fa48("570"), 'pointer')
          })} onClick={stryMutAct_9fa48("571") ? () => undefined : (stryCov_9fa48("571"), () => setShowNotifications(stryMutAct_9fa48("572") ? showNotifications : (stryCov_9fa48("572"), !showNotifications)))}>
            <i className="bi bi-bell"></i>
            {stryMutAct_9fa48("575") ? notifications.length > 0 || <span className="notification-dot"></span> : stryMutAct_9fa48("574") ? false : stryMutAct_9fa48("573") ? true : (stryCov_9fa48("573", "574", "575"), (stryMutAct_9fa48("578") ? notifications.length <= 0 : stryMutAct_9fa48("577") ? notifications.length >= 0 : stryMutAct_9fa48("576") ? true : (stryCov_9fa48("576", "577", "578"), notifications.length > 0)) && <span className="notification-dot"></span>)}

            {stryMutAct_9fa48("581") ? showNotifications || <div className="notifications-dropdown" onClick={e => e.stopPropagation()}>
                <div className="dropdown-header">
                  <h4>Notificações</h4>
                </div>
                <div className="dropdown-body">
                  {notifications.length === 0 ? <div className="notification-item">
                      <div className="notification-text">
                        <p>Nenhuma notificação nova.</p>
                      </div>
                    </div> : notifications.map((notif, idx) => <div className="notification-item" key={idx}>
                        <div className="notification-icon-circle bg-purple-light">
                          <i className="bi bi-info-circle"></i>
                        </div>
                        <div className="notification-text">
                          <p>
                            {notif.type === 'DOCUMENT_REVIEWED' && <span>Documento <b>{notif.document?.title}</b> foi revisado.</span>}
                            {notif.type === 'NEW_COMMENT' && <span>Novo comentário de <b>{notif.comment?.authorName}</b>.</span>}
                            {notif.type === 'DOCUMENT_UPLOADED' && <span>Documento <b>{notif.document?.title}</b> foi enviado.</span>}
                            {!notif.type && <span>Nova notificação recebida.</span>}
                          </p>
                          <span>agora</span>
                        </div>
                      </div>)}
                </div>
              </div> : stryMutAct_9fa48("580") ? false : stryMutAct_9fa48("579") ? true : (stryCov_9fa48("579", "580", "581"), showNotifications && <div className="notifications-dropdown" onClick={stryMutAct_9fa48("582") ? () => undefined : (stryCov_9fa48("582"), e => e.stopPropagation())}>
                <div className="dropdown-header">
                  <h4>Notificações</h4>
                </div>
                <div className="dropdown-body">
                  {(stryMutAct_9fa48("585") ? notifications.length !== 0 : stryMutAct_9fa48("584") ? false : stryMutAct_9fa48("583") ? true : (stryCov_9fa48("583", "584", "585"), notifications.length === 0)) ? <div className="notification-item">
                      <div className="notification-text">
                        <p>Nenhuma notificação nova.</p>
                      </div>
                    </div> : notifications.map(stryMutAct_9fa48("586") ? () => undefined : (stryCov_9fa48("586"), (notif, idx) => <div className="notification-item" key={idx}>
                        <div className="notification-icon-circle bg-purple-light">
                          <i className="bi bi-info-circle"></i>
                        </div>
                        <div className="notification-text">
                          <p>
                            {stryMutAct_9fa48("589") ? notif.type === 'DOCUMENT_REVIEWED' || <span>Documento <b>{notif.document?.title}</b> foi revisado.</span> : stryMutAct_9fa48("588") ? false : stryMutAct_9fa48("587") ? true : (stryCov_9fa48("587", "588", "589"), (stryMutAct_9fa48("591") ? notif.type !== 'DOCUMENT_REVIEWED' : stryMutAct_9fa48("590") ? true : (stryCov_9fa48("590", "591"), notif.type === (stryMutAct_9fa48("592") ? "" : (stryCov_9fa48("592"), 'DOCUMENT_REVIEWED')))) && <span>Documento <b>{stryMutAct_9fa48("593") ? notif.document.title : (stryCov_9fa48("593"), notif.document?.title)}</b> foi revisado.</span>)}
                            {stryMutAct_9fa48("596") ? notif.type === 'NEW_COMMENT' || <span>Novo comentário de <b>{notif.comment?.authorName}</b>.</span> : stryMutAct_9fa48("595") ? false : stryMutAct_9fa48("594") ? true : (stryCov_9fa48("594", "595", "596"), (stryMutAct_9fa48("598") ? notif.type !== 'NEW_COMMENT' : stryMutAct_9fa48("597") ? true : (stryCov_9fa48("597", "598"), notif.type === (stryMutAct_9fa48("599") ? "" : (stryCov_9fa48("599"), 'NEW_COMMENT')))) && <span>Novo comentário de <b>{stryMutAct_9fa48("600") ? notif.comment.authorName : (stryCov_9fa48("600"), notif.comment?.authorName)}</b>.</span>)}
                            {stryMutAct_9fa48("603") ? notif.type === 'DOCUMENT_UPLOADED' || <span>Documento <b>{notif.document?.title}</b> foi enviado.</span> : stryMutAct_9fa48("602") ? false : stryMutAct_9fa48("601") ? true : (stryCov_9fa48("601", "602", "603"), (stryMutAct_9fa48("605") ? notif.type !== 'DOCUMENT_UPLOADED' : stryMutAct_9fa48("604") ? true : (stryCov_9fa48("604", "605"), notif.type === (stryMutAct_9fa48("606") ? "" : (stryCov_9fa48("606"), 'DOCUMENT_UPLOADED')))) && <span>Documento <b>{stryMutAct_9fa48("607") ? notif.document.title : (stryCov_9fa48("607"), notif.document?.title)}</b> foi enviado.</span>)}
                            {stryMutAct_9fa48("610") ? !notif.type || <span>Nova notificação recebida.</span> : stryMutAct_9fa48("609") ? false : stryMutAct_9fa48("608") ? true : (stryCov_9fa48("608", "609", "610"), (stryMutAct_9fa48("611") ? notif.type : (stryCov_9fa48("611"), !notif.type)) && <span>Nova notificação recebida.</span>)}
                          </p>
                          <span>agora</span>
                        </div>
                      </div>))}
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </header>;
  }
};
export default Topbar;