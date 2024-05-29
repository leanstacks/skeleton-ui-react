import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import DropdownItem from '../DropdownItem';

describe('DropdownItem', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<DropdownItem />);
    await screen.findByTestId('dropdown-item');

    // ASSERT
    expect(screen.getByTestId('dropdown-item')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<DropdownItem testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<DropdownItem className="custom-className" />);
    await screen.findByTestId('dropdown-item');

    // ASSERT
    expect(screen.getByTestId('dropdown-item').classList).toContain('custom-className');
  });

  it('should call onClick function', async () => {
    // ARRANGE
    const mockFn = vi.fn();
    render(<DropdownItem onClick={mockFn} />);
    await screen.findByTestId('dropdown-item');

    // ACT - CLICK ITEM
    await userEvent.click(screen.getByTestId('dropdown-item'));

    // ASSERT
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
