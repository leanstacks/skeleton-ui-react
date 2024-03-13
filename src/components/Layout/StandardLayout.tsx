import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Toasts from 'components/Toast/Toasts';

/**
 * Properties for the `StandardLayout` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface StandardLayoutProps extends PropsWithClassName, PropsWithTestId {}

/**
 * The `StandardLayout` React component renders the standard page layout. It
 * renders a `Header` and `Footer` and provides an `Outlet` for the router.
 * @param [props] - Component properties, `StandardLayoutProps`.
 * @returns {JSX.Element} JSX
 */
const StandardLayout = ({
  className,
  testId = 'layout-standard',
}: StandardLayoutProps): JSX.Element => {
  return (
    <div className={className} data-testid={testId}>
      <Header />
      <Outlet />
      <Footer />
      <Toasts />
    </div>
  );
};

export default StandardLayout;
