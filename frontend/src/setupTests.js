import '@testing-library/jest-dom';

// Garante que import.meta.env nunca seja undefined nos testes
if (typeof import.meta.env === 'undefined') {
  Object.defineProperty(import.meta, 'env', {
    value: { VITE_API_URL: 'http://localhost:8080', MODE: 'test', DEV: false, PROD: false },
  });
}


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
