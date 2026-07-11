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
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './context/authContext';
import PrivateRoute from './components/privateRoute';
import GlobalLoader from './components/GlobalLoader';

// Lazy load rotas
const Login = React.lazy(stryMutAct_9fa48("0") ? () => undefined : (stryCov_9fa48("0"), () => import('./pages/login')));
const Register = React.lazy(stryMutAct_9fa48("1") ? () => undefined : (stryCov_9fa48("1"), () => import('./pages/register')));
const Recovery = React.lazy(stryMutAct_9fa48("2") ? () => undefined : (stryCov_9fa48("2"), () => import('./pages/Recovery')));
const Dashboard = React.lazy(stryMutAct_9fa48("3") ? () => undefined : (stryCov_9fa48("3"), () => import('./pages/dashboard')));
const Documentos = React.lazy(stryMutAct_9fa48("4") ? () => undefined : (stryCov_9fa48("4"), () => import('./pages/documentos')));
const Trail = React.lazy(stryMutAct_9fa48("5") ? () => undefined : (stryCov_9fa48("5"), () => import('./pages/trail')));
const Upload = React.lazy(stryMutAct_9fa48("6") ? () => undefined : (stryCov_9fa48("6"), () => import('./pages/upload')));
const Settings = React.lazy(stryMutAct_9fa48("7") ? () => undefined : (stryCov_9fa48("7"), () => import('./pages/settings')));
const About = React.lazy(stryMutAct_9fa48("8") ? () => undefined : (stryCov_9fa48("8"), () => import('./pages/About')));
const Submissions = React.lazy(stryMutAct_9fa48("9") ? () => undefined : (stryCov_9fa48("9"), () => import('./pages/submissions')));
const Analytics = React.lazy(stryMutAct_9fa48("10") ? () => undefined : (stryCov_9fa48("10"), () => import('./pages/analytics')));
const ComplianceCenter = React.lazy(stryMutAct_9fa48("11") ? () => undefined : (stryCov_9fa48("11"), () => import('./pages/compliance')));
const AuditLogs = React.lazy(stryMutAct_9fa48("12") ? () => undefined : (stryCov_9fa48("12"), () => import('./pages/auditLogs')));
const Projects = React.lazy(stryMutAct_9fa48("13") ? () => undefined : (stryCov_9fa48("13"), () => import('./pages/projects')));
const queryClient = new QueryClient();
const NotFound = stryMutAct_9fa48("14") ? () => undefined : (stryCov_9fa48("14"), (() => {
  const NotFound = () => <div style={stryMutAct_9fa48("15") ? {} : (stryCov_9fa48("15"), {
    padding: stryMutAct_9fa48("16") ? "" : (stryCov_9fa48("16"), '2rem'),
    textAlign: stryMutAct_9fa48("17") ? "" : (stryCov_9fa48("17"), 'center'),
    marginTop: stryMutAct_9fa48("18") ? "" : (stryCov_9fa48("18"), '10vh')
  })}>
    <h2>404 - Página não encontrada</h2>
    <p>A rota que você tentou acessar não existe.</p>
    <a href="/">Voltar para o início</a>
  </div>;
  return NotFound;
})());
function App() {
  if (stryMutAct_9fa48("19")) {
    {}
  } else {
    stryCov_9fa48("19");
    return <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div style={stryMutAct_9fa48("20") ? {} : (stryCov_9fa48("20"), {
            display: stryMutAct_9fa48("21") ? "" : (stryCov_9fa48("21"), 'flex'),
            flexDirection: stryMutAct_9fa48("22") ? "" : (stryCov_9fa48("22"), 'column'),
            minHeight: stryMutAct_9fa48("23") ? "" : (stryCov_9fa48("23"), '100svh')
          })}>
            <GlobalLoader />
            <Suspense fallback={<GlobalLoader forceShow />}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recover-password" element={<Recovery />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>} />
                <Route path="/documentos" element={<PrivateRoute>
                      <Documentos />
                    </PrivateRoute>} />
                <Route path="/submissions" element={<PrivateRoute allowedRoles={stryMutAct_9fa48("24") ? [] : (stryCov_9fa48("24"), [stryMutAct_9fa48("25") ? "" : (stryCov_9fa48("25"), 'ADVISOR')])}>
                      <Submissions />
                    </PrivateRoute>} />
                <Route path="/projects" element={<PrivateRoute>
                      <Projects />
                    </PrivateRoute>} />
                <Route path="/upload" element={<PrivateRoute>
                      <Upload />
                    </PrivateRoute>} />
                <Route path="/trail" element={<PrivateRoute>
                      <Trail />
                    </PrivateRoute>} />
                <Route path="/analytics" element={<PrivateRoute>
                      <Analytics />
                    </PrivateRoute>} />
                <Route path="/compliance-center" element={<PrivateRoute allowedRoles={stryMutAct_9fa48("26") ? [] : (stryCov_9fa48("26"), [stryMutAct_9fa48("27") ? "" : (stryCov_9fa48("27"), 'AUDITOR')])}>
                      <ComplianceCenter />
                    </PrivateRoute>} />
                <Route path="/audit-logs" element={<PrivateRoute allowedRoles={stryMutAct_9fa48("28") ? [] : (stryCov_9fa48("28"), [stryMutAct_9fa48("29") ? "" : (stryCov_9fa48("29"), 'AUDITOR')])}>
                      <AuditLogs />
                    </PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute>
                      <Settings />
                    </PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>;
  }
}
export default App;