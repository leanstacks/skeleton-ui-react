import { render, screen } from '@testing-library/react';

import Card from '../Card';

describe('Card', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Card>
        <div data-testid="content" />
      </Card>,
    );
    await screen.findByTestId('card');

    // ASSERT
    expect(screen.getByTestId('card')).toBeDefined();
    expect(screen.getByTestId('content')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(
      <Card testId="custom-testId">
        <div data-testid="content" />
      </Card>,
    );
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(
      <Card className="custom-className">
        <div data-testid="content" />
      </Card>,
    );
    await screen.findByTestId('card');

    // ASSERT
    expect(screen.getByTestId('card').classList).toContain('custom-className');
  });
});
