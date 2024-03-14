import { PropsWithChildren } from 'react';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `Card` React component.
 * @param {string} [title] - Optional. Title text.
 * @param {string} [subtitle] - Optional. Subtitle text.
 * @see {@link PropsWithChildren}
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
export interface CardProps extends PropsWithChildren, PropsWithClassName, PropsWithTestId {
  title?: string;
  subtitle?: string;
}

/**
 * The `Card` component renders a container for grouped, related content.
 * @param {CardProps} props - Component properties, `CardProps`.
 * @returns {JSX.Element} JSX
 */
const Card = ({
  children,
  className,
  subtitle,
  testId = 'card',
  title,
}: CardProps): JSX.Element => {
  return (
    <div className={classNames('rounded-lg bg-neutral-500/10 p-4', className)} data-testid={testId}>
      {!!title && (
        <div className="text-2xl" data-testid={`${testId}-title`}>
          {title}
        </div>
      )}
      {!!subtitle && (
        <div className="font-bold" data-testid={`${testId}-subtitle`}>
          {subtitle}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
