import { queryClient, render, screen } from 'test/test-utils';
import { UseQueryResult } from '@tanstack/react-query';

import * as UseAuthContext from 'providers/AuthProvider';
import * as UseGetUser from 'api/useGetUser';
import { userFixture } from '__fixtures__/users';

import AppMenu from '../AppMenu';

describe('AppMenu', () => {
  const useAuthContextSpy = jest.spyOn(UseAuthContext, 'useAuthContext');
  const useGetUserSpy = jest.spyOn(UseGetUser, 'useGetUser');

  beforeEach(() => {
    queryClient.clear();
    useAuthContextSpy.mockReturnValue({
      isAuthenticated: true,
    });
    useGetUserSpy.mockReturnValue({
      data: userFixture,
    } as unknown as UseQueryResult<UseGetUser.User>);
  });

  it('should render successfully', async () => {
    render(<AppMenu />);

    await screen.findByTestId('menu-app');

    expect(screen.getByTestId('menu-app')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<AppMenu testId="custom-testid" />);

    await screen.findByTestId('custom-testid');

    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use custom className', async () => {
    render(<AppMenu className="custom-class" />);

    await screen.findByTestId('menu-app');

    expect(screen.getByTestId('menu-app').classList).toContain('custom-class');
  });

  it('should render authenticated content', async () => {
    render(<AppMenu />);

    await screen.findByTestId('menu-app');

    expect(screen.getByTestId('menu-app')).toBeDefined();
    expect(screen.getByText(userFixture.name)).toBeDefined();
    expect(screen.getByText('Sign Out')).toBeDefined();
  });

  it('should render unauthenticated content', async () => {
    useAuthContextSpy.mockReturnValue({
      isAuthenticated: false,
    });
    useGetUserSpy.mockReturnValue({
      data: undefined,
    } as unknown as UseQueryResult<UseGetUser.User>);

    render(<AppMenu />);

    await screen.findByTestId('menu-app');

    expect(screen.getByTestId('menu-app')).toBeDefined();
    expect(screen.getByAltText('Logo')).toBeDefined();
    expect(screen.getByText('Sign In')).toBeDefined();
    expect(screen.getByText('Sign Up')).toBeDefined();
  });
});
