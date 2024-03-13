import { renderHook, waitFor } from 'test/test-utils';
import storage from 'utils/storage';

import { useDeleteUserTokens } from 'api/useDeleteUserTokens';

describe('useDeleteUserTokens', () => {
  const removeItemSpy = jest.spyOn(storage, 'removeItem');

  it('should delete user tokens', async () => {
    let isSuccess = false;
    const { result } = renderHook(() => useDeleteUserTokens());

    await waitFor(() => expect(result.current).not.toBeNull());

    result.current.mutate(undefined, {
      onSuccess: () => {
        isSuccess = true;
      },
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(removeItemSpy).toHaveBeenCalled();
    expect(isSuccess).toBe(true);
  });

  it('should result in error when fails to delete', async () => {
    let isError = false;
    removeItemSpy.mockImplementationOnce(() => {
      throw new Error();
    });
    const { result } = renderHook(() => useDeleteUserTokens());

    await waitFor(() => expect(result.current).not.toBeNull());

    result.current.mutate(undefined, {
      onError: () => {
        isError = true;
      },
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(removeItemSpy).toHaveBeenCalled();
    expect(isError).toBe(true);
  });
});
