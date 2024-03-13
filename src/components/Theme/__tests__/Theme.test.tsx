import { render, screen } from 'test/test-utils';

import Theme from '../Theme';

describe('Theme', () => {
  it('should render successfully', async () => {
    render(<Theme />);

    await screen.findByTestId('theme');

    expect(screen.getByTestId('theme')).toBeDefined();
  });

  it('should have default theme', async () => {
    render(<Theme />);

    await screen.findByTestId('theme');

    expect(screen.getByTestId('theme').classList).toContain('light');
  });
});
