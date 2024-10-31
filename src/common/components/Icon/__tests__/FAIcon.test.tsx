import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import FAIcon from '../FAIcon';

describe('FAIcon', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<FAIcon icon="xmark" />);
    await screen.findByTestId('fa-icon');

    // ASSERT
    expect(screen.getByTestId('fa-icon')).toBeDefined();
    expect(screen.getByTestId('fa-icon')).toHaveAttribute('data-icon', 'xmark');
  });
});
