import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';
import BadgeComponents from '../BadgeComponents';

describe('BadgeComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<BadgeComponents />);
    await screen.findByTestId('components-badge');

    // ASSERT
    expect(screen.getByTestId('components-badge')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<BadgeComponents testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<BadgeComponents className="custom-className" />);
    await screen.findByTestId('components-badge');

    // ASSERT
    expect(screen.getByTestId('components-badge').classList).toContain('custom-className');
  });
});
