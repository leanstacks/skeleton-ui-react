import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';
import { todosFixture } from '__fixtures__/todos';

import TaskDeleteDialog from '../TaskDeleteDialog';

describe('TaskDeleteDialog', () => {
  it('should render successfully', async () => {
    // ARRANGE
    const task = todosFixture[0];
    const mockOnCancel = vi.fn();
    const mockOnDelete = vi.fn();
    render(
      <TaskDeleteDialog
        task={task}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
        testId="dialog"
      />,
    );
    await screen.findByTestId('dialog');

    // ASSERT
    expect(screen.getByTestId('dialog')).toBeDefined();
  });

  it('should call onCancel when cancel button clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const task = todosFixture[0];
    const mockOnCancel = vi.fn();
    const mockOnDelete = vi.fn();
    render(
      <TaskDeleteDialog
        task={task}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
        testId="dialog"
      />,
    );
    await screen.findByTestId('dialog');

    // ACT
    await user.click(screen.getByTestId('dialog-button-cancel'));

    // ASSERT
    expect(screen.getByTestId('dialog')).toBeDefined();
    expect(mockOnCancel).toHaveBeenCalledOnce();
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('should call onDelete when delete button clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const task = todosFixture[0];
    const mockOnCancel = vi.fn();
    const mockOnDelete = vi.fn();
    render(
      <TaskDeleteDialog
        task={task}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
        testId="dialog"
      />,
    );
    await screen.findByTestId('dialog');

    // ACT
    await user.click(screen.getByTestId('dialog-button-delete'));

    // ASSERT
    expect(screen.getByTestId('dialog')).toBeDefined();
    expect(mockOnDelete).toHaveBeenCalledOnce();
    expect(mockOnCancel).not.toHaveBeenCalled();
  });
});
