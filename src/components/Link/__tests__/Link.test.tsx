import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import Link from '../Link';

describe('Link', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Link to="/" title="title" target="target">
        text
      </Link>,
    );
    await screen.findByTestId('link');

    // ASSERT
    expect(screen.getByTestId('link')).toBeDefined();
  });

  it('should use test id', async () => {
    // ARRANGE
    render(
      <Link to="/" title="title" target="target" testId="test">
        text
      </Link>,
    );
    await screen.findByTestId('test');

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
  });
});
