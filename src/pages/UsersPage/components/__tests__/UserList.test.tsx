import { describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test/test-utils';

import * as UseGetUser from 'common/api/useGetUser';
import * as UseGetUsers from '../../api/useGetUsers';
import UserList from '../UserList';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// mock select functions from react-router-dom
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useParams: () => ({
      userId: '1',
    }),
  };
});

describe('UserList', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserList />);
    await screen.findByTestId('list-users');

    // ASSERT
    expect(screen.getByTestId('list-users')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<UserList testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<UserList className="custom-className" />);
    await screen.findByTestId('list-users');

    // ASSERT
    expect(screen.getByTestId('list-users').classList).toContain('custom-className');
  });

  it('should render list of users', async () => {
    // ARRANGE
    render(<UserList />);
    await screen.findByTestId('list-item-user-1');

    // ASSERT
    expect(screen.getByTestId('list-item-user-1')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    const useGetUsersSpy = vi.spyOn(UseGetUsers, 'useGetUsers');
    useGetUsersSpy.mockReturnValue({
      data: undefined,
      error: undefined,
      isPending: true,
    } as unknown as UseQueryResult<UseGetUser.User[], Error>);
    render(<UserList />);
    await screen.findAllByTestId('loader-skeleton');

    // ASSERT
    expect(screen.getAllByTestId('loader-skeleton')).toBeDefined();
  });

  it('should render error state', async () => {
    // ARRANGE
    const useGetUsersSpy = vi.spyOn(UseGetUsers, 'useGetUsers');
    useGetUsersSpy.mockReturnValue({
      data: undefined,
      error: new AxiosError(),
      isPending: false,
    } as unknown as UseQueryResult<UseGetUser.User[], Error>);
    render(<UserList />);
    await screen.findByTestId('list-users-error');

    // ASSERT
    expect(screen.getByTestId('list-users-error')).toBeDefined();
  });
});
