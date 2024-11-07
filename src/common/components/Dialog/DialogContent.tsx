import { PropsWithChildren } from 'react';
import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';

interface DialogContentProps extends BaseComponentProps, PropsWithChildren {}

const DialogContent = ({
  children,
  className,
  testId = 'dialog-content',
}: DialogContentProps): JSX.Element => {
  return (
    <div className={classNames('mb-6 mt-4 text-sm', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default DialogContent;
