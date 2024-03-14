import { renderHook, waitFor } from '@testing-library/react';

import { useDebounce } from 'hooks/useDebounce';

describe('useDebounce', () => {
  it('should return debounced value', async () => {
    const value = 1;
    const updatedValue = 2;

    // render hook with `value`
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value },
    });
    // expect hook to render initial value immediately
    expect(result.current).toBe(value);

    // rerender hook with `updatedValue`
    rerender({ value: updatedValue });
    // expect the hook value does NOT change immediately
    expect(result.current).toBe(value);

    // wait for hook value to debounce
    await waitFor(() => expect(result.current).toBe(updatedValue));
    // expect the hook value changes after debounce time elapsed
    expect(result.current).toBe(updatedValue);
  });

  it('should return debounced value after specified delay', async () => {
    const value = 1;
    const updatedValue = 2;

    // render hook with `value`
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 250), {
      initialProps: { value },
    });
    // expect hook to render initial value immediately
    expect(result.current).toBe(value);

    // rerender hook with `updatedValue`
    rerender({ value: updatedValue });
    // expect the hook value does NOT change immediately
    expect(result.current).toBe(value);

    // wait for hook value to debounce
    await waitFor(() => expect(result.current).toBe(updatedValue), { timeout: 500 });
    // expect the hook value changes after debounce time elapsed
    expect(result.current).toBe(updatedValue);
  });
});
