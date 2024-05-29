import { PropsWithChildren } from 'react';
import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `DropdownItem` component.
 * @param {function} [onClick] - Optional. A click event handler function.
 * @see {@link PropsWithChildren}
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface DropdownItemProps extends PropsWithChildren, PropsWithClassName, PropsWithTestId {
  onClick?: () => void;
}

/**
 * The `DropdownItem` component renders a single item or selection within
 * the context of a `Dropdown`.  A `DropdownItem` is usually contained within
 * a `DropdownContent`, but that is not a requirement.
 *
 * An `onClick` function may be passed which is called in response to a click event.
 * @param {DropdownItemProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const DropdownItem = ({
  children,
  className,
  onClick,
  testId = 'dropdown-item',
}: DropdownItemProps): JSX.Element => {
  return (
    <div
      className={classNames(
        'mb-2 flex cursor-pointer items-center gap-2 px-3 py-1 last:mb-0 hover:bg-neutral-500/25',
        className,
      )}
      onClick={() => onClick?.()}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
