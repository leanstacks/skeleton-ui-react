import { render, renderHook, screen, waitFor } from 'test/test-utils';

import {
  clientTokenFromStorageFixture,
  userTokensFromRefreshTokenFixture,
  userTokensFromStorageFixture,
} from '__fixtures__/tokens';
import * as AuthProvider from '../AuthProvider';

import AxiosContextProvider, { useAxios } from 'providers/AxiosProvider';
import { useEffect, useState } from 'react';
import { InternalAxiosRequestConfig } from 'axios';

describe('AxiosProvider', () => {
  const useAuthContextSpy = jest.spyOn(AuthProvider, 'useAuthContext');
  const refetchUserTokensMock = jest.fn();
  const refetchClientTokenMock = jest.fn();

  beforeEach(() => {
    refetchUserTokensMock.mockReturnValue({
      data: userTokensFromRefreshTokenFixture,
    });
    useAuthContextSpy.mockReturnValue({
      isAuthenticated: true,
      userTokens: userTokensFromStorageFixture,
      clientToken: clientTokenFromStorageFixture,
      refetchUserTokens: refetchUserTokensMock,
      refetchClientToken: refetchClientTokenMock,
    });
  });

  it('should render successfully', async () => {
    render(
      <AxiosContextProvider>
        <div data-testid="provider-axios-ready"></div>
      </AxiosContextProvider>,
    );

    await screen.findByTestId('provider-axios-ready');

    expect(screen.getByTestId('provider-axios-ready')).toBeDefined();
  });

  it('should add user token authentication headers to requests', async () => {
    function AxiosTester() {
      const [user, setUser] = useState();
      const [config, setConfig] = useState<InternalAxiosRequestConfig>();
      const axios = useAxios();
      useEffect(() => {
        axios.request({ url: '/api/users?externalId=axios' }).then((response) => {
          setConfig(response.config);
          setUser(response.data);
        });
      }, [axios]);

      return (
        <>
          {user && (
            <div data-testid="provider-axios-ready">
              <div>{config?.headers['Authorization']}</div>
              <div>{config?.headers['X-Access-Token']}</div>
            </div>
          )}
        </>
      );
    }

    render(
      <AxiosContextProvider>
        <AxiosTester />
      </AxiosContextProvider>,
    );

    await screen.findByTestId('provider-axios-ready');

    expect(screen.getByTestId('provider-axios-ready')).toBeDefined();
    expect(screen.getByText('Bearer id-token')).toBeDefined();
    expect(screen.getByText('access-token')).toBeDefined();
    expect(refetchUserTokensMock).not.toHaveBeenCalled();
  });

  it('should add client token authentication headers to requests', async () => {
    useAuthContextSpy.mockReturnValue({
      isAuthenticated: false,
      clientToken: clientTokenFromStorageFixture,
      refetchClientToken: refetchClientTokenMock,
    });
    function AxiosTester() {
      const [response, setResponse] = useState();
      const [config, setConfig] = useState<InternalAxiosRequestConfig>();
      const axios = useAxios();
      useEffect(() => {
        axios.request({ url: '/api/ping' }).then((response) => {
          setConfig(response.config);
          setResponse(response.data);
        });
      }, [axios]);

      return (
        <>
          {response && (
            <div data-testid="provider-axios-ready">
              <div>{config?.headers['Authorization']}</div>
            </div>
          )}
        </>
      );
    }

    render(
      <AxiosContextProvider>
        <AxiosTester />
      </AxiosContextProvider>,
    );

    await screen.findByTestId('provider-axios-ready');

    expect(screen.getByTestId('provider-axios-ready')).toBeDefined();
    expect(screen.getByText('Client client-token')).toBeDefined();
    expect(refetchClientTokenMock).not.toHaveBeenCalled();
  });

  it.skip('should refresh tokens on HTTP 401 response', async () => {});
});

describe('useAxios', () => {
  const useAuthContextSpy = jest.spyOn(AuthProvider, 'useAuthContext');
  const refetchUserTokensMock = jest.fn();

  beforeEach(() => {
    useAuthContextSpy.mockReturnValue({
      isAuthenticated: true,
      userTokens: userTokensFromStorageFixture,
      refetchUserTokens: refetchUserTokensMock,
    });
  });

  it('should return context', async () => {
    const { result } = renderHook(() => useAxios());

    await waitFor(() => expect(result.current).not.toBeNull());

    expect(result.current).toBeDefined();
    expect(result.current.request).toBeDefined();
  });
});
