import { describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test/test-utils';

import * as UseGetUserTasks from '../../api/useGetUserTasks';
import UserTasks from '../UserTasks';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

describe('UserTasks', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserTasks userId={1} />);
    await screen.findByTestId('user-tasks');

    // ASSERT
    expect(screen.getByTestId('user-tasks')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<UserTasks userId={1} testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<UserTasks userId={1} className="custom-className" />);
    await screen.findByTestId('user-tasks');

    // ASSERT
    expect(screen.getByTestId('user-tasks').classList).toContain('custom-className');
  });

  it('should display badge with task count', async () => {
    // ARRANGE
    render(<UserTasks userId={1} />);
    await screen.findByTestId('user-tasks-badge-task-count');

    // ASSERT
    expect(screen.getByTestId('user-tasks-badge-task-count')).toBeDefined();
    expect(screen.getByTestId('user-tasks-badge-task-count').textContent).toBe('3');
  });

  it('should render loading state', async () => {
    // ARRANGE
    const useGetUserTasksSpy = vi.spyOn(UseGetUserTasks, 'useGetUserTasks');
    useGetUserTasksSpy.mockReturnValue({
      data: undefined,
      error: undefined,
      isPending: true,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[], Error>);
    render(<UserTasks userId={1} />);
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
    render(<UserTasks userId={1} />);
    await screen.findByTestId('user-tasks-error');

    // ASSERT
    expect(screen.getByTestId('user-tasks-error')).toBeDefined();
  });
});
