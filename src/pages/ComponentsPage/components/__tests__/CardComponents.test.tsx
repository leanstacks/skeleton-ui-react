import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';
import CardComponents from '../CardComponents';

describe('CardComponents', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<CardComponents />);
    await screen.findByTestId('components-card');

    // ASSERT
    expect(screen.getByTestId('components-card')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<CardComponents testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<CardComponents className="custom-className" />);
    await screen.findByTestId('components-card');

    // ASSERT
    expect(screen.getByTestId('components-card').classList).toContain('custom-className');
  });
});
