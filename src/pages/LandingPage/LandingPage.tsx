import { Navigate } from 'react-router-dom';

import { useAuthContext } from 'providers/AuthProvider';

/**
 * The `LandingPage` component renders the content of the landing page
 * for unauthenticated users. This is the public landing page.
 *
 * If an authenticated user navigates to this page, they are redirected to
 * the `DashboardPage`.
 * @returns {JSX.Element} JSX
 */
const LandingPage = (): JSX.Element => {
  const authContext = useAuthContext();

  if (authContext.isAuthenticated) {
    return <Navigate to="/app" />;
  }

  return (
    <div data-testid="page-landing" className="px-2 sm:px-8">
      <div className="container mx-auto min-h-[50vh]">
        <h1 className="mb-4 pt-32 text-4xl md:mb-8 md:text-8xl">Let's get started</h1>

        <div className="opacity-60 md:text-2xl">Creating React apps just got a lot simpler</div>
      </div>
    </div>
  );
};

export default LandingPage;
