import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from 'test/test-utils';

import SignoutPage from '../SignoutPage';

// mock select functions from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe('SignoutPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<SignoutPage />);
    await screen.findByTestId('page-signout');

    // ASSERT
    expect(screen.getByTestId('page-signout')).toBeDefined();
  });

  it('should navigate on successful signout', async () => {
    // ARRANGE
    render(<SignoutPage />);
    await waitFor(() => expect(mockNavigate).toHaveBeenCalled(), { timeout: 3000 });

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
