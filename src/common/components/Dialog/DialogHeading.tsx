import { PropsWithChildren } from 'react';
import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `DialogHeading` component.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 */
interface DialogHeadingProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `DialogHeading` component serves as the container for the heading content
 * of a `Dialog`. All of the heading content should be wrapped by `DialogHeading`.
 * @param {DialogHeadingProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
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
