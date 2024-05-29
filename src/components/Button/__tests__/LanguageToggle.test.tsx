import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import 'utils/i18n';
import { StorageKeys } from 'utils/constants';
import { render, screen } from 'test/test-utils';
import storage from 'utils/storage';

import LanguageToggle from '../LanguageToggle';

// mock select functions from react-i18next
const mockChangeLanguage = vi.fn();
vi.mock('react-i18next', async () => {
  const original = await vi.importActual('react-i18next');
  return {
    ...original,
    useTranslation: () => ({ i18n: { changeLanguage: mockChangeLanguage } }),
  };
});

describe('LanguageToggle', () => {
  const setItemSpy = vi.spyOn(storage, 'setItem');

  it('should render successfully', async () => {
    // ARRANGE
    render(<LanguageToggle />);
    await screen.findByTestId('dropdown-language');

    // ASSERT
    expect(screen.getByTestId('dropdown-language')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<LanguageToggle className="custom-className" />);
    await screen.findByTestId('dropdown-language');

    // ASSERT
    expect(screen.getByTestId('dropdown-language').classList).toContain('custom-className');
  });

  it('should set language to English', async () => {
    // ARRANGE
    render(<LanguageToggle />);
    await screen.findByTestId('dropdown-language');

    // ACT
    await userEvent.click(screen.getByTestId('dropdown-item-en'));

    // ASSERT
    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    expect(setItemSpy).toHaveBeenCalledWith(StorageKeys.Language, 'en');
  });

  it('should set language to French', async () => {
    // ARRANGE
    render(<LanguageToggle />);
    await screen.findByTestId('dropdown-language');

    // ACT
    await userEvent.click(screen.getByTestId('dropdown-item-fr'));

    // ASSERT
    expect(mockChangeLanguage).toHaveBeenCalledWith('fr');
    expect(setItemSpy).toHaveBeenCalledWith(StorageKeys.Language, 'fr');
  });

  it('should set language to Spanish', async () => {
    // ARRANGE
    render(<LanguageToggle />);
    await screen.findByTestId('dropdown-language');

    // ACT
    await userEvent.click(screen.getByTestId('dropdown-item-es'));

    // ASSERT
    expect(mockChangeLanguage).toHaveBeenCalledWith('es');
    expect(setItemSpy).toHaveBeenCalledWith(StorageKeys.Language, 'es');
  });
});
