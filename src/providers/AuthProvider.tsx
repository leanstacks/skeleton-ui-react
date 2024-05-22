import React, { PropsWithChildren } from 'react';

import { UserTokens, useGetUserTokens } from 'api/useGetUserTokens';
import LoaderSpinner from 'components/Loader/LoaderSpinner';
import { QueryObserverBaseResult } from '@tanstack/react-query';

/**
 * The `value` provided by the `AuthContext`.
 */
export interface AuthContextValue {
  isAuthenticated: boolean;
  userToken?: UserTokens;
  refetchUserTokens?: () => Promise<QueryObserverBaseResult<UserTokens, Error>>;
}

/**
 * The default/initial `AuthContext` value.
 */
const DEFAULT_CONTEXT_VALUE: AuthContextValue = {
  isAuthenticated: false,
};

/**
 * The `AuthContext` instance.
 */
export const AuthContext = React.createContext<AuthContextValue>(DEFAULT_CONTEXT_VALUE);

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
