import { PropsWithChildren } from 'react';
import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';

interface DialogHeadingProps extends BaseComponentProps, PropsWithChildren {}

const DialogHeading = ({
  children,
  className,
  testId = 'dialog-heading',
}: DialogHeadingProps): JSX.Element => {
  return (
    <div className={classNames('mb-4 line-clamp-2 text-2xl', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default DialogHeading;
