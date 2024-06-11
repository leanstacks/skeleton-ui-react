import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';

import Tab from '../Tab';

describe('Tab', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Tab label="Label" />);
    await screen.findByTestId('tab');

    // ASSERT
    expect(screen.getByTestId('tab')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<Tab label="Label" testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should render label', async () => {
    // ARRANGE
    render(<Tab label="Label" />);
    await screen.findByTestId('tab');

    // ASSERT
    expect(screen.getByTestId('tab').textContent).toBe('Label');
  });

  it('should render active state', async () => {
    // ARRANGE
    render(<Tab label="Label" isActive />);
    await screen.findByTestId('tab');

    // ASSERT
    expect(screen.getByTestId('tab').classList).toContain('border-b-blue-300');
  });

  it('should call click handler', async () => {
    // ARRANGE
    const mockClickFn = vi.fn();
    render(<Tab label="Label" onClick={mockClickFn} />);
    await screen.findByTestId('tab');

    // ACT
    await userEvent.click(screen.getByTestId('tab'));

    // ASSERT
    expect(mockClickFn).toHaveBeenCalledTimes(1);
  });
});
