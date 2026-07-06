import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './context/authContext';
import PrivateRoute from './components/privateRoute';
import GlobalLoader from './components/GlobalLoader';

// Lazy load rotas
const Login = React.lazy(() => import('./pages/login'));
const Register = React.lazy(() => import('./pages/register'));
const Recovery = React.lazy(() => import('./pages/Recovery'));
const Dashboard = React.lazy(() => import('./pages/dashboard'));
const Documentos = React.lazy(() => import('./pages/documentos'));
const Trail = React.lazy(() => import('./pages/trail'));
const Upload = React.lazy(() => import('./pages/upload'));
const Settings = React.lazy(() => import('./pages/settings'));
const About = React.lazy(() => import('./pages/About'));
const Submissions = React.lazy(() => import('./pages/submissions'));
const Analytics = React.lazy(() => import('./pages/analytics'));
const ComplianceCenter = React.lazy(() => import('./pages/compliance'));
const AuditLogs = React.lazy(() => import('./pages/auditLogs'));
const Projects = React.lazy(() => import('./pages/projects'));

const queryClient = new QueryClient();

const NotFound = () => (
  <div style={{ padding: '2rem', textAlign: 'center', marginTop: '10vh' }}>
    <h2>404 - Página não encontrada</h2>
    <p>A rota que você tentou acessar não existe.</p>
    <a href="/">Voltar para o início</a>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
            <GlobalLoader />
            <Suspense
              fallback={<GlobalLoader forceShow />}
            >
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recover-password" element={<Recovery />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/documentos"
                  element={
                    <PrivateRoute>
                      <Documentos />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/submissions"
                  element={
                    <PrivateRoute allowedRoles={['ADVISOR']}>
                      <Submissions />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <PrivateRoute>
                      <Projects />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <PrivateRoute>
                      <Upload />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/trail"
                  element={
                    <PrivateRoute>
                      <Trail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <PrivateRoute>
                      <Analytics />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/compliance-center"
                  element={
                    <PrivateRoute allowedRoles={['AUDITOR']}>
                      <ComplianceCenter />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/audit-logs"
                  element={
                    <PrivateRoute allowedRoles={['AUDITOR']}>
                      <AuditLogs />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <Settings />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default App;
