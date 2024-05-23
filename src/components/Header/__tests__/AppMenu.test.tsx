import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test/test-utils';
import { queryClient } from 'test/query-client';
import { UseQueryResult } from '@tanstack/react-query';

import * as UseAuth from 'hooks/useAuth';
import * as UseGetUser from 'api/useGetUser';
import { userFixture1 } from '__fixtures__/users';

import AppMenu from '../AppMenu';

describe('AppMenu', () => {
  const useAuthSpy = vi.spyOn(UseAuth, 'useAuth');
  const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');

  beforeEach(() => {
    queryClient.clear();
    useAuthSpy.mockReturnValue({
      isAuthenticated: true,
    });
    useGetUserSpy.mockReturnValue({
      data: userFixture1,
    } as unknown as UseQueryResult<UseGetUser.User>);
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<AppMenu />);
    await screen.findByTestId('menu-app');

    // ASSERT
    expect(screen.getByTestId('menu-app')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<AppMenu testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<AppMenu className="custom-class" />);
    await screen.findByTestId('menu-app');

    // ASSERT
    expect(screen.getByTestId('menu-app').classList).toContain('custom-class');
  });

  it('should render authenticated content', async () => {
    // ARRANGE
    render(<AppMenu />);
    await screen.findByTestId('menu-app');

    // ASSERT
    expect(screen.getByTestId('menu-app')).toBeDefined();
    expect(screen.getByText(userFixture1.name)).toBeDefined();
    expect(screen.getByText('Sign Out')).toBeDefined();
  });

  it('should render unauthenticated content', async () => {
    // ARRANGE
    useAuthSpy.mockReturnValue({
      isAuthenticated: false,
    });
    useGetUserSpy.mockReturnValue({
      data: undefined,
    } as unknown as UseQueryResult<UseGetUser.User>);
    render(<AppMenu />);
    await screen.findByTestId('menu-app');

    // ASSERT
    expect(screen.getByTestId('menu-app')).toBeDefined();
    expect(screen.getByAltText('Logo')).toBeDefined();
    expect(screen.getByText('Sign In')).toBeDefined();
    expect(screen.getByText('Sign Up')).toBeDefined();
  });
});
