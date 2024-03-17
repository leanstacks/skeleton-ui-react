import { render, screen } from '@testing-library/react';

import ErrorBoundary from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <ErrorBoundary fallback={<div data-testid="error-fallback" />}>
        <div data-testid="children" />
      </ErrorBoundary>,
    );
    await screen.findByTestId('children');

    // ASSERT
    expect(screen.getByTestId('children')).toBeDefined();
  });

  it('should render children when no error', async () => {
    // ARRANGE
    render(
      <ErrorBoundary fallback={<div data-testid="error-fallback" />}>
        <div data-testid="children" />
      </ErrorBoundary>,
    );
    await screen.findByTestId('children');

    // ASSERT
    expect(screen.getByTestId('children')).toBeDefined();
  });

  it('should render fallback when error', async () => {
    // ARRANGE
    jest.spyOn(console, 'error').mockImplementation(() => null);
    const TestError = (): JSX.Element => {
      throw new Error('test error');
    };
    render(
      <ErrorBoundary fallback={<div data-testid="error-fallback" />}>
        <TestError />
      </ErrorBoundary>,
    );
    await screen.findByTestId('error-fallback');

    // ASSERT
    expect(screen.getByTestId('error-fallback')).toBeDefined();
  });
});
