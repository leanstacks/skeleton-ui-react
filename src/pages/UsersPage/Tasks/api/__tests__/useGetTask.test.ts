import { describe, expect, it } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';

import { useGetTask } from '../useGetTask';

describe('useGetTask', () => {
  it('should render hook successfully', async () => {
    // ARRANGE
    const { result } = renderHook(() => useGetTask({ taskId: 1 }));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.id).toEqual(1);
  });
});
