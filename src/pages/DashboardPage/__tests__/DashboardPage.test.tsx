import { render, screen } from 'test/test-utils';
import { UseQueryResult } from '@tanstack/react-query';

import { userFixture } from '__fixtures__/users';
import * as UseGetUser from 'api/useGetUser';

import DashboardPage from '../DashboardPage';

describe('DashboardPage', () => {
  const useGetUserSpy = jest.spyOn(UseGetUser, 'useGetUser');

  beforeEach(() => {
    useGetUserSpy.mockReturnValue({
      data: userFixture,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
  });

  it('should render successfully', async () => {
    render(<DashboardPage />);

    await screen.findByTestId('page-dashboard');

    expect(screen.getByTestId('page-dashboard')).toBeDefined();
  });

  it('should render user information when available', async () => {
    render(<DashboardPage />);

    await screen.findByText(userFixture.name);

    expect(screen.getByTestId('user-display-name').textContent).toBe(userFixture.name);
  });

  it('should render loader when user not available', async () => {
    useGetUserSpy.mockReturnValueOnce({ data: undefined } as unknown as UseQueryResult<
      UseGetUser.User,
      Error
    >);
    render(<DashboardPage />);

    await screen.findByTestId('page-dashboard');

    expect(screen.getByTestId('page-dashboard-loader')).toBeDefined();
  });
});
