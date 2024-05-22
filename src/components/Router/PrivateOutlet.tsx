import { useAuth } from 'hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * The `PrivateOutlet` determines if the user is authenticated. It is typically
 * used within the router configuration as the parent of hierarchy of routes
 * which require authentication.
 *
 * If authenticated, the element specified by the route is rendered.
 *
 * If not authenticated, the application navigates to the sign in page.
 * @returns {JSX.Element} JSX
 */
const PrivateOutlet = (): JSX.Element => {
  const authContext = useAuth();

  if (authContext.isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/signin" />;
  }
};

export default PrivateOutlet;
