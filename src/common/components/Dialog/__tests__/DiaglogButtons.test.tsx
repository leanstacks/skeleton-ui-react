import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import DialogButtons from '../DialogButtons';

describe('DialogButtons', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <DialogButtons>
        <div data-testid="children"></div>
      </DialogButtons>,
    );
    await screen.findByTestId('dialog-buttons');

    // ASSERT
    expect(screen.getByTestId('dialog-buttons')).toBeDefined();
    expect(screen.getByTestId('children')).toBeDefined();
  });

  it('should use testId', async () => {
    // ARRANGE
    render(
      <DialogButtons testId="my-dialog-buttons">
        <div data-testid="children"></div>
      </DialogButtons>,
    );
    await screen.findByTestId('my-dialog-buttons');

    // ASSERT
    expect(screen.getByTestId('my-dialog-buttons')).toBeDefined();
  });

  it('should use className', async () => {
    // ARRANGE
    render(
      <DialogButtons className="my-class">
        <div data-testid="children"></div>
      </DialogButtons>,
    );
    await screen.findByTestId('dialog-buttons');

    // ASSERT
    expect(screen.getByTestId('dialog-buttons')).toHaveClass('my-class');
  });
});
