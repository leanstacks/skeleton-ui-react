import { renderHook, waitFor } from '@testing-library/react';

import { useDebounce } from 'hooks/useDebounce';

describe('useDebounce', () => {
  it('should return debounced value', async () => {
    // ARRANGE
    const value = 1;
    const updatedValue = 2;
    // render hook with `value`
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value },
    });

    // ASSERT
    // expect hook to render initial value immediately
    expect(result.current).toBe(value);

    // ARRANGE
    // rerender hook with `updatedValue`
    rerender({ value: updatedValue });

    // ASSERT
    // expect the hook value does NOT change immediately
    expect(result.current).toBe(value);
    // wait for hook value to debounce
    await waitFor(() => expect(result.current).toBe(updatedValue));
    // expect the hook value changes after debounce time elapsed
    expect(result.current).toBe(updatedValue);
  });

  it('should return debounced value after specified delay', async () => {
    // ARRANGE
    const value = 1;
    const updatedValue = 2;
    // render hook with `value`
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 250), {
      initialProps: { value },
    });

    // ASSERT
    // expect hook to render initial value immediately
    expect(result.current).toBe(value);

    // ARRANGE
    // rerender hook with `updatedValue`
    rerender({ value: updatedValue });

    // ASSERT
    // expect the hook value does NOT change immediately
    expect(result.current).toBe(value);
    // wait for hook value to debounce
    await waitFor(() => expect(result.current).toBe(updatedValue), { timeout: 500 });
    // expect the hook value changes after debounce time elapsed
    expect(result.current).toBe(updatedValue);
  });
});
