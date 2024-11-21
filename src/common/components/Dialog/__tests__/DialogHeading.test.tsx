import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import DialogHeading from '../DialogHeading';

describe('DialogHeading', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<DialogHeading />);
    await screen.findByTestId('dialog-heading');

    // ASSERT
    expect(screen.getByTestId('dialog-heading')).toBeDefined();
  });

  it('should use testId', async () => {
    // ARRANGE
    render(<DialogHeading testId="my-dialog-heading" />);
    await screen.findByTestId('my-dialog-heading');

    // ASSERT
    expect(screen.getByTestId('my-dialog-heading')).toBeDefined();
  });

  it('should use className', async () => {
    // ARRANGE
    render(<DialogHeading className="my-class" />);
    await screen.findByTestId('dialog-heading');

    // ASSERT
    expect(screen.getByTestId('dialog-heading')).toHaveClass('my-class');
  });
});
