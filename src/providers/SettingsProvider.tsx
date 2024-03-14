import React, { PropsWithChildren, useContext, useMemo } from 'react';

import { Settings, useGetSettings } from 'api/useGetSettings';

/**
 * The `SettingsContext` instance.
 */
const SettingsContext = React.createContext<Settings | undefined>(undefined);

/**
 * The `SettingsContextProvider` React component creates, maintains, and provides
 * access to the `SettingsContext` value.
 * @param {PropsWithChildren} props - Component properties, `PropsWithChildren`.
 * @returns {JSX.Element} JSX
 */
const SettingsContextProvider = ({ children }: PropsWithChildren) => {
  const { data: settings, isLoading } = useGetSettings();

  const value = useMemo(() => settings, [settings]);

  return (
    <SettingsContext.Provider value={value}>
      {!isLoading && <>{children}</>}
    </SettingsContext.Provider>
  );
};

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

export default SettingsContextProvider;
