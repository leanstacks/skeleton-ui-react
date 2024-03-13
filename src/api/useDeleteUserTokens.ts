import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKeys, StorageKeys } from 'utils/constants';
import storage from 'utils/storage';

/**
 * An API hook which deletes the user authentication tokens from storage.
 * @returns Returns a `UseMutationResult`.
 */
export const useDeleteUserTokens = () => {
  const queryClient = useQueryClient();

  const deleteUserTokens = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      try {
        storage.removeItem(StorageKeys.UserTokens);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  };

  return useMutation({
    mutationFn: deleteUserTokens,
    onSuccess: async (data, variables, context) => {
      console.log('do resetQueries');
      await queryClient.resetQueries({ queryKey: [QueryKeys.UserTokens] });
    },
  });
};
