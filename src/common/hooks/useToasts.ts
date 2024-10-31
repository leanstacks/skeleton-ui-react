import { useContext } from 'react';

import { ToastsContext, ToastsContextValue } from 'common/providers/ToastsContext';

/**
 * The `useToasts` hook returns the current `ToastsContext` value.
 * @returns {ToastsContextValue} The current `ToastContext` value, `ToastsContextValue`.
 */
export const useToasts = (): ToastsContextValue => {
  const context = useContext(ToastsContext);
  if (!context) {
    throw new Error('useToasts hook must be used within a ToastsProvider');
  }

  return context;
};
