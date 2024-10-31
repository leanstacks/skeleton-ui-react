import { PropsWithChildren, useMemo } from 'react';

import { useGetSettings } from 'api/useGetSettings';
import { SettingsContext } from './SettingsContext';

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

export default SettingsContextProvider;
