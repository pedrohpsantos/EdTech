import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkeletonLoader from '../SkeletonLoader';

describe('SkeletonLoader', () => {
  it('renders with default props', () => {
    render(<SkeletonLoader />);
    const el = document.querySelector('.skeleton-loader-animated') as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.style.width).toBe('100%');
    expect(el.style.height).toBe('20px');
    expect(el.style.borderRadius).toBe('4px');
  });

  it('renders with custom width, height and borderRadius', () => {
    render(<SkeletonLoader width="200px" height="40px" borderRadius="8px" />);
    const el = document.querySelector('.skeleton-loader-animated') as HTMLElement;
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('40px');
    expect(el.style.borderRadius).toBe('8px');
  });

  it('merges custom className with the animated class', () => {
    render(<SkeletonLoader className="my-class" />);
    const el = document.querySelector('.skeleton-loader-animated');
    expect(el?.classList.contains('my-class')).toBe(true);
  });

  it('merges custom style prop', () => {
    render(<SkeletonLoader style={{ marginTop: '16px' }} />);
    const el = document.querySelector('.skeleton-loader-animated') as HTMLElement;
    expect(el.style.marginTop).toBe('16px');
  });

  it('renders empty className correctly', () => {
    render(<SkeletonLoader className="" />);
    const el = document.querySelector('.skeleton-loader-animated');
    expect(el).toBeTruthy();
  });
});
