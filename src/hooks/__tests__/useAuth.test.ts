import { UseQueryResult } from '@tanstack/react-query';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from 'test/test-utils';

import { userTokensFixture } from '__fixtures__/tokens';
import * as UseGetUserTokens from 'api/useGetUserTokens';

import { useAuth } from 'hooks/useAuth';

describe('useAuth', () => {
  const useGetUserTokensSpy = vi.spyOn(UseGetUserTokens, 'useGetUserTokens');

  beforeEach(() => {
    useGetUserTokensSpy.mockReturnValue({
      data: userTokensFixture,
      isSuccess: true,
      isPending: false,
    } as unknown as UseQueryResult<UseGetUserTokens.UserTokens, Error>);
  });

  it('should return the context', async () => {
    // ARRANGE
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.isAuthenticated).toBeDefined());

    // ASSERT
    expect(result.current).toBeDefined();
    expect(result.current.isAuthenticated).toBe(true);
  });
});
