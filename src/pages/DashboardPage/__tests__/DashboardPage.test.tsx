import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test/test-utils';
import { UseQueryResult } from '@tanstack/react-query';

import { User } from 'common/api/useGetUser';
import { userFixture1 } from '__fixtures__/users';
import * as UseGetCurrentUser from 'common/api/useGetCurrentUser';

import DashboardPage from '../DashboardPage';

describe('DashboardPage', () => {
  const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');

  beforeEach(() => {
    useGetCurrentUserSpy.mockReturnValue({
      data: userFixture1,
    } as unknown as UseQueryResult<User, Error>);
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<DashboardPage />);
    await screen.findByTestId('page-dashboard');

    // ASSERT
    expect(screen.getByTestId('page-dashboard')).toBeDefined();
  });

  it('should render user information when available', async () => {
    // ARRANGE
    render(<DashboardPage />);
    await screen.findByText(userFixture1.name);

    // ASSERT
    expect(screen.getByTestId('user-display-name').textContent).toBe(userFixture1.name);
  });

  it('should render loader when user not available', async () => {
    // ARRANGE
    useGetCurrentUserSpy.mockReturnValueOnce({ data: undefined } as unknown as UseQueryResult<
      User,
      Error
    >);
    render(<DashboardPage />);
    await screen.findByTestId('page-dashboard');

    // ASSERT
    expect(screen.getByTestId('page-dashboard-loader')).toBeDefined();
  });
});
