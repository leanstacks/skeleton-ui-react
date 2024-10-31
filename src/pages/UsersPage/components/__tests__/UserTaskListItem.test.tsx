import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import { todosFixture } from '__fixtures__/todos';
import UserTaskListItem from '../UserTaskListItem';
import { Task } from 'pages/UsersPage/api/useGetUserTasks';

describe('UserTaskListItem', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserTaskListItem task={todosFixture[0]} />);
    await screen.findByTestId('user-task-list-item');

    // ASSERT
    expect(screen.getByTestId('user-task-list-item')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<UserTaskListItem task={todosFixture[0]} testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<UserTaskListItem task={todosFixture[0]} className="custom-className" />);
    await screen.findByTestId('user-task-list-item');

    // ASSERT
    expect(screen.getByTestId('user-task-list-item').classList).toContain('custom-className');
  });

  it('should display completed task', async () => {
    // ARRANGE
    const task: Task = {
      ...todosFixture[0],
      completed: true,
    };
    render(<UserTaskListItem task={task} />);
    await screen.findByTestId('user-task-list-item');

    // ASSERT
    expect(screen.getByTestId('user-task-list-item-toggle-complete-icon')).toHaveAttribute(
      'data-icon',
      'circle-check',
    );
  });
});
