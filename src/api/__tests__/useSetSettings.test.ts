import { renderHook, waitFor } from 'test/test-utils';

import storage from 'utils/storage';
import { Settings } from 'api/useGetSettings';

import { useSetSettings } from 'api/useSetSettings';

describe('useSetSettings', () => {
  const setItemSpy = jest.spyOn(storage, 'setItem');

  it('should update settings', async () => {
    let isSuccess = false;
    const updatedSettings: Settings = { theme: 'dark', units: 'imperial' };

    const { result } = renderHook(() => useSetSettings());

    await waitFor(() => expect(result.current).not.toBeNull());

    result.current.mutate(updatedSettings, {
      onSuccess: () => {
        isSuccess = true;
      },
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(setItemSpy).toHaveBeenCalled();
    expect(isSuccess).toBe(true);
  });

  it('should error on failure to set settings', async () => {
    setItemSpy.mockImplementation(() => {
      throw new Error('test');
    });
    const updatedSettings: Settings = { theme: 'light', units: 'imperial' };

    const { result } = renderHook(() => useSetSettings());

    await waitFor(() => expect(result.current).not.toBeNull());

    result.current.mutate(updatedSettings);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(setItemSpy).toHaveBeenCalled();
  });
});
