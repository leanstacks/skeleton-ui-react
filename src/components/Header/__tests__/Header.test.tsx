import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

import { render, screen } from 'test/test-utils';

import * as AuthProvider from '../../../providers/AuthProvider';

import Header from '../Header';

describe('Header', () => {
  const useAuthContextSpy = jest.spyOn(AuthProvider, 'useAuthContext');

  beforeEach(() => {
    useAuthContextSpy.mockReturnValue({
      isAuthenticated: false,
    });
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<Header />);
    await screen.findByTestId('header');

    // ASSERT
    expect(screen.getByTestId('header')).toBeDefined();
  });

  it('should render custom testId', async () => {
    // ARRANGE
    render(<Header testId="test" />);
    await screen.findByTestId('test');

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('should render content when not authenticated', async () => {
    // ARRANGE
    render(<Header />);
    await screen.findByTestId('header');

    // ASSERT
    expect(screen.getByTestId('header')).toBeDefined();
  });

  it('should render content when authenticated', async () => {
    // ARRANGE
    useAuthContextSpy.mockReturnValueOnce({
      isAuthenticated: true,
    });
    render(<Header />);
    await screen.findByTestId('header');

    // ASSERT
    expect(screen.getByTestId('header')).toBeDefined();
    expect(screen.getByTestId('button-menu-icon')).toBeDefined();
  });

  it('should navigate when sign out button clicked', async () => {
    // ARRANGE
    useAuthContextSpy.mockReturnValue({
      isAuthenticated: true,
    });
    render(
      <>
        <Header />
        <Routes>
          <Route path="/" element={<div data-testid="page-home"></div>} />
          <Route path="/auth/signout" element={<div data-testid="page-sign-out"></div>} />
        </Routes>
      </>,
    );
    await screen.findByTestId('button-menu-icon');

    // ACT
    // open the side menu
    await userEvent.click(screen.getByTestId('button-menu-icon'));

    // click the sign out menu item
    await userEvent.click(screen.getByText('Sign Out'));

    // ASSERT
    expect(screen.getByTestId('page-sign-out')).toBeDefined();
  });
});
