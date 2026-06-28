import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuração do Teste de Carga (Load Test)
// Simula 50 usuários virtuais (VUs) acessando simultaneamente a API de recuperação durante 30 segundos.
export const options = {
  stages: [
    { duration: '10s', target: 20 }, // Sobe para 20 usuários em 10 segundos
    { duration: '10s', target: 50 }, // Aumenta para 50 usuários nos próximos 10 segundos
    { duration: '10s', target: 0 },  // Desce para 0 usuários no fim
  ],
  thresholds: {
    // 95% das requisições devem ser respondidas em menos de 500ms
    http_req_duration: ['p(95)<500'], 
    // A taxa de erro deve ser menor que 1%
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const url = 'http://localhost:8080/api/auth/recovery/request';
  const payload = JSON.stringify({
    email: 'teste@unb.br',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Envia a requisição de recuperação de senha simulando o clique do usuário
  const res = http.post(url, payload, params);

  // Verifica se o servidor retornou status 200 OK
  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  // Pausa simulando o tempo de leitura do usuário
  sleep(1);
}
