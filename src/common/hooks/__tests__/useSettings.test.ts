import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook as renderHookWithoutWrapper } from '@testing-library/react';
import { UseQueryResult } from '@tanstack/react-query';

import { renderHook, waitFor } from 'test/test-utils';
import * as UseGetSettings from 'common/api/useGetSettings';
import { settingsFixture } from '__fixtures__/settings';

import { useSettings } from 'common/hooks/useSettings';

describe('useSettings', () => {
  const useGetSettingsSpy = vi.spyOn(UseGetSettings, 'useGetSettings');

  beforeEach(() => {
    useGetSettingsSpy.mockReturnValue({
      data: settingsFixture,
      isSuccess: true,
    } as unknown as UseQueryResult<UseGetSettings.Settings, Error>);
  });

  it('should return default value', async () => {
    // ARRANGE
    const { result } = renderHook(() => UseGetSettings.useGetSettings());
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.theme).toBe(settingsFixture.theme);
  });

  it('should throw error when not within provider', () => {
    // ASSERT
    expect(() => renderHookWithoutWrapper(() => useSettings())).toThrow(/hook must be used within/);
  });
});
