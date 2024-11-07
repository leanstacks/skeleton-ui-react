import { PropsWithChildren } from 'react';
import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';

interface DialogButtonsProps extends BaseComponentProps, PropsWithChildren {}

const DialogButtons = ({
  children,
  className,
  testId = 'dialog-buttons',
}: DialogButtonsProps): JSX.Element => {
  return (
    <div
      className={classNames('mt-6 flex items-center justify-end gap-4', className)}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default DialogButtons;
