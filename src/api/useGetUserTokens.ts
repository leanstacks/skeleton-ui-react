import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { QueryKeys, StorageKeys } from 'utils/constants';
import storage from 'utils/storage';

/**
 * A `UserTokens` object contains OAuth access, id, and refresh tokens
 * and related metadata.
 */
export interface UserTokens {
  id_token: string;
}

/**
 * An API hook which fetches OAuth tokens from the application IdP, AWS
 * Cognito. When an `authorizationCode` is supplied, fetches the tokens
 * using the `code` grant type. When an `authorizationCode` is not provided,
 * attempts to fetch tokens using a previously stored refresh token.
 *
 * When tokens are successfully fetched, they are stored locally.
 *
 * When fetching by refresh token fails, locally stored tokens are deleted.
 * @param [authorizationCode] - Optional. An OAuth authorization code to
 * exchange for tokens.
 * @param [options] - Optional. A UseQueryOptions object to supply additional
 * configuration to `useQuery`.
 * @returns {UserTokens} Returns a `UseQueryResult` with `UserTokens` data.
 */
export const useGetUserTokens = (): UseQueryResult<UserTokens, Error> => {
  /**
   * Fetch `UserTokens` from the Identity Provider (IdP) either by authorization code
   * or refresh token. Use the authorization code if present, otherwise, attempts to
   * refresh existing tokens.
   * @param [authorizationCode] - Optional. An OAuth authorization code to
   * exchange for tokens.
   * @returns The `UserTokens` if successful.
   */
  const getUserTokens = async (): Promise<UserTokens | null> => {
    return new Promise((resolve, reject) => {
      try {
        const storedTokens = storage.getItem(StorageKeys.UserTokens);
        if (storedTokens) {
          return resolve(JSON.parse(storedTokens));
        } else {
          return reject(new Error('No user tokens.'));
        }
      } catch (error) {
        storage.removeItem(StorageKeys.UserTokens);
        return reject(error);
      }
    });
  };

  return useQuery({
    queryKey: [QueryKeys.UserTokens],
    queryFn: () => getUserTokens(),
    retry: 0,
  });
};
