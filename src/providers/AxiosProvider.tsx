import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { AuthContextValue, useAuthContext } from './AuthProvider';

/**
 * An Axios request interceptor that adds user authentication headers to
 * the request.
 * @param config {InternalAxiosRequestConfig} config - The Axios config object for the request.
 * @param authContext {AuthContextValue} authContext - The `AuthContextValue` containing
 * the current user authentication state.
 * @returns {InternalAxiosRequestConfig} The modified Axios config object.
 */
const authRequestInterceptor = async (
  config: InternalAxiosRequestConfig,
  authContext: AuthContextValue,
): Promise<InternalAxiosRequestConfig> => {
  const { headers } = config;
  if (authContext.isAuthenticated) {
    headers['Authorization'] = `Bearer ${authContext.userToken?.id_token}`;
    headers['X-Access-Token'] = authContext.userToken?.access_token;
  }
  return config;
};

/**
 * An Axios response interceptor called for responses in error. If the http status
 * code is `401`, attempts to refresh the authentication tokens and retry the request.
 * @param error {AxiosError} error - The AxiosError instance.
 * @param authContext {AuthContextValue} authContext - The `AuthContextValue` containing
 * the current user authentication state.
 * @returns {AxiosResponse} An AxiosResponse representing the retried request.
 */
const notAuthenticatedErrorInterceptor = async (
  error: AxiosError,
  authContext: AuthContextValue,
) => {
  const config = error.config;
  if (error.response?.status === 401) {
    if (authContext.isAuthenticated && authContext.refetchUserTokens) {
      const { data } = await authContext.refetchUserTokens();

      return axios({
        ...config,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${data.id_token}`,
          'X-Access-Token': data.access_token,
        },
      });
    }
  }

  return Promise.reject(error);
};

/**
 * Custom `Axios` instance.
 */
const customAxios = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * The `AxiosContext` instance.
 */
const AxiosContext = React.createContext<AxiosInstance>(customAxios);

/**
 * The `AxiosContextProvider` React component creates, maintains, and provides
 * access to the `AxiosContext` value.
 * @param {PropsWithChildren} props - Component properties, `PropsWithChildren`.
 * @returns {JSX.Element} JSX
 */
const AxiosContextProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const authContext = useAuthContext();

  useEffect(() => {
    const authRequestInterceptorId = customAxios.interceptors.request.use(async (config) =>
      authRequestInterceptor(config, authContext),
    );

    const notAuthenticatedErrorInterceptorId = customAxios.interceptors.response.use(
      (response) => response,
      async (error) => notAuthenticatedErrorInterceptor(error, authContext),
    );

    setIsReady(true);

    return () => {
      customAxios.interceptors.request.eject(authRequestInterceptorId);
      customAxios.interceptors.response.eject(notAuthenticatedErrorInterceptorId);
    };
  }, [authContext]);

  return (
    <AxiosContext.Provider value={customAxios}>{isReady && <>{children}</>}</AxiosContext.Provider>
  );
};

/**
 * The `useAxios` hook returns the current `AxiosContext` value.
 * @returns {AxiosInstance} The current `AxiosContext` value, an `AxiosInstance`.
 */
export const useAxios = (): AxiosInstance => {
  return useContext(AxiosContext);
};

export default AxiosContextProvider;
