import { queryClient, renderHook, waitFor } from 'test/test-utils';

import { UpdatableUser, useUpdateUser } from '../useUpdateUser';
import { QueryKeys } from 'utils/constants';
import { currentUserFixture } from '__fixtures__/users';

describe('useUpdateUser', () => {
  it('should update user', async () => {
    // ARRANGE
    let isSuccess = false;
    const updatedValue: UpdatableUser = {
      userId: '1',
      firstName: 'Unit',
      lastName: 'Tester',
      displayName: 'unit_tester',
    };

    const { result } = renderHook(() => useUpdateUser());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(updatedValue, {
      onSuccess: () => {
        isSuccess = true;
      },
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
  });

  it('should update cached user', async () => {
    // ARRANGE
    let isSuccess = false;
    const updatedValue: UpdatableUser = {
      userId: '1',
      firstName: 'Unit',
      lastName: 'Tester',
      displayName: 'unit_tester',
    };
    queryClient.setQueryData(
      [
        QueryKeys.UserCurrent,
        {
          externalId: currentUserFixture[0].externalId,
        },
      ],
      currentUserFixture,
    );

    const { result } = renderHook(() => useUpdateUser());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(updatedValue, {
      onSuccess: () => {
        isSuccess = true;
      },
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
  });
});
