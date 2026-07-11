// @ts-nocheck
// Mock para CSS Modules e arquivos estáticos nos testes Vitest/Jest
export default new Proxy(
  {},
  {
    get: (_, key) => (key === '__esModule' ? false : key),
  },
);
