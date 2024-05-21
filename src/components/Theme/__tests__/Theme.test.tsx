import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import Theme from '../Theme';

describe('Theme', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Theme />);
    await screen.findByTestId('theme');

    // ASSERT
    expect(screen.getByTestId('theme')).toBeDefined();
  });

  it('should have default theme', async () => {
    // ARRANGE
    render(<Theme />);
    await screen.findByTestId('theme');

    // ASSERT
    expect(screen.getByTestId('theme').classList).toContain('light');
  });
});
