import { ButtonVariant, PropsWithClassName } from '@leanstacks/react-common';
import { useTranslation } from 'react-i18next';

import { StorageKeys } from 'utils/constants';
import storage from 'utils/storage';
import Dropdown from 'components/Dropdown/Dropdown';
import Icon from 'components/Icon/Icon';
import DropdownContent from 'components/Dropdown/DropdownContent';
import DropdownItem from 'components/Dropdown/DropdownItem';
import Button from './Button';

/**
 * Properties for the `LanguageToggle` component.
 * @see {@link PropsWithClassName}
 */
interface LanguageToggleProps extends PropsWithClassName {}

/**
 * The `LanguageToggle` component renders a `Dropdown` which allows users
 * to select the language in which they wish to view the application.
 * @param {LanguageToggleProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const LanguageToggle = ({ className }: LanguageToggleProps): JSX.Element => {
  const { i18n } = useTranslation();

  /**
   * Set the application-wide langague code used for i18n.
   * @param {string} lng - A langage code, e.g. `en` or `es`.
   */
  const setLanguage = (lng: string) => {
    storage.setItem(StorageKeys.Language, lng);
    i18n.changeLanguage(lng);
  };

  return (
    <Dropdown
      toggle={
        <Button variant={ButtonVariant.Text}>
          <Icon name="language" />
        </Button>
      }
      content={
        <DropdownContent className="text-sm">
          <DropdownItem onClick={() => setLanguage('en')} testId="dropdown-item-en">
            <Button variant={ButtonVariant.Text} className="!p-0">
              English
            </Button>
          </DropdownItem>
          <DropdownItem onClick={() => setLanguage('fr')} testId="dropdown-item-fr">
            <Button variant={ButtonVariant.Text} className="!p-0">
              French
            </Button>
          </DropdownItem>
          <DropdownItem onClick={() => setLanguage('es')} testId="dropdown-item-es">
            <Button variant={ButtonVariant.Text} className="!p-0">
              Spanish
            </Button>
          </DropdownItem>
        </DropdownContent>
      }
      className={className}
      testId="dropdown-language"
    />
  );
};

export default LanguageToggle;
