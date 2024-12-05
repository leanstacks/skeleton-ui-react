import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from 'test/test-utils';

import Dialog from '../Dialog';

describe('Dialog', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Dialog />);
    await screen.findByTestId('dialog');

    // ASSERT
    expect(screen.getByTestId('dialog')).toBeDefined();
  });

  it('should use testId', async () => {
    // ARRANGE
    render(<Dialog testId="my-dialog" />);
    await screen.findByTestId('my-dialog');

    // ASSERT
    expect(screen.getByTestId('my-dialog')).toBeDefined();
  });

  it('should use className', async () => {
    // ARRANGE
    render(<Dialog className="my-class" />);
    await screen.findByTestId('dialog');

    // ASSERT
    expect(screen.getByTestId('dialog')).toHaveClass('my-class');
  });

  it('should be hidden by default', async () => {
    // ARRANGE
    render(<Dialog />);
    await screen.findByTestId('dialog');

    // ASSERT
    expect(screen.getByTestId('dialog')).toHaveClass('hidden');
  });

  it('should not be hidden when isOpen true', async () => {
    // ARRANGE
    render(<Dialog isOpen={true} />);
    await screen.findByTestId('dialog');

    // ASSERT
    expect(screen.getByTestId('dialog')).not.toHaveClass('hidden');
  });

  it('should be hidden when isOpen false', async () => {
    // ARRANGE
    render(<Dialog isOpen={false} />);
    await screen.findByTestId('dialog');

    // ASSERT
    expect(screen.getByTestId('dialog')).toHaveClass('hidden');
  });

  it('should close when backdrop clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const closeFn = vi.fn();
    render(<Dialog onClose={closeFn} isOpen={true} />);
    await screen.findByTestId('dialog');
    expect(screen.getByTestId('dialog')).not.toHaveClass('hidden');

    // ACT
    await user.click(screen.getByTestId('dialog-backdrop'));

    // ASSERT
    expect(closeFn).toHaveBeenCalledOnce();
    expect(screen.getByTestId('dialog')).toHaveClass('hidden');
  });

  it('should not close when dialog content clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const closeFn = vi.fn();
    render(
      <Dialog onClose={closeFn} isOpen={true}>
        <div data-testid="content" />
      </Dialog>,
    );
    await screen.findByTestId('dialog');
    expect(screen.getByTestId('dialog')).not.toHaveClass('hidden');

    // ACT
    await user.click(screen.getByTestId('content'));

    // ASSERT
    expect(closeFn).not.toHaveBeenCalled();
    expect(screen.getByTestId('dialog')).not.toHaveClass('hidden');
  });
});
