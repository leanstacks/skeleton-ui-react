import { describe, expect, it } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import { queryClient } from 'test/query-client';
import { todosFixture } from '__fixtures__/todos';
import { QueryKeys } from 'common/utils/constants';
import { Task } from '../../../api/useGetUserTasks';

import { useUpdateTask } from '../useUpdateTask';

describe('useUpdateTask', () => {
  it('should update task', async () => {
    // ARRANGE
    const updatedTask = todosFixture[0];
    let isSuccess = false;
    const { result } = renderHook(() => useUpdateTask());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { task: updatedTask },
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

  it('should create cached data when none exists', async () => {
    // ARRANGE
    const updatedTask = todosFixture[0];
    let isSuccess = false;
    const { result } = renderHook(() => useUpdateTask());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { task: updatedTask },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
    expect(queryClient.getQueryData([QueryKeys.Tasks, { userId: updatedTask.userId }])).toEqual([
      updatedTask,
    ]);
  });

  it('should update cached data when exists', async () => {
    // ARRANGE
    const updatedTask = todosFixture[0];
    queryClient.setQueryData([QueryKeys.Tasks, { userId: updatedTask.userId }], todosFixture);
    let isSuccess = false;
    const { result } = renderHook(() => useUpdateTask());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { task: updatedTask },
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
      queryClient.getQueryData<Task[]>([QueryKeys.Tasks, { userId: updatedTask.userId }])?.length,
    ).toEqual(todosFixture.length);
  });
});
