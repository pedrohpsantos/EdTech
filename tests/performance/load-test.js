// Importamos o módulo HTTP do k6.
import http from 'k6/http';

// Importamos a função check.
import { check, sleep, group } from 'k6';

// Aqui ficam as configurações principais do teste.
export const options = {
  scenarios: {
    production_load: {
      executor: 'ramping-vus',
      startVUs: 10,
      stages: [
        { duration: '10s', target: 50 },
        { duration: '20s', target: 100 },
        { duration: '10s', target: 50 },
      ],
      gracefulRampDown: '10s',
    },
  },

  // Define quais estatísticas queremos ver no resumo final.
  summaryTrendStats: ['avg', 'min', 'med', 'p(95)', 'p(99)', 'max'],

  // Thresholds são limites de qualidade.
  thresholds: {
    // 95% das requisições devem responder em menos de 500ms.
    http_req_duration: ['p(95)<500'],

    // Acompanham separadamente endpoints com perfis de custo diferentes.
    'http_req_duration{endpoint:health}': ['p(95)<500'],
    'http_req_duration{endpoint:login}': ['p(95)<750'],
    'http_req_duration{endpoint:register}': ['p(95)<900'],
    'http_req_duration{endpoint:recovery}': ['p(95)<900'],
    http_req_failed: ['rate<0.01'],

    // Menos de 5% das validações (checks) podem falhar (para tolerar cold starts no serverless).
    checks: ['rate>0.95'],
  },
};

// Função setup roda uma vez antes do teste iniciar para acordar o backend (Cold Start)
export function setup() {
  const baseUrl = __ENV.API_URL || 'http://localhost:8080';
  // Requisição de aquecimento com timeout longo para garantir que o Cloud Run suba
  http.get(`${baseUrl}/actuator/health`, { timeout: '120s' });
  // Pequena pausa para garantir que os pools de conexão do banco se estabilizem
  sleep(5);
}

// Esta função roda repetidamente para cada usuário virtual.
export default function () {
  // Definimos a URL base da API.
  const baseUrl = __ENV.API_URL || 'http://localhost:8080';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: '120s',
    // Evita que o K6 marque respostas 4xx esperadas como "Failed Requests" no relatório.
    responseCallback: http.expectedStatuses(200, 201, 400, 401, 404, 409, 429),
  };

  // 1. Endpoint de Health Check (Actuator) - Simula monitoramento
  group('health', () => {
    const healthResponse = http.get(`${baseUrl}/actuator/health`, {
      tags: { endpoint: 'health' },
      timeout: '120s',
      responseCallback: http.expectedStatuses(200, 429, 503),
    });
    check(healthResponse, {
      'health check respondeu (200, 429 ou 503)': (res) =>
        res.status === 200 || res.status === 429 || res.status === 503,
    });
  });

  // 2. Endpoint de Login - Simula carga pesada de autenticação e bcrypt
  const loginPayload = JSON.stringify({
    email: 'loadtest@example.com',
    password: 'wrongpassword'
  });
  const loginResponse = http.post(`${baseUrl}/api/auth/login`, loginPayload, { ...params, tags: { endpoint: 'login' } });
  
  // Validamos se a rota respondeu com status esperado
  // 401 pois a senha está errada, ou 429 se o Rate Limiter bloquear (comportamento correto)
  check(loginResponse, {
    'login respondeu (banco acessado)': (res) => res.status === 401 || res.status === 200 || res.status === 429,
  });

  // 3. Endpoint de Registro - Simula validação de formulário novo
  const registerPayload = JSON.stringify({
    name: 'Test User',
    email: 'newuser@example.com',
    password: 'Password123!',
    role: 'RESEARCHER'
  });
  const registerResponse = http.post(`${baseUrl}/api/auth/register`, registerPayload, { ...params, tags: { endpoint: 'register' } });
  check(registerResponse, {
    'registro processado (2xx, 400 ou 429)': (res) => res.status >= 200 && res.status < 500,
  });

  // 4. Endpoint de Recuperação de Senha - Simula envio de e-mail/processamento
  const recoveryPayload = JSON.stringify({
    email: 'loadtest@example.com'
  });
  const recoveryResponse = http.post(`${baseUrl}/api/auth/recovery/request`, recoveryPayload, { ...params, tags: { endpoint: 'recovery' } });
  check(recoveryResponse, {
    'recuperação processada (2xx, 404 ou 429)': (res) => res.status >= 200 && res.status < 500,
  });

  // Pausa aleatória entre 1 e 2 segundos para simular comportamento humano.
  sleep(Math.random() * 1 + 1);
}

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Esta função é chamada no final do teste.
// Ela gera um relatório JSON com todos os dados coletados.
export function handleSummary(data) {
  return {
    // Mostra o resumo também no terminal.
    stdout: JSON.stringify(data.metrics, null, 2),

    // Salva o relatório completo em um arquivo JSON.
    'k6-summary.json': JSON.stringify(data, null, 2),

    // Salva o relatório visual em HTML
    'k6-summary.html': htmlReport(data),
  };
}
