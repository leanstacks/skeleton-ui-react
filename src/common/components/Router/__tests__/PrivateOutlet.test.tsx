import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Navigate, Route, Routes } from 'react-router-dom';

import { render, screen } from 'test/test-utils';
import * as UseAuth from 'common/hooks/useAuth';

import PrivateOutlet from '../PrivateOutlet';

describe('PrivateOutlet', () => {
  const useAuthSpy = vi.spyOn(UseAuth, 'useAuth');

  beforeEach(() => {
    useAuthSpy.mockReturnValue({ isAuthenticated: true });
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Routes>
        <Route path="/" element={<Navigate to="/private" />} />
        <Route path="/auth/signin" element={<div data-testid="not-authenticated" />} />
        <Route path="/private" element={<PrivateOutlet />}>
          <Route index={true} element={<div data-testid="authenticated" />} />
        </Route>
      </Routes>,
    );
    await screen.findByTestId('authenticated');

    // ASSERT
    expect(screen.getByTestId('authenticated')).toBeDefined();
  });

  it('should render private route when authenticated', async () => {
    // ARRANGE
    render(
      <Routes>
        <Route path="/" element={<Navigate to="/private" />} />
        <Route path="/auth/signin" element={<div data-testid="not-authenticated" />} />
        <Route path="/private" element={<PrivateOutlet />}>
          <Route index={true} element={<div data-testid="authenticated" />} />
        </Route>
      </Routes>,
    );
    await screen.findByTestId('authenticated');

    // ASSERT
    expect(screen.getByTestId('authenticated')).toBeDefined();
  });

  it('should redirect to signin route when not authenticated', async () => {
    // ARRANGE
    useAuthSpy.mockReturnValueOnce({ isAuthenticated: false });
    render(
      <Routes>
        <Route path="/" element={<Navigate to="/private" />} />
        <Route path="/auth/signin" element={<div data-testid="not-authenticated" />} />
        <Route path="/private" element={<PrivateOutlet />}>
          <Route index={true} element={<div data-testid="authenticated" />} />
        </Route>
      </Routes>,
    );
    await screen.findByTestId('not-authenticated');

    // ASSERT
    expect(screen.getByTestId('not-authenticated')).toBeDefined();
  });
});
