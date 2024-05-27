import { render, screen } from 'test/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as UseGetUserTasks from '../../api/useGetUserTasks';

import UserTasksCard from '../UserTasksCard';
import { todosFixture } from '__fixtures__/todos';
import { UseQueryResult } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

// mock select functions from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe('UserTasksCard', () => {
  const useGetUserTasksSpy = vi.spyOn(UseGetUserTasks, 'useGetUserTasks');

  beforeEach(() => {
    useGetUserTasksSpy.mockReturnValue({
      data: todosFixture,
      error: null,
      isLoading: false,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[]>);
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<UserTasksCard userId={1} />);
    await screen.findByTestId('card-user-tasks');

    // ASSERT
    expect(screen.getByTestId('card-user-tasks')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<UserTasksCard userId={1} testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<UserTasksCard userId={1} className="custom-className" />);
    await screen.findByTestId('card-user-tasks');

    // ASSERT
    expect(screen.getByTestId('card-user-tasks-card').classList).toContain('custom-className');
  });

  it('should render loading state', async () => {
    // ARRANGE
    useGetUserTasksSpy.mockReturnValue({
      isLoading: true,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[]>);

    render(<UserTasksCard userId={1} />);
    await screen.findByTestId('card-user-tasks-loader');

    // ASSERT
    expect(screen.getByTestId('card-user-tasks-loader')).toBeDefined();
  });

  it('should render message when error occurs', async () => {
    // ARRANGE
    useGetUserTasksSpy.mockReturnValue({
      error: new Error('test'),
      isLoading: false,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[]>);
    render(<UserTasksCard userId={1} />);
    await screen.findByTestId('card-user-tasks-message');

    // ASSERT
    expect(screen.getByTestId('card-user-tasks-message').textContent).toBe(
      'A problem occurred fetching your tasks.',
    );
  });

  it('should render message for zero incomplete tasks', async () => {
    // ARRANGE
    useGetUserTasksSpy.mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[]>);
    render(<UserTasksCard userId={1} />);
    await screen.findByTestId('card-user-tasks-message');

    // ASSERT
    expect(screen.getByTestId('card-user-tasks-message').textContent).toBe(
      'You are all caught up!',
    );
  });

  it('should render message for incomplete tasks', async () => {
    // ARRANGE
    render(<UserTasksCard userId={1} />);
    await screen.findByTestId('card-user-tasks-message');

    // ASSERT
    expect(screen.getByTestId('card-user-tasks-message').textContent).toBe(
      'You have 3 tasks to complete.',
    );
  });

  it('should navigate when clicked', async () => {
    // ARRANGE
    render(<UserTasksCard userId={1} />);
    await screen.findByTestId('card-user-tasks-message');

    // ACT
    await userEvent.click(screen.getByTestId('card-user-tasks'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledWith(`/app/users/1/tasks`);
  });
});
