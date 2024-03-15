import { PropsWithChildren } from 'react';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `Card` React component.
 * @see {@link PropsWithChildren}
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
export interface CardProps extends PropsWithChildren, PropsWithClassName, PropsWithTestId {}

/**
 * The `Card` component renders a container for grouped, related content.
 * @param {CardProps} props - Component properties, `CardProps`.
 * @returns {JSX.Element} JSX
 */
const Card = ({ children, className, testId = 'card' }: CardProps): JSX.Element => {
  return (
    <div className={classNames('rounded-lg bg-neutral-500/10 p-4', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default Card;
