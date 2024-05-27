import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import SigninPage from '../SigninPage';

// mock select functions from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe('SignIn', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<SigninPage />);
    await screen.findByTestId('page-signin');

    // ASSERT
    expect(screen.getByTestId('page-signin')).toBeDefined();
  });

  it('should navigate upon successful signin', async () => {
    // ARRANGE
    render(<SigninPage />);
    await screen.findByTestId('page-signin');

    // ACT
    await userEvent.type(screen.getByLabelText('Username'), 'Bret');
    await userEvent.type(screen.getByLabelText('Password'), 'aB1!12345678');
    await userEvent.click(screen.getByTestId('signin-form-button-submit'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
