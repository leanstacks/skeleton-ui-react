import { UseMutationResult } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';
import { Settings } from 'api/useGetSettings';
import * as SettingsProvider from 'providers/SettingsProvider';
import * as UseSetSettings from 'api/useSetSettings';
import { settingsFixture } from '__fixtures__/settings';

import ThemeToggle from '../ThemeToggle';

describe('ThemeToggle', () => {
  const useSettingsSpy = jest.spyOn(SettingsProvider, 'useSettings');
  const useSetSettingsSpy = jest.spyOn(UseSetSettings, 'useSetSettings');
  const mockMutate = jest.fn();

  beforeEach(() => {
    useSettingsSpy.mockReturnValue({
      ...settingsFixture,
      theme: 'light',
    });

    useSetSettingsSpy.mockReturnValue({
      mutate: mockMutate,
    } as unknown as UseMutationResult<Settings, Error, Partial<Settings>, unknown>);
  });

  it('should render successfully', async () => {
    render(<ThemeToggle />);

    await screen.findByTestId('button-theme-dark');

    expect(screen.getByTestId('button-theme-dark')).toBeDefined();
  });

  it('should render dark mode icon', async () => {
    render(<ThemeToggle />);

    await screen.findByTestId('button-theme-dark');

    expect(screen.getByTestId('button-theme-dark')).toBeDefined();
    expect(screen.getByTestId('icon-dark-mode').textContent).toBe('lightbulb');
  });

  it('should render light mode icon', async () => {
    useSettingsSpy.mockReturnValue({
      ...settingsFixture,
      theme: 'dark',
    });
    render(<ThemeToggle />);

    await screen.findByTestId('button-theme-light');

    expect(screen.getByTestId('button-theme-light')).toBeDefined();
    expect(screen.getByTestId('icon-light-mode').textContent).toBe('lightbulb');
  });

  it('should set dark theme when clicked', async () => {
    render(<ThemeToggle />);

    await screen.findByTestId('button-theme-dark');

    await userEvent.click(screen.getByTestId('button-theme-dark'));

    expect(mockMutate).toHaveBeenCalledWith({ theme: 'dark' });
  });

  it('should set light theme when clicked', async () => {
    useSettingsSpy.mockReturnValue({
      ...settingsFixture,
      theme: 'dark',
    });
    render(<ThemeToggle />);

    await screen.findByTestId('button-theme-light');

    await userEvent.click(screen.getByTestId('button-theme-light'));

    expect(mockMutate).toHaveBeenCalledWith({ theme: 'light' });
  });
});
