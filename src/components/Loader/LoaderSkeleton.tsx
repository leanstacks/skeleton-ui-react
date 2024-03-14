import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `LoaderSkeleton` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface LoaderSkeletonProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `LoaderSkeleton` component renders an animated loader which pulses
 * faintly. Typically used when initially loading some data asynchronously.
 * @param {LoaderSkeletonProps} [props] - Component properties, `LoaderSkeletonProps`.
 * @returns {JSX.Element} JSX
 */
const LoaderSkeleton = ({
  className,
  testId = 'loader-skeleton',
}: LoaderSkeletonProps): JSX.Element => {
  return (
    <div
      className={classNames(
        'animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700',
        className,
      )}
      data-testid={testId}
    />
  );
};

export default LoaderSkeleton;
