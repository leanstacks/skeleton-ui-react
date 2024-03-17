import { render, screen } from 'test/test-utils';

import Footer from '../Footer';

describe('Footer', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Footer />);
    await screen.findByTestId('footer');

    // ASSERT
    expect(screen.getByTestId('footer')).toBeDefined();
  });

  it('should use test id', async () => {
    // ARRANGE
    render(<Footer testId="test" />);
    await screen.findByTestId('test');

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
  });
});
