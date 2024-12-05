import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import DialogButton from '../DialogButton';

describe('DialogButton', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<DialogButton>Submit</DialogButton>);
    await screen.findByTestId('dialog-button');

    // ASSERT
    expect(screen.getByTestId('dialog-button')).toBeDefined();
    expect(screen.getByTestId('dialog-button')).toHaveTextContent('Submit');
  });

  it('should use testId', async () => {
    // ARRANGE
    render(<DialogButton testId="my-dialog-button">Submit</DialogButton>);
    await screen.findByTestId('my-dialog-button');

    // ASSERT
    expect(screen.getByTestId('my-dialog-button')).toBeDefined();
  });

  it('should use className', async () => {
    // ARRANGE
    render(<DialogButton className="my-class">Submit</DialogButton>);
    await screen.findByTestId('dialog-button');

    // ASSERT
    expect(screen.getByTestId('dialog-button')).toHaveClass('my-class');
  });

  it('should render primary variant', async () => {
    // ARRANGE
    render(<DialogButton variant="primary">Submit</DialogButton>);
    await screen.findByTestId('dialog-button');

    // ASSERT
    expect(screen.getByTestId('dialog-button')).toHaveClass('text-blue-600');
  });

  it('should render danger variant', async () => {
    // ARRANGE
    render(<DialogButton variant="danger">Submit</DialogButton>);
    await screen.findByTestId('dialog-button');

    // ASSERT
    expect(screen.getByTestId('dialog-button')).toHaveClass('text-red-600');
  });
});
