import { PropsWithChildren, useEffect, useState } from 'react';
import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';

import Backdrop from './Backdrop';

/**
 * Properties for the `Dialog` component.
 * @param {boolean} [isOpen] - Indicates if the Dialog should be displayed.
 * @param {function} [onClose] - A function called when the Dialog closes.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 */
export interface DialogProps extends BaseComponentProps, PropsWithChildren {
  isOpen?: boolean;
  onClose?: () => void | Promise<void>;
}

/**
 * A `Dialog` is a modal window that displays on top of the main content,
 * typically asking the user to take an action or confirm a decision.
 * @param {DialogProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Dialog = ({
  children,
  className,
  isOpen = false,
  onClose,
  testId = 'dialog',
}: DialogProps): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsDialogOpen(isOpen);
  }, [isOpen]);

  const closeDialog = (): void => {
    setIsDialogOpen(false);
    onClose?.();
  };

  const handleBackdropClick = (): void => {
    console.log('handleBackdropClick');
    closeDialog();
  };

  const handleDialogClick = (e: React.MouseEvent): void => {
    console.log('handleDialogClick');
    e.stopPropagation();
  };

  return (
    <div className={classNames({ hidden: !isDialogOpen }, className)} data-testid={testId}>
      <Backdrop
        className="flex items-center justify-center"
        onClick={handleBackdropClick}
        testId="dialog-backdrop"
      >
        <div
          className="m-4 min-w-72 max-w-[560px] rounded-3xl bg-light-bg p-6 dark:bg-dark-bg"
          onClick={handleDialogClick}
        >
          {children}
        </div>
      </Backdrop>
    </div>
  );
};

export default Dialog;
