import { render, screen } from 'test/test-utils';

import * as UseAuthContext from '../../../providers/AuthProvider';

import LandingPage from '../LandingPage';
import { Route, Routes } from 'react-router-dom';

describe('LandingPage', () => {
  const useAuthContextSpy = jest.spyOn(UseAuthContext, 'useAuthContext');

  beforeEach(() => {
    useAuthContextSpy.mockReturnValue({
      isAuthenticated: false,
    });
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<LandingPage />);
    await screen.findByTestId('page-landing');

    // ASSERT
    expect(screen.getByTestId('page-landing')).toBeDefined();
  });

  it('should render LandingPage when not authenticated', async () => {
    // ARRANGE
    render(<LandingPage />);
    await screen.findByTestId('page-landing');

    // ASSERT
    expect(screen.getByTestId('page-landing')).toBeDefined();
  });

  it('should navigate when authenticated', async () => {
    // ARRANGE
    useAuthContextSpy.mockReturnValueOnce({
      isAuthenticated: true,
    });
    render(
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<div data-testid="success"></div>} />
      </Routes>,
    );
    await screen.findByTestId('success');

    // ASSERT
    expect(screen.getByTestId('success')).toBeDefined();
  });
});
