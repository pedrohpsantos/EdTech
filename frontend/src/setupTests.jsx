import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import 'vitest-axe/extend-expect';

expect.extend(matchers);

// Mock do matchMedia (não existe no JSDOM)
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

// Mock do framer-motion para evitar erros e atrasos de animação no JSDOM (Acelera os testes)
import { vi } from 'vitest';
vi.mock('framer-motion', () => {
  const React = require('react');
  const filterProps = (props) => {
    const rest = { ...props };
    delete rest.whileHover;
    delete rest.whileTap;
    delete rest.initial;
    delete rest.animate;
    delete rest.variants;
    delete rest.transition;
    return rest;
  };
  return {
    motion: {
      div: React.forwardRef((props, ref) => <div ref={ref} {...filterProps(props)} />),
      h2: React.forwardRef((props, ref) => <h2 ref={ref} {...filterProps(props)} />),
      p: React.forwardRef((props, ref) => <p ref={ref} {...filterProps(props)} />),
      button: React.forwardRef((props, ref) => <button ref={ref} {...filterProps(props)} />),
      span: React.forwardRef((props, ref) => <span ref={ref} {...filterProps(props)} />),
      img: React.forwardRef((props, ref) => <img ref={ref} {...filterProps(props)} />),
      a: React.forwardRef((props, ref) => <a ref={ref} {...filterProps(props)} />),
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});
