import { render, screen } from 'test/test-utils';

import MenuSeparator from '../MenuSeparator';

describe('MenuSeparator', () => {
  it('should render successfully', async () => {
    render(<MenuSeparator />);

    await screen.findByTestId('menu-separator');

    expect(screen.getByTestId('menu-separator')).toBeDefined();
  });

  it('should use custom testId', async () => {
    render(<MenuSeparator testId="custom-testid" />);

    await screen.findByTestId('custom-testid');

    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use custom className', async () => {
    render(<MenuSeparator className="custom-class" />);

    await screen.findByTestId('menu-separator');

    expect(screen.getByTestId('menu-separator').classList).toContain('custom-class');
  });
});
