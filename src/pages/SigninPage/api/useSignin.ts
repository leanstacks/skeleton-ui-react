import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import find from 'lodash/find';

import { User } from 'common/api/useGetUser';
import { UserTokens } from 'common/api/useGetUserTokens';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import storage from 'common/utils/storage';
import { QueryKeys, StorageKeys } from 'common/utils/constants';

/**
 * An API hook which performs user authentication.
 * @returns Returns a `UseMutationResult` with `User` data.
 */
export const useSignin = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  const config = useConfig();

  /**
   * Attempts to authenticate a user.
   * @param username - A username value.
   * @returns Returns a Promise which resolves to a `User` if successful,
   * otherwise throws an Error.
   */
  const signin = async (username: string): Promise<User> => {
    // REPLACE: This is a contrived "signin" approach for demonstration purposes.
    //          You should implement authentication functionality in accordance
    //          with your IdP.

    // fetch all users
    const response = await axios.request<User[]>({
      url: `${config.VITE_BASE_URL_API}/users`,
    });

    // if user matching 'username' is found, consider the user to be authenticated.
    const user = find<User>(response.data, { username });
    if (user) {
      // store current user in localstorage
      storage.setItem(StorageKeys.User, JSON.stringify(user));

      // simlate the creation of authentication tokens
      const expires_at = dayjs().add(1, 'hour').toISOString();
      const tokens: UserTokens = {
        access_token: 'access-token',
        id_token: 'id-token',
        refresh_token: 'refresh-token',
        token_type: 'bearer',
        expires_in: 3600,
        expires_at,
      };
      storage.setItem(StorageKeys.UserTokens, JSON.stringify(tokens));

      return user;
    } else {
      throw new Error('Authentication failed.');
    }
  };

  return useMutation({
    mutationFn: signin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserTokens] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Users, 'current'] });
    },
  });
};
