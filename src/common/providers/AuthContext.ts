import { createContext } from 'react';
import { QueryObserverBaseResult } from '@tanstack/react-query';

import { UserTokens } from 'common/api/useGetUserTokens';

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
export const AuthContext = createContext<AuthContextValue>(DEFAULT_CONTEXT_VALUE);
