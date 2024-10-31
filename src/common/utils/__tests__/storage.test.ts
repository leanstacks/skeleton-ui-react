import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import storage from 'common/utils/storage';

describe('storage', () => {
  const originalLocalStorage = global.localStorage;
  const mockGetItem = vi.fn();
  const mockSetItem = vi.fn();
  const mockRemoveItem = vi.fn();

  beforeAll(() => {
    Object.defineProperty(global, 'localStorage', {
      value: { getItem: mockGetItem, removeItem: mockRemoveItem, setItem: mockSetItem },
    });
  });

  afterAll(() => {
    Object.defineProperty(global, 'localStorage', { value: originalLocalStorage });
  });

  it('should get an item', () => {
    // ARRANGE
    mockGetItem.mockReturnValueOnce('value');

    // ACT
    const value = storage.getItem('key');

    // ASSERT
    expect(value).toBe('value');
    expect(mockGetItem).toHaveBeenCalledTimes(1);
    expect(mockGetItem).toHaveBeenCalledWith('key');
  });

  it('should set an item', () => {
    // ACT
    storage.setItem('key', 'value');

    // ASSERT
    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem).toHaveBeenCalledWith('key', 'value');
  });

  it('should remove an item', () => {
    // ACT
    storage.removeItem('key');

    // ASSERT
    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
    expect(mockRemoveItem).toHaveBeenCalledWith('key');
  });
});
