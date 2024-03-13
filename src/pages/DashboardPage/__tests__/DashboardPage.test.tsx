import { render, screen } from 'test/test-utils';
import { UseQueryResult } from '@tanstack/react-query';

import { currentUserFixture } from '__fixtures__/users';
import * as UseGetCurrentUser from '../../../api/useGetCurrentUser';

import DashboardPage from '../DashboardPage';

describe('DashboardPage', () => {
  const useGetCurrentUserSpy = jest.spyOn(UseGetCurrentUser, 'useGetCurrentUser');

  beforeEach(() => {
    useGetCurrentUserSpy.mockReturnValue({
      data: currentUserFixture[0],
    } as unknown as UseQueryResult<UseGetCurrentUser.User, Error>);
  });

  it('should render successfully', async () => {
    render(<DashboardPage />);

    await screen.findByTestId('page-dashboard');

    expect(screen.getByTestId('page-dashboard')).toBeDefined();
  });

  it('should render user information when available', async () => {
    render(<DashboardPage />);

    await screen.findByText(currentUserFixture[0].displayName);

    expect(screen.getByTestId('user-display-name').textContent).toBe(
      currentUserFixture[0].displayName,
    );
  });

  it('should render loader when user not available', async () => {
    useGetCurrentUserSpy.mockReturnValueOnce({ data: undefined } as unknown as UseQueryResult<
      UseGetCurrentUser.User,
      Error
    >);
    render(<DashboardPage />);

    await screen.findByTestId('page-dashboard');

    expect(screen.getByTestId('page-dashboard-loader')).toBeDefined();
  });
});
