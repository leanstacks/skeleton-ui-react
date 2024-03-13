import React, { PropsWithChildren, useContext } from 'react';

import { UserTokens, useGetUserTokens } from 'api/useGetUserTokens';
import LoaderSpinner from 'components/Loader/LoaderSpinner';

/**
 * The `value` provided by the `AuthContext`.
 */
export interface AuthContextValue {
  isAuthenticated: boolean;
  userTokens?: UserTokens;
  refetchUserTokens?: () => any;
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
const AuthContext = React.createContext<AuthContextValue>(DEFAULT_CONTEXT_VALUE);

/**
 * The `AuthContextProvider` React component creates, maintains, and provides
 * access to the `AuthContext` value.
 * @param {PropsWithChildren} props - Component properties, `PropsWithChildren`.
 * @returns {JSX.Element} JSX
 */
const AuthContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const { data: userTokens, isPending, isSuccess, refetch: refetchUserTokens } = useGetUserTokens();

  const value: AuthContextValue = {
    isAuthenticated: isSuccess,
    userTokens,
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

/**
 * The `useAuthContext` hook returns the current `AuthContext` value.
 * @returns {AuthContextValue} The current `AuthContext` value, `AuthContextValue`.
 */
export const useAuthContext = (): AuthContextValue => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
