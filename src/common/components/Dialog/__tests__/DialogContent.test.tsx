import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import DialogContent from '../DialogContent';

describe('DialogContent', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<DialogContent />);
    await screen.findByTestId('dialog-content');

    // ASSERT
    expect(screen.getByTestId('dialog-content')).toBeDefined();
  });

  it('should use testId', async () => {
    // ARRANGE
    render(<DialogContent testId="my-dialog-content" />);
    await screen.findByTestId('my-dialog-content');

    // ASSERT
    expect(screen.getByTestId('my-dialog-content')).toBeDefined();
  });

  it('should use className', async () => {
    // ARRANGE
    render(<DialogContent className="my-class" />);
    await screen.findByTestId('dialog-content');

    // ASSERT
    expect(screen.getByTestId('dialog-content')).toHaveClass('my-class');
  });
});
