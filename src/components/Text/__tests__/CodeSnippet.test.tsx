import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';
import CodeSnippet from '../CodeSnippet';

describe('CodeSnippet', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<CodeSnippet code="<></>" />);
    await screen.findByTestId('code-snippet');

    // ASSERT
    expect(screen.getByTestId('code-snippet')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<CodeSnippet code="<></>" testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<CodeSnippet code="<></>" className="custom-className" />);
    await screen.findByTestId('code-snippet');

    // ASSERT
    expect(screen.getByTestId('code-snippet').classList).toContain('custom-className');
  });

  it('should display code', async () => {
    // ARRANGE
    render(<CodeSnippet code="<div>content</div>" />);
    await screen.findByTestId('code-snippet');

    // ASSERT
    expect(screen.getByTestId('code-snippet').textContent).toBe('<div>content</div>');
  });
});
