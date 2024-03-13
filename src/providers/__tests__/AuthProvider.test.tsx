import { UseQueryResult } from '@tanstack/react-query';

import { render, renderHook, screen, waitFor } from 'test/test-utils';

import { clientTokenFromStorageFixture, userTokensFromAuthCodeFixture } from '__fixtures__/tokens';
import * as UseGetUserTokens from 'api/useGetUserTokens';
import * as UseGetClientToken from 'api/useGetClientToken';

import AuthContextProvider, { useAuthContext } from 'providers/AuthProvider';

describe('AuthProvider', () => {
  const useGetUserTokensSpy = jest.spyOn(UseGetUserTokens, 'useGetUserTokens');
  const useGetClientTokenSpy = jest.spyOn(UseGetClientToken, 'useGetClientToken');

  beforeEach(() => {
    useGetUserTokensSpy.mockReturnValue({
      data: userTokensFromAuthCodeFixture,
      isPending: false,
      isSuccess: true,
    } as unknown as UseQueryResult<UseGetUserTokens.UserTokens, Error>);

    useGetClientTokenSpy.mockReturnValue({
      data: clientTokenFromStorageFixture,
      isPending: false,
    } as unknown as UseQueryResult<UseGetClientToken.ClientToken, Error>);
  });

  it('should render successfully', async () => {
    render(
      <AuthContextProvider>
        <div data-testid="provider-auth-ready"></div>
      </AuthContextProvider>,
    );

    await screen.findByTestId('provider-auth-ready');

    expect(screen.getByTestId('provider-auth-ready')).toBeDefined();
  });

  it('should render children when ready', async () => {
    render(
      <AuthContextProvider>
        <div data-testid="provider-auth-ready"></div>
      </AuthContextProvider>,
    );

    await screen.findByTestId('provider-auth-ready');

    expect(screen.getByTestId('provider-auth-ready')).toBeDefined();
  });

  it('should render loader when not ready', async () => {
    useGetUserTokensSpy.mockReturnValue({
      data: undefined,
      isPending: true,
      isSuccess: false,
    } as unknown as UseQueryResult<UseGetUserTokens.UserTokens, Error>);
    render(
      <AuthContextProvider>
        <div data-testid="provider-auth-ready"></div>
      </AuthContextProvider>,
    );

    await screen.findByTestId('provider-auth');

    expect(screen.getByTestId('provider-auth')).toBeDefined();
  });
});

describe('useAuthContext', () => {
  const useGetUserTokensSpy = jest.spyOn(UseGetUserTokens, 'useGetUserTokens');
  const useGetClientTokenSpy = jest.spyOn(UseGetClientToken, 'useGetClientToken');

  beforeEach(() => {
    useGetUserTokensSpy.mockReturnValue({
      data: userTokensFromAuthCodeFixture,
      isSuccess: true,
      isPending: false,
    } as unknown as UseQueryResult<UseGetUserTokens.UserTokens, Error>);

    useGetClientTokenSpy.mockReturnValue({
      data: clientTokenFromStorageFixture,
      isPending: false,
    } as unknown as UseQueryResult<UseGetClientToken.ClientToken, Error>);
  });

  it('should return the context', async () => {
    const { result } = renderHook(() => useAuthContext());

    await waitFor(() => expect(result.current.isAuthenticated).toBeDefined());

    expect(result.current).toBeDefined();
    expect(result.current.isAuthenticated).toBe(true);
  });
});
