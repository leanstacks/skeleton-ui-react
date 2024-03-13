import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useAxios } from 'providers/AxiosProvider';
import { QueryKeys } from 'utils/constants';
import { User } from './useGetUser';
import { useGetUserTokens } from './useGetUserTokens';

/**
 * Properties for the `useGetCurrentUser` hook.
 * @param {boolean} [enabled] - Optional. Indicates if the hook should run. Default: `true`.
 */
interface UseGetCurrentUserProps {
  enabled?: boolean;
}

/**
 * An API hook which fetches user information describing the currently
 * authenticated user.
 * @returns Returns a `UserQueryResult` with `CurrentUser` data.
 */
export const useGetCurrentUser = ({
  enabled = true,
}: UseGetCurrentUserProps): UseQueryResult<User, Error> => {
  const axios = useAxios();
  const { data: userTokens } = useGetUserTokens();

  const getCurrentUser = async (): Promise<User> => {
    return new Promise((resolve, reject) => {
      if (userTokens) {
        const currentUser = JSON.parse(atob(userTokens.id_token)) as User;
        console.log(`currentUser::${JSON.stringify(currentUser)}`);
        return resolve(currentUser);
      } else {
        return reject(new Error('Not authenticated.'));
      }
    });
  };

  return useQuery({
    queryKey: [QueryKeys.User, 'current'],
    queryFn: () => getCurrentUser(),
    staleTime: 60 * 60 * 1000, // 1 hour
    enabled: enabled && !!userTokens,
  });
};
