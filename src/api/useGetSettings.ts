import { useQuery } from '@tanstack/react-query';

import { DEFAULT_SETTINGS, QueryKeys, StorageKeys } from 'utils/constants';
import storage from 'utils/storage';

/**
 * The `Settings` are user preferences.
 * @param theme - The application theme.
 * @param [updatedAt] - Optional. The timestamp the settings were last updated.
 */
export interface Settings {
  theme: 'light' | 'dark';
  updatedAt?: string;
}

/**
 * An API hook which fetches the user `Settings`.
 * @returns Returns a `UseQueryResult` with `Settings` data.
 */
export const useGetSettings = () => {
  const getSettings = (): Promise<Settings> => {
    return new Promise((resolve, reject) => {
      try {
        const storedSettings = JSON.parse(storage.getItem(StorageKeys.Settings) || '{}');
        const settings = {
          ...DEFAULT_SETTINGS,
          ...storedSettings,
        };
        return resolve(settings);
      } catch (err) {
        return reject(err);
      }
    });
  };

  return useQuery({
    queryKey: [QueryKeys.Settings],
    queryFn: getSettings,
  });
};
