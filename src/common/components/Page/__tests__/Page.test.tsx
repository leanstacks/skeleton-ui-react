import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';
import Page from '../Page';

describe('Page', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Page>
        <div data-testid="content" />
      </Page>,
    );
    await screen.findByTestId('page');

    // ASSERT
    expect(screen.getByTestId('page')).toBeDefined();
    expect(screen.getByTestId('content')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(
      <Page testId="custom-testId">
        <div data-testid="content" />
      </Page>,
    );
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(
      <Page className="custom-className">
        <div data-testid="content" />
      </Page>,
    );
    await screen.findByTestId('page');

    // ASSERT
    expect(screen.getByTestId('page').classList).toContain('custom-className');
  });
});
