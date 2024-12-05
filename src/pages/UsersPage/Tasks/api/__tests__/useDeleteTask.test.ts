import { describe, expect, it } from 'vitest';

import { QueryKeys } from 'common/utils/constants';
import { Task } from 'pages/UsersPage/api/useGetUserTasks';
import { todosFixture } from '__fixtures__/todos';
import { queryClient } from 'test/query-client';
import { renderHook, waitFor } from 'test/test-utils';

import { useDeleteTask } from '../useDeleteTask';

describe('useDeleteTask', () => {
  it('should delete task', async () => {
    // ARRANGE
    const taskToDelete = todosFixture[0];
    let isSuccess = false;
    const { result } = renderHook(() => useDeleteTask());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { task: taskToDelete },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
  });

  it('should remove cached data if it exists', async () => {
    // ARRANGE
    const taskToDelete = todosFixture[0];
    queryClient.setQueryData([QueryKeys.Tasks, { userId: taskToDelete.userId }], [taskToDelete]);
    let isSuccess = false;
    const { result } = renderHook(() => useDeleteTask());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { task: taskToDelete },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
    expect(
      queryClient.getQueryData<Task[]>([QueryKeys.Tasks, { userId: taskToDelete.userId }])?.length,
    ).toBe(0);
  });
});
