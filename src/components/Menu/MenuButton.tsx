import { ComponentType, useState } from 'react';
import { ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

import { MenuProps } from './Menu';
import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';

/**
 * Properties for the `MenuButton` component.
 * @param {ComponentType<MenuProps>} Menu - The Menu component to be rendered
 * when the button is clicked. Any component whose properties include `MenuProps`.
 * @param {string} [title] - Optional. The button title attribute value.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface MenuButtonProps extends PropsWithClassName, PropsWithTestId {
  Menu: ComponentType<MenuProps>;
  title?: string;
}

/**
 * The `MenuButton` React component renders a `Button` which toggles rendering
 * the supplied `Menu` when clicked.
 * @param {MenuButtonProps} props - Component properties, `MenuButtonProps`.
 * @returns {JSX.Element} JSX
 */
const MenuButton = ({
  className,
  Menu,
  testId = 'button-menu',
  title = 'Menu',
}: MenuButtonProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Button
        variant={ButtonVariant.Text}
        className={classNames('text-light-text dark:text-dark-text', className)}
        onClick={() => setIsMenuOpen(true)}
        title={title}
        testId={testId}
      >
        <Icon name="menu" testId={`${testId}-icon`} />
      </Button>
      {isMenuOpen && <Menu close={() => setIsMenuOpen(false)} />}
    </>
  );
};

export default MenuButton;
