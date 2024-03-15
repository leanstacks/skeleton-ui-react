import { Settings } from 'api/useGetSettings';

/**
 * Keys used with React Query cache.
 */
export enum QueryKeys {
  Settings = 'Settings',
  Tasks = 'Tasks',
  Users = 'Users',
  UserTokens = 'UserTokens',
}

/**
 * Keys used for browser local storage.
 */
export enum StorageKeys {
  Settings = 'react-starter.settings',
  UserTokens = 'react-starter.user-tokens',
}

/**
 * Default `Settings`, i.e. user preferences.
 */
export const DEFAULT_SETTINGS: Settings = {
  theme: 'light',
};
