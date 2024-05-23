import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from 'test/test-utils';

import storage from 'utils/storage';
import { Settings } from 'api/useGetSettings';

import { useSetSettings } from 'api/useSetSettings';

describe('useSetSettings', () => {
  const setItemSpy = vi.spyOn(storage, 'setItem');

  it('should update settings', async () => {
    // ARRANGE
    let isSuccess = false;
    const updatedSettings: Settings = { theme: 'dark' };
    const { result } = renderHook(() => useSetSettings());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(updatedSettings, {
      onSuccess: () => {
        isSuccess = true;
      },
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(setItemSpy).toHaveBeenCalled();
    expect(isSuccess).toBe(true);
  });

  it('should error on failure to set settings', async () => {
    // ARRANGE
    setItemSpy.mockImplementation(() => {
      throw new Error('test');
    });
    const updatedSettings: Settings = { theme: 'light' };
    const { result } = renderHook(() => useSetSettings());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(updatedSettings);
    await waitFor(() => expect(result.current.isError).toBe(true));

    // ASSERT
    expect(setItemSpy).toHaveBeenCalled();
  });
});
