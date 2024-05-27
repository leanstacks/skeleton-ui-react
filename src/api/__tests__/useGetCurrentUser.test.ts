import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from 'test/test-utils';

import { userFixture1 } from '__fixtures__/users';
import storage from 'utils/storage';

import { useGetCurrentUser } from 'api/useGetCurrentUser';

describe('useGetCurrentUser', () => {
  const getItemSpy = vi.spyOn(storage, 'getItem');

  beforeEach(() => {
    getItemSpy.mockReturnValue(JSON.stringify(userFixture1));
  });

  it('should get current user', async () => {
    // ARRANGE
    const { result } = renderHook(() => useGetCurrentUser());
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual(userFixture1);
  });

  it('should error when user not found', async () => {
    // ARRANGE
    getItemSpy.mockReturnValue(null);
    const { result } = renderHook(() => useGetCurrentUser());
    await waitFor(() => expect(result.current.isError).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.data).not.toBeDefined();
  });

  it('should error on failure to get current user', async () => {
    // ARRANGE
    getItemSpy.mockReturnValue('{invalid-json}}');
    const { result } = renderHook(() => useGetCurrentUser());
    await waitFor(() => expect(result.current.isError).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.data).not.toBeDefined();
  });
});
