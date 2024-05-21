import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, renderHook, screen, waitFor } from 'test/test-utils';

import * as AuthProvider from '../AuthProvider';

import AxiosContextProvider, { useAxios } from 'providers/AxiosProvider';
import { useEffect, useState } from 'react';
import { InternalAxiosRequestConfig } from 'axios';
import { userTokensFixture } from '__fixtures__/tokens';

describe('AxiosProvider', () => {
  const useAuthContextSpy = vi.spyOn(AuthProvider, 'useAuthContext');
  const refetchUserTokensMock = vi.fn();

  beforeEach(() => {
    refetchUserTokensMock.mockReturnValue({
      data: userTokensFixture,
    });
    useAuthContextSpy.mockReturnValue({
      isAuthenticated: true,
      userToken: userTokensFixture,
      refetchUserTokens: refetchUserTokensMock,
    });
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(
      <AxiosContextProvider>
        <div data-testid="provider-axios-ready"></div>
      </AxiosContextProvider>,
    );
    await screen.findByTestId('provider-axios-ready');

    // ASSERT
    expect(screen.getByTestId('provider-axios-ready')).toBeDefined();
  });

  it('should add user token authentication headers to requests', async () => {
    // ARRANGE
    function AxiosTester() {
      const [user, setUser] = useState();
      const [config, setConfig] = useState<InternalAxiosRequestConfig>();
      const axios = useAxios();
      useEffect(() => {
        axios.request({ url: 'https://jsonplaceholder.typicode.com/users/1' }).then((response) => {
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

    // ASSERT
    expect(screen.getByTestId('provider-axios-ready')).toBeDefined();
    expect(screen.getByText('Bearer id-token')).toBeDefined();
    expect(screen.getByText('access-token')).toBeDefined();
    expect(refetchUserTokensMock).not.toHaveBeenCalled();
  });
});

describe('useAxios', () => {
  const useAuthContextSpy = vi.spyOn(AuthProvider, 'useAuthContext');
  const refetchUserTokensMock = vi.fn();

  beforeEach(() => {
    useAuthContextSpy.mockReturnValue({
      isAuthenticated: true,
      userToken: userTokensFixture,
      refetchUserTokens: refetchUserTokensMock,
    });
  });

  it('should return context', async () => {
    // ARRANGE
    const { result } = renderHook(() => useAxios());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ASSERT
    expect(result.current).toBeDefined();
    expect(result.current.request).toBeDefined();
  });
});
