import { UseMutationResult } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';
import { Settings } from 'api/useGetSettings';
import { DEFAULT_SETTINGS } from 'utils/constants';
import * as SettingsProvider from 'providers/SettingsProvider';
import * as UseSetSettings from 'api/useSetSettings';

import AppearanceSettings from '../AppearanceSettings';

describe('AppearanceSettings', () => {
  const useSettingsSpy = jest.spyOn(SettingsProvider, 'useSettings');
  const useSetSettingsSpy = jest.spyOn(UseSetSettings, 'useSetSettings');
  const mockSetSettings = jest.fn();

  beforeEach(() => {
    useSettingsSpy.mockReturnValue(DEFAULT_SETTINGS);

    useSetSettingsSpy.mockReturnValue({
      mutate: mockSetSettings,
    } as unknown as UseMutationResult<Settings, Error, Partial<Settings>>);
  });

  it('should render successfully', async () => {
    render(<AppearanceSettings />);

    await screen.findByTestId('settings-appearance');

    expect(screen.getByTestId('settings-appearance')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<AppearanceSettings testId="custom-testId" />);

    await screen.findByTestId('custom-testId');

    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should set dark theme', async () => {
    // ARRANGE
    render(<AppearanceSettings />);
    await screen.findByTestId('settings-appearance');

    // ACT
    await userEvent.click(screen.getByTestId('settings-appearance-theme-dark'));

    // ASSERT
    expect(mockSetSettings).toHaveBeenCalled();
    expect(mockSetSettings).toHaveBeenCalledWith({ theme: 'dark' });
  });

  it('should set light theme', async () => {
    // ARRANGE
    useSettingsSpy.mockReturnValue({ ...DEFAULT_SETTINGS, theme: 'dark' });
    render(<AppearanceSettings />);
    await screen.findByTestId('settings-appearance');

    // ACT
    await userEvent.click(screen.getByTestId('settings-appearance-theme-light'));

    // ASSERT
    expect(mockSetSettings).toHaveBeenCalled();
    expect(mockSetSettings).toHaveBeenCalledWith({ theme: 'light' });
  });
});
