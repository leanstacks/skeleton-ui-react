import { PropsWithChildren } from 'react';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

interface BadgeProps extends PropsWithChildren, PropsWithClassName, PropsWithTestId {}

const Badge = ({ children, className, testId = 'badge' }: BadgeProps): JSX.Element => {
  return (
    <div
      className={classNames(
        'rounded-full bg-red-600 px-1 py-0.5 text-[10px] font-bold leading-none text-white dark:bg-red-700 dark:opacity-75',
        className,
      )}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Badge;
