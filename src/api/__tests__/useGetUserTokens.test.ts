import { describe, expect, it } from 'vitest';
import { useGetUserTokens } from 'api/useGetUserTokens';
import { renderHook, waitFor } from 'test/test-utils';

describe('useGetTokens', () => {
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
});
