import { describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test/test-utils';
import userEvent from '@testing-library/user-event';

import MenuCloseButton from '../MenuCloseButton';

describe('MenuCloseButton', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<MenuCloseButton />);
    await screen.findByTestId('menu-close-button');

    // ASSERT
    expect(screen.getByTestId('menu-close-button')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<MenuCloseButton testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<MenuCloseButton className="custom-class" />);
    await screen.findByTestId('menu-close-button');

    // ASSERT
    expect(screen.getByTestId('menu-close-button').classList).toContain('custom-class');
  });

  it('should call close function when clicked', async () => {
    // ARRANGE
    const mockClose = vi.fn();
    render(<MenuCloseButton close={mockClose} />);
    await screen.findByTestId('menu-close-button');

    // ACT
    await userEvent.click(screen.getByTestId('menu-close-button'));

    // ASSERT
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
