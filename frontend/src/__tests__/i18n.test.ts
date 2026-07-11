import { describe, it, expect } from 'vitest';
import i18n from '../i18n';

describe('i18n configuration', () => {
  it('should be initialized', () => {
    expect(i18n.isInitialized).toBe(true);
    expect(i18n.language).toBe('pt');
  });

  it('should have correct default and fallback languages', () => {
    expect(i18n.options.fallbackLng).toEqual(['en']);
  });
});
