import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `MenuSeparator` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface MenuSeparatorProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `MenuSeparator` component renders a separator to deliniate the boundary
 * between sections of a `Menu`.
 * @param {MenuSeparatorProps} props - Component properties, `MenuSeparatorProps`.
 * @returns {JSX.Element} JSX
 */
const MenuSeparator = ({
  className,
  testId = 'menu-separator',
}: MenuSeparatorProps): JSX.Element => {
  return (
    <div
      className={classNames('my-2 border-t border-neutral-500', className)}
      data-testid={testId}
    />
  );
};

export default MenuSeparator;
