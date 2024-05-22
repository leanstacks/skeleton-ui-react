import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from 'test/test-utils';

import * as UseAuth from 'hooks/useAuth';
import { userTokensFixture } from '__fixtures__/tokens';

import { useAxios } from 'hooks/useAxios';

describe('useAxios', () => {
  const useAuthSpy = vi.spyOn(UseAuth, 'useAuth');
  const refetchUserTokensMock = vi.fn();

  beforeEach(() => {
    useAuthSpy.mockReturnValue({
      isAuthenticated: true,
      userToken: userTokensFixture,
      refetchUserTokens: refetchUserTokensMock,
    });
  });

  it('should return context', async () => {
    // ARRANGE
    const { result } = renderHook(() => useAxios());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ASSERT
    expect(result.current).toBeDefined();
    expect(result.current.request).toBeDefined();
  });
});
