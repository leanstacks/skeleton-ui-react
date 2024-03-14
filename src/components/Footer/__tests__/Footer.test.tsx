import { render, screen } from 'test/test-utils';
import Footer from '../Footer';

describe('Footer', () => {
  it('should render successfully', async () => {
    render(<Footer />);

    await screen.findByTestId('footer');

    expect(screen.getByTestId('footer')).toBeDefined();
  });

  it('should use test id', async () => {
    render(<Footer testId="test" />);

    await screen.findByTestId('test');

    expect(screen.getByTestId('test')).toBeDefined();
  });
});
