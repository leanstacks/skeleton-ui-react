import { renderHook, waitFor } from 'test/test-utils';

import { currentUserFixture } from '__fixtures__/users';
import { useGetCurrentUser } from 'api/useGetCurrentUser';
import { UseQueryResult } from '@tanstack/react-query';

describe('useGetCurrentUser', () => {
  it('should get current user', async () => {
    const { result } = renderHook(() => useGetCurrentUser({ enabled: true }));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.userId).toBe(currentUserFixture[0].userId);
  });

  it('should be enabled by default', async () => {
    const { result } = renderHook(() => useGetCurrentUser({}));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.userId).toBe(currentUserFixture[0].userId);
  });

  it('should not run when disabled', async () => {
    const { result } = renderHook(() => useGetCurrentUser({ enabled: false }));

    await waitFor(() => expect(result.current.data).not.toBeDefined());

    expect(result.current.data).not.toBeDefined();
  });

  it('should error when no user returned', async () => {
    const useGetUserInfoSpy = jest.spyOn(UseGetUserInfo, 'useGetUserInfo');
    useGetUserInfoSpy.mockReturnValue({
      data: { sub: 'not-found' },
      isSuccess: true,
    } as unknown as UseQueryResult<UseGetUserInfo.UserInfo, Error>);
    const { result } = renderHook(() => useGetCurrentUser({ enabled: true }));

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.isError).toBe(true);
  });
});
