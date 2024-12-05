import { BaseComponentProps } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `Divider` component.
 * @see {@link BaseComponentProps}
 */
interface DividerProps extends BaseComponentProps {}

/**
 * The `Divider` component renders a horizontal line which visually separates
 * content.
 * @param {DividerProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Divider = ({ className, testId = 'divider' }: DividerProps): JSX.Element => {
  return (
    <div
      className={classNames('h-0 w-full border-t border-neutral-500/50', className)}
      data-testid={testId}
    ></div>
  );
};

export default Divider;
