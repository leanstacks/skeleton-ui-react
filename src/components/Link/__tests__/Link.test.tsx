import { render, screen } from 'test/test-utils';

import Link from '../Link';

describe('Link', () => {
  it('should render successfully', async () => {
    render(
      <Link to="/" title="title" target="target">
        text
      </Link>,
    );

    await screen.findByTestId('link');

    expect(screen.getByTestId('link')).toBeDefined();
  });

  it('should use test id', async () => {
    render(
      <Link to="/" title="title" target="target" testId="test">
        text
      </Link>,
    );

    await screen.findByTestId('test');

    expect(screen.getByTestId('test')).toBeDefined();
  });
});
