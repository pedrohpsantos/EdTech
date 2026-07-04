import '@testing-library/jest-dom';

// Injeta import.meta.env para todos os testes (Vitest jsdom não expõe isso por padrão)
Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_URL: 'http://localhost:8080',
        MODE: 'test',
        DEV: false,
        PROD: false,
        BASE_URL: '/',
      },
    },
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
