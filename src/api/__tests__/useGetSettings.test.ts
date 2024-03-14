import { renderHook, waitFor } from 'test/test-utils';

import { settingsFixture } from '__fixtures__/settings';
import { DEFAULT_SETTINGS, StorageKeys } from 'utils/constants';
import storage from 'utils/storage';

import { useGetSettings } from 'api/useGetSettings';

describe('useGetSettings', () => {
  const getItemSpy = jest.spyOn(storage, 'getItem');

  beforeEach(() => {
    getItemSpy.mockReturnValue(JSON.stringify(settingsFixture));
  });

  it('should get settings', async () => {
    const { result } = renderHook(() => useGetSettings());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.theme).toBeDefined();
    expect(getItemSpy).toHaveBeenCalled();
    expect(getItemSpy).toHaveBeenLastCalledWith(StorageKeys.Settings);
  });

  it('should return default settings when nothing stored', async () => {
    getItemSpy.mockReturnValue(null);
    const { result } = renderHook(() => useGetSettings());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(DEFAULT_SETTINGS);
  });

  it('should error on failure to get settings', async () => {
    getItemSpy.mockReturnValue('{invalid-json}}');
    const { result } = renderHook(() => useGetSettings());

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.isError).toBe(true);
  });
});
