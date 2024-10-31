import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useEffect, useState } from 'react';
import { InternalAxiosRequestConfig } from 'axios';
import { render, screen } from 'test/test-utils';

import { useAxios } from 'common/hooks/useAxios';
import * as UseAuth from 'common/hooks/useAuth';
import { userTokensFixture } from '__fixtures__/tokens';

import AxiosContextProvider from 'common/providers/AxiosProvider';

describe('AxiosProvider', () => {
  const useAuthSpy = vi.spyOn(UseAuth, 'useAuth');
  const refetchUserTokensMock = vi.fn();

  beforeEach(() => {
    refetchUserTokensMock.mockReturnValue({
      data: userTokensFixture,
    });
    useAuthSpy.mockReturnValue({
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
