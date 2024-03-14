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
    render(<Header />);

    await screen.findByTestId('header');

    expect(screen.getByTestId('header')).toBeDefined();
  });

  it('should render custom testId', async () => {
    render(<Header testId="test" />);

    await screen.findByTestId('test');

    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('should render content when not authenticated', async () => {
    render(<Header />);

    await screen.findByTestId('header');

    expect(screen.getByTestId('header')).toBeDefined();
  });

  it('should render content when authenticated', async () => {
    useAuthContextSpy.mockReturnValueOnce({
      isAuthenticated: true,
    });
    render(<Header />);

    await screen.findByTestId('header');

    expect(screen.getByTestId('header')).toBeDefined();
    expect(screen.getByTestId('button-menu-icon')).toBeDefined();
  });

  it('should navigate when sign out button clicked', async () => {
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

    // open the side menu
    await userEvent.click(screen.getByTestId('button-menu-icon'));

    // click the sign out menu item
    await userEvent.click(screen.getByText('Sign Out'));

    expect(screen.getByTestId('page-sign-out')).toBeDefined();
  });
});
