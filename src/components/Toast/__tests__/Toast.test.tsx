import { describe, expect, it, vi } from 'vitest';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

import { ToastDetail } from 'providers/ToastsContext';
import { toastFixture } from '__fixtures__/toasts';

import Toast from '../Toast';

describe('Toast', () => {
  const mockDismiss = vi.fn();

  it('should render successfully', async () => {
    // ARRANGE
    render(<Toast toast={toastFixture} dismiss={mockDismiss} />);
    await screen.findByTestId('toast');

    // ASSERT
    expect(screen.getByTestId('toast')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<Toast toast={toastFixture} dismiss={mockDismiss} testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<Toast toast={toastFixture} dismiss={mockDismiss} className="custom-className" />);
    await screen.findByTestId('toast');

    // ASSERT
    expect(screen.getByTestId('toast').classList).toContain('custom-className');
  });

  it('should call dismiss function when button clicked', async () => {
    // ARRANGE
    render(<Toast toast={toastFixture} dismiss={mockDismiss} />);
    await screen.findByTestId('toast-button-dismiss');

    // ACT
    await userEvent.click(screen.getByTestId('toast-button-dismiss'));

    // ASSERT
    await waitFor(() => expect(mockDismiss).toHaveBeenCalled());
  });

  it('should auto dismiss', async () => {
    // ARRANGE
    const toast: ToastDetail = {
      ...toastFixture,
      createdAt: dayjs().toISOString(),
      isAutoDismiss: true,
    };
    render(<Toast toast={toast} dismiss={mockDismiss} />);

    // ASSERT
    await waitFor(() => expect(mockDismiss).toHaveBeenCalled(), { timeout: 5000 });
  });
});
