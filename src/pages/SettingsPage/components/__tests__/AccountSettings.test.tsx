import { UseQueryResult } from '@tanstack/react-query';

import * as UseGetCurrentUser from 'api/useGetCurrentUser';
import { currentUserFixture } from '__fixtures__/users';
import { render, screen } from 'test/test-utils';

import AccountSettings from '../AccountSettings';

describe('AccountSettings', () => {
  const useGetCurrentUserSpy = jest.spyOn(UseGetCurrentUser, 'useGetCurrentUser');

  beforeEach(() => {
    useGetCurrentUserSpy.mockReturnValue({
      data: currentUserFixture[0],
    } as unknown as UseQueryResult<UseGetCurrentUser.User, Error>);
  });

  it('should render successfully', async () => {
    render(<AccountSettings />);

    await screen.findByTestId('settings-account');

    expect(screen.getByTestId('settings-account')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<AccountSettings testId="custom-testId" />);

    await screen.findByTestId('custom-testId');

    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should render loader', async () => {
    useGetCurrentUserSpy.mockReturnValue({
      data: undefined,
      isSuccess: false,
      isLoading: true,
    } as unknown as UseQueryResult<UseGetCurrentUser.User, Error>);
    render(<AccountSettings />);

    await screen.findByTestId('settings-account-loader');

    expect(screen.getByTestId('settings-account-loader')).toBeDefined();
  });
});
