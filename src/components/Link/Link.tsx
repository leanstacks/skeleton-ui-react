import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `Link` component.
 * @see {@link https://reactrouter.com/en/main/components/link | LinkProps}
 * @see {@link PropsWithTestId}
 */
interface LinkProps extends RouterLinkProps, PropsWithTestId {}

/**
 * The `Link` React component formats and renders an `<a />` anchor HTML element using
 * the `Link` component from React Router.
 * @param {LinkProps} props - Component properties, `LinkProps`.
 * @returns {JSX.Element} JSX
 * @see {@link LinkProps}
 * @see {@link https://reactrouter.com/en/main/components/link | Link}
 */
const Link = ({ children, className, testId = 'link', ...props }: LinkProps): JSX.Element => {
  return (
    <RouterLink
      className={classNames('hover:text-blue-600 hover:underline', className)}
      data-testid={testId}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
