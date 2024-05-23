import { useContext } from 'react';

import { AuthContext, AuthContextValue } from 'providers/AuthProvider';

/**
 * The `useAuth` hook returns the current `AuthContext` value.
 * @returns {AuthContextValue} The current `AuthContext` value, `AuthContextValue`.
 */
export const useAuth = (): AuthContextValue => {
  return useContext(AuthContext);
};
