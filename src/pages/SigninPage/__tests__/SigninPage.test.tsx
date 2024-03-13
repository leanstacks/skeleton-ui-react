import { UseQueryResult } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import { render, screen, waitFor } from 'test/test-utils';
import * as UseGetUserTokens from 'api/useGetUserTokens';
import * as UseGetClientToken from 'api/useGetClientToken';
import { clientTokenFromStorageFixture, userTokensFromAuthCodeFixture } from '__fixtures__/tokens';

import SigninPage from '../SigninPage';

describe('SigninPage', () => {
  const useGetUserTokensSpy = jest.spyOn(UseGetUserTokens, 'useGetUserTokens');
  const useGetClientTokenSpy = jest.spyOn(UseGetClientToken, 'useGetClientToken');
  const originalLocation = window.location;
  const replaceSpy = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: { replace: replaceSpy },
    });
  });

  beforeEach(() => {
    useGetUserTokensSpy.mockReturnValue({
      data: undefined,
      isError: false,
      isSuccess: false,
    } as unknown as UseQueryResult<UseGetUserTokens.UserTokens, Error>);

    useGetClientTokenSpy.mockReturnValue({
      data: clientTokenFromStorageFixture,
      isPending: false,
    } as unknown as UseQueryResult<UseGetClientToken.ClientToken, Error>);
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', { value: originalLocation });
  });

  it('should render successfully', async () => {
    render(<SigninPage />);

    await screen.findByTestId('page-signin');

    expect(screen.getByTestId('page-signin')).toBeDefined();
  });

  it('should render loader while fetching tokens', async () => {
    useGetUserTokensSpy.mockReturnValueOnce({
      data: undefined,
      isError: false,
      isSuccess: false,
    } as unknown as UseQueryResult<UseGetUserTokens.UserTokens, Error>);
    render(<SigninPage />);

    await screen.findByTestId('page-signin');

    expect(screen.getByTestId('page-signin')).toBeDefined();
  });

  it('should navigate upon successful authentication', async () => {
    useGetUserTokensSpy.mockReturnValue({
      data: userTokensFromAuthCodeFixture,
      isError: false,
      isSuccess: true,
    } as unknown as UseQueryResult<UseGetUserTokens.UserTokens, Error>);
    render(
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/app" element={<div data-testid="success"></div>} />
      </Routes>,
    );

    await screen.findByTestId('success');

    expect(screen.getByTestId('success')).toBeDefined();
  });

  it('should redirect to IdP on failure to obtain tokens', async () => {
    useGetUserTokensSpy.mockReturnValue({
      data: undefined,
      isError: true,
      isSuccess: false,
    } as unknown as UseQueryResult<UseGetUserTokens.UserTokens, Error>);

    render(
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/app" element={<div data-testid="success"></div>} />
      </Routes>,
    );

    await waitFor(() => expect(replaceSpy).toHaveBeenCalled());

    expect(replaceSpy).toHaveBeenCalled();
  });
});
