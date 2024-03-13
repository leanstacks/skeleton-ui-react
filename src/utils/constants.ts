import { Settings } from 'api/useGetSettings';

/**
 * Keys used with React Query cache.
 */
export enum QueryKeys {
  Settings = 'Settings',
  User = 'User',
  UserCurrent = 'UserCurrent',
  UserInfo = 'UserInfo',
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
  units: 'imperial',
};

/**
 * Constant value `metric` units of measurement.
 */
export const UNITS_METRIC = 'metric';

/**
 * Constant value `imperial` units of measurement.
 */
export const UNITS_IMPERIAL = 'imperial';
