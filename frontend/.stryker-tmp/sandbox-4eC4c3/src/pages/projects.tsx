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
import DashboardLayout from '../components/layout/DashboardLayout';
import { getProjects, joinProject } from '../services/api';
import { Project } from '../types';
export default function Projects() {
  if (stryMutAct_9fa48("2050")) {
    {}
  } else {
    stryCov_9fa48("2050");
    const [projects, setProjects] = useState<Project[]>(stryMutAct_9fa48("2051") ? ["Stryker was here"] : (stryCov_9fa48("2051"), []));
    const [loading, setLoading] = useState(stryMutAct_9fa48("2052") ? false : (stryCov_9fa48("2052"), true));
    const [toastMessage, setToastMessage] = useState(stryMutAct_9fa48("2053") ? "Stryker was here!" : (stryCov_9fa48("2053"), ''));
    const loadProjects = async () => {
      if (stryMutAct_9fa48("2054")) {
        {}
      } else {
        stryCov_9fa48("2054");
        setLoading(stryMutAct_9fa48("2055") ? false : (stryCov_9fa48("2055"), true));
        const resp = await getProjects();
        if (stryMutAct_9fa48("2057") ? false : stryMutAct_9fa48("2056") ? true : (stryCov_9fa48("2056", "2057"), resp.sucesso)) {
          if (stryMutAct_9fa48("2058")) {
            {}
          } else {
            stryCov_9fa48("2058");
            setProjects(stryMutAct_9fa48("2061") ? resp.dados && [] : stryMutAct_9fa48("2060") ? false : stryMutAct_9fa48("2059") ? true : (stryCov_9fa48("2059", "2060", "2061"), resp.dados || (stryMutAct_9fa48("2062") ? ["Stryker was here"] : (stryCov_9fa48("2062"), []))));
          }
        }
        setLoading(stryMutAct_9fa48("2063") ? true : (stryCov_9fa48("2063"), false));
      }
    };
    useEffect(() => {
      if (stryMutAct_9fa48("2064")) {
        {}
      } else {
        stryCov_9fa48("2064");
        loadProjects();
      }
    }, stryMutAct_9fa48("2065") ? ["Stryker was here"] : (stryCov_9fa48("2065"), []));
    const showToast = (message: string) => {
      if (stryMutAct_9fa48("2066")) {
        {}
      } else {
        stryCov_9fa48("2066");
        setToastMessage(message);
        setTimeout(stryMutAct_9fa48("2067") ? () => undefined : (stryCov_9fa48("2067"), () => setToastMessage(stryMutAct_9fa48("2068") ? "Stryker was here!" : (stryCov_9fa48("2068"), ''))), 3000);
      }
    };
    const handleJoin = async (projectId: string) => {
      if (stryMutAct_9fa48("2069")) {
        {}
      } else {
        stryCov_9fa48("2069");
        const resp = await joinProject(projectId);
        if (stryMutAct_9fa48("2071") ? false : stryMutAct_9fa48("2070") ? true : (stryCov_9fa48("2070", "2071"), resp.sucesso)) {
          if (stryMutAct_9fa48("2072")) {
            {}
          } else {
            stryCov_9fa48("2072");
            showToast(stryMutAct_9fa48("2073") ? "" : (stryCov_9fa48("2073"), 'Associado ao projeto com sucesso!'));
            loadProjects();
          }
        } else {
          if (stryMutAct_9fa48("2074")) {
            {}
          } else {
            stryCov_9fa48("2074");
            showToast((stryMutAct_9fa48("2075") ? "" : (stryCov_9fa48("2075"), 'Erro: ')) + resp.mensagem);
          }
        }
      }
    };
    return <DashboardLayout title="Projetos" subtitle="Descubra e associe-se a projetos de pesquisa ativos" breadcrumbs={stryMutAct_9fa48("2076") ? [] : (stryCov_9fa48("2076"), [stryMutAct_9fa48("2077") ? "" : (stryCov_9fa48("2077"), 'EdTech'), stryMutAct_9fa48("2078") ? "" : (stryCov_9fa48("2078"), 'Projetos')])}>
      <div className="dashboard-card p-4">
        <h3 style={stryMutAct_9fa48("2079") ? {} : (stryCov_9fa48("2079"), {
          color: stryMutAct_9fa48("2080") ? "" : (stryCov_9fa48("2080"), 'var(--ed-text-dark)'),
          marginBottom: stryMutAct_9fa48("2081") ? "" : (stryCov_9fa48("2081"), '1.5rem'),
          fontSize: stryMutAct_9fa48("2082") ? "" : (stryCov_9fa48("2082"), '1.25rem'),
          fontWeight: 600
        })}>
          Projetos Disponíveis
        </h3>
        {loading ? <div style={stryMutAct_9fa48("2083") ? {} : (stryCov_9fa48("2083"), {
          padding: stryMutAct_9fa48("2084") ? "" : (stryCov_9fa48("2084"), '2rem'),
          textAlign: stryMutAct_9fa48("2085") ? "" : (stryCov_9fa48("2085"), 'center'),
          color: stryMutAct_9fa48("2086") ? "" : (stryCov_9fa48("2086"), 'var(--ed-text-muted)')
        })}>Carregando projetos...</div> : (stryMutAct_9fa48("2089") ? projects.length !== 0 : stryMutAct_9fa48("2088") ? false : stryMutAct_9fa48("2087") ? true : (stryCov_9fa48("2087", "2088", "2089"), projects.length === 0)) ? <div style={stryMutAct_9fa48("2090") ? {} : (stryCov_9fa48("2090"), {
          padding: stryMutAct_9fa48("2091") ? "" : (stryCov_9fa48("2091"), '2rem'),
          textAlign: stryMutAct_9fa48("2092") ? "" : (stryCov_9fa48("2092"), 'center'),
          color: stryMutAct_9fa48("2093") ? "" : (stryCov_9fa48("2093"), 'var(--ed-text-muted)')
        })}>Nenhum projeto encontrado.</div> : <div style={stryMutAct_9fa48("2094") ? {} : (stryCov_9fa48("2094"), {
          display: stryMutAct_9fa48("2095") ? "" : (stryCov_9fa48("2095"), 'grid'),
          gridTemplateColumns: stryMutAct_9fa48("2096") ? "" : (stryCov_9fa48("2096"), 'repeat(auto-fill, minmax(300px, 1fr))'),
          gap: stryMutAct_9fa48("2097") ? "" : (stryCov_9fa48("2097"), '1.5rem')
        })}>
            {projects.map(stryMutAct_9fa48("2098") ? () => undefined : (stryCov_9fa48("2098"), project => <div key={project.id} style={stryMutAct_9fa48("2099") ? {} : (stryCov_9fa48("2099"), {
            background: stryMutAct_9fa48("2100") ? "" : (stryCov_9fa48("2100"), 'var(--ed-white)'),
            border: stryMutAct_9fa48("2101") ? "" : (stryCov_9fa48("2101"), '1px solid var(--border)'),
            borderRadius: stryMutAct_9fa48("2102") ? "" : (stryCov_9fa48("2102"), '12px'),
            padding: stryMutAct_9fa48("2103") ? "" : (stryCov_9fa48("2103"), '1.5rem'),
            display: stryMutAct_9fa48("2104") ? "" : (stryCov_9fa48("2104"), 'flex'),
            flexDirection: stryMutAct_9fa48("2105") ? "" : (stryCov_9fa48("2105"), 'column'),
            gap: stryMutAct_9fa48("2106") ? "" : (stryCov_9fa48("2106"), '1rem'),
            boxShadow: stryMutAct_9fa48("2107") ? "" : (stryCov_9fa48("2107"), '0 2px 4px rgba(0,0,0,0.02)')
          })}>
                <div style={stryMutAct_9fa48("2108") ? {} : (stryCov_9fa48("2108"), {
              display: stryMutAct_9fa48("2109") ? "" : (stryCov_9fa48("2109"), 'flex'),
              justifyContent: stryMutAct_9fa48("2110") ? "" : (stryCov_9fa48("2110"), 'space-between'),
              alignItems: stryMutAct_9fa48("2111") ? "" : (stryCov_9fa48("2111"), 'flex-start')
            })}>
                  <div style={stryMutAct_9fa48("2112") ? {} : (stryCov_9fa48("2112"), {
                display: stryMutAct_9fa48("2113") ? "" : (stryCov_9fa48("2113"), 'flex'),
                alignItems: stryMutAct_9fa48("2114") ? "" : (stryCov_9fa48("2114"), 'center'),
                gap: stryMutAct_9fa48("2115") ? "" : (stryCov_9fa48("2115"), '12px')
              })}>
                    <div style={stryMutAct_9fa48("2116") ? {} : (stryCov_9fa48("2116"), {
                  width: stryMutAct_9fa48("2117") ? "" : (stryCov_9fa48("2117"), '40px'),
                  height: stryMutAct_9fa48("2118") ? "" : (stryCov_9fa48("2118"), '40px'),
                  background: stryMutAct_9fa48("2119") ? "" : (stryCov_9fa48("2119"), 'rgba(99, 102, 241, 0.1)'),
                  color: stryMutAct_9fa48("2120") ? "" : (stryCov_9fa48("2120"), 'var(--ed-purple-main)'),
                  borderRadius: stryMutAct_9fa48("2121") ? "" : (stryCov_9fa48("2121"), '10px'),
                  display: stryMutAct_9fa48("2122") ? "" : (stryCov_9fa48("2122"), 'flex'),
                  alignItems: stryMutAct_9fa48("2123") ? "" : (stryCov_9fa48("2123"), 'center'),
                  justifyContent: stryMutAct_9fa48("2124") ? "" : (stryCov_9fa48("2124"), 'center'),
                  fontSize: stryMutAct_9fa48("2125") ? "" : (stryCov_9fa48("2125"), '1.2rem')
                })}>
                      <i className="bi bi-briefcase"></i>
                    </div>
                    <div>
                      <h4 style={stryMutAct_9fa48("2126") ? {} : (stryCov_9fa48("2126"), {
                    margin: 0,
                    fontSize: stryMutAct_9fa48("2127") ? "" : (stryCov_9fa48("2127"), '1rem'),
                    fontWeight: 600,
                    color: stryMutAct_9fa48("2128") ? "" : (stryCov_9fa48("2128"), 'var(--ed-text-dark)')
                  })}>{project.name}</h4>
                      <span style={stryMutAct_9fa48("2129") ? {} : (stryCov_9fa48("2129"), {
                    fontSize: stryMutAct_9fa48("2130") ? "" : (stryCov_9fa48("2130"), '12px'),
                    color: stryMutAct_9fa48("2131") ? "" : (stryCov_9fa48("2131"), 'var(--ed-text-muted)')
                  })}>Criado em {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : stryMutAct_9fa48("2132") ? "" : (stryCov_9fa48("2132"), 'N/A')}</span>
                    </div>
                  </div>
                </div>
                <p style={stryMutAct_9fa48("2133") ? {} : (stryCov_9fa48("2133"), {
              margin: 0,
              fontSize: stryMutAct_9fa48("2134") ? "" : (stryCov_9fa48("2134"), '14px'),
              color: stryMutAct_9fa48("2135") ? "" : (stryCov_9fa48("2135"), 'var(--ed-text-muted)'),
              lineHeight: stryMutAct_9fa48("2136") ? "" : (stryCov_9fa48("2136"), '1.5')
            })}>
                  {project.description}
                </p>
                <div style={stryMutAct_9fa48("2137") ? {} : (stryCov_9fa48("2137"), {
              marginTop: stryMutAct_9fa48("2138") ? "" : (stryCov_9fa48("2138"), 'auto'),
              paddingTop: stryMutAct_9fa48("2139") ? "" : (stryCov_9fa48("2139"), '1rem'),
              borderTop: stryMutAct_9fa48("2140") ? "" : (stryCov_9fa48("2140"), '1px solid var(--border)')
            })}>
                  <button onClick={stryMutAct_9fa48("2141") ? () => undefined : (stryCov_9fa48("2141"), () => handleJoin(project.id))} style={stryMutAct_9fa48("2142") ? {} : (stryCov_9fa48("2142"), {
                width: stryMutAct_9fa48("2143") ? "" : (stryCov_9fa48("2143"), '100%'),
                background: stryMutAct_9fa48("2144") ? "" : (stryCov_9fa48("2144"), 'var(--ed-purple-main)'),
                color: stryMutAct_9fa48("2145") ? "" : (stryCov_9fa48("2145"), 'white'),
                border: stryMutAct_9fa48("2146") ? "" : (stryCov_9fa48("2146"), 'none'),
                padding: stryMutAct_9fa48("2147") ? "" : (stryCov_9fa48("2147"), '0.75rem'),
                borderRadius: stryMutAct_9fa48("2148") ? "" : (stryCov_9fa48("2148"), '8px'),
                fontWeight: 500,
                cursor: stryMutAct_9fa48("2149") ? "" : (stryCov_9fa48("2149"), 'pointer'),
                display: stryMutAct_9fa48("2150") ? "" : (stryCov_9fa48("2150"), 'flex'),
                alignItems: stryMutAct_9fa48("2151") ? "" : (stryCov_9fa48("2151"), 'center'),
                justifyContent: stryMutAct_9fa48("2152") ? "" : (stryCov_9fa48("2152"), 'center'),
                gap: stryMutAct_9fa48("2153") ? "" : (stryCov_9fa48("2153"), '8px'),
                transition: stryMutAct_9fa48("2154") ? "" : (stryCov_9fa48("2154"), 'background 0.2s')
              })} onMouseOver={stryMutAct_9fa48("2155") ? () => undefined : (stryCov_9fa48("2155"), e => e.currentTarget.style.background = stryMutAct_9fa48("2156") ? "" : (stryCov_9fa48("2156"), 'var(--ed-purple-dark)'))} onMouseOut={stryMutAct_9fa48("2157") ? () => undefined : (stryCov_9fa48("2157"), e => e.currentTarget.style.background = stryMutAct_9fa48("2158") ? "" : (stryCov_9fa48("2158"), 'var(--ed-purple-main)'))}>
                    <i className="bi bi-person-plus"></i>
                    Associar-se
                  </button>
                </div>
              </div>))}
          </div>}
      </div>

      {stryMutAct_9fa48("2161") ? toastMessage || <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: 'var(--ed-text-dark)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        animation: 'slideIn 0.3s ease'
      }}>
          <i className="bi bi-info-circle"></i>
          <span>{toastMessage}</span>
        </div> : stryMutAct_9fa48("2160") ? false : stryMutAct_9fa48("2159") ? true : (stryCov_9fa48("2159", "2160", "2161"), toastMessage && <div style={stryMutAct_9fa48("2162") ? {} : (stryCov_9fa48("2162"), {
        position: stryMutAct_9fa48("2163") ? "" : (stryCov_9fa48("2163"), 'fixed'),
        bottom: stryMutAct_9fa48("2164") ? "" : (stryCov_9fa48("2164"), '24px'),
        right: stryMutAct_9fa48("2165") ? "" : (stryCov_9fa48("2165"), '24px'),
        background: stryMutAct_9fa48("2166") ? "" : (stryCov_9fa48("2166"), 'var(--ed-text-dark)'),
        color: stryMutAct_9fa48("2167") ? "" : (stryCov_9fa48("2167"), 'white'),
        padding: stryMutAct_9fa48("2168") ? "" : (stryCov_9fa48("2168"), '12px 24px'),
        borderRadius: stryMutAct_9fa48("2169") ? "" : (stryCov_9fa48("2169"), '8px'),
        display: stryMutAct_9fa48("2170") ? "" : (stryCov_9fa48("2170"), 'flex'),
        alignItems: stryMutAct_9fa48("2171") ? "" : (stryCov_9fa48("2171"), 'center'),
        gap: stryMutAct_9fa48("2172") ? "" : (stryCov_9fa48("2172"), '12px'),
        boxShadow: stryMutAct_9fa48("2173") ? "" : (stryCov_9fa48("2173"), '0 4px 12px rgba(0,0,0,0.15)'),
        zIndex: 1000,
        animation: stryMutAct_9fa48("2174") ? "" : (stryCov_9fa48("2174"), 'slideIn 0.3s ease')
      })}>
          <i className="bi bi-info-circle"></i>
          <span>{toastMessage}</span>
        </div>)}
    </DashboardLayout>;
  }
}