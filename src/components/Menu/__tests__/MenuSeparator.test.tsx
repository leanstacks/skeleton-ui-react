import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import MenuSeparator from '../MenuSeparator';

describe('MenuSeparator', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<MenuSeparator />);
    await screen.findByTestId('menu-separator');

    // ASSERT
    expect(screen.getByTestId('menu-separator')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<MenuSeparator testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<MenuSeparator className="custom-class" />);
    await screen.findByTestId('menu-separator');

    // ASSERT
    expect(screen.getByTestId('menu-separator').classList).toContain('custom-class');
  });
});
