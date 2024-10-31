import { PropsWithChildren } from 'react';

import { AuthContext, AuthContextValue } from './AuthContext';
import { useGetUserTokens } from 'common/api/useGetUserTokens';
import LoaderSpinner from 'common/components/Loader/LoaderSpinner';

/**
 * The `AuthContextProvider` React component creates, maintains, and provides
 * access to the `AuthContext` value.
 * @param {PropsWithChildren} props - Component properties, `PropsWithChildren`.
 * @returns {JSX.Element} JSX
 */
const AuthContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  // REPLACE: use a query hook to fetch authentication details from an IdP
  const { data: userTokens, isPending, isSuccess, refetch: refetchUserTokens } = useGetUserTokens();

  const value: AuthContextValue = {
    isAuthenticated: isSuccess,
    userToken: userTokens,
    refetchUserTokens,
  };

  const isReady = !isPending;

  return (
    <AuthContext.Provider value={value}>
      {isReady && <>{children}</>}
      {!isReady && (
        <div className="h-[50vh]" data-testid="provider-auth">
          <div className="flex h-full items-center justify-center text-2xl">
            <LoaderSpinner text="Signing in..." />
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
