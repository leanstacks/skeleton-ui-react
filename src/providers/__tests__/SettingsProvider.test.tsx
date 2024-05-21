import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  render as renderWithoutWrapper,
  renderHook as renderHookWithoutWrapper,
} from '@testing-library/react';

import { renderHook, screen, waitFor } from 'test/test-utils';

import SettingsContextProvider, { useSettings } from 'providers/SettingsProvider';
import * as UseGetSettings from 'api/useGetSettings';
import { settingsFixture } from '__fixtures__/settings';
import { UseQueryResult } from '@tanstack/react-query';

const useGetSettingsSpy = vi.spyOn(UseGetSettings, 'useGetSettings');

describe('SettingsProvider', () => {
  beforeEach(() => {
    useGetSettingsSpy.mockReturnValue({
      data: settingsFixture,
      isSuccess: true,
    } as unknown as UseQueryResult<UseGetSettings.Settings, Error>);
  });

  it('should render successfully', async () => {
    // ARRANGE
    renderWithoutWrapper(
      <SettingsContextProvider>
        <div data-testid="provider-settings"></div>
      </SettingsContextProvider>,
    );
    await screen.findByTestId('provider-settings');

    // ASSERT
    expect(screen.getByTestId('provider-settings')).toBeDefined();
  });
});

describe('useSettings', () => {
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
