import { useQuery } from '@tanstack/react-query';

import storage from 'utils/storage';
import { User } from './useGetUser';
import { QueryKeys, StorageKeys } from 'utils/constants';

/**
 * An API hook which fetches the currently authenticated `User`.
 * @returns Returns a `UseQueryResult` with `User` data.
 */
export const useGetCurrentUser = () => {
  const getCurrentUser = (): Promise<User> => {
    return new Promise((resolve, reject) => {
      try {
        const storedUser = storage.getItem(StorageKeys.User);
        if (storedUser) {
          const user = JSON.parse(storedUser) as unknown as User;
          return resolve(user);
        }
        return reject(new Error('Not found'));
      } catch (err) {
        return reject(err);
      }
    });
  };

  return useQuery({
    queryKey: [QueryKeys.Users, 'current'],
    queryFn: getCurrentUser,
  });
};
