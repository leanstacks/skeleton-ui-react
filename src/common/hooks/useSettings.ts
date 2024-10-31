import { useContext } from 'react';

import { Settings } from 'common/api/useGetSettings';
import { SettingsContext } from 'common/providers/SettingsContext';

/**
 * The `useSettings` hook returns the current `SettingsContext` value.
 * @returns {Settings} The current `SettingsContext` value, `Settings`.
 * @see {@link Settings}
 */
export const useSettings = (): Settings => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings hook must be used within a SettingsContextProvider');
  }

  return context;
};
