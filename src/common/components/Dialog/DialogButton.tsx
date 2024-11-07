import { Button, ButtonProps, ButtonVariant } from '@leanstacks/react-common';
import classNames from 'classnames';

type DialogButtonVariant = 'primary' | 'secondary' | 'danger';

interface DialogButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: DialogButtonVariant;
}

const DialogButton = ({
  className,
  variant = 'secondary',
  testId = 'dialog-button',
  ...buttonProps
}: DialogButtonProps): JSX.Element => {
  const classes = classNames(
    'text-sm',
    { 'text-blue-600 dark:text-blue-400 font-bold': variant === 'primary' },
    { 'text-red-600 font-bold': variant === 'danger' },
    className,
  );

  return (
    <Button variant={ButtonVariant.Text} className={classes} testId={testId} {...buttonProps} />
  );
};

export default DialogButton;
