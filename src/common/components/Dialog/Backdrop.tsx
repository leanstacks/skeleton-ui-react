import { PropsWithChildren } from 'react';
import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';

interface BackdropProps extends BaseComponentProps, PropsWithChildren {
  onClick?: (e: React.MouseEvent) => void | Promise<void>;
}

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
