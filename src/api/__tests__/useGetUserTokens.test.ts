import { beforeEach, describe, expect, it, vi } from 'vitest';
import dayjs from 'dayjs';

import { renderHook, waitFor } from 'test/test-utils';
import storage from 'utils/storage';
import { userTokensFixture } from '__fixtures__/tokens';

import { UserTokens, useGetUserTokens } from 'api/useGetUserTokens';

describe('useGetTokens', () => {
  const getItemSpy = vi.spyOn(storage, 'getItem');

  beforeEach(() => {
    const token: UserTokens = {
      ...userTokensFixture,
      expires_at: dayjs().add(1, 'hours').toISOString(),
    };
    getItemSpy.mockReturnValue(JSON.stringify(token));
  });

  it('should get user tokens', async () => {
    // ARRANGE
    const { result } = renderHook(() => useGetUserTokens());
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.id_token).toBe('id-token');
  });

  it('should error if token is expired', async () => {
    // ARRANGE
    const token: UserTokens = {
      ...userTokensFixture,
      expires_at: dayjs('2024-01-01').toISOString(),
    };
    getItemSpy.mockReturnValue(JSON.stringify(token));
    const { result } = renderHook(() => useGetUserTokens());
    await waitFor(() => expect(result.current.error).toBeDefined());

    // ASSERT
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it('should error if token is not found', async () => {
    // ARRANGE
    getItemSpy.mockReturnValue(null);
    const { result } = renderHook(() => useGetUserTokens());
    await waitFor(() => expect(result.current.error).toBeDefined());

    // ASSERT
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
