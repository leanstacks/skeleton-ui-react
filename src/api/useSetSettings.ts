import { useMutation, useQueryClient } from '@tanstack/react-query';

import storage from 'utils/storage';
import { DEFAULT_SETTINGS, QueryKeys, StorageKeys } from 'utils/constants';
import { Settings } from './useGetSettings';

/**
 * An API hook which mutates the user `Settings`.  Returns a `UseMutationResult`
 * object whose `mutate` attribute is a function to save the user `Settings`.
 *
 * The supplied `Settings` are merged with existing stored values so a partial
 * `Settings` object may be supplied.
 * @returns Returns a `UseMutationResult`.
 * @see {@link Settings}
 */
export const useSetSettings = () => {
  const queryClient = useQueryClient();

  /**
   * Saves the user `Settings`. Creates a merged object using the default settings, the
   * currently stored settings, and the supplied changes.
   * @param settings - A partical `Settings` object containing the attributes to be saved.
   * @returns The updated `Settings` object.
   */
  const setSettings = async (settings: Partial<Settings>): Promise<Settings> => {
    return new Promise((resolve, reject) => {
      try {
        // create or update user settings
        const storedSettings = JSON.parse(storage.getItem(StorageKeys.Settings) || '{}');
        const updatedSettings = {
          ...DEFAULT_SETTINGS,
          ...storedSettings,
          ...settings,
          updatedAt: new Date().toISOString(),
        };
        storage.setItem(StorageKeys.Settings, JSON.stringify(updatedSettings));

        return resolve(updatedSettings);
      } catch (err) {
        return reject(err);
      }
    });
  };

  return useMutation({
    mutationFn: setSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Settings] });
    },
  });
};
