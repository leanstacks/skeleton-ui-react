import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Divider from '../Divider';

describe('Divider', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Divider />);
    await screen.findByTestId('divider');

    // ASSERT
    expect(screen.getByTestId('divider')).toBeDefined();
  });

  it('should use testid', async () => {
    // ARRANGE
    render(<Divider testId="my-divider" />);
    await screen.findByTestId('my-divider');

    // ASSERT
    expect(screen.getByTestId('my-divider')).toBeDefined();
  });

  it('should use className', async () => {
    // ARRANGE
    render(<Divider className="my-className" />);
    await screen.findByTestId('divider');

    // ASSERT
    expect(screen.getByTestId('divider')).toHaveClass('my-className');
  });
});
