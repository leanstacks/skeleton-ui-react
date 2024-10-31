import { Button as CommonButton, ButtonProps } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * The `Button` React component wraps the `Button` component from `@leanstacks/react-common`
 * to refine the base CSS classes.
 * @param {ButtonProps} props - Component properties, `ButtonProps`.
 * @returns {JSX.Element} JSX
 * @see {@link ButtonProps}
 */
const Button = ({ className, ...props }: ButtonProps): JSX.Element => {
  return (
    <CommonButton
      className={classNames('flex items-center justify-center rounded-md', className)}
      {...props}
    />
  );
};

export default Button;
