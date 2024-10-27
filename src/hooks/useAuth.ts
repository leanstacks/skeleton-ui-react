import { useContext } from 'react';

import { AuthContext, AuthContextValue } from 'providers/AuthContext';

/**
 * The `useAuth` hook returns the current `AuthContext` value.
 * @returns {AuthContextValue} The current `AuthContext` value, `AuthContextValue`.
 */
export const useAuth = (): AuthContextValue => {
  return useContext(AuthContext);
};
