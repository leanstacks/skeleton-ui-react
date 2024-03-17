import { renderHook, waitFor } from 'test/test-utils';
import { useGetUserTasks } from '../useGetUserTasks';

describe('useGetUserTasks', () => {
  it('should get tasks for user', async () => {
    // ARRANGE
    const { result } = renderHook(() => useGetUserTasks({ userId: 1 }));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.length).toBe(3);
  });

  it('should get return empty array when not found', async () => {
    // ARRANGE
    const { result } = renderHook(() => useGetUserTasks({ userId: 9999 }));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toEqual([]);
  });
});
