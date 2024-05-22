import { ButtonVariant, PropsWithClassName } from '@leanstacks/react-common';
import classNames from 'classnames';

import { useSetSettings } from 'api/useSetSettings';
import { useSettings } from 'hooks/useSettings';
import Button from './Button';
import Icon from 'components/Icon/Icon';

/**
 * Properties for the `ThemeToggle` component.
 */
interface ThemeToggleProps extends PropsWithClassName {}

/**
 * The `ThemeToggle` React component renders a `Button` which allows users
 * to toggle between light and dark themes.
 * @param {ThemeToggleProps} [props] - Component  properties, `ThemeProps`.
 * @returns {JSX.Element} JSX
 * @see {@link ThemeToggleProps}
 */
const ThemeToggle = ({ className }: ThemeToggleProps): JSX.Element => {
  const settings = useSettings();
  const { mutate: setSettings } = useSetSettings();

  return (
    <>
      {settings?.theme === 'light' ? (
        <Button
          variant={ButtonVariant.Text}
          className={classNames('text-light-text', className)}
          title="Dark Mode"
          onClick={() => setSettings({ theme: 'dark' })}
          testId="button-theme-dark"
        >
          <Icon name="lightbulb" fill={1} testId="icon-dark-mode" />
        </Button>
      ) : (
        <Button
          variant={ButtonVariant.Text}
          className={classNames('text-dark-text', className)}
          title="Light Mode"
          onClick={() => setSettings({ theme: 'light' })}
          testId="button-theme-light"
        >
          <Icon name="lightbulb" fill={0} testId="icon-light-mode" />
        </Button>
      )}
    </>
  );
};

export default ThemeToggle;
