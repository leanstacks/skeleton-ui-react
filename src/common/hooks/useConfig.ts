import { Config, ConfigContext } from 'common/providers/ConfigContext';
import { useContext } from 'react';

/**
 * The `useConfig` hook returns the current `ConfigContext` value.
 * @returns {Config} The current `ConfigContext` value, `Config`.
 */
export const useConfig = (): Config => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig hook must be used within a ConfigContextProvider');
  }

  return context;
};
