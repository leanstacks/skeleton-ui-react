import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';

import { userTokensFixture } from '__fixtures__/tokens';
import * as UseGetUserTokens from 'common/api/useGetUserTokens';

import AuthContextProvider from 'common/providers/AuthProvider';

describe('AuthProvider', () => {
  const useGetUserTokensSpy = vi.spyOn(UseGetUserTokens, 'useGetUserTokens');

  beforeEach(() => {
    useGetUserTokensSpy.mockReturnValue({
      data: userTokensFixture,
      isPending: false,
      isSuccess: true,
    } as unknown as UseQueryResult<UseGetUserTokens.UserTokens, Error>);
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(
      <AuthContextProvider>
        <div data-testid="provider-auth-ready"></div>
      </AuthContextProvider>,
    );
    await screen.findByTestId('provider-auth-ready');

    // ASSERT
    expect(screen.getByTestId('provider-auth-ready')).toBeDefined();
  });

  it('should render children when ready', async () => {
    // ARRANGE
    render(
      <AuthContextProvider>
        <div data-testid="provider-auth-ready"></div>
      </AuthContextProvider>,
    );
    await screen.findByTestId('provider-auth-ready');

    // ASSERT
    expect(screen.getByTestId('provider-auth-ready')).toBeDefined();
  });

  it('should render loader when not ready', async () => {
    // ARRANGE
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

    // ASSERT
    expect(screen.getByTestId('provider-auth')).toBeDefined();
  });
});
