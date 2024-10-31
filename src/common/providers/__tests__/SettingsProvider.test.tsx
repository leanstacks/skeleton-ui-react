import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render as renderWithoutWrapper } from '@testing-library/react';

import { screen } from 'test/test-utils';

import SettingsContextProvider from 'common/providers/SettingsProvider';
import { settingsFixture } from '__fixtures__/settings';
import * as UseGetSettings from 'common/api/useGetSettings';
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
