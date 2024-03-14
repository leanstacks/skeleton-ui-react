import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { QueryKeys } from 'utils/constants';

/**
 * A `UserTokens` object contains OAuth access, id, and refresh tokens
 * and related metadata.
 */
export interface UserTokens {
  access_token: string;
  id_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  expires_at: string;
}

/**
 * An API hook which fetches OAuth tokens from the application IdP..
 * @param [options] - Optional. A UseQueryOptions object to supply additional
 * configuration to `useQuery`.
 * @returns {UserTokens} Returns a `UseQueryResult` with `UserTokens` data.
 */
export const useGetUserTokens = (
  options?: Partial<UseQueryOptions<UserTokens>>,
): UseQueryResult<UserTokens, Error> => {
  /**
   * Fetch `UserTokens` from the Identity Provider (IdP).
   * @returns The `UserTokens` if successful.
   */
  const getUserTokens = async (): Promise<UserTokens> => {
    // REPLACE: fetch tokens from your IdP
    return new Promise((resolve, reject) => {
      try {
        const expires_at = dayjs().add(1, 'hour').toISOString();
        const tokens: UserTokens = {
          access_token: 'access-token',
          id_token: 'id-token',
          refresh_token: 'refresh-token',
          token_type: 'bearer',
          expires_in: 3600,
          expires_at,
        };
        return resolve(tokens);
      } catch (err) {
        return reject(err);
      }
    });
  };

  return useQuery({
    queryKey: [QueryKeys.UserTokens],
    queryFn: () => getUserTokens(),
    retry: 0,
    ...options,
  });
};
