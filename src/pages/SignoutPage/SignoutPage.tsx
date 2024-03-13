import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useDeleteUserTokens } from 'api/useDeleteUserTokens';
import LoaderSpinner from 'components/Loader/LoaderSpinner';
import { useAuthContext } from 'providers/AuthProvider';

/**
 * The `SignoutPage` component renders a loader while removing
 * the authentication state attributes.
 * @returns {JSX.Element} JSX
 */
const SignoutPage = (): JSX.Element => {
  const { isAuthenticated } = useAuthContext();
  const { mutate: deleteUserTokens } = useDeleteUserTokens();

  useEffect(() => {
    deleteUserTokens();
  }, [deleteUserTokens]);

  return (
    <div data-testid="page-signout">
      <div className="h-[50vh]">
        <div className="flex h-full items-center justify-center text-2xl">
          {isAuthenticated ? (
            <LoaderSpinner text="Signing out..." />
          ) : (
            <Navigate to={'/'} replace={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignoutPage;
