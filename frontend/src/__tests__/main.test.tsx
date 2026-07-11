import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn().mockReturnValue({ render: vi.fn() })
}));

describe('main.tsx entry point', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('calls createRoot with root element', async () => {
    await import('../main');
    const ReactDOMClient = await import('react-dom/client');
    expect(ReactDOMClient.createRoot).toHaveBeenCalled();
  });
});
