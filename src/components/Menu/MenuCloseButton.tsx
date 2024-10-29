import { ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import FAIcon from 'components/Icon/FAIcon';

/**
 * Properties for the `MenuCloseButton` component.
 * @param {function} [close] - Optional. If provided, invoked when the user
 * clicks the close button.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface MenuCloseButtonProps extends PropsWithClassName, PropsWithTestId {
  close?: () => void;
}

/**
 * The `MenuCloseButton` component renders a `Button` which closes a Menu by
 * invoking the supplied `close` function.
 * @param {MenuCloseButtonProps} props - Component properties, `MenuCloseButtonProps`.
 * @returns {JSX.Element} JSX
 */
const MenuCloseButton = ({
  className,
  close,
  testId = 'menu-close-button',
}: MenuCloseButtonProps): JSX.Element => {
  return (
    <Button
      variant={ButtonVariant.Text}
      className={classNames('pe-1 ps-1 hover:bg-neutral-200 dark:hover:bg-opacity-25', className)}
      onClick={() => close?.()}
      title="Close"
      testId={testId}
    >
      <FAIcon icon="xmark" size="lg" />
    </Button>
  );
};

export default MenuCloseButton;
