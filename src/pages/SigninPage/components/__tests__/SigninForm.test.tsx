import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import SigninForm from '../SigninForm';

// mock select functions from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe('SigninForm', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<SigninForm />);
    await screen.findByTestId('form-signin');

    // ASSERT
    expect(screen.getByTestId('form-signin')).toBeDefined();
  });

  it('should navigate upon successful signin', async () => {
    // ARRANGE
    render(<SigninForm />);
    await screen.findByTestId('form-signin');

    // ACT
    await userEvent.type(screen.getByLabelText('Username'), 'Bret');
    await userEvent.type(screen.getByLabelText('Password'), 'aB1!12345678');
    await userEvent.click(screen.getByTestId('form-signin-button-submit'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
