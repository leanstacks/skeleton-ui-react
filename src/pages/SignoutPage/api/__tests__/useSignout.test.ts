import { describe, expect, it, vi } from 'vitest';

import storage from 'common/utils/storage';
import { renderHook, waitFor } from 'test/test-utils';

import { useSignout } from '../useSignout';

describe('useSignout', () => {
  const removeItemSpy = vi.spyOn(storage, 'removeItem');

  it('should signout user successfully', async () => {
    // ARRANGE
    let isSuccess = false;
    const { result } = renderHook(() => useSignout());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(undefined, {
      onSuccess: () => {
        isSuccess = true;
      },
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ARRANGE
    expect(isSuccess).toBe(true);
    expect(removeItemSpy).toHaveBeenCalledTimes(2);
  });

  it('should error on failure to signout', async () => {
    // ARRANGE
    removeItemSpy.mockImplementation(() => {
      throw new Error('test');
    });
    const { result } = renderHook(() => useSignout());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(undefined);
    await waitFor(() => expect(result.current.isError).toBe(true));

    // ARRANGE
    expect(removeItemSpy).toHaveBeenCalled();
  });
});
