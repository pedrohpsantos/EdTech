import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GlobalLoader from '../../components/GlobalLoader';

describe('GlobalLoader', () => {
  it('does not render initially', () => {
    const { container } = render(<GlobalLoader />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when showLoader event is dispatched', () => {
    render(<GlobalLoader />);

    act(() => {
      window.dispatchEvent(new Event('showLoader'));
    });

    expect(screen.getByText('Processando')).toBeInTheDocument();
  });

  it('hides when hideLoader event is dispatched', () => {
    render(<GlobalLoader />);

    act(() => {
      window.dispatchEvent(new Event('showLoader'));
    });
    expect(screen.getByText('Processando')).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event('hideLoader'));
    });
    // Element should be removed
    expect(screen.queryByText('Processando')).not.toBeInTheDocument();
  });
});
