import { PropsWithChildren } from 'react';
import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `Backdrop` component.
 * @param {function} [onClick] - Optional. A function called when clicked.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 */
interface BackdropProps extends BaseComponentProps, PropsWithChildren {
  onClick?: (e: React.MouseEvent) => void | Promise<void>;
}

/**
 * The `Backdrop` component renders a semi-opaque background for another
 * component.  Usually used to partially mask background content to draw
 * attention to content in the foreground such as a `Dialog` or `Menu`.
 * @param {BackgroundProps} props - Component properties
 * @returns {JSX.Element} JSX
 */
const Backdrop = ({
  children,
  className,
  onClick,
  testId = 'backdrop',
}: BackdropProps): JSX.Element => {
  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
  };

  return (
    <div
      className={classNames(
        'fixed right-0 top-0 z-[1000] h-screen w-screen bg-neutral-500/50',
        className,
      )}
      onClick={handleClick}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Backdrop;
