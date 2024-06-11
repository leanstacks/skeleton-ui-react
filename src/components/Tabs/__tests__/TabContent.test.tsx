import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import TabContent from '../TabContent';

describe('TabContent', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TabContent />);
    await screen.findByTestId('tab-content');

    // ASSERT
    expect(screen.getByTestId('tab-content')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<TabContent testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<TabContent className="custom-className" />);
    await screen.findByTestId('tab-content');

    // ASSERT
    expect(screen.getByTestId('tab-content').classList).toContain('custom-className');
  });

  it('should render children', async () => {
    // ARRANGE
    render(
      <TabContent>
        <div data-testid="tab-content-children"></div>
      </TabContent>,
    );
    await screen.findByTestId('tab-content-children');

    // ASSERT
    expect(screen.getByTestId('tab-content-children')).toBeDefined();
  });
});
