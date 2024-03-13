import { useEffect, useState } from 'react';

/**
 * A utility hook to debounce any type of `value` for `delayMillis`
 * milliseconds.
 *
 * The hook returns the most recent `value` supplied when no changes
 * to `value` have been received for `delayMillis`.
 * @template T - The type of value to be debounced.
 * @param {T} value - The value to be debounced.
 * @param {number} delayMillis - The number of milliseconds to delay
 * before returning the latest value received.
 * @returns {T} The debounced `value`.
 */
export const useDebounce = <T = unknown>(value: T, delayMillis: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMillis);

    return () => clearTimeout(timeout);
  }, [value, delayMillis]);

  return debouncedValue;
};
