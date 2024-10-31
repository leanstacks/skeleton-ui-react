import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';
import * as UseGetTask from 'pages/UsersPage/Tasks/api/useGetTask';
import * as UseGetUser from 'common/api/useGetUser';
import { Task } from 'pages/UsersPage/api/useGetUserTasks';
import { userFixture1 } from '__fixtures__/users';
import { todosFixture } from '__fixtures__/todos';

import TaskDetail from '../TaskDetail';

// mock select functions from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
    useParams: () => ({
      taskId: '1',
    }),
  };
});

describe('TaskDetail', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskDetail />);
    await screen.findByTestId('task-detail');

    // ASSERT
    expect(screen.getByTestId('task-detail')).toBeDefined();
  });

  it('should display a task', async () => {
    // ARRANGE
    render(<TaskDetail />);
    await screen.findByTestId('task-detail-task');

    // ASSERT
    expect(screen.getByTestId('task-detail-task')).toBeDefined();
    expect(screen.getByTestId('task-detail-task-title').textContent).toBe(todosFixture[0].title);
    expect(screen.getByTestId('task-detail-task-status').textContent).toBe('INCOMPLETE');
  });

  it('should display a task user', async () => {
    // ARRANGE
    render(<TaskDetail />);
    await screen.findByTestId('task-detail-task-user-name');

    // ASSERT
    expect(screen.getByTestId('task-detail-task-user-name')).toBeDefined();
    expect(screen.getByTestId('task-detail-task-user-name').textContent).toBe(userFixture1.name);
  });

  it('should display task status incomplete', async () => {
    // ARRANGE
    const task = todosFixture[0];
    task.completed = false;
    const useGetTaskSpy = vi.spyOn(UseGetTask, 'useGetTask');
    useGetTaskSpy.mockReturnValue({
      data: task,
      error: undefined,
      isLoading: false,
    } as unknown as UseQueryResult<Task, Error>);
    render(<TaskDetail />);
    await screen.findByTestId('task-detail-task-status');

    // ASSERT
    expect(screen.getByTestId('task-detail-task-status').textContent).toBe('INCOMPLETE');
  });

  it('should display task status complete', async () => {
    // ARRANGE
    const task = todosFixture[0];
    task.completed = true;
    const useGetTaskSpy = vi.spyOn(UseGetTask, 'useGetTask');
    useGetTaskSpy.mockReturnValue({
      data: task,
      error: undefined,
      isLoading: false,
    } as unknown as UseQueryResult<Task, Error>);
    render(<TaskDetail />);
    await screen.findByTestId('task-detail-task-status');

    // ASSERT
    expect(screen.getByTestId('task-detail-task-status').textContent).toBe('COMPLETE');
  });

  it('should display task error', async () => {
    // ARRANGE
    const useGetTaskSpy = vi.spyOn(UseGetTask, 'useGetTask');
    useGetTaskSpy.mockReturnValue({
      data: undefined,
      error: new Error(),
      isLoading: false,
    } as unknown as UseQueryResult<Task, Error>);
    render(<TaskDetail />);
    await screen.findByTestId('task-detail-alert-taskError');

    // ASSERT
    expect(screen.getByTestId('task-detail-alert-taskError')).toBeDefined();
  });

  it('should display user error', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: undefined,
      error: new Error(),
      isLoading: false,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<TaskDetail />);
    await screen.findByTestId('task-detail-alert-userError');

    // ASSERT
    expect(screen.getByTestId('task-detail-alert-userError')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    const useGetTaskSpy = vi.spyOn(UseGetTask, 'useGetTask');
    useGetTaskSpy.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    } as unknown as UseQueryResult<Task, Error>);
    render(<TaskDetail />);
    await screen.findByTestId('task-detail-loader');

    // ASSERT
    expect(screen.getByTestId('task-detail-loader')).toBeDefined();
  });

  it('should navigate back using close button', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskDetail />);
    await screen.findByTestId('task-detail-button-close');

    // ACT
    await user.click(screen.getByTestId('task-detail-button-close'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
