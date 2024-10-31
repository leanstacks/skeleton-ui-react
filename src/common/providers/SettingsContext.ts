import { createContext } from 'react';

import { Settings } from 'common/api/useGetSettings';

/**
 * The `SettingsContext` instance.
 */
export const SettingsContext = createContext<Settings | undefined>(undefined);
