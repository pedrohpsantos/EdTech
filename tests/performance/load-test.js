// Importamos o módulo HTTP do k6.
// É com ele que fazemos requisições GET, POST, PUT, DELETE etc.
import http from 'k6/http';

// Importamos a função check.
// Ela permite validar se a resposta veio como esperado.
import { check, sleep } from 'k6';

// Aqui ficam as configurações principais do teste.
export const options = {
  // Simula 100 usuários virtuais acessando a API ao mesmo tempo.
  vus: 100,

  // Define que o teste vai rodar por 1 minuto.
  duration: '1m',

  // Define quais estatísticas queremos ver no resumo final.
  // p(95) e p(99) ajudam muito a entender a latência para a maioria dos usuários.
  summaryTrendStats: ['avg', 'min', 'med', 'p(95)', 'p(99)', 'max'],

  // Thresholds são limites de qualidade.
  // Se esses limites forem ultrapassados, o teste será considerado falho.
  thresholds: {
    // 95% das requisições devem responder em menos de 500ms.
    http_req_duration: ['p(95)<500'],

    // Menos de 1% das requisições podem falhar.
    http_req_failed: ['rate<0.01'],
  },
};

// Esta função roda repetidamente para cada usuário virtual.
// Ou seja: cada VU executa esse fluxo várias vezes durante a duração do teste.
export default function () {
  // Definimos a URL base da API.
  // Troque pelo endereço real do projeto.
  const baseUrl = 'http://localhost:3000';

  // Fazemos uma requisição GET para uma rota pública.
  // Exemplo: página inicial, listagem pública, healthcheck público etc.
  const publicRouteResponse = http.get(`https://edtech-storage-501117.web.app/api/public`);

  // Validamos se a rota pública respondeu com status 200.
  check(publicRouteResponse, {
    'rota publica respondeu 200': (res) => res.status === 200,
  });

  // Fazemos uma requisição GET simulando o download de um arquivo.
  // Troque esse endpoint pelo endpoint real de download da aplicação.
  const downloadResponse = http.get(`https://edtech-storage-501117.web.app/api/files/download/example.pdf`);

  // Validamos se o download respondeu com sucesso.
  check(downloadResponse, {
    'download respondeu 200': (res) => res.status === 200,
  });

  // Pausa pequena entre uma iteração e outra.
  // Isso evita que cada VU faça requisições em loop absoluto sem nenhum intervalo.
  sleep(1);
}

// Esta função é chamada no final do teste.
// Ela gera um relatório JSON com todos os dados coletados.
export function handleSummary(data) {
  return {
    // Mostra o resumo também no terminal.
    stdout: JSON.stringify(data.metrics, null, 2),

    // Salva o relatório completo em um arquivo JSON.
    'k6-summary.json': JSON.stringify(data, null, 2),
  };
}
