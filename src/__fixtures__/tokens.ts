import { UserTokens } from 'api/useGetUserTokens';

export const userTokensFromStorageFixture: UserTokens = {
  id_token: 'id-token',
};

export const userTokensFromAuthCodeFixture: Omit<UserTokens, 'expires_at'> = {
  id_token: 'id-token-from-auth-code',
};

export const userTokensFromRefreshTokenFixture: Omit<UserTokens, 'expires_at' | 'refresh_token'> = {
  id_token: 'id-token-from-refresh-token',
};
