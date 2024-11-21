import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from 'test/test-utils';

import Backdrop from '../Backdrop';

describe('Backdrop', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Backdrop />);
    await screen.findByTestId('backdrop');

    // ASSERT
    expect(screen.getByTestId('backdrop')).toBeDefined();
  });

  it('should use testid', async () => {
    // ARRANGE
    render(<Backdrop testId="my-backdrop" />);
    await screen.findByTestId('my-backdrop');

    // ASSERT
    expect(screen.getByTestId('my-backdrop')).toBeDefined();
  });

  it('should use className', async () => {
    // ARRANGE
    render(<Backdrop className="my-class" />);
    await screen.findByTestId('backdrop');

    // ASSERT
    expect(screen.getByTestId('backdrop')).toHaveClass('my-class');
  });

  it('should handle click', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const clickFn = vi.fn();
    render(<Backdrop onClick={clickFn} />);
    await screen.findByTestId('backdrop');

    // ACT
    await user.click(screen.getByTestId('backdrop'));

    // ASSERT
    expect(screen.getByTestId('backdrop')).toBeDefined();
    expect(clickFn).toHaveBeenCalledOnce();
  });
});
