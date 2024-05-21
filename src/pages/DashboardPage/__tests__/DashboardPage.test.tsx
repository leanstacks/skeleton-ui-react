import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test/test-utils';
import { UseQueryResult } from '@tanstack/react-query';

import { userFixture1 } from '__fixtures__/users';
import * as UseGetUser from 'api/useGetUser';

import DashboardPage from '../DashboardPage';

describe('DashboardPage', () => {
  const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');

  beforeEach(() => {
    useGetUserSpy.mockReturnValue({
      data: userFixture1,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
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
    useGetUserSpy.mockReturnValueOnce({ data: undefined } as unknown as UseQueryResult<
      UseGetUser.User,
      Error
    >);
    render(<DashboardPage />);
    await screen.findByTestId('page-dashboard');

    // ASSERT
    expect(screen.getByTestId('page-dashboard-loader')).toBeDefined();
  });
});
