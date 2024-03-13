import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';
import { DEFAULT_SETTINGS } from 'utils/constants';
import * as SettingsProvider from 'providers/SettingsProvider';
import * as ToastsProvider from 'providers/ToastsProvider';

import WeatherSettings from '../WeatherSettings';

describe('WeatherSettings', () => {
  const useToastsSpy = jest.spyOn(ToastsProvider, 'useToasts');
  const mockCreateToast = jest.fn();
  const useSettingsSpy = jest.spyOn(SettingsProvider, 'useSettings');

  beforeEach(() => {
    useSettingsSpy.mockReturnValue(DEFAULT_SETTINGS);

    useToastsSpy.mockReturnValue({
      toasts: [],
      removeToast: jest.fn(),
      createToast: mockCreateToast,
    });
  });

  it('should render successfully', async () => {
    render(<WeatherSettings />);

    await screen.findByTestId('settings-weather');

    expect(screen.getByTestId('settings-weather')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<WeatherSettings testId="custom-testId" />);

    await screen.findByTestId('custom-testId');

    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should submit form', async () => {
    render(<WeatherSettings />);
    await screen.findByTestId('settings-weather');

    await userEvent.click(screen.getByTestId('settings-weather-select-field-units'));
    await userEvent.click(screen.getByTestId('settings-weather-select-field-units-option-metric'));

    expect(mockCreateToast).toHaveBeenCalledTimes(1);
  });

  it('should set weather location', async () => {
    // ARRANGE
    render(<WeatherSettings testId={'component'} />);
    await screen.findByTestId('component-search-view');

    // ACT
    // display the search field and enter a value
    await userEvent.click(screen.getByTestId('component-search-view'));
    await userEvent.type(screen.getByTestId('component-search-field-search-input'), 'new york');
    // wait for the search results and click a result
    await screen.findByTestId('component-search-field-search-result-1234567', undefined, {
      timeout: 3000,
    });
    await userEvent.click(screen.getByTestId('component-search-field-search-result-1234567'));

    // ASSERT
    expect(mockCreateToast).toHaveBeenCalledTimes(1);
  });
});
