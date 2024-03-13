import { renderHook, waitFor } from 'test/test-utils';
import dayjs from 'dayjs';

import {
  userTokensFromAuthCodeFixture,
  userTokensFromRefreshTokenFixture,
  userTokensFromStorageFixture,
} from '__fixtures__/tokens';
import storage from 'utils/storage';

import { useGetUserTokens } from 'api/useGetUserTokens';

describe('useGetUserTokens', () => {
  const getItemSpy = jest.spyOn(storage, 'getItem');
  const removeItemSpy = jest.spyOn(storage, 'removeItem');

  beforeEach(() => {
    getItemSpy.mockReturnValue(JSON.stringify(userTokensFromStorageFixture));
  });

  it('should get user tokens with authorization code', async () => {
    const { result } = renderHook(() => useGetUserTokens('authorizationCode'));

    await waitFor(() =>
      expect(result.current.data?.id_token).toBe(userTokensFromAuthCodeFixture.id_token),
    );

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.id_token).toBe(userTokensFromAuthCodeFixture.id_token);
  });

  it('should get user tokens with refresh token', async () => {
    const { result } = renderHook(() => useGetUserTokens());

    await waitFor(() =>
      expect(result.current.data?.id_token).toBe(userTokensFromRefreshTokenFixture.id_token),
    );

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.id_token).toBe(userTokensFromRefreshTokenFixture.id_token);
  });

  it('should get user tokens from storage when not expired', async () => {
    getItemSpy.mockReturnValue(
      JSON.stringify({
        ...userTokensFromStorageFixture,
        expires_at: dayjs().add(1, 'hour').toISOString(),
      }),
    );
    const { result } = renderHook(() => useGetUserTokens());

    await waitFor(() =>
      expect(result.current.data?.id_token).toBe(userTokensFromStorageFixture.id_token),
    );

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.id_token).toBe(userTokensFromStorageFixture.id_token);
  });

  it('should remove user tokens from storage when refresh token fails', async () => {
    getItemSpy.mockReturnValue(
      JSON.stringify({
        ...userTokensFromStorageFixture,
        refresh_token: 'refresh-token-invalid',
      }),
    );
    const { result } = renderHook(() => useGetUserTokens());

    await waitFor(() => expect(result.current.error).toBeDefined());

    expect(removeItemSpy).toHaveBeenCalled();
  });

  it('should error when no refresh token in storage', async () => {
    getItemSpy.mockReturnValue(null);
    const { result } = renderHook(() => useGetUserTokens());

    await waitFor(() => expect(result.current.error).toBeDefined());

    expect(result.current.error).toBeInstanceOf(Error);
  });
});
