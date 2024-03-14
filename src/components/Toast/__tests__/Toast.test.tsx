import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

import { ToastDetail } from 'providers/ToastsProvider';
import { toastFixture } from '__fixtures__/toasts';

import Toast from '../Toast';

describe('Toast', () => {
  const mockDismiss = jest.fn();

  it('should render successfully', async () => {
    render(<Toast toast={toastFixture} dismiss={mockDismiss} />);

    await screen.findByTestId('toast');

    expect(screen.getByTestId('toast')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<Toast toast={toastFixture} dismiss={mockDismiss} testId="custom-testId" />);

    await screen.findByTestId('custom-testId');

    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    render(<Toast toast={toastFixture} dismiss={mockDismiss} className="custom-className" />);

    await screen.findByTestId('toast');

    expect(screen.getByTestId('toast').classList).toContain('custom-className');
  });

  it('should call dismiss function when button clicked', async () => {
    render(<Toast toast={toastFixture} dismiss={mockDismiss} />);

    await screen.findByTestId('toast-button-dismiss');
    await userEvent.click(screen.getByTestId('toast-button-dismiss'));

    await waitFor(() => expect(mockDismiss).toHaveBeenCalled());
  });

  it('should auto dismiss', async () => {
    const toast: ToastDetail = {
      ...toastFixture,
      createdAt: dayjs().toISOString(),
      isAutoDismiss: true,
    };
    render(<Toast toast={toast} dismiss={mockDismiss} />);

    await waitFor(() => expect(mockDismiss).toHaveBeenCalled(), { timeout: 5000 });
  });
});
