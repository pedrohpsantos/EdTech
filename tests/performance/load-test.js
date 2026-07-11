// Importamos o módulo HTTP do k6.
import http from 'k6/http';

// Importamos a função check.
import { check, sleep } from 'k6';

// Aqui ficam as configurações principais do teste.
export const options = {
  // Configuração de estágios de VUs (Virtual Users) para o Ramp-up
  stages: [
    { duration: '30s', target: 50 }, // Ramp-up para 50 VUs
    { duration: '1m', target: 100 }, // Sobe até 100 VUs e mantém
    { duration: '30s', target: 0 },  // Ramp-down
  ],

  // Define quais estatísticas queremos ver no resumo final.
  summaryTrendStats: ['avg', 'min', 'med', 'p(95)', 'p(99)', 'max'],

  // Thresholds são limites de qualidade.
  thresholds: {
    // 95% das requisições devem responder em menos de 500ms.
    http_req_duration: ['p(95)<500'],

    // Menos de 1% das validações (checks) podem falhar.
    checks: ['rate>0.99'],
  },
};

// Esta função roda repetidamente para cada usuário virtual.
export default function () {
  // Definimos a URL base da API.
  const baseUrl = __ENV.API_URL || 'http://localhost:8080';

  // Fazemos uma requisição de login para simular carga no banco (leitura)
  const loginPayload = JSON.stringify({
    email: 'loadtest@example.com',
    password: 'wrongpassword'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginResponse = http.post(`${baseUrl}/api/auth/login`, loginPayload, params);

  // Validamos se a rota respondeu com status esperado (401 pois a senha está errada)
  check(loginResponse, {
    'login respondeu (banco acessado)': (res) => res.status === 401 || res.status === 200,
  });

  // Pausa pequena entre uma iteração e outra.
  sleep(1);
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
