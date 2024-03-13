import { render, screen } from '@testing-library/react';
import ErrorFallback from '../ErrorFallback';

describe('ErrorFallback', () => {
  it('should render successfully', async () => {
    render(<ErrorFallback />);

    await screen.findByTestId('error-fallback');

    expect(screen.getByTestId('error-fallback')).toBeDefined();
  });
});
