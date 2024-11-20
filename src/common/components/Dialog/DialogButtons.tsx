import { PropsWithChildren } from 'react';
import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `DialogButton` component.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 */
interface DialogButtonsProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `DialogButtons` component is a container for one or more `DialogButton`
 * components.  `DialogButtons` renders the buttons, the `children`, styled
 * appropriately for appearing within a `Dialog`.
 * @param {DialogButtonsProps} props - Component properties
 * @returns {JSX.Element} JSX
 */
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
