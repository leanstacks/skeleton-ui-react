import { describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test/test-utils';

import * as UseGetUserTasks from '../../api/useGetUserTasks';
import UserTaskList from '../UserTaskList';
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

describe('UserTaskList', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserTaskList />);
    await screen.findByTestId('user-task-list');

    // ASSERT
    expect(screen.getByTestId('user-task-list')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<UserTaskList testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<UserTaskList className="custom-className" />);
    await screen.findByTestId('user-task-list');

    // ASSERT
    expect(screen.getByTestId('user-task-list').classList).toContain('custom-className');
  });

  it('should render tasks', async () => {
    // ARRANGE
    render(<UserTaskList />);
    await screen.findByTestId('user-task-list-tasks');

    // ASSERT
    expect(screen.getByTestId('user-task-list-tasks')).toBeDefined();
    expect(screen.getByTestId('user-task-list-tasks-incomplete-1')).toBeDefined();
    expect(screen.getByTestId('user-task-list-tasks-complete-2')).toBeDefined();
    expect(screen.getByTestId('user-task-list-tasks-incomplete-3')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    const useGetUserTasksSpy = vi.spyOn(UseGetUserTasks, 'useGetUserTasks');
    useGetUserTasksSpy.mockReturnValue({
      data: undefined,
      error: undefined,
      isPending: true,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[], Error>);
    render(<UserTaskList />);
    await screen.findAllByTestId('loader-skeleton');

    // ASSERT
    expect(screen.getAllByTestId('loader-skeleton')).toBeDefined();
  });

  it('should render error state', async () => {
    // ARRANGE
    const useGetUserTasksSpy = vi.spyOn(UseGetUserTasks, 'useGetUserTasks');
    useGetUserTasksSpy.mockReturnValue({
      data: undefined,
      error: new AxiosError(),
      isPending: false,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[], Error>);
    render(<UserTaskList />);
    await screen.findByTestId('user-task-list-error');

    // ASSERT
    expect(screen.getByTestId('user-task-list-error')).toBeDefined();
  });
});
