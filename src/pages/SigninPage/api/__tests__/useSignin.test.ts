import { describe, expect, it, vi } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import storage from 'common/utils/storage';

import { useSignin } from '../useSignin';

describe('useSignin', () => {
  const setItemSpy = vi.spyOn(storage, 'setItem');

  it('should signin successfully', async () => {
    // ARRANGE
    let isSuccess = false;
    const { result } = renderHook(() => useSignin());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate('Bret', {
      onSuccess: () => {
        isSuccess = true;
      },
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ARRANGE
    expect(isSuccess).toBe(true);
    expect(setItemSpy).toHaveBeenCalledTimes(2);
  });

  it('should error if user not found', async () => {
    // ARRANGE
    const { result } = renderHook(() => useSignin());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate('NotFound');
    await waitFor(() => expect(result.current.isError).toBe(true));

    // ARRANGE
    expect(setItemSpy).not.toHaveBeenCalled();
  });
});
