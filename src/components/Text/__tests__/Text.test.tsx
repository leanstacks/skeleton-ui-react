import { render, screen } from 'test/test-utils';
import Text from '../Text';

describe('Text', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Text>content</Text>);
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<Text testId="custom-testId">content</Text>);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<Text className="custom-className">content</Text>);
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text').classList).toContain('custom-className');
  });

  it('should render the heading1 variant', async () => {
    // ARRANGE
    render(<Text variant="heading1">content</Text>);
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text').classList).toContain('text-4xl');
  });

  it('should render the heading2 variant', async () => {
    // ARRANGE
    render(<Text variant="heading2">content</Text>);
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text').classList).toContain('text-2xl');
  });

  it('should render the heading3 variant', async () => {
    // ARRANGE
    render(<Text variant="heading3">content</Text>);
    await screen.findByTestId('text');

    // ASSERT
    expect(screen.getByTestId('text').classList).toContain('text-xl');
  });
});
